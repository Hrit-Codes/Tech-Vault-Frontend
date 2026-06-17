import SliderComponent from "react-slick";
import CategoryCard from "../Components/ui/CategoryCard";
const Slider = (SliderComponent as any).default || SliderComponent;
export default function CategorySection(){

    const Categories = [
        { id: 1, image: '/products/watch.jpg', name: 'UltraWatch Series 8', subtitle: 'Midnight Aluminum', price: 399.00, isNew: true },
        { id: 2, image: '/products/earbuds.jpg', name: 'SonicPod Pro', subtitle: 'Noise Cancelling', price: 249.00 },
        { id: 3, image: '/products/laptop.jpg', name: 'TechBook Air 15', subtitle: 'M2 Chip / 16GB RAM', price: 1299.00 },
        { id: 4, image: '/products/tablet.jpg', name: 'PadVision Pro', subtitle: 'Retina XDR Display', price: 899.00 },
        { id: 5, image: '/products/speaker.jpg', name: 'SoundCore Max', subtitle: '360° Audio', price: 199.00 },
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
        <div className="w-full max-w-6xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                <h2 className="text-2xl font-bold text-primary-900 dark:text-white">
                    New Arrivals
                </h2>
                <p className="text-sm text-primary-400 dark:text-primary-300 mt-1">
                    The latest in precision engineering.
                </p>
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