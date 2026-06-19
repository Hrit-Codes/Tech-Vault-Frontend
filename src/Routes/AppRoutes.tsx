import {Routes,Route} from "react-router-dom"
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Page/Home";
import WishlistPage from "../Page/Wishlist";
import ProductDetailPage from "../Page/ProductDetail";

export default function AppRoutes(){
    return(
        <>
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/wishlist" element={<WishlistPage/>}/>
                <Route path="/product" element={<ProductDetailPage/>}/>
            </Route>
        </Routes>
        </>
    )
}