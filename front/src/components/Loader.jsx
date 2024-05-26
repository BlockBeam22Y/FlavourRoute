const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center p-2 border-4 border-t-0'>
        <div className='w-5 h-5 animate-spin rounded-full border-2 border-t-yellow-500 mr-2'></div>
        <span>Loading...</span>
    </div>
  );
}

export default Loader;