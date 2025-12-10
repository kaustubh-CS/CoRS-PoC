import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to turn the clear header white
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-extrabold tracking-tighter">
          <span className={scrolled ? "text-blue-600" : "text-white"}>Roam</span>
          <span className={scrolled ? "text-gray-900" : "text-white/80"}>&Rush</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8 font-medium">
          {["Destinations", "Activities", "About"].map((item) => (
            <Link 
              key={item} 
              href="/" // For now, just link home
              className={`${scrolled ? "text-gray-600 hover:text-blue-600" : "text-white/90 hover:text-white"} transition`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <button className={`px-5 py-2 rounded-full font-bold text-sm transition ${
           scrolled 
             ? "bg-blue-600 text-white hover:bg-blue-700" 
             : "bg-white text-blue-900 hover:bg-gray-100"
        }`}>
          Plan My Trip
        </button>
      </div>
    </header>
  );
}