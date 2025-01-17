"use client";

import * as React from "react";

import { FileUploader } from "@/components/file-uploader";
import { Eye, FileText, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AttachmentDocument({ isDraft }: { isDraft: boolean }) {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Attachment Document {files.length > 0 && `(${files.length})`}
        </h2>
      </div>
      {isDraft ? (
        <div className="flex flex-col">
          <div className="mb-2 flex w-full items-center justify-between rounded-md border border-[#B7CBFD] px-3 py-2">
            <div className="flex items-center space-x-2">
              <FileText className="text-[#4579F9]" />
              <div className="flex flex-col items-start text-start">
                <p className="text-xs font-semibold">Document1.pdf</p>
                <p className="text-[10px] font-normal">500 Kb</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                className="rounded-md border border-border !bg-white drop-shadow-sm"
                size="icon"
              >
                <Eye className="text-[#4579F9]" size={16} />
              </Button>
              <Button
                className="rounded-md border border-border !bg-white drop-shadow-sm"
                size="icon"
              >
                <Trash className="text-[#E02523]" size={16} />
              </Button>
            </div>
          </div>
          <div className="mb-2 flex w-full items-center justify-between rounded-md border border-[#B7CBFD] px-3 py-2">
            <div className="flex items-center space-x-2">
              <FileText className="text-[#4579F9]" />
              <div className="flex flex-col items-start text-start">
                <p className="text-xs font-semibold">Document2.pdf</p>
                <p className="text-[10px] font-normal">500 Kb</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                className="rounded-md border border-border !bg-white drop-shadow-sm"
                size="icon"
              >
                <Eye className="text-[#4579F9]" size={16} />
              </Button>
              <Button
                className="rounded-md border border-border !bg-white drop-shadow-sm"
                size="icon"
              >
                <Trash className="text-[#E02523]" size={16} />
              </Button>
            </div>
          </div>
          <div className="mb-2 flex w-full items-center justify-between rounded-md border border-[#B7CBFD] px-3 py-2">
            <div className="flex items-center space-x-2">
              <FileText className="text-[#4579F9]" />
              <div className="flex flex-col items-start text-start">
                <p className="text-xs font-semibold">Document3.pdf</p>
                <p className="text-[10px] font-normal">500 Kb</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                className="rounded-md border border-border !bg-white drop-shadow-sm"
                size="icon"
              >
                <Eye className="text-[#4579F9]" size={16} />
              </Button>
              <Button
                className="rounded-md border border-border !bg-white drop-shadow-sm"
                size="icon"
              >
                <Trash className="text-[#E02523]" size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
