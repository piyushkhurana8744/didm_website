import { getPageContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceContent from "@/components/ServiceContent";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getPageContent(`/services/${slug}`);
  
  if (!pageData) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: pageData.seo?.title || `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Online Strikers`,
    description: pageData.seo?.description || `Professional ${slug.replace(/-/g, ' ')} services by Online Strikers.`,
  };
}

export default async function DynamicServicePage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getPageContent(`/services/${slug}`);

  if (!pageData || !pageData.sections || pageData.sections.length === 0) {
    return (
      <main className="min-h-screen bg-white font-sans">
        <Header />
        <section className="pt-44 pb-24 px-6 text-center">
          <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
          <p className="text-black/40 mb-8">The service you looking for does not exist.</p>
          <Button asChild className="bg-[#be1e2e]">
            <Link href="/services">Back to Services</Link>
          </Button>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <ServiceContent pageData={pageData} />
      <Footer />
    </main>
  );
}
