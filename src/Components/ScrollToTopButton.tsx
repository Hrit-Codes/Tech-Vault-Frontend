import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react"

const ScrollToTopButton=()=>{
    const [isVisible, setIsVisible]=useState(false);

    useEffect(()=>{
        const toggleVisibility=()=>{
            if(window.scrollY>800){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
        }

        window.addEventListener("scroll",toggleVisibility);

        return()=>{
            window.removeEventListener("scroll",toggleVisibility);
        }
    },[]);

    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth",
        });
    };

    return(
        <>
            {isVisible && (
                <button onClick={scrollToTop} className="rounded-full fixed bottom-8 right-4 z-50 w-11 h-11 bg-primary-500/80 border border-white/20 hover:border-primary-300/50 text-textLight/50 hover:text-textLight hover:bg-primary-500 transition-all duration-300 group hover:cursor-pointer" aria-label="Scroll to top">
                    <ArrowUp className="w-4 h-4 mx-auto group-hover:translate-y-[-2px] transition-transform duration-300 group:hover:text-primary-500/50 animate-bounce" strokeWidth={2}/>
                </button>
            )
            }
        </>
    )
}

export default ScrollToTopButton;