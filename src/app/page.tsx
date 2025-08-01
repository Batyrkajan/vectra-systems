'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useUser } from '../lib/useUser';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const { user, loading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-blue-600 text-white p-4 shadow-md flex items-center">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">VectraSystems</h1>
          <nav className="flex space-x-4 items-center">
            <Link href="/marketplace" className="hover:underline">Browse</Link>
            <Link href="/create" className="hover:underline">Create</Link>
            {user ? (
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            ) : (
              <button onClick={() => setIsModalOpen(true)} className="hover:underline">Login</button>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Your ML Learning Hub</h2>
          <p className="text-lg mb-6">"Build and Follow Expert-Curated Roadmaps"</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              <Link href="/marketplace">Browse Roadmaps</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              <Link href="/create">Become a Creator</Link>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Featured Section */}
      <section className="py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Featured Roadmaps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-700"
          >
            <h3 className="text-lg font-semibold">"LLM Mastery" by KaggleExpert</h3>
            <p className="text-gray-600 dark:text-gray-300">$10 | 4.8★</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-700"
          >
            <h3 className="text-lg font-semibold">"ML Basics" by DataGuru</h3>
            <p className="text-gray-600 dark:text-gray-300">Free | 4.5★</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-100 text-center dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Why VectraSystems?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4">✓ Expert-led Paths</div>
          <div className="p-4">✓ Gamified Progress</div>
          <div className="p-4">✓ Community Ratings</div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-800"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <AuthForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}