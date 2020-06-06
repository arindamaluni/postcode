const fs = require("fs");
const processStreamToDDB = require("./components/processStreamToDDB");

const AWS = require("aws-sdk");
const map = require("./configurations/transformationMap");
AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000",
});
const dynamodbDocClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const csv_filename = process.env.FILE_NAME || "./test.csv";
const TABLE_NAME = process.env.TABLE_NAME || "uk_postcodes";
rs = fs.createReadStream(csv_filename);

processStreamToDDB(rs, TABLE_NAME, dynamodbDocClient);
