import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import Alert from '../components/Alert';
import axios from 'axios';
import { login } from '../redux/userReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [isChecked, setIsChecked] = useState(false);

  const [alertInfo, setAlertInfo] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setAlertInfo(null);
    setIsPending(true);

    axios.post('http://localhost:3000/users/login', formData)
      .then(res => {
        if (res.data.login) {
          setAlertInfo({
            message: 'Logged in successfully',
            OK: true
          });
          
          setIsPending(false);

          dispatch(login(res.data.user));

          setFormData({
            username: '',
            password: ''
          });

          setIsChecked(false);

          navigate('/reservations');
        }
      })
      .catch(err => {
        setAlertInfo(err.response ? err.response.data : err);
        setIsPending(false);
      });
  };
  
  return (
    <>
      <form onSubmit={handleOnSubmit} className='bg-white border-2 p-3 flex flex-col items-center gap-4'>
        <h2 className='text-3xl font-bold'>Login</h2>

        <input 
          type='text' 
          name='username' 
          placeholder='Username' 
          value={formData.username}
          onChange={handleOnChange}
          className='w-full px-2 py-1 border-b'
        />

        <input 
          type={isChecked ? 'text' : 'password'} 
          name='password' 
          placeholder='Password' 
          value={formData.password}
          onChange={handleOnChange}
          className='w-full px-2 py-1 border-b'
        />

        <label className='w-full'>
          <input
            type='checkbox'
            className='mr-2'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)} />
          <span>Show password</span>
        </label>

        <ActionButton type='login' disabled={isPending || !formData.username || !formData.password} />
      </form>

      <div>
        {'Don\'t have an account? '}
        <Link to='/register' className='underline' >Sign up</Link>
      </div>

      {alertInfo && <Alert info={alertInfo} />}
    </>
  );
}

export default Login;