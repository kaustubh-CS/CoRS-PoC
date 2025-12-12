import { useState, useEffect } from 'react';

export const useItineraryEditor = (activityId, initialItinerary) => {
  // Ensure we start with an array, even if CMS returns null
  const [itinerary, setItinerary] = useState(initialItinerary || []);
  const [isEditing, setIsEditing] = useState(false);
  const [hasCustomChanges, setHasCustomChanges] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(`itinerary_${activityId}`);
    if (savedData) {
      setItinerary(JSON.parse(savedData));
      setHasCustomChanges(true);
    } else {
      setItinerary(initialItinerary || []);
    }
  }, [activityId, initialItinerary]);

  const updateDay = (index, newDescription) => {
    const updated = [...itinerary];
    updated[index] = {
      ...updated[index],
      daily_schedule: {
        ...updated[index].daily_schedule,
        description: newDescription
      }
    };
    setItinerary(updated);
  };

  // --- NEW FUNCTION: ADD DAY ---
  const addDay = () => {
    const nextDayNum = itinerary.length + 1;
    const newBlock = {
      daily_schedule: {
        day_number: nextDayNum,
        description: "" // Start blank
      }
    };
    setItinerary([...itinerary, newBlock]);
  };

  // --- NEW FUNCTION: REMOVE DAY ---
  const removeDay = (index) => {
    const updated = itinerary.filter((_, i) => i !== index);
    // Optional: Re-number the days so Day 3 becomes Day 2
    const renumbered = updated.map((block, i) => ({
      ...block,
      daily_schedule: { ...block.daily_schedule, day_number: i + 1 }
    }));
    setItinerary(renumbered);
  };

  const saveItinerary = () => {
    localStorage.setItem(`itinerary_${activityId}`, JSON.stringify(itinerary));
    setIsEditing(false);
    setHasCustomChanges(true);
  };

  const resetItinerary = () => {
    localStorage.removeItem(`itinerary_${activityId}`);
    setItinerary(initialItinerary || []);
    setHasCustomChanges(false);
    setIsEditing(false);
  };

  return {
    itinerary,
    isEditing,
    setIsEditing,
    updateDay,
    addDay,      // Export this
    removeDay,   // Export this
    saveItinerary,
    resetItinerary,
    hasCustomChanges
  };
};