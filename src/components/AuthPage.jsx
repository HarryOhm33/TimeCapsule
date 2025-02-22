import React, { useState } from "react";
import Signup from "../pages/Signup"; // ✅ Path to Signup
import OTPVerification from "../pages/Verify_Signup"; // ✅ Path to Verify_Signup
import Success from "../pages/Success"; // ✅ Path to Success

const AuthPage = () => {
  const [step, setStep] = useState(1); // 1: Signup | 2: OTP | 3: Success
  const [email, setEmail] = useState(""); // Store email for OTP verification

  return (
    <div>
      {step === 1 && <Signup setEmail={setEmail} setStep={setStep} />}
      {step === 2 && <OTPVerification email={email} setStep={setStep} />}
      {step === 3 && <Success />}
    </div>
  );
};

export default AuthPage;
