import SliderComponent from "react-slick";
import CategoryCard from "../Category/CategoryCard";
import { useEffect, useState } from "react";

const Slider = (SliderComponent as any).default || SliderComponent;

const categories = [
    { id: 1, image: "/Categories/laptops.webp", name: "Laptops"},
    { id: 2, image: "/Categories/earbuds.webp", name: "Earbuds"},
    { id: 3, image: "/Categories/mobile-phones.webp", name: "Mobile Phones"},
    { id: 4, image: "/Categories/smartwatches.webp", name: "Smartwatches"},
    { id: 5, image: "/Categories/speakers.webp", name: "Speakers"},
    { id: 6, image: "/Categories/tablets.webp", name: "Tablets"},
    { id: 7, image: "/Categories/drones.webp", name: "Drones"},
    { id: 8, image: "/Categories/monitor.webp", name: "Monitors"},
    { id: 9, image: "/Categories/playstation.webp", name: "Playstation"},
];

function getSlidesToShow(width: number) {
    if (width < 640) return 2;
    return 3;
}

export default function CategorySection() {
    const [slidesToShow, setSlidesToShow] = useState(() =>
        getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth)
    );

    useEffect(() => {
        const onResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: true,
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
                <div>
                    <h2 className="heading-section">
                        Shop by Category
                    </h2>
                    <h3 className="text-sm font-normal text-description leading-relaxed mt-1">
                        Curated tech, organized for you.
                    </h3>
                </div>
                <button className="text-sm text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer">
                    View All
                </button>
            </div>

            {/* Slider */}
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category.id} className="px-2 sm:px-3 md:px-4">
                        <CategoryCard
                            image={category.image}
                            name={category.name}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}