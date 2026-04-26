import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* ─── Same gold/dark pattern as Home.jsx ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --gold:       #c9a84c;
    --gold-light: #e8c97a;
    --gold-glow:  rgba(201,168,76,0.25);
    --dark-4:     #22262f;
    --text-primary: #f0ece4;
    --text-muted:   #8a8d96;
  }

  /* ── GOOGLE BUTTON ── */
  .oauth-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    width: 100%;
    padding: 0.85rem 1.5rem;
    background: var(--dark-4);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.25s, background 0.25s, transform 0.2s, box-shadow 0.25s;
    overflow: hidden;
  }
  .oauth-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-glow) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .oauth-btn:hover {
    border-color: var(--gold);
    background: #2a2f3a;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0,0,0,0.4);
  }
  .oauth-btn:hover::before { opacity: 1; }
  .oauth-btn:active { transform: translateY(0); }

  /* Google "G" SVG icon */
  .oauth-google-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
  .oauth-btn-text {
    position: relative;
    z-index: 1;
  }
`;

function InjectStyles() {
  useEffect(() => {
    const id = "oauth-global-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:  result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <>
      <InjectStyles />
      <button onClick={handleGoogleClick} type="button" className="oauth-btn">
        {/* Google "G" icon as inline SVG — no external dependency */}
        <svg className="oauth-google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.46 3.05 29.53 1 24 1 14.82 1 7.07 6.48 3.64 14.24l7.1 5.52C12.4 13.67 17.73 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.43 37.27 46.5 31.32 46.5 24.5z"/>
          <path fill="#FBBC05" d="M10.74 28.24A14.54 14.54 0 0 1 9.5 24c0-1.47.25-2.89.7-4.22l-7.1-5.52A23.94 23.94 0 0 0 .5 24c0 3.87.92 7.53 2.56 10.76l7.68-6.52z"/>
          <path fill="#34A853" d="M24 47c5.53 0 10.17-1.83 13.56-4.97l-7.18-5.58c-1.88 1.27-4.3 2.05-6.38 2.05-6.27 0-11.6-4.17-13.26-9.76l-7.68 6.52C7.07 41.52 14.82 47 24 47z"/>
        </svg>
        <span className="oauth-btn-text">Continue with Google</span>
      </button>
    </>
  );
};

export default OAuth;