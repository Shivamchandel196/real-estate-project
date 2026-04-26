import { useState } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = ({ listing }) => {
  const [message, setMessage] = useState("");
  const [ setFocused] = useState(false);

  return (
    <>
      <style>{`
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
        }

        .ct-root {
          font-family: 'DM Sans', sans-serif;
          margin-top: 2rem;
        }

        /* ── CARD ── */
        .ct-card {
          background: var(--dark-3);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }

        /* gold top bar */
        .ct-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light), transparent);
        }

        /* ambient gold glow top-left */
        .ct-card::after {
          content: '';
          position: absolute;
          top: -60px; left: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── HEADER ── */
        .ct-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .ct-eyebrow::before,
        .ct-eyebrow::after {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }
        .ct-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .ct-title span { color: var(--gold); font-style: italic; }
        .ct-subtitle {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-bottom: 1.6rem;
        }
        .ct-gold-divider {
          width: 36px; height: 2px;
          background: var(--gold);
          border-radius: 2px;
          margin-bottom: 1.4rem;
        }

        /* ── INFO CARD ── */
        .ct-info-card {
          background: var(--dark-4);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-bottom: 1.4rem;
        }
        .ct-info-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .ct-info-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.82rem;
        }
        .ct-icon-email {
          background: rgba(74,143,232,0.12);
          border: 1px solid rgba(74,143,232,0.2);
          color: var(--accent-blue);
        }
        .ct-icon-phone {
          background: rgba(76,175,130,0.12);
          border: 1px solid rgba(76,175,130,0.2);
          color: var(--green);
        }
        .ct-info-text {
          font-size: 0.87rem;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }
        .ct-info-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin: 0;
        }

        /* ── TEXTAREA ── */
        .ct-msg-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }
        .ct-msg-wrap {
          position: relative;
          margin-bottom: 1.4rem;
        }
        .ct-textarea {
          width: 100%;
          background: var(--dark-4);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 1rem 1.1rem;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          resize: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
          line-height: 1.6;
        }
        .ct-textarea::placeholder { color: var(--text-muted); }
        .ct-textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px var(--gold-glow);
        }
        .ct-char-count {
          position: absolute;
          bottom: 12px; right: 14px;
          font-size: 0.68rem;
          color: var(--text-muted);
          pointer-events: none;
          transition: color 0.2s;
        }
        .ct-char-count.active { color: var(--gold); }

        /* ── BUTTONS ── */
        .ct-btn-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }
        @media (min-width: 480px) {
          .ct-btn-grid { grid-template-columns: 1fr 1fr; }
        }

        /* Email button — gold outline style */
        .ct-btn-email {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.2rem;
          border-radius: 7px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--gold);
          background: transparent;
          border: 1px solid rgba(201,168,76,0.35);
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.2s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .ct-btn-email::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent);
          transition: left 0.45s ease;
        }
        .ct-btn-email:hover::before { left: 100%; }
        .ct-btn-email:hover {
          background: var(--gold);
          color: #0b0c0e;
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px var(--gold-glow);
        }
        .ct-btn-email .ct-btn-icon {
          display: flex;
          background: rgba(201,168,76,0.15);
          border-radius: 6px;
          padding: 5px;
          font-size: 0.75rem;
          transition: background 0.2s;
        }
        .ct-btn-email:hover .ct-btn-icon { background: rgba(11,12,14,0.15); }

        /* WhatsApp button — green tint */
        .ct-btn-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.2rem;
          border-radius: 7px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--green);
          background: rgba(76,175,130,0.08);
          border: 1px solid rgba(76,175,130,0.25);
          transition: background 0.25s, border-color 0.25s, transform 0.2s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .ct-btn-whatsapp::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(76,175,130,0.08), transparent);
          transition: left 0.45s ease;
        }
        .ct-btn-whatsapp:hover::before { left: 100%; }
        .ct-btn-whatsapp:hover {
          background: rgba(76,175,130,0.18);
          border-color: rgba(76,175,130,0.5);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(76,175,130,0.15);
        }
        .ct-btn-whatsapp .ct-btn-icon {
          display: flex;
          background: rgba(76,175,130,0.15);
          border-radius: 6px;
          padding: 5px;
          font-size: 0.85rem;
          transition: background 0.2s;
        }
        .ct-btn-whatsapp:hover .ct-btn-icon { background: rgba(76,175,130,0.28); }
      `}</style>

      <div className="ct-root">
        <div className="ct-card">

          {/* ── HEADER ── */}
          <div className="ct-eyebrow">Get In Touch</div>
          <h2 className="ct-title">Contact <span>Owner</span></h2>
          <p className="ct-subtitle">Connect directly with the property owner</p>
          <div className="ct-gold-divider" />

          {/* ── CONTACT INFO ── */}
          <div className="ct-info-card">
            <div className="ct-info-row">
              <div className="ct-info-icon ct-icon-email">
                <FaEnvelope />
              </div>
              <span className="ct-info-text">{listing.contactEmail}</span>
            </div>
            <hr className="ct-info-divider" />
            <div className="ct-info-row">
              <div className="ct-info-icon ct-icon-phone">
                <FaPhoneAlt />
              </div>
              <span className="ct-info-text">{listing.contactNumber}</span>
            </div>
          </div>

          {/* ── MESSAGE ── */}
          <div className="ct-msg-label">Your Message</div>
          <div className="ct-msg-wrap">
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Hi, I'm interested in this property…"
              className="ct-textarea"
            />
            <span className={`ct-char-count ${message.length > 0 ? "active" : ""}`}>
              {message.length}
            </span>
          </div>

          {/* ── BUTTONS ── */}
          <div className="ct-btn-grid">
            <a
              href={`mailto:${listing.contactEmail}?subject=Regarding ${listing.name}&body=${message}`}
              className="ct-btn-email"
            >
              <span className="ct-btn-icon"><FaPaperPlane /></span>
              Send Email
            </a>

            <a
              href={`https://wa.me/${listing.contactNumber}?text=${encodeURIComponent(
                message || `Hi, I'm interested in ${listing.name}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-btn-whatsapp"
            >
              <span className="ct-btn-icon"><FaWhatsapp /></span>
              WhatsApp
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;