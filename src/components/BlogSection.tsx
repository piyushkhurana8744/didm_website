"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Play, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const posts = [
  {
    title: "Transform Your Online Presence With Expert SEO Strategies.",
    date: "12/12/2024",
    author: "John Doe",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    excerpt:
      "Strategic search engine optimization (SEO) that positions your brand for growth.",
    isFeatured: true,
  },
  {
    title: "Maximize Your Business Success With Tailored SEO Solutions.",
    date: "12/12/2024",
    author: "John Doe",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2069&auto=format&fit=crop",
    excerpt: "Achieve top rankings with innovative SEO techniques from our experts.",
    isFeatured: false,
  },
  {
    title: "The Future of Digital Marketing in 2025 and Beyond.",
    date: "15/12/2024",
    author: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Stay ahead of the curve with our latest projections for marketing trends.",
    isFeatured: false,
  },
];

// Slow, smooth scroll-triggered animations
const scrollRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1]
    },
  },
};

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-24 bg-[#F8F9FA] text-black overflow-hidden border-t border-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 text-center lg:text-left">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
                Our Blog
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-0 max-w-2xl">
              Insights <br /> <span className="text-primary italic">from DIDM Experts</span>
            </h2>
          </motion.div>

          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Button className="bg-[#be1e2e] text-white px-8 py-6 rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#a01824] transition-all duration-300 transform hover:scale-105 shadow-xl">
              All Categories
            </Button>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Featured Post */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8 group">
            <div className="rounded-[50px] overflow-hidden aspect-[16/10] relative shadow-2xl">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlapping 3D elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-8 left-8 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center animate-float shadow-xl shadow-primary/30"
              >
                <Play className="w-8 h-8 text-white fill-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="absolute bottom-8 right-8 w-24 h-24 bg-white rounded-3xl flex items-center justify-center animate-float delay-700 shadow-2xl"
              >
                <Target className="w-10 h-10 text-primary" />
              </motion.div>

              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500" />
            </div>
            <div className="px-4">
              <div className="flex items-center gap-6 mb-5 text-[11px] font-black uppercase tracking-[0.25em] text-black/40">
                <span>{posts[0].date}</span>
                <span className="w-1 h-1 rounded-full bg-[#b1ff01]" />
                <span>{posts[0].author}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black mb-6 hover:text-primary transition-colors cursor-pointer leading-[1.1] tracking-tight">
                {posts[0].title}
              </h3>
              <p className="text-lg text-black/50 font-medium mb-8 leading-relaxed line-clamp-2">
                {posts[0].excerpt}
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-4 font-black group/link text-sm uppercase tracking-widest"
              >
                Read more
                <motion.div
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all group-hover/link:bg-primary group-hover/link:text-white group-hover/link:border-primary"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* List of other posts */}
          <div className="flex flex-col gap-10">
            {posts.slice(1).map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group"
              >
                <Card className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500">
                  <CardContent className="w-full md:w-48 h-48 rounded-[32px] overflow-hidden relative flex-shrink-0 p-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {index === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardContent className="flex-1 p-0">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                      <span>{post.date}</span>
                      <span className="w-4 h-[1px] bg-primary" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 hover:text-primary transition-colors cursor-pointer leading-tight tracking-tight">
                      {post.title}
                    </h3>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:text-primary transition-colors"
                    >
                      Read More <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Newsletter CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-4 p-10 bg-gradient-stats-red rounded-[50px] relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h4 className="text-white text-2xl font-black mb-4 tracking-tight">
                  Join Our Newsletter
                </h4>
                <p className="text-white/60 mb-6 font-medium">
                  Get Latest Insights directly to your inbox!
                </p>
                <Button className="bg-[#be1e2e] text-white px-6 py-5 rounded-full text-xs font-black uppercase hover:bg-[#a01824] transition-all duration-300">
                  Subscribe Now
                </Button>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -bottom-4 w-40 h-40 opacity-40 group-hover:opacity-100 transition-opacity"
              >
                <Image
                  src="https://images.unsplash.com/photo-1614332284113-9b518388579e?q=80&w=500&auto=format&fit=crop"
                  alt="3D Rocket"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
