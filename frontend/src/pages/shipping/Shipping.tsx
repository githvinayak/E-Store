import "./shipping.scss"
import {shipping} from "../../assets/images";
import { ChangeEvent, useState } from "react";
const Shipping = () => {
  const [shippingInfo,setshippingInfo] = useState({
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:""
  })
  const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setshippingInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  return (
    <>
      <div className= "py-10 containerr">
        <div className="left">
          <img src={shipping} alt='Profile Picture' className="banner" />
        </div>
        <div className="right">
          <div className="wrapper">
            <h2 className="title">
              SHIPPING <span className="blueText">ADDRESS</span>
            </h2>
              <form className="form">
              <div className="inputContainer">
                <input
                  className="input"
                  name="address"
                  type='text'
                  value={shippingInfo.address}
                  onChange={changeHandler}
                  placeholder='Enter your Address'
                />
                <label className="label" >
                Address
                </label>
              </div>
              <div className="inputContainer">
                <input
                 className="input"
                  type='text'
                  name="city"
                 value={shippingInfo.city}
                 onChange={changeHandler}
                  placeholder='Enter your City'
                />
                <label className="label" >
                  City
                </label>
              </div>
              <div className="inputContainer">
                <input
                 className="input"
                  type='text'
                  name="state"
                  value={shippingInfo.state}
                  onChange={changeHandler}
                  placeholder='Enter your State'
                />
                <label className="label" >
                  State
                </label>
              </div>
              <div className="inputContainer">
                <input
                 className="input"
                  type='number'
                  name="pincode"
                  value={shippingInfo.pincode}
                  onChange={changeHandler}
                  placeholder='Enter your Pincode'
                />
                <label className="label" >  
                  Pincode
                </label>
              </div>
              <div className="button">
                <button type='submit'>PAY NOW</button>
              </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default Shipping;