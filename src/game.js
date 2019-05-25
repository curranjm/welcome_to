const uuid = require('node-uuid');
const constants = require('./constants');
const utility = require('./utility');
const DB = require('./dynamo');

const DECKSIZE = 81;
const GAME_TABLE = 'welcomeToGamestate';
const GAME_ID_KEY = 'gameID';
const ESTATE_GOAL_KEY = 'estates';

/** ***************************************************************************
 *
 * Game initialization functions
 *
 *************************************************************************** */

/**
 * Get an array of integers from 1 to the provided decksize (inclusive).
 *
 * @returns {array} The array.
 */
const getDeckArray = (decksize) => {
  const deck = [];
  let counter = 1;
  while (counter <= decksize) {
    deck.push(counter);
    counter += 1;
  }
  return deck;
};

/**
 * Take an array of keys and generate a partition object containing:
 *   - undrawn         : an array of undrawn card IDs
 *   - discarded       : an array of discarded card IDs
 *   - activeFaceCardID: the ID of the card whose number is face up
 *   - activeFlipCardID: the ID of the card whose action is face up
 *
 * @param {array[number]} deck An array of card IDs.
 * @returns {object} The partition object.
 */
const initializePartition = (deck) => {
  const face = deck.shift();
  const flip = deck.shift();
  return {
    undrawn: deck,
    discarded: [],
    activeFaceCardID: face,
    activeFlipCardID: flip,
  };
};

/**
 * Returns an array of arrays, with one inner array for each city plan
 * type (n1, n2, n3). Each array contains the int key the corresponds to
 * a card object in constants.
 *
 * @param {boolean} advanced Whether we are playing the advanced variant.
 * @returns {array} Array of three arrays containing card indexes for each
 *                  city plan type.
 */
const getCityPlans = (advanced) => {
  // Set up arrays to hold the keys we will choose randomly from for plan type.
  const plans = [[], [], []];

  // Iterate through all of the city plans and separate them to the correct
  // plan type (n1, n2, n3) array.
  const planKeys = Object.keys(constants.CITY_PLANS);
  planKeys.forEach((item) => {
    const index = constants.CITY_PLANS[item].n - 1;
    const hasStar = constants.CITY_PLANS[item].star;
    // If we are not playing the advanced variant, leave starred city plans out.
    if (!advanced && hasStar) {
      return;
    }
    plans[index].push(item);
  });
  return plans;
};

/**
 * Get an object with randomly selected city plan cards for each of the
 * three types: n1, n2, and n3.
 *
 * @param {array}   cityPlans Array of arrays containing city plan indexes.
 * @param {function} getRandom A function to get a pseudorandom int.
 * @returns {object} n1, n2, n3 mapped to the keys of the selected cards.
 */
const initializeCityPlans = (cityPlans, getRandom) => {
  // Set up the RNG and randomly select one of each plan type.
  const chosenCityPlans = cityPlans.map(arr => arr[getRandom(arr.length)]);
  return {
    n1: chosenCityPlans[0],
    n2: chosenCityPlans[1],
    n3: chosenCityPlans[2],
  };
};

/**
 * Initializes the game state and writes it to the database, then passes it to
 * the slackbot.
 *
 * @param {boolean} advanced Whether or not this game is using the advanced rules.
 */
const getNewGameState = (gameID, advanced, shuffle, randomIntGenerator) => {
  // Initialize a list of card IDs and shuffle it.
  const deck = getDeckArray(DECKSIZE);
  shuffle(deck);

  // Break the deck into three equal-sized piles.
  const partitions = [];
  partitions.push(initializePartition(deck.slice(0, 27)));
  partitions.push(initializePartition(deck.slice(27, 54)));
  partitions.push(initializePartition(deck.slice(54)));

  // Randomly select three city plans.
  const cityPlans = initializeCityPlans(
    getCityPlans(advanced),
    randomIntGenerator,
  );

  // Build gamestate object.
  return {
    gameID,
    partitions,
    cityPlans,
    completedPlans: [],
  };
};

