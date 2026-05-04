import { useState } from "react";

const COLORS = {
  gold: "#B8860B", teal: "#2E7D9A", green: "#3A7A55",
  purple: "#6A3A9A", red: "#8B3A3A", slate: "#4A5A6A",
};

const DIMENSIONS = [
  { id: "delivery", label: "Delivery Velocity", color: COLORS.teal, icon: "⬢", short: "Delivery" },
  { id: "quality", label: "Quality Engineering", color: COLORS.green, icon: "◆", short: "Quality" },
  { id: "ai", label: "AI Readiness", color: COLORS.purple, icon: "◈", short: "AI" },
  { id: "governance", label: "Governance & Compliance", color: COLORS.red, icon: "◉", short: "Governance" },
  { id: "org", label: "Organizational Health", color: COLORS.gold, icon: "⬡", short: "Org Health" },
  { id: "platform", label: "Technology Platform", color: COLORS.slate, icon: "◻", short: "Platform" },
];

const QUESTIONS = [
  // DELIVERY
  { id: "d1", dim: "delivery", weight: 1.2, text: "How frequently does your team deploy to production?", options: [
    { score: 1, label: "Monthly or less — releases are large, infrequent events" },
    { score: 2, label: "Every 2–3 weeks — some automation, significant manual coordination" },
    { score: 3, label: "Weekly — consistent cadence, some manual gates remain" },
    { score: 4, label: "Multiple times per week — automated pipeline, feature flags in use" },
    { score: 5, label: "On-demand — deployment is a non-event, fully automated" },
  ]},
  { id: "d2", dim: "delivery", weight: 1.0, text: "When a P1 production incident occurs, what is your typical time to recover (MTTR)?", options: [
    { score: 1, label: "> 4 hours — recovery is unpredictable and manual" },
    { score: 2, label: "2–4 hours — some runbooks exist, recovery is partially structured" },
    { score: 3, label: "1–2 hours — runbooks exist, on-call rotation in place" },
    { score: 4, label: "30–60 minutes — automated alerting, clear escalation, practiced response" },
    { score: 5, label: "< 30 minutes — auto-remediation for known failure modes, consistent" },
  ]},
  { id: "d3", dim: "delivery", weight: 0.8, text: "How are production changes reviewed and approved?", options: [
    { score: 1, label: "No formal process — changes go to production ad hoc" },
    { score: 2, label: "Manual approval by a senior engineer or manager" },
    { score: 3, label: "Change Advisory Board (CAB) — weekly review, paper-based approval" },
    { score: 4, label: "Automated gates — tests must pass before deployment, human approval for major changes" },
    { score: 5, label: "Fully governed pipeline — automated quality gates, CAB for high-risk only, audit trail" },
  ]},

  // QUALITY
  { id: "q1", dim: "quality", weight: 1.3, text: "What percentage of your regression testing is automated?", options: [
    { score: 1, label: "< 10% — testing is primarily manual" },
    { score: 2, label: "10–30% — some automation exists, inconsistent across teams" },
    { score: 3, label: "30–60% — meaningful automation, manual regression still required" },
    { score: 4, label: "60–80% — strong automation coverage, manual testing for exploratory only" },
    { score: 5, label: "> 80% — automation-first, manual testing is the exception" },
  ]},
  { id: "q2", dim: "quality", weight: 1.0, text: "How does quality engineering fit into your delivery model?", options: [
    { score: 1, label: "Separate QA team tests at the end of the sprint" },
    { score: 2, label: "QA involved in sprint but downstream of development" },
    { score: 3, label: "QE embedded in some squads — inconsistent model across teams" },
    { score: 4, label: "QE embedded in all squads — consistent federated model" },
    { score: 5, label: "Quality is everyone's responsibility — QE engineers set standards, squads own outcomes" },
  ]},
  { id: "q3", dim: "quality", weight: 0.9, text: "How are API contracts between services managed?", options: [
    { score: 1, label: "No formal contract management — breaking changes discovered in production" },
    { score: 2, label: "OpenAPI specs exist but are not enforced" },
    { score: 3, label: "OpenAPI specs enforced in CI — schema validation on build" },
    { score: 4, label: "Consumer-driven contract testing (Pact or similar) — providers cannot break consumers" },
    { score: 5, label: "Full contract governance — Pact Broker, can-i-deploy gates, cross-team contract ownership" },
  ]},

  // AI
  { id: "a1", dim: "ai", weight: 1.2, text: "How is AI currently being used in your engineering and operations workflows?", options: [
    { score: 1, label: "Not yet — AI is on the roadmap but not in use" },
    { score: 2, label: "Experimental — individual engineers using Copilot or ChatGPT informally" },
    { score: 3, label: "Tactical — AI tools approved and in use for specific tasks (code completion, documentation)" },
    { score: 4, label: "Systematic — AI embedded in defined workflows with governance and measurement" },
    { score: 5, label: "Agentic — AI agents operating autonomously within defined boundaries with human oversight" },
  ]},
  { id: "a2", dim: "ai", weight: 1.1, text: "What is your AI governance posture?", options: [
    { score: 1, label: "No governance — AI is used without policy or oversight" },
    { score: 2, label: "Policy exists on paper — compliance is informal and inconsistent" },
    { score: 3, label: "Risk classification framework in place — some human oversight for high-risk AI decisions" },
    { score: 4, label: "AIGP or equivalent framework — risk classification, audit trail, human-on-the-loop boundaries defined" },
    { score: 5, label: "AIGP fully implemented — every AI decision classified, auditable, explainable, and attributed" },
  ]},
  { id: "a3", dim: "ai", weight: 0.8, text: "How AI-ready is your data infrastructure?", options: [
    { score: 1, label: "No structured data platform — data is siloed and inconsistent" },
    { score: 2, label: "Data warehouse exists — historical data available, not real-time" },
    { score: 3, label: "Modern data platform — data lake, real-time streaming, some ML models in production" },
    { score: 4, label: "AI-ready — vector embeddings, RAG capability, model serving infrastructure in place" },
    { score: 5, label: "Enterprise AI platform — RAG, fine-tuning pipeline, model governance, bias monitoring" },
  ]},

  // GOVERNANCE
  { id: "g1", dim: "governance", weight: 1.3, text: "How would you characterize your current regulatory compliance posture?", options: [
    { score: 1, label: "Reactive — compliance issues are discovered during audits or incidents" },
    { score: 2, label: "Aware — we know the requirements but compliance is manual and inconsistent" },
    { score: 3, label: "Structured — compliance processes exist and are followed, but evidence collection is manual" },
    { score: 4, label: "Automated — controls are implemented in systems, evidence is auto-collected" },
    { score: 5, label: "Continuous — real-time compliance monitoring, self-identification, proactive remediation" },
  ]},
  { id: "g2", dim: "governance", weight: 1.0, text: "How are architectural decisions made and documented?", options: [
    { score: 1, label: "No formal process — decisions are made informally and not documented" },
    { score: 2, label: "Informal review — senior engineers review major decisions verbally" },
    { score: 3, label: "Architecture Review Board (ARB) exists — reviews happen but inconsistently" },
    { score: 4, label: "ARB with Architecture Decision Records (ADRs) — decisions documented and searchable" },
    { score: 5, label: "Full governance — ARB, ADRs, technology radar, and deviation process all in place" },
  ]},
  { id: "g3", dim: "governance", weight: 0.9, text: "How is security integrated into your delivery pipeline?", options: [
    { score: 1, label: "Post-launch — security testing happens after deployment" },
    { score: 2, label: "Pre-launch — security review before major releases" },
    { score: 3, label: "Shift-left — SAST in CI pipeline, DAST on staging" },
    { score: 4, label: "Comprehensive — SAST, DAST, SCA, secrets scanning, and supply chain signing in pipeline" },
    { score: 5, label: "DevSecOps — security is pipeline infrastructure, not a gate. Zero-trust architecture implemented." },
  ]},

  // ORGANIZATIONAL HEALTH
  { id: "o1", dim: "org", weight: 1.2, text: "How would you describe psychological safety on your engineering team?", options: [
    { score: 1, label: "Low — people are afraid to raise problems or admit mistakes" },
    { score: 2, label: "Inconsistent — safety varies significantly by team and manager" },
    { score: 3, label: "Moderate — problems are surfaced but political dynamics sometimes suppress them" },
    { score: 4, label: "High — team members consistently raise concerns without fear of retribution" },
    { score: 5, label: "Exceptional — the team actively seeks out and surfaces problems. Failure is a learning event." },
  ]},
  { id: "o2", dim: "org", weight: 1.0, text: "What is your voluntary engineering attrition rate annually?", options: [
    { score: 1, label: "> 25% — significant instability, knowledge loss is a continuous problem" },
    { score: 2, label: "15–25% — above industry average, retention is a concern" },
    { score: 3, label: "10–15% — near industry average" },
    { score: 4, label: "5–10% — below average, good retention indicators" },
    { score: 5, label: "< 5% — exceptional retention, strong culture and growth signals" },
  ]},
  { id: "o3", dim: "org", weight: 0.8, text: "How structured is your engineering talent development program?", options: [
    { score: 1, label: "None — development happens informally or not at all" },
    { score: 2, label: "Basic — annual performance reviews, informal learning" },
    { score: 3, label: "Structured — career ladders defined, development plans exist for some engineers" },
    { score: 4, label: "Systematic — career ladders, development plans, internal mobility, structured learning budget" },
    { score: 5, label: "Differentiating — talent development is a competitive advantage. Engineers grow here." },
  ]},

  // PLATFORM
  { id: "p1", dim: "platform", weight: 1.2, text: "How would you describe your current observability capability?", options: [
    { score: 1, label: "Blind — we find out about problems from customers" },
    { score: 2, label: "Basic — server metrics and logs, no distributed tracing" },
    { score: 3, label: "Structured — APM, distributed tracing, and alerting in place for critical paths" },
    { score: 4, label: "Comprehensive — full observability stack: metrics, traces, logs, synthetic monitoring" },
    { score: 5, label: "AIOps — AI-assisted alert correlation, anomaly detection, and root cause identification" },
  ]},
  { id: "p2", dim: "platform", weight: 1.0, text: "How is your infrastructure managed?", options: [
    { score: 1, label: "Manual — infrastructure is provisioned and configured by hand" },
    { score: 2, label: "Scripted — shell scripts or basic automation, inconsistent across teams" },
    { score: 3, label: "IaC — Terraform or CloudFormation, most infrastructure is code" },
    { score: 4, label: "GitOps — all infrastructure version-controlled, peer-reviewed, and deployed via CI/CD" },
    { score: 5, label: "Platform engineering — golden paths, self-service, developer portal. Infrastructure is invisible to product teams." },
  ]},
  { id: "p3", dim: "platform", weight: 0.8, text: "How would you characterize your architecture's resilience to failure?", options: [
    { score: 1, label: "Single points of failure — known vulnerabilities that have not been addressed" },
    { score: 2, label: "Some redundancy — critical paths have basic failover" },
    { score: 3, label: "Active-passive — most critical systems have a failover path" },
    { score: 4, label: "Active-active — critical paths are multi-region with automatic failover" },
    { score: 5, label: "Chaos-tested — failures are regularly injected. Recovery is practiced. Blast radius is known." },
  ]},
];

