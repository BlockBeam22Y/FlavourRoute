import { useState, useEffect } from 'react';
import ReservationList from '../components/ReservationList';
import Loader from '../components/Loader';
import ActionButton from '../components/ActionButton'
import axios from 'axios';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isCancelMode, setIsCancelMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/appointments')
      .then(res => setReservations(res.data))
      .catch(err => {
        if (err.response.status === 404) {
          setReservations([ null ]);
        } else {
          console.error(err);
        }
      });
  }, []);

  const handleNewButton = () => {
    
  };

  const handleCancelButton = () => {
    setIsCancelMode(true);
  };

  const handleExitButton = () => {
    setIsCancelMode(false);
  };

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
              reservations.length ? (
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
              <ActionButton type='exit' handleOnClick={handleExitButton} />
            ) : (
              <>
                <ActionButton type='new' handleOnClick={handleNewButton}/>
                <ActionButton type='cancel' handleOnClick={handleCancelButton} />
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default MyReservations;