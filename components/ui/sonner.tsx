"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      position="bottom-right"
      icons={{
        success: (
          <CheckCircle2
            className="h-5 w-5 text-green-600 dark:text-green-400"
            strokeWidth={1.5}
          />
        ),
        info: <Info className="h-5 w-5 text-primary" strokeWidth={1.5} />,
        warning: (
          <AlertTriangle
            className="h-5 w-5 text-amber-600 dark:text-amber-400"
            strokeWidth={1.5}
          />
        ),
        error: (
          <XCircle className="h-5 w-5 text-destructive" strokeWidth={1.5} />
        ),
        loading: (
          <Loader2
            className="h-5 w-5 animate-spin text-muted-foreground"
            strokeWidth={1.5}
          />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#fdf6e3]/95 dark:group-[.toaster]:bg-[#3a2d26]/95 group-[.toaster]:text-foreground group-[.toaster]:border-border/60 group-[.toaster]:shadow-lg group-[.toaster]:shadow-black/5 dark:group-[.toaster]:shadow-black/20 rounded-xl overflow-hidden font-sans backdrop-blur-md",
          title: "font-serif text-base font-semibold",
          description: "text-muted-foreground text-sm font-sans mt-1",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium rounded-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium rounded-md",
          icon: "mr-3",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
