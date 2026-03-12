import { useState } from "react";

const hostingData = [
  {
    name: "Vercel",
    logo: "▲",
    color: "#000000",
    accent: "#ffffff",
    domain: "yourapp.vercel.app",
    customDomain: "✅ Free Custom Domain",
    bestFor: "React / Next.js",
    limits: "100GB bandwidth/mo",
    steps: [
      "vercel.com પર account બનાવો",
      "GitHub સાથે connect કરો",
      'Project import કરો → "Deploy" click કરો',
      "30 seconds ma live! 🚀",
    ],
    badge: "Best for React",
    rating: 5,
  },
  {
    name: "Netlify",
    logo: "◆",
    color: "#00C7B7",
    accent: "#ffffff",
    domain: "yourapp.netlify.app",
    customDomain: "✅ Free Custom Domain",
    bestFor: "React / Static Sites",
    limits: "100GB bandwidth/mo",
    steps: [
      "netlify.com પર signup કરો",
      "GitHub repo connect કરો",
      "Build command: npm run build",
      "Publish directory: build/ set કરો",
    ],
    badge: "Most Popular",
    rating: 5,
  },
  {
    name: "GitHub Pages",
    logo: "⬡",
    color: "#24292e",
    accent: "#ffffff",
    domain: "username.github.io/repo",
    customDomain: "✅ Free Custom Domain",
    bestFor: "Static React Apps",
    limits: "1GB storage, Unlimited",
    steps: [
      "npm install gh-pages --save-dev",
      'package.json ma "homepage" add કરો',
      '"deploy" script add: gh-pages -d build',
      "npm run deploy ચલાવો",
    ],
    badge: "100% Free",
    rating: 4,
  },
  {
    name: "Render",
    logo: "◉",
    color: "#46E3B7",
    accent: "#000000",
    domain: "yourapp.onrender.com",
    customDomain: "✅ Free Custom Domain",
    bestFor: "React + Backend",
    limits: "750 hours/mo free",
    steps: [
      "render.com પર account બનાવો",
      "New → Static Site select કરો",
      "GitHub repo connect કરો",
      "Build: npm run build, Publish: build/",
    ],
    badge: "Full Stack",
    rating: 4,
  },
  {
    name: "Cloudflare Pages",
    logo: "☁",
    color: "#F38020",
    accent: "#ffffff",
    domain: "yourapp.pages.dev",
    customDomain: "✅ Free Custom Domain",
    bestFor: "Fast Global CDN",
    limits: "Unlimited bandwidth!",
    steps: [
      "pages.cloudflare.com પર જાઓ",
      "GitHub connect કરો",
      "Framework: Create React App select",
      "Deploy! Ultra fast CDN મળે",
    ],
    badge: "⚡ Fastest",
    rating: 5,
  },
];

const domainData = [
  {
    provider: "Freenom",
    tlds: [".tk", ".ml", ".ga", ".cf", ".gq"],
    price: "FREE",
    note: "1 year free, renewable",
    link: "freenom.com",
  },
  {
    provider: "js.org",
    tlds: ["yourname.js.org"],
    price: "FREE",
    note: "GitHub project માટે",
    link: "js.org",
  },
  {
    provider: "is-a.dev",
    tlds: ["yourname.is-a.dev"],
    price: "FREE",
    note: "Developers માટે GitHub PR",
    link: "is-a.dev",
  },
  {
    provider: "Vercel/Netlify subdomain",
    tlds: [".vercel.app", ".netlify.app"],
    price: "FREE",
    note: "Hosting સાથે automatic",
    link: "-",
  },
];

