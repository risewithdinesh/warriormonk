import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Subconscious Mind Mastery",
    subtitle: "The Complete Program",
    description: "A transformative 8-week deep-dive into rewiring your subconscious patterns using ancient Vedic techniques and modern neuroscience.",
    price: 4999,
    original: 9999,
    badge: "Best Seller",
    icon: "🧠",
    features: ["8 Module Video Course", "Guided Meditation Library", "Workbooks & PDFs", "Lifetime Access"],
  },
  {
    id: 2,
    title: "Thought Awareness",
    subtitle: "21-Day Practice Guide",
    description: "Master the art of witnessing thoughts through daily Drashta practices rooted in Patanjali's Yoga Sutras.",
    price: 1999,
    original: 3999,
    badge: "Popular",
    icon: "🌿",
    features: ["21 Daily Audio Lessons", "Journaling Templates", "Sanskrit Glossary", "Community Access"],
  },
  {
    id: 3,
    title: "Sanskara Clearing",
    subtitle: "Weekend Intensive",
    description: "Release deep-seated Vrittis and Sanskaras through guided Antahkaran practices and breathwork sessions.",
    price: 2999,
    original: 5999,
    badge: "New",
    icon: "✨",
    features: ["6-Hour Video Workshop", "Practice Manual PDF", "Bonus Cheat Sheets", "1 Year Access"],
  },
];

