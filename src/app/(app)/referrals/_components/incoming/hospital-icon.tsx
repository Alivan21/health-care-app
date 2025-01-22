import { Hospital } from "lucide-react";
import React from "react";

export default function HospitalIcon() {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-white p-1 drop-shadow-[0px_1px_2px_rgba(127,127,127,0.25)]">
      <div className="rounded-sm bg-[#648EFA]">
        <Hospital className="p-1 text-white" />
      </div>
    </div>
  );
}
