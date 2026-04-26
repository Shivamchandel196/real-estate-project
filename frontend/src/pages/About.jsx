import React from "react";

import {
  FaHome,
  FaHandshake,
  FaSearchLocation,
  FaBuilding,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const features = [

  {
    icon: <FaHome />,
    title: "Smart Property Listings",

    desc:
      "Explore premium properties with detailed descriptions, pricing, and advanced search features.",

    color:
      "text-yellow-500",

    bg:
      "bg-yellow-500/10",

  },

  {
    icon:
      <FaSearchLocation />,

    title:
      "Easy Property Search",

    desc:
      "Search and filter properties based on location, type, pricing, and facilities.",

    color:
      "text-blue-400",

    bg:
      "bg-blue-500/10",

  },

  {
    icon:
      <FaBuilding />,

    title:
      "Buy • Sell • Rent",

    desc:
      "List properties for sale or rent and connect directly with interested clients.",

    color:
      "text-violet-400",

    bg:
      "bg-violet-500/10",

  },

  {
    icon:
      <FaHandshake />,

    title:
      "Trusted Experience",

    desc:
      "A reliable platform designed to build trust between buyers and sellers.",

    color:
      "text-orange-400",

    bg:
      "bg-orange-500/10",

  },

  {
    icon:
      <FaUsers />,

    title:
      "User Friendly",

    desc:
      "Clean design and smooth navigation for a better user experience.",

    color:
      "text-pink-400",

    bg:
      "bg-pink-500/10",

  },

  {
    icon:
      <FaShieldAlt />,

    title:
      "Secure Platform",

    desc:
      "Protected routes and authentication keep accounts and listings secure.",

    color:
      "text-red-400",

    bg:
      "bg-red-500/10",

  },

];

const About = () => {

  return (

    <main className="min-h-screen bg-black text-white">

      <section className="border-b border-yellow-500/10 px-6 py-24">

        <div className="max-w-6xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-6">

            Who We Are

          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">

            About{" "}

            <span className="text-yellow-500">

              RoyalEstate

            </span>

          </h1>

          <p className="text-zinc-400 text-lg leading-8 max-w-3xl">

            RoyalEstate is a modern real estate platform built to simplify the way people buy, sell, and rent properties. We connect property owners with buyers and renters through a fast, secure, and user-friendly experience.

          </p>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/30 transition">

          <div className="w-12 h-1 bg-yellow-500 rounded mb-6"></div>

          <h2 className="text-3xl font-bold mb-4">

            Our Mission

          </h2>

          <p className="text-zinc-400 leading-8">

            Our mission is to make real estate simple, transparent, and accessible for everyone. Whether you're searching for your dream home, rental property, or planning to sell, RoyalEstate provides all the tools you need.

          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/30 transition">

          <div className="w-12 h-1 bg-yellow-500 rounded mb-6"></div>

          <h2 className="text-3xl font-bold mb-4">

            Why Choose Us?

          </h2>

          <p className="text-zinc-400 leading-8">

            We focus on trusted listings, secure communication, easy property management, and a smooth browsing experience to help users make confident real estate decisions.

          </p>

        </div>

      </section>

      <section className="border-t border-zinc-900 px-6 py-20">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">

            <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

              What We Offer

            </p>

            <h2 className="text-5xl font-bold mb-4">

              Platform Features

            </h2>

            <p className="text-zinc-500">

              Everything you need to find or manage properties

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map(
              (
                feature
              ) => (

                <div

                  key={
                    feature.title
                  }

                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:-translate-y-2 hover:border-yellow-500/20 transition duration-300"

                >

                  <div

                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 ${feature.bg} ${feature.color}`}

                  >

                    {
                      feature.icon
                    }

                  </div>

                  <h3 className="text-2xl font-semibold mb-4">

                    {
                      feature.title
                    }

                  </h3>

                  <p className="text-zinc-400 leading-7">

                    {
                      feature.desc
                    }

                  </p>

                </div>

              )

            )}

          </div>

        </div>

      </section>

    </main>

  );

};

export default About;