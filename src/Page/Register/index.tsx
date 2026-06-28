import { useState } from "react";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";
import RegisterForm from "../../Components/Register/RegisterForm";
import OtpForm from "./OtpForm";

export default function RegisterPage() {
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const email = "privhritamatya@gmail.com";

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl border border-secondary-400/5 shadow-xl p-10 flex flex-col gap-8">
        {showOtpVerification ? (
          <OtpForm email={email} setOtpVerification={setShowOtpVerification} />
        ) : (
          <RegisterForm setShowOtpVerification={setShowOtpVerification} />
        )}
      </div>
    </div>
  );
}