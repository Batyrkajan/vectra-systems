'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Roadmap {
  id: string;
  title: string;
  creator_id: string;
  price: number;
  rating: number;
  description: string;
  topics: any[];
}

export default function Marketplace() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const { data, error } = await supabase.from('roadmaps').select('*');
      if (error) console.error(error);
      else setRoadmaps(data || []);
      setLoading(false);
    };
    fetchRoadmaps();
  }, []);

  const filteredRoadmaps = roadmaps.filter((rm) =>
    rm.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || (filter === 'free' && rm.price === 0) || (filter === 'paid' && rm.price > 0))
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Roadmap Marketplace</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search: 'LLMs...'"
          className="p-2 border rounded w-full sm:w-1/3 mb-4 sm:mb-0"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3 mb-4 sm:mb-0"
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map((rm) => (
          <motion.div
            key={rm.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{rm.title}</h2>
            <p className="text-gray-600 mb-2">Creator: {rm.creator_id} | ${rm.price} | {rm.rating}★</p>
            <p className="text-sm text-gray-500 mb-3">Preview: {rm.topics[0]?.title || 'No topics'} → ...</p>
            <div className="flex space-x-3">
              <Link href={`/roadmap/${rm.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Details</Link>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Buy Now</button>
            </div>
          </motion.div>
        ))}
      </div>
      {filteredRoadmaps.length === 0 && <p className="text-center text-gray-600 mt-4">No roadmaps found.</p>}
    </div>
  );
}