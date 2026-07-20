import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
    image: string;
    name: string;
    subtitle: string;
    icon: LucideIcon;
}

export default function CategoryCard({ image, name, subtitle, icon: Icon }: CategoryCardProps) {
    return (
        <div className="relative rounded-3xl overflow-hidden aspect-4/5 cursor-pointer group">
            <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />

            {/* Gradient for text legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-black/100 via-black/10 to-transparent" />

            {/* Category type badge */}
            <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="font-bold text-base text-white truncate">{name}</h3>
                    <p className="text-sm text-white/70 truncate">{subtitle}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                </div>
            </div>
        </div>
    );
}
