import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import Alert from '../components/Alert';
import { MdInfo } from 'react-icons/md';
import validateReservationData from '../utils/validateReservationData';
import axios from 'axios';

const NewReservation = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const [formData, setFormData] = useState({
    purpose: '',
    date: '',
    time: ''
  });

  const [validationData, setValidationData] = useState({
    purpose: true,
    date: true,
    time: true
  });

  const [alertInfo, setAlertInfo] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setValidationData({
      ...validationData,
      [name]: true
    });

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOnBlur = (event) => {
    const { name } = event.target;

    setValidationData({
      ...validationData,
      [name]: validateReservationData(formData)[name]
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (Object.values(validateReservationData(formData)).every(value => value)) {
      setAlertInfo(null);
      setIsPending(true);

      axios.post('http://localhost:3000/appointments/schedule', {
        ...formData,
        userId: user.id
      })
        .then(() => {
          setAlertInfo({
            message: 'Reservation made succesfully',
            OK: true
          });

          setIsPending(false);

          setFormData({
            purpose: '',
            date: '',
            time: ''
          });
          
          setValidationData({
            purpose: true,
            date: true,
            time: true
          });
        })
        .catch(err => {
          setAlertInfo(err.response ? err.response.data : err);
          setIsPending(false);
        })
    } else {
      setValidationData(validateReservationData(formData));
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className='bg-white border-2 p-3 flex flex-col items-center gap-4'>
        <h2 className='text-3xl font-bold'>New Reservation</h2>

        <div className='px-4 py-3 rounded-md bg-blue-100 flex items-center gap-2'>
          <MdInfo className='w-5 h-5' />
          <span>Our opening hours are from 09:00 to 22:00</span>
        </div>

        <input
          type='text'
          name='purpose'
          placeholder='Purpose'
          value={formData.purpose}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          className={`w-full px-2 py-1 border-b ${validationData.purpose || 'bg-red-50 border-red-600'}`} 
        />

        <div className='flex gap-24'>
          <div className='flex items-center gap-2'>
            <label>Date</label>
            <input
              type='date'
              name='date'
              value={formData.date}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              className={`px-2 py-1 border ${validationData.date || 'bg-red-50 border-red-600'}`} 
            />
          </div>

          <div className='flex items-center gap-2'>
            <label>Time</label>
            <input
              type='time'
              name='time'
              value={formData.time}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              className={`px-2 py-1 border ${validationData.time || 'bg-red-50 border-red-600'}`} 
            />
          </div>
        </div>
        
        <ActionButton type='create' disabled={isPending || Object.values(validationData).some(value => !value)} />
      </form>
      
      {alertInfo && <Alert info={alertInfo} />}
    </>
  );
}

export default NewReservation;