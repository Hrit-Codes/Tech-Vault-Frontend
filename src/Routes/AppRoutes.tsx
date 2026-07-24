import {Routes,Route} from "react-router-dom"
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Page/Home";
import WishlistPage from "../Page/Wishlist";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../Page/Login";
import PublicRoute from "../Layout/PublicLayout";
import ProductDetailPage from "../Page/ProductDetail";
import RegisterPage from "../Page/Register";
import ShopPage from "../Page/Shop";
import AboutUsPage from "../Page/AboutUs";
import SearchPage from "../Page/Search";
import OfferPage from "../Page/Offer";
import BlogPage from "../Page/Blog";
import NotFoundPage from "../Page/NotFound";

export default function AppRoutes(){
    return(
        <>
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/wishlist" element={<WishlistPage/>}/>
                <Route path="/product" element={<ProductDetailPage/>}/>
                <Route path="/shop" element={<ShopPage/>}/>
                <Route path="/aboutus" element={<AboutUsPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/offer" element={<OfferPage/>}/>
                <Route path="/blogs" element={<BlogPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
            <Route element={<PublicRoute/>}>
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Route>
            </Route>
        </Routes>
        </>
    )
}