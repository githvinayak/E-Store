import { Link } from "react-router-dom";
import { shipping } from "../../assets/images";
import "./login.css"
const Login = () => {

  return (
    <>
      <div className='py-10 h-screen containerr'>
        <div className='left'>
          <img src={shipping} alt='Profile Picture' className='banner' />
        </div>
        <div className='right'>
          <div className='wrapper'>
            <h2 className='title'>
              SIGN <span className='blueText'>IN</span>
            </h2>
            <form className='form'>
              <div className='inputContainerr'>
                <input
                  className='inputField'
                  type='text'
                  id='website-input'
                  placeholder='Enter your username'
                />
                <label className='label'>Username</label>
              </div>
              <div className='inputContainerr'>
                <input
                  className='inputField'
                  type='text'
                  id='website-input'
                  placeholder='Enter your password'
                />
                <label className='label'>Password</label>
              </div>
              <div className='button'>
                <button type='submit'>SIGN IN</button>
              </div>
            </form>
            <div className='lower'>
              <h2 className='text'>OR Sign in with</h2>
              {/* <div className='socialIcons'>
                <div className='icons'>
                <img src={google} alt='google' />
                </div>
                <div className='icons'>
                  <img src={facebook} alt='fb' />
                </div>
                <div className='icons'>
                  <img src={github} alt='gh' />
                </div>
              </div> */}
              <p className='text2'>
                Don't have an account ?
                <Link to='/register' className='register'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
