import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReservationList from '../components/ReservationList';
import Loader from '../components/Loader';
import ActionButton from '../components/ActionButton'
import axios from 'axios';
import { fetchReservations, clearReservations } from '../redux/reservationsReducer';

const MyReservations = ({ isCancelMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const reservations = useSelector(state => state.reservations.reservations);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/users/${user.id}`)
        .then(res => dispatch(fetchReservations(res.data.appointments)))
        .catch(err => console.error(err));
    } else {
      navigate('/login');
    }

    return () => dispatch(clearReservations());
  }, [user, navigate, dispatch]);

  return (
    <>
      <h2 className='text-3xl font-bold'>
        {isCancelMode ? 'Cancel Reservation' : 'My Reservations'}
      </h2>

      <div className='flex flex-col gap-4'>
        <div className='bg-white flex flex-col items-center w-fit'>
          <div className='bg-gray-200 flex p-2 border-4'>
            <div className='w-56 text-center font-bold'>Date</div>
            <div className='w-56 text-center font-bold'>Time</div>
            <div className='w-56 text-center font-bold'>Status</div>
          </div>

          <div className='w-full'>
            {
              reservations ? (
                <ReservationList reservations={reservations} isCancelMode={isCancelMode} />
              ) : (
                <Loader />
              )
            }
          </div>
        </div>

        <div className='w-full flex justify-evenly'>
          {
            isCancelMode ? (
              <ActionButton type='exit' handleOnClick={() => navigate('/reservations')} />
            ) : (
              <>
                <ActionButton type='new' handleOnClick={() => navigate('new')}/>
                <ActionButton type='cancel' handleOnClick={() => navigate('cancel')} />
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default MyReservations;