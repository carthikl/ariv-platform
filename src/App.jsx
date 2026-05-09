import { useState, useEffect } from "react";
import ARIVPlatform from "./components/ARIVPlatform.jsx";
import ARIVIndustryDomains from "./components/ARIVIndustryDomains.jsx";
import ARIVArchitectureExplorer from "./components/ARIVArchitectureExplorer.jsx";
import ARIVLeadershipOS from "./components/ARIVLeadershipOS.jsx";
import ARIVMaturityAssessment from "./components/ARIVMaturityAssessment.jsx";
import ARIVIntelligenceLayer from "./components/ARIVIntelligenceLayer.jsx";
import { useBreakpoint } from "./useBreakpoint.js";

const BRAND = {
  name: "ARIV",
  expansion: "Applied Resilience, Intelligence & Velocity",
  values: [
    { letter: "A", word: "Authentic", color: "#B8860B", desc: "Genuine presence. People-first leadership. Real voice — not performing to the room or the role." },
    { letter: "R", word: "Resilient", color: "#2E7D9A", desc: "Built to last. Survives transformation pressure, regulatory scrutiny, and personal adversity." },
    { letter: "I", word: "Intelligent", color: "#3A7A55", desc: "AI-native. Data-driven. Systems thinker. Curious enough to try things hands-on and guide the team." },
    { letter: "V", word: "Valor", color: "#6A3A9A", desc: "Courageous leadership. Radical kind candor. Holds the standard with compassion. Owns the room." },
  ],
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview", short: "Overview", color: "#B8860B", icon: "◈", tag: "Foundation", desc: "Platform introduction — Quality@Speed operating model, five pillars, credentials, and reference repositories." },
  { id: "industry", label: "Industry Domains", short: "Industry", color: "#2E7D9A", icon: "⬡", tag: "Evidence", desc: "Seven disciplines across Discover Financial Services, Retail Pharmacy, and Wealth Management." },
  { id: "architecture", label: "Architecture", short: "Architecture", color: "#3A7A55", icon: "⬢", tag: "Reference", desc: "Seven omnichannel channels × seven stack layers — Web, Mobile, Contact Center, Chat/AI, In-Store, Agent Tools, Agentic Commerce." },
  { id: "leadership", label: "Leadership OS", short: "Leadership", color: "#6A3A9A", icon: "◉", tag: "Operating Model", desc: "Quality@Speed as a complete executive operating system — philosophy, cadence, governance, team design, measurement." },
  { id: "maturity", label: "Maturity Assessment", short: "Assessment", color: "#8B3A3A", icon: "◆", tag: "Diagnostic", desc: "Scored assessment across six dimensions with radar chart profile and prioritized recommendations." },
  { id: "intelligence", label: "Intelligence Layer", short: "AI/MCP/A2A", color: "#4A3A8A", icon: "◻", tag: "Frontier", desc: "RAG, MCP, A2A, and UCP — extensible intelligence connectors governed by the AIGP framework." },
];

const COMPONENTS = {
  overview: ARIVPlatform,
  industry: ARIVIndustryDomains,
  architecture: ARIVArchitectureExplorer,
  leadership: ARIVLeadershipOS,
  maturity: ARIVMaturityAssessment,
  intelligence: ARIVIntelligenceLayer,
};

