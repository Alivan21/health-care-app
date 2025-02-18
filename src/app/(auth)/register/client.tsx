"use client";

import { HeartPulse } from "lucide-react";
import React from "react";
import UserRegistrationForm from "../_components/register-form/form";
import Link from "next/link";

export default function RegisterClient() {
  return (
    <div className="flex w-full flex-col items-center">
      <span className="mb-6 rounded-lg bg-[#1569EF] p-2">
        <HeartPulse className="size-8 text-white" />
      </span>
      <h1 className="mb-3 text-2xl font-medium">Create Your App Account</h1>
      <p className="mb-10 text-sm font-normal">Register and use our services now</p>
      <div className="px-28">
        <UserRegistrationForm />
      </div>

      <footer className="mt-32 flex w-full items-center justify-between text-[10px] text-gray-500">
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