const PAGES = { STORE: "store", CHECKOUT: "checkout", SUCCESS: "success" };

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0c0a;
    --surface: #161410;
    --card: #1c1a17;
    --border: #2e2b25;
    --gold: #c9a84c;
    --gold-light: #e8c96e;
    --text: #f0ece4;
    --muted: #7a7265;
    --accent: #d4622a;
    --success: #4caf82;
    --radius: 16px;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px; border-bottom: 1px solid var(--border);
    background: rgba(13,12,10,0.9); backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--gold); letter-spacing: 1px; }
  .nav-sub { font-size: 11px; color: var(--muted); letter-spacing: 3px; text-transform: uppercase; }

  /* ── STORE ─────────────────────────────────────── */
  .hero {
    text-align: center; padding: 80px 40px 60px;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%);
  }
  .hero-eyebrow { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 6vw, 72px); font-weight: 600; line-height: 1.1; margin-bottom: 16px; }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-desc { color: var(--muted); font-size: 16px; max-width: 520px; margin: 0 auto; line-height: 1.7; }

  .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; padding: 20px 40px 80px; max-width: 1100px; margin: 0 auto; }

  .card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 32px; display: flex; flex-direction: column; gap: 20px;
    transition: border-color 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden;
  }
  .card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05), transparent 60%); pointer-events: none; }
  .card:hover { border-color: var(--gold); transform: translateY(-4px); }

  .badge { position: absolute; top: 20px; right: 20px; background: var(--gold); color: #0d0c0a; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }

  .card-icon { font-size: 36px; }
  .card-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; line-height: 1.2; }
  .card-subtitle { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-top: -14px; }
  .card-desc { color: var(--muted); font-size: 14px; line-height: 1.7; }

  .features { display: flex; flex-direction: column; gap: 8px; }
  .feature { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); }
  .feature::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

  .price-row { display: flex; align-items: baseline; gap: 12px; margin-top: auto; }
  .price { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 600; color: var(--text); }
  .price-original { font-size: 18px; color: var(--muted); text-decoration: line-through; }
  .price-currency { font-size: 20px; color: var(--muted); }

  .btn-buy {
    width: 100%; padding: 14px; background: var(--gold); color: #0d0c0a;
    border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase; cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .btn-buy:hover { background: var(--gold-light); transform: scale(1.01); }
  .btn-buy:active { transform: scale(0.99); }

  /* ── CHECKOUT ───────────────────────────────────── */
  .checkout-wrap { max-width: 900px; margin: 0 auto; padding: 40px 40px 80px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; }
  @media (max-width: 700px) { .checkout-wrap { grid-template-columns: 1fr; padding: 24px; } }

  .order-summary { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; height: fit-content; }
  .section-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .summary-product { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 24px; }
  .summary-icon { font-size: 40px; background: var(--surface); border-radius: 12px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .summary-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; }
  .summary-sub { font-size: 12px; color: var(--muted); margin-top: 4px; }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }
  .summary-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--muted); margin-bottom: 10px; }
  .summary-total { display: flex; justify-content: space-between; font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; margin-top: 16px; }
  .summary-savings { display: inline-block; background: rgba(76,175,130,0.12); color: var(--success); font-size: 12px; padding: 4px 10px; border-radius: 6px; margin-top: 8px; }

  .payment-form { display: flex; flex-direction: column; gap: 20px; }
  .form-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 600; margin-bottom: 4px; }
  .form-subtitle { font-size: 13px; color: var(--muted); margin-bottom: 8px; }

  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
  .field input {
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 14px 16px; color: var(--text); font-size: 15px; font-family: inherit;
    outline: none; transition: border-color 0.2s;
  }
  .field input:focus { border-color: var(--gold); }
  .field input::placeholder { color: var(--muted); }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .razorpay-note { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; font-size: 12px; color: var(--muted); }
  .razorpay-logo { font-size: 18px; }

  .btn-pay {
    padding: 16px; background: linear-gradient(135deg, var(--gold), var(--accent));
    color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.5px; transition: opacity 0.2s, transform 0.1s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .btn-pay:hover { opacity: 0.9; transform: scale(1.01); }
  .btn-pay:active { transform: scale(0.98); }

  .btn-back { background: none; border: 1px solid var(--border); color: var(--muted); border-radius: 10px; padding: 10px 20px; font-size: 13px; cursor: pointer; transition: border-color 0.2s; align-self: flex-start; font-family: inherit; }
  .btn-back:hover { border-color: var(--gold); color: var(--text); }

  /* ── SUCCESS ────────────────────────────────────── */
  .success-wrap { max-width: 680px; margin: 0 auto; padding: 60px 40px 80px; text-align: center; }
  .success-icon { width: 90px; height: 90px; background: rgba(76,175,130,0.12); border: 2px solid var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 32px; }
  .success-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 600; margin-bottom: 12px; }
  .success-sub { color: var(--muted); font-size: 16px; line-height: 1.7; margin-bottom: 40px; }

  .download-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; text-align: left; margin-bottom: 32px; }
  .download-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
  .download-icon-wrap { background: var(--surface); border-radius: 12px; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
  .download-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; }
  .download-access { font-size: 12px; color: var(--success); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }

  .download-items { display: flex; flex-direction: column; gap: 12px; }
  .download-item {
    display: flex; align-items: center; justify-content: space-between;
    background: var(--surface); border-radius: 10px; padding: 14px 16px;
    border: 1px solid var(--border);
  }
  .download-item-name { font-size: 14px; display: flex; align-items: center; gap: 10px; }
  .download-item-type { font-size: 11px; color: var(--muted); background: var(--card); padding: 3px 8px; border-radius: 4px; }
  .btn-dl {
    background: var(--gold); color: #0d0c0a; border: none; border-radius: 8px;
    padding: 8px 16px; font-size: 12px; font-weight: 600; cursor: pointer; letter-spacing: 0.5px;
    transition: background 0.2s;
  }
  .btn-dl:hover { background: var(--gold-light); }

  .order-id { font-size: 12px; color: var(--muted); margin-bottom: 8px; }
  .order-id span { color: var(--gold); font-family: monospace; }

  .btn-store { display: inline-flex; align-items: center; gap: 8px; background: none; border: 1px solid var(--border); color: var(--muted); border-radius: 10px; padding: 12px 24px; font-size: 14px; cursor: pointer; transition: all 0.2s; font-family: inherit; }
  .btn-store:hover { border-color: var(--gold); color: var(--text); }

  /* page transition */
  .page { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
`;

// ─── Components ───────────────────────────────────────────────────────────────

function Nav({ page, onBack }) {
  return (
    <nav className="nav">
      <div>
        <div className="nav-logo">Warrior Monk</div>
        <div className="nav-sub">Inner Mastery Programs</div>
      </div>
      <div style={{ display: "flex", gap: "24px", fontSize: "13px", color: "var(--muted)", alignItems: "center" }}>
        {page !== PAGES.STORE && (
          <span style={{ color: "var(--gold)", fontSize: "12px", letterSpacing: "1px" }}>
            {page === PAGES.CHECKOUT ? "Checkout" : "✓ Order Complete"}
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          🔒 <span style={{ fontSize: "11px" }}>Secured by Razorpay</span>
        </span>
      </div>
    </nav>
  );
}

function StorePage({ onBuy }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-eyebrow">Digital Programs</div>
        <h1 className="hero-title">
          Transform Your <em>Inner World</em>
        </h1>
        <p className="hero-desc">
          Ancient wisdom meets modern neuroscience. Choose your path to subconscious mastery.
        </p>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            {p.badge && <div className="badge">{p.badge}</div>}
            <div className="card-icon">{p.icon}</div>
            <div>
              <div className="card-title">{p.title}</div>
              <div className="card-subtitle">{p.subtitle}</div>
            </div>
            <p className="card-desc">{p.description}</p>
            <div className="features">
              {p.features.map((f) => (
                <div key={f} className="feature">{f}</div>
              ))}
            </div>
            <div className="price-row">
              <span className="price-currency">₹</span>
              <span className="price">{p.price.toLocaleString()}</span>
              <span className="price-original">₹{p.original.toLocaleString()}</span>
            </div>
            <button className="btn-buy" onClick={() => onBuy(p)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutPage({ product, onPay, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", card: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);

  const savings = product.original - product.price;
  const tax = Math.round(product.price * 0.18);
  const total = product.price + tax;

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onPay(form, total); }, 2000);
  };

  return (
    <div className="page">
      <div className="checkout-wrap">
        {/* Order Summary */}
        <div className="order-summary">
          <div className="section-label">Order Summary</div>
          <div className="summary-product">
            <div className="summary-icon">{product.icon}</div>
            <div>
              <div className="summary-name">{product.title}</div>
              <div className="summary-sub">{product.subtitle}</div>
            </div>
          </div>
          <div className="divider" />
          <div className="summary-row"><span>Price</span><span>₹{product.price.toLocaleString()}</span></div>
          <div className="summary-row"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
          <div className="summary-row"><span>Discount</span><span style={{ color: "var(--success)" }}>–₹{(product.original - product.price).toLocaleString()}</span></div>
          <div className="divider" />
          <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          <div className="summary-savings">You save ₹{savings.toLocaleString()} 🎉</div>
        </div>

        {/* Payment Form */}
        <form className="payment-form" onSubmit={submit}>
          <div>
            <div className="form-title">Complete Payment</div>
            <div className="form-subtitle">Your data is encrypted and secure</div>
          </div>

          <div className="field">
            <label>Full Name</label>
            <input name="name" placeholder="Your full name" value={form.name} onChange={handle} required />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handle} />
          </div>

          <div style={{ height: 1, background: "var(--border)" }} />
          <div className="section-label" style={{ marginBottom: 0 }}>Card Details</div>

          <div className="field">
            <label>Card Number</label>
            <input name="card" placeholder="4242 4242 4242 4242" value={form.card} onChange={handle} maxLength={19} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Expiry</label>
              <input name="expiry" placeholder="MM / YY" value={form.expiry} onChange={handle} maxLength={7} />
            </div>
            <div className="field">
              <label>CVV</label>
              <input name="cvv" type="password" placeholder="•••" value={form.cvv} onChange={handle} maxLength={4} />
            </div>
          </div>

          <div className="razorpay-note">
            <span className="razorpay-logo">🔐</span>
            <span>Payments are processed securely via <strong style={{ color: "var(--text)" }}>Razorpay</strong>. Your card details are never stored on our servers.</span>
          </div>

          <button className="btn-pay" type="submit" disabled={loading}>
            {loading ? (
              <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Processing…</>
            ) : (
              <>🔒 Pay ₹{total.toLocaleString()}</>
            )}
          </button>

          <button type="button" className="btn-back" onClick={onBack}>← Back to Store</button>
        </form>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SuccessPage({ product, orderId, onReturn }) {
  const downloadItems = {
    1: [
      { name: "Module 1–8 Video Series", type: "MP4" },
      { name: "Meditation Audio Library", type: "MP3" },
      { name: "Course Workbook", type: "PDF" },
    ],
    2: [
      { name: "21-Day Audio Lessons", type: "MP3" },
      { name: "Journaling Templates", type: "PDF" },
      { name: "Sanskrit Glossary", type: "PDF" },
    ],
    3: [
      { name: "Workshop Video Recording", type: "MP4" },
      { name: "Practice Manual", type: "PDF" },
      { name: "Bonus Cheat Sheets", type: "PDF" },
    ],
  };

  const items = downloadItems[product.id] || [];

  return (
    <div className="page">
      <div className="success-wrap">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-sub">
          Thank you for your purchase. Your transformation journey begins now.
          A receipt has been sent to your email.
        </p>

        <div className="order-id">
          Order ID: <span>{orderId}</span>
        </div>

        <div className="download-card">
          <div className="download-header">
            <div className="download-icon-wrap">{product.icon}</div>
            <div>
              <div className="download-title">{product.title}</div>
              <div className="download-access">✓ Access Granted — Lifetime</div>
            </div>
          </div>

          <div className="section-label">Your Downloads</div>
          <div className="download-items">
            {items.map((item) => (
              <div key={item.name} className="download-item">
                <div className="download-item-name">
                  <span>{item.type === "MP4" ? "🎬" : item.type === "MP3" ? "🎵" : "📄"}</span>
                  {item.name}
                  <span className="download-item-type">{item.type}</span>
                </div>
                <button className="btn-dl" onClick={() => alert(`Downloading: ${item.name}`)}>
                  ↓ Download
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-store" onClick={onReturn}>
          ← Return to Store
        </button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(PAGES.STORE);
  const [selected, setSelected] = useState(null);
  const [orderId, setOrderId] = useState("");

  const handleBuy = (product) => { setSelected(product); setPage(PAGES.CHECKOUT); };
  const handlePay = (form, total) => {
    setOrderId("WM-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    setPage(PAGES.SUCCESS);
  };

  return (
    <>
      <style>{css}</style>
      <Nav page={page} />
      {page === PAGES.STORE && <StorePage onBuy={handleBuy} />}
      {page === PAGES.CHECKOUT && <CheckoutPage product={selected} onPay={handlePay} onBack={() => setPage(PAGES.STORE)} />}
      {page === PAGES.SUCCESS && <SuccessPage product={selected} orderId={orderId} onReturn={() => setPage(PAGES.STORE)} />}
    </>
  );
}