const MATURITY_LEVELS = [
  { min: 0, max: 1.5, label: "Initial", color: "#8B3A3A", desc: "Ad hoc practices. High variability. Outcomes are unpredictable." },
  { min: 1.5, max: 2.5, label: "Developing", color: "#8B6914", desc: "Processes emerging. Inconsistent adoption. Improvement is recognized as needed." },
  { min: 2.5, max: 3.5, label: "Defined", color: "#2E7D9A", desc: "Practices documented and adopted. Outcomes are becoming predictable." },
  { min: 3.5, max: 4.5, label: "Managed", color: "#3A7A55", desc: "Quantitatively managed. Continuous improvement is systematic." },
  { min: 4.5, max: 5.0, label: "Optimizing", color: "#B8860B", desc: "Innovation and optimization. The practice is a competitive advantage." },
];

const RECOMMENDATIONS = {
  delivery: [
    { threshold: 2, rec: "Establish a Change Advisory Board and deployment runbook before increasing deployment frequency. Speed without governance creates risk.", component: "Leadership OS → Governance" },
    { threshold: 3, rec: "Implement feature flags and blue-green deployment. These two capabilities unlock deployment frequency without increasing risk.", component: "Architecture Explorer → Infrastructure Layer" },
    { threshold: 4, rec: "Focus on reducing lead time — the gap between commit and production. Identify the longest-running steps in your pipeline and target them for parallelization.", component: "Leadership OS → Measurement" },
  ],
  quality: [
    { threshold: 2, rec: "Establish a Quality Engineering COE before attempting to scale automation. Standards must precede scale.", component: "Leadership OS → Team Design → COE Phase" },
    { threshold: 3, rec: "Implement consumer-driven contract testing (Pact). This single investment prevents more production incidents than any other quality engineering practice.", component: "Architecture Explorer → API Gateway Layer" },
    { threshold: 4, rec: "Move to a fully federated embedded model. Quality owned by the squad, governed by shared standards, not owned by a central team.", component: "Leadership OS → Team Design → Federated Model" },
  ],
  ai: [
    { threshold: 2, rec: "Establish AI governance policy before expanding AI tool adoption. Ungoverned AI in a regulated environment is a compliance liability, not a productivity gain.", component: "Intelligence Layer → AIGP Governance" },
    { threshold: 3, rec: "Implement RAG for your highest-volume knowledge retrieval use case. This is the lowest-risk, highest-value starting point for enterprise AI.", component: "Intelligence Layer → RAG" },
    { threshold: 4, rec: "Begin designing your agentic architecture. Define human-on-the-loop boundaries before deploying any autonomous agent in production.", component: "Intelligence Layer → A2A" },
  ],
  governance: [
    { threshold: 2, rec: "Implement Architecture Decision Records (ADRs) this week. This single practice creates institutional memory and prevents repeated mistakes at near-zero cost.", component: "Leadership OS → Governance → ARB" },
    { threshold: 3, rec: "Shift security left — SAST in the PR gate, not the release gate. Every week a vulnerability exists in main without being caught is a week of risk accumulation.", component: "Industry Domains → Platform & Security" },
    { threshold: 4, rec: "Implement continuous compliance monitoring. Real-time control evidence collection eliminates the quarterly audit scramble and gives regulators what they actually want.", component: "Leadership OS → Governance → TRC" },
  ],
  org: [
    { threshold: 2, rec: "Psychological safety is the prerequisite for everything else. Before process, before tooling, before strategy — run a team health assessment and act on what you find.", component: "Leadership OS → Philosophy → Lead with Purpose" },
    { threshold: 3, rec: "Implement structured career ladders and individual development plans. Engineers who cannot see a growth path leave. Engineers who can see a growth path stay and compound.", component: "Leadership OS → Team Design → Talent Principles" },
    { threshold: 4, rec: "Build an internal mobility program. The best signal of organizational health is whether your best people are choosing to grow inside rather than outside.", component: "Leadership OS → Measurement → Organizational Metrics" },
  ],
  platform: [
    { threshold: 2, rec: "Implement distributed tracing before anything else in the observability stack. You cannot optimize what you cannot see, and you cannot see a distributed system without traces.", component: "Industry Domains → SRE & AIOps" },
    { threshold: 3, rec: "Move to infrastructure as code (Terraform). Every manually provisioned resource is a compliance risk and a reproducibility problem. This is a one-quarter investment with a multi-year payoff.", component: "Architecture Explorer → Infrastructure Layer" },
    { threshold: 4, rec: "Run your first GameDay. Deliberately inject a failure — auth service outage, database degradation — and practice recovery as a team. The gap between your runbook and your reality will surprise you.", component: "Industry Domains → SRE & AIOps" },
  ],
};

