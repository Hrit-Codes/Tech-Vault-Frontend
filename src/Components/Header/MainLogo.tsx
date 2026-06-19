import companyLogo from "@/Assets/Logo.webp"
export default function MainLogo(){
    return(
        <div className="flex items-center space-x-2">
            <img src={companyLogo} alt="Company Logo" className="w-14 h-14 rounded-full object-cover"/>
            <span className="flex flex-row text-2xl font-semibold text-primary-400">TechVault</span>
        </div>
    )
}