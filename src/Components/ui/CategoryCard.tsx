interface CategoryCardProps{
    image:string,
    name:string,
    subtitle:string
}
export default function CategoryCard({image,name,subtitle}:CategoryCardProps){
    return(
        <div className="relative flex flex-col gap-3 cursor-pointer group">
            {/* Image Container */}
            <div className="relative bg-primary-100 dark:bg-primary-800 rounded-2xl overflow-hidden aspect-square">
                <img
                src={image}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute w-full h-full z-10 bg-black/10">
                </span>

                <span className="hidden group-hover:block absolute top-70 left-5 w-full h-full z-20">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-xs">{subtitle}</p>
                </span>
            </div>

        </div>
    )
}