import ProductCard from "../../Components/Product/ProductCard";
import BrandSpotlight from "../../Components/Shop/BrandSpotLight";
import { ShopHero } from "../../Components/Shop/ShopHero";
import { categories, earbuds } from "../../configs/constants";

export default function ShopPage(){
    return(
        <div className="w-full mx-auto flex flex-col">
            <ShopHero/>

            <div className="w-full mx-auto py-28 bg-section">
                {/* Category list */}
                <div className="w-full max-w-6xl mx-auto ">
                    <div className="max-w-2xl flex gap-2 mx-auto ">
                        <button className="w-full p-3 border border-secondary-400 hover:bg-secondary-200/30 rounded-full hover:cursor-pointer hover:bg-primary-500 font-semibold hover:text-white">
                            All
                        </button>
                        {categories.map((category,index)=>(
                            <button key={index} className="w-full p-3 border border-secondary-400 hover:bg-secondary-200/30 rounded-full hover:cursor-pointer  hover:text-white font-semibold">
                                {category}
                            </button>
                        ))}

                    </div>
                    
                    <div>
                        <div className="w-full my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-18">
                            {earbuds.map((product,index)=>(
                                <ProductCard key={index}
                                    image={product.image}
                                    name={product.name}
                                    subtitle={product.subtitle}
                                    price={product.price}
                                    isNew={product.isNew}
                                    bgColor="bg-section-alternative"
                                />
                            ))}
                        </div>

                        <div className="w-full flex justify-center mx-auto">
                            <button className="bg-primary-500 py-4 px-10 rounded-full hover:bg-primary-500/90 hover:cursor-pointer text-white font-semibold">View More</button>
                        </div>
                    </div>
                    
                    <div className="my-30">
                        <BrandSpotlight/>
                    </div>
                </div>

            </div>
        </div>
    )
}