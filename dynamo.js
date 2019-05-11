const AWS = require('aws-sdk');

let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});

module.exports = class DB {

  /**
   *
   */
  get(key, value, table) {
    return new Promise((resolve, reject) => {
      if (!table) {
        throw 'table needed';
      }
      if (typeof key !== 'string') {
        throw `key was not string and was ${JSON.stringify(key)} on table ${table}`;
      }
      if (typeof value !== 'string') {
        throw `value was not string and was ${JSON.stringify(value)} on table ${table}`;
      }
      let params = {
        TableName: table,
        Key: {[key]: value}
      };
      documentClient.get(params, function(err, data) {
        if (err) {
          console.log(`There was an error fetching the data for ${key} ${value} on table ${table}`, err);
          return reject(err);
        }
        return resolve(data.Item);
      });
    })
  }

  write(data, table) {
    return new Promise((resolve, reject) => {
      let params = {
        TableName: table,
        Item: { ...data }
      };
      documentClient.put(
        params,
        function(err, result) {
          if (err) {
            console.log("Err in writeForCall writing messages to dynamo:", err);
            console.log(params);
            return reject(err);
          }
          console.log('wrote data to table ', table)
          return resolve({ ...result.Attributes, ...params.Item });
        }
      );
    });
  }


  async tableExists(tableName, callback) {
    status = false;
    var params = {
      TableName: tableName
    };
    documentClient.describeTable(
      params,
      (err, data) => {
        if (err) {
            status = false;
        }
        else {
            status = true;
        }
        callback(status);
      }
    );
  }
}