function getMaturityLevel(score) {
  return MATURITY_LEVELS.find(l => score >= l.min && score <= l.max) || MATURITY_LEVELS[0];
}

function getTopRecommendations(scores) {
  const recs = [];
  Object.entries(scores).forEach(([dim, score]) => {
    const dimRecs = RECOMMENDATIONS[dim] || [];
    const applicable = dimRecs.filter(r => score <= r.threshold).slice(0, 1);
    applicable.forEach(r => recs.push({ dim, score, ...r }));
  });
  return recs.sort((a, b) => a.score - b.score).slice(0, 4);
}

function RadarChart({ scores }) {
  const dims = DIMENSIONS;
  const cx = 160, cy = 160, r = 120;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const angleStep = (Math.PI * 2) / dims.length;
  const getPoint = (angle, radius) => ({
    x: cx + radius * Math.sin(angle),
    y: cy - radius * Math.cos(angle),
  });

  const scorePoints = dims.map((d, i) => {
    const angle = i * angleStep;
    const score = (scores[d.id] || 1) / 5;
    return getPoint(angle, r * score);
  });

  const scorePath = scorePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg width="320" height="320" viewBox="0 0 320 320">
      {/* Grid circles */}
      {levels.map((l, i) => (
        <circle key={i} cx={cx} cy={cy} r={r * l} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* Axis lines */}
      {dims.map((d, i) => {
        const angle = i * angleStep;
        const end = getPoint(angle, r);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
      })}
      {/* Score polygon */}
      <path d={scorePath} fill="rgba(184,134,11,0.15)" stroke="#B8860B" strokeWidth="1.5" />
      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={dims[i].color} />
      ))}
      {/* Labels */}
      {dims.map((d, i) => {
        const angle = i * angleStep;
        const labelR = r + 22;
        const lp = getPoint(angle, labelR);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fill={d.color} fontFamily="monospace">
            {d.short}
          </text>
        );
      })}
      {/* Level labels */}
      {[1, 2, 3, 4, 5].map((l, i) => (
        <text key={i} x={cx + 4} y={cy - r * (l / 5) + 4} fontSize="8" fill="rgba(255,255,255,0.2)" fontFamily="monospace">{l}</text>
      ))}
    </svg>
  );
}

