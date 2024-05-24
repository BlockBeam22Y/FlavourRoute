import Navbar from './components/Navbar';
import Home from './views/Home';
import MyReservations from './views/MyReservations';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col items-center gap-4 text-gray-800 p-4'>
        {/* <Home /> */}
        <MyReservations />
      </main>
    </>
  )
}

export default App
