import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface FileItemProps {
  name: string;
  size: string;
}

export function FileItem({ name, size }: FileItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          PDF
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{size}</div>
        </div>
      </div>
      <Button size="icon" variant="ghost">
        <Eye className="size-4" />
      </Button>
    </div>
  );
}

export function FileList() {
  return (
    <div className="space-y-3">
      <FileItem name="Document1.pdf" size="500kb" />
      <FileItem name="Document1.pdf" size="500kb" />
      <FileItem name="Document1.pdf" size="500kb" />
    </div>
  );
}
