import { useSelector } from 'react-redux';
import Navlink from './Navlink';
import UserOptions from './UserOptions';
import logo from '../assets/restaurant.png';
import navLinks from '../utils/navLinks';

const Navbar = () => {
  const user = useSelector(state => state.user.user);

  return (
    <nav className='bg-red-600 text-white flex items-center flex-wrap px-4'>
      <header>
        <a href='/' className='flex items-center gap-2 h-12 my-2 mr-4'>
          <img src={logo} alt='logo' className='h-full' />
          <h1 className='text-3xl text-nowrap font-bold'>Flavour Route</h1>
        </a>
      </header>

      <div className='relative flex-1 flex justify-between items-center flex-wrap sm:flex-nowrap'>
        <ul className='flex items-center h-12'>
          {
            navLinks.map((navLink, i) => (
              (user || navLink.href !== '/reservations') && <ul key={i}>
                <Navlink
                  text={navLink.text}
                  href={navLink.href}
                />
              </ul>
            ))
          }
        </ul>
        
        <UserOptions user={user} />
      </div>
    </nav>
  );
}

export default Navbar;