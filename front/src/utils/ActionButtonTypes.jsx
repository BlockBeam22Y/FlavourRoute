import { AiFillPlusCircle } from "react-icons/ai";
import { TbCalendarCancel } from "react-icons/tb";
import { IoIosExit } from "react-icons/io";

const ActionButtonTypes = {
  register: (
    <>
      <span>Register</span>
    </>
  ),
  login: (
    <>
      <span>Sign in</span>
    </>
  ),
  new: (
    <>
      <AiFillPlusCircle className='mr-2 w-6 h-6' />
      <span>New Reservation</span>
    </>
  ),
  cancel: (
    <>
      <TbCalendarCancel className='mr-2 w-6 h-6' />
      <span>Cancel Reservation</span>
    </>
  ),
  exit: (
    <>
      <IoIosExit className='mr-2 w-6 h-6' />
      <span>Exit Cancel Mode</span>
    </>
  ),
};

export default ActionButtonTypes;