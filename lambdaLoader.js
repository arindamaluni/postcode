"use strict";

const processStreamToDDB = require("./components/processStreamToDDB");

const AWS = require("aws-sdk");
const map = require("./configurations/transformationMap");

AWS.config.update({
  region: "us-east-1",
});
const dynamodbDocClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
var s3 = new AWS.S3();

const SOURCE_BUCKET_NAME =
  process.env.SOURCE_BUCKET_NAME || "aaluni-csv-upload";
const DESTINATION_BUCKET_NAME =
  process.env.DESTINATION_BUCKET_NAME || "aaluni-csv-processed";
const TABLE_NAME = process.env.TABLE_NAME || "aaluni-postcode-dev-uk_postcodes";

exports.handler = (event, context, callback) => {
  //const body = JSON.parse(event.body);
  console.log(event.Records[0].s3.object.key);
  var params = {
    Bucket: event.Records[0].s3.bucket.name,
    Key: event.Records[0].s3.object.key,
  };
  try {
    if (!TABLE_NAME || !DESTINATION_BUCKET_NAME)
      throw new Error(
        "Enviornment varibales TABLE_NAME or DESTINATION_BUCKET_NAME not defined"
      );
    console.log(
      `Getting S3 stream.............for Bucket:${params.Bucket} Key:${params.Key}`
    );
    const s3Stream = s3.getObject(params).createReadStream();
    s3Stream.on("error", function (err) {
      console.error("File Stream:", err);
    });

    //TODO if no error in opening stream change the name of the object or set tag
    //Process the file in batches
    console.log("starting processing");
    processStreamToDDB(s3Stream, TABLE_NAME, dynamodbDocClient);
    //TODO move the processed object resetting the tag
    //TODO save a report on processing in the bucket
  } catch (err) {
    console.error(err);
  }
  //console.log("End of processing...............returning lambda");
};
