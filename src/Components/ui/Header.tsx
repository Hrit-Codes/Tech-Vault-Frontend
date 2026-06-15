import { useRef, useState } from 'react';
import { Heart, ShoppingCart, User, Search } from 'lucide-react';
import { navItems } from '../../Constants';
import MainLogo from './MainLogo';

export default function Header(){

    const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const updateSlider = (index: number | null) => {
        if (index === null || !menuItemsRef.current[index]) {
            setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
            return;
        }
        const currentItem = menuItemsRef.current[index];
        if (currentItem) {
            setSliderStyle({ left: currentItem.offsetLeft, width: currentItem.offsetWidth, opacity: 1 });
        }
    };

    return(
        <>
        <header className="absolute z-10 top-0 left-0 right-0 px-4 font-outfit bg-secondary-700 dark:border-b-2 dark:border-white border-slate-900">
            <div className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center">
                {/*Company Logo */}
                <div className="shrink-0">
                    <MainLogo/>
                </div>

                {/*Nav Menu*/}
                <div className="relative hidden md:flex flex-row justify-evenly gap-2 items-center space-x-5 px-5 py-4 rounded-full">
                    <div
                        className="absolute bottom-2 h-0.5 bg-secondary-500 transition-all duration-300 pointer-events-none"
                        style={{ left: sliderStyle.left, width: sliderStyle.width, opacity: sliderStyle.opacity }}
                    />
                    {navItems.map((item, idx) => (
                        <div
                            key={item.label}
                            ref={(el) => { menuItemsRef.current[idx] = el; }}
                            onMouseEnter={() => updateSlider(idx)}
                            onMouseLeave={() => updateSlider(null)}
                        >
                            <h3 className="hover:cursor-pointer whitespace-nowrap">{item.label}</h3>
                        </div>
                    ))}
                </div>
                
                {/*ShoppingCart + User Profile*/}
                <div className="flex flex-row justify-evenly items-center gap-4 shrink-0">
                    <Search className="hover:cursor-pointer"/>
                    <Heart className="hover:cursor-pointer" onClick={()=>window.location.href="/wishlist1"}/>
                    <ShoppingCart className="hover:cursor-pointer" />
                    <User className="hover:cursor-pointer"/>
                </div>

            </div>

        </header>
        </>
    )
}