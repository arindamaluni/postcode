module.exports = {
  TableName: "uk_postcodes",
  KeySchema: [
    // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
    {
      // Required HASH type attribute
      AttributeName: "postcode_compact",
      KeyType: "HASH",
    },
    {
      // Optional RANGE key type for HASH + RANGE tables
      AttributeName: "RK",
      KeyType: "RANGE",
    },
  ],
  AttributeDefinitions: [
    // The names and types of all primary and index key attributes only

    {
      AttributeName: "postcode_compact",
      AttributeType: "S", // (S | N | B) for string, number, binary
    },
    {
      AttributeName: "RK",
      AttributeType: "S", // (S | N | B) for string, number, binary
    },
    // {
    //   AttributeName: "postcode",
    //   AttributeType: "S", // (S | N | B) for string, number, binary
    // },
    // {
    //   AttributeName: "eastings",
    //   AttributeType: "S", // (S | N | B) for string, number, binary
    // },
    // {
    //   AttributeName: "northings",
    //   AttributeType: "S", // (S | N | B) for string, number, binary
    // },

    // ... more attributes ...
  ],
  ProvisionedThroughput: {
    // required provisioned throughput for the table
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  // GlobalSecondaryIndexes: [
  //   // optional (list of GlobalSecondaryIndex)
  //   {
  //     IndexName: "index_name_1",
  //     KeySchema: [
  //       {
  //         // Required HASH type attribute
  //         AttributeName: "index_hash_key_attribute_name_1",
  //         KeyType: "HASH",
  //       },
  //       {
  //         // Optional RANGE key type for HASH + RANGE secondary indexes
  //         AttributeName: "index_range_key_attribute_name_1",
  //         KeyType: "RANGE",
  //       },
  //     ],
  //     Projection: {
  //       // attributes to project into the index
  //       ProjectionType: "INCLUDE", // (ALL | KEYS_ONLY | INCLUDE)
  //       NonKeyAttributes: [
  //         // required / allowed only for INCLUDE
  //         "attribute_name_1",
  //         // ... more attribute names ...
  //       ],
  //     },
  //     ProvisionedThroughput: {
  //       // throughput to provision to the index
  //       ReadCapacityUnits: 1,
  //       WriteCapacityUnits: 1,
  //     },
  //   },
  //   // ... more global secondary indexes ...
  // ],
  // LocalSecondaryIndexes: [
  //   // optional (list of LocalSecondaryIndex)
  //   {
  //     IndexName: "index_name_2",
  //     KeySchema: [
  //       {
  //         // Required HASH type attribute - must match the table's HASH key attribute name
  //         AttributeName: "hash_key_attribute_name",
  //         KeyType: "HASH",
  //       },
  //       {
  //         // alternate RANGE key attribute for the secondary index
  //         AttributeName: "index_range_key_attribute_name_2",
  //         KeyType: "RANGE",
  //       },
  //     ],
  //     Projection: {
  //       // required
  //       ProjectionType: "INCLUDE", // (ALL | KEYS_ONLY | INCLUDE)
  //       NonKeyAttributes: [
  //         // required / allowed only for INCLUDE
  //         "attribute_name_1",
  //         // ... more attribute names ...
  //       ],
  //     },
  //   },
  //   // ... more local secondary indexes ...
  // ],
};

// {
//   "postcode": "HA4 8AT",
//   "quality": 1,
//   "eastings": 510254,
//   "northings": 187988,
//   "country": "England",
//   "nhs_ha": "London",
//   "longitude": -0.410226,
//   "latitude": 51.57998,
//   "european_electoral_region": "London",
//   "primary_care_trust": "Hillingdon",
//   "region": "London",
//   "lsoa": "Hillingdon 004A",
//   "msoa": "Hillingdon 004",
//   "incode": "8AT",
//   "outcode": "HA4",
//   "parliamentary_constituency": "Ruislip, Northwood and Pinner",
// "admin_district": "Hillingdon",
// "parish": "Hillingdon, unparished area",
// "admin_county": null,
// "admin_ward": "Eastcote and East Ruislip",
//   "ced": null,
//   "ccg": "NHS Hillingdon",
//   "nuts": "Harrow and Hillingdon",
//   "codes": {
//       "admin_district": "E09000017",
//       "admin_county": "E99999999",
//       "admin_ward": "E05000329",
//       "parish": "E43000207",
//       "parliamentary_constituency": "E14000906",
//       "ccg": "E38000082",
//       "ccg_id": "08G",
//       "ced": "E99999999",
//       "nuts": "UKI74"
//   }
// }
