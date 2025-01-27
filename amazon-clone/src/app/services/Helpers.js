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
}
