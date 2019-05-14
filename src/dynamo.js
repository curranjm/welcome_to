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
  if (!table) {
    const error = {
      message: 'table needed',
    };
    throw error;
  }
  if (typeof key !== 'string') {
    const error = {
      message: `key was not string and was ${JSON.stringify(key)} on table ${table}`,
    };
    throw error;
  }
  if (typeof value !== 'string') {
    const error = {
      message: `value was not string and was ${JSON.stringify(value)} on table ${table}`,
    };
    throw error;
  }
  const params = {
    TableName: table,
    Key: { [key]: value },
  };
  documentClient.get(params, (err, data) => {
    if (err) {
      console.log(`There was an error fetching the data for ${key} ${value} on table ${table}`, err);
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
