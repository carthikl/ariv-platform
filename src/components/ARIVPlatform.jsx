import { useState, useEffect } from "react";

const BRAND = {
  name: "ARIV",
  expansion: "Applied Resilience, Intelligence & Velocity",
  tagline: "Enterprise Transformation Platform",
  operatingModel: "Quality@Speed",
  philosophy: "Confidence to deliver to production with trust, safety, and at the speed the business demands — through technology that adds value to business and people, not for technology's sake — with measurable, tangible, sustainable results.",
  values: [
    { letter: "A", word: "Authentic", desc: "Genuine presence. People-first leadership. Real voice — not performing to the room or the role.", color: "#B8860B" },
    { letter: "R", word: "Resilient", desc: "Built to last. Survives transformation pressure, regulatory scrutiny, and personal adversity.", color: "#2E7D9A" },
    { letter: "I", word: "Intelligent", desc: "AI-native. Data-driven. Systems thinker. Curious enough to try things hands-on and guide the team.", color: "#3A7A55" },
    { letter: "V", word: "Valor", desc: "Courageous leadership. Radical kind candor. Holds the standard with compassion. Owns the room.", color: "#6A3A9A" },
  ],
};

const CHANNELS = ["Web", "Mobile", "Contact Center", "Chat / AI", "In-Store", "Agent Tools", "Agentic Commerce"];

