const CARDS = Object.freeze({
  1: {
    value: 1,
    action: 16,
  },
  2: {
    value: 1,
    action: 17,
  },
  3: {
    value: 1,
    action: 18,
  },
  4: {
    value: 2,
    action: 16,
  },
  5: {
    value: 2,
    action: 17,
  },
  6: {
    value: 2,
    action: 18,
  },
  7: {
    value: 3,
    action: 16,
  },
  8: {
    value: 3,
    action: 21,
  },
  9: {
    value: 3,
    action: 20,
  },
  10: {
    value: 3,
    action: 19,
  },
  11: {
    value: 4,
    action: 19,
  },
  12: {
    value: 4,
    action: 21,
  },
  13: {
    value: 4,
    action: 18,
  },
  14: {
    value: 4,
    action: 20,
  },
  15: {
    value: 4,
    action: 17,
  },
  16: {
    value: 5,
    action: 18,
  },
  17: {
    value: 5,
    action: 16,
  },
  18: {
    value: 5,
    action: 17,
  },
  19: {
    value: 5,
    action: 18,
  },
  20: {
    value: 5,
    action: 17,
  },
  21: {
    value: 5,
    action: 16,
  },
  22: {
    value: 6,
    action: 20,
  },
  23: {
    value: 6,
    action: 19,
  },
  24: {
    value: 6,
    action: 17,
  },
  25: {
    value: 6,
    action: 16,
  },
  26: {
    value: 6,
    action: 16,
  },
  27: {
    value: 6,
    action: 18,
  },
  28: {
    value: 6,
    action: 21,
  },
  29: {
    value: 7,
    action: 21,
  },
  30: {
    value: 7,
    action: 18,
  },
  31: {
    value: 7,
    action: 16,
  },
  32: {
    value: 7,
    action: 18,
  },
  33: {
    value: 7,
    action: 17,
  },
  34: {
    value: 7,
    action: 20,
  },
  35: {
    value: 7,
    action: 17,
  },
  36: {
    value: 7,
    action: 19,
  },
  37: {
    value: 8,
    action: 18,
  },
  38: {
    value: 8,
    action: 20,
  },
  39: {
    value: 8,
    action: 16,
  },
  40: {
    value: 8,
    action: 19,
  },
  41: {
    value: 8,
    action: 17,
  },
  42: {
    value: 8,
    action: 16,
  },
  43: {
    value: 8,
    action: 18,
  },
  44: {
    value: 8,
    action: 21,
  },
  45: {
    value: 8,
    action: 17,
  },
  46: {
    value: 9,
    action: 18,
  },
  47: {
    value: 9,
    action: 20,
  },
  48: {
    value: 9,
    action: 21,
  },
  49: {
    value: 9,
    action: 19,
  },
  50: {
    value: 9,
    action: 18,
  },
  51: {
    value: 9,
    action: 17,
  },
  52: {
    value: 9,
    action: 16,
  },
  53: {
    value: 9,
    action: 17,
  },
  54: {
    value: 10,
    action: 16,
  },
  55: {
    value: 10,
    action: 19,
  },
  56: {
    value: 10,
    action: 18,
  },
  57: {
    value: 10,
    action: 20,
  },
  58: {
    value: 10,
    action: 21,
  },
  59: {
    value: 10,
    action: 17,
  },
  60: {
    value: 10,
    action: 16,
  },
  61: {
    value: 11,
    action: 18,
  },
  62: {
    value: 11,
    action: 16,
  },
  63: {
    value: 11,
    action: 17,
  },
  64: {
    value: 11,
    action: 16,
  },
  65: {
    value: 11,
    action: 17,
  },
  66: {
    value: 11,
    action: 18,
  },
  67: {
    value: 12,
    action: 18,
  },
  68: {
    value: 12,
    action: 21,
  },
  69: {
    value: 12,
    action: 19,
  },
  70: {
    value: 12,
    action: 17,
  },
  71: {
    value: 12,
    action: 20,
  },
  72: {
    value: 13,
    action: 20,
  },
  73: {
    value: 13,
    action: 19,
  },
  74: {
    value: 13,
    action: 16,
  },
  75: {
    value: 13,
    action: 21,
  },
  76: {
    value: 14,
    action: 18,
  },
  77: {
    value: 14,
    action: 17,
  },
  78: {
    value: 14,
    action: 16,
  },
  79: {
    value: 15,
    action: 18,
  },
  80: {
    value: 15,
    action: 17,
  },
  81: {
    value: 15,
    action: 16,
  },
});

