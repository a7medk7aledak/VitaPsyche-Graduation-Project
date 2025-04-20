//change the date format comes from the backend to be 30min or 60min
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

//get first letter for the alternative image
export const getInitial = (username?: string): string => {
  return username?.trim() ? username.charAt(0).toUpperCase() : "?";
};

export const getReviewStats = (reviews: { rating: number }[]) => {
  const count = reviews.length;
  if (count === 0) return { count: 0, average: 0 };

  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = parseFloat((total / count).toFixed(1)); // Convert to number

  return { count, average };
};
