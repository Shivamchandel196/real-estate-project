import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = memo(() => {
  return (
    <footer className="bg-gradient-to-b from-black via-[#0b0c0e] to-black text-white mt-20 border-t border-zinc-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#c9a84c] rounded-lg flex items-center justify-center font-bold text-black">
                RE
              </div>
              <h1 className="text-2xl font-extrabold tracking-wider">
                <span className="text-[#c9a84c]">Royal</span>
                <span className="text-white">Estate</span>
              </h1>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mt-4">
              Premium real estate solutions for discerning buyers and investors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#c9a84c]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-[#c9a84c] transition-colors">Home</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-[#c9a84c] transition-colors">Browse Listings</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#c9a84c] transition-colors">About Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-[#c9a84c] transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#c9a84c]">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#c9a84c] transition-colors">Buying Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#c9a84c] transition-colors">Investment Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#c9a84c] transition-colors">Market Trends</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#c9a84c] transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#c9a84c]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#c9a84c] flex-shrink-0" />
                <a href="tel:+919399898248" className="text-gray-400 hover:text-[#c9a84c] transition-colors text-sm">
                  +91 9399898248
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#c9a84c] flex-shrink-0" />
                <a href="mailto:contact@royalestate.com" className="text-gray-400 hover:text-[#c9a84c] transition-colors text-sm">
                  contact@royal.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#c9a84c] flex-shrink-0" />
                <p className="text-gray-400 text-sm">India</p>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/50 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 text-sm">
            © 2026 RoyalEstate. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://x.com/Shivam6473" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-[#c9a84c] flex items-center justify-center text-white hover:text-black transition-all duration-300 transform hover:scale-110">
              <FaTwitter size={16} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-[#c9a84c] flex items-center justify-center text-white hover:text-black transition-all duration-300 transform hover:scale-110">
              <FaLinkedin size={16} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-[#c9a84c] flex items-center justify-center text-white hover:text-black transition-all duration-300 transform hover:scale-110">
              <FaGithub size={16} />
            </a>
          </div>

          <p className="text-gray-600 text-sm">
            Built with ❤️ for real estate enthusiasts
          </p>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;