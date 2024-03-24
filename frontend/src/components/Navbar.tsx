import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets/images";
import { navLinks } from "./constants";
import * as FaIcons from "react-icons/fa6";
import SearchComponent from "./SearchComponent";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const loginMenu = () => {
    setLogin(!isLogin);
  };
 const user = { _id:"hbadds",role:"user",name:"vinayak"}
  return (
    <>
      <header className='padding-x py-3 fixed top-0 right-0 left-0 text-white z-10 w-full'>
        <nav className='flex flex-col max-container mx-auto'>
          {/* top nav */}
          <div className='flex justify-between max-sm:px-6 items-center border-b'>
            {/* left part */}
            <div className='flex space-x-16 max-lg:space-x-0 items-center'>
              <Link to='/' className=' '>
                <img src={logo} alt='pic' className=' w-16 flex items-center' />
              </Link>
              <div className=" max-md:hidden">
              <SearchComponent />
              </div>
            </div>
            {/* right part */}
            <div className='flex items-center font-outfit justify-center ml-14 max-sm:space-x-6 space-x-10'>
              <Link to='/login'>
                <div
                  onClick={loginMenu}
                  className='flex justify-center items-center max-sm:hidden space-x-2'
                >
                  <FaIcons.FaRegUser className='w-10 h-7' />
                  <p className=' text-base max-md:hidden'>
                    Hello, { user?._id ? `${user.name}`: "sign in"}
                    <br />
                    <strong>My Account</strong>
                  </p>
                </div>
              </Link>
              {/* { isLogin && <LoginDropdown/>} */}
              <div className='flex justify-center items-center max-sm:hidden space-x-2'>
                <FaIcons.FaRegHeart className='w-10 h-7' />
                <p className=' text-base max-md:hidden'>
                  Favourite
                  <br />
                  <strong>Wishlist</strong>
                </p>
              </div>
              <div className='flex justify-center items-center space-x-2 max-sm:space-x-6'>
                <FaIcons.FaOpencart className='w-10 h-7 ' />
                <p className=' text-base max-md:hidden'>
                  0
                  <br />
                  <strong>$ 0.00</strong>
                </p>
              </div>
              <div className='  md:hidden rotate-180'>
                <button onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <FaIcons.FaXmark className='w-8 h-8 ' />
                  ) : (
                    <FaIcons.FaBarsStaggered className='w-6 h-6' />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* bottom nav */}
          <div className='flex justify-around items-center mt-3 font-outfit'>
            {/* left part */}
            {/* { isArrowUp && <Dropdown className="max-md:hidden"/>} */}
            <ul className=' flex-1 navlink text-base space-x-8  max-md:hidden'>
              {navLinks.map(({ label, href }) => (
                <Link key={href} to={href} className=''>
                  {label}
                </Link>
              ))}
            </ul>
            <div className="hidden max-md:flex">
            <SearchComponent/>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
