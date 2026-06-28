import companyLogo from "@/Assets/Logo.webp"
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    const socials = [
        { label: "Facebook", icon: FaFacebookF, url: "#" },
        { label: "Instagram", icon: FaInstagram, url: "#" },
        { label: "X", icon: FaXTwitter, url: "#" },
        { label: "LinkedIn", icon: FaLinkedinIn, url: "#" }
    ];

    return (
        <footer className="w-full bg-section-alternative border-t border-secondary-400/10 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6 ">

                {/* Main Grid Structure */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Col 1 – Brand Identity (Spans 5 Columns for balanced weight) */}
                    <div className="md:col-span-5 flex flex-col gap-5">
                        <div className="flex items-center gap-4">
                            <img src={companyLogo} alt="TechVault Logo" className="w-12 h-12 object-contain" />
                            <div>
                                <h2 className="font-bold text-xl tracking-tight ">
                                    TechVault
                                </h2>
                                <h4 className="text-[10px] tracking-[0.2em] uppercase text-primary-400 font-semibold">
                                    &amp; Pvt. Ltd.
                                </h4>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-description font-normal max-w-sm">
                            Engineered for those who pursue performance and visual silence. We design premium tech accessories tailored for the modern digital lifestyle across Nepal, delivering uncompromising quality from prototype to box.
                        </p>

                        {/* Social Icons with Clean Circular Glassmorphism Backgrounds */}
                        <div className="flex flex-row gap-3 pt-2">
                            {socials.map(({ label, icon: Icon }) => (
                                <button 
                                    key={label} 
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full bg-section border border-secondary-400/5 flex items-center justify-center text-description hover:text-primary-400 hover:border-primary-400/30 transition-all duration-200 cursor-pointer shadow-sm"
                                >
                                    <Icon className="text-base" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 – Navigation Links (Spans 3 Columns) */}
                    <div className="md:col-span-3">
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <div className="w-8 h-0.5 bg-primary-400 mb-6" />
                        <ul className="space-y-3.5">
                            {[
                                { label: "Browse Categories", href: "/categories" },
                                { label: "New Arrivals",     href: "/new-arrivals" },
                                { label: "Company Profile",   href: "/company-profile" },
                                { label: "Terms & Conditions",href: "/terms" },
                                { label: "Warranty Policy",   href: "/warranty" },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <button 
                                        onClick={() => navigate(href)}
                                        className="text-sm text-description hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 font-medium cursor-pointer"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400/40 shrink-0" />
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 – Corporate Headquarters (Spans 4 Columns) */}
                    <div className="md:col-span-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
                            Contact Details
                        </h3>
                        <div className="w-8 h-0.5 bg-primary-400 mb-6" />
                        <ul className="space-y-4 text-sm text-description">
                            
                            {/* Address Location */}
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed font-normal">
                                    New Plaza Putalisadak, Kathmandu, Nepal<br />
                                    <span className="text-xs opacity-70">Post Box No:- 13965</span>
                                </span>
                            </li>

                            {/* Phone Systems */}
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                                <div className="flex flex-col gap-0.5 font-normal">
                                    <a href="tel:+9779742935093" className="hover:text-primary-400 transition-colors">+977 9742935093</a>
                                    <a href="tel:+9779861418083" className="hover:text-primary-400 transition-colors">+977 986-1418083</a>
                                </div>
                            </li>

                            {/* Email Support Counters */}
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                                <div className="flex flex-col gap-1 font-normal break-all">
                                    <a href="mailto:info@techvault.com.np" className="hover:text-primary-400 transition-colors">info@techvault.com.np</a>
                                    <a href="mailto:support@techvault.com.np" className="hover:text-primary-400 transition-colors">support@techvault.com.np</a>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Sub-Footer Copyright Area */}
                <div className="border-t border-secondary-400/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-description opacity-80">
                    <p className="tracking-wide">
                        &copy; 2026 <a href="https://magnas.com.np/" className="hover:text-primary-400 font-semibold transition-colors">Magnas Infotech Solutions</a>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                        <a href="/sitemap" className="hover:text-primary-400 transition-colors">Sitemap</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}