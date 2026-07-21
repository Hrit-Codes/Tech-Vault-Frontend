import SliderComponent from "react-slick";
import { useEffect, useState } from "react";


type BrandCardProps={
    image:string,
    name:string
}
export function BrandCard({ image, name }: BrandCardProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer group overflow-hidden">
      <div className="w-full h-32 bg-white rounded-xl flex items-center justify-center p-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <span className="text-sm font-medium text-neutral-600 mt-2">
        {name}
      </span>
    </div>
  );
}

const Slider = (SliderComponent as any).default || SliderComponent;

const defaultBrands = [
  { id: 1, image: "/Brands/Acer.webp", name: "Acer" },
  { id: 2, image: "/Brands/Anker.webp", name: "Anker" },
  { id: 3, image: "/Brands/Apple.webp", name: "Apple" },
  { id: 4, image: "/Brands/Asus.webp", name: "Asus" },
  { id: 5, image: "/Brands/HikVision.webp", name: "HikVision" },
  { id: 6, image: "/Brands/Lenovo.webp", name: "Lenovo" },
  { id: 7, image: "/Brands/Samsung.webp", name: "Samsung" },
];

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function BrandsSection() {
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
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section id="newArrivals" className="w-full max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="w-full flex flex-col items-center justify-center gap-3 mb-12">
          <h2 className="heading-section">
            Our Brands
          </h2>
          <div className="w-40 h-1 bg-secondary-400"/> 
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {defaultBrands.map((brand) => (
          <div key={brand.id} className="px-2 sm:px-4 md:px-6">
            <BrandCard name={brand.name} image={brand.image}/>
          </div>
        ))}
      </Slider>
    </section>
  );
}