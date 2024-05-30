const validateUserData = (formData) => {
  const {
    name,
    username, 
    email, 
    birthdate: {
      day,
      month,
      year
    }, 
    nDni, 
    password, 
    passwordConfirm, 
    notificationsEnabled
  } = formData;

  const birthdate = `${year}-${month}-${day}`;

  const validationData = {
    username:
      typeof username === 'string' &&
      username !== '' &&
      /^\w+$/.test(username),
    password:
      typeof password === 'string' &&
      password.length >= 8 &&
      password.length <= 16,
    passwordConfirm:
      passwordConfirm !== '' &&
      passwordConfirm === password,
    name:
      typeof name === 'string' &&
      name !== '',
    email:
      typeof email === 'string' &&
      email !== '' &&
      /^([a-z0-9][-_.]?)*[a-z0-9]@([a-z][-.]?)*[a-z]\.[a-z]{2,4}$/.test(email),
    birthdate:
      typeof birthdate === 'string' &&
      birthdate !== '' &&
      !isNaN(new Date(birthdate).valueOf()),
    nDni:
      typeof nDni === 'string' &&
      /^(\d){6,9}$/.test(nDni),
    notificationsEnabled:
      typeof notificationsEnabled === 'boolean'
  };

  return validationData;
};

export default validateUserData;