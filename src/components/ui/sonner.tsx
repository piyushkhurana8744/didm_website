"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0a0a0a] group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:font-sans group-[.toaster]:backdrop-blur-xl",
          description: "group-[.toast]:text-white/40 group-[.toast]:text-xs group-[.toast]:font-medium",
          actionButton:
            "group-[.toast]:bg-[#be1e2e] group-[.toast]:text-white group-[.toast]:font-bold",
          cancelButton:
            "group-[.toast]:bg-white/5 group-[.toast]:text-white/40 group-[.toast]:font-bold",
          success: "group-[.toast]:text-green-500",
          error: "group-[.toast]:text-[#be1e2e]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
