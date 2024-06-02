import { useNavigate } from 'react-router-dom';
import Error404 from '../assets/404-error.png'
import ActionButton from '../components/ActionButton';

const Error = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <>
      <img src={Error404} alt='404' className='h-48' />
      <h2 className='text-3xl font-bold'>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist</p>
      <ActionButton type='redirect' handleOnClick={handleOnClick} />
    </>
  );
}

export default Error;