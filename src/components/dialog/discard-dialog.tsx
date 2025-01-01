import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: (confirmed?: boolean) => void;
}

export default function DiscardDialog({ open, onClose }: Props) {
  return (
    <AlertDialog onOpenChange={() => onClose(false)} open={open}>
      <AlertDialogContent className="max-w-[400px]">
        <div className="mb-4 flex justify-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-orange-50">
            <AlertCircle className="size-6 text-orange-500" />
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl">
            Save Your Progress as a Draft
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Would you like to save your progress as a draft? You can come back and continue anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 flex gap-3">
          <AlertDialogCancel className="m-0 flex-1" onClick={() => onClose(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="m-0 flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => onClose(true)}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
