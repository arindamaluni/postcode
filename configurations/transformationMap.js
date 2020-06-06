module.exports = {
  item: {
    postcode_compact: "",
    RK: "",
    postcode: "pcd",
    unit_postcode_8: "pcd2",
    introduction: "dointr",
    termination: "doterm",
    usertype: "usertype",
    eastings: "oseast1m",
    northings: "osnrth1m",
    grid_quality: "osgrdind",
    census_output_area: "oa11",
    county: "cty",
    electoral_div: "ced",
    local_authority_dist: "laua",
    elec_ward: "ward",
    health_auth: "hlthau",
    nhs: "nhser",
    country: "ctry",
    region: "rgn",
    parliamentary_constituency: "pcon",
    european_elotoral_region: "eer",
    local_learning_n_Skill_council: "teclec",
    travel_to_work_area: "ttwa",
    primary_care_trust: "pct",
    lau_2: "nuts",
    national_park: "npark",
    lsoa: "lsoa11",
    msoa: "msoa11",
    cencus_workplace_zone: "wz11",
    clinical_commissoning_group: "ccg",
    built_up_area: "bua11",
    built_up_area_sub_div: "buasd11",
    rural_urban_classification: "ru11ind",
    output_area_classification: "oac11",
    lattitude: "lat",
    longitude: "long",
    local_enterprize_partnership: "lep1",
    local_enterprize_partnership_secondary: "lep2",
    police_force_area: "pfa",
    index_of_multiple_deprivation: "imd",
    cancer_alliance: "calncv",
    sustainability_partnership: "stp",
    codes: {
      output_area: "oa11",
      county: "cty",
      electoral_div: "ced",
      district_authority: "laua",
      elec_div: "ward",
      health_authority: "hlthau",
      nhs: "nhser",
      country: "ctry",
      region: "rgn",
      parliamentary_constituency: "pcon",
      european_elotoral_region: "eer",
      local_learning_n_Skill_council: "teclec",
      travel_to_work_area: "ttwa",
      primary_care_trust: "pct",
    },
  },
  operate: [
    // {
    //   run: "Date.parse",
    //   on: "date",
    // },
    // {
    //   run: function (val) {
    //     return val + " more info";
    //   },
    //   on: "info",
    // },
  ],
  each: function (item) {
    item.postcode_compact = item.postcode.replace(/\s/g, "");
    item.RK = item.eastings + "-" + item.northings;
    return item;
  },
};
