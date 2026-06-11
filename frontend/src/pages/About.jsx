import {
  FaBuilding,
  FaHandshake,
  FaHome,
  FaSearchLocation,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import Footer from "../components/Footer";

const features = [
  {
    icon: <FaHome />,
    title: "Smart Property Listings",
    desc:
      "Explore premium properties with clear pricing, rich details, and useful discovery tools.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: <FaSearchLocation />,
    title: "Easy Property Search",
    desc:
      "Filter by location, property type, pricing, amenities, and availability.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: <FaBuilding />,
    title: "Buy / Sell / Rent",
    desc:
      "List properties for sale or rent and connect directly with interested clients.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Experience",
    desc:
      "A focused platform designed to build confidence between buyers, renters, and sellers.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: <FaUsers />,
    title: "User Friendly",
    desc:
      "Clean navigation, readable information, and smooth workflows across devices.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    desc:
      "Authentication, protected routes, and account controls help keep listings safe.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
      
      {/* Hero Section */}
      <section className="border-b border-zinc-200 px-4 pb-16 pt-32 dark:border-yellow-500/10 sm:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Who We Are
          </p>

          <h1 className="max-w-5xl font-serif text-5xl font-black leading-[0.98] sm:text-6xl lg:text-7xl">
            About <span className="text-yellow-500">RoyalEstate</span>
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            RoyalEstate is a modern real estate platform built to simplify how
            people buy, sell, and rent properties. We connect property owners
            with buyers and renters through a fast, secure, and user-friendly
            experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        {[
          {
            title: "Our Mission",
            body:
              "Make real estate simple, transparent, and accessible for everyone. Whether you are searching for a dream home, rental property, or planning to sell, RoyalEstate gives you the tools to move confidently.",
          },
          {
            title: "Why Choose Us?",
            body:
              "We focus on trusted listings, secure communication, easy property management, and a smooth browsing experience that helps users make better property decisions.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-500/35 dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_18px_45px_rgba(0,0,0,0.32)] sm:p-8"
          >
            <div className="mb-6 h-1 w-12 rounded-full bg-yellow-500" />

            <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
              {item.title}
            </h2>

            <p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-400">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      {/* Features */}
      <section className="border-t border-zinc-200 px-4 py-14 dark:border-white/10 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
              What We Offer
            </p>

            <h2 className="font-serif text-4xl font-black text-zinc-900 dark:text-white sm:text-5xl">
              Platform Features
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-500">
              Everything you need to find, compare, or manage properties.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-md transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.bg} ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;