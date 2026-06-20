export default function WishlistPage(){
 const wishlistItems = [
    { 
      id: 1, 
      image: '/products/watch.jpg', 
      name: 'UltraWatch Series 8', 
      subtitle: 'Midnight Aluminum', 
      price: 399.00, 
      isNew: true,
      description: 'The ultimate smartwatch with advanced health tracking, 18-hour battery life, and always-on Retina display.'
    },
    { 
      id: 2, 
      image: '/products/earbuds.jpg', 
      name: 'SonicPod Pro', 
      subtitle: 'Noise Cancelling', 
      price: 249.00, 
      isNew: false,
      description: 'Premium wireless earbuds with active noise cancellation, spatial audio, and 24-hour total battery life.'
    },
    { 
      id: 3, 
      image: '/products/laptop.jpg', 
      name: 'TechBook Air 15', 
      subtitle: 'M2 Chip / 16GB RAM', 
      price: 1299.00, 
      isNew: false,
      description: 'Ultra-slim laptop featuring the M2 chip, 16GB unified memory, and all-day battery life for ultimate productivity.'
    },
    { 
      id: 4, 
      image: '/products/tablet.jpg', 
      name: 'PadVision Pro', 
      subtitle: 'Retina XDR Display', 
      price: 899.00, 
      isNew: false,
      description: 'Revolutionary tablet with Retina XDR display, M2 chip, and Pencil hover support for creatives and professionals.'
    },
    { 
      id: 5, 
      image: '/products/speaker.jpg', 
      name: 'SoundCore Max', 
      subtitle: '360° Audio', 
      price: 199.00, 
      isNew: false,
      description: 'Portable speaker with immersive 360° audio, 20-hour battery life, and waterproof design for any environment.'
    },
  ];
    return(
        <div className="w-full bg-section">
            <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10">

                {/* Header */}
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-semibold text-3xl">Wishlist</h2>
                    <h3 className="text-sm text-gray-700 dark:text-gray-400">4 items saved for later</h3>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-14">
                {wishlistItems.map((item,index)=>(
                    <div key={index} className="relative flex flex-col cursor-pointer group bg-section-alternative rounded-2xl">
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
                        <div className="flex flex-col gap-4 px-4 py-6">
                            <div className="flex flex-row items-center justify-between gap-2">
                                <h3 className="text-lg font-semibold ">{item.name}</h3>
                                <p className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</p>
                            </div>
                            <p className="text-xs ">{item.description}</p>

                            <div className="w-full flex flex-col gap-4 text-center font-medium">
                                <button className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-2xl hover:cursor-pointer ">Move to Cart</button>
                                <a href="#" className="cursor-pointer text-secondary-500 hover:underline hover:text-secondary-400">View Details</a>

                            </div>
                        </div>
                        </div>
                ))}
                </div>
            </div>

        </div>
    )
}