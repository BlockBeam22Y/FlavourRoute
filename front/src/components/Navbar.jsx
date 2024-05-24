import Navlink from './Navlink';
import logo from '/restaurant.png';
import navLinks from '../utils/navLinks';

const Navbar = () => {
  return (
    <nav className='bg-red-600 text-white flex items-center flex-wrap px-4'>
      <header>
        <a href='/' className='flex items-center gap-2 h-12 my-2 mr-4'>
          <img src={logo} alt='logo' className='h-full' />
          <h1 className='text-3xl text-nowrap font-bold'>Flavour Route</h1>
        </a>
      </header>

      <ul className='flex items-center h-12'>
        {
          navLinks.map((navLink, i) => <Navlink
            key={i}
            text={navLink.text}
            href={navLink.href}
          />)
        }
      </ul>
    </nav>
  );
}

export default Navbar;