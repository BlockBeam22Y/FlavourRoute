import formatDate from '../utils/formatDate';

const Reservation = ({ reservation, isCancelMode, handleSelect, isSelected }) => {
  return (
    <div
      onMouseEnter={() => handleSelect(reservation.id)}
      onMouseLeave={() => handleSelect(0)}
      className={`flex p-2 border-4 border-t-0 ${isCancelMode ? 'hover:bg-red-600 hover:text-white cursor-pointer' : 'hover:bg-gray-100'}`}
    >
      <div className='w-56 text-center'>
        {formatDate(reservation.date)}
      </div>
      <div className='w-56 text-center'>
        {reservation.time.slice(0, 5)}
      </div>
      <div className='w-56 text-center'>
        {
          isCancelMode && isSelected ? (
            <button className='inline-flex items-center rounded-full bg-white hover:bg-gray-100 px-2 py-1 text-xs font-bold text-red-600 ring-1 ring-inset ring-red-600/10'>
              Cancel
            </button>
          ) : reservation.status === 'cancelled' ? (
            <span className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
            {reservation.status}
          </span>
          ) : (
            <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
              {reservation.status}
            </span>
          )
        }
      </div>
    </div>
  );
}

export default Reservation;