const PILLARS = [
  {
    id: "operating-model",
    label: "Operating Model",
    sub: "Quality@Speed",
    color: "#B8860B",
    icon: "◈",
    desc: "Enterprise transformation leadership framework. Not a QE methodology — an executive operating system for delivering outcomes with trust, speed, and measurable results.",
    principles: [
      { label: "Engage", detail: "Understand context before proposing solutions. Map stakeholders, baseline current state, earn trust through listening." },
      { label: "Empower", detail: "Give teams the authority, tools, and air cover to deliver. Governance as guardrails — not gates." },
      { label: "Execute", detail: "Hold the standard. Measure outcomes. Report with integrity. Iterate with evidence." },
    ],
    metrics: ["$50M annual portfolio governed", "1,000+ engineers led", "$50M savings over 5 years", "30 years enterprise leadership"],
    quote: "None of us are smarter than all of us together.",
  },
  {
    id: "architecture",
    label: "Reference Architecture",
    sub: "Enterprise Scale",
    color: "#2E7D9A",
    icon: "⬡",
    desc: "Full-stack, omnichannel reference architectures across financial services, retail pharmacy, and wealth management. Built to enterprise scale — not demo scale.",
    domains: [
      { name: "Discover Financial Services", type: "Card, Banking, Payments, Contact Center", scale: "50M+ cardmembers · $15B+ annual revenue · 20,000+ employees", channels: ["Web", "Mobile", "Contact Center", "Agent Tools"] },
      { name: "Retail Pharmacy", type: "Prescription, Loyalty, Retail Commerce", scale: "Enterprise omnichannel · PBM integration · HIPAA governed", channels: ["Web", "Mobile", "In-Store", "Chat", "Pharmacy API"] },
      { name: "Wealth Management", type: "Advisor Platform, Client Portal, Institutional", scale: "AUM-scale platform · Fiduciary-grade governance · RegTech", channels: ["Web", "Mobile", "Agent Tools", "API"] },
    ],
    layers: [
      { name: "UI / Omnichannel", desc: "Seven channels — web, mobile, contact center, chat, in-store, agent tools, agentic commerce" },
      { name: "API Gateway + MCP + A2A", desc: "Model Context Protocol, Agent-to-Agent coordination, Universal Commerce Protocol connector layer" },
      { name: "Microservices", desc: "Domain-bounded services — card, prescription, loyalty, payment, identity" },
      { name: "Data & AI / RAG", desc: "Enterprise knowledge retrieval, vector embeddings, agentic reasoning layer" },
      { name: "Infrastructure", desc: "AWS, Kubernetes, GitHub Actions — governed CI/CD pipeline" },
      { name: "Governance", desc: "AIGP risk classification, audit trail, human-on-the-loop" },
    ],
  },
  {
    id: "agentic-qe",
    label: "Agentic QE Platform",
    sub: "AI-Governed Quality",
    color: "#3A7A55",
    icon: "⬢",
    desc: "Five AI agents that generate tests, heal failures, prioritize coverage, and detect anomalies — governed by AIGP framework. Human-on-the-loop, not human-out-of-the-loop.",
    agents: [
      { layer: "L5", name: "Anomaly Detection", desc: "Monitors production synthetic transactions in real time. Correlates anomalies with recent deployments.", risk: "MEDIUM → CRITICAL" },
      { layer: "L4", name: "Risk Prioritization", desc: "Reorders test execution by code change risk. Integrates CodeScene complexity and churn scores.", risk: "MEDIUM → HIGH" },
      { layer: "L3", name: "Contract Validation", desc: "Monitors Pact contracts nightly. Detects API schema drift before it reaches production.", risk: "LOW → CRITICAL" },
      { layer: "L2", name: "Script Healing", desc: "Detects flaky tests and repairs them autonomously. Escalates structural redesigns to humans.", risk: "LOW → MEDIUM" },
      { layer: "L1", name: "Test Generation", desc: "Reads PR diff and generates Karate DSL test scenarios targeting uncovered paths.", risk: "LOW" },
    ],
    loop: [
      { tier: "Automate", color: "#3A7A55", desc: "LOW risk — no human needed. Log and proceed." },
      { tier: "Alert", color: "#B8860B", desc: "MEDIUM — human reviews the anomaly or flag." },
      { tier: "Require", color: "#8B1A1A", desc: "HIGH / CRITICAL — named human must approve." },
    ],
  },
  {
    id: "aigp",
    label: "AI Governance",
    sub: "AIGP Framework",
    color: "#6A3A9A",
    icon: "◉",
    desc: "AIGP AI Governance Professional framework implemented across every AI agent and decision point. Governance is structural — not procedural. Built in from the beginning.",
    principles: [
      { label: "Risk Classification", detail: "Every AI action classified LOW / MEDIUM / HIGH / CRITICAL before execution. No action proceeds without a tier assignment." },
      { label: "Human-on-the-Loop", detail: "HIGH and CRITICAL decisions require named human approval. Autonomous execution only on LOW and MEDIUM risk." },
      { label: "Auditability", detail: "Full audit trail with plain-language rationale for every agent decision. 90-day retention minimum." },
      { label: "Bias Monitoring", detail: "Coverage equity monitored across all services. No service more than 15% below average coverage." },
    ],
    frameworks: ["NIST AI RMF 1.0", "EU AI Act", "ISO/IEC 42001", "IAPP AIGP BoK v2.1"],
    quote: "Governance embedded in the delivery fabric — not a tail-end audit. Speed and safety are not in tension when governance is designed correctly.",
  },
  {
    id: "outcomes",
    label: "Financial Impact",
    sub: "Measurable Results",
    color: "#8B3A3A",
    icon: "◆",
    desc: "Every transformation investment has a measurable hypothesis, tracked outcome, and validated result. The formula is universal — applicable to any organization at any scale.",
    formula: "Total Impact = Σ (Volume × Rate × Change Factor × Attribution %)",
    methodology: "Framework-calculated estimates. Each initiative walkable in detail with the full methodology. Conservative — all values halved from full calculation output.",
    outcomes: [
      { initiative: "Agent training time", before: "8 weeks", after: "2 weeks", impact: "$15M+/yr" },
      { initiative: "Average handle time", before: "~8 min/call", after: "~3 min/call", impact: "$6M+/yr" },
      { initiative: "Test cycle duration", before: "4 weeks", after: "2 weeks", impact: "$10M+/yr" },
      { initiative: "Test automation", before: "5%", after: "65%", impact: "$8M+/yr" },
      { initiative: "Release cadence", before: "Quarterly", after: "Monthly", impact: "$22M+/yr" },
      { initiative: "CI/CD platform", before: "ClearCase", after: "GitHub + Trident", impact: "$35M+/yr" },
    ],
    anchor: "$50M in savings over 5 years through operating model transformation",
  },
];

