const fs = require("fs");
const AWS = require("aws-sdk");
const lambda = require("./lambdaLoader").handler;
const transformAndBatch = require("./components/transformAndBatch");
const saveDDBAsync = require("./components/saveToDDBAsync");
var parse = require("csv-parse");

const event = JSON.parse(fs.readFileSync("./s3Event.json"));

console.log(event);

event.Records[0].s3.object.key = "test.csv";
lambda(event);
