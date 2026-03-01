"use client";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        {["AI Summaries", "Smart Tags", "Chat with Notes"].map(
          (feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-xl text-gray-800">{feature}</h3>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}