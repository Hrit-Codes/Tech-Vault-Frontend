import { useState } from "react";
import ResetPasswordForm from "../../Components/ForgotPassword/ResetPasswordForm";
import ForgotPasswordForm from "../../Components/ForgotPassword/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const handleEmailSent = (email: string) => {
    setUserEmail(email);
    setIsResetPasswordOpen(true);
  };

  const handleGoBack = () => {
    setIsResetPasswordOpen(false);
    setUserEmail(null);
  };

  if (isResetPasswordOpen && userEmail) {
    return <ResetPasswordForm userEmail={userEmail} onGoBack={handleGoBack} />;
  }

  return <ForgotPasswordForm onEmailSent={handleEmailSent} />;
}