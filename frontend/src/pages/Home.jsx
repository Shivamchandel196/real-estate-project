import { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaArrowRight,
  FaBuilding,
  FaHome,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";
import ListingItem from "../components/ListingItem.jsx";
import Footer from "../components/Footer.jsx";
import RecentlyViewed from "../components/RecentlyViewed.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

const listingGridClass = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4";

const features = [
  {
    icon: FaHome,
    title: "Premium Homes",
    desc: "Luxury apartments, villas, and bungalows curated for refined living.",
    iconClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  },
  {
    icon: FaSearch,
    title: "Smart Search",
    desc: "Advanced filters help you find the right property faster.",
    iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: FaBuilding,
    title: "Buy & Rent",
    desc: "Explore sale and rental properties in one clean experience.",
    iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: FaShieldAlt,
    title: "Trusted Platform",
    desc: "A secure, simple platform for buyers, renters, and owners.",
    iconClass: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
];

const SectionHeader = ({ eyebrow, title, description, linkTo }) => (
  <div className="mb-8 flex flex-col gap-5 border-b border-zinc-200 dark:border-white/10 pb-6 md:flex-row md:items-end md:justify-between transition-colors duration-300">
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-600 dark:text-yellow-500">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl font-black leading-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl transition-colors duration-300">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base transition-colors duration-300">
          {description}
        </p>
      )}
    </div>

    {linkTo && (
      <Link
        to={linkTo}
        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-yellow-500/40 px-5 py-3 text-sm font-bold text-yellow-600 dark:text-yellow-500 transition-colors duration-300 hover:bg-yellow-500 hover:text-black"
      >
        View All
        <FaArrowRight className="text-xs" />
      </Link>
    )}
  </div>
);

const ListingSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900 transition-colors duration-300">
    <div className="h-56 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
    <div className="space-y-4 p-5">
      <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="h-11 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);

const ListingSkeletonGrid = () => (
  <section className="py-12">
    <SectionHeader
      eyebrow="Loading"
      title="Finding Fresh Properties"
      description="Please wait while the latest listings load."
    />

    <div className={listingGridClass}>
      {Array.from({ length: 4 }, (_, index) => (
        <ListingSkeleton key={index} />
      ))}
    </div>
  </section>
);

const ListingsMessage = ({ title, description, action, tone = "default" }) => (
  <section
    className={[
      "rounded-2xl border px-6 py-14 text-center shadow-2xl transition-colors duration-300",
      tone === "error"
        ? "border-red-500/20 bg-red-500/10"
        : "border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900",
    ].join(" ")}
  >
    <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-yellow-500" />
    <h2 className="text-3xl font-black text-zinc-900 dark:text-white transition-colors duration-300">
      {title}
    </h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
      {description}
    </p>
    <div className="mt-6 transition-colors duration-300">{action}</div>
  </section>
);

