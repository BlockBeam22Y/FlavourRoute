import { useState } from 'react';
import { GoUpload } from 'react-icons/go'
import defaultAvatar from '../assets/user.png';
import Alert from '../components/Alert';
import { years, months, days } from '../utils/dateOptions';
import validateUserData from '../utils/validateUserData';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    birthdate: {
      year: '2024',
      month: '01',
      day: '01'
    },
    nDni: '',
    password: '',
    passwordConfirm: '',
    notificationsEnabled: false,
  });

  const [validationData, setValidationData] = useState({
    name: true,
    username: true,
    email: true,
    nDni: true,
    password: true,
    passwordConfirm: true
  });

  const [alertInfo, setAlertInfo] = useState(null);

  const handleOnChange = (event) => {
    setValidationData({
      ...validationData,
      [event.name]: true
    });

    const { name, type, value } = event.target;
    
    if (type === 'select-one') {
      formData.birthdate[name] = value;
    } else if (type === 'checkbox') {
      formData[name] = !formData[name];
    } else {
      formData[name] = value;
    }

    setFormData(formData);
  };
  
  const handleOnBlur = (event) => {
    const { name } = event.target;

    setValidationData({
      ...validationData,
      [name]: validateUserData(formData)[name]
    });
  };
  
  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (Object.values(validateUserData(formData)).every(value => value)) {
      setAlertInfo(null);

      axios.post('http://localhost:3000/users/register', {
        ...formData,
        nDni: +formData.nDni,
        birthdate: Object.values(formData.birthdate).join('-')
      })
        .then(() => {
          setAlertInfo({ OK: true });

          setFormData({
            name: '',
            username: '',
            email: '',
            birthdate: {
              day: '01',
              month: '01',
              year: '2024'
            },
            nDni: '',
            password: '',
            passwordConfirm: '',
            notificationsEnabled: false,
          });

          setValidationData({
            name: true,
            username: true,
            email: true,
            nDni: true,
            password: true,
            passwordConfirm: true
          });
        })
        .catch(err => setAlertInfo(err.response.data));
    } else {
      setAlertInfo({
        message: 'Invalid data',
        OK: false
      });

      setValidationData(validateUserData(formData));
    }
  }

  return (
    <>
      <h2 className='text-3xl font-bold'>Create Account</h2>
      
      <form onSubmit={handleOnSubmit} className='flex flex-col items-center'>
        <div className='w-full flex flex-col-reverse sm:flex-row items-center gap-2'>
          <div className='w-full sm:w-64 flex flex-col gap-2 mb-2 sm:m-0'>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              className={`w-full px-2 py-1 rounded-md border ${validationData.name || 'bg-red-50 border-red-600'}`} 
            />
            
            <input 
              type='text' 
              name='username' 
              placeholder='Username' 
              value={formData.username} 
              onChange={handleOnChange} 
              onBlur={handleOnBlur}
              className={`w-full px-2 py-1 rounded-md border ${validationData.username || 'bg-red-50 border-red-600'}`}
            />
            
            <input 
              type='email' 
              name='email' 
              placeholder='Email' 
              value={formData.email} 
              onChange={handleOnChange} 
              onBlur={handleOnBlur}
              className={`w-full px-2 py-1 rounded-md border ${validationData.email || 'bg-red-50 border-red-600'}`}
            />

            <input
              type='number' 
              name='nDni' 
              placeholder='Dni' 
              value={formData.nDni} 
              onChange={handleOnChange} 
              onBlur={handleOnBlur}
              className={`w-full px-2 py-1 rounded-md border ${validationData.nDni || 'bg-red-50 border-red-600'}`}
            />
          </div>

          <div className='p-2 relative'>
            <img src={defaultAvatar} alt='Profile picture' className='w-40 rounded-full border-2 border-gray-400' />
            <label className='w-40 h-40 flex justify-center items-center gap-1 rounded-full bg-black/20 absolute top-2 left-2 opacity-0 hover:opacity-100 cursor-pointer'>
              <GoUpload className='w-6 h-6'/>
              <span className='text-white'>Upload photo</span>
              <input type="file" accept='image/*' className='hidden' />
            </label>
          </div>
        </div>
        
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full flex justify-between items-center'>
            <label>Date of birth</label>

            <select name='day' onChange={handleOnChange} className='w-24 rounded border'>
              {
                days.map((day, i) => <option key={i} value={day.value}>{day.text}</option>)
              }
            </select>

            <select name='month' onChange={handleOnChange} className='w-24 rounded border'>
              {
                months.map((month, i) => <option key={i} value={month.value}>{month.text}</option>)
              }
            </select>

            <select name='year' onChange={handleOnChange} className='w-24 rounded border'>
              {
                years.map((year, i) => <option key={i} value={year.value}>{year.text}</option>)
              }
            </select>
          </div>
          
          <div className='w-full'>
            <input 
              type='password' 
              name='password' 
              placeholder='Password' 
              value={formData.password} 
              onChange={handleOnChange} 
              onBlur={handleOnBlur}
              className={`w-full px-2 py-1 rounded-md border ${validationData.password && validationData.passwordConfirm || 'bg-red-50 border-red-600'}`} 
            />
          </div>

          <div className='w-full'>
            <input 
              type='password' 
              name='passwordConfirm' 
              placeholder='Confirm password' 
              value={formData.passwordConfirm} 
              onChange={handleOnChange} 
              onBlur={handleOnBlur}
              className={`w-full px-2 py-1 rounded-md border ${validationData.passwordConfirm || 'bg-red-50 border-red-600'}`} 
            />
          </div>

          <div className='w-full'>
            <label>
              <input type='checkbox' name='notificationsEnabled' onChange={handleOnChange} className='mr-2' />
              <span className='text-wrap'>Send me notifications about my reservations</span>
            </label>
          </div>
        </div>

        <button className='flex items-center bg-red-600 text-white hover:bg-red-700 hover:text-gray-300 mt-2 px-3 py-2 rounded-full'>
          Register
        </button>
      </form>
      
      {alertInfo && <Alert info={alertInfo} />}
    </>
  );
}

export default Register;