import { FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const Contact = () => {
  return (
    <>
      <section className='flex flex-col gap-2 p-4 mt-2 bg-white'>
        <h2 className='text-3xl font-bold text-center'>Our Location</h2>

        <p>
          Feel free to visit us if you need information. We are open all week from <span className='font-mono'>9:00am</span> to <span className='font-mono'>10:00pm</span>
        </p>

        <div className='py-2'>
          <p>
            <span className='font-bold'>Address:</span> 3396 Barfield Lane, Indianapolis, IN 46254
          </p>

          <iframe
            title='Our Location'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5052378853586!2d-86.24634428437784!3d39.890614279429274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b50e0d6e76917%3A0xf5b5d4f4d7a8ed78!2s39.890614%2C%20-86.244156!5e0!3m2!1sen!2sus!4v1620408479627!5m2!1sen!2sus'
            width='100%'
            height='400'
            allowFullScreen=''
            loading='lazy'
          ></iframe>
        </div>
      </section>

      <section className='w-3/4 flex justify-between flex-wrap gap-8 pb-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold'>Contact us</h2>
          
          <div className='flex items-center gap-2'>
            <FaPhoneAlt className='w-6 h-6' />

            <span>317-590-0995</span>
          </div>

          <div className='flex items-center gap-2'>
            <IoMdMail className='w-6 h-6' />

            <a
              href='mailto:reservations.flavourroute@gmail.com'
              className='underline'
            >
              reservations.flavourroute@gmail.com
            </a>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold'>Follow us</h2>
          
          <div className='flex items-center gap-2'>
            <FaFacebook className='w-6 h-6' />

            <a
              href='https://www.facebook.com/'
              className='underline hover:text-blue-600'
            >
              https://www.facebook.com/flavourroute
            </a>
          </div>

          <div className='flex items-center gap-2'>
            <FaInstagram className='w-6 h-6' />

            <a
              href='https://www.instagram.com/'
              className='underline hover:text-blue-600'
            >
              https://www.instagram.com/flavourroute
            </a>
          </div>

          <div className='flex items-center gap-2'>
            <FaTwitter className='w-6 h-6' />

            <a
              href='https://www.twitter.com/'
              className='underline hover:text-blue-600'
            >
              https://www.twitter.com/flavourroute
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;