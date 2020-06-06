var tableDefinition = require("./tableDefinition");

const AWS = require("aws-sdk");
AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000",
});
var dynamodb = new AWS.DynamoDB();

console.log(tableDefinition);
dynamodb.createTable(tableDefinition, function (err, data) {
  if (err) console.log(err);
  // an error occurred
  else console.log(data); // successful response
});
