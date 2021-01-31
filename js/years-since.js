export function years_since(year, month, day) {
  // Get the current date
  const currentDate = new Date();
  let now = {
    day: currentDate.getUTCDate(),
    year: currentDate.getUTCFullYear(),
    month: currentDate.getUTCMonth() + 1  // month is zero-based
  };

  // Calculate the years of exp
  let diff = now.year % year;

  // If the current month is less than the given month OR
  // the current month is the same as the given month AND
  // the current dat is less than the given day,
  // the year exp is one year too many, so we need to correct it
  if (now.month < month || (now.month === month && now.day < day)) {
    diff -= 1
  }
  return diff.toString();
}
