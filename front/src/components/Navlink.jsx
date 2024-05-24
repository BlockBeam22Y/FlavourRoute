const Navlink = ({ text, href }) => {
  return (
    <li>
      <a href={href} className='hover:bg-red-700 hover:text-gray-300 text-nowrap rounded-md px-3 py-2'>
        {text}
      </a>
    </li>
  );
}

export default Navlink;