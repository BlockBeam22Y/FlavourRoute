import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io'
import { CiLogout } from 'react-icons/ci';
import defaultAvatar from '../assets/user.png';
import { logout } from '../redux/userReducer';

const UserOptions = ({ user }) => {
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    user ? (
      <div className='absolute top-0 right-0 flex flex-col bg-red-500 rounded-md shadow-md'>
        <div onClick={() => setToggle(!toggle)} className={`flex items-center h-12 px-1 cursor-pointer hover:bg-red-700 hover:text-gray-300 ${toggle ? 'border-gray-300 border-b rounded-t-md' : 'rounded-md'}`}>  
          <img
            src={user.avatar ? `http://localhost:3000/avatars/${user.avatar}.webp` : defaultAvatar}
            alt='avatar'
            className='w-12 h-12 p-1 rounded-full'
          />

          {toggle && <h3 className='mx-1 text-nowrap font-semibold'>{user.name}</h3>}

          <IoMdArrowDropdown className={`w-6 h-6 ${toggle && '-scale-y-100'}`} />
        </div>

        {
          toggle && (
            <div className='flex flex-col align-start'>
              <button
                onClick={() => {
                  navigate('/reservations');
                  setToggle(false);
                }}
                className='py-1 hover:bg-red-700 hover:text-gray-300'
              >
                My Reservations
              </button>

              <button
                onClick={() => {
                  navigate('/reservations/new');
                  setToggle(false);
                }}
                className='py-1 hover:bg-red-700 hover:text-gray-300'
              >
                New Reservation
              </button>

              <button 
                onClick={() => {
                  dispatch(logout());
                  navigate('/login');
                  setToggle(false);
                }}
                className='flex justify-center items-center gap-1 rounded-b-md border-t border-gray-300 py-1 hover:bg-red-700 hover:text-gray-300'
              >
                <CiLogout className='w-6 h-6' />
                <span className='text-nowrap'>Log out</span>
              </button>
            </div>
          )
        }
      </div>
    ) : (
      <div className='flex items-center h-12 gap-2'>
        <Link to='/login' className='px-3 py-2 text-nowrap font-semibold text-red-600 bg-white hover:text-red-600 hover:bg-gray-100 border border-red-600 rounded-full'>Login</Link>
        <Link to='/register' className='px-3 py-2 text-nowrap font-semibold text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 border border-white rounded-full'>Sign up</Link>
      </div>
    )
  );
};

export default UserOptions;