const CITY_PLANS = Object.freeze({
  1: {
    n: 1,
    goals: {
      estates: [5, 5],
    },
    star: false,
    points: {
      first: 8,
      other: 4,
    },
  },
  2: {
    n: 1,
    goals: {
      estates: [6, 6],
    },
    star: false,
    points: {
      first: 10,
      other: 6,
    },
  },
  3: {
    n: 1,
    goals: {
      estates: [2, 2, 2, 2],
    },
    star: false,
    points: {
      first: 8,
      other: 4,
    },
  },
  4: {
    n: 1,
    goals: {
      estates: [3, 3, 3],
    },
    star: false,
    points: {
      first: 8,
      other: 4,
    },
  },
  5: {
    n: 1,
    goals: {
      estates: [4, 4],
    },
    star: false,
    points: {
      first: 6,
      other: 3,
    },
  },
  6: {
    n: 1,
    goals: {
      estates: [1, 1, 1, 1, 1, 1],
    },
    star: false,
    points: {
      first: 8,
      other: 4,
    },
  },
  7: {
    n: 1,
    goals: {
      other: '*7* temps must be hired.',
    },
    star: true,
    points: {
      first: 6,
      other: 3,
    },
  },
  8: {
    n: 1,
    goals: {
      other: 'The first and last house on each street must be built.',
    },
    star: true,
    points: {
      first: 7,
      other: 4,
    },
  },
  9: {
    n: 1,
    goals: {
      other: '*Bis* must be used *5* times on the same street.',
    },
    star: true,
    points: {
      first: 8,
      other: 3,
    },
  },
  10: {
    n: 1,
    goals: {
      other: '*All* houses must be built on the *top* street.',
    },
    star: true,
    points: {
      first: 6,
      other: 3,
    },
  },
  11: {
    n: 1,
    goals: {
      other: '*All* houses must be built on the *bottom* street.',
    },
    star: true,
    points: {
      first: 8,
      other: 4,
    },
  },
  12: {
    n: 2,
    goals: {
      estates: [3, 6],
    },
    star: false,
    points: {
      first: 8,
      other: 4,
    },
  },
  13: {
    n: 2,
    goals: {
      estates: [4, 5],
    },
    star: false,
    points: {
      first: 9,
      other: 5,
    },
  },
  14: {
    n: 2,
    goals: {
      estates: [4, 1, 1, 1],
    },
    star: false,
    points: {
      first: 9,
      other: 5,
    },
  },
  15: {
    n: 2,
    goals: {
      estates: [5, 2, 2],
    },
    star: false,
    points: {
      first: 10,
      other: 6,
    },
  },
  16: {
    n: 2,
    goals: {
      estates: [3, 3, 4],
    },
    star: false,
    points: {
      first: 12,
      other: 7,
    },
  },
  17: {
    n: 2,
    goals: {
      estates: [1, 1, 1, 6],
    },
    star: false,
    points: {
      first: 11,
      other: 6,
    },
  },
  18: {
    n: 2,
    goals: {
      other: 'Build *all* of the *parks* and *pools*, and *1* *roundabout* on the *same* street.',
    },
    star: true,
    points: {
      first: 10,
      other: 5,
    },
  },
  19: {
    n: 2,
    goals: {
      other: '*2* streets must have *all* of the parks built.',
    },
    star: true,
    points: {
      first: 7,
      other: 4,
    },
  },
  20: {
    n: 2,
    goals: {
      other: '*All* of the *parks* and *pools* on the *middle* street must be built.',
    },
    star: true,
    points: {
      first: 8,
      other: 3,
    },
  },
  21: {
    n: 2,
    goals: {
      other: '*All* of the *parks* and *pools* on the *bottom* street must be built.',
    },
    star: true,
    points: {
      first: 10,
      other: 5,
    },
  },
  22: {
    n: 2,
    goals: {
      other: '*2* streets must have *all* of the *pools* built.',
    },
    star: true,
    points: {
      first: 7,
      other: 4,
    },
  },
  23: {
    n: 3,
    goals: {
      estates: [1, 2, 6],
    },
    star: false,
    points: {
      first: 12,
      other: 7,
    },
  },
  24: {
    n: 3,
    goals: {
      estates: [2, 3, 5],
    },
    star: false,
    points: {
      first: 13,
      other: 7,
    },
  },
  25: {
    n: 3,
    goals: {
      estates: [3, 4],
    },
    star: false,
    points: {
      first: 7,
      other: 3,
    },
  },
  26: {
    n: 3,
    goals: {
      estates: [1, 4, 5],
    },
    star: false,
    points: {
      first: 13,
      other: 7,
    },
  },
  27: {
    n: 3,
    goals: {
      estates: [2, 5],
    },
    star: false,
    points: {
      first: 7,
      other: 3,
    },
  },
  28: {
    n: 3,
    goals: {
      estates: [1, 2, 2, 3],
    },
    star: false,
    points: {
      first: 11,
      other: 6,
    },
  },
});

