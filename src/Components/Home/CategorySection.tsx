import SliderComponent from "react-slick";
import { Headphones as HeadphonesIcon, Laptop as LaptopIcon, Watch as WatchIcon } from "lucide-react";
import Headphones from "@/Assets/Categories/Headphones.webp";
import Laptop from "@/Assets/Categories/Laptop.webp";
import Smartwatch from "@/Assets/Categories/SmartWatch.webp";
import CategoryCard from "../Category/CategoryCard";
import { useEffect, useState } from "react";

const Slider = (SliderComponent as any).default || SliderComponent;

const categories = [
    { id: 1, image: Laptop, name: "Laptops", subtitle: "Power for professionals", icon: LaptopIcon },
    { id: 2, image: Headphones, name: "Audio", subtitle: "Immersive sound precision", icon: HeadphonesIcon },
    { id: 3, image: Smartwatch, name: "Wearables", subtitle: "Stay connected, beautifully", icon: WatchIcon },
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
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold">
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
                            subtitle={category.subtitle}
                            icon={category.icon}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
