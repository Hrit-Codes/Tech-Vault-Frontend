import { Outlet } from "react-router-dom";
import Header from "../Components/ui/Header";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import ScrollToTopButton from "@/ScrollToTopButton";
// import CartSidebar from "@/Components/Cart/CartSidebar";

export default function MainLayout(){
    return(
        <div className="w-full">
        <Header/>
            <main className="min-h-screen">
                <Outlet/>
            </main>
        {/* <Footer/> */}
        {/* <CartSidebar/>
        <ScrollToTopButton/> */}
        </div>
    )
}