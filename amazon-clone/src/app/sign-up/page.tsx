"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AmazonLogo from "../../../public/amazon-logo-black.jpeg";
import GoogleButton from "../components/Isolated/GoogleSignInButton/GoogleButton";
import Alert from "../components/Shared/Alert";
import AmazonButton from "../components/Shared/AmazonButton";
import FirebaseService from "../services/FirebaseService";

export default function SignUp() {
  //#region Variables

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //#endregion

  //#region Methods

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const result = await FirebaseService.googleSignInUp();
      const user = result;
      if (user) {
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  const handleContinue = async () => {
    
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
    const nameArray = name.trim().split(' ');
  
    // Name Checks
    if (name.trim() === '') {
      setError("Enter your name");
      return;
    } else if (nameArray.length < 2) {
      setError("Please enter both your first and last name");
      return;
    } 
    // Email Checks
    else if (email === "") {
      setError("Enter your email");
    } else if (!emailInput?.validity.valid) {
      setError("Wrong or Invalid email address. Please correct and try again.");
    } 
    // Password Check
    else if (!passwordInput?.validity.valid) {
      setError(passwordInput.title);
    } 
    else {
      try {
        setError("");
        // Sign up the user
        const result = await FirebaseService.signUp(email, password);
        const user = result;
        
        if (user) {
          // Update the user's profile with their name
          await FirebaseService.updateUserProfile({
            displayName: name.trim()
          }).then(() => router.push("/"));
        }
      } catch (error) {
        setError("Failed to create account. Please try again.");
      }
    }
  };

  //#endregion

  //#region Hooks

  //#endregion

  return (
    <div className="bg-white min-h-screen flex flex-col items-center select-none text-black font-ember text-[13px]">
      <Link href={"/"}>
        <Image width={100} alt="Amazon Logo" src={AmazonLogo} />
      </Link>
      <div className="">
        <div className="border rounded-md mt-4 p-10 w-[350px]">
          <h1 className="font-emberThin text-[28px]">Create Account</h1>
          <div className="font-emberThin font-semibold">What's your name?</div>
          <input
            required
            className={`mb-2 border border-black rounded-md amazon-focus w-full text-black text-sm p-1 font-emberThin`}
            onChange={(e) => setName(e?.target?.value)}
            value={name}
            type="text"
            placeholder="First and last name"
          />
          <div className="font-emberThin font-semibold">Email</div>
          {/* Email Input */}
          <input
            required
            className={`mb-2 border border-black rounded-md amazon-focus w-full text-black text-sm p-1 font-emberThin`}
            onChange={(e) => setEmail(e?.target?.value)}
            value={email}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
            placeholder=""
          />
          <div className="font-emberThin font-semibold">Password</div>
          {/* Password Input */}
          <input
            required
            className={`mb-2 border border-black rounded-md amazon-focus w-full text-black text-sm p-1 font-emberThin`}
            onChange={(e) => setPassword(e?.target?.value)}
            value={password}
            type="password"
            minLength={8}
            maxLength={20}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number and one special character"
            placeholder=""
          />
          <Alert type="error" message={error} isActive={error !== ""} />
          <AmazonButton
            full
            type="standard"
            text={"Continue"}
            onClick={handleContinue}
          />
          <div className="my-2 flex justify-center">or</div>
          {/* Google Sign In Button */}
          <div className="flex justify-center">
            <GoogleButton signUp onClick={handleGoogleSignIn} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 w-full my-6 text-[12px]">
          <div className="w-full h-[1px] bg-black"></div>
          <span className="whitespace-nowrap">Already have an account?</span>
          <div className="w-full h-[1px] bg-black"></div>
        </div>
        <AmazonButton
          full
          type="outlined"
          text="Sign in"
          onClick={() => router.push("/sign-in")}
        />
      </div>
    </div>
  );
}
