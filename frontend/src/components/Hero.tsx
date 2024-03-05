import { NavLink} from "react-router-dom";
import { hero } from "../assets/images";
import "./index.scss";
const Hero = () => {
  return (
    <>
    <section className=" background">
    <div className='w-full  flex flex-row pt-20 bg-[rgba(0,0,0,0.01)] backdrop-blur-[30px] max-lg:flex-col-reverse max-xl:px-12 justify-center items-center min-h-screen gap-24 max-sm:gap-12  max-xl:pt-40'>
          {/* left part */}
          <div className="relative xl:w-2/6 xl:mt-24 rounded-[30%] max-lg:rounded-3xl w-full max-xl:padding-x bg-secondary ">
           <div className=" text-white flex flex-col justify-center items-start pt-10 pl-16 max-sm:pl-4">
           <p className=' text-[13px] max-sm:text-[11px] font-lato font-[500]  mr-40 '>YOUR</p>
            <h1 className=' font-rouge text-6xl max-sm:text-3xl mb-3 max-sm:mb-1 font-bold'>
              <span className=' xl:whitespace-nowrap relative z-10 pl-10 max-sm:pl-1 '>
                Gateway to
              </span>
              <br />
              <span className='text-coral-red font-rouge inline-block pl-4 max-sm:pl-1 mt-4 max-sm:mt-0'>
                Gaming Paradise
              </span>
            </h1>
           <p className=' text-[13px] max-sm:text-[11px] pl-72 max-sm:pl-2 font-lato font-[500]'> STARTS HERE</p>
            <p className=' font-nunito text-[12px] max-sm:text-[10px] leading-[1.2rem] pr-6 mt-4 max-sm:mt-1 mb-6 '>
              Unleashing boundless gaming thrills through a curated collection
              of titles, gear, and accessories, delivering excitement straight
              to your doorstep.
            </p>
            <NavLink to="#products" className="btn py-1 px-16 ml-16 max-sm:ml-0 mb-8" >Shop Now</NavLink>
           </div>
          </div>
          {/* right part */}
          <div>
            <img src={hero} className="xl:h-[500px]" alt="pic" />
          </div>
      </div>
    </section>
      
    </>
  );
};

export default Hero;
