"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex bg-linear-to-r flex-col justify-center items-center from-purple-600 to-indigo-600 text-white text-center">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold leading-tight max-w-3xl"
      >
        AI‑powered second brain for your notes
      </motion.h1>

      <motion.a
        whileHover={{ scale: 1.05 }}
        href="/dashboard"
        className="mt-8 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow hover:shadow-lg transition"
      >
        Try it now
      </motion.a>
    </section>
  );
}