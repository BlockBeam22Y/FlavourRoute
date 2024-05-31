const Alert = ({ info: { message, OK } }) => {
  return (
    <div className={`px-4 py-3 rounded-md ${OK ? 'bg-green-100' : 'bg-red-100'}`}>
      {message}
    </div>
  );
}

export default Alert;