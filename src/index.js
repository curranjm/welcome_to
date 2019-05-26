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
    console.log(next);
    if (constants.CITY_PLAN_ACTIONS.includes(next.action)) {
      response = await game.updateCityPlan(next.gameID, next.action);
      console.log(response);
    } else if (next.action === constants.BUTTON_ACTIONS.DEAL) {
      console.log('PRESSED DEAL BUTTON!!!');
      response = 'DEAL';
    } else {
      response = 'DIDN\'T MATCH IN POST';
      console.log(response);
    }
  }
  return utility.done(response);
};

module.exports = {
  handler,
};
