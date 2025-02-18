"use client";

import CustomCarousel from "@/components/custom-carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const OPTIONS: EmblaOptionsType = {
    loop: false,
  };

  return (
    <ScrollArea className="h-screen w-screen">
      <div className="grid size-full max-w-full grid-cols-[1fr,1.5fr] gap-6 overflow-hidden p-4">
        <div className="relative z-10 flex flex-col justify-center bg-white">{children}</div>
        <div className="flex w-full min-w-[600px] flex-col justify-center overflow-hidden rounded-2xl bg-[#FAFAFA] p-8">
          <span className="flex items-center space-x-1">
            <Image alt="radio-logo" height={12} src="/img/radio.svg" width={12} />
            <p className="text-sm font-medium text-[#1569EF]">Who we are?</p>
          </span>
          <h1 className="mb-4 mt-3 text-2xl font-semibold">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className="text-base font-normal text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Vitae amet fusce sit sit arcu ut vel.
          </p>
          <div className="relative mt-10 overflow-hidden">
            <CustomCarousel options={OPTIONS} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
