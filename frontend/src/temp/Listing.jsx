import React, {
  useState,
  useEffect,
} from "react";

import { useParams } from "react-router-dom";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaTag,
} from "react-icons/fa";

import Contact from "../components/Contact";

const Listing = () => {

  const params =
    useParams();

  const [
    listing,
    setListing,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    contact,
    setContact,
  ] = useState(false);

  useEffect(() => {

    const fetchListing =
      async () => {

        try {

          setLoading(true);

         const res =
  await fetch(

    `${import.meta.env.VITE_API_URL}/api/listing/get/${params.listingId}`

  );

          const data =
            await res.json();

          if (
            data.success ===
            false
          ) {

            setError(true);

            setLoading(
              false
            );

            return;

          }

          setListing(data);

          setError(false);

        } catch {

          setError(true);

        } finally {

          setLoading(false);

        }

      };

    fetchListing();

  }, [params.listingId]);

  if (loading) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-zinc-500 uppercase tracking-[0.2em] text-sm">

            Loading Property...

          </p>

        </div>

      </div>

    );

  }

  if (error) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center">

        <p className="text-red-400 text-lg">

          Something went wrong

        </p>

      </div>

    );

  }

  return (

    <main className="bg-black text-white min-h-screen pb-20">

      {listing && (

        <>

          {/* SWIPER */}

          <section className="relative">

            <Swiper

              modules={[
                Navigation,
                Autoplay,
              ]}

              navigation

              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}

              loop={true}

              speed={800}

            >

              {listing.imageUrls?.map(
                (
                  url,
                  index
                ) => (

                  <SwiperSlide
                    key={index}
                  >

                    <div

                      className="h-[650px] bg-cover bg-center relative"

                      style={{

                        backgroundImage:

                          `url(${url})`,

                      }}

                    >

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    </div>

                  </SwiperSlide>

                )

              )}

            </Swiper>

            <button

              onClick={() => {

                navigator.clipboard.writeText(

                  window.location.href

                );

                setCopied(true);

                setTimeout(
                  () =>

                    setCopied(
                      false
                    ),

                  2000
                );

              }}

              className="fixed top-24 right-6 z-50 bg-zinc-900 border border-yellow-500/30 hover:border-yellow-500 text-yellow-500 w-12 h-12 rounded-full flex items-center justify-center transition"

            >

              <FaShare />

            </button>

            {copied && (

              <div className="fixed top-40 right-6 z-50 bg-zinc-900 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-xl text-sm">

                Link Copied ✓

              </div>

            )}

          </section>


          <section className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 md:p-12 shadow-2xl">

              <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

                Property Details

              </p>

              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8">

                {listing.name}

              </h1>

             

              <div className="flex flex-wrap gap-4 mb-6">

                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-6 py-4 rounded-xl text-2xl font-bold">

                  ₹

                  {(
                    listing.offer

                      ? (
                          listing.discountPrice ||
                          0
                        )

                      : (
                          listing.regularPrice ||
                          0
                        )

                  ).toLocaleString(
                    "en-IN"
                  )}

                  {listing.type ===
                    "rent" && (

                    <span className="text-sm opacity-70 ml-2">

                      / month

                    </span>

                  )}

                </div>

                {listing.offer && (

                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-xl flex items-center gap-2 font-semibold">

                    <FaTag />

                    ₹

                    {(
                      (
                        +listing.regularPrice ||
                        0
                      ) -

                      (
                        +listing.discountPrice ||
                        0
                      )

                    ).toLocaleString(
                      "en-IN"
                    )}

                    OFF

                  </div>

                )}

              </div>

             

              <div className="flex flex-wrap gap-3 mb-6">

                <span

                  className={`px-5 py-2 rounded-xl text-sm uppercase tracking-wider font-semibold ${
                    listing.type ===
                    "rent"

                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"

                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"

                  }`}

                >

                  {listing.type ===
                  "rent"

                    ? "For Rent"

                    : "For Sale"}

                </span>

                {listing.furnished && (

                  <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-5 py-2 rounded-xl text-sm uppercase tracking-wider font-semibold">

                    Furnished

                  </span>

                )}

              </div>

              {/* ADDRESS */}

              <div className="flex items-center gap-3 text-zinc-400 mb-10">

                <FaMapMarkerAlt className="text-yellow-500" />

                <p>

                  {listing.address}

                </p>

              </div>

              <div className="border-t border-zinc-800 my-10"></div>

              {/* DESCRIPTION */}

              <div className="mb-10">

                <h2 className="text-3xl font-bold mb-6">

                  Description

                </h2>

                <p className="text-zinc-400 leading-8">

                  {
                    listing.description
                  }

                </p>

              </div>

              <div className="border-t border-zinc-800 my-10"></div>

              {/* FEATURES */}

              <div className="mb-10">

                <h2 className="text-3xl font-bold mb-8">

                  Property Features

                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                  {[
                    {
                      icon:
                        <FaBed />,

                      value:
                        listing.bedrooms,

                      label:
                        "Bedrooms",

                      color:
                        "text-yellow-500",

                      bg:
                        "bg-yellow-500/10",

                    },

                    {
                      icon:
                        <FaBath />,

                      value:
                        listing.bathrooms,

                      label:
                        "Bathrooms",

                      color:
                        "text-blue-400",

                      bg:
                        "bg-blue-500/10",

                    },

                    {
                      icon:
                        <FaParking />,

                      value:
                        listing.parking

                          ? "Yes"

                          : "No",

                      label:
                        "Parking",

                      color:
                        "text-orange-400",

                      bg:
                        "bg-orange-500/10",

                    },

                    {
                      icon:
                        <FaChair />,

                      value:
                        listing.furnished

                          ? "Yes"

                          : "No",

                      label:
                        "Furnished",

                      color:
                        "text-violet-400",

                      bg:
                        "bg-violet-500/10",

                    },

                  ].map(
                    (
                      item
                    ) => (

                      <div

                        key={
                          item.label
                        }

                        className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6 text-center hover:border-yellow-500/20 transition"

                      >

                        <div

                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 ${item.bg} ${item.color}`}

                        >

                          {
                            item.icon
                          }

                        </div>

                        <h3 className="text-2xl font-bold mb-2">

                          {
                            item.value
                          }

                        </h3>

                        <p className="text-zinc-500 uppercase tracking-wider text-xs">

                          {
                            item.label
                          }

                        </p>

                      </div>

                    )

                  )}

                </div>

              </div>

              {/* CONTACT */}

              {!contact ? (

                <button

                  onClick={() =>

                    setContact(
                      true
                    )

                  }

                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-[0.2em] py-5 rounded-2xl transition"

                >

                  Contact Owner

                </button>

              ) : (

                <Contact
                  listing={
                    listing
                  }
                />

              )}

            </div>

          </section>

        </>

      )}

    </main>

  );

};

export default Listing;