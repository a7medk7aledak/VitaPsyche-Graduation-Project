export const formatDuration = (duration: string): string => {
  if (!duration) return "Unknown"; // Handle missing duration

  const timeParts = duration.split(":");
  const minutes = parseInt(timeParts[1], 10); // Extract minutes
  const seconds = parseInt(timeParts[2], 10); // Extract seconds

  if (minutes === 1 && seconds === 0) {
    return "60";
  } else if (minutes === 0 && seconds === 30) {
    return "30";
  }

  return `${minutes}`; // Default fallback for other durations
};
