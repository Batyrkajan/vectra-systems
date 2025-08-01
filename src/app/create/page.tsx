'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../lib/useUser';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import Link from 'next/link';

interface Topic {
  title: string;
  resource: string;
  description: string;
}

interface RoadmapFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  topics: Topic[];
}

export default function CreateRoadmap() {
  const { user } = useUser();
  const router = useRouter();
  const { register, control, handleSubmit, setValue } = useForm<RoadmapFormData>({
    defaultValues: { topics: [{ title: '', resource: '', description: '' }] },
  });
  const { fields, append, remove, move } = useFieldArray({ control, name: 'topics' });
  const [error, setError] = useState('');

  if (!user || user.role !== 'creator') {
    return <p className="p-4 text-center">You must be a creator. <Link href="/">Go Home</Link></p>;
  }

  const onSubmit = async (data: RoadmapFormData) => {
    const { error } = await supabase.from('roadmaps').insert({
      creator_id: user.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      topics: data.topics,
    });
    if (error) setError(error.message);
    else {
      alert('Roadmap published!');
      router.push('/marketplace');
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Roadmap</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input {...register('title')} placeholder="LLMs in 30 Days" className="p-2 border rounded w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select {...register('category')} className="p-2 border rounded w-full">
            <option value="ML">Machine Learning</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input {...register('price')} type="number" placeholder="10" className="p-2 border rounded w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea {...register('description')} placeholder="Describe your roadmap..." className="p-2 border rounded w-full h-24" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Topics</h2>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-100 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Topic {index + 1}</span>
                <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
              </div>
              <input
                {...register(`topics.${index}.title`)}
                placeholder="Topic Title: Tokenization"
                className="p-2 border rounded w-full mb-2"
              />
              <input
                {...register(`topics.${index}.resource`)}
                placeholder="Resource: YouTube URL"
                className="p-2 border rounded w-full mb-2"
              />
              <textarea
                {...register(`topics.${index}.description`)}
                placeholder="Description..."
                className="p-2 border rounded w-full h-16"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => append({ title: '', resource: '', description: '' })}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Topic
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
          Publish Roadmap
        </button>
      </form>
    </div>
  );
}