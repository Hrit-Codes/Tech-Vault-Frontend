import { sampleBlogs } from "../../configs/constants";
import BlogCard from "./BlogCard";
import BlogHero from "./BlogHero";

export default function BlogPage(){
    return(
        <div className="w-full mx-auto flex flex-col">
            <BlogHero/>

            <div className="w-full mx-auto py-32 bg-section px-6">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-8">
                        {sampleBlogs.map((blog,index)=>(
                            <BlogCard key={index} blog={blog}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}