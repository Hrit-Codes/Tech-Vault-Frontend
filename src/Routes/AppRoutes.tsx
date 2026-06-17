import {Routes,Route} from "react-router-dom"
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Page/HomePage";
import WishlistPage from "../Page/WishListPage";

export default function AppRoutes(){
    return(
        <>
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/wishlist" element={<WishlistPage/>}/>
            </Route>
        </Routes>
        </>
    )
}