export const daysDifference = (date1: string, date2: string) => {
  const arrivalDate = new Date(date1);
  const departureDate = new Date(date2);

  const differenceInTime = departureDate.getTime() - arrivalDate.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.ceil(differenceInDays);
};
