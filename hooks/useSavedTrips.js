// hooks/useSavedTrips.js
import { useState, useEffect } from 'react';

export const useSavedTrips = () => {
  const [savedTrips, setSavedTrips] = useState([]);

  // Load trips from Local Storage on mount
  useEffect(() => {
    const storedTrips = localStorage.getItem('myTripPlan');
    if (storedTrips) {
      setSavedTrips(JSON.parse(storedTrips));
    }
  }, []);

  // Function to toggle (Add/Remove) a trip
  const toggleTrip = (tripData) => {
    let updatedTrips;
    const exists = savedTrips.find((t) => t.uid === tripData.uid);

    if (exists) {
      // Remove it
      updatedTrips = savedTrips.filter((t) => t.uid !== tripData.uid);
    } else {
      // Add it (Clean data to only what we need for the card)
      const cleanTrip = {
        uid: tripData.uid,
        title: tripData.title,
        url: tripData.url,
        price: tripData.price || 'N/A',
        category: tripData.category || 'Trip',
        image: tripData.gallery ? tripData.gallery[0] : null // Grab first image
      };
      updatedTrips = [...savedTrips, cleanTrip];
    }

    setSavedTrips(updatedTrips);
    localStorage.setItem('myTripPlan', JSON.stringify(updatedTrips));
  };

  const isSaved = (uid) => savedTrips.some((t) => t.uid === uid);

  return { savedTrips, toggleTrip, isSaved };
};