const HomeListingSection = ({
  eyebrow,
  title,
  description,
  linkTo,
  listings,
}) => {
  if (listings.length === 0) {
    return null;
  }

  return (
    <section className="py-10 lg:py-14">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        linkTo={linkTo}
      />

      <div className={listingGridClass}>
        {listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

const Home = memo(() => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                setOfferListings(
  Array.isArray(offerData?.data)
    ? offerData.data
    : []
);

setRentListings(
  Array.isArray(rentData?.data)
    ? rentData.data
    : []
);

setSaleListings(
  Array.isArray(saleData?.data)
    ? saleData.data
    : []
);
    } catch (error) {
      console.error(error);
      setOfferListings([]);
      setRentListings([]);
      setSaleListings([]);
      setError(error.message || "Unable to load listings right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const hasListings =
    offerListings.length > 0 ||
    rentListings.length > 0 ||
    saleListings.length > 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fafafa] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
      <section className="relative min-h-[720px] overflow-hidden border-b border-yellow-500/10 sm:min-h-[780px] lg:min-h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 hidden h-full w-full object-cover opacity-60 md:block"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        <img
          src="/bg-img.jpg"
          alt="Luxury property background"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70 md:hidden"
        />

        {/* Hero Overlays: kept static and high contrast relative to behind-the-text media asset */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-4 pb-16 pt-32 sm:min-h-[780px] sm:px-6 lg:min-h-screen lg:pb-24 lg:pt-40">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-500/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-yellow-500 backdrop-blur">
              <span className="h-px w-8 bg-yellow-500" />
              Premium Real Estate
            </div>

            <h1 className="max-w-4xl font-serif text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Find Your <span className="text-yellow-500">Dream</span>
              <br />
              Home
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              Discover premium homes, apartments, villas, and rental properties
              with RoyalEstate.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-yellow-500 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black shadow-[0_18px_45px_rgba(234,179,8,0.2)] transition-all hover:-translate-y-0.5 hover:bg-yellow-400"
              >
                <FaSearch />
                Explore Properties
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-zinc-300 dark:border-white/20 bg-white/80 dark:bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-zinc-900 dark:text-white backdrop-blur transition-colors duration-300 hover:border-yellow-500 hover:text-yellow-500"
              >
                Learn More
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Why RoyalEstate"
            title="Everything You Need, In One Place"
            description="Search, compare, save, and explore premium properties with a clean real estate experience."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/80 shadow-xs hover:shadow-xl dark:hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-colors duration-300 ${feature.iconClass}`}
                >
                  <feature.icon />
                </div>

                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {offerListings.length > 0 && (
        <section className="px-4 pb-14 sm:px-6 lg:pb-20 transition-colors duration-300">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl transition-colors duration-300">
            <Swiper
              modules={[Navigation, Autoplay]}
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
                  <Link
                    to={`/listing/${listing._id}`}
                    className="relative block h-[360px] overflow-hidden sm:h-[460px] lg:h-[520px]"
                  >
                    <img
                      src={listing.imageUrls?.[0] || "/bg-img.jpg"}
                      alt={listing.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                      <span className="mb-4 inline-flex rounded-full bg-yellow-500 px-4 py-1 text-xs font-black uppercase tracking-[0.16em] text-black">
                        Hot Offer
                      </span>
                      <h2 className="max-w-3xl font-serif text-3xl font-black leading-tight text-white sm:text-5xl">
                        {listing.name}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                        {listing.description}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <section className="px-4 pb-16 sm:px-6 lg:pb-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <RecentlyViewed
            title="Recently Viewed"
            description="Pick up where you left off"
            gridClassName={listingGridClass}
            className="py-10 lg:py-14"
            limit={3}
          />

          {loading ? (
            <ListingSkeletonGrid />
          ) : error ? (
            <ListingsMessage
              title="Listings could not load"
              description={error}
              tone="error"
              action={
                <button
                  type="button"
                  onClick={fetchListings}
                  className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-yellow-400"
                >
                  Try Again
                </button>
              }
            />
          ) : !hasListings ? (
            <ListingsMessage
              title="No listings yet"
              description="There are no featured properties to show right now. Explore the full search page."
              action={
                <Link
                  to="/search"
                  className="mt-6 inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-yellow-400"
                >
                  Explore Search
                </Link>
              }
            />
          ) : (
            <>
              <HomeListingSection
                eyebrow="Featured Deals"
                title="Hot Offers"
                description="Best deals available right now."
                linkTo="/search?offer=true"
                listings={offerListings}
              />

              <HomeListingSection
                eyebrow="Rentals"
                title="For Rent"
                description="Explore move-in-ready rental properties."
                linkTo="/search?type=rent"
                listings={rentListings}
              />

              <HomeListingSection
                eyebrow="Ownership"
                title="For Sale"
                description="Browse premium homes available to buy."
                linkTo="/search?type=sale"
                listings={saleListings}
              />
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
});

Home.displayName = "Home";

export default Home;