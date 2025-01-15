import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

interface DocumentDialogProps {
  url: string;
  onClose: () => void;
}

export default function DocumentDialog({ url, onClose }: DocumentDialogProps) {
  return (
    <Dialog onOpenChange={onClose} open>
      <DialogContent className="rounded-lg !bg-black !p-0">
        <DialogHeader className="!flex !flex-row items-center justify-between !px-2 !py-0">
          <p className="text-sm font-medium text-white">document.pdf</p>
          <DialogClose asChild>
            <Button
              className="rounded-full bg-[#A2A2A3] transition-colors hover:bg-[#8A8A8B]"
              size="icon"
            >
              <CirclePlus className="size-4 rotate-45 text-black" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="h-[500px] w-full">
          <iframe className="size-full border-0" src={url} title="Document Viewer" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
