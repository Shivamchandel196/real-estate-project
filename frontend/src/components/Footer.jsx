import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 border-t border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Brand Section */}
          <div>

            <h1 className="text-4xl font-extrabold tracking-wide">
              <span className="text-yellow-500">
                Royal
              </span>

              <span className="text-slate-300">
                Estate
              </span>
            </h1>

            <p className="text-gray-400 mt-6 leading-8 text-sm sm:text-base max-w-xl">

              Helping people discover premium homes,
              luxury apartments, and investment-ready
              properties with a seamless and modern
              real estate experience.

            </p>

            <div className="flex flex-wrap gap-3 mt-6">

              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-gray-300">
                Luxury Homes
              </span>

              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-gray-300">
                Smart Investments
              </span>

              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-gray-300">
                Trusted Listings
              </span>

            </div>

          </div>

          {/* Contact Section */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6 text-yellow-500">
              Get In Touch
            </h2>

            <div className="space-y-5 text-gray-300">

              <div className="flex items-start gap-4">

                <span className="text-2xl">
                  📍
                </span>

                <div>

                  <p className="font-semibold text-white">
                    Location
                  </p>

                  <p className="text-gray-400">
                    India
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <span className="text-2xl">
                  📞
                </span>

                <div>

                  <p className="font-semibold text-white">
                    Phone
                  </p>

                  <a
                    href="tel:+919399898248"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    +91 9399898248
                  </a>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <span className="text-2xl">
                  🌐
                </span>

                <div>

                  <p className="font-semibold text-white">
                    Social
                  </p>

                  <a
                    href="https://x.com/Shivam6473"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    @Shivam6473
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">

          <p>
            © 2026 RoyalEstate. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Built for modern real estate experiences.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;