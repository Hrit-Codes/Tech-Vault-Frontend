import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface blog{
    id:string,
    title:string,
    slug:string,
    excerpt:string,
    featured_image:string,
    author_id:string,
    author_name:string,
    is_published:boolean,
    published_at:string,
    created_at:string,
}

export default function BlogCard({ blog }: { blog: blog }){
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/blogDetail/${blog.slug}`)}
            className="group hover:-translate-y-3 shadow-sm hover:shadow-lg flex flex-col cursor-pointer bg-section-alternative rounded-2xl overflow-hidden border border-secondary-400/5 hover:border-primary-400/30 transition-colors"
        >
            <div className="relative aspect-5/3 overflow-hidden bg-section">
                <img
                    src={blog.featured_image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            <div className="flex flex-col grow p-5 gap-2">
                <h3 className="font-semibold text-base md:text-lg leading-snug line-clamp-2 min-h-11">
                    {blog.title}
                </h3>

                <p className="text-sm text-description line-clamp-3 grow">
                    {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-secondary-400/10">
                    <p className="text-xs text-description truncate">
                        By {blog.author_name}
                    </p>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/blogDetail/${blog.slug}`);
                        }}
                        className="flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors hover:cursor-pointer shrink-0"
                    >
                        Read More
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};