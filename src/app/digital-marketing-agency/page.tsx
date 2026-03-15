"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  BarChart3,
  Share2,
  FileText,
  Globe,
  CheckCircle2,
  Target,
  Users,
  LineChart,
  MessageSquare,
  Rocket,
  TrendingUp,
  ClipboardList,
  Zap,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const services = [
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description:
      "Search Engine Optimization (SEO) is essential for improving your website's visibility on search engines like Google. Our SEO services focus on increasing organic traffic, improving keyword rankings, and building long-term online authority.",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=800&auto=format&fit=crop",
    items: [
      "Keyword research and strategy",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "Link building strategies",
      "SEO content optimization",
      "Performance monitoring",
    ],
    closing:
      "With our professional SEO services, your website becomes more visible on search engines and attracts highly targeted traffic.",
  },
  {
    icon: Globe,
    title: "Local SEO",
    description:
      "For businesses targeting customers in specific locations, Local SEO services are essential. We help businesses appear in local search results, Google Maps listings, and location-based searches to attract nearby customers.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop",
    items: [
      "Google Business Profile optimization",
      "Local keyword targeting",
      "Location-based content optimization",
    ],
    closing:
      "Local SEO helps you dominate your local market and connect with customers right in your neighborhood.",
  },
  {
    icon: BarChart3,
    title: "Pay-Per-Click Advertising (PPC)",
    description:
      "PPC advertising helps businesses reach their potential customers instantly through paid search campaigns. Our team manages high-performance advertising campaigns that focus on delivering maximum return on investment.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    items: [
      "Google Ads setup and management",
      "Keyword targeting",
      "Ad copy creation",
      "Landing page optimization",
      "Conversion tracking and analysis",
    ],
    closing:
      "Our PPC advertising services help businesses generate immediate leads and increase online visibility.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Social media platforms provide businesses with powerful opportunities to connect with their audience. Our social media marketing services help brands build engagement, increase followers, and improve brand visibility across major platforms.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    items: [
      "Social media strategy planning",
      "Content creation and design",
      "Profile optimization",
      "Audience engagement",
      "Social media advertising",
    ],
    closing:
      "With the right strategy, social media can become a strong channel for brand engagement and lead generation.",
  },
  {
    icon: MessageSquare,
    title: "Email Marketing",
    description:
      "Email marketing remains one of the most effective digital marketing channels for customer engagement and retention. Our email marketing services focus on creating personalized campaigns that deliver valuable information.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    items: [
      "Personalized campaign creation",
      "Customer engagement & retention",
      "Automated email sequences",
      "Performance tracking & analysis",
    ],
    closing:
      "Nurture your leads and build lasting relationships through strategic email communication.",
  },
  {
    icon: Rocket,
    title: "WhatsApp Marketing",
    description:
      "With billions of users worldwide, WhatsApp has become a powerful communication tool. Our WhatsApp marketing services help businesses connect directly with customers through personalized messaging.",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=800&auto=format&fit=crop",
    items: [
      "Personalized messaging",
      "Promotional campaigns",
      "Automated communication strategies",
    ],
    closing:
      "Connect directly with your customers on the platform they use most frequently.",
  },
  {
    icon: FileText,
    title: "Content Writing",
    description:
      "Content is the foundation of successful digital marketing. Our content writing services focus on creating informative and engaging content that supports SEO and improves brand credibility.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
    items: [
      "Blog writing",
      "Website content creation",
      "SEO content writing",
      "Product descriptions",
      "Marketing copywriting",
    ],
    closing:
      "High-quality content not only improves SEO rankings but also strengthens your brand credibility.",
  },
  {
    icon: Zap,
    title: "Apps Marketing",
    description:
      "Mobile apps require strategic marketing to reach the right audience and increase downloads. Our app marketing services focus on promoting mobile applications through store optimization.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    items: [
      "App store optimization (ASO)",
      "Advertising campaigns",
      "Digital marketing strategies for apps",
    ],
    closing:
      "Grow your app's user base with targeted marketing strategies designed for the mobile ecosystem.",
  },
];

const whyChooseReasons = [
  {
    icon: Users,
    title: "Experienced Marketing Professionals",
    description:
      "Our team consists of digital marketing specialists with experience in SEO, paid advertising, content marketing, and social media growth.",
  },
  {
    icon: Target,
    title: "Customized Marketing Strategies",
    description:
      "Every business has unique goals. We create tailored marketing strategies based on your industry, audience behavior, and business objectives.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication and Reporting",
    description:
      "We believe in complete transparency. Our detailed performance reports help clients understand campaign progress and marketing impact.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Marketing Approach",
    description:
      "Our strategies are based on analytics and performance insights, ensuring continuous improvement and better marketing outcomes.",
  },
  {
    icon: TrendingUp,
    title: "Focus on Long-Term Growth",
    description:
      "Rather than short-term gains, we focus on sustainable growth strategies that build strong online visibility and brand authority.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Business Research and Market Analysis",
    description:
      "We begin by understanding your business, competitors, target audience, and industry trends to build a solid marketing strategy.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Strategy Development",
    description:
      "Based on research insights, we create a customized digital marketing strategy that aligns with your business goals.",
    icon: Target,
  },
  {
    number: "03",
    title: "Campaign Implementation",
    description:
      "Our team executes the strategy across multiple digital channels including SEO, PPC, social media, and content marketing.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Performance Monitoring and Optimization",
    description:
      "We continuously track campaign performance, identify opportunities, and optimize strategies for better results.",
    icon: LineChart,
  },
  {
    number: "05",
    title: "Reporting and Growth Planning",
    description:
      "We provide detailed performance reports and develop growth-focused plans to scale your marketing efforts over time.",
    icon: Zap,
  },
];

export default function DigitalMarketingAgencyPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyChooseRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const whyChooseInView = useInView(whyChooseRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative pt-44 pb-24 px-6 overflow-hidden bg-black"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#be1e2e]/20 via-black to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Animated Blobs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#be1e2e]/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#be1e2e]/10 rounded-full blur-[150px] animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 1, y: 0 }} // Visible on load
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
              <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                Online Strikers
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-6">
              Digital Marketing{" "}
              <span className="text-gradient-primary">Agency</span>
            </h1>

            <h2 className="text-lg md:text-xl text-white/50 font-bold max-w-2xl mx-auto mb-6 tracking-tight">
              Grow Your Business with a Professional Digital Marketing Agency
            </h2>

            <p className="text-white/30 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
              In the fast-growing digital economy, businesses need more than just an
              online presence. They need a strong strategy that helps them reach the
              right audience, generate qualified leads, and convert visitors into
              customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-[#be1e2e] text-white px-10 py-6 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#a01824] transition-all shadow-xl shadow-[#be1e2e]/20 group"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/10 text-white/70 px-10 py-6 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-white/5 transition-all backdrop-blur-sm"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Overview Section ─── */}
      <section ref={servicesRef} className="py-24 px-6 bg-[#F8F9FA] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-6 text-[#be1e2e]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                What We Offer
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4 text-black">
              Our Digital Marketing Services
            </h2>
            <p className="text-black/40 text-base max-w-2xl mx-auto font-medium">
              At Online Strikers, we provide a complete range of{" "}
              <strong className="text-black/70">digital marketing services</strong>{" "}
              designed to help businesses grow online and stay ahead of their
              competitors.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  servicesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 lg:gap-24`}
              >
                {/* Image Section */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating badge over image */}
                    <div className="absolute top-8 left-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-left">
                  <div className="w-14 h-14 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center mb-8 group-hover:bg-[#be1e2e] transition-all duration-500">
                    <service.icon className="w-6 h-6 text-[#be1e2e] group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-black">
                    {service.title}
                  </h3>
                  
                  <p className="text-black/60 text-lg leading-relaxed font-medium mb-8">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#be1e2e]/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#be1e2e]" />
                        </div>
                        <span className="text-black/80 font-bold text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-black/40 text-sm font-medium leading-relaxed italic border-l-4 border-[#be1e2e]/20 pl-6 mb-8">
                    &ldquo;{service.closing}&rdquo;
                  </p>

                  <Button
                    asChild
                    className="bg-black text-white px-8 py-6 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#be1e2e] transition-all shadow-lg group"
                  >
                    <Link href={`/services/${service.title.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '')}`} className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us Section ─── */}
      <section ref={whyChooseRef} className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-6 text-[#be1e2e]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Why Us
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4 text-black">
              Why Choose Online Strikers?
            </h2>
            <p className="text-black/40 text-base max-w-2xl mx-auto font-medium">
              Selecting the right{" "}
              <strong className="text-black/70">digital marketing agency</strong>{" "}
              can significantly impact your business growth. Online Strikers focuses
              on delivering strategies that generate real results.
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  whyChooseInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-8 rounded-3xl border border-gray-100 hover:border-[#be1e2e]/20 bg-[#F8F9FA] hover:bg-white transition-all duration-500 hover:shadow-xl card-glow ${
                  index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center mb-5 group-hover:bg-[#be1e2e] transition-all duration-500">
                  <reason.icon className="w-5 h-5 text-[#be1e2e] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-black tracking-tight mb-3">
                  {reason.title}
                </h3>
                <p className="text-black/40 text-sm font-medium leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Process Section ─── */}
      <section
        ref={processRef}
        className="py-24 px-6 bg-[#0B1120] relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] glow-mesh-red pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                How It Works
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-4">
              Our Digital Marketing Process
            </h2>
            <p className="text-white/30 text-base max-w-2xl mx-auto font-medium">
              At Online Strikers, we follow a structured process to ensure
              consistent and measurable marketing success.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  processInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-[#be1e2e]/30 transition-all duration-500 hover:bg-white/10 h-full">
                  {/* Step Number */}
                  <div className="text-[#be1e2e] font-black text-xs uppercase tracking-widest mb-6">
                    Step {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center mb-5 group-hover:bg-[#be1e2e] transition-all duration-500">
                    <step.icon className="w-5 h-5 text-[#be1e2e] group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h3 className="text-lg font-black text-white tracking-tight mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/30 text-sm font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow (hidden on last + mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section ref={ctaRef} className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 text-black">
              Ready to Grow Your Business?
            </h2>
            <p className="text-black/40 text-base max-w-xl mx-auto font-medium mb-10 leading-relaxed">
              Our team works with startups, small businesses, and established
              brands to improve search visibility, increase website traffic, and
              generate measurable business growth through strategic digital
              marketing solutions.
            </p>
            <Button
              asChild
              className="bg-[#be1e2e] text-white px-12 py-7 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#a01824] transition-all shadow-xl shadow-[#be1e2e]/20 group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Let&apos;s Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
