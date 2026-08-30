import companyLogo from "/TechVault-Logo.png";
import { useNavigate } from "react-router-dom"
export default function MainLogo(){
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate("/")} className="flex items-center space-x-2 hover:cursor-pointer">
            <img src={companyLogo} alt="Company Logo" className="w-14 h-14 rounded-full object-cover"/>
            <div className="flex flex-col items-center font-semibold gap-[0.2px] hidden lg:block">
                <h2 className="flex flex-row text-2xl font-semibold text-primary-400">TechVault</h2>
                <div className="flex items-center gap-[3px]">
                <span className="w-2 h-[0.5px] border"></span><span className="text-[8px] text-secondary-400">Trusted Tech  Made Accessible</span><span className="w-2 h-[0.5px] border"></span>
                </div>
            </div>
        </div>
    )
}