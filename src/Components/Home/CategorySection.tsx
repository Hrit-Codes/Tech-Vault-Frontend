import Headphones from "@/Assets/Categories/Headphones.webp";
import Laptop from "@/Assets/Categories/Laptop.webp";
import Smartwatch from "@/Assets/Categories/SmartWatch.webp";
import CategoryCard from "../Category/CategoryCard";

const categories = [
  // === Computing (using Laptop image) ===
  { id: 1, image: Laptop, name: "Laptops" },
  { id: 2, image: Laptop, name: "Tablets" },
  { id: 3, image: Laptop, name: "Monitors" },
  { id: 4, image: Laptop, name: "PC Components" },

  // === Audio (using Headphones image) ===
  { id: 5, image: Headphones, name: "Headphones" },
  { id: 6, image: Headphones, name: "Earbuds" },
  { id: 7, image: Headphones, name: "Speakers" },

  // === Wearables (using Smartwatch image) ===
  { id: 8, image: Smartwatch, name: "Smartwatches" },

  // === Mobile & Accessories (using Laptop image as fallback) ===
  { id: 9, image: Laptop, name: "Smartphones" },
  { id: 10, image: Laptop, name: "Chargers" },
  { id: 11, image: Laptop, name: "Cases & Covers" },

  // === Gaming (using Laptop image) ===
  { id: 12, image: Laptop, name: "Gaming Accessories" },

];

export default function CategorySection() {
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

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        image={category.image}
                        name={category.name}
                    />
                ))}
            </div>
        </div>
    );
}
