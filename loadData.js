var fs = require("fs");
var parse = require("csv-parse");
//const transform = require("stream-transform");
var async = require("async");
var { transform } = require("node-json-transform");
const AWS = require("aws-sdk");
const map = require("./configurations/transformationMap");
AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000",
});
const dynamodbDocClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
// AWS.config.update({
//   region: "us-east-1",
// });
// var s3 = new AWS.S3(); //{apiVersion: '2006-03-01'}
// var params = { Bucket: "aaluni-csv-upload", Key: "myImageFile.jpg" };
// s3.getObject(params).createReadStream();

const csv_filename = process.env.FILE_NAME || "./test.csv";
const TABLE_NAME = process.env.TABLE_NAME || "uk_postcodes";
const BATCH_SIZE = process.env.BATCH_SIZE || 4;

rs = fs.createReadStream(csv_filename);
parser = parse(
  {
    columns: true,
    delimiter: ",",
  },
  function (err, data) {
    var split_arrays = [];
    //split incoming data and make chunks for ddb batch input
    while (data.length > 0) {
      let cur25 = data.splice(0, BATCH_SIZE);
      //transform the data in the required format using node-json-transform
      cur25 = transform(cur25, map);
      //Form an array of PutRequests
      let item_data = [];
      for (var i = cur25.length - 1; i >= 0; i--) {
        const this_item = {
          PutRequest: {
            Item: { ...cur25[i] },
          },
        };
        item_data.push(this_item);
      }
      split_arrays.push(item_data);
    }

    //Async process the chunks
    async.eachOf(
      split_arrays,
      (item_data, chunk_index, callback) => {
        const params = { RequestItems: {} };
        params.RequestItems[TABLE_NAME] = item_data;
        console.log(JSON.stringify(params, null, 2));
        dynamodbDocClient.batchWrite(params, function (err, res, cap) {
          if (err === null) {
            console.log(
              `Processed chunk ${chunk_index} of Object:${null}:` +
                `Records from row:${chunk_index * BATCH_SIZE + 1} ` +
                `to row: ${chunk_index * BATCH_SIZE + item_data.len}`
            );
          } else {
            console.error(err);
            console.log("Fail chunk #" + chunk_index);
          }
          callback();
        });
      },
      () => {
        // run after end of processing
        console.log("all data imported....");
      }
    );
  }
);

//Pipe the stream for parsing
rs.pipe(parser);
