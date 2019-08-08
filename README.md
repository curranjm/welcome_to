# WelcomeTo
Automating dealing hands in Welcome To... with a node app using API gateway with Lambda.

Manages the three decks that must have a face and back card dealt each turn and tracks completion status of game goals. Slack buttons hit API Gateway endpoints that then invoke JS code via AWS Lambda. The Lambda code uses Dynamo DB to maintain game state and builds a JSON blob to provide the formatted information for the turn being invoked to Slack.
