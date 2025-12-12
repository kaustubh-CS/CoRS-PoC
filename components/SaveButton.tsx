// components/SaveButton.tsx
import { useSavedTrips } from '../hooks/useSavedTrips';
import { useEffect, useState } from 'react';

// Fix: Added type definition for the props
export default function SaveButton({ data }: { data: any }) {
  const { toggleTrip, isSaved } = useSavedTrips();
  const [saved, setSaved] = useState(false);

  // Sync with hook state
  useEffect(() => {
    // Only check if data exists to avoid crash
    if (data && data.uid) {
      setSaved(isSaved(data.uid));
    }
  }, [isSaved, data]);

  return (
    <button 
      onClick={() => toggleTrip(data)}
      style={{
        width: '100%', // Made it full width to fit nicely in the card
        padding: '12px',
        backgroundColor: saved ? '#e74c3c' : '#fff',
        color: saved ? '#fff' : '#e74c3c',
        border: '2px solid #e74c3c',
        borderRadius: '8px', // Matched your theme slightly better
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'all 0.2s'
      }}
    >
      {saved ? '♥ Saved to Trip' : '♡ Add to Trip'}
    </button>
  );
}