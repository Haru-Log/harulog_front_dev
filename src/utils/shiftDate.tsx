const shiftDate = (date: Date, numDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export default shiftDate;