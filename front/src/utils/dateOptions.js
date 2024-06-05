const currentYear = new Date().getFullYear();

export const years = [...Array(100).keys()].map(i => {
  let year = currentYear - 1 - i;
  
  return {
    text: year,
    value: `${year}`
  };
});

export const months = [
  {
    text: 'jan',
    value: '01'
  },
  {
    text: 'feb',
    value: '02'
  },
  {
    text: 'mar',
    value: '03'
  },
  {
    text: 'apr',
    value: '04'
  },
  {
    text: 'may',
    value: '05'
  },
  {
    text: 'jun',
    value: '06'
  },
  {
    text: 'jul',
    value: '07'
  },
  {
    text: 'aug',
    value: '08'
  },
  {
    text: 'sep',
    value: '09'
  },
  {
    text: 'oct',
    value: '10'
  },
  {
    text: 'nov',
    value: '11'
  },
  {
    text: 'dec',
    value: '12'
  },
];

export const days = [...Array(31).keys()].map(i => {
  let day = i + 1;
  
  return {
    text: day,
    value: (day < 10 ? '0' : '') + day
  };
});