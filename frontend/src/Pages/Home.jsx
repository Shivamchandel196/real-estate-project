import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { FaHome, FaSearch, FaBuilding, FaShieldAlt } from "react-icons/fa";
import Footer from '../components/Footer.jsx'

/* ─── Inline styles injected once ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --gold:        #c9a84c;
    --gold-light:  #e8c97a;
    --gold-glow:   rgba(201,168,76,0.25);
    --dark:        #0b0c0e;
    --dark-2:      #111318;
    --dark-3:      #1a1d24;
    --dark-4:      #22262f;
    --text-primary:   #f0ece4;
    --text-muted:     #8a8d96;
    --accent-blue:    #4a8fe8;
  }

  /* reset background on html/body if needed */
  body { background: var(--dark); }

  /* ── page wrapper ── */
  .re-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: var(--text-primary);
    min-height: 100vh;
  }

  /* ── HERO ── */
  .re-hero {
    position: relative;
    height: 100svh;
    overflow: hidden;
  }
  .re-hero video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .re-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0,0,0,0.82) 0%,
      rgba(11,12,14,0.65) 60%,
      rgba(0,0,0,0.90) 100%
    );
  }
  .re-hero-content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .re-hero-inner { max-width: 720px; }

  .re-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
  }
  .re-hero-eyebrow::before,
  .re-hero-eyebrow::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
    opacity: 0.6;
  }

  .re-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 900;
    line-height: 1.05;
    color: var(--text-primary);
    margin: 0 0 1.5rem;
    animation: fadeUp 0.9s ease both;
  }
  .re-hero h1 span {
    color: var(--gold);
    font-style: italic;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .re-hero-sub {
    color: #b0b4bf;
    font-size: 1.1rem;
    line-height: 1.8;
    max-width: 520px;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.9s 0.18s ease both;
  }

  .re-hero-btns {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: fadeUp 0.9s 0.35s ease both;
  }
  .btn-gold {
    background: var(--gold);
    color: #0b0c0e;
    padding: 0.9rem 2.2rem;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    box-shadow: 0 4px 24px var(--gold-glow);
  }
  .btn-gold:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 36px var(--gold-glow);
  }
  .btn-outline {
    border: 1px solid rgba(201,168,76,0.4);
    color: var(--text-primary);
    padding: 0.9rem 2.2rem;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: border-color 0.25s, background 0.25s, transform 0.2s;
    backdrop-filter: blur(4px);
  }
  .btn-outline:hover {
    background: rgba(201,168,76,0.1);
    border-color: var(--gold);
    transform: translateY(-2px);
  }

  /* ── FEATURES ── */
  .re-features {
    max-width: 1280px;
    margin: 0 auto;
    padding: 6rem 2rem;
  }
  .re-section-label {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 0.6rem;
  }
  .re-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 3.5rem;
    line-height: 1.2;
  }

  .re-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.5rem;
  }
  .re-feature-card {
    background: var(--dark-3);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 2.4rem 2rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  }
  .re-feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-glow) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.35s;
  }
  .re-feature-card:hover { transform: translateY(-6px); border-color: var(--gold); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
  .re-feature-card:hover::before { opacity: 1; }

  .re-feature-icon {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    display: block;
  }
  .re-feature-card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.6rem;
  }
  .re-feature-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.65; }

  /* ── SWIPER ── */
  .re-swiper-wrap {
    max-width: 1280px;
    margin: 0 auto 6rem;
    padding: 0 2rem;
  }
  .re-swiper-slide {
    height: 560px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }
  .re-swiper-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
  }
  .re-swiper-overlay h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.6rem;
  }
  .re-swiper-overlay p { color: #c8cdd8; font-size: 1rem; max-width: 600px; line-height: 1.7; }

  /* gold swiper nav */
  .re-swiper-wrap .swiper-button-next,
  .re-swiper-wrap .swiper-button-prev {
    color: var(--gold) !important;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    padding: 0.5rem;
  }
  .re-swiper-wrap .swiper-button-next::after,
  .re-swiper-wrap .swiper-button-prev::after {
    font-size: 1rem !important;
  }

  /* ── LISTINGS SECTION ── */
  .re-listings {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }

  .re-section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding-bottom: 1.5rem;
  }
  .re-section-header a {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    border: 1px solid rgba(201,168,76,0.35);
    padding: 0.45rem 1.1rem;
    border-radius: 3px;
    transition: background 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  .re-section-header a:hover { background: var(--gold-glow); border-color: var(--gold); }

  .re-section-header-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.1;
  }
  .re-section-header-left p { color: var(--text-muted); margin-top: 0.4rem; font-size: 0.9rem; }

  .re-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1.5rem;
  }

  /* ── divider ── */
  .re-gold-divider {
    width: 48px; height: 3px;
    background: var(--gold);
    border-radius: 2px;
    margin-bottom: 0.8rem;
  }
