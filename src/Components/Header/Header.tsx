import { Heart, ShoppingCart, Search, User, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import MainLogo from './MainLogo';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../configs/constants';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../../apis/modules/auth';

interface NavItem {
    label: string;
    path: string;
}

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen]=useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen]=useState(false);
    const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [query, setQuery]=useState("");
    

    // Controls whether the little "Profile / Log Out" popout is showing.
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const isHomePage = location.pathname === "/";

    const logoutMutation=useMutation({
        mutationFn:()=>logoutUser(),
        onSuccess:()=>{
            localStorage.removeItem("user");
            setIsUserMenuOpen(false);
            toast.success("Logged out successfully");
            navigate("/login");
        }
    })

    const updateSlider = (index: number | null) => {
        if (index === null || !menuItemsRef.current[index]) {
            setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
            return;
        }
        const el = menuItemsRef.current[index];
        if (el) setSliderStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };

    const user = localStorage.getItem("user");

    // Closes the popout whenever someone clicks anywhere else on the page —
    // this is the "click away to close" behavior people expect from a dropdown.
    useEffect(() => {
        if (!isUserMenuOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isUserMenuOpen]);

    const handleUserIconClick = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        setIsUserMenuOpen((prev) => !prev);
    };

    const handleSearch=()=>{
        if(!query.trim()) return;
        setIsSearchOpen(false);
        setIsMobileSearchOpen(false);
        navigate(`/search?q=${query}`)
        setQuery("");
    }

    return (
        <>
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
            {isMobileSearchOpen && (
                <div className='fixed inset-0 z-[80] lg:hidden transition-all duration-500'>
                    <div className='absolute inset-0 bg-black/80 backdrop-blur-md' onClick={()=>{setIsMobileSearchOpen(false); setIsSearchOpen(false)}}>
                        <div className='w-full h-full flex flex-col justify-center my-20 items-center'>
                            <div className='relative w-full flex justify-center' onClick={(e)=>e.stopPropagation()}>
                                <input 
                                    type="text"
                                    placeholder='Search...'
                                    className='bg-transparent text-sm px-4 py-2 outline-1 outline-secondary-50 rounded-2xl w-64'
                                    autoFocus
                                    value={query}
                                    onChange={(e)=>setQuery(e.target.value)}
                                    onKeyDown={(e)=>{
                                        if(e.key==="Enter") handleSearch();
                                    }}/>

                            </div>

                        </div>

                    </div>

                </div>
            )}
            <div className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center">

                {/* Logo */}
                <div className="shrink-0">
                    <MainLogo />
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex relative items-center gap-1 backdrop-blur-md border rounded-full px-2 py-2 bg-white/10 dark:bg-white/5 border-black/10 dark:border-white/10 shadow-sm">
                    {/* Sliding indicator */}
                    <div
                        className="absolute h-[calc(100%-8px)] top-1 rounded-full bg-primary-500 transition-all duration-300 ease-out pointer-events-none"
                        style={{ left: sliderStyle.left, width: sliderStyle.width, opacity: sliderStyle.opacity }}
                    />
                    {navItems.map((item: NavItem, idx: number) => {
                        const isActive = location.pathname === item.path && !isHomePage;
                        return (
                            <button
                                key={item.label}
                                ref={(el) => { menuItemsRef.current[idx] = el; }}
                                onClick={() => navigate(item.path)}
                                onMouseEnter={() => updateSlider(idx)}
                                onMouseLeave={() => updateSlider(null)}
                                className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 hover:cursor-pointer ${
                                    isActive
                                        ? "bg-primary-500 text-white"
                                        : isHomePage
                                            ? " hover:text-white"
                                            : " hover:text-white"
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Icons */}
                <div className="flex flex-row items-center gap-4 shrink-0">
                    <div className='relative'>
                    {!isSearchOpen?(
                        <button onClick={()=>{setIsSearchOpen(true); setIsMobileSearchOpen(true)}}>
                            <Search size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" />
                        </button>
                        ):(
                            <div className='relative hidden lg:flex'>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    className='bg-transparent text-sm px-4 py-2 outline-1 outline-secondary-50 rounded-2xl w-48'
                                    autoFocus
                                    value={query}
                                    onChange={(e)=>setQuery(e.target.value)}
                                    onKeyDown={(e)=>{
                                        if(e.key==="Enter") handleSearch();
                                    }}
                                />
                                <button
                                    onClick={()=>setIsSearchOpen(false)}
                                    className='p-2'>
                                        <X size={20} className='hover:cursor-pointer hover:text-primary-400 transition-colors'/>
                                </button>

                            </div>
                        )}
                    </div>
                    {user && (
                        <>
                        <Heart size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" onClick={() => navigate("/wishlist")} />
                        <ShoppingCart size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" />
                        </>
                    )}

                    {/* User icon + dropdown popout */}
                    <div className="relative" ref={userMenuRef}>
                        <User
                            size={20}
                            className="hover:cursor-pointer hover:text-primary-400 transition-colors"
                            onClick={handleUserIconClick}
                        />

                        {isUserMenuOpen && user && (
                            <div className="absolute right-0 top-full mt-3 w-48 backdrop-blur-md bg-white/95 dark:bg-section-alternative border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                <button
                                    onClick={() => {
                                        setIsUserMenuOpen(false);
                                        navigate("/profile");
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-neutral-800 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors hover:cursor-pointer"
                                >
                                    <UserCircle size={18} className="text-primary-500" />
                                    My Profile
                                </button>
                                <button
                                    onClick={()=>logoutMutation.mutate()}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors hover:cursor-pointer border-t border-black/5 dark:border-white/5"
                                >
                                    <LogOut size={18} />
                                    Log Out
                                </button>
                            </div>
                        )}

                    </div>

                    <button
                        className="md:hidden hover:text-primary-400 transition-colors"
                        onClick={() => setMobileOpen((p) => !p)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden mt-3 mx-auto max-w-7xl bg-white dark:bg-section-alternative border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                    {navItems.map((item: NavItem) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.label}
                                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                                className={`w-full text-left px-6 py-4 text-sm font-semibold border-b border-black/5 dark:border-white/5 last:border-0 transition-colors hover:cursor-pointer ${
                                    isActive
                                        ? "text-primary-500 bg-primary-50 dark:bg-primary-900/30"
                                        : "text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20"
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}

                    {/* Profile / Logout also available in the mobile menu, same as desktop */}
                    {user && (
                        <>
                            <button
                                onClick={() => { navigate("/profile"); setMobileOpen(false); }}
                                className="w-full flex items-center gap-3 text-left px-6 py-4 text-sm font-semibold border-b border-black/5 dark:border-white/5 text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors hover:cursor-pointer"
                            >
                                <UserCircle size={18} className="text-primary-500" />
                                My Profile
                            </button>
                            <button
                                onClick={() => { logoutMutation.mutate(); setMobileOpen(false); }}
                                className="w-full flex items-center gap-3 text-left px-6 py-4 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors hover:cursor-pointer"
                            >
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
        </>
    );
}