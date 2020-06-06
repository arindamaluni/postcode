var parse = require("csv-parse");
const transformAndBatch = require("./transformAndBatch");
const saveDDBAsync = require("./saveToDDBAsync");
const { pipeline } = require("stream");

// //returns a Callback function for the csv-parse parser
// function getCallbackForParser(TABLE_NAME, dynamodbDocClient) {
//   //Parser call back methof that pases, transforms and saves
//   //closure with the destination table and the client for local or remote references
//   return
// }

module.exports = (sourceStream, TABLE_NAME, dynamodbDocClient) => {
  //Create a parser to process stream

  streamParser = parse(
    {
      columns: true,
      delimiter: ",",
    },
    (err, data) => {
      if (data) {
        console.log("Transforming Data....");
        batch_arrays = transformAndBatch(data);
        console.log("Saving batch.....");
        saveDDBAsync(TABLE_NAME, batch_arrays, dynamodbDocClient);
      }
      if (err) {
        console.error("Error processing stream: message:" + err);
      }
    }
  );
  //sourceStream.pipe(streamParser);
  pipeline(sourceStream, streamParser, (err) => {
    if (err) console.error("Error processing streams..............." + err);
  });
};
