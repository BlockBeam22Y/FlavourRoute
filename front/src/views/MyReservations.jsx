import { useState } from 'react';
import Reservation from '../components/Reservation';
import myReservations from '../utils/myReservations';

const MyReservations = () => {
  const [reservations, setReservations] = useState(myReservations);

  return (
    <>
      <h2 className='text-3xl font-bold'>My Reservations</h2>

      <div className='bg-white flex flex-col items-center w-fit'>
        <div className='bg-gray-200 flex p-2 border-4'>
          <div className='w-56 text-center font-bold'>Date</div>
          <div className='w-56 text-center font-bold'>Time</div>
          <div className='w-56 text-center font-bold'>Status</div>
        </div>
        <div>
          {
            reservations.map(reservation => <Reservation
              key={reservation.id}
              reservation={reservation}
            />)
          }
        </div>
      </div>
    </>
  );
}

export default MyReservations;