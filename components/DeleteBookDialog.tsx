"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { deleteBook } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteBookDialogProps {
  bookId: string;
  bookTitle: string;
}

export function DeleteBookDialog({ bookId, bookTitle }: DeleteBookDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteBook(bookId);

      if (response.status === "success") {
        toast.success(response.message);
        setIsOpen(false);
        router.push("/");
        router.refresh();
      } else {
        toast.error(response.message);
        setIsDeleting(false);
      }
    } catch {
      toast.error("An unexpected error occurred while deleting.");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="font-medium px-8 h-12 text-base shadow-sm transition-colors border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/60 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-destructive/80" />

        <AlertDialogHeader className="pt-2 flex flex-col items-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 mb-4 border border-destructive/20 shadow-sm">
            <AlertTriangle
              className="h-6 w-6 text-destructive"
              strokeWidth={1.5}
            />
          </div>
          <AlertDialogTitle className="font-serif text-2xl text-center text-foreground w-full">
            Burn this manuscript?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center font-sans text-base text-muted-foreground mt-3 leading-relaxed">
            You are about to permanently delete &quot;
            <span className="font-medium text-foreground italic">
              {bookTitle}
            </span>
            &quot; from the archives. This action cannot be undone and the
            literary work will be lost to time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 sm:justify-center flex-col-reverse sm:flex-row gap-3">
          <AlertDialogCancel
            disabled={isDeleting}
            className="mt-0 sm:mt-0 font-medium px-6 h-11"
          >
            Keep in Archives
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium px-6 h-11 transition-all"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Burning...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Yes, Burn It
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
