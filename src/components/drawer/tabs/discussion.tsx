import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link2, Underline } from "lucide-react";

export function DiscussionThread() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-8">
            <div className="size-full rounded-full bg-primary" />
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Galang Andika</span>
              <span className="text-sm text-muted-foreground">1 hour ago</span>
            </div>
            <p className="mt-1">
              I have understood the brief given, but I have some questions that I want to ask again
              because I want to equalize my perception with you.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Button className="h-8" size="sm" variant="ghost">
                👍 2
              </Button>
              <Button className="h-8" size="sm" variant="ghost">
                💰 1
              </Button>
              <Button className="h-8" size="sm" variant="ghost">
                🎯 1
              </Button>
              <Button className="h-8" size="sm" variant="ghost">
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border bg-card">
          <div className="p-3">
            <textarea
              className="w-full resize-none bg-transparent outline-none"
              placeholder="Write a message..."
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between gap-2 border-t p-2">
            <div className="flex items-center gap-1">
              <Button className="size-8" size="icon" variant="ghost">
                <Bold className="size-4" />
              </Button>
              <Button className="size-8" size="icon" variant="ghost">
                <Italic className="size-4" />
              </Button>
              <Button className="size-8" size="icon" variant="ghost">
                <Underline className="size-4" />
              </Button>
              <Button className="size-8" size="icon" variant="ghost">
                <Link2 className="size-4" />
              </Button>
            </div>
            <Button size="sm">Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
