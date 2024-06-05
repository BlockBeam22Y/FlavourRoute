const validateUserData = (formData) => {
  const {
    name,
    username, 
    email, 
    nDni, 
    password, 
    passwordConfirm, 
  } = formData;

  const validationData = {};

  if (username === '') {
    validationData.username = 'Username is required';
  } else if (!/^\w+$/.test(username)) {
    validationData.username = 'Username is invalid';
  } else {
    validationData.username = '';
  }

  if (password === '') {
    validationData.password = 'Password is required';
  } else if (password.length < 8) {
    validationData.password = 'Password is too short';
  } else if (password.length > 16) {
    validationData.password = 'Password is too long';
  } else if (!/^[^\s]+$/.test(password)) {
    validationData.password = 'Password can\'t contain spaces';
  } else {
    validationData.password = '';
  }
  
  if (passwordConfirm !== password) {
    validationData.passwordConfirm = 'Passwords don\'t match';
  } else {
    validationData.passwordConfirm = '';
  }

  if (name === '') {
    validationData.name = 'Name is required';
  } else {
    validationData.name = '';
  }

  if (email === '') {
    validationData.email = 'Email is required';
  } else if (!/^([a-z0-9][-_.]?)*[a-z0-9]@([a-z][-.]?)*[a-z]\.[a-z]{2,4}$/.test(email)) {
    validationData.email = 'Email is invalid';
  } else {
    validationData.email = '';
  }

  if (!/^(\d){6,9}$/.test(nDni)) {
    validationData.nDni = 'Dni is invalid';
  } else {
    validationData.nDni = '';
  }

  return validationData;
};

export default validateUserData;