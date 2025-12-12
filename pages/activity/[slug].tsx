// pages/activity/[slug].tsx
import { Stack } from "../../contentstack-sdk";
import { Activity } from "../../typescript/types/contentstack";
import Head from "next/head";
import { useState } from "react";
import SaveButton from '../../components/SaveButton';
import { useItineraryEditor } from '../../hooks/useItineraryEditor';

export default function ActivityPage({ activity }: { activity: Activity }) {
  // Simple state to handle the Gallery Image swap
  const [activeImage, setActiveImage] = useState(activity.gallery?.[0]?.url);

  // Initialize the Itinerary Editor Hook
  // We pass the activity UID (key) and the default itinerary (initial value)
  const { 
    itinerary, 
    isEditing, 
    setIsEditing, 
    updateDay, 
    addDay,
    removeDay,
    saveItinerary, 
    resetItinerary,
    hasCustomChanges
  } = useItineraryEditor(activity.uid, activity.itinerary || []);

  if (!activity) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <Head>
        <title>{activity.title} | Roam & Rush</title>
      </Head>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[50vh]">
        <img
          src={activeImage || activity.gallery?.[0]?.url}
          alt={activity.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-10 text-white">
            <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
              {activity.category}
            </span>
            <h1 className="text-5xl font-bold mt-2">{activity.title}</h1>
            <p className="text-xl mt-2 opacity-90">
              {/* Show Destination if available */}
              {activity.destination?.[0]?.title} 
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- LEFT COLUMN: DETAILS & ITINERARY --- */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Gallery Thumbs */}
          {activity.gallery && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {activity.gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img.url)}
                  className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === img.url ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img 
                    src={img.url} 
                    alt="Activity gallery image" 
                    className="w-full h-full object-cover" 
                    />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div>
             <h2 className="text-2xl font-bold mb-4">About this Experience</h2>
             <div className="prose max-w-none text-gray-600">
               {typeof activity.description === 'string' ? (
                 <div dangerouslySetInnerHTML={{ __html: activity.description }} />
               ) : (
                 "Description content available."
               )}
             </div>
          </div>

          {/* --- ITINERARY SECTION --- */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Itinerary</h2>
              
              {/* Controls */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button onClick={saveItinerary} className="px-4 py-2 bg-green-600 text-white rounded font-bold text-sm">
                      Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded text-sm">
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    {hasCustomChanges && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
                        Customized
                      </span>
                    )}
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm font-bold"
                    >
                      {itinerary.length === 0 ? "Create Itinerary" : "Edit Itinerary"}
                    </button>
                    {hasCustomChanges && (
                      <button onClick={resetItinerary} className="text-xs text-red-500 hover:underline">
                        Reset
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* EMPTY STATE */}
            {!isEditing && itinerary.length === 0 && (
              <div className="text-center py-10 text-gray-500 italic">
                No itinerary available for this experience yet.
                <br />
                <button onClick={() => setIsEditing(true)} className="text-blue-600 underline mt-2">
                  Add one yourself!
                </button>
              </div>
            )}

            {/* LIST */}
            <div className="space-y-6">
              {itinerary.map((block: any, index: number) => {
                const dayData = block.daily_schedule;
                if (!dayData) return null;

                return (
                  <div key={index} className="flex gap-4 group">
                    {/* Day Number */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                        {dayData.day_number}
                      </div>
                      {index !== itinerary.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6 w-full">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-lg mb-2">Day {dayData.day_number}</h4>
                        {isEditing && (
                          <button 
                            onClick={() => removeDay(index)}
                            className="text-red-400 hover:text-red-600 text-sm font-bold px-2"
                            title="Remove Day"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {isEditing ? (
                        <textarea
                          value={dayData.description}
                          onChange={(e) => updateDay(index, e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-lg min-h-[100px]"
                          placeholder={`Plan for Day ${dayData.day_number}...`}
                        />
                      ) : (
                        <div className="text-gray-600 mt-1 prose prose-blue max-w-none">
                           {typeof dayData.description === 'string' ? (
                              <div dangerouslySetInnerHTML={{ __html: dayData.description }} />
                           ) : (
                              "Check details."
                           )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ADD DAY BUTTON (Only visible when editing) */}
            {isEditing && (
              <button
                onClick={addDay}
                className="w-full py-3 mt-4 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-400 hover:text-blue-500 font-bold transition-colors"
              >
                + Add Day {itinerary.length + 1}
              </button>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: BOOKING CARD --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 bg-white border border-gray-200 shadow-xl rounded-xl p-6">
             <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500">Starting from</span>
                <span className="text-3xl font-bold text-blue-600">₹{activity.price}</span>
             </div>
             
             <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                   <span>Duration</span>
                   <span className="font-semibold">{activity.itinerary?.length || 1} Days</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span>Rating</span>
                   <span className="font-semibold text-yellow-500">★ {activity.rating}</span>
                </div>
             </div>

             <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
               Check Availability
             </button>

             <SaveButton data={activity} />
                
             <p className="text-xs text-center text-gray-400 mt-4">Instant Confirmation</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SERVER SIDE FETCHING ---
export const getServerSideProps = async ({ params }: any) => {
  const { slug } = params;

  // Fetch Activity where URL matches the slug
  const result = await Stack.ContentType("activity")
    .Query()
    .where("url", `/activity/${slug}`) 
    .includeReference(["destination"])
    .toJSON()
    .find();

  if (!result[0] || result[0].length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      activity: result[0][0],
    },
  };
};