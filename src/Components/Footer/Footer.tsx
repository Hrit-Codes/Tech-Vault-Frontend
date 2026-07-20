import companyLogo from "@/Assets/Logo.webp"
import { useState } from "react";
import type { ReactNode } from "react";
import { Mail, Phone, MapPin, Truck, ShieldCheck, BadgeCheck, Headset, ChevronDown, ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiVisa, SiMastercard } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const trustBadges = [
    { icon: Truck, title: "Nationwide Delivery", desc: "2–5 day dispatch across Nepal" },
    { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted payments, every order" },
    { icon: BadgeCheck, title: "100% Genuine", desc: "Authorized dealer warranty" },
    { icon: Headset, title: "Real Support", desc: "Humans on call, not bots" },
];

const socials = [
    { label: "Facebook", icon: FaFacebookF, url: "#" },
    { label: "Instagram", icon: FaInstagram, url: "#" },
    { label: "X", icon: FaXTwitter, url: "#" },
    { label: "LinkedIn", icon: FaLinkedinIn, url: "#" },
];

const shopLinks = [
    { label: "Browse Categories", href: "/shop" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track Order", href: "#" },
];

const companyLinks = [
    { label: "About Us", href: "/aboutus" },
    { label: "Warranty Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
];

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-secondary-400/10 md:border-none pb-5 md:pb-0">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between py-1 md:py-0 md:pointer-events-none cursor-pointer md:cursor-default"
            >
                <h3 className="font-bold text-xs uppercase tracking-wider">{title}</h3>
                <ChevronDown
                    className={`w-4 h-4 text-description md:hidden transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-out md:grid-rows-[1fr]! md:opacity-100! ${
                    open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                } md:mt-4`}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    );
}

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="relative w-full bg-section-alternative border-t border-secondary-400/10 overflow-hidden">

            

            <div className="relative z-10">

                {/* Trust badge strip */}
                <div className="border-b border-secondary-400/10">
                    <div className="max-w-6xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {trustBadges.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-section border border-secondary-400/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold">{title}</p>
                                    <p className="text-[11px] text-description leading-snug">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content grid */}
                <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* Brand column */}
                    <div className="md:col-span-4 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <img src={companyLogo} alt="TechVault Logo" className="w-10 h-10 object-contain rounded-md bg-section border border-secondary-400/10 p-1" />
                            <div>
                                <h2 className="font-bold text-lg tracking-tight">TechVault</h2>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-primary-400 font-semibold">&amp; Pvt. Ltd.</p>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed max-w-xs text-description">
                            Premium tech accessories engineered for performance and visual silence — curated and shipped across Nepal.
                        </p>

                        <div className="flex items-center gap-2 text-xs text-description">
                            <MapPin className="w-3.5 h-3.5 text-secondary-400 shrink-0" />
                            Kathmandu, Nepal
                        </div>

                        <div className="flex flex-row gap-2 pt-1">
                            {socials.map(({ label, icon: Icon, url }) => (
                                <a
                                    key={label}
                                    href={url}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg bg-section border border-secondary-400/10 flex items-center justify-center text-description hover:text-primary-400 hover:border-primary-400/40 hover:bg-primary-400/5 transition-all duration-200"
                                >
                                    <Icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns — collapsible on mobile, static on desktop */}
                    <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FooterColumn title="Shop">
                            <ul className="space-y-3">
                                {shopLinks.map(({ label, href }) => (
                                    <li key={label}>
                                        <button
                                            onClick={() => navigate(href)}
                                            className="text-sm text-description hover:text-primary-400 transition-colors cursor-pointer text-left"
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>

                        <FooterColumn title="Company">
                            <ul className="space-y-3">
                                {companyLinks.map(({ label, href }) => (
                                    <li key={label}>
                                        <button
                                            onClick={() => navigate(href)}
                                            className="text-sm text-description hover:text-primary-400 transition-colors cursor-pointer text-left"
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>
                    </div>

                    {/* Contact column */}
                    <div className="md:col-span-3">
                        <FooterColumn title="Get in Touch">
                            <ul className="space-y-4 text-sm text-description">
                                <li className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-secondary-400 shrink-0 mt-0.5" />
                                    <div className="flex flex-col gap-0.5">
                                        <a href="tel:+9779742935093" className="hover:text-primary-400 transition-colors">+977 974-2935093</a>
                                        <a href="tel:+9779861418083" className="hover:text-primary-400 transition-colors">+977 986-1418083</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-secondary-400 shrink-0 mt-0.5" />
                                    <a href="mailto:support@techvault.com.np" className="hover:text-primary-400 transition-colors break-all">
                                        support@techvault.com.np
                                    </a>
                                </li>
                            </ul>
                        </FooterColumn>
                    </div>
                </div>

                {/* Payment methods strip */}
                <div className="border-t border-secondary-400/10">
                    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[11px] uppercase tracking-wider text-description">Secure payment options</p>
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            <span className="w-11 h-8 rounded-md bg-section border border-secondary-400/10 flex items-center justify-center text-description">
                                <SiVisa className="text-base" />
                            </span>
                            <span className="w-11 h-8 rounded-md bg-section border border-secondary-400/10 flex items-center justify-center text-description">
                                <SiMastercard className="text-base" />
                            </span>
                            {["eSewa", "Khalti", "COD"].map((label) => (
                                <span
                                    key={label}
                                    className="px-3 h-8 rounded-md bg-section border border-secondary-400/10 flex items-center justify-center text-[11px] font-semibold text-description"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-secondary-400/10">
                    <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-description opacity-80">
                        <p>
                            &copy; 2026 <a href="https://magnas.com.np/" className="hover:text-primary-400 font-semibold transition-colors">Magnas Infotech Solutions</a>. All rights reserved.
                        </p>
                        <div className="hidden lg:flex items-center gap-6">
                            <a href="/sitemap" className="hover:text-primary-400 transition-colors">Sitemap</a>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                aria-label="Back to top"
                                className="w-8 h-8 rounded-lg bg-section border border-secondary-400/10 flex items-center justify-center hover:text-primary-400 hover:border-primary-400/40 transition-all cursor-pointer"
                            >
                                <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
