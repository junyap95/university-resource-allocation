import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BBKbutton from "../BBKbutton";
import {
  START_TIME_GREEDY,
  LONGEST_DURATION_GREEDY,
  RANDOM_ASSIGNMENT,
  DYNAMIC_PROGRAMMING,
  API_URL,
} from "../../helpers/client-constants";

export default function DateBasedAllocator({
  setAllocatedData,
  bookingData,
  setHighlighted,
  setResultGenerating,
}) {
  const [dateAndAlgo, setDateAndAlgo] = useState({
    date: "",
    algorithm: "",
  });

  // To convert a Set back into an array use the spread operator.
  const uniqueDates = [...new Set(bookingData.map((e) => e.start_date))];

  const handleChangeDate = useCallback(
    (event) => {
      setDateAndAlgo((prev) => ({
        ...prev,
        date: event.target.value,
      }));
      setHighlighted(event.target.value);
      setAllocatedData({});
    },
    [setAllocatedData, setHighlighted]
  );

  // choose which greedy to apply in payload
  const handleChangeAlgo = useCallback(
    (event) => {
      setDateAndAlgo((prev) => ({
        ...prev,
        algorithm: event.target.value,
      }));
    },
    [setDateAndAlgo]
  );

  const handleAllocate = useCallback(async () => {
    try {
      setResultGenerating(true);
      if (dateAndAlgo.algorithm !== DYNAMIC_PROGRAMMING)
        await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch(`${API_URL}/execute-algorithm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dateAndAlgo),
      });
      if (response.ok) {
        const data = await response.json();
        setAllocatedData(data);
        setResultGenerating(false);
      }
    } catch (error) {
      console.error("Handling allocate error in DateBasedAllocator component:", error);
    }
  }, [dateAndAlgo, setAllocatedData, setResultGenerating]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3em",
      }}
    >
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a Date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dateAndAlgo.date}
            label="date"
            onChange={handleChangeDate}
          >
            {uniqueDates.map((uniqueDate, index) => (
              <MenuItem key={index} value={uniqueDate}>
                {uniqueDate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Algorithm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dateAndAlgo.algorithm}
            label="greedy-algorithms"
            onChange={handleChangeAlgo}
          >
            <MenuItem key={"startTime"} value={START_TIME_GREEDY}>
              Greedy - Earliest Start Time
            </MenuItem>
            <MenuItem key={"duration"} value={LONGEST_DURATION_GREEDY}>
              Greedy - Longest Duration
            </MenuItem>
            <MenuItem key={"random"} value={RANDOM_ASSIGNMENT}>
              Random
            </MenuItem>
            <MenuItem key={"dynamic"} value={DYNAMIC_PROGRAMMING}>
              Dynamic Programming
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <BBKbutton btnClass={"green-btn"} btnText={"Allocate this Date"} handlerFn={handleAllocate} />
    </div>
  );
}
