import * as React from 'react';
import { useCallback, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DateBasedAllocator({ bookingData, setAllocatedData, setHighlightedDate }) {
    const [date, setDate] = useState('');
    // To convert a Set back into an array use the spread operator.
    const uniqueDates = [...new Set(bookingData.map(e => e.start_date))]
    const handleChange = useCallback((event) => {
        setDate(event.target.value);
        setHighlightedDate(event.target.value);
    }, [setHighlightedDate])


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
                setAllocatedData(data);
            }
        } catch (error) {
            // Handle errors gracefully, e.g., by setting an error message state
            console.error("Submission error:", error);
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ minWidth: 200 }}>
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
                </FormControl>
            </Box>
            <button className='btn main-btn allocate-btn' onClick={handleAllocate}>Allocate this Date</button>
        </div>
    );
}
