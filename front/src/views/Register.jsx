import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { GoUpload } from 'react-icons/go';
import { IoIosClose } from 'react-icons/io';
import defaultAvatar from '../assets/user.png';
import Alert from '../components/Alert';
import ActionButton from '../components/ActionButton';
import AvatarModal from '../components/AvatarModal';
import { Link, useNavigate } from 'react-router-dom';
import { years, months, days } from '../utils/dateOptions';
import validateUserData from '../utils/validateUserData';
import axios from 'axios';
import { ModalContext } from '../App';
import { login } from '../redux/userReducer';

const Register = () => {
  const setModal = useContext(ModalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    avatar: null
  });

  const [validationData, setValidationData] = useState({
    name: '',
    username: '',
    email: '',
    nDni: '',
    password: '',
    passwordConfirm: ''
  });

  const [alertInfo, setAlertInfo] = useState(null);
  const [isPending, setIsPending] = useState(false);
  
  const handleOnUpload = (event) => {
    const file = event.target.files[0];
    const avatarFormData = new FormData();
    avatarFormData.append('file', file);
    avatarFormData.append('currentAvatar', formData.avatar ?? '');

    setIsPending(true);

    axios.post('http://localhost:3000/avatars/upload', avatarFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setFormData({
          ...formData,
          avatar: res.data.avatar
        });

        setIsPending(false);
        event.target.value = '';
      })
      .catch(() => {
        setModal(<AvatarModal />);
        
        setIsPending(false);
        event.target.value = '';
      })
  };

  const handleOnDelete = () => {
    if (!formData.avatar) return;
    setIsPending(true);

    axios.delete(`http://localhost:3000/avatars/${formData.avatar}`)
      .then(() => {
        setIsPending(false);

        setFormData({
          ...formData,
          avatar: null
        });
      })
      .catch(err => {
        console.error(err);
        setIsPending(false);
      })
  }

  const handleOnChange = (event) => {
    const { name, type, value } = event.target;
    
    if (type === 'select-one') {
      formData.birthdate[name] = value;
    } else if (type === 'checkbox') {
      formData[name] = !formData[name];
    } else {
      formData[name] = value.trimStart();
    }

    setFormData(formData);

    setValidationData({
      ...validationData,
      password: name === 'passwordConfirm' ?
        validateUserData(formData).password :
        validationData.password,
      passwordConfirm: name === 'password' ?
        validateUserData(formData).passwordConfirm :
        validationData.passwordConfirm,
      [name]: validateUserData(formData)[name],
    });
  };
  
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setAlertInfo(null);

    for (const name in formData) {
      if (typeof formData[name] === 'string') {
        formData[name] = formData[name].trim();
        setFormData(formData);
      }
    }
    
    setValidationData(validateUserData(formData));

    if (Object.values(validationData).every(value => !value)) {
      setIsPending(true);

      axios.post('http://localhost:3000/users/register', {
        ...formData,
        nDni: +formData.nDni,
        birthdate: Object.values(formData.birthdate).join('-')
      })
        .then(res => {
          dispatch(login(res.data.user));

          setAlertInfo({
            message: 'You have successfully registered',
            OK: true 
          });

          setIsPending(false);

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
            name: '',
            username: '',
            email: '',
            nDni: '',
            password: '',
            passwordConfirm: ''
          });
          
          navigate('/reservations');
        })
        .catch(err => {
          setAlertInfo(err.response ? err.response.data : err);
          setIsPending(false);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className='bg-white border-2 p-3 flex flex-col items-center'>
        <h2 className='text-3xl font-bold mb-2'>Create Account</h2>

        <div className='w-full flex flex-col-reverse sm:flex-row items-center gap-2'>
          <div className='w-full sm:w-64 flex flex-col mb-2 sm:m-0 gap-1'>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleOnChange}
              className={`w-full px-2 py-1 border-b ${validationData.name && 'bg-red-50 border-red-600'}`} 
            />

            <p className='text-sm text-red-600 ml-2'>{validationData.name}</p>
            
            <input 
              type='text' 
              name='username' 
              placeholder='Username' 
              value={formData.username} 
              onChange={handleOnChange} 
              className={`w-full px-2 py-1 border-b ${validationData.username && 'bg-red-50 border-red-600'}`}
            />

            <p className='text-sm text-red-600 ml-2'>{validationData.username}</p>
            
            <input 
              type='text' 
              name='email' 
              placeholder='Email' 
              value={formData.email} 
              onChange={handleOnChange} 
              className={`w-full px-2 py-1 border-b ${validationData.email && 'bg-red-50 border-red-600'}`}
            />

            <p className='text-sm text-red-600 ml-2'>{validationData.email}</p>

            <input
              type='number' 
              name='nDni' 
              placeholder='Dni' 
              value={formData.nDni} 
              onChange={handleOnChange} 
              className={`w-full px-2 py-1 border-b ${validationData.nDni && 'bg-red-50 border-red-600'}`}
            />

            <p className='text-sm text-red-600 ml-2'>{validationData.nDni}</p>
          </div>

          <div className='p-2 relative'>
            <img
              src={formData.avatar ? `http://localhost:3000/avatars/${formData.avatar}.webp` : defaultAvatar}
              alt='Profile picture' 
              className='w-40 rounded-full border-2 border-gray-400' 
            />
            
            {
              formData.avatar && (
                <div
                  onClick={handleOnDelete}
                  className={`${isPending && 'invisible'} absolute top-3 right-3 cursor-pointer rounded-full bg-gray-200 hover:bg-red-600 hover:text-white`}
                >
                  <IoIosClose className='w-6 h-6' />
                </div>
              )
            }
            
            <label className='w-40 h-40 flex justify-center items-center gap-1 rounded-full bg-black/20 absolute top-2 left-2 opacity-0 hover:opacity-100 cursor-pointer'>
              <GoUpload className='w-6 h-6 fill-white'/>

              <span className='text-white'>Upload photo</span>

              <input 
                type='file' 
                accept='image/*' 
                disabled={isPending}
                onChange={handleOnUpload}
                className='hidden' 
              />
            </label>
          </div>
        </div>
        
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full flex justify-between items-center'>
            <label>Date of birth</label>

            <select name='day' value={formData.birthdate.day} onChange={handleOnChange} className='w-24 rounded border'>
              {
                days.map((day, i) => <option key={i} value={day.value}>{day.text}</option>)
              }
            </select>

            <select name='month' value={formData.birthdate.month} onChange={handleOnChange} className='w-24 rounded border'>
              {
                months.map((month, i) => <option key={i} value={month.value}>{month.text}</option>)
              }
            </select>

            <select name='year' value={formData.birthdate.year} onChange={handleOnChange} className='w-24 rounded border'>
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
              className={`w-full px-2 py-1 border-b ${(validationData.password || validationData.passwordConfirm) && 'bg-red-50 border-red-600'}`} 
            />
          </div>

          <p className='text-sm text-red-600 ml-2'>{validationData.password}</p>

          <div className='w-full'>
            <input 
              type='password' 
              name='passwordConfirm' 
              placeholder='Confirm password' 
              value={formData.passwordConfirm} 
              onChange={handleOnChange} 
              className={`w-full px-2 py-1 border-b ${(validationData.password || validationData.passwordConfirm) && 'bg-red-50 border-red-600'}`} 
            />
          </div>

          <p className='text-sm text-red-600 ml-2'>{validationData.passwordConfirm}</p>

          <div className='w-full'>
            <label>
              <input type='checkbox' name='notificationsEnabled' checked={formData.notificationsEnabled} onChange={handleOnChange} className='mr-2' />
              <span className='text-wrap'>Send me notifications about my reservations</span>
            </label>
          </div>
        </div>

        <div className='mt-2'>
          <ActionButton type='register' disabled={isPending || Object.values(validationData).some(value => value)} />
        </div>
      </form>

      <div>
        {'Already have an account? '}
        <Link to='/login' className='underline' >Sign in</Link>
      </div>
      
      {alertInfo && <Alert info={alertInfo} />}
    </>
  );
}

export default Register;