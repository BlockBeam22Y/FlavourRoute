import { Link } from 'react-router-dom';

const Navlink = ({ text, href }) => {
  return (
    <Link to={href} className='hover:bg-red-700 hover:text-gray-300 text-nowrap rounded-md px-3 py-2'>
      {text}
    </Link>
  );
}

export default Navlink;