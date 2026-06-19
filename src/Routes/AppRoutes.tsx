import {Routes,Route} from "react-router-dom"
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Page/Home";
import WishlistPage from "../Page/Wishlist";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../Page/Login";
import PublicRoute from "../Layout/PublicLayout";
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
            <Route element={<PublicRoute/>}>
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                </Route>
            </Route>
        </Routes>
        </>
    )
}