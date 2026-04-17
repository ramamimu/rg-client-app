"use client";

import { signIn, signUp, signInWithGoogle } from "@/app/auth/action";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (formData: FormData) => {
    console.log("Signing in with:", Object.fromEntries(formData.entries()));
    const result = await signIn(formData);
    if (result?.error) setError(result.error);
  };

  const searchParams = useSearchParams();
  const isSignUp = searchParams.get("state") === "signup";

  const handleSignUp = async (formData: FormData) => {
    const result = await signUp(formData);
    if (result?.error) setError(result.error);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ── LEFT PANEL ── */}
      <div
        className="relative hidden md:flex flex-col w-[48%] shrink-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-rose-700/55 to-zinc-900/70" />

        <div className="relative z-10 flex flex-col h-full px-11 py-9">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center">
              <HeartIcon />
            </div>
            <span className="text-white text-xs font-medium tracking-[0.18em]">
              RENGGANIS
            </span>
          </div>

          {/* Bottom content */}
          <div className="mt-auto">
            <p className="text-rose-300 text-[11px] font-medium tracking-[0.2em] mb-4">
              WEDDING INVITATION BUILDER
            </p>
            <h1
              className="text-[40px] font-semibold text-white leading-[1.15] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Craft beautiful
              <br />
              memories, together.
            </h1>
            <p className="text-white/70 text-sm leading-relaxed font-light mb-9">
              Manage your clients&apos; wedding invitations —<br />
              from love stories to events — all in one elegant
              <br />
              platform.
            </p>

            <div className="flex gap-10">
              {[
                ["500+", "Couples"],
                ["12", "Themes"],
                ["98%", "Satisfaction"],
              ].map(([num, label]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className="text-[22px] font-semibold text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {num}
                  </span>
                  <span className="text-white/60 text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 items-center justify-center bg-[#fdfcfb] overflow-y-auto">
        <div className="w-full max-w-100 px-6 py-8 flex flex-col">
          {/* Heading */}
          <div className="mb-6">
            <h2
              className="text-[30px] font-semibold text-zinc-900 mb-1.5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              hi 👋
            </h2>
            <p className="text-sm text-zinc-400">
              {isSignUp ? "Sign up" : "Sign in"} to manage your wedding
              templates.
            </p>
          </div>

          {/* Email */}
          <form action={handleSignIn} className="mb-6">
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-zinc-800 mb-1.5">
                Email address
              </label>
              <div className="relative flex items-center">
                <MailIcon className="absolute left-3.5 text-zinc-300 pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 bg-white placeholder-zinc-300 outline-none focus:border-rose-400 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-medium text-zinc-800">
                  Password
                </label>
                <a href="#" className="text-xs text-rose-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <LockIcon className="absolute left-3.5 text-zinc-300 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  className="w-full pl-10 pr-10 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 bg-white placeholder-zinc-300 outline-none focus:border-rose-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-zinc-300 hover:text-zinc-500 transition-colors"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            {/* <label className="flex items-center gap-2.5 text-[13px] text-zinc-500 cursor-pointer mb-5 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-rose-500 w-4 h-4 cursor-pointer"
                />
                Remember me for 30 days
              </label> */}

            {/* Sign in */}
            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-[0.99] text-white text-[15px] font-medium rounded-xl transition-all duration-150 cursor-pointer"
            >
              Sign In →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 text-zinc-300 text-xs">
            <div className="flex-1 h-px bg-zinc-100" />
            or
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full py-3 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl text-sm font-medium text-zinc-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Footer links */}
          <p className="text-center text-[13px] text-zinc-400 mt-6 mb-1.5">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Link
              href={isSignUp ? "/login?state=signin" : "/login?state=signup"}
              className="text-rose-500 font-medium hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
          <p className="text-center text-[11px] text-zinc-300">
            © 2026 Rengganis · Wedding Invitation Platform
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Icons ── */
function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="#e05070"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
