// Helper function to convert time string to seconds
export const timeStringToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + (seconds || 0);
};

// Helper function to parse time string to hours and minutes
export const timeStringParser = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 100 + minutes;
};