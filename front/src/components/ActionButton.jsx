import ActionButtonTypes from '../utils/ActionButtonTypes';

const ActionButton = ({ type, handleOnClick }) => {
  return (
    <button 
      onClick={handleOnClick}
      className='flex items-center bg-red-600 text-white hover:bg-red-700 hover:text-gray-300 px-3 py-2 rounded-full'
    >
      {
        ActionButtonTypes[type]
      }
    </button>
  );
}

export default ActionButton;