export default function ARIVMaturityAssessment() {
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro | assessment | results
  const [activeDim, setActiveDim] = useState(null);

  const totalQs = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const progress = answered / totalQs;

  const dimScores = {};
  DIMENSIONS.forEach(d => {
    const dQs = QUESTIONS.filter(q => q.dim === d.id);
    const totalWeight = dQs.reduce((s, q) => s + q.weight, 0);
    const weightedScore = dQs.reduce((s, q) => s + (answers[q.id] || 0) * q.weight, 0);
    dimScores[d.id] = totalWeight > 0 ? weightedScore / totalWeight : 0;
  });

  const overallScore = Object.values(dimScores).reduce((s, v) => s + v, 0) / DIMENSIONS.length;
  const overallLevel = getMaturityLevel(overallScore);
  const topRecs = getTopRecommendations(dimScores);

  const handleAnswer = (qId, score) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
    if (currentQ < totalQs - 1) {
      setTimeout(() => setCurrentQ(prev => prev + 1), 300);
    } else {
      setTimeout(() => setPhase("results"), 400);
    }
  };

  const q = QUESTIONS[currentQ];
  const currentDim = DIMENSIONS.find(d => d.id === q?.dim);

  if (phase === "intro") return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 580, padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 16 }}>ARIV · Maturity Assessment</div>
        <h1 style={{ margin: "0 0 14px", fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: -0.8 }}>Where is your organization on the transformation journey?</h1>
        <p style={{ margin: "0 0 28px", fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.8 }}>
          18 questions across six dimensions — Delivery Velocity, Quality Engineering, AI Readiness, Governance, Organizational Health, and Technology Platform. Takes 6–8 minutes. Produces a scored maturity profile and prioritized recommendations.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 28 }}>
          {DIMENSIONS.map(d => (
            <div key={d.id} style={{ padding: "10px", background: `${d.color}08`, border: `1px solid ${d.color}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 14, color: d.color, marginBottom: 4 }}>{d.icon}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{d.short}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setPhase("assessment")} style={{
          background: COLORS.gold, border: "none", borderRadius: 8, padding: "12px 32px",
          fontSize: 14, fontWeight: 500, color: "#080808", cursor: "pointer", fontFamily: "sans-serif",
        }}>Begin Assessment</button>
        <div style={{ marginTop: 14, fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>18 questions · 6–8 minutes · No data stored</div>
      </div>
    </div>
  );

  if (phase === "assessment") return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', serif" }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", background: currentDim?.color || COLORS.gold, width: `${progress * 100}%`, transition: "width 0.3s" }} />
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 28px" }}>
        {/* Dimension indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <span style={{ fontSize: 18, color: currentDim?.color }}>{currentDim?.icon}</span>
          <div>
            <div style={{ fontSize: 10, color: currentDim?.color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>{currentDim?.label}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Question {currentQ + 1} of {totalQs}</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{Math.round(progress * 100)}% complete</div>
        </div>

        {/* Question */}
        <h2 style={{ margin: "0 0 28px", fontSize: 20, fontWeight: 400, color: "#fff", lineHeight: 1.4, letterSpacing: -0.3 }}>{q?.text}</h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {q?.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(q.id, opt.score)} style={{
              background: answers[q.id] === opt.score ? `${currentDim?.color}15` : "rgba(255,255,255,0.02)",
              border: `1px solid ${answers[q.id] === opt.score ? (currentDim?.color + "50") : "rgba(255,255,255,0.08)"}`,
              borderRadius: 10, padding: "14px 18px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                background: answers[q.id] === opt.score ? currentDim?.color : "rgba(255,255,255,0.06)",
                border: `1px solid ${answers[q.id] === opt.score ? (currentDim?.color) : "rgba(255,255,255,0.12)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, color: answers[q.id] === opt.score ? "#080808" : "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
              }}>{opt.score}</div>
              <div style={{ fontSize: 13, color: answers[q.id] === opt.score ? "#fff" : "rgba(255,255,255,0.58)", lineHeight: 1.5 }}>{opt.label}</div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7,
            padding: "8px 16px", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif",
          }}>← Previous</button>
          {answered === totalQs && (
            <button onClick={() => setPhase("results")} style={{
              background: COLORS.gold, border: "none", borderRadius: 7, padding: "8px 20px",
              cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#080808", fontFamily: "sans-serif",
            }}>View Results →</button>
          )}
        </div>
      </div>
    </div>
  );

  // RESULTS
  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', serif" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", height: 52 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>ARIV</span>
          <span style={{ marginLeft: 10, fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Maturity Assessment Results</span>
          <button onClick={() => { setAnswers({}); setCurrentQ(0); setPhase("intro"); }} style={{ marginLeft: "auto", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>Retake</button>
        </div>
        <div style={{ display: "flex", height: 2 }}>
          {DIMENSIONS.map((d, i) => <div key={i} style={{ flex: 1, background: d.color, opacity: 0.5 }} />)}
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, marginBottom: 28 }}>

          {/* Radar + overall */}
          <div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <RadarChart scores={dimScores} />
            </div>
            <div style={{ padding: "16px 18px", background: `${overallLevel.color}10`, border: `1px solid ${overallLevel.color}35`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>Overall Maturity</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: overallLevel.color, fontFamily: "monospace", marginBottom: 4 }}>{overallScore.toFixed(1)}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: 6 }}>{overallLevel.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>{overallLevel.desc}</div>
            </div>
          </div>

          {/* Dimension scores */}
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 14 }}>Dimension Scores</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DIMENSIONS.map(d => {
                const score = dimScores[d.id] || 0;
                const level = getMaturityLevel(score);
                return (
                  <button key={d.id} onClick={() => setActiveDim(activeDim === d.id ? null : d.id)} style={{
                    background: activeDim === d.id ? `${d.color}08` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeDim === d.id ? d.color + "35" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 9, padding: "12px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: d.color }}>{d.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>{d.label}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 16, fontWeight: 600, color: level.color, fontFamily: "monospace" }}>{score.toFixed(1)}</div>
                        <div style={{ fontSize: 10, color: level.color, fontFamily: "monospace" }}>{level.label}</div>
                      </div>
                    </div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(score / 5) * 100}%`, background: d.color, borderRadius: 2, transition: "width 0.6s" }} />
                    </div>
                    {activeDim === d.id && (
                      <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.65, fontStyle: "italic" }}>{level.desc}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 14 }}>
          Priority Recommendations — Highest Leverage Actions
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {topRecs.map((rec, i) => {
            const dim = DIMENSIONS.find(d => d.id === rec.dim);
            return (
              <div key={i} style={{ background: `${dim.color}06`, border: `1px solid ${dim.color}20`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: dim.color }}>{dim.icon}</span>
                  <div style={{ fontSize: 10, color: dim.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>{dim.short}</div>
                  <div style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>Score: {(dimScores[rec.dim] || 0).toFixed(1)}</div>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 8 }}>{rec.rec}</div>
                <div style={{ fontSize: 10, color: dim.color, fontFamily: "monospace", opacity: 0.7 }}>→ {rec.component}</div>
              </div>
            );
          })}
        </div>

        {/* Maturity scale reference */}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Maturity Scale Reference</div>
        <div style={{ display: "flex", gap: 7 }}>
          {MATURITY_LEVELS.map((l, i) => (
            <div key={i} style={{ flex: 1, padding: "10px 12px", background: `${l.color}08`, border: `1px solid ${l.color}22`, borderRadius: 7, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: l.color, marginBottom: 3 }}>{l.label}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{l.min}–{l.max}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
