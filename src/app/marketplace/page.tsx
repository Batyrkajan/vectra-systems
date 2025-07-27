'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

interface Roadmap {
  id: string;
  title: string;
  creator_id: string; // We'll fetch creator name later; for now, placeholder
  price: number;
  rating: number;
  description: string;
  topics: any[]; // JSONB array
}

export default function Marketplace() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [search, setSearch] = useState('');
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
    rm.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading roadmaps...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Roadmap Marketplace</h1>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search: 'LLMs...'"
          className="p-2 border w-full md:w-1/3 mb-2"
        />
        {/* Filters can be added later: e.g., dropdown for category, price, rating */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoadmaps.map((rm) => (
          <div key={rm.id} className="bg-white p-4 shadow-md rounded">
            <h2 className="text-xl font-semibold">{rm.title}</h2>
            <p>Creator: {rm.creator_id} | Price: ${rm.price} | Rating: {rm.rating}★</p>
            <p>Preview: {rm.topics[0]?.title || 'No topics yet'} → ...</p>
            <div className="flex space-x-2 mt-2">
              <Link href={`/roadmap/${rm.id}`} className="bg-blue-500 text-white px-3 py-1 rounded">View Details</Link>
              <button className="bg-green-500 text-white px-3 py-1 rounded">Buy Now</button> {/* Stripe later */}
            </div>
          </div>
        ))}
      </div>
      {filteredRoadmaps.length === 0 && <p>No roadmaps found.</p>}
    </div>
  );
}