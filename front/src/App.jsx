import { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import MyReservations from './views/MyReservations';
import Register from './views/Register';
import Login from './views/Login';
import NewReservation from './views/NewReservation';
import Error from './views/Error';
import Footer from './components/Footer';
import './App.css';

export const ModalContext = createContext(null);

function App() {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={setModal}>
      <Navbar />

      <main className='flex flex-col justify-center items-center gap-4 text-gray-800 p-4 flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/reservations' element={<MyReservations isCancelMode={false} />} />
          <Route path='/reservations/cancel' element={<MyReservations isCancelMode={true} />} />
          <Route path='/reservations/new' element={<NewReservation />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>

      <Footer />

      {
        modal && (
          <div className='w-screen h-screen group absolute bg-gray-200/50 flex justify-center items-center'>
            <div onClick={() => setModal(null)} className='w-full h-full absolute'></div>

            <div className='animate-slidedown'>
              {modal}
            </div>
          </div>
        )
      }
    </ModalContext.Provider>
  )
}

export default App
