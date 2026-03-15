"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/theme", { 
          cache: "no-store",
          signal: controller.signal 
        });
        
        let data;
        if (!res.ok) {
          console.warn("ThemeProvider: Failed to fetch theme, using defaults");
          data = {
            primaryColor: "#be1e2e",
            darkMode: false,
          };
        } else {
          data = await res.json();
        }

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
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error("Error loading theme:", error);
          // Set basic defaults on complete failure
          document.documentElement.classList.add("dark");
        }
      }
    };
    fetchTheme();
    return () => controller.abort();
  }, []);

  return <>{children}</>;
}
