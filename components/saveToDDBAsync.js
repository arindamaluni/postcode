const async = require("async");
BATCH_SIZE = process.env.BATCH_SIZE || 4;
//Async process the chunks
//Takes input of tablename to persist the data, the split arrays for batch
//and the DDBClient (local/remote Dynamodb)
module.exports = (TABLE_NAME, split_arrays, dynamodbDocClient) => {
  async.eachOf(
    split_arrays,
    (item_data, chunk_index, callback) => {
      const params = { RequestItems: {} };
      params.RequestItems[TABLE_NAME] = item_data;
      //Save to DDB
      dynamodbDocClient.batchWrite(params, function (err, res, cap) {
        if (err === null) {
          console.log(
            `Processed chunk ${chunk_index} ` +
              `Records from row:${chunk_index * BATCH_SIZE + 1} ` +
              `to row: ${chunk_index * BATCH_SIZE + item_data.length}`
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
};
