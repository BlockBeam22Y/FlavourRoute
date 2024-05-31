import ActionButtonTypes from '../utils/ActionButtonTypes';

const ActionButton = ({ type, handleOnClick, disabled }) => {
  return (
    <button 
      onClick={handleOnClick}
      disabled={disabled}
      className={`flex items-center bg-red-600 ${disabled ? 'opacity-75' : 'hover:bg-red-700 hover:text-gray-300'} text-white px-3 py-2 rounded-full`}
    >
      {
        ActionButtonTypes[type]
      }
    </button>
  );
}

export default ActionButton;