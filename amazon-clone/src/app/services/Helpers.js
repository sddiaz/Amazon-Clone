export default class HelperFunctions {
  static getRandomIndices = (max, count) => {
    const indices = new Set();
    while (indices.size < count && indices.size < max + 1) {
      indices.add(Math.floor(Math.random() * (max + 1)));
    }
    return Array.from(indices);
  };
  static formatDepartmentName = (name) => {
    const formattedName = name
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    return formattedName;
  };
  static formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };
  static formatLocation = (location) => {
    if (!location) return "...";
    return `${location.city}, ${location.state}`;
  };
  static minutesUntilMidnight = () => {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    const totalMinutes = (midnight.getTime() - new Date().getTime()) / 1000 / 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    const hourText = hours === 1 ? 'hour' : 'hours';
    const minuteText = minutes === 1 ? 'minute' : 'minutes';
    return `${hours} ${hourText} and ${minutes} ${minuteText}`;
  };
}
