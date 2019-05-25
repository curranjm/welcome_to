const game = require('./game');
const constants = require('./constants');

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

const mockCityPlans = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

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
};

const mockGameData = {
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
    n1: constants.CITY_PLANS[1],
    n2: constants.CITY_PLANS[12],
    n3: constants.CITY_PLANS[27],
  },
};

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
        const payload = game.getSlackPayload(mockGameData);
        console.log('payload: ', payload);
      },
    );
  },
);
