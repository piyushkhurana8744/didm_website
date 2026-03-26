import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPageContent from "@/components/ContactPageContent";
import fs from "fs/promises";
import path from "path";

// Performance: Cache results for 1 hour at the edge
export const revalidate = 3600;

async function getContactData() {
  try {
    await connectDB();
    
    // Fetch Page, Navbar, and Footer in parallel for maximum speed
    const [pageContent, navbarContent, footerContent] = await Promise.all([
      PageContent.findOne({ pagePath: "/contact" }).lean(),
      PageContent.findOne({ pagePath: "__navbar" }).lean(),
      PageContent.findOne({ pagePath: "__footer" }).lean()
    ]);
    
    // Fallback logic for all three
    let finalPageData = pageContent ? JSON.parse(JSON.stringify(pageContent)) : null;
    let finalNavbarData = navbarContent ? JSON.parse(JSON.stringify(navbarContent)) : null;
    let finalFooterData = footerContent ? JSON.parse(JSON.stringify(footerContent)) : null;

    if (!finalPageData || !finalNavbarData || !finalFooterData) {
      const filePath = path.join(process.cwd(), "src/data/initial-content.json");
      const fileData = await fs.readFile(filePath, "utf-8");
      const initialContent = JSON.parse(fileData);
      
      if (!finalPageData) finalPageData = initialContent["/contact"] || null;
      if (!finalNavbarData) finalNavbarData = initialContent["__navbar"] || null;
      if (!finalFooterData) finalFooterData = initialContent["__footer"] || null;
    }

    return {
      pageData: finalPageData,
      navbarData: finalNavbarData,
      footerData: finalFooterData
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return { pageData: null, navbarData: null, footerData: null };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { pageData } = await getContactData();
  
  if (!pageData || !pageData.seo) {
    return {
      title: "Contact Us | Online Strikers",
      description: "Get in touch with Online Strikers for expert digital marketing and development services."
    };
  }

  return {
    title: pageData.seo.title || "Contact Us | Online Strikers",
    description: pageData.seo.description || "Expert digital marketing and development services.",
    keywords: pageData.seo.keywords || []
  };
}

export default async function ContactUsPage() {
  const { pageData, navbarData, footerData } = await getContactData();

  return (
    <main className="min-h-screen bg-white">
      <Header initialNavItems={navbarData?.sections?.[0]?.items} />
      <ContactPageContent pageData={pageData} />
      <Footer initialData={footerData} />
    </main>
  );
}
