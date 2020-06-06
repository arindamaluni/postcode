const { transform } = require("node-json-transform");
const map = require("../configurations/transformationMap");
const BATCH_SIZE = process.env.BATCH_SIZE || 4;

//Callback definition for data streams from CSV parser
module.exports = function (data) {
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

  return split_arrays;
};
