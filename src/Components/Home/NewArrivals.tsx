import SliderComponent from "react-slick";
import ProductCard from "../Product/ProductCard";
import UltraWatch from '@/Assets/Products/UltraWatchSeries8.webp'
import MacbookAir from '@/Assets/Products/MacbookAir15.webp'
import IpadPro from '@/Assets/Products/IpadPro.webp'
import SoundCoreMax from '@/Assets/Products/SoundCoreMax.webp'
import SonicPodPro from '@/Assets/Products/SonicPodPro.webp'

const Slider = (SliderComponent as any).default || SliderComponent;
const newArrivals = [
  { id: 1, image: UltraWatch, name: 'UltraWatch Series 8', subtitle: 'Midnight Aluminum', price: 399.00, isNew: true },
  { id: 2, image: SonicPodPro, name: 'SonicPod Pro', subtitle: 'Noise Cancelling', price: 249.00 },
  { id: 3, image: MacbookAir , name: 'TechBook Air 15', subtitle: 'M2 Chip / 16GB RAM', price: 1299.00 },
  { id: 4, image: IpadPro , name: 'PadVision Pro', subtitle: 'Retina XDR Display', price: 899.00 },
  { id: 5, image: SoundCoreMax , name: 'SoundCore Max', subtitle: '360° Audio', price: 199.00 },
];

export default function NewArrivals() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
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

      {/* Slider */}
      <Slider {...settings}>
        {newArrivals.map((product) => (
          <div key={product.id} className="px-3">
            <ProductCard
              image={product.image}
              name={product.name}
              subtitle={product.subtitle}
              price={product.price}
              isNew={product.isNew}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}