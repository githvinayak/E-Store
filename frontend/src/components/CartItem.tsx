import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.scss"

type CartPropType = {
  cartItem: any;
};

const CartItem = ({ cartItem }: CartPropType) => {
  const totalPrice = cartItem.price * cartItem.quantity;
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <>
      <div className='flex max-xsmall:flex-col text-white py-[1.7rem]'>
        <div className='flex gap-3 w-full max-xsmall:gap-5'>
          <img
            className='flex-[1] rounded-lg object-cover aspect-square  max-sm:w-full h-[100px] w-[100px]'
            src={photo}
            alt=''
          />
          <div className='max-xsmall:flex-col w-full max-xsmall:flex-[1] flex justify-between'>
            <div className='flex flex-col max-xsmall:flex-row max-xsmall:gap-3 max-xsmall:items-start justify-between'>
              <div className='flex flex-col'>
                <Link
                  to={`/products/${productId}`}
                  className='font-bold max-lg:text-[14px] max-md:text-[12px]'
                >
                  {name}
                </Link>
                <span className='max-lg:text-[14px] max-md:text-[12px]'>
                  Laptop
                </span>
              </div>
              <button className='flex justify-center items-center px-3 max-lg:px-2 max-md:px-1 py-1 bg-secondary rounded-lg'>
                <MdDelete /> Remove
              </button>
            </div>
            <div className='flex space-x-24 max-lg:space-x-8 max-md:space-x-4'>
              <div className=' flex h-[2rem] gap-3 max-lg:gap-1 text-[18px] font-bold'>
                <button className='bg-secondary rounded-l-md px-3 max-lg:px-2 max-md:px-1 '>

                  &minus;
                </button>
                <p className=' text-[18px] max-lg:text-[14px] max-md:text-[12px]  font-bold'>
                  {quantity}
                </p>
                <button className='bg-secondary rounded-r-md px-3 max-lg:px-2 max-md:px-1'>
                  +
                </button>
              </div>
              <span className=' text-[18px] max-lg:text-[14px] max-md:text-[12px] font-bold'>
                {price}
              </span>
              <span className=' text-[18px] max-lg:text-[14px] max-md:text-[12px] font-bold'>
                {totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
