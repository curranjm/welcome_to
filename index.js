// const DB = require('./dynamo')
// const constants = require('./constants')
// const dynamo = new DB();

const DECKSIZE = 81;
const GAME_TABLE = 'welcomeToGamestate'


exports.handler = async (event) => {
//  console.log(event);
  return done(initializeCardTable());
  if (event.httpMethod === 'PUT'){
    let response = "this was a put";
      return done(response);
  } else if (event.httpMethod === 'GET'){
    let response = "this was a get";
    return done(response);
  } else {
    let response = done("httpMethod not specified");
  }
};

const done = response => {
  return {
      statusCode: '200',
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      }
  }
}

const putMovie = async event => {
  let { movie } = JSON.parse(event.body);
  let genre = event.pathParameters.genre;
  let ID = `${movie}-${genre}`;
  return Dynamo.increment(ID, 'movie-api')
}

const initializeCardTable = async () => {
  const deck = [];
  let counter = 1;
  while (counter <= DECKSIZE) {
    deck.push(counter++);
  }
  shuffle(deck);

  const partitions = [];
  partitions.push(initializePartition(deck.slice(0, 27)));
  partitions.push(initializePartition(deck.slice(27, 54)));
  partitions.push(initializePartition(deck.slice(54)));

  return Dynamo.write(
    
  )
}

const initializePartition = deck => {
  return {
    undrawn: deck,
    discarded: [],
    activeFaceCardID: 0,
    activeFlipCardID: 0
  }
}

/**
 * Fisher-Yates shuffle code from:
 * https://stackoverflow.com/a/2450976
 */
const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


initializeCardTable();
