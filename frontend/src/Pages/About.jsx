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
    color: "#c9a84c",
    bg: "rgba(201,168,76,0.1)",
    border: "rgba(201,168,76,0.2)",
    title: "Smart Property Listings",
    desc: "Explore premium properties with detailed descriptions, images, pricing, and advanced search functionality.",
  },
  {
    icon: <FaSearchLocation />,
    color: "#4a8fe8",
    bg: "rgba(74,143,232,0.1)",
    border: "rgba(74,143,232,0.2)",
    title: "Easy Property Search",
    desc: "Quickly search and filter properties based on type, pricing, location, and facilities.",
  },
  {
    icon: <FaBuilding />,
    color: "#9b6fe8",
    bg: "rgba(155,111,232,0.1)",
    border: "rgba(155,111,232,0.2)",
    title: "Buy • Sell • Rent",
    desc: "Users can easily list properties for sale or rent and connect directly with interested clients.",
  },
  {
    icon: <FaHandshake />,
    color: "#e8a84c",
    bg: "rgba(232,168,76,0.1)",
    border: "rgba(232,168,76,0.2)",
    title: "Trusted Experience",
    desc: "We provide a reliable platform designed to create trust between buyers, sellers, and renters.",
  },
  {
    icon: <FaUsers />,
    color: "#e86ba8",
    bg: "rgba(232,107,168,0.1)",
    border: "rgba(232,107,168,0.2)",
    title: "User Friendly",
    desc: "Clean design and smooth navigation make the platform simple and enjoyable for every user.",
  },
  {
    icon: <FaShieldAlt />,
    color: "#e86b6b",
    bg: "rgba(232,107,107,0.1)",
    border: "rgba(232,107,107,0.2)",
    title: "Secure Platform",
    desc: "Authentication and protected routes ensure safe account access and secure property management.",
  },
];

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .about-page {
          font-family: 'DM Sans', sans-serif;
          background: #0b0c0e;
          min-height: 100vh;
          color: #f0ece4;
        }

        /* ── HERO BAND ── */
        .about-hero {
          position: relative;
          padding: 100px 2rem 80px;
          overflow: hidden;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .about-hero::before {
          content: '';
          position: absolute;
          top: -120px; left: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-hero::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(201,168,76,0.7) 40%,
            rgba(232,201,122,0.9) 55%,
            rgba(201,168,76,0.5) 75%,
            transparent 100%
          );
        }

        .about-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 18px;
        }
        .about-eyebrow::before,
        .about-eyebrow::after {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: #c9a84c;
          opacity: 0.5;
        }

        .about-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1.05;
          color: #f0ece4;
          margin-bottom: 1.4rem;
        }
        .about-h1 em {
          font-style: italic;
          color: #c9a84c;
        }

        .about-lead {
          color: #64748b;
          font-size: 1.05rem;
          line-height: 1.85;
          max-width: 680px;
        }

        /* ── MISSION / WHY ── */
        .about-cards-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media(max-width: 680px) {
          .about-cards-section { grid-template-columns: 1fr; }
        }

        .about-info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 36px 32px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .about-info-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .about-info-card:hover {
          border-color: rgba(201,168,76,0.22);
          transform: translateY(-5px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .about-info-card:hover::before { opacity: 1; }

        .gold-divider {
          width: 40px; height: 2px;
          background: #c9a84c;
          border-radius: 2px;
          margin-bottom: 14px;
        }

        .about-info-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #f0ece4;
          margin-bottom: 14px;
        }

        .about-info-card p {
          color: #64748b;
          line-height: 1.8;
          font-size: 0.92rem;
        }

        /* ── FEATURES ── */
        .about-features-section {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 72px 2rem 90px;
        }
        .about-features-inner { max-width: 1100px; margin: 0 auto; }

        .about-features-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .about-features-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #f0ece4;
        }
        .about-features-header p {
          color: #475569;
          font-size: 0.9rem;
          margin-top: 8px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.4rem;
        }

        .feature-card {
          background: #111318;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--card-glow) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: var(--card-border);
          box-shadow: 0 20px 50px rgba(0,0,0,0.55);
        }
        .feature-card:hover::after { opacity: 1; }

        .feature-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-bottom: 18px;
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          color: var(--card-color);
          position: relative;
          z-index: 1;
        }

        .feature-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #e8e4dc;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .feature-card p {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.75;
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="about-page">

        {/* ── HERO ── */}
        <div className="about-hero">
          <div className="about-hero-inner">
            <div className="about-eyebrow">Who We Are</div>
            <h1 className="about-h1">
              About <em>Royal</em>Estate
            </h1>
            <p className="about-lead">
              RoyalEstate is a modern real estate platform built to simplify the way
              people buy, sell, and rent properties. We connect property owners with
              buyers and renters through a fast, secure, and user-friendly experience.
            </p>
          </div>
        </div>

        {/* ── MISSION / WHY ── */}
        <div className="about-cards-section">
          <div className="about-info-card">
            <div className="gold-divider" />
            <h2>Our Mission</h2>
            <p>
              Our mission is to make real estate simple, transparent, and accessible
              for everyone. Whether you're searching for your dream home, looking for
              rental properties, or planning to sell — RoyalEstate provides all the
              tools and support you need.
            </p>
          </div>
          <div className="about-info-card">
            <div className="gold-divider" />
            <h2>Why Choose Us?</h2>
            <p>
              We focus on delivering trusted listings, easy property management,
              secure communication, and a smooth browsing experience. Our goal is to
              help users save time and make confident real estate decisions.
            </p>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="about-features-section">
          <div className="about-features-inner">
            <div className="about-features-header">
              <div className="about-eyebrow" style={{ justifyContent: "center" }}>
                What We Offer
              </div>
              <h2>Platform Features</h2>
              <p>Everything you need to find, list, or manage properties</p>
            </div>

            <div className="features-grid">
              {features.map(({ icon, color, bg, border, title, desc }) => (
                <div
                  className="feature-card"
                  key={title}
                  style={{
                    "--card-color": color,
                    "--card-bg": bg,
                    "--card-border": border,
                    "--card-glow": bg,
                  }}
                >
                  <div className="feature-icon-wrap">{icon}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}