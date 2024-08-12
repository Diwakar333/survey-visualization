// src/dataUtils.js

import Papa from "papaparse";

const attributeLookup = {
  get_attribute_text: {
    0: "Will this car have advanced safety features?",
    1: "What range and charging time will this car offer",
  },
  get_level_ids: { 0: [1, 2], 1: [3, 4] },
  get_attribute_id: { 1: 0, 2: 0, 3: 1, 4: 1 },
  get_level_text: {
    1: "Advanced airbag system to protect passengers",
    2: "Lane keep assist to prevent drifting into other lanes",
    3: "Up to 500 miles range, featuring a revolutionary battery system that charges in 45 minutes",
    4: "200 miles range with a robust charging infrastructure for recharging in 15 minutes",
  },
};

export const parseSurveyData = (csvData) => {
  const parsedData = Papa.parse(csvData, { header: true }).data;
  return parsedData.map((row) => {
    let transformedRow = {};
    Object.keys(row).forEach((key) => {
      if (key in attributeLookup.get_attribute_text) {
        let attributeId = attributeLookup.get_attribute_id[row[key]];
        transformedRow[attributeLookup.get_attribute_text[attributeId]] =
          attributeLookup.get_level_text[row[key]];
      } else {
        transformedRow[key] = row[key];
      }
    });
    return transformedRow;
  });
};