function NavPillar({ pillar, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `${pillar.color}0D` : "transparent",
      border: `1px solid ${active ? pillar.color + "55" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 9, padding: "13px 16px", cursor: "pointer",
      textAlign: "left", transition: "all 0.2s", width: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16, color: active ? pillar.color : "rgba(255,255,255,0.2)", transition: "color 0.2s" }}>{pillar.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: active ? pillar.color : "rgba(255,255,255,0.22)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 3 }}>{pillar.sub}</div>
          <div style={{ fontSize: 13, color: active ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: active ? 500 : 400 }}>{pillar.label}</div>
        </div>
        {active && <div style={{ width: 3, height: 3, borderRadius: "50%", background: pillar.color, flexShrink: 0 }} />}
      </div>
    </button>
  );
}

function Detail({ pillar }) {
  const [open, setOpen] = useState(null);
  useEffect(() => { setOpen(null); }, [pillar.id]);
  const toggle = i => setOpen(open === i ? null : i);

  return (
    <div style={{ padding: "26px 30px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22, color: pillar.color }}>{pillar.icon}</span>
          <div>
            <div style={{ fontSize: 10, color: pillar.color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 3 }}>{pillar.sub}</div>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 500, color: "#fff", letterSpacing: -0.4 }}>{pillar.label}</h2>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.75 }}>{pillar.desc}</p>
      </div>

      <div style={{ height: 1, background: `linear-gradient(90deg, ${pillar.color}50, transparent)`, marginBottom: 22 }} />

      {pillar.id === "operating-model" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, marginBottom: 18 }}>
            {pillar.principles.map((p, i) => (
              <button key={i} onClick={() => toggle(i)} style={{
                background: open === i ? `${pillar.color}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? pillar.color + "45" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 9, padding: "14px", cursor: "pointer", textAlign: "left", transition: "all 0.18s",
              }}>
                <div style={{ fontSize: 10, color: pillar.color, fontFamily: "monospace", marginBottom: 7, letterSpacing: 1 }}>0{i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: open === i ? 8 : 0 }}>{p.label}</div>
                {open === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.65 }}>{p.detail}</div>}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 18 }}>
            {pillar.metrics.map((m, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, padding: "11px 13px" }}>
                <div style={{ fontSize: 12, color: pillar.color, fontWeight: 500 }}>{m}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 18px", background: `${pillar.color}08`, border: `1px solid ${pillar.color}25`, borderRadius: 9 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic", lineHeight: 1.7 }}>"{pillar.quote}"</div>
          </div>
        </div>
      )}

      {pillar.id === "architecture" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Omnichannel Surface</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {CHANNELS.map((c, i) => (
                <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(46,125,154,0.08)", border: "1px solid rgba(46,125,154,0.18)", borderRadius: 5, padding: "3px 9px" }}>{c}</div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Architecture Layers</div>
            {pillar.layers.map((l, i) => (
              <button key={i} onClick={() => toggle(i)} style={{
                display: "flex", alignItems: "flex-start", gap: 11, width: "100%",
                background: open === i ? `${pillar.color}0E` : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? pillar.color + "40" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 7, padding: "9px 13px", marginBottom: 4, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: pillar.color, opacity: 0.65, minWidth: 18, paddingTop: 1 }}>L{pillar.layers.length - i}</div>
                <div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: open === i ? 500 : 400 }}>{l.name}</div>
                  {open === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", marginTop: 4, lineHeight: 1.6 }}>{l.desc}</div>}
                </div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Industry Domains</div>
          {pillar.domains.map((d, i) => (
            <div key={i} style={{ background: "rgba(46,125,154,0.05)", border: "1px solid rgba(46,125,154,0.14)", borderRadius: 8, padding: "11px 13px", marginBottom: 7 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: 2 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 4 }}>{d.type}</div>
              <div style={{ fontSize: 10, color: pillar.color, opacity: 0.7, marginBottom: 7, fontFamily: "monospace", letterSpacing: 0.3 }}>{d.scale}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {d.channels.map((c, j) => (
                  <span key={j} style={{ fontSize: 10, color: pillar.color, background: `${pillar.color}14`, padding: "2px 7px", borderRadius: 4 }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {pillar.id === "agentic-qe" && (
        <div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Five Agent Layers</div>
            {pillar.agents.map((a, i) => (
              <button key={i} onClick={() => toggle(i)} style={{
                display: "flex", alignItems: "flex-start", gap: 11, width: "100%",
                background: open === i ? `${pillar.color}0E` : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? pillar.color + "40" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 7, padding: "10px 13px", marginBottom: 4, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: pillar.color, minWidth: 22, paddingTop: 1 }}>{a.layer}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{a.name} Agent</div>
                  {open === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", marginTop: 4, lineHeight: 1.6 }}>{a.desc}</div>}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "monospace", paddingTop: 2, flexShrink: 0 }}>{a.risk}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Human-on-the-Loop</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
            {pillar.loop.map((l, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "11px 13px" }}>
                <div style={{ fontSize: 12, color: l.color, fontWeight: 500, marginBottom: 5 }}>{l.tier}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pillar.id === "aigp" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}>
            {pillar.principles.map((p, i) => (
              <button key={i} onClick={() => toggle(i)} style={{
                background: open === i ? `${pillar.color}0E` : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? pillar.color + "40" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 9, padding: "13px 15px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: open === i ? 7 : 0 }}>{p.label}</div>
                {open === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{p.detail}</div>}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Governing Frameworks</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {pillar.frameworks.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.52)", background: `${pillar.color}0E`, border: `1px solid ${pillar.color}28`, borderRadius: 5, padding: "4px 9px" }}>{f}</div>
            ))}
          </div>
          <div style={{ padding: "13px 16px", background: `${pillar.color}08`, border: `1px solid ${pillar.color}25`, borderRadius: 9 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.33)", fontStyle: "italic", lineHeight: 1.75 }}>"{pillar.quote}"</div>
          </div>
        </div>
      )}

      {pillar.id === "outcomes" && (
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: pillar.color, marginBottom: 8, padding: "9px 13px", background: `${pillar.color}08`, border: `1px solid ${pillar.color}22`, borderRadius: 7 }}>
            {pillar.formula}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontStyle: "italic", marginBottom: 14, padding: "0 2px", lineHeight: 1.6 }}>
            {pillar.methodology}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", marginBottom: 4 }}>
            {["Initiative", "Before", "After", "Impact"].map((h, i) => (
              <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", paddingBottom: 7, textAlign: i === 3 ? "right" : "left" }}>{h}</div>
            ))}
          </div>
          {pillar.outcomes.map((o, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "8px 0", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.68)" }}>{o.initiative}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", textDecoration: "line-through" }}>{o.before}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.52)" }}>{o.after}</div>
              <div style={{ fontSize: 12, color: pillar.color, fontWeight: 500, textAlign: "right" }}>{o.impact}</div>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: "13px 16px", background: `${pillar.color}0E`, border: `1px solid ${pillar.color}32`, borderRadius: 9 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5 }}>Verified Anchor</div>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{pillar.anchor}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ARIVPlatform() {
  const [active, setActive] = useState(PILLARS[0]);
  const [showValues, setShowValues] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <div style={{
      background: "#080808", minHeight: "100vh", color: "#fff",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      opacity: loaded ? 1 : 0, transition: "opacity 0.5s",
    }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", height: 52 }}>
          <button onClick={() => setShowValues(!showValues)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "baseline", gap: 10,
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: "#fff" }}>ARIV</span>
            <span style={{ fontSize: 10, color: showValues ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", transition: "color 0.2s" }}>
              {BRAND.expansion}
            </span>
          </button>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "sans-serif", letterSpacing: 0.3 }}>
            Karthik Loganathan · {BRAND.operatingModel}
          </div>
        </div>
        {/* Value color bar */}
        <div style={{ display: "flex", height: 2 }}>
          {BRAND.values.map((v, i) => <div key={i} style={{ flex: 1, background: v.color, opacity: 0.55 }} />)}
        </div>
      </div>

      {/* VALUES PANEL */}
      {showValues && (
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "22px 28px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
            {BRAND.values.map((v, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginBottom: 7 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: v.color, fontFamily: "monospace", lineHeight: 1 }}>{v.letter}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{v.word}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "34px 28px 30px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 36, alignItems: "end" }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>
              {BRAND.tagline} · {BRAND.operatingModel}
            </div>
            <h1 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.18, color: "#fff" }}>
              Applied Resilience,<br />
              <em style={{ color: "rgba(255,255,255,0.4)" }}>Intelligence & Velocity</em>
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.78, maxWidth: 540 }}>
              30 years of enterprise leadership — financial services, retail, wealth management.
              Applicable to any transformation: QE, CIO, CXO, GTM, public company, private equity, startup.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {[["30", "years"], ["$50M", "governed"], ["1,000+", "led"], ["AIGP", "certified"]].map(([n, l], i) => (
              <div key={i} style={{ textAlign: "center", padding: "9px 13px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: -0.4 }}>{n}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 1, fontFamily: "monospace" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 28px", display: "grid", gridTemplateColumns: "248px 1fr", gap: 18, minHeight: 580 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {PILLARS.map(p => <NavPillar key={p.id} pillar={p} active={active.id === p.id} onClick={() => setActive(p)} />)}
          <div style={{ marginTop: 6, padding: "14px 16px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>ARIV</div>
            {BRAND.values.map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: v.color, fontFamily: "monospace", minWidth: 10 }}>{v.letter}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{v.word}</span>
              </div>
            ))}
            <div style={{ marginTop: 9, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "monospace", lineHeight: 1.65 }}>
              {BRAND.expansion}
            </div>
          </div>
          <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 9 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 7 }}>Reference Repos</div>
            {["api-quality-platform-reference", "agentic-qe-platform", "karthik-qe-skills"].map((r, i) => (
              <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "monospace", padding: "3px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>/{r}</div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${active.color}65, ${active.color}20, transparent)` }} />
          <Detail pillar={active} />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "18px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
          <p style={{ margin: "0 0 7px", fontSize: 12, color: "rgba(255,255,255,0.22)", fontStyle: "italic", lineHeight: 1.8 }}>
            "{BRAND.philosophy}"
          </p>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.13)", letterSpacing: 3, fontFamily: "monospace" }}>
            AUTHENTIC · RESILIENT · INTELLIGENT · VALOR · QUALITY@SPEED
          </div>
        </div>
      </div>
    </div>
  );
}
