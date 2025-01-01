"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="max-w-sm rounded-lg p-6">
        <DialogHeader className="space-y-4">
          <div className="mx-auto rounded-full">
            <CheckCircle2 className="size-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-xl font-medium text-green-500">
            Successfully Submitted!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Imperdiet quisque malesuada amet volutpat
            dignissim a. Tempor ipsum vitae est commodo auctor risus faucibus.
          </DialogDescription>
        </DialogHeader>
        <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700" onClick={onClose}>
          Okay
        </Button>
      </DialogContent>
    </Dialog>
  );
}
