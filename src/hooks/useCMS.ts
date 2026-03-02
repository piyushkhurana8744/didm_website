"use client";

import { useState, useEffect } from "react";

/**
 * Hook to fetch page content from the CMS.
 * Falls back to staticContent if the database is empty or the API fails.
 */
export function useCMS(pagePath: string, staticContent: any) {
  const [content, setContent] = useState(staticContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/content?path=${pagePath}`);
        if (!res.ok) throw new Error("API failed");
        
        const data = await res.json();
        
        if (data && data.sections && data.sections.length > 0) {
          // Merge or replace sections
          const dynamicSections = { ...staticContent };
          data.sections.forEach((sec: any) => {
            dynamicSections[sec.sectionId] = sec;
          });
          setContent(dynamicSections);
        }
      } catch (err) {
        console.warn(`CMS Fetch failed for ${pagePath}, using static fallback.`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pagePath]);

  return { content, loading };
}
