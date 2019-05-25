// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

/**
 * Get data from a Dynamo DB table.
 *
 * @param {*} key
 * @param {*} value
 * @param {*} table
 */
const get = (key, value, table) => new Promise((resolve, reject) => {
  const params = {
    TableName: table,
    Key: { [key]: value },
  };
  documentClient.get(params, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(data.Item);
  });
});

/**
 * Write to the Dynamo DB.
 *
 * @param {object} data The data to be written to the table.
 * @param {string} tableName The name of the table to write to.
 */
const write = (data, tableName) => new Promise((resolve, reject) => {
  const params = {
    TableName: tableName,
    Item: { ...data },
  };

  documentClient.put(
    params,
    (err, result) => {
      if (err) {
        console.log('Err in writeForCall writing messages to dynamo:', err);
        console.log(params);
        return reject(err);
      }
      console.log('wrote data to table ', tableName);
      return resolve({ ...result.Attributes, ...params.Item });
    },
  );
});


module.exports = {
  get,
  write,
};
