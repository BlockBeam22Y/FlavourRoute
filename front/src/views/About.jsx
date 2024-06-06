import expressLogo from '../assets/icons/express-logo.svg';
import nodejsLogo from '../assets/icons/nodejs-logo.svg';
import postgresqlLogo from '../assets/icons/postgresql-logo.svg';
import reactLogo from '../assets/icons/react-logo.svg';
import reduxLogo from '../assets/icons/redux-logo.svg';
import tailwindcssLogo from '../assets/icons/tailwindcss-logo.svg';
import typescriptLogo from '../assets/icons/typescript-logo.svg';
import vitejsLogo from '../assets/icons/vitejs-logo.svg';

const About = () => {
  return (
    <>
      <div className='bg-white p-4 flex flex-col gap-4'>
        <section className='flex flex-col items-center'>
          <h2 className='text-3xl font-bold mb-2'>About us</h2>

          <p>
            <span className='font-bold'>Flavour Route</span> is a restaurant made for every occasion.
            Anniversary dinner, business lunch, birthday party.
          </p>

          <p>
            Anything you like, we have you covered.
            Just make a reservation with us and we will take care of the rest.
          </p>

          <p>
            Our <span className='font-bold'>opening hours</span> are from <pre className='inline'>09:00</pre> to <pre className='inline'>22:00</pre>.
            Cancellations are allowed <span className='font-bold'>up to one day in advance.</span>
          </p>
        </section>

        <section className='flex flex-col items-center'>
          <h2 className='text-3xl font-bold mb-4'>Technologies</h2>

          <div className='flex justify-center gap-32 flex-wrap'>
            <div className='flex flex-col items-center gap-4'>
              <h3 className='text-2xl font-bold'>Frontend</h3>

              <div className='flex gap-4'>
                <img src={reactLogo} alt='react' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
                <img src={vitejsLogo} alt='vitejs' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
              </div>

              <div className='flex gap-4'>
                <img src={tailwindcssLogo} alt='tailwindcss' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
                <img src={reduxLogo} alt='redux' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
              </div>
            </div>

            <div className='flex flex-col items-center gap-4'>
              <h3 className='text-2xl font-bold'>Backend</h3>

              <div className='flex gap-4'>
                <img src={nodejsLogo} alt='nodejs' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
                <img src={expressLogo} alt='express' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
              </div>

              <div className='flex gap-4'>
                <img src={typescriptLogo} alt='typescript' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
                <img src={postgresqlLogo} alt='postgresql' className='w-24 h-24 p-2 cursor-pointer border transition ease duration-500 hover:bg-gray-200' />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;