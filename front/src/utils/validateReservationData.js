import getISODate from './getISODate';

const validateReservationData = (formData) => {
  const {
    purpose,
    date,
    time
  } = formData;
  
  const validationData = {
    purpose:
      typeof purpose === 'string' &&
      purpose.length >= 6 &&
      purpose.length <= 32,
    date:
      typeof date === 'string' &&
      date !== '' &&
      !isNaN(new Date(date).valueOf()) &&
      date > getISODate(),
    time:
      typeof time === 'string' &&
      time !== '' &&
      !isNaN(new Date(`2024-01-01 ${time}`).valueOf()) &&
      time >= '09:00' &&
      time < '22:00'
  };
  
  return validationData;
};

export default validateReservationData;