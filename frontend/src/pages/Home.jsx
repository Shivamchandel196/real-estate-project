import { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem.jsx";
import {
  FaHome,
  FaSearch,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "../components/Footer.jsx";

const ICON_COLORS = {
  home: "#c9a84c",
  search: "#4a8fe8",
  build: "#9b6fe8",
  shield: "#e86b6b",
};

const API_URL = import.meta.env.VITE_API_URL || "";

const ListingSkeleton = () => (
  <div className="overflow-hidden rounded-[14px] border border-white/5 bg-[#1a1d24]">
    <div className="h-[220px] animate-pulse bg-[#22262f]" />
    <div className="flex flex-col gap-3 p-5">
      <div className="h-5 w-3/4 animate-pulse rounded bg-[#22262f]" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-[#22262f]" />
      <div className="h-4 w-full animate-pulse rounded bg-[#22262f]" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-[#22262f]" />
      <div className="flex items-center justify-between pt-1">
        <div className="h-7 w-28 animate-pulse rounded bg-[#22262f]" />
        <div className="flex gap-2">
          <div className="h-9 w-9 animate-pulse rounded-full bg-[#22262f]" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-[#22262f]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-9 animate-pulse rounded-md bg-[#22262f]" />
        <div className="h-9 animate-pulse rounded-md bg-[#22262f]" />
      </div>
      <div className="h-11 animate-pulse rounded-md bg-[#22262f]" />
    </div>
  </div>
);

const ListingSkeletonGrid = () => (
  <section>
    <div className="mb-10 border-b border-white/10 pb-6">
      <div className="mb-4 h-1 w-12 rounded bg-[#c9a84c]" />
      <div className="h-10 w-52 animate-pulse rounded bg-[#1a1d24]" />
      <div className="mt-3 h-4 w-64 animate-pulse rounded bg-[#1a1d24]" />
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <ListingSkeleton key={index} />
      ))}
    </div>
  </section>
);

const ListingsMessage = ({ title, description, action }) => (
  <section className="rounded-2xl border border-white/10 bg-[#1a1d24] px-6 py-12 text-center">
    <div className="mx-auto mb-5 h-1 w-12 rounded bg-[#c9a84c]" />
    <h2 className="font-serif text-3xl font-bold text-[#f0ece4]">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400">
      {description}
    </p>
    {action}
  </section>
);

const Home = memo(() => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  SwiperCore.use([Navigation, Autoplay]);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [offerRes, rentRes, saleRes] = await Promise.all([
        fetch(`${API_URL}/api/listing/get?offer=true&limit=4`),
        fetch(`${API_URL}/api/listing/get?type=rent&limit=4`),
        fetch(`${API_URL}/api/listing/get?type=sale&limit=4`),
      ]);

      if (!offerRes.ok || !rentRes.ok || !saleRes.ok) {
        throw new Error("Unable to load listings right now.");
      }

      const [offerData, rentData, saleData] = await Promise.all([
        offerRes.json(),
        rentRes.json(),
        saleRes.json(),
      ]);

      setOfferListings(Array.isArray(offerData) ? offerData : []);
      setRentListings(Array.isArray(rentData) ? rentData : []);
      setSaleListings(Array.isArray(saleData) ? saleData : []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setOfferListings([]);
      setRentListings([]);
      setSaleListings([]);
      setError(error.message || "Unable to load listings right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchListings();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchListings]);

  const hasListings =
    offerListings.length > 0 ||
    rentListings.length > 0 ||
    saleListings.length > 0;

  return (
    <div className="bg-[#0b0c0e] text-[#f0ece4] min-h-screen overflow-hidden" style={{ willChange: 'contents' }}>

      {/* HERO SECTION */}
      <div className="relative h-screen overflow-hidden">

        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Mobile Image */}
        <img
          src="/bg-img.jpg"
          alt="Luxury Background"
          loading="lazy"
          decoding="async"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-[#0b0c0e]/60 to-black/90" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6 md:px-10">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3 text-[#c9a84c] uppercase tracking-[0.2em] text-xs font-semibold mb-6">
              <span className="w-8 h-px bg-[#c9a84c]" />
              Premium Real Estate
              <span className="w-8 h-px bg-[#c9a84c]" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="font-serif">
                Find Your{" "}
                <span className="text-[#c9a84c] italic">
                  Dream
                </span>
              </span>
              <br />
              <span className="font-serif">
                Home
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-8 max-w-xl mb-10">
              Discover premium homes, apartments, villas,
              and rental properties with RoyalEstate -
              curated for the discerning buyer.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/search"
                className="bg-[#c9a84c] text-black px-8 py-4 uppercase tracking-wider text-sm font-bold rounded hover:scale-105 transition duration-300 shadow-2xl"
              >
                Explore Properties
              </Link>

              <Link
                to="/about"
                className="border border-[#c9a84c]/40 px-8 py-4 uppercase tracking-wider text-sm rounded hover:bg-[#c9a84c]/10 transition duration-300"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">

        <p className="uppercase tracking-[0.2em] text-[#c9a84c] text-xs font-semibold mb-3">
          Why RoyalEstate
        </p>

        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-14">
          Everything You Need,
          <br />
          In One Place
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              icon: <FaHome />,
              color: ICON_COLORS.home,
              title: "Premium Homes",
              desc: "Luxury apartments, villas & bungalows curated for refined living.",
            },
            {
              icon: <FaSearch />,
              color: ICON_COLORS.search,
              title: "Smart Search",
              desc: "Advanced filters to find exactly what you're looking for, fast.",
            },
            {
              icon: <FaBuilding />,
              color: ICON_COLORS.build,
              title: "Buy & Rent",
              desc: "Flexible options - explore both rental and sale properties easily.",
            },
            {
              icon: <FaShieldAlt />,
              color: ICON_COLORS.shield,
              title: "Trusted Platform",
              desc: "Verified listings & secure transactions you can count on.",
            },
          ].map(({ icon, color, title, desc }) => (

            <div
              key={title}
              className="bg-[#1a1d24] border border-white/5 rounded-2xl p-8 hover:-translate-y-2 transition duration-300 hover:border-[#c9a84c]"
            >

              <div
                className="text-4xl mb-5"
                style={{ color }}
              >
                {icon}
              </div>

              <h2 className="text-2xl font-serif font-bold mb-3">
                {title}
              </h2>

              <p className="text-gray-400 leading-7 text-sm">
                {desc}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* SWIPER */}
      {offerListings.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-24">

          <Swiper
            navigation
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
          >

            {offerListings.map((listing) => (

              <SwiperSlide key={listing._id}>

                <div
                  className="h-140 rounded-3xl overflow-hidden relative bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${listing.imageUrls?.[0]})`,
                  }}
                >

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex flex-col justify-end p-10">

                    <div className="w-12 h-1 bg-[#c9a84c] rounded mb-4" />

                    <h2 className="text-4xl font-serif font-bold mb-3">
                      {listing.name}
                    </h2>

                    <p className="text-gray-300 max-w-2xl leading-7">
                      {listing.description}
                    </p>

                  </div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>
      )}

      {/* LISTINGS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24 flex flex-col gap-24">
        {loading ? (
          <ListingSkeletonGrid />
        ) : error ? (
          <ListingsMessage
            title="Listings could not load"
            description={error}
            action={
              <button
                type="button"
                onClick={fetchListings}
                className="mt-6 rounded border border-[#c9a84c]/40 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-black"
              >
                Try Again
              </button>
            }
          />
        ) : !hasListings ? (
          <ListingsMessage
            title="No listings yet"
            description="There are no featured properties to show right now. Explore the full search page or create a listing after signing in."
            action={
              <Link
                to="/search"
                className="mt-6 inline-block rounded border border-[#c9a84c]/40 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-black"
              >
                Explore Search
              </Link>
            }
          />
        ) : (
          <>
            {/* HOT OFFERS */}
            {offerListings.length > 0 && (
          <section>

            <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">

              <div>

                <div className="w-12 h-1 bg-[#c9a84c] rounded mb-4" />

                <h2 className="text-4xl font-serif font-bold">
                  Hot Offers
                </h2>

                <p className="text-gray-400 mt-2">
                  Best deals available right now
                </p>

              </div>

              <Link
                to="/search?offer=true"
                className="border border-[#c9a84c]/40 px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#c9a84c]/10 transition"
              >
                View All
              </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                />
              ))}
            </div>

          </section>
        )}

        {/* RENT */}
        {rentListings.length > 0 && (
          <section>

            <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">

              <div>

                <div className="w-12 h-1 bg-[#c9a84c] rounded mb-4" />

                <h2 className="text-4xl font-serif font-bold">
                  For Rent
                </h2>

                <p className="text-gray-400 mt-2">
                  Explore rental properties
                </p>

              </div>

              <Link
                to="/search?type=rent"
                className="border border-[#c9a84c]/40 px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#c9a84c]/10 transition"
              >
                View All
              </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                />
              ))}
            </div>

          </section>
        )}

        {/* SALE */}
        {saleListings.length > 0 && (
          <section>

            <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">

              <div>

                <div className="w-12 h-1 bg-[#c9a84c] rounded mb-4" />

                <h2 className="text-4xl font-serif font-bold">
                  For Sale
                </h2>

                <p className="text-gray-400 mt-2">
                  Buy premium homes
                </p>

              </div>

              <Link
                to="/search?type=sale"
                className="border border-[#c9a84c]/40 px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#c9a84c]/10 transition"
              >
                View All
              </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                />
              ))}
            </div>

          </section>
        )}
          </>
        )}

      </div>

      <Footer />

    </div>
  );
});

Home.displayName = "Home";
export default Home;
