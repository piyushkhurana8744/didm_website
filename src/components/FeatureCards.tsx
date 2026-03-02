"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Leaf } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Strategic Innovation",
    description: "We craft cutting-edge strategies tailored to your unique business goals and market dynamics.",
  },
  {
    icon: TrendingUp,
    title: "Digital Excellence",
    description: "Our data-driven approaches ensure measurable growth and sustainable digital presence.",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth",
    description: "We build long-term solutions that continue to deliver value and expand your reach.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function FeatureCards() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
