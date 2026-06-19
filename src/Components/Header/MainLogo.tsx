import companyLogo from "@/Assets/Logo.webp"
import { useNavigate } from "react-router-dom"
export default function MainLogo(){
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate("/")} className="flex items-center space-x-2 hover:cursor-pointer">
            <img src={companyLogo} alt="Company Logo" className="w-14 h-14 rounded-full object-cover"/>
            <span className="flex flex-row text-2xl font-semibold text-primary-400">TechVault</span>
        </div>
    )
}