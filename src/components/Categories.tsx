import * as FaIcons from "react-icons/fa6";
import { Link } from "react-router-dom";
import {headphone,laptop,console,monitor,gamingchair} from "../assets/images"
const Categories = () => {
    const product = { cat:"laptop"}
  return (
    <>
    <section className='flex px-20 py-14 overflow-x-auto scrollbar-hide bg-tertiary gap-20'>
    <Link  to={`/product/?${product.cat}`} className=' categories flex space-x-4 justify-center items-center px-10 py-7  bg-secondary rounded-3xl'>
    <FaIcons.FaBorderAll className=' text-primary w-10 h-10'/>
    <h1 className='font-outfit text-white font-bold text-4xl'>All</h1>
    </Link>
    <Link  to={`/product/?${product.cat}`}  className=' categories flex space-x-4 justify-center items-center px-10 py-7  bg-secondary rounded-3xl'>
    <img className='aspect-square w-10 h-10 ' src={laptop} alt="pic"/>
    <h1 className='font-outfit text-white font-bold text-xl'>Laptop</h1>
    </Link>
    <Link to={`/product/?${product.cat}`}  className=' categories flex space-x-4 justify-center items-center px-10 py-7  bg-secondary rounded-3xl'>
    <img className='aspect-square w-10 h-10' src={headphone} alt="pic"/>
    <h1 className='font-outfit text-white font-bold text-xl'>Headphone</h1>
    </Link>
    <Link  to={`/product/?${product.cat}`}  className=' categories flex space-x-4 justify-center items-center px-10 py-7  bg-secondary rounded-3xl'>
    <img className='aspect-square w-10 h-10' src={console} alt="pic"/>
    <h1 className='font-outfit text-white font-bold text-xl'>Console</h1>
    </Link>
    <Link  to={`/product/?${product.cat}`}  className=' categories flex space-x-4 justify-center items-center px-10 py-7  bg-secondary rounded-3xl'>
    <img className='aspect-square w-10 h-10' src={gamingchair} alt="pic"/>
    <h1 className='font-outfit text-white font-bold text-xl'>Gaming Chair</h1>
    </Link>
    <Link  to={`/product/?${product.cat}`} className=' categories flex space-x-4 justify-center items-center px-10 py-7 bg-secondary rounded-3xl'>
    <img className='aspect-square w-10 h-10' src={monitor} alt="pic"/>
    <h1 className='font-outfit text-white font-bold text-xl'>Monitor</h1>
    </Link>
    </section>
    </>
  )
}

export default Categories