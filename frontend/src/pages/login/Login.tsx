import { shipping } from "../../assets/images";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import { auth } from "../../firebase";
import { useLoginMutation } from "../../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api-types";
const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message); 
      }
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <>
      <div className='main'>
        <div className='leftDiv'>
          <img src={shipping} alt='Profile Picture' className='banner' />
        </div>
        <main className='rightDiv'>
          <h2 className='title'>
            SIGN <span className='blueText'>IN</span>
          </h2>
          <div className="gender">
            <label className="genlabel">Gender</label>
            <select value={gender} className='text-white font-lato outline-none border-[3px] border-primary bg-secondary rounded-lg py-3 flex gap-4  px-4' onChange={(e) => setGender(e.target.value)}>
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className='dob'>
            <input
              type='date'
              className='inputField'
              placeholder='Enter your DOB'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
            <label className='label'>Enter you DOB</label>
          </div>
          <p className="text">Already Signed In Once</p>
          <div className="loginBtn">
            <button onClick={loginHandler} className="flex gap-2 justify-center px-3 rounded-lg py-2 items-center bg-sky-500">
              <FcGoogle /> <span className="text-white ">Sign in with Google</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
};
export default Login;
