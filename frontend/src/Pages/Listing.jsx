import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaBath, FaBed, FaChair,
  FaMapMarkerAlt, FaParking, FaShare, FaTag,
} from "react-icons/fa";
import Contact from "../components/Contact";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) { setError(true); setLoading(false); return; }
        setListing(data);
        setError(false);
      } catch  {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) return (
    <div style={{ background: "#0b0c0e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "2px solid rgba(201,168,76,0.2)", borderTop: "2px solid #c9a84c", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#475569", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Loading Property…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ background: "#0b0c0e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#f87171", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem" }}>Something went wrong. Please try again.</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lst-page {
          font-family: 'DM Sans', sans-serif;
          background: #0b0c0e;
          min-height: 100vh;
          padding-bottom: 80px;
          color: #f0ece4;
        }

        /* ── SWIPER ── */
        .lst-swiper-wrap { position: relative; }
        .lst-slide {
          height: 620px;
          background-size: cover !important;
          background-position: center !important;
          position: relative;
        }
        .lst-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(11,12,14,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
        }

        /* swiper nav gold */
        .lst-swiper-wrap .swiper-button-next,
        .lst-swiper-wrap .swiper-button-prev {
          color: #c9a84c !important;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          width: 44px; height: 44px;
          padding: 0.4rem;
        }
        .lst-swiper-wrap .swiper-button-next::after,
        .lst-swiper-wrap .swiper-button-prev::after { font-size: 1rem !important; }

        /* ── SHARE BTN ── */
        .lst-share {
          position: fixed;
          top: 18%;
          right: 3%;
          z-index: 30;
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(17,19,24,0.9);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #c9a84c;
          font-size: 1rem;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .lst-share:hover {
          transform: scale(1.1);
          border-color: #c9a84c;
          box-shadow: 0 4px 24px rgba(201,168,76,0.2);
        }

        .lst-copied {
          position: fixed;
          top: calc(18% + 60px);
          right: 3%;
          z-index: 30;
          background: #111318;
          border: 1px solid rgba(201,168,76,0.3);
          color: #c9a84c;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          backdrop-filter: blur(12px);
        }

        /* ── CONTENT CARD ── */
        .lst-card {
          max-width: 920px;
          margin: -80px auto 0;
          position: relative;
          z-index: 10;
          padding: 0 1.5rem;
        }

        .lst-card-inner {
          background: #111318;
          border: 1px solid rgba(201,168,76,0.13);
          border-radius: 24px;
          padding: 44px 40px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7);
          position: relative;
          overflow: hidden;
        }

        /* gold top line */
        .lst-card-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(201,168,76,0.7) 40%,
            rgba(232,201,122,0.9) 55%, rgba(201,168,76,0.5) 75%, transparent 100%
          );
        }

        /* ambient glow */
        .lst-card-inner::after {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── TITLE ── */
        .lst-eyebrow {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .lst-eyebrow::before, .lst-eyebrow::after {
          content: ''; display: block;
          width: 20px; height: 1px;
          background: #c9a84c; opacity: 0.5;
        }

        .lst-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          color: #f0ece4;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        /* ── PRICE BADGES ── */
        .lst-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }

        .lst-price-badge {
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.3);
          color: #e8c97a;
          padding: 10px 22px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.02em;
        }

        .lst-discount-badge {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #4ade80;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex; align-items: center; gap: 7px;
        }

        .lst-type-badge {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .badge-rent {
          background: rgba(74,143,232,0.1);
          border: 1px solid rgba(74,143,232,0.25);
          color: #60a5fa;
        }
        .badge-sale {
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          color: #c9a84c;
        }
        .badge-furnished {
          background: rgba(155,111,232,0.1);
          border: 1px solid rgba(155,111,232,0.2);
          color: #a78bfa;
        }

        /* ── ADDRESS ── */
        .lst-address {
          display: flex; align-items: center; gap: 10px;
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .lst-address svg { color: #c9a84c; flex-shrink: 0; }

        /* ── DIVIDER ── */
        .lst-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 28px 0;
        }

        /* ── SECTION HEADING ── */
        .lst-section-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #e8e4dc;
          margin-bottom: 14px;
        }

        /* ── DESCRIPTION ── */
        .lst-desc {
          color: #64748b;
          line-height: 1.85;
          font-size: 0.92rem;
        }

        /* ── FEATURES GRID ── */
        .lst-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
          margin-top: 4px;
        }

        .lst-feat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 22px 16px;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .lst-feat-card:hover {
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-3px);
        }

        .lst-feat-icon {
          font-size: 1.6rem;
        }

        .lst-feat-val {
          font-weight: 700;
          font-size: 1.1rem;
          color: #f0ece4;
        }

        .lst-feat-label {
          font-size: 0.75rem;
          color: #475569;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── CONTACT BUTTON ── */
        .btn-contact {
          width: 100%;
          background: #c9a84c;
          color: #0b0c0e;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 4px 24px rgba(201,168,76,0.25);
        }
        .btn-contact:hover {
          background: #e8c97a;
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(201,168,76,0.35);
        }

        @media (max-width: 600px) {
          .lst-card-inner { padding: 28px 20px; }
        }
      `}</style>

      <main className="lst-page">
        {listing && (
          <>
            {/* ── SWIPER ── */}
            <div className="lst-swiper-wrap">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                speed={800}
              >
                {listing.imageUrls?.map((url, i) => (
                  <SwiperSlide key={i}>
                    <div className="lst-slide" style={{ background: `url(${url})` }}>
                      <div className="lst-slide-overlay" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ── SHARE ── */}
            <button
              className="lst-share"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <FaShare />
            </button>
            {copied && <div className="lst-copied">Link Copied ✓</div>}

            {/* ── CARD ── */}
            <div className="lst-card">
              <div className="lst-card-inner">

                {/* eyebrow + title */}
                <div className="lst-eyebrow">Property Details</div>
                <h1 className="lst-title">{listing.name}</h1>

              
               {/* price */}
<div className="lst-badges">

  <div className="lst-price-badge">

    ₹{
      (
        listing.offer
          ? (listing.discountPrice || 0)
          : (listing.regularPrice || 0)
      ).toLocaleString("en-IN")
    }

    {listing.type === "rent" && (

      <span
        style={{
          fontSize: "0.75rem",
          opacity: 0.7,
        }}
      >
        {" "} / month
      </span>

    )}

  </div>

  {listing.offer && (

    <div className="lst-discount-badge">

      <FaTag
        style={{
          fontSize: "0.8rem",
        }}
      />

      ₹{
        (
          (+listing.regularPrice || 0) -
          (+listing.discountPrice || 0)
        ).toLocaleString("en-IN")
      } OFF

    </div>

  )}

</div>

                {/* type badges */}
                <div className="lst-badges">
                  <span className={`lst-type-badge ${listing.type === "rent" ? "badge-rent" : "badge-sale"}`}>
                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                  </span>
                  {listing.furnished && <span className="lst-type-badge badge-furnished">Furnished</span>}
                </div>

                {/* address */}
                <div className="lst-address">
                  <FaMapMarkerAlt />
                  <span>{listing.address}</span>
                </div>

                <hr className="lst-divider" />

                {/* description */}
                <h2 className="lst-section-h">Description</h2>
                <p className="lst-desc">{listing.description}</p>

                <hr className="lst-divider" />

                {/* features */}
                <h2 className="lst-section-h">Property Features</h2>
                <div className="lst-features-grid">
                  {[
                    { icon: <FaBed />,     color: "#c9a84c", val: listing.bedrooms,               label: "Bedrooms"  },
                    { icon: <FaBath />,    color: "#4a8fe8", val: listing.bathrooms,              label: "Bathrooms" },
                    { icon: <FaParking />, color: "#e8a84c", val: listing.parking ? "Yes" : "No", label: "Parking"   },
                    { icon: <FaChair />,   color: "#9b6fe8", val: listing.furnished ? "Yes" : "No", label: "Furnished" },
                  ].map(({ icon, color, val, label }) => (
                    <div className="lst-feat-card" key={label}>
                      <span className="lst-feat-icon" style={{ color }}>{icon}</span>
                      <span className="lst-feat-val">{val}</span>
                      <span className="lst-feat-label">{label}</span>
                    </div>
                  ))}
                </div>

                <hr className="lst-divider" />

                {/* contact */}
                {!contact ? (
                  <button className="btn-contact" onClick={() => setContact(true)}>
                    Contact Owner
                  </button>
                ) : (
                  <Contact listing={listing} />
                )}

              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Listing;