"use client";

import Image from "next/image";
import AmazonLogo from "../../../public/amazon-logo-black.jpeg";
import Link from "next/link";
import { useState } from "react";
import Alert from "../components/Shared/Alert";
import AmazonButton from "../components/Shared/AmazonButton";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleButton from "../components/GoogleSignInButton/GoogleButton";

export default function SignIn() {
  
  //#region Variables

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  //#endregion

  //#region Methods

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        // Successful sign-in
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      setError(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
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
      // Handle email/password sign in logic here
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
          <h1 className="font-emberThin text-[28px]">Sign in</h1>
          <div className="font-emberThin">Email or mobile phone number</div>
          <input
            required
            className={`my-2 border border-black rounded-md amazon-focus w-full text-black text-sm p-1 font-normal`}
            onChange={(e) => setEmail(e?.target?.value)}
            value={email}
            type="email"
            placeholder=""
            disabled={loading}
          />
          <Alert type="error" message={error} isActive={error !== ""} />
          <AmazonButton
            type="standard"
            text={"Continue with Amazon"}
            onClick={handleContinue}
          />
          <div className="my-2 flex justify-center">or</div>
          {/* Google Sign In Button */}
          <div className="flex justify-center">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>

          <div className="my-2">
            By continuing with this and most apps, you're agree to some
            <a
              href="https://www.linkedin.com/in/santiagoddiaz/"
              className="text-[var(--amazonLink)] hover:text-[var(--amazonButtonHover)] hover:underline cursor-pointer"
            >
              {" "}
              Conditions{" "}
            </a>
            that you'll never actually read.
          </div>

          <a
            href="https://www.linkedin.com/in/santiagoddiaz/"
            className="text-[var(--amazonLink)] hover:text-[var(--amazonButtonHover)] hover:underline cursor-pointer flex justify-center"
          >
            {" "}
            Forgot password?{" "}
          </a>
        </div>
        <div className="flex items-center justify-center gap-2 w-full my-6 text-[12px]">
          <div className="w-full h-[1px] bg-black"></div>
          <span className="whitespace-nowrap">New to Amazon Clone?</span>
          <div className="w-full h-[1px] bg-black"></div>
        </div>
        <AmazonButton
          type="outlined"
          text="Create Account"
          onClick={handleContinue}
        />
      </div>
    </div>
  );
}
