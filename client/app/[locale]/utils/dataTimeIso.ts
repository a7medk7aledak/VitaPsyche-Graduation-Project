/**
 * Utility functions for converting between UI date-time format and ISO 8601 format
 */

/**
 * Converts UI date and time strings to ISO 8601 format
 *
 * @param dateString - Date in format "Day, Mon DD" (e.g., "Thu, Feb 27")
 * @param timeString - Time in format "H:MM AM/PM" (e.g., "5:10 PM")
 * @param year - Optional year (defaults to current year)
 * @param timezone - Optional timezone offset (defaults to "+00:00" for UTC)
 * @returns ISO 8601 formatted date-time string
 */
export function convertToISO(
  dateString: string,
  timeString: string,
  year: number = new Date().getFullYear(),
  timezone: string = "+00:00"
): string {
  try {
    // Parse date parts
    const dateParts = dateString.split(", ");
    const monthDay = dateParts[1].split(" ");
    const monthStr = monthDay[0];
    const day = parseInt(monthDay[1]);

    // Convert month name to month number (1-12)
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames.indexOf(monthStr) + 1;

    if (month === 0) {
      throw new Error(`Invalid month: ${monthStr}`);
    }

    // Parse time parts
    const timeParts = timeString.split(" ");
    const hourMinute = timeParts[0].split(":");
    let hours = parseInt(hourMinute[0]);
    const minutes = parseInt(hourMinute[1]);
    const period = timeParts[1]; // AM or PM

    // Convert to 24-hour format
    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Format to ISO 8601
    const isoDateTime = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00${timezone}`;

    return isoDateTime;
  } catch (error) {
    console.error("Error converting to ISO format:", error);
    throw new Error("Failed to convert date and time to ISO format");
  }
}

/**
 * Converts ISO 8601 date-time string to UI format
 *
 * @param isoString - ISO 8601 formatted date-time string
 * @returns Object containing date and time strings in UI format
 */
export function convertFromISO(isoString: string): {
  date: string;
  time: string;
} {
  try {
    const dateObj = new Date(isoString);

    if (isNaN(dateObj.getTime())) {
      throw new Error(`Invalid ISO date string: ${isoString}`);
    }

    // Format day of week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    // Format month
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[dateObj.getMonth()];

    // Get day of month
    const day = dateObj.getDate();

    // Format time
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    // Create formatted strings
    const formattedDate = `${dayOfWeek}, ${month} ${day}`;
    const formattedTime = `${hours}:${minutes} ${period}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  } catch (error) {
    console.error("Error converting from ISO format:", error);
    throw new Error("Failed to convert ISO date-time to UI format");
  }
}

/**
 * Convenience function to convert date-time strings between formats
 *
 * @param input - The date/time information to convert
 * @param direction - The conversion direction ("toISO" or "fromISO")
 * @returns Converted date-time string or object
 */
export function convertDateTime(
  input: string | { date: string; time: string },
  direction: "toISO" | "fromISO"
): string | { date: string; time: string } {
  if (direction === "toISO" && typeof input !== "string") {
    return convertToISO(input.date, input.time);
  } else if (direction === "fromISO" && typeof input === "string") {
    return convertFromISO(input);
  } else {
    throw new Error("Invalid input or direction for date-time conversion");
  }
}
