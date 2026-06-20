import SliderComponent from "react-slick";
import Headphones from "@/Assets/Categories/Headphones.webp";
import Laptop from "@/Assets/Categories/Laptop.webp";
import Smartwatch from "@/Assets/Categories/SmartWatch.webp";
import CategoryCard from "../Category/CategoryCard";
const Slider = (SliderComponent as any).default || SliderComponent;
export default function CategorySection(){

    const Categories = [
        { id: 1, image: Smartwatch , name: 'Laptops', subtitle: 'Power for professionals'},
        { id: 2, image: Headphones , name: 'Audio', subtitle: 'Immersive Precision' },
        { id: 3, image: Laptop , name: 'Wearables', subtitle: 'Stay connected beautifully' },
        { id: 4, image: '/products/tablet.jpg', name: 'PadVision Pro', subtitle: 'Retina XDR Display' },
        { id: 5, image: '/products/speaker.jpg', name: 'SoundCore Max', subtitle: '360° Audio' },
    ];

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: true,
        responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };
    return(
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                <h2 className="text-2xl font-bold ">
                    Browse Categories
                </h2>
                <h3 className="text-gray-700 dark:text-gray-400 mt-1">
                    Shop By Categories
                </h3>
                </div>
                <button className="text-sm text-secondary-500 hover:text-secondary-600 font-medium transition-colors">
                View All
                </button>
            </div> 

            {/* Slider  */}
            <Slider {...settings}>
                {Categories.map((category)=>(
                    <div key={category.id} className="px-3">
                        <CategoryCard
                            image={category.image}
                            name={category.name}
                            subtitle={category.subtitle}
                        />
                    </div>
                ))}
            </Slider>

        </div>
    )
}