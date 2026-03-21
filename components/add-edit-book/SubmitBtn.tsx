import { BookPlus, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEdit?: boolean;
}

export function SubmitButton({ isEdit = false }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className={`w-full sm:w-auto font-medium px-10 h-14 text-base shadow-md transition-all ${
        pending
          ? "opacity-80 cursor-not-allowed"
          : "hover:-translate-y-0.5 active:translate-y-0"
      }`}
      aria-disabled={pending}
    >
      {pending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : isEdit ? (
        <Save className="mr-2 h-5 w-5" />
      ) : (
        <BookPlus className="mr-2 h-5 w-5" />
      )}
      {pending
        ? isEdit
          ? "Saving Changes..."
          : "Cataloguing..."
        : isEdit
          ? "Save Changes"
          : "Catalogue Book"}
    </Button>
  );
}
