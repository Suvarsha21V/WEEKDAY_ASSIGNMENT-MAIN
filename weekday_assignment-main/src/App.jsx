import { useState, useEffect } from "react";
import useInfiniteScroll from "./customHook/useInfiniteScroll";
import CardList from "./components/CardList";
import Loading from "./components/Loading";
import { companyNames } from "./constants";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";

function App() {
  // State to store fetched data and offset
  const [jobDataList, setJobDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data when component mounts, and when offset changes
  useEffect(() => {
    fetchData();
  }, [offset]);

  // Fetch data from API using fetch API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 9,
            offset: offset,
          }),
        }
      );
      const data = await response.json();
      // Adding company names to job data as there i was not getting compnay name from API
      const updatedData = data.jdList.map((job) => {
        let randomIndex = Math.floor(Math.random() * companyNames.length);
        let companyName = companyNames[randomIndex];

        const modes = ["In-Office", "Hybrid", "Remote"];
        let randomModeIndex = Math.floor(Math.random() * modes.length);
        let mode = modes[randomModeIndex];

        return { ...job, companyName, mode };
      });
      console.log(updatedData);
      setJobDataList((prevJdList) => [...prevJdList, ...updatedData]);
    } catch (error) {
      console.error(error);
    }
  };
  // Custom hook to handle infinite scrolling
  const loading = useInfiniteScroll(fetchData, offset, setOffset);

  return (
    <Box>
      <Navbar data={jobDataList} setFilteredData={setFilteredData} />
      <CardList data={filteredData} />
      {loading && <Loading />}
    </Box>
  );
}

export default App;
