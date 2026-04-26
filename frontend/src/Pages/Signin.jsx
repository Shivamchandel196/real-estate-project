import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

/* ─── Same gold/dark pattern as Home.jsx ─── */
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
    --red:            #e86b6b;
  }

  body { background: var(--dark); }

  /* ── PAGE ── */
  .si-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  /* ── CARD ── */
  .si-card {
    width: 100%;
    max-width: 440px;
    background: var(--dark-3);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 2.8rem 2.2rem 2.4rem;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.7s ease both;
  }
  .si-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), transparent);
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── HEADING ── */
  .si-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  .si-eyebrow::before,
  .si-eyebrow::after {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: var(--gold);
    opacity: 0.6;
  }
  .si-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 5vw, 2.6rem);
    font-weight: 900;
    text-align: center;
    color: var(--text-primary);
    margin-bottom: 0.3rem;
    line-height: 1.1;
  }
  .si-heading span { color: var(--gold); font-style: italic; }
  .si-subheading {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.88rem;
    margin-bottom: 2rem;
  }

  /* ── GOLD DIVIDER ── */
  .si-gold-divider {
    width: 36px; height: 2px;
    background: var(--gold);
    border-radius: 2px;
    margin: 0 auto 2rem;
  }

  /* ── FORM ── */
  .si-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* ── INPUTS ── */
  .si-input {
    width: 100%;
    background: var(--dark-4);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    padding: 0.85rem 1.1rem;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s;
    box-sizing: border-box;
  }
  .si-input::placeholder { color: var(--text-muted); }
  .si-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px var(--gold-glow);
  }

  /* ── BUTTON ── */
  .btn-gold {
    background: var(--gold);
    color: #0b0c0e;
    padding: 0.9rem 2rem;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    width: 100%;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    box-shadow: 0 4px 20px var(--gold-glow);
    margin-top: 0.3rem;
  }
  .btn-gold:hover:not(:disabled) {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px var(--gold-glow);
  }
  .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── DIVIDER WITH TEXT ── */
  .si-or-divider {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0.6rem 0;
  }
  .si-or-divider::before,
  .si-or-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .si-or-divider span {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* ── FOOTER LINK ── */
  .si-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.6rem;
    font-size: 0.88rem;
    color: var(--text-muted);
  }
  .si-footer a {
    color: var(--gold);
    font-weight: 600;
    transition: color 0.2s;
  }
  .si-footer a:hover { color: var(--gold-light); }

  /* ── ERROR ── */
  .si-error {
    color: var(--red);
    font-size: 0.84rem;
    padding: 0.6rem 1rem;
    background: rgba(232,107,107,0.08);
    border: 1px solid rgba(232,107,107,0.25);
    border-radius: 6px;
    margin-top: 0.4rem;
    text-align: center;
  }
`;

function InjectStyles() {
  useEffect(() => {
    const id = "si-global-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) { dispatch(signInFailure(data.message)); return; }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="si-page">
      <InjectStyles />

      <div className="si-card">
        {/* ── HEADING ── */}
        <div className="si-eyebrow">Welcome Back</div>
        <h1 className="si-heading">
          Sign <span>In</span>
        </h1>
        <p className="si-subheading">Access your RoyalEstate account</p>
        <div className="si-gold-divider" />

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit} className="si-form">
          <input
            type="email"
            placeholder="Email Address"
            className="si-input"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="si-input"
            id="password"
            onChange={handleChange}
          />

          <button disabled={loading} className="btn-gold">
            {loading ? "Signing In…" : "Sign In"}
          </button>

          <div className="si-or-divider"><span>or</span></div>

          <OAuth />
        </form>

        {/* ── FOOTER ── */}
        <div className="si-footer">
          <span>Don't have an account?</span>
          <Link to="/sign-up">Sign Up</Link>
        </div>

        {/* ── ERROR ── */}
        {error && <p className="si-error">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;