`;

function InjectStyles() {
  useEffect(() => {
    const id = "re-global-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => { /* keep styles */ };
  }, []);
  return null;
}

const ICON_COLORS = {
  home:    "#c9a84c",
  search:  "#4a8fe8",
  build:   "#9b6fe8",
  shield:  "#e86b6b",
};

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings,  setSaleListings]  = useState([]);
  const [rentListings,  setRentListings]  = useState([]);

  SwiperCore.use([Navigation, Autoplay]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch("/api/listing/get?offer=true&limit=4"),
          fetch("/api/listing/get?type=rent&limit=4"),
          fetch("/api/listing/get?type=sale&limit=4"),
        ]);
        const [offerData, rentData, saleData] = await Promise.all([
          offerRes.json(), rentRes.json(), saleRes.json(),
        ]);
        setOfferListings(Array.isArray(offerData) ? offerData : []);
        setRentListings(Array.isArray(rentData)  ? rentData  : []);
        setSaleListings(Array.isArray(saleData)  ? saleData  : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="re-page">
      <InjectStyles />

      {/* ─── HERO ─── */}
      <div className="re-hero">
        <video autoPlay loop muted playsInline>
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="re-hero-overlay" />

        <div className="re-hero-content">
          <div className="re-hero-inner">
            <div className="re-hero-eyebrow">Premium Real Estate</div>

            <h1>
              Find Your <span>Dream</span><br />Home
            </h1>

            <p className="re-hero-sub">
              Discover premium homes, apartments, villas, and rental
              properties with RoyalEstate — curated for the discerning buyer.
            </p>

            <div className="re-hero-btns">
              <Link to="/search" className="btn-gold">
                Explore Properties
              </Link>
              <Link to="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <div className="re-features">
        <p className="re-section-label">Why RoyalEstate</p>
        <h2 className="re-section-title">
          Everything You Need,<br />In One Place
        </h2>

        <div className="re-features-grid">
          {[
            { icon: <FaHome />,      color: ICON_COLORS.home,   title: "Premium Homes",     desc: "Luxury apartments, villas & bungalows curated for refined living." },
            { icon: <FaSearch />,    color: ICON_COLORS.search,  title: "Smart Search",      desc: "Advanced filters to find exactly what you're looking for, fast." },
            { icon: <FaBuilding />,  color: ICON_COLORS.build,   title: "Buy & Rent",        desc: "Flexible options — explore both rental and sale properties easily." },
            { icon: <FaShieldAlt />, color: ICON_COLORS.shield,  title: "Trusted Platform",  desc: "Verified listings & secure transactions you can count on." },
          ].map(({ icon, color, title, desc }) => (
            <div className="re-feature-card" key={title}>
              <span className="re-feature-icon" style={{ color }}>{icon}</span>
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SWIPER ─── */}
      {offerListings.length > 0 && (
        <div className="re-swiper-wrap">
          <Swiper
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            speed={800}
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  className="re-swiper-slide"
                  style={{
                    background: `url(${listing.imageUrls?.[0]}) center/cover no-repeat`,
                  }}
                >
                  <div className="re-swiper-overlay">
                    <div className="re-gold-divider" />
                    <h2>{listing.name}</h2>
                    <p>{listing.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* ─── LISTINGS ─── */}
      <div className="re-listings">

        {/* HOT OFFERS */}
        {offerListings.length > 0 && (
          <section>
            <div className="re-section-header">
              <div className="re-section-header-left">
                <div className="re-gold-divider" />
                <h2>Hot Offers 🔥</h2>
                <p>Best deals available right now</p>
              </div>
              <Link to="/search?offer=true">View All</Link>
            </div>
            <div className="re-grid">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {/* FOR RENT */}
        {rentListings.length > 0 && (
          <section>
            <div className="re-section-header">
              <div className="re-section-header-left">
                <div className="re-gold-divider" />
                <h2>For Rent</h2>
                <p>Explore rental properties</p>
              </div>
              <Link to="/search?type=rent">View All</Link>
            </div>
            <div className="re-grid">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {/* FOR SALE */}
        {saleListings.length > 0 && (
          <section>
            <div className="re-section-header">
              <div className="re-section-header-left">
                <div className="re-gold-divider" />
                <h2>For Sale</h2>
                <p>Buy premium homes</p>
              </div>
              <Link to="/search?type=sale">View All</Link>
            </div>
            <div className="re-grid">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </section>
        )}
         
      </div>
      <Footer/>
    </div>
  );
}