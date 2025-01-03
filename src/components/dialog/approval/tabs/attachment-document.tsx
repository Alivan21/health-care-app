"use client";

import * as React from "react";

import { FileUploader } from "@/components/file-uploader";

export function AttachmentDocument() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Attachment Document {files.length > 0 && `(${files.length})`}
        </h2>
      </div>
      <FileUploader
        accept={{
          "application/pdf": [".pdf"],
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        }}
        maxFileCount={8}
        maxSize={8 * 1024 * 1024}
        onValueChange={setFiles}
      />
    </div>
  );
}
