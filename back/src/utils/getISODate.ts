const getISODate = () => {
  const date = new Date();
  
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export default getISODate;