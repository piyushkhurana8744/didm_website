import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ServicePageContent from "@/components/ServicePageContent";
import fs from "fs/promises";
import path from "path";

// Performance: Cache results for 1 hour at the edge
export const revalidate = 3600;

async function getPageData(slug: string) {
  try {
    await connectDB();
    const pagePath = `/services/${slug}`;
    
    // Fetch Page, Navbar, and Footer in parallel for maximum speed
    const [pageContent, navbarContent, footerContent] = await Promise.all([
      PageContent.findOne({ pagePath }).lean(),
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
      
      if (!finalPageData) finalPageData = initialContent[pagePath] || null;
      if (!finalNavbarData) finalNavbarData = initialContent["__navbar"] || null;
      if (!finalFooterData) finalFooterData = initialContent["__footer"] || null;
    }

    return {
      pageData: finalPageData,
      navbarData: finalNavbarData,
      footerData: finalFooterData
    };
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
    return { pageData: null, navbarData: null, footerData: null };
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { pageData } = await getPageData(params.slug);
  
  if (!pageData || !pageData.seo) {
    return {
      title: "Service Not Found | Online Strikers",
      description: "The digital marketing service you are looking for is not available."
    };
  }

  return {
    title: pageData.seo.title || "Digital Marketing Services",
    description: pageData.seo.description || "Expert digital marketing and development services.",
    keywords: pageData.seo.keywords || []
  };
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), "src/data/initial-content.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const initialContent = JSON.parse(fileData);
    
    return Object.keys(initialContent)
      .filter(route => route.startsWith("/services/"))
      .map(route => ({
        slug: route.replace("/services/", ""),
      }));
  } catch (error) {
    return [];
  }
}

export default async function DynamicServicePage({ params }: { params: { slug: string } }) {
  const { pageData, navbarData, footerData } = await getPageData(params.slug);

  if (!pageData || !pageData.sections || pageData.sections.length === 0) {
    return (
      <main className="min-h-screen bg-white font-sans">
        <Header initialNavItems={navbarData?.sections?.[0]?.items} />
        <section className="pt-44 pb-24 px-6 text-center">
          <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
          <p className="text-black/40 mb-8">The service you looking for does not exist.</p>
          <Button asChild className="bg-[#be1e2e]">
            <Link href="/services">Back to Services</Link>
          </Button>
        </section>
        <Footer initialData={footerData} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header initialNavItems={navbarData?.sections?.[0]?.items} />
      <ServicePageContent pageData={pageData} />
      <Footer initialData={footerData} />
    </main>
  );
}
