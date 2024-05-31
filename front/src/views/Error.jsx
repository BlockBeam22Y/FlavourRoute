import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';

const Error = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <>
      <h2 className='text-3xl font-bold'>404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist</p>
      <ActionButton type='redirect' handleOnClick={handleOnClick} />
    </>
  );
}

export default Error;