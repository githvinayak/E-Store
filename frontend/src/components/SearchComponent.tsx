import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from "react-icons/fa6";
const SearchComponent = () => {
    const [keyword,setKeyword] = useState("");
    let navigate = useNavigate();
    // const searchSubmitHandler = (e)=>{
    //     e.preventDefault();
    //     keyword.trim() ? navigate(`/products/${keyword}`,{ replace: true }) : "Product not Found"
    // }
  return (
    <>
        <form 
        // onSubmit={searchSubmitHandler}
        >
        <div className='w-full max-w-md ml-6 mt-[-5px] bg-inherit '>
              <div className='relative searchbar overflow-hidden'>
                <div className='grid place-items-center h-full w-12 text-gray-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
               <input
                  className='h-full  bg-inherit w-full font-outfit outline-none text-sm text-gray-700 pr-2'
                  type='text'
                  id='search'
                  placeholder='Search something..'
                  onChange={(e)=>setKeyword(e.target.value)}
                />
                <button type="submit"><FaIcons.FaArrowRight /></button>
              </div>
            </div>
        </form>
    </>
  )
}

export default SearchComponent