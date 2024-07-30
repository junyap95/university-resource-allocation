import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DateBasedAllocator({ bookingData, setAllocatedData }) {
    const [date, setDate] = React.useState('');
    // To convert a Set back into an array use the spread operator.
    const uniqueDates = [...new Set(bookingData.map(e => e.start_date))]
    const handleChange = (event) => {
        console.log(event.target.value);
        setDate(event.target.value);
    };


    const handleAllocate = async (event) => {
        // prepare the payload
        try {
            console.log("payload date", date)
            const response = await fetch("http://localhost:3001/time-greedy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date: date }),
            });

            // Check if the response is OK (status code 200-299)
            if (response.ok) {
                const data = await response.json();
                console.log("response from endpoint", data);
                setAllocatedData(data);
            }
        } catch (error) {
            // Handle errors gracefully, e.g., by setting an error message state
            console.error("Submission error:", error);
        }
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select a Date</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="date"
                    onChange={handleChange}
                >
                    {uniqueDates.map((uniqueDate, index) =>
                        <MenuItem key={index} value={uniqueDate}>{uniqueDate}</MenuItem>
                    )}

                </Select>
                <button onClick={handleAllocate}>Allocate this Date</button>
            </FormControl>
        </Box>
    );
}
