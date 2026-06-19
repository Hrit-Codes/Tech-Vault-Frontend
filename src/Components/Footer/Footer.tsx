import companyLogo from "@/Assets/Logo.webp"
import { Mail, MapPin, Phone } from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {

    const navigate=useNavigate();

    const socials=[
        {
            label:"Facebook",
            icon:FaFacebookF
        },
        {
            label:"Instagram",
            icon:FaInstagram
        },
        {
            label:"LinkedIn",
            icon:FaLinkedinIn
        }
    ]
  return (
    <footer className="w-full bg-section-alternative border-t-2 border-slate-900 dark:border-white pt-8 py-4">

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-5">

          {/* Three-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 ">

            {/* Col 1 – Logo + description */}
            <div className="space-y-5">
              <div className="flex items-center gap-8">
                <img src={companyLogo} alt="Company Logo" className="w-30 h-20" />
                <div>
                  <p className="font-bold text-lg ">
                    Tech Vault
                  </p>
                  <p className=" text-xs tracking-wide uppercase">
                    &amp; Pvt. Ltd.
                  </p>
                </div>
              </div>

              <div className="w-16 h-0.5 bg-primary-400" />

              <p className="text-sm leading-relaxed w-full text-[clamp(13px,1.4vw,15px)] font-light ">
                Our aim is to provide clients with every kind of viable programs
                Nepal can possibly offer. Our team of expert travel planners is
                always there to answer your specific questions with absolutely
                authentic information and help you design trips that perfectly
                suit your interests and budget.
              </p>

              <div className="flex flex-row gap-3">
                {socials.map(({label,icon:Icon})=>(
                    <Icon key={label} className=" hover:text-secondary-400 text-xl cursor-pointer transition-colors duration-200"/>
                ))}

              </div>
            </div>

            {/* Col 2 – Quick Links */}
            <div >
              <h3 className=" font-bold text-xl mb-3" >
                Quick Link
              </h3>
              <div className="w-12 h-0.5 bg-primary-400 mb-5" />
              <ul className="space-y-2.5">
                {[
                  { label: "Company Profile",      href: "/company-profile" },
                  { label: "Contact Us",           href: "/contact" },
                  { label: "Terms and Conditions", href: "/terms" },
                  { label: "Our Services",         href: "/services" },
                  { label: "Car Rental",           href: "/car-rental" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <nav onClick={()=>navigate(href)}
                      className=" text-sm transition-colors duration-200 flex items-center gap-2 hover:cursor-pointer"
                    >
                      <div className="w-2 h-0.5 bg-primary-400 text-sm md:text-base leading-relaxed font-light " />{label}
                    </nav>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 – Contact Details */}
            <div>
              <h3 className=" font-bold text-xl mb-3" >
                Contact Details
              </h3>
              <div className="w-12 h-0.5 bg-primary-400 mb-5" />
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="mt-0.5  flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary-400"/>
                  </span>
                  <span className=" text-sm w-full leading-relaxed font-light ">
                    New Plaze Putalisadak, Kathmandu, Nepal<br />
                    Post Box No:- 13965
                  </span>
                </li>

                {["+977 9742935093", "+977 986-1418083"].map((num) => (
                  <li key={num} className="flex items-center gap-3">
                    <span className=" flex-shrink-0">
                      <Phone className="w-4 h-4 text-primary-400"/>
                    </span>
                    <span className=" text-sm md:text-base leading-relaxed w-full font-light">{num}</span>
                  </li>
                ))}

                {["info@kalapatthar.com", "sales@kalapatthar.com", "hrit.kalapatthar@gmail.com"].map((email) => (
                  <li key={email} className="flex items-center gap-3">
                    <span className=" flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary-400"/>
                    </span>
                    <a href={`mailto:${email}`} className=" text-sm md:text-base transition-colors duration-200 break-all leading-relaxed w-full font-light">
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t-2 border-primary-400/40 pt-6 text-center">
            <p className=" text-xs tracking-wide">
              @2026 <a href="https://magnas.com.np/" className="hover:text-secondary-400">Magnas Infotech Solutions</a> . All rights reserved.
            </p>
          </div>
        </div>
    </footer>
  );
}