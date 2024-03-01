import Hero from "../components/Hero";
import Categories from "../components/Categories"
import ProductCard from "../components/ProductCard";
import {lappy} from "../assets/images";

const Home = () => {
  const addToCartHandler = ()=>{};
  return (
    <>
          <main className='relative'>
            <section className=''>
              <Hero />
            </section>
            <section>
              <Categories />
            </section>
            <section
              id='products'
              className='px-[2rem] py-12 bg-tertiary max-sm:mt-12 '
            >
              <div className='flex text-white flex-col justify-stretch gap-5'>
                <h2 className=' font-bold text-4xl font-outfit '>
                  Our <span className=' text-primary'>Popular</span> Products
                </h2>
              </div>
              <ProductCard productId="asddsd" photo={lappy} name="Laptop" price={3000} stock={10} handler={addToCartHandler}  />
              {/* <div className='mt-16 mx-auto px-10 py-8 grid place-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap:2'>
                { products &&
                  products.map((product) => (
                    <PopularProductCard key={product._id} product={product} />
                  ))}
              </div> */}
            </section>
          </main>
    </>
  );
};

export default Home;