import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../Button";

const START_TIME_GREEDY = "START_TIME_GREEDY";
const LONGEST_DURATION_GREEDY = "LONGEST_DURATION_GREEDY";
const RANDOM_ASSIGNMENT = "RANDOM_ASSIGNMENT";

export default function DateBasedAllocator({ setAllocatedData, bookingData, setHighlightedDate }) {
  // const [date, setDate] = useState('');
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
      setHighlightedDate(event.target.value);
    },
    [setHighlightedDate]
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

  const handleAllocate = async () => {
    // prepare the payload
    try {
      const response = await fetch("http://localhost:3001/allocate-greedy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dateAndAlgo),
      });
      if (response.ok) {
        const data = await response.json();
        setAllocatedData(data);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

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
          </Select>
        </FormControl>
      </Box>

      <Button btnClass={"green-btn"} btnText={"Allocate this Date"} handlerFn={handleAllocate} />
    </div>
  );
}
