"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/theme", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch theme");
        
        const data = await res.json();
        setTheme(data);
        
        // Inject CSS Variables
        const root = document.documentElement;
        if (data.primaryColor) {
           root.style.setProperty("--primary", data.primaryColor);
           root.style.setProperty("--accent", data.accentColor || data.primaryColor);
           root.style.setProperty("--ring", data.primaryColor);
        }
        
        if (data.darkMode === false) {
          root.classList.remove("dark");
        } else {
          root.classList.add("dark");
        }

        // Add Custom CSS
        if (data.customCss) {
          const styleId = "custom-theme-css";
          let styleElement = document.getElementById(styleId);
          if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
          }
          styleElement.innerHTML = data.customCss;
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    fetchTheme();
  }, []);

  return <>{children}</>;
}
