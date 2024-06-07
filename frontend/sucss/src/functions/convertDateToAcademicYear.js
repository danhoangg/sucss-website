function convertDateToAcademicYear(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth(); // Note: January is 0, September is 8
  
    // Determine the academic year based on the month
    if (month >= 8) { // From September to December, the academic year starts this year
      const startYear = year % 100; // Get the last two digits of the year
      const endYear = (year + 1) % 100; // Get the last two digits of the next year
      return `${startYear}-${endYear}`;
    } else { // From January to August, the academic year started the previous year
      const startYear = (year - 1) % 100; // Get the last two digits of the previous year
      const endYear = year % 100; // Get the last two digits of this year
      return `${startYear}-${endYear}`;
    }
  }
  
export default convertDateToAcademicYear;
  