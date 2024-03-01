import "./shipping.scss"
const Shipping = () => {
  
  return (
    <>
      <div className= "py-10 container">
        <div className="left">
          <img src={pic} alt='Profile Picture' className="banner" />
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
                  type='text'
                  id='website-input'
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
                  id='website-input'
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
                  id='website-input'
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
                  id='website-input'
                  placeholder='Enter your Pincode'
                />
                <label className="label" >  
                  Pincode
                </label>
              </div>
              <div className="btn">
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