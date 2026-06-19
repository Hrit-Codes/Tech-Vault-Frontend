import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout=()=>{
    const user=localStorage.getItem("user");

    if(!user){
        console.log("User has been logged out");
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
}

export default PrivateLayout;