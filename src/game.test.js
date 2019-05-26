const game = require('./game');
const constants = require('./constants');

/* -----------------------------------------------------------------------------------------------
Testing Mocks
----------------------------------------------------------------------------------------------- */

// A deck is a list of card IDs.
const mockDeck = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81,
];

// CityPlans is an array of arrays containing the card IDs associated with each
// of the different city plan types (n1, n2, n3)
const mockCityPlans = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Gamestate consists of four fields:
//   - gameID: used as the key in the DB
//   - partitions: array of 3 objects containing deck state for the 3 draw decks
//   - cityPlans: object containing the card IDs of this game's 3 city plans
//   - completedPlans: an array containing the city plans that have been completed
const mockGamestate = {
  gameID: 'bea193b0-7e7e-11e9-aa93-f1bd06033551',
  partitions: [
    {
      undrawn: [
        22, 4, 63, 18, 60, 74, 53, 40, 12, 65, 39, 10, 73, 57, 14, 48,
        56, 38, 15, 45, 61, 29, 41, 50, 24,
      ],
      discarded: [],
      activeFaceCardID: 6,
      activeFlipCardID: 2,
    },
    {
      undrawn: [
        7, 31, 77, 13, 72, 28, 81, 80, 59, 68, 27, 51, 25, 46, 11, 37,
        70, 43, 32, 8, 42, 62, 75, 44, 55,
      ],
      discarded: [],
      activeFaceCardID: 76,
      activeFlipCardID: 23,
    },
    {
      undrawn: [
        1, 19, 79, 67, 3, 54, 47, 66, 30, 5, 16, 34, 36, 64, 17, 26, 49,
        78, 35, 52, 58, 21, 71, 20, 69,
      ],
      discarded: [],
      activeFaceCardID: 9,
      activeFlipCardID: 33,
    },
  ],
  cityPlans: {
    n1: 1,
    n2: 12,
    n3: 27,
  },
  completedPlans: [],
};

// The expected initial gamestate  with no randomization.
const expectedInitialGamestate = {
  gameID: 1,
  partitions: [
    {
      undrawn: [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      ],
      discarded: [],
      activeFaceCardID: 1,
      activeFlipCardID: 2,
    },
    {
      undrawn: [
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
        52, 53, 54,
      ],
      discarded: [],
      activeFaceCardID: 28,
      activeFlipCardID: 29,
    },
    {
      undrawn: [
        57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
        79, 80, 81,
      ],
      discarded: [],
      activeFaceCardID: 55,
      activeFlipCardID: 56,
    },
  ],
  cityPlans: {
    n1: '1',
    n2: '12',
    n3: '23',
  },
  completedPlans: [],
};

// Mock game data as it would be derived from gamestate with getCardDataFromGamestate
const mockGameData = {
  gameID: 'bea193b0-7e7e-11e9-aa93-f1bd06033551',
  partitions: [
    {
      faceCard: constants.CARDS[6],
      flipCard: constants.CARDS[2],
    },
    {
      faceCard: constants.CARDS[76],
      flipCard: constants.CARDS[23],
    },
    {
      faceCard: constants.CARDS[9],
      flipCard: constants.CARDS[33],
    },
  ],
  cityPlans: {
    n1: '`n1`: Requires estates of the following sizes: 5, 5\n`first`: 8  |  `other`: 4',
    n2: '`n2`: Requires estates of the following sizes: 3, 6\n`first`: 8  |  `other`: 4',
    n3: '`n3`: Requires estates of the following sizes: 2, 5\n`first`: 7  |  `other`: 3',
  },
};

const mockPartitionWithEmptyDrawDeck = {
  undrawn: [],
  discarded: [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  ],
  activeFaceCardID: 1,
  activeFlipCardID: 2,
};

/* -----------------------------------------------------------------------------------------------
End Testing Mocks
----------------------------------------------------------------------------------------------- */

