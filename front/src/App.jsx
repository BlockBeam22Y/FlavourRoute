import Navbar from './components/Navbar';
import Home from './views/Home';
import MyReservations from './views/MyReservations';
import Register from './views/Register';
import Login from './views/Login';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center gap-4 text-gray-800 p-4 flex-1'>
        {/* <Home /> */}
        {/* <MyReservations /> */}
        <Register />
        {/* <Login /> */}
      </main>
      <Footer />
    </>
  )
}

export default App
