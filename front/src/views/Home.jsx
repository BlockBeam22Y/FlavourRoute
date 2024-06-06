import DishCard from '../components/DishCard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className='flex flex-col gap-2 items-center'>
        <h2 className='text-3xl font-bold'>Our Dishes</h2>

        <div className='mx-12 flex justify-center items-start flex-wrap gap-4'>
          {
            [...Array(12).keys()].map(i => <DishCard key={i} />)
          }
        </div>
      </section>
      
      <section className='flex flex-col gap-2 items-center'>
        <h3 className='font-bold text-2xl'>Make a reservation with us</h3>
        <Link to='/reservations/new' className='px-3 py-2 text-nowrap font-semibold text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 border border-white rounded-full'>
          New Reservation
        </Link>

        <h3 className='font-bold text-2xl'>...or visit us at</h3>
        <p className='font-mono'>3396 Barfield Lane, Indianapolis, IN 46254</p>
        <p>
          Click <Link to='/contact' className='underline hover:text-blue-600'>here</Link> for more information
        </p>
      </section>
    </>
  );
}

export default Home;