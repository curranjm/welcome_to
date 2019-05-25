const wretch = require('wretch');

wretch().polyfills({
  // eslint-disable-next-line global-require
  fetch: require('node-fetch'),
});

const SLACK_INCOMING_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

/** ***************************************************************************
 *
 * Random number generation.
 * See:
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 *
 *************************************************************************** */

/* eslint-disable */
/**
 * Generate a seed function.
 *
 * @param {string} str String used to generate the seed function.
 */
const xmur3 = (str) => {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
    h = h << 13 | h >>> 19;
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
};

/**
 * Generate a pseudo random number generator based on four seed values.
 *
 * @param {number} a Seed value.
 * @param {number} b Seed value.
 * @param {number} c Seed value.
 * @param {number} d Seed value.
 */
const sfc32 = (a, b, c, d) => {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
};
/* eslint-enable */

/**
 * Get a function that, given a max integer, will return a pseudo random
 * int from 0 to max - 1 inclusive.
 *
 * @returns {function}
 */
const getRandomIntGenerator = () => {
  const str = Date.now().toString();
  const seed = xmur3(str);
  const prng = sfc32(seed(), seed(), seed(), seed());
  return max => Math.floor(prng() * Math.floor(max));
};

/**
 * Fisher-Yates shuffle code from:
 * https://stackoverflow.com/a/2450976
 *
 * @param {array} array
 */
const shuffle = (array) => {
  const result = array;
  const getRandom = getRandomIntGenerator();
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = getRandom(currentIndex);
    currentIndex -= 1;
    temporaryValue = result[currentIndex];
    result[currentIndex] = result[randomIndex];
    result[randomIndex] = temporaryValue;
  }

  return array;
};

/** ****************************************************************************
 *
 * End random number generation.
 *
 **************************************************************************** */

const done = response => ({
  statusCode: '200',
  body: JSON.stringify(response),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
  },
});

const sendToSlackbot = payload => wretch(SLACK_INCOMING_WEBHOOK_URL)
  .headers({ 'Content-Type': 'text/plain' })
  .json(payload)
  .post()
  .res();

module.exports = {
  getRandomIntGenerator,
  shuffle,
  done,
  sendToSlackbot,
};