const initializeGamestate = (advanced) => {
  const gamestate = getNewGameState(
    uuid.v1(),
    advanced,
    utility.shuffle,
    utility.getRandomIntGenerator(),
  );
  return DB.write(
    gamestate,
    GAME_TABLE,
  );
};

/** ***************************************************************************
 *
 * End game initialization functions
 *
 *************************************************************************** */

/** ***************************************************************************
 *
 * Game functions
 *
 *************************************************************************** */

const getCityPlanString = (cityPlan, completedPlans) => {
  const goalType = Object.keys(cityPlan.goals);
  const isEstateGoal = goalType.includes(ESTATE_GOAL_KEY);

  // get the goal description
  let goal = '';
  if (isEstateGoal) {
    goal += 'Requires estates of the following sizes: ';
    goal += cityPlan.goals.estates.join(', ');
  } else {
    goal += cityPlan.goals.other;
  }

  // get the points string
  const pointsFirst = completedPlans.includes(cityPlan.n) ? '`first`: *DONE*' : `\`first\`: ${cityPlan.points.first}`;
  const pointsOther = `\`other\`: ${cityPlan.points.other}`;

  // assemble the full string
  return `\`n${cityPlan.n}\`: ${goal}\n${pointsFirst}  |  ${pointsOther}`;
};

const getCityPlanData = (cityPlans, completedPlans) => {
  const n1 = constants.CITY_PLANS[cityPlans.n1];
  const n2 = constants.CITY_PLANS[cityPlans.n2];
  const n3 = constants.CITY_PLANS[cityPlans.n3];

  return {
    n1: getCityPlanString(n1, completedPlans),
    n2: getCityPlanString(n2, completedPlans),
    n3: getCityPlanString(n3, completedPlans),
  };
};

const getCardDataFromGamestate = ({
  partitions,
  cityPlans,
  completedPlans,
}) => {
  const partitionData = partitions.map(partition => ({
    faceCard: constants.CARDS[partition.activeFaceCardID],
    flipCard: constants.CARDS[partition.activeFlipCardID],
  }));
  return {
    partitions: partitionData,
    cityPlans: getCityPlanData(cityPlans, completedPlans),
  };
};

const getSlackPayload = ({
  partitions,
  cityPlans,
}) => ({
  blocks: [
    {
      type: 'section',
      text: {
        text: '```Address/Action choices for this turn:```',
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: `:w${partitions[0].faceCard.value}:   :${constants.ACTIONS[partitions[0].flipCard.action]}:`,
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: `:w${partitions[1].faceCard.value}:   :${constants.ACTIONS[partitions[1].flipCard.action]}:`,
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: `:w${partitions[2].faceCard.value}:   :${constants.ACTIONS[partitions[2].flipCard.action]}:`,
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: '```City plans:```',
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: cityPlans.n1,
        type: 'mrkdwn',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        text: cityPlans.n2,
        type: 'mrkdwn',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        text: cityPlans.n3,
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: '```Actions available next turn:```',
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: `:${constants.ACTIONS[partitions[0].faceCard.action]}:   :${constants.ACTIONS[partitions[1].faceCard.action]}:   :${constants.ACTIONS[partitions[2].faceCard.action]}:`,
        type: 'mrkdwn',
      },
    },
    {
      type: 'section',
      text: {
        text: '```Options:```',
        type: 'mrkdwn',
      },
    },
  ],
});


/** ***************************************************************************
 *
 * End game functions
 *
 *************************************************************************** */

const getGameState = async gameID => DB.get(GAME_ID_KEY, gameID, GAME_TABLE);

module.exports = {
  getDeckArray,
  initializePartition,
  getCityPlans,
  initializeCityPlans,
  getNewGameState,
  initializeGamestate,
  getGameState,
  getCardDataFromGamestate,
  getSlackPayload,
};
