import React from "react";

const Footer = () => {

  return (

    <footer className="bg-black text-white mt-16 border-t border-zinc-800 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          <div>

            <h1 className="text-3xl font-bold text-yellow-500">

              Royal

              <span className="text-slate-400">
                Estate
              </span>

            </h1>

            <p className="text-gray-400 mt-4 leading-7 text-sm sm:text-base">

              Discover modern homes, luxury apartments,
              and the perfect property for your future
              all in one place.

            </p>

          </div>

          <div>

            <h2 className="text-lg sm:text-xl font-semibold mb-4">

              Quick Links

            </h2>

            <div className="flex flex-col gap-3 text-gray-400 text-sm sm:text-base">

              <a
                href="/"
                className="hover:text-yellow-500 transition"
              >
                Home
              </a>

              <a
                href="/about"
                className="hover:text-yellow-500 transition"
              >
                About
              </a>

              <a
                href="/search"
                className="hover:text-yellow-500 transition"
              >
                Properties
              </a>

              <a
                href="/contact"
                className="hover:text-yellow-500 transition"
              >
                Contact
              </a>

            </div>

          </div>

          <div>

            <h2 className="text-lg sm:text-xl font-semibold mb-4">

              Contact

            </h2>

            <div className="space-y-3 text-gray-400 text-sm sm:text-base">

              <p>
                📍 India
              </p>

              <p>

                X :

                <a
                  href="https://x.com/Shivam6473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 ml-2"
                >

                  @Shivam6473

                </a>

              </p>

              <p>
                📞 +91 9399898248
              </p>

            </div>

            <div className="flex gap-4 mt-6 text-2xl">

              <a
                href="https://x.com/Shivam6473"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition"
              >

                🐦

              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-gray-500 text-xs sm:text-sm">

          © 2026 RoyalEstate. All rights reserved.

        </div>

      </div>

    </footer>

  );

};

export default Footer;