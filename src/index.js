const uuid = require('node-uuid');
const DB = require('./dynamo');
const constants = require('./constants');
const utility = require('./utility');

const DECKSIZE = 81;
const GAME_TABLE = 'welcomeToGamestate';


/** ***************************************************************************
 *
 * Game initialization functions
 *
 *************************************************************************** */

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
 * Get an object with randomly selected city plan cards for each of the
 * three types: n1, n2, and n3.
 *
 * @param {boolean} advanced True if we are playing the advanced variant.
 * @returns {object} n1, n2, n3 mapped to the keys of the selected cards.
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

  // Set up the RNG and randomly select one of each plan type.
  const getRandom = utility.getRandomIntGenerator();
  const chosenCityPlans = plans.map(arr => arr[getRandom(arr.length)]);
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
const initializeGameState = async (advanced) => {
  // Initialize a list of card IDs and shuffle it.
  const deck = [];
  let counter = 1;
  while (counter <= DECKSIZE) {
    deck.push(counter += 1);
  }
  utility.shuffle(deck);

  // Break the deck into three equal-sized piles.
  const partitions = [];
  partitions.push(initializePartition(deck.slice(0, 27)));
  partitions.push(initializePartition(deck.slice(27, 54)));
  partitions.push(initializePartition(deck.slice(54)));

  // Randomly select three city plans.
  const cityPlans = getCityPlans(advanced);
  // console.log('plans: ', cityPlans);

  // Build gamestate object.
  const gamestate = {
    gameID: uuid.v1(),
    partitions,
    cityPlans,
  };

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

const getCardDataFromGamestate = (gamestate) => {
  
}

 /** ***************************************************************************
 *
 * End game functions
 *
 *************************************************************************** */

const handler = async (event) => {
  let response = 'httpMethod not specified';
  if (event.httpMethod === 'PUT') {
    response = 'this was a put';
  } else if (event.httpMethod === 'GET') {
    if (event.path === '/game/new') {
      response = await initializeGameState(false);
    }
  }
  return utility.done(response);
};

module.exports = {
  handler,
};
