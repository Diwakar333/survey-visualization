// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
// import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Filters from "./Filter";
// import surveyData from "../DCE_survey_results - DCE_survey_results.csv";
import { parseSurveyData } from "../dataUtils";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch("/DCE_survey_results - DCE_survey_results.csv")
      .then((response) => response.text())
      .then((data) => {
        const parsedData = parseSurveyData(data);
        setData(parsedData);
      });
  }, []);

  const applyFilters = (data, filters) => {
    // Implement filtering logic based on filters
    return data.filter((item) => {
      let isMatch = true;
      for (const key in filters) {
        if (filters[key] && item[key] !== filters[key]) {
          isMatch = false;
          break;
        }
      }
      return isMatch;
    });
  };

  const filteredData = applyFilters(data, filters);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <BarChart width={600} height={300} data={filteredData}>
        <XAxis dataKey="persona" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
