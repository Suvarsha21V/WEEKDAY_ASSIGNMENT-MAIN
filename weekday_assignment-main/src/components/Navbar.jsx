import { Suspense, lazy, useState, useEffect } from "react";
import { Badge, Divider, Grid, Tab, Tabs, TextField } from "@mui/material";
import hardData from "../data.json";
import Loading from "./Loading";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const MultiSelect = lazy(() => import("./MultiSelect"));
const SingleSelect = lazy(() => import("./SingleSelect"));

const Navbar = ({ data, setFilteredData }) => {
  const [value, setValue] = useState(1);
  const roles = [...new Set(data.map((job) => job.jobRole))];
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  useEffect(() => {
    // Call the filter function whenever any filter value changes
    filterData();
  }, [selectedRoles, selectedMode, selectedExperience, selectedSalary]);

  // Filter function to filter job data based on selected filters
  const filterData = () => {
    let filteredData = data.filter((job) => {
      // Filter by roles
      if (selectedRoles.length > 0 && !selectedRoles.includes(job.jobRole)) {
        return false;
      }
      // Filter by mode
      if (selectedMode.length > 0 && !selectedMode.includes(job.mode)) {
        return false;
      }
      // Filter by experience
      console.log(job.maxExp);
      if (
        (selectedExperience !== "" && job.maxExp < selectedExperience) ||
        (selectedExperience !== "" && job.minExp > selectedExperience)
      ) {
        return false;
      }
      // Filter by salary
      if (
        selectedSalary !== "" &&
        (job.maxJdSalary > selectedSalary || job.minJdSalary < selectedSalary)
      ) {
        return false;
      }
      return true;
    });
    console.log(filteredData);
    // Update the filtered data in parent component
    setFilteredData(filteredData.length > 0 ? filteredData : data);
  };

  useEffect(() => {
    // Ensure that initially, filteredData matches jobDataList
    setFilteredData(data);
  }, [data]);

  const handleRoleChange = (event, value) => {
    setSelectedRoles(event.join(""));
  };

  const handleModeChange = (event, value) => {
    setSelectedMode(event.join(""));
  };

  const handleExperienceChange = (event, inputs) => {
    console.log(typeof +event);
    setSelectedExperience(event);
  };

  const handleSalaryChange = (event) => {
    setSelectedSalary(event);
  };

  return (
    <>
      {/* Tabs to navigate between different sections of the page */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        <Tabs value={value}>
          <Tab label="Applied jobs"  />
          <Tab label="Search jobs" />
          <Tab label="Suggested jobs"  />
        </Tabs>
      </Box>
      {/* Grid container to hold all the filters */}
      <Grid lg={12} item container spacing={2}>
        <Suspense fallback={<Loading />}>
          <Grid item lg={2} xs={6} sm={6}>
            <MultiSelect
              options={roles}
              name="Roles"
              onChange={handleRoleChange}
            />
          </Grid>

          <Grid item lg={2} xs={6} sm={6}>
            <MultiSelect
              options={hardData.mode}
              name="Mode"
              onChange={handleModeChange}
            />
          </Grid>

          <Grid item lg={2} xs={12} sm={4}>
            <SingleSelect
              options={hardData.experience}
              name="Experience"
              width={150}
              onChange={handleExperienceChange}
            />
          </Grid>
          <Grid item lg={2} xs={12} sm={4}>
            <SingleSelect
              options={hardData.minBasePay}
              name="Salary Range"
              width={250}
              onChange={handleSalaryChange}
            />
          </Grid>
        </Suspense>
      </Grid>
    </>
  );
};

Navbar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Navbar;
