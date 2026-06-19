import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import { BackgroundEffects } from "../Components/ui/BackgroundEffects";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/ScrollToTopButton";

export default function MainLayout(){
    return(
        <div className="relative w-full min-h-screen">
            <BackgroundEffects/>
            
            <div className="relative z-10">
                <Header/>
                <main className="min-h-screen">
                    <Outlet/>
                </main>
                <Footer/>
                <ScrollToTopButton/>
            </div>
        </div>
    )
}