import ProductCard from "../../Components/Product/ProductCard";
import OfferHeader from "../../Components/ui/OfferHeader";
import { earbuds } from "../../configs/constants";

export default function OfferPage(){
    return(
        <div className="w-full mx-auto flex flex-col ">
            <OfferHeader title="Samsung Cash Back Offer" deadline="2026-07-31T00:00:00"/>

            <div className="w-full mx-auto bg-section py-32 ">
                <div className="w-full mx-auto max-w-6xl my-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-18">
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
        </div>
    )
}