import SliderComponent from "react-slick";
import ProductCard from "../Product/ProductCard";
import UltraWatch from '@/Assets/Products/UltraWatchSeries8.webp'
import MacbookAir from '@/Assets/Products/MacbookAir15.webp'
import IpadPro from '@/Assets/Products/IpadPro.webp'
import SoundCoreMax from '@/Assets/Products/SoundCoreMax.webp'
import SonicPodPro from '@/Assets/Products/SonicPodPro.webp'
import { useEffect, useState } from "react";
import CountdownTimer from "../ui/CountdownTimer";
import { useNavigate } from "react-router-dom";

const Slider = (SliderComponent as any).default || SliderComponent;

const newArrivals = [
  { id: 1, image: UltraWatch, name: 'UltraWatch Series 8', subtitle: 'Midnight Aluminum', price: 399.00, isNew: true },
  { id: 2, image: SonicPodPro, name: 'SonicPod Pro', subtitle: 'Noise Cancelling', price: 249.00 },
  { id: 3, image: MacbookAir , name: 'TechBook Air 15', subtitle: 'M2 Chip / 16GB RAM', price: 1299.00 },
  { id: 4, image: IpadPro , name: 'PadVision Pro', subtitle: 'Retina XDR Display', price: 899.00 },
  { id: 5, image: SoundCoreMax , name: 'SoundCore Max', subtitle: '360° Audio', price: 199.00 },
];

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function OfferSection() {
  const navigate=useNavigate();
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
      <div className="flex flex-col gap-4 items-start justify-between mb-12">
        <div className="w-full flex justify-between">
          <h2 className="heading-section">
            Samsung Cash Back Offer !!!
          </h2>
          <CountdownTimer targetDate={"2026-07-30T00:00:00"}/>
        </div>
        <button onClick={()=>navigate("/offer")} className="text-sm self-end text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer">
          View All
        </button>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {newArrivals.map((product) => (
          <div key={product.id} className="px-2 sm:px-4 md:px-6">
            <ProductCard
              image={product.image}
              name={product.name}
              subtitle={product.subtitle}
              price={product.price}
              isNew={product.isNew}
              bgColor="bg-section"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}