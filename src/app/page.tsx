import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-3xl">VectraSystems: Your ML Learning Hub</h1>
      </header>
      <main className="p-8">
        <p className="text-xl mb-4">"Build and Follow Expert-Curated Roadmaps"</p>
        <div className="flex justify-center space-x-4 mb-8">
          <Link href="/marketplace" className="bg-blue-500 text-white px-4 py-2 rounded">Browse Roadmaps</Link>
          <Link href="/create" className="bg-green-500 text-white px-4 py-2 rounded">Become a Creator</Link>
        </div>
        <section>
          <h2 className="text-2xl mb-2">Featured:</h2>
          <ul className="list-disc pl-6">
            <li>"LLM Mastery" by KaggleExpert ($10, 4.8★)</li>
            <li>"ML Basics" by DataGuru (Free, 4.5★)</li>
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl mb-2">Why VectraSystems?</h2>
          <ul className="list-disc pl-6">
            <li>✓ Expert-led Paths</li>
            <li>✓ Gamified Progress</li>
            <li>✓ Community Ratings</li>
          </ul>
        </section>
      </main>
    </div>
  );
}