const IMAGES = Object.freeze({
  1: 'https://i.ibb.co/Wc3XYC0/number1.png',
  2: 'https://i.ibb.co/Yk6Ms0Z/number2.png',
  3: 'https://i.ibb.co/gDYtRDK/number3.png',
  4: 'https://i.ibb.co/PMm40JF/number4.png',
  5: 'https://i.ibb.co/1btL884/number5.png',
  6: 'https://i.ibb.co/BgKLRnh/number6.png',
  7: 'https://i.ibb.co/0M2vFqZ/number7.png',
  8: 'https://i.ibb.co/zh7SzkW/number8.png',
  9: 'https://i.ibb.co/ns9gZf1/number9.png',
  10: 'https://i.ibb.co/DfvHW1m/number10.png',
  11: 'https://i.ibb.co/tHrMjPC/number11.png',
  12: 'https://i.ibb.co/G5FgPgg/number12.png',
  13: 'https://i.ibb.co/G5Vr21F/number13.png',
  14: 'https://i.ibb.co/dc1P8q3/number14.png',
  15: 'https://i.ibb.co/C83Mg78/number15.png',
  16: 'https://i.ibb.co/pdbBhw0/fence.png',
  17: 'https://i.ibb.co/5rYzYNt/agent.png',
  18: 'https://i.ibb.co/2WBspwx/park.png',
  19: 'https://i.ibb.co/NK0d2g7/pool.png',
  20: 'https://i.ibb.co/zPTJVkw/temp.png',
  21: 'https://i.ibb.co/DYZjFtw/bis.png',
});

const ACTIONS = Object.freeze({
  16: 'fence',
  17: 'agent',
  18: 'park',
  19: 'pool',
  20: 'temp',
  21: 'bis',
});

const API_BASE = 'https://mf3ogqn6na.execute-api.us-east-1.amazonaws.com/welcome';

const ENDPOINTS = Object.freeze({
  new: `${API_BASE}/game/new/`,
  load: `${API_BASE}/game/load/`,
  next: `${API_BASE}/game/next/`,
});

const BUTTON_ACTIONS = Object.freeze({
  DEAL: 'deal',
  COMPLETE_N1: 1,
  COMPLETE_N2: 2,
  COMPLETE_N3: 3,
});

const CITY_PLAN_ACTIONS = [
  BUTTON_ACTIONS.COMPLETE_N1,
  BUTTON_ACTIONS.COMPLETE_N2,
  BUTTON_ACTIONS.COMPLETE_N3,
];

module.exports = {
  CARDS,
  CITY_PLANS,
  IMAGES,
  ACTIONS,
  ENDPOINTS,
  BUTTON_ACTIONS,
  CITY_PLAN_ACTIONS,
};
