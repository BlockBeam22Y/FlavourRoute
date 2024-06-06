import { useContext } from 'react';
import { ModalContext } from '../App';
import { IoCloseCircleSharp  } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';

const AvatarModal = () => {
  const setModal = useContext(ModalContext);

  return (
    <div className='bg-white flex flex-col items-center gap-2 p-4 rounded-md relative'>
      <IoIosClose onClick={() => setModal(null)} className='absolute top-2 right-2 w-8 h-8 cursor-pointer hover:fill-gray-700' />

      <IoCloseCircleSharp className='w-20 h-20 fill-red-600' />

      <h3 className='font-bold text-2xl'>Error</h3>

      <h4>
        Photo must be greater than 300x300 pixels and less than 8MB
      </h4>
      
      <button onClick={() => setModal(null)} className='px-3 py-2 border rounded-md hover:bg-gray-100 hover:text-gray-700 font-semibold'>Okay</button>
    </div>
  )
}

export default AvatarModal;