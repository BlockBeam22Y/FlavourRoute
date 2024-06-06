import { useEffect, useState } from 'react';
import axios from 'axios';


const DishCard = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('https://foodish-api.com/api/')
      .then(res => setImage(res.data.image))
      .catch(err => console.error(err));
  }, []);

  return image && <img 
    src={image} 
    alt='dish' 
    className='h-48 shadow cursor-pointer transition ease duration-500 hover:scale-110 hover:shadow-lg' 
  />;
}

export default DishCard;