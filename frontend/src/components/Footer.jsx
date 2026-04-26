import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 border-t border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="break-words">
            <h1 className="text-yellow-500" style={{ fontFamily: "'Playfair Display', serif" }}>
              Royal<span className="text-slate-400">Estate</span>
            </h1>

            <p className="text-gray-400 mt-4 leading-7 text-sm sm:text-base">
              Discover modern homes, luxury apartments,
              and the perfect property for your future —
              all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Links
            </h2>

            <div className="flex flex-col gap-3 text-gray-400 text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>

              <a
                href="/"
                className="hover:text-green-400 transition break-words" style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Home
              </a>

              <a
                href="/about"
                className="hover:text-green-400 transition break-words" style={{ fontFamily: "'Playfair Display', serif" }}
              >
                About
              </a>

              <a
                href="/search"
                className="hover:text-green-400 transition break-words" style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Properties
              </a>

              <a
                href="/contact"
                className="hover:text-green-400 transition break-words" style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact
              </a>

            </div>
          </div>

          {/* Contact */}
          <div className="break-words" style={{ fontFamily: "'Playfair Display', serif" }}>

            <h2 className="text-lg sm:text-xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact
            </h2>

            <div className="space-y-3 text-gray-400 text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>

              <p>📍 India</p>

              <p>
                 X :
                <a
                  href="https://x.com/Shivam6473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 ml-2"
                >
                  @Shivam6473
                </a>
              </p>

              <p>📞 +91 9399898248</p>

            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-4 mt-6 text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>

              <a
                href="https://x.com/Shivam6473"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                🐦
              </a>

             

            

            </div>

          </div>

        </div>

       
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs sm:text-sm break-words">
          © 2026 Royal-Estate. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;