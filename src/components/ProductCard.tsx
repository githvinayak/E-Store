import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaOpencart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import StarIcon from "@mui/icons-material/Star";
import { lappy, arrow } from "../assets/images";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

const server = "asddadsd";

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) => {
  // const options = {
  //   defaultValue: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  const product = { _id: 1 };
  return (
    <>
      <div className=' group relative w-[250px] flex flex-1 text-white flex-col max-sm:w-full '>
        <div className='bg-secondary w-[250px] rounded-[2rem] h-[250px] flex justify-center items-center'>
          <img
            src={photo}
            alt='product img'
            className='w-[245px] drop-shadow-2xl h-[245px]'
          />
        </div>
        <div className='flex mt-8 justify-start gap-2.5'>
          <Rating
            name='half-rating-read'
            defaultValue={3}
            precision={0.5}
            readOnly
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
          />
          <p className=' font-montserrat text-lg leading-normal text-slate-gray'>
            (4.5)
          </p>
        </div>
        <h3 className=' font-palanquin leading-normal text-xl font-semibold mt-[0.3rem]'>
          {name}
        </h3>
        <span className=' text-coral-red font-semibold font-montserrat text-lg leading-normal mt-[0.3rem]'>
          {price}
        </span>
        <div className='flex w-[250px] justify-between items-center mt-[0.2rem]'>
          <p className='text-[14px]'>view details</p>
          <NavLink to={`/product/${product._id}`}>
            <img src={arrow} alt='arrow' className='w-12' />
          </NavLink>
        </div>
        <div className='absolute invisible group-hover:visible rounded-lg flex transition-all duration-800 px-1 py-3 justify-around items-center flex-col gap-4 backdrop-blur-sm bg-white/20 h-24 top-10 right-[1rem]'>
          <button onClick={() => handler()}>
            <FaOpencart className='w-10 text-white  h-7' />
          </button>
          <hr />
          <button onClick={() => handler()}>
            <FaRegHeart className='w-10 text-white  h-7' />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
