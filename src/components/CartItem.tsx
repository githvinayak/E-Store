import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

type CartPropType = {
  cartItem: any;
};

const CartItem = ({ cartItem }: CartPropType) => {
    const totalPrice = cartItem.price * cartItem.quantity;
    const {photo,productId,name, price, quantity} = cartItem;
  return (
    <>
      <div className='flex text-white py-[1.7rem] justify-between'>
        <div className="flex gap-3">
          <img className="flex-[1] rounded-lg object-cover aspect-square h-[100px] w-[100px]" src={photo} alt="" />
          <div className="flex flex-[1] flex-col justify-between">
            <div className="flex flex-col">
                <Link to={`/products/${productId}`} className="font-bold">{name}</Link>
                <span>Laptop</span>
            </div>
            <button className="flex justify-center items-center px-3 py-1 bg-secondary rounded-lg"> <MdDelete/> Remove</button>
          </div>
        </div>
        <div className='flex space-x-24'>
          <div className=' flex h-[2rem] gap-3 text-[18px] font-bold'>
            <button className="bg-secondary rounded-l-md px-3"> &minus;</button>
           <p>{quantity}</p>
            <button className="bg-secondary rounded-r-md px-3">+</button>
          </div>
          <span className=' text-[18px] font-bold'>{price}</span>
          <span className=' text-[18px] font-bold'>{totalPrice}</span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
