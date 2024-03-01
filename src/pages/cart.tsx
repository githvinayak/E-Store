import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
const cartItem = [
  {
    productId: "addd",
    photo: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",
    name: "Mackbook",
    price: 3000,
    quantity: 3,
    stock: 10,
    }, 
];
const numOfItems = cartItem.length;
const subtotal = 5000;
const discount = 30;
const tax = Math.round(subtotal * 0.18);
const shippingCahrges = 200;
const total = subtotal + tax + shippingCahrges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>();
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(true);
  return (
    <>
      <div className='flex bg-tertiary h-screen justify-center padding-x'>
        <main className='px-[6rem] flex flex-col justify-start  bg-tertiary flex-[5]'>
          <div className=" text-white border-b-2 py-6 flex justify-between">
          <h1 className='  text-[40px] font-bold'>Shopping Cart</h1>
          <h1 className='  text-[40px] font-bold'>{numOfItems} Items</h1>
          </div>
          <div>
          <div className="flex text-white py-[1.7rem] justify-between">
            <div>
              <span className=" text-[18px] font-bold">Product</span>
            </div>
            <div className="flex space-x-24">
              <span className=" text-[18px] font-bold">Qunatity</span>
              <span className=" text-[18px] font-bold">Price</span>
              <span className=" text-[18px] font-bold">Total</span>
            </div>
          </div>
          {cartItem.map((item, index) => (
            <CartItem cartItem={item} key={index} />
          ))}
          </div>
        </main>
        <aside className='flex-[2] px-8 text-white flex flex-col justify-center items-center bg-secondary'>
          <div className='flex flex-col justify-center  items-left'>
            <h1 className=' py-16 text-[40px] font-bold'>Order Summary</h1>
            <div className=' flex flex-col border-y-2 py-8 px-2 gap-4 max-w-[400px]'>
              <div className='flex justify-between'>
                <h3 className='font-[400]'>ITEMS:{numOfItems}</h3>
                <span>${subtotal}</span>
              </div>
              <div className='flex justify-between'>
                <h3 className=' font-semibold'>SHIPPING CHARGES:</h3>
                <span className=' font-semibold '>${shippingCahrges}</span>
              </div>
              <div className='flex justify-between'>
                <h3 className=' font-semibold '>TAX:</h3>
                <span className=' font-semibold '>${tax}</span>
              </div>
              <div className='flex gap-5 flex-col'>
                <h3 className=' font-semibold '>PROMO CODE:</h3>
                <div className='inputContainer'>
                  <input
                    className='input'
                    type='text'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder='Enter your code'
                  />
                  <label className='label'> code</label>
                </div>
                {couponCode &&
                  (isValidCoupon ? (
                    <span className='text-green-500'>
                      get {discount}% off using this code
                      <code>{couponCode}</code>
                    </span>
                  ) : (
                    <span className='text-red-500'>
                      Invalid coupon code <VscError />
                    </span>
                  ))}
                <button className='bg-primary rounded-md px-4 py-2 '>
                  APPLY
                </button>
              </div>
            </div>
            <div className='py-6 flex flex-col gap-10 max-w-[400px]'>
              <div className='flex  justify-between '>
                <h3 className=' font-semibold '>TOTAL COST</h3>
                <span className=' font-semibold '>${total}</span>
              </div>
              { cartItem.length > 0 && <Link to="/checkout" className='bg-primary text-center rounded-md px-4 py-2 max-w-[400px] '>
                CHECKOUT
              </Link>}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Cart;
