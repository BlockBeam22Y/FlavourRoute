import Reservation from '../components/Reservation';

const ReservationList = ({ reservations, isCancelMode }) => {
  const filteredReservations = reservations.filter(reservation => !isCancelMode || reservation.status === 'active');
  
  return (
    filteredReservations.length ? (
      filteredReservations
        .map(reservation => <Reservation
          key={reservation.id}
          reservation={reservation}
          isCancelMode={isCancelMode}
        />)
    ) : (
      <div className='w-full text-center p-2 border-4 border-t-0'>
        {
          isCancelMode ? 'No reservations to cancel' : 'No reservations found'
        }
      </div>
    )
  );
}

export default ReservationList;