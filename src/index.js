const utility = require('./utility');
const game = require('./game');
const constants = require('./constants');


const handler = async (event) => {
  let response = 'httpMethod not specified';

  if (event.httpMethod === 'GET') {
    if (event.resource === '/game/new') {
      response = await game.createGame();
    } else if (event.resource === '/game/load/{gameID}') {
      response = await game.currentGame(event.pathParameters.gameID);
    } else if (event.resource === '/game/turn/{gameID}') {
      response = 'next turn is not set up yet';
    } else {
      response = event;
    }
  } else if (event.httpMethod === 'POST') {
    const next = utility.getCommandObjectFromBody(event.body);

    if (constants.CITY_PLAN_ACTIONS.includes(next.action)) {
      response = await game.updateCityPlan(next.gameID, next.action);
      console.log(response);
    } else if (next.action === constants.BUTTON_ACTIONS.DEAL) {
      response = await game.advanceGameState(next.gameID);
    } else {
      console.log('Invalid POST route.');
    }
  }
  return utility.done(response);
};

module.exports = {
  handler,
};
