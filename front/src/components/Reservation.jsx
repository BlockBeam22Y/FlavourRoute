import formatDate from "../utils/formatDate";

const Reservation = ({ reservation: { date, time, status } }) => {
  return (
    <div className='hover:bg-gray-100 flex p-2 border-4 border-t-0'>
      <div className='w-56 text-center'>
        {formatDate(date)}
      </div>
      <div className='w-56 text-center'>
        {time.slice(0, 5)}
      </div>
      <div className='w-56 text-center'>
        {
          status === 'active'
            ? <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                {status}
              </span>
            : <span className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                {status}
              </span>
        }
      </div>
    </div>
  );
}

export default Reservation;