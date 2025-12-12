// pages/my-trip.js
import { useSavedTrips } from '../hooks/useSavedTrips';
import Link from 'next/link';

export default function MyTrip() {
  const { savedTrips, toggleTrip } = useSavedTrips();

  return (
    <div style={{ padding: '40px' }}>
      <h1>My Saved Trip Plan</h1>
      
      {savedTrips.length === 0 ? (
        <p>You haven't saved anything yet. Go explore!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {savedTrips.map((trip) => (
            <div key={trip.uid} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <h3>{trip.title}</h3>
              <p>{trip.category} - ₹{trip.price}</p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link href={trip.url}>
                  <button style={{ padding: '5px 10px', cursor: 'pointer' }}>View</button>
                </Link>
                <button 
                  onClick={() => toggleTrip(trip)} 
                  style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}