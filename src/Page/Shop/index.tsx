import ProductCard from "../../Components/Product/ProductCard";
import BrandSpotlight from "../../Components/Shop/BrandSpotLight";
import { ShopHero } from "../../Components/Shop/ShopHero";
import { categories, earbuds } from "../../configs/constants";

export default function ShopPage() {
  return (
    <div className="w-full mx-auto flex flex-col">
      <ShopHero />

      <div className="w-full mx-auto py-32 bg-section px-6">
        
        {/* Category list */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="max-w-2xl flex flex-wrap justify-center gap-2 mx-auto">
            <button className="px-6 py-3 border border-primary-400 hover:bg-primary-400/80 rounded-full hover:cursor-pointer font-semibold hover:text-white transition-colors">
              All
            </button>
            {categories.map((category, index) => (
              <button 
                key={index} 
                className="px-6 py-3 border border-primary-400 hover:bg-primary-400/80 rounded-full hover:cursor-pointer hover:text-white font-semibold transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div>
            <div className="w-full my-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-18">
              {earbuds.map((product, index) => (
                <ProductCard 
                  key={index}
                  image={product.image}
                  name={product.name}
                  subtitle={product.subtitle}
                  price={product.price}
                  isNew={product.isNew}
                  bgColor="bg-section-alternative"
                />
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="w-full flex justify-center mx-auto">
              <button className="bg-primary-500 py-4 px-10 rounded-full hover:bg-primary-500/90 hover:cursor-pointer text-white font-semibold transition-colors">
                View More
              </button>
            </div>
          </div>
          
          {/* Brand Spotlight Divider Layer */}
          <div className="my-30">
            <BrandSpotlight />
          </div>
        </div>

      </div>
    </div>
  );
}