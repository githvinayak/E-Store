import { useState } from "react";
import { HiOutlineMinus } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { PiListBulletsFill } from "react-icons/pi";
import ProductCard from "../../components/ProductCard";
import { lappy } from "../../assets/images";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [categories, setCategories] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};

  const isNextPage = page < 6;
  const isPrevPage = page > 1;

  return (
    <>
      <div className='flex flex-col h-screen padding-x text-white '>
        <div className='flex flex-1 overflow-hidden'>
          <aside className='flex flex-col py-10 flex-[1.3] gap-6 bg-secondary px-4'>
            <h2 className=' text-3xl font-sans'>Filters</h2>
            <div className='bg-tertiary flex flex-col uppercase rounded-md text-lg gap-4 py-6 px-4'>
              <h3 className='font-outfit font-medium'>Sort</h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className='text-white font-lato outline-none bg-secondary rounded-lg py-3 flex gap-4  px-4'
              >
                <option className=' ' value=''>
                  None
                </option>
                <option value='asc'>Price (low to High)</option>
                <option value='dsc'>Price (High to low)</option>
              </select>
            </div>
            <div className='bg-tertiary flex flex-col uppercase rounded-md text-lg gap-4 py-6 px-4'>
              <h3 className='font-outfit font-medium'>
                Max Price : {maxPrice || ""}
              </h3>
              <input
                type='range'
                max={100000}
                min={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
            <div className='bg-tertiary flex flex-col uppercase rounded-md text-lg gap-4 py-6 px-4'>
              <h3 className='font-outfit font-medium'>Categories</h3>
              <select
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className='text-white font-lato outline-none bg-secondary rounded-lg py-3 flex gap-4  px-4'
              >
                <option value=''>All</option>
                <option value='asc'>Laptop</option>
                <option value='dsc'>Headphone</option>
                <option value='dsc'>Console</option>
                <option value='dsc'>Accesories</option>
              </select>
            </div>
          </aside>
          <main className='flex flex-col w-full h-screen py-8 relative flex-[5] overflow-hidden bg-tertiary px-3'>
            <h1 className='  text-[30px] font-outfit pl-7 pb-4 '>Products</h1>
            <div className='  sticky py-3 bg-secondary px-7 rounded-lg flex items-center justify-between top-0 left-0'>
              <input
                className='h-full  bg-inherit caret-slate-100 text-white w-full font-outfit outline-none text-sm pr-2'
                type='text'
                id='search'
                placeholder='Search something..'
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className='flex gap-3'>
                <button>
                  <IoGrid className='w-6 h-6' />
                </button>
                <button>
                  <PiListBulletsFill className='w-7 h-7' />
                </button>
              </div>
            </div>
            <div className=' grid gap-y-7 px-8 grid-cols-4 overflow-y-auto scrollbar-hide mt-10'>
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
              <ProductCard
                productId='asddsd'
                photo={lappy}
                name='Laptop'
                price={3000}
                stock={10}
                handler={addToCartHandler}
              />
            </div>
            <div className="flex justify-around">
              <button disabled={!isPrevPage} className="bg-primary px-6 py-2 disabled:cursor-not-allowed disabled:opacity-[0.5] rounded-lg" onClick={()=>setPage((prev)=> prev - 1)}>Prev</button>
              <span>{page} of {6}</span>
              <button disabled={!isNextPage} className="bg-primary px-6 py-2 disabled:cursor-not-allowed disabled:opacity-[0.5] rounded-lg" onClick={()=>setPage((prev)=> prev + 1)}>Next</button>
            </div>
          </main>
        </div>
      </div>
    </>
    // className='flex-[1] bg-secondary h-screen px-8'
  );
};

export default Search;
