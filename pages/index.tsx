import Head from "next/head";
import { Stack } from "../contentstack-sdk"; // Note: Named import!
import { Homepage } from "../typescript/types/contentstack";
import { getRecommendations } from "../lib/recommendations";
import { useState } from "react";
import Link from "next/link";

export default function Home({ homeData }: { homeData: Homepage }) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // The Vibe Matcher Logic
  const handleVibeCheck = async (vibe: "Adventure" | "Relaxation" | "Luxury") => {
    setLoading(true);
    const results = await getRecommendations(vibe);
    setRecommendations(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Head>
        <title>{homeData.title} | Roam & Rush</title>
      </Head>

      {/* --- HERO SECTION --- */}
      <div 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop")' }}
      >
        {/* Dark Overlay so text is readable */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="z-10 text-center text-white px-4 relative">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">{homeData.hero_section}</h1>
          <p className="text-2xl font-light opacity-90 drop-shadow-md">Discover the best of India and beyond.</p>
        </div>
      </div>

      {/* --- VIBE MATCHER (Interactive Use Case) --- */}
      <div className="max-w-4xl mx-auto -mt-10 relative z-20 bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">What&apos;s your vibe this weekend?</h2>
        <div className="flex justify-center gap-4">
          {["Adventure", "Relaxation", "Luxury"].map((vibe) => (
            <button
              key={vibe}
              onClick={() => handleVibeCheck(vibe as any)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              I want {vibe}
            </button>
          ))}
        </div>

        {/* RESULTS GRID */}
        {loading && <p className="text-center mt-4">Finding the perfect match...</p>}
        
        {recommendations.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((activity) => (
              <Link key={activity.uid} href={activity.url || '#'} className="block group">
                <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                  {/* SHOW IMAGE HERE */}
                  {activity.gallery?.[0]?.url ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={activity.gallery[0].url} 
                        alt={activity.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-1">{activity.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          📍 {activity.destination?.[0]?.title || "India"}
                        </p>
                      </div>
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                        {activity.category}
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <p className="text-gray-400 text-sm">Starting from</p>
                      <p className="text-blue-600 font-bold text-lg">₹{activity.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* --- TRENDING SECTION (From CMS) --- */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeData.trending_activities?.map((activity) => (
            <Link 
              key={activity.uid} 
              href={activity.url || '#'} 
              className="block group" // 'block' makes the link behave like a div
            >
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition group-hover:shadow-xl">
                  {/* ... existing image and text code ... */}
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SERVER SIDE FETCHING ---
export const getServerSideProps = async () => {
  const result = await Stack.ContentType("homepage")
    .Query()
    .includeReference(["trending_activities", "featured_destinations"]) // Fetch linked data
    .toJSON()
    .find();

  return {
    props: {
      homeData: result[0][0], // Pass the first entry found
    },
  };
};