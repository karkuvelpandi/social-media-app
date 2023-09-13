// General Utility Functions

// Utility function to check the email whether its valid or not
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Time ago function
export const timeAgo = (timestamp: number) => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "a year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "a day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else if (seconds > 0) {
    return seconds === 1 ? "a second ago" : `${seconds} seconds ago`;
  } else {
    return "just now";
  }
};

// Time ago function
export const timeAgoShort = (timestamp: number) => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1y" : `${years}y`;
  } else if (months > 0) {
    return months === 1 ? "1m" : `${months}m`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1w" : `${weeks}w`;
  } else if (days > 0) {
    return days === 1 ? "1d" : `${days}d`;
  } else if (hours > 0) {
    return hours === 1 ? "1h" : `${hours}h`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1m" : `${minutes}m`;
  } else if (seconds > 0) {
    return seconds === 1 ? "1s" : `${seconds}s`;
  } else {
    return "now";
  }
};
