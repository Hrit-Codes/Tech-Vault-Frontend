import ShopHeroBackground from "./ShopHeroBackground";

export function ShopHero(){
    return(
        <section className="relative w-full py-36 overflow-hidden">
            <ShopHeroBackground/>
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
                <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Shop.{" "}
                    <span className="text-primary-500">The best way</span>{" "}
                    <span className="block ">to buy the products you love.</span>
                </h1>
                <p className="text-sm text-primary-400 dark:text-primary-300 max-w-xl mx-auto leading-relaxed">
                    Genuine products with fast delivery across Nepal. Premium tech for every lifestyle.
                </p>
                </div>
            </div>
        </section>
    )
}