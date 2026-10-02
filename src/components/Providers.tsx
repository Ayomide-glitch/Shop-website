"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#2C4A3E",
            color: "#FBF8F3",
            border: "1px solid #EADBCE",
          },
        }}
      />
    </SessionProvider>
  );
}
