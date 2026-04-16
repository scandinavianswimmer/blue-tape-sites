import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      closeButton
      expand={false}
      visibleToasts={3}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-none group-[.toaster]:border group-[.toaster]:border-black/10 group-[.toaster]:bg-[#fbfaf7] group-[.toaster]:px-4 group-[.toaster]:py-4 group-[.toaster]:text-[#111111] group-[.toaster]:shadow-[0_18px_40px_rgba(17,17,17,0.08)]",
          title: "text-sm font-semibold uppercase tracking-[0.08em] text-[#111111]",
          description: "text-sm leading-6 text-slate-600",
          actionButton:
            "group-[.toaster]:rounded-none group-[.toaster]:border group-[.toaster]:border-[#111111] group-[.toaster]:bg-[#111111] group-[.toaster]:px-3 group-[.toaster]:text-xs group-[.toaster]:font-semibold group-[.toaster]:uppercase group-[.toaster]:tracking-[0.08em] group-[.toaster]:text-white",
          cancelButton:
            "group-[.toaster]:rounded-none group-[.toaster]:border group-[.toaster]:border-black/10 group-[.toaster]:bg-white group-[.toaster]:px-3 group-[.toaster]:text-xs group-[.toaster]:font-semibold group-[.toaster]:uppercase group-[.toaster]:tracking-[0.08em] group-[.toaster]:text-[#111111]",
          closeButton:
            "group-[.toast]:border-black/10 group-[.toast]:bg-white group-[.toast]:text-slate-500 group-[.toast]:hover:bg-slate-100",
          success:
            "group-[.toaster]:border-l-2 group-[.toaster]:border-l-blue-600",
          error:
            "group-[.toaster]:border-l-2 group-[.toaster]:border-l-red-600",
          info:
            "group-[.toaster]:border-l-2 group-[.toaster]:border-l-slate-500",
          warning:
            "group-[.toaster]:border-l-2 group-[.toaster]:border-l-amber-500",
        },
      }}
      style={
        {
          "--normal-bg": "#fbfaf7",
          "--normal-text": "#111111",
          "--normal-border": "rgba(17,17,17,0.1)",
          "--success-bg": "#fbfaf7",
          "--success-text": "#111111",
          "--success-border": "#2563eb",
          "--error-bg": "#fff7f7",
          "--error-text": "#111111",
          "--error-border": "#dc2626",
          "--warning-bg": "#fffaf0",
          "--warning-text": "#111111",
          "--warning-border": "#d97706",
          "--info-bg": "#fbfaf7",
          "--info-text": "#111111",
          "--info-border": "rgba(17,17,17,0.24)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
