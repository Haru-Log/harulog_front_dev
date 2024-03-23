function convertDateFormat(dateString: string): string {
  let date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  const isoString = date.toISOString();
  return String(isoString);
}

export default convertDateFormat;