describe(
  'Deck Setup',
  () => {
    it(
      'gets 1-81 in an array from getDeckArray',
      () => {
        expect(game.getDeckArray(81)).toEqual(mockDeck);
      },
    );

    it(
      'correctly sets up partition from deck array',
      () => {
        expect(game.initializePartition(mockDeck.slice(0, 27))).toEqual({
          undrawn: [
            3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27,
          ],
          discarded: [],
          activeFaceCardID: 1,
          activeFlipCardID: 2,
        });
      },
    );

    it(
      'correctly separates the city plan types in the basic variant',
      () => {
        const basic = game.getCityPlans(false);

        const wrongTypeArray = basic
          // filter out the subarrays that contain cards
          .filter((cards, index) => cards
            // map each card in the subarray to its cityPlan card constant
            .map(card => constants.CITY_PLANS[card])
            // filter out the card have the correct type (n1, n2, n3)
            .filter(card => card.n !== (index + 1))
            // reduce the card array to a count of its elements
            .reduce(
              (prev, current) => prev + current.length,
              0,
            // for the filter we only keep subarrays that still had cards
            // after filtering out the cards of the correct type
            ) !== 0);

        expect(wrongTypeArray).toEqual([]);
      },
    );

    it(
      'correctly separates the city plan types in the advanced variant',
      () => {
        const advanced = game.getCityPlans(true);

        const wrongTypeArray = advanced
          // filter out the subarrays that contain cards
          .filter((cards, index) => cards
            // map each card in the subarray to its cityPlan card constant
            .map(card => constants.CITY_PLANS[card])
            // filter out the card have the correct type (n1, n2, n3)
            .filter(card => card.n !== (index + 1))
            // reduce the card array to a count of its elements
            .reduce(
              (prev, current) => prev + current.length,
              0,
            // for the filter we only keep subarrays that still had cards
            // after filtering out the cards of the correct type
            ) !== 0);

        expect(wrongTypeArray).toEqual([]);
      },
    );

    it(
      'does not include advanced city plans in the basic variant',
      () => {
        const basic = game.getCityPlans(false);
        let n1 = basic[0];
        let n2 = basic[1];
        let n3 = basic[2];

        n1 = n1
          .map(card => constants.CITY_PLANS[card])
          .filter(card => card.star !== false)
          .length;
        n2 = n2
          .map(card => constants.CITY_PLANS[card])
          .filter(card => card.star !== false)
          .length;
        n3 = n3
          .map(card => constants.CITY_PLANS[card])
          .filter(card => card.star !== false)
          .length;

        expect(n1 + n2 + n3).toEqual(0);
      },
    );

    it(
      'does include advanced city plans in the advanced variant',
      () => {
        const advanced = game.getCityPlans(true);
        let n1 = advanced[0];
        let n2 = advanced[1];
        let n3 = advanced[2];

        n1 = n1
          .map(card => constants.CITY_PLANS[card])
          .filter(card => card.star !== false)
          .length;
        n2 = n2
          .map(card => constants.CITY_PLANS[card])
          .filter(card => card.star !== false)
          .length;
        n3 = n3
          .map(card => constants.CITY_PLANS[card])
          .filter(card => card.star !== false)
          .length;

        expect(n1 + n2 + n3).toBeGreaterThan(0);
      },
    );

    it(
      'initializes the city plans using the provided random function',
      () => {
        // eslint-disable-next-line no-unused-vars
        const mockRandom = len => 0;
        const cityPlans = game.initializeCityPlans(mockCityPlans, mockRandom);
        expect(cityPlans).toEqual({
          n1: mockCityPlans[0][0],
          n2: mockCityPlans[1][0],
          n3: mockCityPlans[2][0],
        });
      },
    );

    it(
      'initializes the gamestate for a basic game as expected',
      () => {
        // eslint-disable-next-line no-unused-vars
        const actual = game.getNewGameState(1, false, (obj) => {}, num => 0);
        expect(actual).toEqual(expectedInitialGamestate);
      },
    );
  },
);

describe(
  'Card data',
  () => {
    it(
      'extracts card data from gamestate',
      () => {
        const cardData = game.getCardDataFromGamestate(mockGamestate);
        expect(cardData).toEqual(mockGameData);
      },
    );

    it(
      'generates the expected slack payload',
      () => {
        // eslint-disable-next-line no-unused-vars
        const payload = game.getSlackPayload(mockGameData);
        // TODO:  add expected slack payload and assert
      },
    );
  },
);

describe(
  'Card dealing functions',
  () => {
    it(
      'advances partition state correctly when deck is not empty',
      () => {
        const partition = expectedInitialGamestate.partitions[0];
        const expected = {
          undrawn: [
            4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27,
          ],
          discarded: [2],
          activeFaceCardID: 3,
          activeFlipCardID: 1,
        };
        expect(game.advancePartition(partition, arr => arr.reverse())).toEqual(expected);
      },
    );

    it(
      'advances partition state correctly when deck is empty',
      () => {
        const partition = mockPartitionWithEmptyDrawDeck;
        const expected = {
          undrawn: [
            26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11,
            10, 9, 8, 7, 6, 5, 4, 3,
          ],
          discarded: [2],
          activeFaceCardID: 27,
          activeFlipCardID: 1,
        };
        expect(game.advancePartition(partition, arr => arr.reverse())).toEqual(expected);
      },
    );
  },
);
