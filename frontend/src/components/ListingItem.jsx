import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaHeart, FaShareAlt } from "react-icons/fa";

/* ─── Same gold/dark pattern as Home.jsx ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --gold:        #c9a84c;
    --gold-light:  #e8c97a;
    --gold-glow:   rgba(201,168,76,0.25);
    --dark:        #0b0c0e;
    --dark-3:      #1a1d24;
    --dark-4:      #22262f;
    --text-primary:  #f0ece4;
    --text-muted:    #8a8d96;
    --accent-blue:   #4a8fe8;
    --green:         #4caf82;
    --red:           #e86b6b;
  }

  /* ── CARD ── */
  .li-card {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark-3);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
    width: 100%;
    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    position: relative;
  }
  .li-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-glow) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.35s;
    pointer-events: none;
    z-index: 1;
    border-radius: 14px;
  }
  .li-card:hover {
    transform: translateY(-6px);
    border-color: rgba(201,168,76,0.45);
    box-shadow: 0 16px 48px rgba(0,0,0,0.55);
  }
  .li-card:hover::before { opacity: 1; }

  /* ── IMAGE ── */
  .li-img-wrap {
    position: relative;
    overflow: hidden;
    height: 220px;
  }
  .li-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .li-card:hover .li-img { transform: scale(1.07); }

  /* dark gradient over image bottom */
  .li-img-wrap::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 50%;
    background: linear-gradient(to top, rgba(11,12,14,0.7), transparent);
    pointer-events: none;
  }

  /* ── BADGES ── */
  .li-badge-type {
    position: absolute;
    top: 12px; left: 12px;
    z-index: 2;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    background: var(--accent-blue);
    color: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.4);
  }
  .li-badge-offer {
    position: absolute;
    top: 12px; right: 12px;
    z-index: 2;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    background: var(--gold);
    color: #0b0c0e;
    box-shadow: 0 2px 10px var(--gold-glow);
  }

  /* ── CONTENT ── */
  .li-content {
    padding: 1.3rem 1.3rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    z-index: 2;
  }

  /* ── TITLE ── */
  .li-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  /* ── LOCATION ── */
  .li-location {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--text-muted);
    font-size: 0.82rem;
  }
  .li-location-icon { color: var(--green); font-size: 1rem; flex-shrink: 0; }
  .li-location p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── DESCRIPTION ── */
  .li-desc {
    color: var(--text-muted);
    font-size: 0.83rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── PRICE ROW ── */
  .li-price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .li-price {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--gold);
    line-height: 1;
  }
  .li-price-period {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
    font-weight: 400;
  }

  /* icon buttons */
  .li-icon-btns {
    display: flex;
    gap: 0.5rem;
  }
  .li-icon-btn {
    background: var(--dark-4);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 50%;
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .li-icon-btn:hover {
    border-color: var(--gold);
    background: var(--gold-glow);
    transform: scale(1.1);
  }
  .li-icon-btn svg { font-size: 0.85rem; }

  /* ── FEATURES ── */
  .li-features {
    display: flex;
    gap: 0.6rem;
  }
  .li-feature-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--dark-4);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 0.38rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    flex: 1;
    justify-content: center;
  }
  .li-feature-pill svg { font-size: 0.85rem; }
  .li-feat-bed  { color: var(--accent-blue); }
  .li-feat-bath { color: var(--green); }

  /* ── VIEW BUTTON ── */
  .li-view-btn {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(201,168,76,0.35);
    color: var(--gold);
    padding: 0.72rem;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s, border-color 0.25s, transform 0.2s, box-shadow 0.25s;
    margin-top: 0.2rem;
  }
  .li-view-btn:hover {
    background: var(--gold);
    color: #0b0c0e;
    border-color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 6px 24px var(--gold-glow);
  }
`;

function InjectStyles() {
  useEffect(() => {
    const id = "li-global-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}

export default function ListingItem({ listing }) {
  return (
    <>
      <InjectStyles />
      <div className="li-card">
        <Link to={`/listing/${listing._id}`}>

         
          <div className="li-img-wrap">
            <img
              src={
                listing.imageUrls?.[0] ||
                "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg"
              }
              alt="listing cover"
              className="li-img"
            />

          
            <span className="li-badge-type">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </span>

        
            {listing.offer && (
              <span className="li-badge-offer">Offer 🔥</span>
            )}
          </div>

       
          <div className="li-content">

       
            <h2 className="li-title">{listing.name}</h2>

      
            <div className="li-location">
              <MdLocationOn className="li-location-icon" />
              <p>{listing.address}</p>
            </div>

     
            <p className="li-desc">{listing.description}</p>

  
            <div className="li-price-row">
              <div>
                <p className="li-price">
                  ${listing.offer
                    ? listing.discountPrice?.toLocaleString("en-US")
                    : listing.regularPrice?.toLocaleString("en-US")}
                </p>
                {listing.type === "rent" && (
                  <p className="li-price-period">per month</p>
                )}
              </div>

              <div className="li-icon-btns">
                <button
                  className="li-icon-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  <FaHeart style={{ color: "var(--red)" }} />
                </button>
                <button
                  className="li-icon-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  <FaShareAlt style={{ color: "var(--text-muted)" }} />
                </button>
              </div>
            </div>

         
            <div className="li-features">
              <div className="li-feature-pill">
                <FaBed className="li-feat-bed" />
                <span>{listing.bedrooms} Beds</span>
              </div>
              <div className="li-feature-pill">
                <FaBath className="li-feat-bath" />
                <span>{listing.bathrooms} Baths</span>
              </div>
            </div>

           
            <button className="li-view-btn">View Property</button>

          </div>
        </Link>
      </div>
    </>
  );
}