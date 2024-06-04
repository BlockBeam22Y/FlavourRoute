import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';
import { ModalContext } from '../App';
import { CiWarning } from 'react-icons/ci';
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';
import { cancelReservation } from '../redux/reservationsReducer';

const CancelModal = ({ reservation }) => {
  const dispatch = useDispatch();
  const setModal = useContext(ModalContext);
  const [isPending, setIsPending] = useState(false);

  const handleOnCancel = () => {
    setIsPending(true);

    axios.put(`http://localhost:3000/appointments/cancel/${reservation.id}`)
      .then(res => {
        dispatch(cancelReservation(res.data.appointment));
        setModal(null);
      })
      .catch(err => {
        console.error(err);
        setIsPending(false);
      });
  };

  return (
    <div className='bg-white flex flex-col items-center gap-2 p-4 rounded-md relative'>
      <IoIosClose onClick={() => setModal(null)} className='absolute top-2 right-2 w-8 h-8 cursor-pointer hover:fill-gray-700' />
      
      <CiWarning className='w-20 h-20 fill-red-600' />

      <h3 className='font-bold text-2xl'>Are you sure?</h3>

      <h4>
        You will permanently cancel this reservation
      </h4>
      
      <div className='flex gap-2'>
        <button onClick={() => setModal(null)} className='px-3 py-2 border rounded-md hover:bg-gray-100 hover:text-gray-700 font-semibold'>Not now</button>
        <button
          onClick={handleOnCancel}
          disabled={isPending}
          className={`px-3 py-2 border rounded-md bg-red-600 text-white ${isPending ? 'opacity-75' : 'hover:bg-red-700 hover:text-gray-300'} font-semibold`}
        >
          Yes, cancel it
        </button>
      </div>
    </div>
  );
}

export default CancelModal;