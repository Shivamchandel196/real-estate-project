import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    contactNumber: "",
    contactEmail: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: "",
    discountPrice: "",
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleImageSubmit = async () => {
    if (files.length === 0) return setImageUploadError("Please select images");
    if (files.length + formData.imageUrls.length > 6)
      return setImageUploadError("Maximum 6 images allowed");
    try {
      setUploading(true);
      setImageUploadError("");
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const imageData = new FormData();
        imageData.append("image", files[i]);
        const res = await axios.post("http://localhost:8000/post", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedUrls.push(res.data.imageUrl);
      }
      setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...uploadedUrls] }));
      setUploading(false);
    } catch  {
      setImageUploadError("Image upload failed");
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent")
      return setFormData((prev) => ({ ...prev, type: e.target.id }));
    if (["parking", "furnished", "offer"].includes(e.target.id))
      return setFormData((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    if (["number", "text", "email"].includes(e.target.type) || e.target.tagName === "TEXTAREA")
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) return setError("Upload at least one image");
    if (formData.offer && formData.discountPrice >= formData.regularPrice)
      return setError("Discount price must be less than regular price");
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:8000/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, userRef: currentUser.id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) return setError(data.message);
      navigate(`/listing/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cl-page {
          font-family: 'DM Sans', sans-serif;
          background: #0b0c0e;
          min-height: 100vh;
          padding: 60px 1rem 80px;
        }

        .cl-container {
          max-width: 1000px;
          margin: 0 auto;
          background: rgba(17, 19, 24, 0.95);
          border: 1px solid rgba(201,168,76,0.14);
          border-radius: 24px;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
        }

        /* gold top line */
        .cl-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(201,168,76,0.7) 40%,
            rgba(232,201,122,0.9) 55%,
            rgba(201,168,76,0.5) 75%,
            transparent 100%
          );
        }

        /* ambient glow */
        .cl-container::after {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── HEADER ── */
        .cl-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 10px;
        }
        .cl-eyebrow::before, .cl-eyebrow::after {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: #c9a84c;
          opacity: 0.5;
        }

        .cl-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #f0ece4;
          margin-bottom: 8px;
        }
        .cl-title em { font-style: italic; color: #c9a84c; }
        .cl-subtitle { color: #475569; font-size: 0.88rem; margin-bottom: 40px; }

        /* ── FORM GRID ── */
        .cl-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 700px) { .cl-form { grid-template-columns: 1fr; } }

        .cl-col { display: flex; flex-direction: column; gap: 14px; }

        /* ── SECTION LABEL ── */
        .cl-section-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a84c;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          margin-bottom: 2px;
        }

        /* ── INPUTS ── */
        .cl-input, .cl-textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 14px 16px;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          width: 100%;
          box-sizing: border-box;
        }
        .cl-input::placeholder, .cl-textarea::placeholder { color: #2d3748; }
        .cl-input:focus, .cl-textarea:focus {
          border-color: rgba(201,168,76,0.45);
          background: rgba(201,168,76,0.04);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
        }
        .cl-textarea { resize: none; min-height: 130px; line-height: 1.65; }

        /* number inputs — hide arrows */
        .cl-input[type='number']::-webkit-inner-spin-button,
        .cl-input[type='number']::-webkit-outer-spin-button { -webkit-appearance: none; }

        /* ── TOGGLE ROW (sale/rent) ── */
        .cl-toggle-group {
          display: flex;
          gap: 10px;
        }
        .cl-toggle {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        .cl-toggle input { display: none; }
        .cl-toggle.active {
          border-color: rgba(201,168,76,0.5);
          background: rgba(201,168,76,0.1);
          color: #c9a84c;
        }

        /* ── CHECKBOX FEATURES ── */
        .cl-checks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cl-check {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        .cl-check input { display: none; }
        .cl-check.active {
          border-color: rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.08);
          color: #c9a84c;
        }
        /* custom checkbox dot */
        .cl-check-dot {
          width: 14px; height: 14px;
          border-radius: 4px;
          border: 1px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 9px;
          transition: background 0.2s;
        }
        .cl-check.active .cl-check-dot { background: #c9a84c; border-color: #c9a84c; color: #0b0c0e; }

        /* ── FILE INPUT ── */
        .cl-file-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(201,168,76,0.25);
          border-radius: 10px;
          padding: 18px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
          position: relative;
        }
        .cl-file-wrap:hover { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.04); }
        .cl-file-wrap input {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          opacity: 0; cursor: pointer;
        }
        .cl-file-label { color: #475569; font-size: 0.85rem; pointer-events: none; }
        .cl-file-label span { color: #c9a84c; font-weight: 600; }

        /* ── UPLOAD BTN ── */
        .btn-upload {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.4);
          color: #c9a84c;
          padding: 13px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-upload:hover {
          background: rgba(201,168,76,0.1);
          border-color: #c9a84c;
          box-shadow: 0 4px 20px rgba(201,168,76,0.15);
        }
        .btn-upload:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── IMAGE PREVIEWS ── */
        .cl-preview-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 10px 14px;
          gap: 12px;
        }
        .cl-preview-img {
          width: 72px; height: 72px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .btn-delete {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-delete:hover { background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.5); }

        /* ── ERROR ── */
        .cl-error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          color: #f87171;
          font-size: 0.82rem;
        }

        /* ── SUBMIT ── */
        .btn-submit {
          background: #c9a84c;
          color: #0b0c0e;
          border: none;
          padding: 16px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 4px 20px rgba(201,168,76,0.25);
          margin-top: 4px;
        }
        .btn-submit:hover {
          background: #e8c97a;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.35);
        }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
      `}</style>

      <main className="cl-page">
        <div className="cl-container">

          {/* HEADER */}
          <div className="cl-eyebrow">New Property</div>
          <h1 className="cl-title">Create <em>Listing</em></h1>
          <p className="cl-subtitle">Fill in the details to publish your property</p>

          <form onSubmit={handleSubmit} className="cl-form">

            {/* ── LEFT COL ── */}
            <div className="cl-col">
              <div className="cl-section-label">Property Details</div>

              <input type="text" id="name" placeholder="Property Name"
                className="cl-input" required onChange={handleChange} value={formData.name} />

              <textarea id="description" placeholder="Description"
                className="cl-textarea" required onChange={handleChange} value={formData.description} />

              <input type="text" id="address" placeholder="Address"
                className="cl-input" required onChange={handleChange} value={formData.address} />

              <input type="text" id="contactNumber" placeholder="Contact Number"
                className="cl-input" required onChange={handleChange} value={formData.contactNumber} />

              <input type="email" id="contactEmail" placeholder="Contact Email"
                className="cl-input" required onChange={handleChange} value={formData.contactEmail} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input type="number" id="bedrooms" placeholder="Bedrooms"
                  className="cl-input" required onChange={handleChange} value={formData.bedrooms} />
                <input type="number" id="bathrooms" placeholder="Bathrooms"
                  className="cl-input" required onChange={handleChange} value={formData.bathrooms} />
              </div>

              <input type="number" id="regularPrice" placeholder="Regular Price (₹)"
                className="cl-input" required onChange={handleChange} value={formData.regularPrice} />

              {formData.offer && (
                <input type="number" id="discountPrice" placeholder="Discount Price (₹)"
                  className="cl-input" onChange={handleChange} value={formData.discountPrice} />
              )}
            </div>

            {/* ── RIGHT COL ── */}
            <div className="cl-col">
              <div className="cl-section-label">Type & Features</div>

              {/* SALE / RENT TOGGLE */}
              <div className="cl-toggle-group">
                {["sale", "rent"].map((t) => (
                  <label key={t} className={`cl-toggle ${formData.type === t ? "active" : ""}`}>
                    <input type="checkbox" id={t} checked={formData.type === t} onChange={handleChange} />
                    {t === "sale" ? "🏠 Sale" : "🔑 Rent"}
                  </label>
                ))}
              </div>

              {/* FEATURE CHECKBOXES */}
              <div className="cl-checks">
                {[
                  { id: "parking",   label: "🚗 Parking"   },
                  { id: "furnished", label: "🛋 Furnished"  },
                  { id: "offer",     label: "🏷 Offer"      },
                ].map(({ id, label }) => (
                  <label key={id} className={`cl-check ${formData[id] ? "active" : ""}`}>
                    <input type="checkbox" id={id} checked={formData[id]} onChange={handleChange} />
                    <span className="cl-check-dot">{formData[id] ? "✓" : ""}</span>
                    {label}
                  </label>
                ))}
              </div>

              <div className="cl-section-label" style={{ marginTop: "6px" }}>Images</div>

              {/* FILE DROP ZONE */}
              <div className="cl-file-wrap">
                <input type="file" multiple accept="image/*"
                  onChange={(e) => setFiles(e.target.files)} />
                <p className="cl-file-label">
                  <span>Choose files</span> or drag & drop here<br />
                  <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>Max 6 images</span>
                </p>
              </div>

              <button type="button" onClick={handleImageSubmit}
                disabled={uploading} className="btn-upload">
                {uploading ? "Uploading…" : "Upload Images"}
              </button>

              {imageUploadError && <p className="cl-error">{imageUploadError}</p>}

              {/* PREVIEWS */}
              {formData.imageUrls.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {formData.imageUrls.map((url, index) => (
                    <div key={url} className="cl-preview-item">
                      <img src={url} alt="listing" className="cl-preview-img" />
                      <span style={{ color: "#475569", fontSize: "0.78rem", flex: 1, paddingLeft: "4px" }}>
                        Image {index + 1}
                      </span>
                      <button type="button" onClick={() => handleRemoveImage(index)} className="btn-delete">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {error && <p className="cl-error">{error}</p>}

              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? "Creating…" : "Publish Listing"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </>
  );
};

export default CreateListing;