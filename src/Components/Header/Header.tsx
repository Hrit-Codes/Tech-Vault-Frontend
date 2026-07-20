import { Heart, ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';
import MainLogo from './MainLogo';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../configs/constants';

interface NavItem {
    label: string;
    path: string;
}

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const isHomePage = location.pathname === "/";

    const updateSlider = (index: number | null) => {
        if (index === null || !menuItemsRef.current[index]) {
            setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
            return;
        }
        const el = menuItemsRef.current[index];
        if (el) setSliderStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };

    return (
        <>
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center">

                {/* Logo */}
                <div className="shrink-0">
                    <MainLogo />
                </div>

                {/* Desktop Nav */}
                <div className={`hidden md:flex relative items-center gap-1 backdrop-blur-md border rounded-full px-2 py-2 ${
                    isHomePage
                        ? "bg-black/10 dark:bg-white/5 border-black/10 dark:border-white/10"
                        : "bg-white/80 dark:bg-primary-950/80 border-black/10 dark:border-white/10 shadow-sm"
                }`}>
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
                    <Search size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" />
                    <Heart size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" onClick={() => navigate("/wishlist")} />
                    <ShoppingCart size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" />
                    <User size={20} className="hover:cursor-pointer hover:text-primary-400 transition-colors" onClick={() => navigate("/login")} />

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
                <div className="md:hidden mt-3 mx-auto max-w-7xl bg-white dark:bg-primary-950 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
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
                </div>
            )}
        </header>
        </>
    );
}