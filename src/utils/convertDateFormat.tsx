function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return String(isoString);
}

export default convertDateFormat
