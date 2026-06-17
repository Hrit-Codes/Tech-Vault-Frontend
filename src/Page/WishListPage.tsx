export default function WishlistPage(){
    const wishlistItems = [
        { id: 1, image: '/products/watch.jpg', name: 'UltraWatch Series 8', subtitle: 'Midnight Aluminum', price: 399.00, isNew: true },
        { id: 2, image: '/products/earbuds.jpg', name: 'SonicPod Pro', subtitle: 'Noise Cancelling', price: 249.00, isNew:false },
        { id: 3, image: '/products/laptop.jpg', name: 'TechBook Air 15', subtitle: 'M2 Chip / 16GB RAM', price: 1299.00,isNew:false },
        { id: 4, image: '/products/tablet.jpg', name: 'PadVision Pro', subtitle: 'Retina XDR Display', price: 899.00, isNew:false },
        { id: 5, image: '/products/speaker.jpg', name: 'SoundCore Max', subtitle: '360° Audio', price: 199.00, isNew:false },
    ];
    return(
        <div className="w-full bg-section">
            <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10">

                {/* Header */}
                <div className="w-full flex flex-col gap-4">
                    <h2 className="font-semibold text-xl">Wishlist</h2>
                    <p className="text-xs">4 items saved for later</p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map((item,index)=>(
                    <div key={index} className="relative flex flex-col gap-3 cursor-pointer group">
                        {/* Image Container */}
                        <div className="relative bg-primary-100 dark:bg-primary-800 rounded-2xl overflow-hidden aspect-square">
                            {item.isNew && (
                            <span className="absolute top-3 left-3 z-10 bg-primary-900 dark:bg-white text-white dark:text-primary-900 text-xs font-semibold px-3 py-1 rounded-full">
                                New
                            </span>
                            )}
                            <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-0.5 px-1">
                            <h3 className="text-sm font-semibold text-primary-900 dark:text-white">{item.name}</h3>
                            <p className="text-xs text-primary-400 dark:text-primary-300">{item.subtitle}</p>
                            <p className="text-sm font-semibold text-primary-900 dark:text-white mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        </div>
                ))}
                </div>
            </div>

        </div>
    )
}