"use client";

import Image from "next/image";
import AmazonLogo from "../../../public/amazon-logo-black.jpeg";
import Link from "next/link";
import { useState } from "react";
import Alert from "../components/Shared/Alert";
import AmazonButton from "../components/Shared/AmazonButton";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleButton from "../components/Isolated/GoogleSignInButton/GoogleButton";
import AmazonLink from "../components/Shared/AmazonLink";

export default function SignUp() {
  //#region Variables

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  //#endregion

  //#region Methods

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  const handleContinue = async () => {
    const input = document.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;

    if (email === "") {
      setError("Enter your email");
    } else if (!input?.validity.valid) {
      setError("Wrong or Invalid email address. Please correct and try again.");
    } else {
      setError("");
      // TODO: Handle email/password sign in logic here
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
          <input
            required
            className={`mb-2 border border-black rounded-md amazon-focus w-full text-black text-sm p-1 font-emberThin`}
            onChange={(e) => setEmail(e?.target?.value)}
            value={email}
            type="email"
            placeholder=""
          />
          <div className="font-emberThin font-semibold">Password</div>
          <input
            required
            className={`mb-2 border border-black rounded-md amazon-focus w-full text-black text-sm p-1 font-emberThin`}
            onChange={(e) => setPassword(e?.target?.value)}
            value={password}
            type="password"
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
