interface ProductCardProps {
  image: string;
  name: string;
  subtitle: string;
  price: number;
  isNew?: boolean;
}

export default function ProductCard({ image, name, subtitle, price, isNew }: ProductCardProps) {
  return (
    <div className="relative flex flex-col gap-3 cursor-pointer group">
      {/* Image Container */}
      <div className="relative  rounded-2xl overflow-hidden aspect-square bg-section/60 p-6 ">
        {isNew && (
          <span className="absolute top-3 left-3 z-10 bg-primary-900 dark:bg-white text-white dark:text-primary-900 text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 px-1">
        <h3 className="text-sm font-semibold text-primary-900 dark:text-white">{name}</h3>
        <p className="text-xs text-primary-400 dark:text-primary-300">{subtitle}</p>
        <p className="text-sm font-semibold text-primary-900 dark:text-white mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}