import IncomingDocumentPage from "@/components/dialog/incoming/document-page";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function IncomingPage() {
  return (
    <>
      <Toaster />
      <IncomingDocumentPage />
    </>
  );
}
