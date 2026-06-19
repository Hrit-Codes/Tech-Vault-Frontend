import { Heart, ShoppingCart} from 'lucide-react';
import { User } from 'lucide-react';
import { Search } from 'lucide-react';
import { navItems } from '../../Constants';
import MainLogo from './MainLogo';
import { useNavigate } from 'react-router-dom';

export default function Header(){

    // const {setIsCartOpen}=useCart();

    const navigate= useNavigate();

    // const [searchbarOpen, setSearchbarOpen]=useState<Boolean>(false);

    return(
        <>
        <header className="absolute z-10 top-4 left-0 right-0 px-4 font-outfit">
            <div className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center">
                {/*Company Logo */}
                <div className="shrink-0">
                    <MainLogo/>
                </div>

                {/*Nav Menu*/}
                <div className="hidden md:flex flex-row justify-evenly gap-2 items-center space-x-5 px-5 py-4 rounded-full bg-primary-500">
                    {navItems.map((item)=>{
                        return(
                            <h3 key={item.label} className="hover:cursor-pointer whitespace-nowrap hover:text-white dark:hover:text-black">{item.label}</h3>
                        )
                    })}
                </div>
                
                {/*ShoppingCart + User Profile*/}
                <div className="flex flex-row justify-evenly items-center gap-4 shrink-0">
                    {/* {searchbarOpen? (
                        <div className="relative">
                        <div className="p-[2px] rounded-full animate-in fade-in slide-in-from-right-5 duration-300">
                            <div className="bg-black/50 backdrop-blur-sm rounded-full flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-white px-4 py-2 outline-none w-48 placeholder:text-white/50 text-sm"
                                autoFocus
                            />
                            <button
                                onClick={() => setSearchbarOpen(false)}
                                className="p-2 text-white/80 hover:text-white transition-colors mr-1 hover:cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                            </div>
                        </div>
                        </div>
                    ):(
                        <Search onClick={()=>setSearchbarOpen(true)} className="text-white/50 hover:cursor-pointer hover:text-white"/>
                    )} */}
                    <Search className=" hover:cursor-pointer hover:text-primary-400"/>
                    <Heart className=" hover:cursor-pointer hover:text-primary-400" onClick={()=>navigate("/wishlist")}/>
                    <ShoppingCart className="hover:cursor-pointer hover:text-primary-400" />
                    <User className=" hover:cursor-pointer hover:text-primary-400" onClick={()=>navigate("/login")}/>
                </div>

            </div>

        </header>
        </>
    )
}