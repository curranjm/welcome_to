const utility = require('./utility');
const game = require('./game');


const handler = async (event) => {
  // return utility.done(event);
  let response = 'httpMethod not specified';
  if (event.httpMethod === 'PUT') {
    response = 'this was a put';
  } else if (event.httpMethod === 'GET') {
    if (event.path === '/game/new') {
      utility.sendToSlackbot();
      response = await game.initializeGameState(false);
    } else if (event.resource === '/game/load/{gameID}') {
      const gameState = await game.getGameState(event.pathParameters.gameID);
      const cardData = game.getCardDataFromGamestate(gameState);
      const slackPayload = game.getSlackPayload(cardData);
      utility.sendToSlackbot(slackPayload)
        .then(console.log)
        .catch(console.log);
      response = slackPayload;
    } else {
      response = event;
    }
  }
  return utility.done(response);
};

module.exports = {
  handler,
};
