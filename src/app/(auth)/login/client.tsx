"use client";

import { HeartPulse } from "lucide-react";
import UserLoginForm from "../_components/login-form/form";
import Link from "next/link";

export default function LoginClient() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly">
      <div className="flex flex-col items-center pt-20">
        <span className="mb-6 rounded-lg bg-[#1569EF] p-2">
          <HeartPulse className="size-8 text-white" />
        </span>
        <h1 className="mb-3 text-2xl font-medium">Welcome to Lorem!</h1>
        <p className="mb-10 text-sm font-normal">
          Enter your email and password to log in to the app
        </p>
        <div className="px-28">
          <UserLoginForm />
        </div>
      </div>

      <footer className="flex w-full items-center justify-between p-4 pt-32 text-[10px] text-gray-500">
        <p>© 2024 Lorem Inc. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link className="hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link className="hover:underline" href="/terms">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}