export default function FreeHostingGuide() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("hosting");
  const [copiedStep, setCopiedStep] = useState(null);

  const host = hostingData[selected];

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#fff",
      padding: "20px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
          borderRadius: "100px",
          padding: "6px 18px",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "2px",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}>
          🎓 Free Hosting Guide
        </div>
        <h1 style={{
          fontSize: "clamp(26px, 5vw, 42px)",
          fontWeight: "800",
          background: "linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: "0 0 8px",
        }}>
          React App Free Ma Deploy કરો
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px" }}>
          ₹0 ma professional hosting + domain — Step by step guide
        </p>
      </div>

      {/* Tab Switch */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
        {["hosting", "domain"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 28px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "14px",
              transition: "all 0.2s",
              background: tab === t ? "linear-gradient(90deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.08)",
              color: "#fff",
              textTransform: "capitalize",
            }}
          >
            {t === "hosting" ? "🚀 Hosting" : "🌐 Domain"}
          </button>
        ))}
      </div>

      {tab === "hosting" ? (
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}>
            {hostingData.map((h, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  background: selected === i ? `linear-gradient(135deg, ${h.color}33, ${h.color}11)` : "rgba(255,255,255,0.05)",
                  border: selected === i ? `2px solid ${h.color === "#000000" ? "#a78bfa" : h.color}` : "2px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "16px 12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center",
                  transform: selected === i ? "scale(1.03)" : "scale(1)",
                }}
              >
                <div style={{ fontSize: "24px", color: h.color === "#000000" ? "#a78bfa" : h.color, marginBottom: "6px" }}>
                  {h.logo}
                </div>
                <div style={{ fontWeight: "700", fontSize: "14px" }}>{h.name}</div>
                <div style={{
                  fontSize: "10px", marginTop: "4px", color: "#60a5fa",
                  background: "rgba(96,165,250,0.1)", padding: "2px 8px",
                  borderRadius: "100px", display: "inline-block",
                }}>
                  {h.badge}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.05)", borderRadius: "24px",
            padding: "28px", border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "800" }}>
                  <span style={{ color: host.color === "#000000" ? "#a78bfa" : host.color }}>{host.logo}</span> {host.name}
                </h2>
                <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "13px" }}>
                  🌐 {host.domain} &nbsp;|&nbsp; {host.customDomain}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "20px" }}>{"⭐".repeat(host.rating)}</div>
                <div style={{ fontSize: "12px", color: "#60a5fa", marginTop: "2px" }}>{host.limits}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              {[
                { label: "Best For", value: host.bestFor },
                { label: "Free Subdomain", value: host.domain },
                { label: "Bandwidth", value: host.limits },
                { label: "Custom Domain", value: host.customDomain },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "12px 16px" }}>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600" }}>{item.value}</div>
                </div>
              ))}
            </div>

            <h3 style={{ margin: "0 0 14px", fontSize: "15px", color: "#a78bfa" }}>📋 Step-by-Step Deploy Guide</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {host.steps.map((step, i) => (
                <div
                  key={i}
                  onClick={() => copyText(step, `${selected}-${i}`)}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    background: copiedStep === `${selected}-${i}` ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)",
                    borderRadius: "12px", padding: "12px 16px", cursor: "pointer",
                    border: copiedStep === `${selected}-${i}` ? "1px solid #34d399" : "1px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "800", fontSize: "13px", flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: "14px", flex: 1 }}>{step}</span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>
                    {copiedStep === `${selected}-${i}` ? "✅ Copied!" : "tap to copy"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{
            background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: "16px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px",
          }}>
            💡 <strong>Pro Tip:</strong> Vercel / Netlify subdomain first use કરો — completely free ane professional લાગે!
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {domainData.map((d, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)", borderRadius: "20px",
                padding: "20px 24px", border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
              }}>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "6px" }}>{d.provider}</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {d.tlds.map((tld, j) => (
                      <span key={j} style={{
                        background: "rgba(96,165,250,0.15)", color: "#60a5fa",
                        padding: "3px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
                      }}>
                        {tld}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "12px", color: "#94a3b8" }}>{d.note}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: "22px", fontWeight: "800",
                    background: "linear-gradient(90deg, #34d399, #60a5fa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    {d.price}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{d.link}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "20px",
            background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(96,165,250,0.1))",
            border: "1px solid rgba(52,211,153,0.3)", borderRadius: "16px", padding: "20px",
          }}>
            <h3 style={{ margin: "0 0 12px", color: "#34d399" }}>🏆 Best Combination (Free)</h3>
            <div style={{ fontSize: "14px", lineHeight: "1.8", color: "#cbd5e1" }}>
              <div>1️⃣ <strong>Vercel</strong> પર React app deploy કરો → yourapp.vercel.app</div>
              <div>2️⃣ <strong>Freenom</strong> પર .tk domain register કરો (free)</div>
              <div>3️⃣ Vercel settings → Domains → Custom domain add કરો</div>
              <div>4️⃣ Freenom DNS → Vercel nameservers point કરો</div>
              <div style={{ marginTop: "10px", color: "#34d399", fontWeight: "700" }}>
                ✅ Result: yoursite.tk → Completely FREE!
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "32px", color: "#475569", fontSize: "12px" }}>
        Made with ❤️ for Gujarati Developers
      </div>
    </div>
  );
}