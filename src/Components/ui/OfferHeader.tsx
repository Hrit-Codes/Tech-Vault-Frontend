import CountdownTimer from "./CountdownTimer";
import HeroBackground from "./HeroBackground";

type OfferHeaderProps={
    image?:string,
    title:string,
    deadline:string 
}

export default function OfferHeader({image,title,deadline="2025-07-31T00:00:00"}:OfferHeaderProps){
    return(
        <section className="relative w-full py-36 overflow-hidden">
            {image? (
                <img src={image} alt={title} className="w-full h-full object-center object-cover" />
            ):(
                <HeroBackground/>
            )}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-primary-400 dark:text-primary-300 max-w-xl mx-auto leading-relaxed">
                            <CountdownTimer targetDate={deadline}/>
                        </p>
                    </div>
                </div>
        </section>
    )
}