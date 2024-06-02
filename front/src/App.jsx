import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import MyReservations from './views/MyReservations';
import Register from './views/Register';
import Login from './views/Login';
import Error from './views/Error';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center gap-4 text-gray-800 p-4 flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reservations' element={<MyReservations isCancelMode={false} />} />
          <Route path='/reservations/cancel' element={<MyReservations isCancelMode={true} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
