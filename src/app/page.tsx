'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useUser } from '../lib/useUser';

export default function Home() {
  const { user, loading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">VectraSystems: Your ML Learning Hub</h1>
      </header>
      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <p className="text-xl mb-4 text-center">"Build and Follow Expert-Curated Roadmaps"</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <Link href="/marketplace" className="bg-blue-500 text-white px-4 py-2 rounded text-center">Browse Roadmaps</Link>
          <Link href="/create" className="bg-green-500 text-white px-4 py-2 rounded text-center">Become a Creator</Link>
          {user ? (
            <Link href="/dashboard" className="bg-purple-500 text-white px-4 py-2 rounded text-center">Dashboard</Link>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="bg-gray-500 text-white px-4 py-2 rounded text-center">Login/Sign Up</button>
          )}
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Featured:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>"LLM Mastery" by KaggleExpert ($10, 4.8★)</li>
            <li>"ML Basics" by DataGuru (Free, 4.5★)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Why VectraSystems?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>✓ Expert-led Paths</li>
            <li>✓ Gamified Progress</li>
            <li>✓ Community Ratings</li>
          </ul>
        </section>
      </main>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <AuthForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}