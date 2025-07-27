'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../lib/useUser';
import { useRouter } from 'next/navigation';
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
  const { register, control, handleSubmit } = useForm<RoadmapFormData>({
    defaultValues: { topics: [{ title: '', resource: '', description: '' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'topics' });

  if (!user || user.role !== 'creator') {
    return <p className="p-4">You must be a creator to access this page. <Link href="/">Go Home</Link></p>;
  }

  const onSubmit = async (data: RoadmapFormData) => {
    const { error } = await supabase.from('roadmaps').insert({
      creator_id: user.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      topics: data.topics, // JSONB
    });
    if (error) console.error(error);
    else {
      alert('Roadmap published!');
      router.push('/marketplace');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Roadmap</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title')} placeholder="Title: 'LLMs in 30 Days'" className="p-2 border w-full" />
        <select {...register('category')} className="p-2 border w-full">
          <option value="ML">ML</option>
          {/* Add more categories later */}
        </select>
        <input {...register('price')} type="number" placeholder="Price: $10" className="p-2 border w-full" />
        <textarea {...register('description')} placeholder="Description..." className="p-2 border w-full h-24" />
        <h2 className="text-xl font-semibold">Add Topics</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <input {...register(`topics.${index}.title`)} placeholder="Topic Title: 'Tokenization'" className="p-2 border w-full" />
            <input {...register(`topics.${index}.resource`)} placeholder="Resource: YouTube URL" className="p-2 border w-full" />
            <textarea {...register(`topics.${index}.description`)} placeholder="Description..." className="p-2 border w-full h-16" />
            <button type="button" onClick={() => remove(index)} className="text-red-500">Remove Topic</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ title: '', resource: '', description: '' })} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Topic
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Publish Roadmap</button>
      </form>
    </div>
  );
}