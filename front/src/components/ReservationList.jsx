import { useState } from 'react';
import Reservation from '../components/Reservation';

const ReservationList = ({ reservations, isCancelMode }) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleSelect = (id) => {
    setSelectedId(id);
  };
  
  return (
    reservations.length ? (
      reservations.filter(reservation => !isCancelMode || reservation.status === 'active')
        .map(reservation => <Reservation
          key={reservation.id}
          reservation={reservation}
          isCancelMode={isCancelMode}
          handleSelect={handleSelect}
          isSelected={selectedId === reservation.id}
        />)
    ) : (
      <div className='w-full text-center p-2 border-4 border-t-0'>
        No reservations found
      </div>
    )
  );
}

export default ReservationList;