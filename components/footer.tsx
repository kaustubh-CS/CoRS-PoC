export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Roam&Rush</h3>
          <p className="text-gray-400 text-sm">
            Curated adventures for the modern traveler. Find your vibe, book your thrill.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Destinations</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Manali</li>
            <li>Goa</li>
            <li>Rishikesh</li>
            <li>Ladakh</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        © 2025 Roam & Rush. All rights reserved.
      </div>
    </footer>
  );
}