const months: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days: string[] = [
  "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
  "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
  "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"
];

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(s => +s);
  
  return `${months[month - 1]} ${days[day - 1]}, ${year}`;
}

export default formatDate;