function MobileMenu({ active, onSelect, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#080808", overflowY: "auto" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>ARIV</span>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>Close</button>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <button onClick={() => { onSelect(null); onClose(); }} style={{
          width: "100%", background: active === null ? "rgba(255,255,255,0.04)" : "transparent",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px",
          cursor: "pointer", textAlign: "left", marginBottom: 8, color: active === null ? "#fff" : "rgba(255,255,255,0.5)",
          fontSize: 13, fontFamily: "sans-serif",
        }}>⌂ Home</button>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => { onSelect(item.id); onClose(); }} style={{
            width: "100%", background: active === item.id ? `${item.color}12` : "transparent",
            border: `1px solid ${active === item.id ? item.color + "40" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 8, padding: "13px 16px", cursor: "pointer", textAlign: "left", marginBottom: 8, transition: "all 0.15s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
              <span style={{ fontSize: 15, color: item.color }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 10, color: item.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>{item.tag}</div>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{item.label}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.55, paddingLeft: 25 }}>{item.desc}</div>
          </button>
        ))}
      </div>
      <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "monospace", letterSpacing: 1 }}>AUTHENTIC · RESILIENT · INTELLIGENT · VALOR</div>
      </div>
    </div>
  );
}

function LandingView({ onSelect, isMobile }) {
  return (
    <div style={{ padding: isMobile ? "24px 16px" : "48px 40px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: isMobile ? 24 : 40 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>The Platform</div>
          <h2 style={{ margin: "0 0 12px", fontSize: isMobile ? 22 : 26, fontWeight: 400, color: "#fff", letterSpacing: -0.8, lineHeight: 1.25 }}>
            Enterprise transformation leadership<br />
            <em style={{ color: "rgba(255,255,255,0.35)" }}>that generates measurable outcomes</em>
          </h2>
          <p style={{ margin: "0 0 18px", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
            30 years of enterprise technology leadership — financial services, retail pharmacy, and wealth management. Applicable to any transformation: QE, CIO, CXO, GTM, public company, private equity, startup.
          </p>
          <div style={{ padding: "14px 18px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 10 }}>
            <div style={{ fontSize: isMobile ? 11 : 12, color: "rgba(255,255,255,0.38)", fontStyle: "italic", lineHeight: 1.8 }}>
              "Confidence to deliver to production with trust, safety, and at the speed the business demands — through technology that adds value to business and people, not for technology's sake — with measurable, tangible, sustainable results."
            </div>
          </div>
        </div>

        <div style={{ marginBottom: isMobile ? 20 : 36 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>The Values</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 8 }}>
            {BRAND.values.map((v, i) => (
              <div key={i} style={{ padding: isMobile ? "10px 12px" : "14px 16px", background: `${v.color}08`, border: `1px solid ${v.color}25`, borderRadius: 10 }}>
                <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: v.color, fontFamily: "monospace", marginBottom: 3 }}>{v.letter}</div>
                <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 500, color: "#fff", marginBottom: isMobile ? 0 : 4 }}>{v.word}</div>
                {!isMobile && <div style={{ width: 24, height: 1, background: v.color, opacity: 0.4 }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: isMobile ? 16 : 32 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>Six Components</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => onSelect(item.id)}
                style={{
                  background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "13px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${item.color}10`; e.currentTarget.style.borderColor = `${item.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <span style={{ fontSize: 15, color: item.color }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: item.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>{item.tag}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{item.label}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 7 }}>
          {[["30 years", "leadership"], ["$50M", "governed"], ["1,000+", "led"], ["AIGP", "in progress"]].map(([n, l], i) => (
            <div key={i} style={{ textAlign: "center", padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
              <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600, color: "#fff", letterSpacing: -0.4 }}>{n}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);
  const [showValues, setShowValues] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);

  const activeItem = NAV_ITEMS.find(n => n.id === active);
  const ActiveComponent = active ? COMPONENTS[active] : null;

  return (
    <div style={{
      background: "#080808", minHeight: "100vh", color: "#fff",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      opacity: loaded ? 1 : 0, transition: "opacity 0.4s",
    }}>
      {showMenu && <MobileMenu active={active} onSelect={setActive} onClose={() => setShowMenu(false)} />}

      {/* NAV */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 100, background: "#080808" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px" : "0 28px", display: "flex", alignItems: "center", height: 52 }}>
          <button onClick={() => setActive(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginRight: isMobile ? 10 : 20 }}>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, color: "#fff" }}>ARIV</span>
          </button>

          {!isMobile && (
            <>
              <button onClick={() => setShowValues(!showValues)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 0, marginRight: 20,
                fontSize: 10, color: showValues ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.14)",
                letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", transition: "color 0.2s",
              }}>{BRAND.expansion}</button>
              <div style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }}>
                {NAV_ITEMS.map(item => (
                  <button key={item.id} onClick={() => setActive(item.id)} style={{
                    background: active === item.id ? `${item.color}12` : "transparent",
                    border: `1px solid ${active === item.id ? item.color + "45" : "transparent"}`,
                    borderRadius: 6, padding: "5px 10px", cursor: "pointer", whiteSpace: "nowrap",
                    fontSize: isTablet ? 11 : 12, color: active === item.id ? "#fff" : "rgba(255,255,255,0.38)",
                    fontFamily: "sans-serif", transition: "all 0.15s",
                  }}>{item.short}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.14)", fontFamily: "sans-serif", marginLeft: 12, whiteSpace: "nowrap" }}>Karthik Loganathan</div>
            </>
          )}

          {isMobile && (
            <>
              <div style={{ flex: 1, fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "monospace", letterSpacing: 1 }}>
                {activeItem ? activeItem.short : "Enterprise Transformation"}
              </div>
              <button onClick={() => setShowMenu(true)} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12,
                color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif",
              }}>☰ Menu</button>
            </>
          )}
        </div>
        <div style={{ display: "flex", height: 2 }}>
          {BRAND.values.map((v, i) => <div key={i} style={{ flex: 1, background: v.color, opacity: 0.45 }} />)}
        </div>
      </div>

      {/* VALUES PANEL */}
      {showValues && !isMobile && (
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 28px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
            {BRAND.values.map((v, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: v.color, fontFamily: "monospace" }}>{v.letter}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{v.word}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BREADCRUMB */}
      {active && activeItem && (
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", padding: isMobile ? "8px 16px" : "10px 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setActive(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "sans-serif", padding: 0 }}>ARIV</button>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11 }}>›</span>
            <span style={{ fontSize: 11, color: activeItem.color, fontFamily: "sans-serif" }}>{activeItem.label}</span>
            <div style={{ marginLeft: "auto", fontSize: 10, color: activeItem.color, background: `${activeItem.color}12`, padding: "2px 8px", borderRadius: 4, fontFamily: "monospace", letterSpacing: 1 }}>{activeItem.tag}</div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {!active ? <LandingView onSelect={setActive} isMobile={isMobile} /> : ActiveComponent ? <ActiveComponent /> : null}
      </div>

      {/* FOOTER */}
      {!active && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: isMobile ? "14px 16px" : "16px 28px", marginTop: 28 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {isMobile ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", marginBottom: 8 }}>ARIV · Applied Resilience, Intelligence & Velocity</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 6 }}>
                  {["github.com/carthikl", "linkedin.com/in/karthikeyanl"].map((l, i) => (
                    <a key={i} href={`https://${l}`} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", textDecoration: "none" }}>{l.split('/')[0]}</a>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", fontFamily: "monospace", letterSpacing: 1 }}>AUTHENTIC · RESILIENT · INTELLIGENT · VALOR</div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", letterSpacing: 1 }}>ARIV · Applied Resilience, Intelligence & Velocity</div>
                <div style={{ display: "flex", gap: 20 }}>
                  {["github.com/carthikl", "linkedin.com/in/karthikeyanl"].map((l, i) => (
                    <a key={i} href={`https://${l}`} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", textDecoration: "none" }}>{l}</a>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", letterSpacing: 1 }}>AUTHENTIC · RESILIENT · INTELLIGENT · VALOR</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
