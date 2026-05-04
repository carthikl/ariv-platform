import { useState } from "react";

const COLORS = {
  gold: "#B8860B",
  teal: "#2E7D9A",
  green: "#3A7A55",
  purple: "#6A3A9A",
  red: "#8B3A3A",
  slate: "#4A5A6A",
};

const SECTIONS = [
  { id: "philosophy", label: "Philosophy", icon: "◈", color: COLORS.gold },
  { id: "cadence", label: "Operating Cadence", icon: "⬡", color: COLORS.teal },
  { id: "governance", label: "Governance", icon: "◉", color: COLORS.purple },
  { id: "team", label: "Team Design", icon: "⬢", color: COLORS.green },
  { id: "measurement", label: "Measurement", icon: "◆", color: COLORS.red },
  { id: "entry", label: "Entry Playbook", icon: "◻", color: COLORS.slate },
];

const PHILOSOPHY = {
  statement: "Confidence to deliver to production with trust, safety, and at the speed the business demands — through technology that adds value to business and people, not for technology's sake — with measurable, tangible, sustainable results.",
  distinction: "This is not a QE operating model. This is an executive operating model that applies to any transformation — quality engineering, platform modernization, AI adoption, regulatory remediation, or organizational redesign. The principles are universal. The application is context-specific.",
  pillars: [
    {
      name: "Think Ahead & Stay Relevant",
      color: COLORS.gold,
      detail: "Anticipate where the business and technology are going — not where they are. Read the regulatory environment before it reads you. Build the credential before the job requires it. The leader who is relevant in the next moment is the leader who invested in relevance before it was urgent.",
      behaviors: ["Continuous learning — credentials, frameworks, emerging technology", "Scenario planning — what does this look like in 3 years?", "Network investment — relationships before you need them", "Signal reading — what are the PE operating committee, the regulators, the engineers actually saying?"],
    },
    {
      name: "Data-Driven Decisioning",
      color: COLORS.teal,
      detail: "Every significant decision has a hypothesis, a measurement, and a validation. Not every decision requires a dashboard — but every decision requires an honest answer to: how will we know if this worked? The absence of measurement is not agility. It is avoidance.",
      behaviors: ["Hypothesis before investment — what outcome do we expect and how will we measure it?", "Baseline before change — you cannot measure improvement without a starting point", "Attribution honesty — what percentage of this outcome was actually our contribution?", "Financial translation — every technology metric has a business dollar equivalent"],
    },
    {
      name: "Lead with Purpose",
      color: COLORS.green,
      detail: "People do not sustain extraordinary effort for a project plan. They sustain it for a mission that matters. The leader's job is to connect the work to the why — not in a town hall speech, but in the daily conversation. Why does this test suite matter? Because a patient is picking up a prescription tomorrow.",
      behaviors: ["Connect individual work to organizational outcome — every sprint, every conversation", "Create psychological safety — people who fear failure hide problems", "Recognize publicly, develop privately", "Be the change — model the behavior you require, especially under pressure"],
    },
    {
      name: "Achieving Results Without Losing the Experience",
      color: COLORS.purple,
      detail: "Results that destroy the team, the customer experience, or the organization's trust are not results — they are debts. The operating model must deliver measurable outcomes AND sustain the people, relationships, and culture that make future outcomes possible. Speed without safety is not Quality@Speed. It is just speed.",
      behaviors: ["Track team health as rigorously as delivery metrics", "Protect psychological safety during high-pressure delivery", "Customer experience is a success criterion — not a downstream consideration", "Sustainable pace — unsustainable heroics are a risk, not a strength"],
    },
  ],
  principles: [
    { label: "Design for Quality", detail: "Quality is built into the product lifecycle — not added at the end. Every design decision, every architecture choice, every sprint plan has a quality dimension. The testing team is not the quality department. Quality is everyone's responsibility." },
    { label: "Governance as Guardrails", detail: "Governance enables delivery — it does not impede it. A governance framework that slows delivery is a governance framework that has been designed wrong. Guardrails keep you on the road. They do not slow the car." },
    { label: "Collective Success", detail: "None of us are smarter than all of us together. The operating model creates the conditions for collective intelligence — diverse perspectives, psychological safety, shared context, and a decision-making framework that uses that intelligence effectively." },
    { label: "Honest Measurement", detail: "Report what is true — including what is not working. An organization that only measures and reports success is an organization that has stopped learning. The monthly operating review should surface problems before they become crises." },
  ],
};

const CADENCE = {
  intro: "The operating cadence is the heartbeat of the transformation. It creates predictability for the team, visibility for leadership, and accountability for outcomes. Cadence without discipline is theater. Discipline without cadence is chaos.",
  rhythms: [
    {
      period: "Annual",
      color: COLORS.gold,
      title: "Strategy & Portfolio Planning",
      activities: [
        { name: "3-Year Technology Roadmap", desc: "Where are we going? Not a detailed plan — a directional commitment that informs annual investment decisions." },
        { name: "Annual OKR Setting", desc: "3-5 objectives per team. Each objective has 3-5 key results with measurable targets. Objectives are ambitious. Key results are binary — either achieved or not." },
        { name: "Portfolio Investment Review", desc: "Which programs get funded? Which are paused? Which are accelerated? Evidence-based allocation — not political negotiation." },
        { name: "Organizational Design Review", desc: "Does the team structure still match the strategy? Are the right people in the right roles? This is the annual conversation most leaders avoid." },
      ],
      artifact: "Annual Technology Strategy + Portfolio Plan",
      owner: "CTO/CIO + Leadership Team",
    },
    {
      period: "Quarterly",
      color: COLORS.teal,
      title: "OKR Review & Replan",
      activities: [
        { name: "OKR Progress Review", desc: "What did we deliver against last quarter's key results? Be honest — a 70% achievement on an ambitious OKR is better than 100% on a sandbagged one." },
        { name: "Next Quarter Planning", desc: "Define the next quarter's key results with specific, measurable targets. Teams present their plans. Leadership challenges the ambition and the dependencies." },
        { name: "Risk & Dependency Review", desc: "What are the cross-team dependencies that could derail delivery? What are the regulatory or vendor risks that need active management?" },
        { name: "Financial Forecast Update", desc: "Are we on track against the budget? What variances need executive attention? Where do we need to reallocate?" },
      ],
      artifact: "Quarterly Business Review (QBR) + Forecast Update",
      owner: "Program Director + Finance",
    },
    {
      period: "Monthly",
      color: COLORS.green,
      title: "Operating Metrics & Portfolio Health",
      activities: [
        { name: "Portfolio Status Report", desc: "Every program: RAG status (Red/Amber/Green), key milestones, risks, decisions needed. One page per program. No surprises." },
        { name: "Financial Actuals vs. Forecast", desc: "Spend vs. budget. Benefit realization vs. plan. Variance explanation and corrective action." },
        { name: "Quality & Reliability Metrics", desc: "Deployment frequency, MTTR, change failure rate, test automation coverage, SLO compliance. Trend lines — not point-in-time snapshots." },
        { name: "Talent & Organizational Health", desc: "Attrition, hiring velocity, open roles, engagement indicators. Talent is the most important leading indicator of delivery risk." },
      ],
      artifact: "Monthly Operating Review (MOR) Deck",
      owner: "Senior Director / VP + PMO",
    },
    {
      period: "Weekly",
      color: COLORS.purple,
      title: "Delivery Rhythm & Impediment Removal",
      activities: [
        { name: "Program Standup (30 min)", desc: "Three questions per team: What did we deliver? What is blocked? What do we need from leadership? Leadership's job: remove the blockers." },
        { name: "Architecture Review", desc: "Any significant architectural decision requires a peer review before implementation. Not every decision — the ones that are hard to reverse." },
        { name: "Release Review", desc: "What is going to production this week? Who has reviewed it? What is the rollback plan? What monitoring is in place?" },
        { name: "1:1 Leadership Cadence", desc: "Weekly 1:1 with every direct report. Not a status update — a human conversation. Career, concerns, energy, blockers." },
      ],
      artifact: "Standup Notes + Release Approval Record",
      owner: "Engineering Leads + Scrum Masters",
    },
    {
      period: "Daily",
      color: COLORS.red,
      title: "Execution & Incident Response",
      activities: [
        { name: "Team Standup (15 min)", desc: "Yesterday, today, blockers. Time-boxed. Blockers escalated same day — not accumulated to the weekly review." },
        { name: "Incident Review (as needed)", desc: "Every P1/P2 incident has a technical lead and a business communicator from the moment it is declared. Communication cadence: every 30 minutes until resolved." },
        { name: "Deployment Monitoring", desc: "Every production deployment is monitored for 2 hours post-release. Synthetic tests, error rates, latency metrics. Auto-rollback if thresholds breached." },
        { name: "Leadership Availability", desc: "Leaders are accessible — not in back-to-back meetings all day. Block 2 hours of open time daily. Teams need to reach you when it matters." },
      ],
      artifact: "Incident Report + Deployment Log",
      owner: "On-Call Engineer + Team Lead",
    },
  ],
};

const GOVERNANCE = {
  intro: "Governance is the structural mechanism that makes the operating model sustainable. It is not bureaucracy. It is the decision framework that enables fast, reversible decisions at the team level and ensures consequential, hard-to-reverse decisions get the right attention at the right level.",
  principle: "The right decision at the right level at the right time. Decisions should be made as close to the work as possible — escalated only when they are cross-cutting, high-stakes, or hard to reverse.",
  bodies: [
    {
      name: "Architecture Review Board",
      abbrev: "ARB",
      color: COLORS.teal,
      cadence: "Weekly — 60 minutes",
      chair: "Chief Architect / CTO",
      members: ["Domain Architects (Card, Banking, Payments, Platform)", "Security Architect", "Data Architect", "Engineering Representative per Squad"],
      decisions: ["Significant architectural changes — any decision that affects more than one team", "New technology adoption — adding a tool or framework to the approved stack", "Cross-service integration patterns — API contracts, event schema, data contracts", "Infrastructure architecture changes — cloud regions, networking, security boundaries"],
      notDecisions: ["Implementation details within a bounded context — team decides", "Technology choices within the approved stack — team decides", "Sprint-level technical decisions — team decides"],
      artifact: "Architecture Decision Records (ADRs) — committed to the repository",
    },
    {
      name: "Technology Risk Committee",
      abbrev: "TRC",
      color: COLORS.red,
      cadence: "Monthly — 90 minutes",
      chair: "CTO / CIO",
      members: ["CISO", "Chief Architect", "Compliance Officer", "Business Unit Technology Leaders", "Risk Management Representative"],
      decisions: ["Enterprise-wide security and compliance posture", "Regulatory risk — OCC, FDIC, PCI-DSS, HIPAA requirements and remediation", "Third-party and supply chain risk", "AI governance — AIGP risk classification changes and agent deployment approvals", "Consent order progress and self-identification findings"],
      notDecisions: ["Team-level security practices within the approved framework", "Vendor selection within approved vendor list", "Individual AI agent configurations within approved parameters"],
      artifact: "Risk Register Update + Regulatory Status Report",
    },
    {
      name: "Change Advisory Board",
      abbrev: "CAB",
      color: COLORS.purple,
      cadence: "Weekly — 30 minutes",
      chair: "Release Manager / Engineering Director",
      members: ["Release Manager", "On-Call Lead", "QE Lead", "Operations Representative", "Business Stakeholder (rotating)"],
      decisions: ["Production release approval — all changes going to production", "Emergency change authorization — P1 hotfixes outside normal release window", "Release freeze periods — holiday windows, high-traffic events", "Rollback decisions — when to roll back a live release"],
      notDecisions: ["Development environment changes", "Test environment changes", "Documentation updates", "Configuration changes within approved bounds"],
      artifact: "Change Record + Release Approval Log",
    },
    {
      name: "Executive Steering Committee",
      abbrev: "ESC",
      color: COLORS.gold,
      cadence: "Quarterly — 2 hours",
      chair: "CIO / SVP Technology",
      members: ["Business Unit Presidents", "CFO", "Chief Risk Officer", "CTO", "Chief Architect", "Program Director"],
      decisions: ["Portfolio investment decisions — fund, pause, accelerate, cancel programs", "Strategic direction changes — responding to regulatory, market, or competitive shifts", "Organizational design — major structural changes to the technology organization", "Vendor relationships — significant contract decisions, partnership changes"],
      notDecisions: ["Program-level delivery decisions — escalate only when budget or timeline is at risk", "Technical implementation — not this committee's domain", "Day-to-day operational decisions"],
      artifact: "Executive Portfolio Dashboard + Quarterly Strategy Update",
    },
  ],
  alignedAutonomy: {
    title: 'Aligned Autonomy',
    tagline: 'Teams have full autonomy within aligned guardrails. The guardrails are the alignment.',
    definition: 'Aligned Autonomy is the governance principle that makes federated delivery sustainable at scale. It resolves the false tension between control and speed: teams move fast because the guardrails are clear, not in spite of them. The alignment comes first. The autonomy follows.',
    how: [
      { layer: 'Strategic Alignment', what: 'Where are we going?', who: 'Executive team sets annually', guardrail: 'OKRs — what we will achieve', autonomy: 'Teams choose how to achieve it' },
      { layer: 'Technical Alignment', what: 'How do we build?', who: 'ARB sets quarterly', guardrail: 'Technology radar — what is approved', autonomy: 'Teams choose within the approved stack' },
      { layer: 'Quality Alignment', what: 'What does good look like?', who: 'QE Lead sets continuously', guardrail: 'Quality standards — automation coverage, test strategy, pipeline gates', autonomy: 'Squads own their quality outcomes' },
      { layer: 'Security Alignment', what: 'What must not happen?', who: 'CISO sets continuously', guardrail: 'Security standards — SAST, DAST, secrets management, zero trust', autonomy: 'Teams choose implementation within the standards' },
      { layer: 'Release Alignment', what: 'How do we ship?', who: 'CAB governs weekly', guardrail: 'Change management — approval for production, rollback plan, monitoring', autonomy: 'Teams ship when ready, with the right approvals in place' },
    ],
    failure_modes: [
      { mode: 'Misaligned Autonomy', desc: 'Teams have autonomy but no shared direction. Every team builds differently. Integration is a nightmare. Standards do not exist. Speed at the team level, chaos at the system level.' },
      { mode: 'Aligned Non-Autonomy', desc: 'Direction is clear but teams have no authority to act without approval. Every decision escalates. Leaders are the bottleneck. Delivery slows to the cadence of the leadership team.' },
      { mode: 'False Alignment', desc: 'The guardrails exist on paper but are not enforced. Teams are told to follow standards and do not. The governance is theater. The autonomy is ungoverned.' },
    ],
    test: 'The Aligned Autonomy test: Can any engineer on any team answer these three questions without asking a manager? (1) What are we trying to achieve this quarter? (2) What technology choices are approved? (3) What must I do before deploying to production? If the answer to all three is yes — you have Aligned Autonomy.',
  },
  escalation: [
    { trigger: "Team-level decision", level: "Engineering Lead", time: "Same day", example: "Implementation approach, test strategy, code review feedback" },
    { trigger: "Cross-team dependency or architectural change", level: "ARB", time: "Next weekly ARB", example: "New service integration, schema change affecting multiple teams" },
    { trigger: "Risk, compliance, or security issue", level: "TRC", time: "Next monthly TRC (P1: same day)", example: "Vulnerability in production, regulatory finding, consent order item" },
    { trigger: "Budget or timeline risk", level: "ESC", time: "Next quarterly ESC (material: immediate)", example: "Program is 20%+ over budget, milestone slippage affecting a regulatory deadline" },
  ],
};

const TEAM = {
  intro: "The right team structure for the right moment in the transformation journey. There is no universal answer. The structure that works at the start of a transformation is not the structure that sustains it. Evolution is the plan.",
  evolution: [
    {
      phase: "Phase 1",
      model: "Center of Excellence",
      abbrev: "COE",
      color: COLORS.gold,
      when: "0–18 months — establishing standards, capability, and credibility",
      structure: "A dedicated team of specialists who define standards, build tools, and demonstrate what good looks like. Product teams consume the COE's output.",
      strength: "Speed of standard-setting. Concentrated expertise. Clear accountability for quality engineering outcomes.",
      risk: "Becomes a bottleneck. Creates 'us vs. them' dynamic with product teams. Does not scale.",
      right_when: "The organization has no shared quality engineering practice. Standards do not exist. The COE creates them.",
      wrong_when: "Product teams are waiting on the COE for approval. The COE is a gate, not a service.",
      size: "8–15 specialists. Larger is a warning sign.",
      metrics: ["Standards documented and adopted", "Tools built and deployed", "Training delivered", "COE NPS from product teams"],
    },
    {
      phase: "Phase 2",
      model: "Community of Practice",
      abbrev: "COP",
      color: COLORS.teal,
      when: "12–36 months — scaling knowledge across product teams",
      structure: "Embedded QE engineers in each product squad, connected by a community of practice with shared standards, tools, and a regular forum for knowledge exchange. COE transitions to platform and standards team.",
      strength: "Knowledge scales across squads. Product teams own their quality. The COE's cognitive load decreases.",
      risk: "Embedded engineers get absorbed into feature delivery and lose the quality engineering practice identity.",
      right_when: "Standards exist and are documented. At least 3–4 squads are ready for embedded engineers. Leadership is committed to resisting the temptation to pull embedded QEs onto feature work.",
      wrong_when: "Standards are not stable. Product teams do not have the maturity to partner with an embedded engineer.",
      size: "1 QE engineer per 5–8 developers per squad",
      metrics: ["Automation coverage per squad", "Test cycle time per squad", "Defect escape rate per squad", "COP participation rate"],
    },
    {
      phase: "Phase 3",
      model: "Federated Embedded Model",
      abbrev: "FEM",
      color: COLORS.green,
      when: "24 months+ — quality as a natural part of how every team works",
      structure: "Quality engineering is fully embedded in product squads. The central platform team provides tooling, standards evolution, and a governance layer. Quality is a shared responsibility — not a function that happens to an engineering team.",
      strength: "Quality engineering scales with the organization. No bottleneck. Product teams fully own their quality outcomes.",
      risk: "Quality standards drift if the platform team loses influence. The governance layer must remain active — not passive.",
      right_when: "Product teams have demonstrated the maturity to own quality outcomes. Automation coverage is above 60%. Test cycle time is within target.",
      wrong_when: "Product teams still depend on central QE for test strategy or test execution. The embedded model requires genuine delegation, not nominal delegation.",
      size: "Platform team: 3–5 people. Embedded: 1 per squad. Full delegation.",
      metrics: ["Deployment frequency", "Change failure rate", "MTTR", "Automation coverage — maintained without central oversight"],
    },
  ],
  roles: [
    { role: "Engineering Director / VP", accountability: "Owns the operating model and transformation outcomes. The buck stops here on delivery, quality, and team health.", skills: ["Systems thinking", "Stakeholder management", "Financial stewardship", "Talent development"] },
    { role: "Principal Engineer", accountability: "Sets the technical standard. Reviews architectural decisions. Mentors senior engineers. The technical conscience of the organization.", skills: ["Deep technical expertise", "Architecture reasoning", "Teaching and documentation", "Technology radar maintenance"] },
    { role: "QE Lead / Staff QE", accountability: "Owns the quality engineering standard across the organization. Defines the test strategy, tooling, and automation approach.", skills: ["Test architecture", "Automation engineering", "AIGP governance", "Coaching embedded QEs"] },
    { role: "Engineering Manager", accountability: "Owns team health, delivery cadence, and individual growth for a squad of 6–10 engineers.", skills: ["1:1 coaching", "Delivery management", "Hiring and onboarding", "Conflict resolution"] },
    { role: "Product Owner", accountability: "Owns the product backlog, acceptance criteria, and business value of delivered features.", skills: ["Requirements clarity", "Stakeholder negotiation", "Value prioritization", "User research"] },
    { role: "Release Manager", accountability: "Owns the production release process — from change approval through deployment monitoring.", skills: ["Release coordination", "Risk assessment", "Communication under pressure", "CAB facilitation"] },
  ],
  talent: [
    { principle: "Hire for curiosity", detail: "Curiosity is the trait most predictive of long-term performance in a fast-changing technology environment. Skills can be learned. Curiosity cannot be taught." },
    { principle: "Develop for capability", detail: "Every engineer has a development plan. Every manager has a coaching conversation monthly. Learning is a structured activity — not something that happens when there is spare capacity." },
    { principle: "Retain through purpose", detail: "Engineers who understand why their work matters are more engaged and more productive. Connect the sprint to the strategy. Connect the strategy to the customer. Do this consistently." },
    { principle: "Exit with grace", detail: "When the fit is not right, address it directly and early. A performance problem that is not addressed becomes a team morale problem. Handle separations with dignity — how you treat people on the way out defines your culture more than how you treat them on the way in." },
  ],
};

const MEASUREMENT = {
  intro: "What gets measured gets managed. What gets reported gets governed. The measurement framework answers three questions: Are we delivering the right things? Are we delivering them well? Are we building the capability to deliver in the future?",
  formula: "Total Impact = Σ (Volume × Rate × Change Factor × Attribution %)",
  formulaNote: "Conservative discipline: halve the calculated value. Qualify with 'approximately.' Be ready to walk through the methodology for any number you report. The CFO will ask.",
  tiers: [
    {
      tier: "Delivery Metrics",
      color: COLORS.teal,
      desc: "Are we shipping?",
      metrics: [
        { name: "Deployment frequency", target: "Daily for small changes, weekly for larger releases", why: "The leading indicator of delivery capability. Low frequency = batch risk." },
        { name: "Lead time for changes", target: "< 1 week from commit to production", why: "Measures the friction in the delivery system. High lead time = accumulated waste." },
        { name: "Change failure rate", target: "< 5%", why: "What percentage of deployments cause a production incident. High rate = quality problem in the pipeline." },
        { name: "Mean time to recover (MTTR)", target: "< 1 hour for P1", why: "How quickly the team recovers from production incidents. Measures resilience." },
      ],
    },
    {
      tier: "Quality Metrics",
      color: COLORS.green,
      desc: "Are we shipping the right things well?",
      metrics: [
        { name: "Test automation coverage", target: "> 65% — trending up", why: "The foundation of sustained delivery velocity. Coverage below 40% is a structural risk." },
        { name: "Defect escape rate", target: "< 2% of user stories", why: "Defects that reach production. Measures the effectiveness of the quality pipeline." },
        { name: "Test cycle time", target: "< 2 weeks", why: "How long from feature complete to release-ready. Long cycles = delivery bottleneck." },
        { name: "SLO compliance", target: "> 99.9% for critical paths", why: "Are we meeting the reliability promises we made to customers and the business?" },
      ],
    },
    {
      tier: "Financial Metrics",
      color: COLORS.gold,
      desc: "Are we generating value?",
      metrics: [
        { name: "Budget variance", target: "< ±10% actuals vs. forecast", why: "Financial stewardship. Consistent variance in either direction indicates a forecasting problem." },
        { name: "Benefit realization", target: "Tracked quarterly against business case", why: "Did the investment deliver the outcomes it promised? Most programs never measure this." },
        { name: "Cost per deployment", target: "Trending down year over year", why: "The efficiency signal. As automation matures, the cost of delivery should decrease." },
        { name: "Engineering productivity", target: "Measured as feature throughput per engineer", why: "Not lines of code — working software delivered per engineer per quarter. Trending up is the goal." },
      ],
    },
    {
      tier: "Organizational Metrics",
      color: COLORS.purple,
      desc: "Are we building the capability to deliver in the future?",
      metrics: [
        { name: "Voluntary attrition", target: "< 10% annually", why: "The most expensive organizational metric. Each departure costs 1.5–2x annual salary in replacement cost and productivity loss." },
        { name: "Internal mobility rate", target: "> 20% of open roles filled internally", why: "Measures whether the organization is developing and retaining talent or just buying it." },
        { name: "Psychological safety score", target: "> 4.0 / 5.0 on team survey", why: "Teams with high psychological safety identify problems earlier and solve them faster." },
        { name: "Learning investment", target: "> 40 hours per engineer per year", why: "In technology, capability that is not continuously refreshed depreciates. This is a leading indicator." },
      ],
    },
  ],
  reporting: [
    { audience: "Engineering teams", format: "Sprint retrospective + velocity chart", frequency: "Every 2 weeks", focus: "Delivery, blockers, team health" },
    { audience: "Program stakeholders", format: "RAG status report + risk register", frequency: "Monthly", focus: "Portfolio health, financial actuals, risks" },
    { audience: "Executive / SLT", format: "One-page operating summary + 3 key metrics", frequency: "Monthly", focus: "Outcomes vs. plan, decisions needed, financial stewardship" },
    { audience: "Board / PE operating committee", format: "Quarterly business review + financial impact summary", frequency: "Quarterly", focus: "Strategic progress, value creation, risk posture" },
    { audience: "Regulators (OCC/FDIC/FRB)", format: "Consent order progress report + evidence package", frequency: "Per regulatory cadence", focus: "Remediation progress, self-identification findings, control effectiveness" },
  ],
};

const ENTRY = {
  intro: "The first 90 days of any leadership role determines the next 3 years. Not because of what you deliver — you will not deliver much in 90 days. But because of the trust, context, and relationships you build that make everything after possible.",
  intention: "Breathe slowly. Stay with your breath — fully present in the moment, in the room, with the people. Connect genuinely, not performing to the interview or the role. Let your honest, authentic experience and curiosity with intention guide you. Own the room with courage, intent, and compassion as a true leader who cares.",
  phases: [
    {
      phase: "Days 1–30",
      title: "Listen. Learn. Map.",
      color: COLORS.teal,
      focus: "Listen more than you speak. The organization knows things you do not. Your job is to learn — not to impress.",
      activities: [
        { name: "The Listening Tour", detail: "One-on-one conversations with every direct report, every key stakeholder, and at least 10 engineers. Three questions: What is working well that I should protect? What is most broken? What would you do if you were in my seat? Listen. Take notes. Do not make commitments." },
        { name: "Shadow the work", detail: "Sit with engineers, support agents, pharmacists, advisors — whoever the team serves. Understand the actual workflow, not the documented workflow. They are different. The gap between them is where the transformation opportunity lives." },
        { name: "Map the power structure", detail: "Who makes decisions? Who influences decisions? Who knows where the bodies are buried? This is not cynical — it is essential. Transformation requires navigating the existing power structure, not pretending it does not exist." },
        { name: "Understand the regulatory context", detail: "Read the last audit report, the last consent order, the last regulatory exam. Understand what the regulators care about before you make your first move. A transformation that creates a new regulatory risk is not a transformation." },
      ],
      deliverable: "Personal situation assessment — not shared externally. For your own clarity.",
    },
    {
      phase: "Days 31–60",
      title: "Diagnose. Prioritize. Build trust.",
      color: COLORS.gold,
      focus: "Form a view. Begin earning the right to change things. Trust is built in small moments, not grand gestures.",
      activities: [
        { name: "The Current State Assessment", detail: "Document what you have found. Not in a deck for leadership — in a working document for yourself. What is the actual state of quality, delivery, team health, and governance? What is the delta between the narrative and the reality?" },
        { name: "Identify the three things", detail: "Out of everything you have heard and seen — what are the three things that most constrain the organization's ability to deliver? Not 10 things. Three. The discipline of prioritization is itself a leadership act." },
        { name: "Quick wins", detail: "Find two or three things you can fix in 60 days that matter to the people who are watching you. Not the biggest problems — the ones where you can demonstrate that you listen, you decide, and you execute. Trust is built this way." },
        { name: "Build the coalition", detail: "Identify the 5–7 people whose support is essential to the transformation. Begin those relationships with genuine curiosity — not sales pitches. What do they care about? How does your agenda serve their agenda?" },
      ],
      deliverable: "Current state brief + 3 priorities — shared with your manager and key stakeholders.",
    },
    {
      phase: "Days 61–90",
      title: "Plan. Commit. Execute.",
      color: COLORS.green,
      focus: "Make your commitments. Begin delivering against them. The 90-day plan is the contract between you and the organization.",
      activities: [
        { name: "The 12-Month Roadmap", detail: "What will be measurably different in 12 months? Not a task list — an outcomes statement. Write it in plain language. Share it broadly. The roadmap is only valuable if the people executing it understand it." },
        { name: "The Governance Model", detail: "Establish the operating cadence — the weekly standups, monthly operating reviews, quarterly business reviews. Do not wait for permission. Start the cadence. The organization will adopt it if it is useful." },
        { name: "The Talent Assessment", detail: "By day 90 you should have a clear view of your team: who is in the right role, who needs development, who is in the wrong role. This is the hardest part of the entry — and the one most leaders delay. Do not delay it." },
        { name: "The First Public Commitment", detail: "Make one public, specific, measurable commitment to the organization. Not a vision statement — a specific outcome with a date. 'By Q2, we will have automated 50% of our regression suite.' Then deliver it." },
      ],
      deliverable: "12-Month Transformation Roadmap — presented to the executive team.",
    },
  ],
  antipatterns: [
    { name: "The Hundred-Day Honeymoon", detail: "Leaders who spend 90 days 'just listening' without making a single decision. Listening is essential. Paralysis is not listening — it is avoidance." },
    { name: "The Grand Vision Without Roots", detail: "Leaders who arrive with a transformation strategy built before they have heard from the team. The strategy that does not account for what the organization has already tried — and why it failed — is not a strategy. It is overconfidence." },
    { name: "The Burning Platform", detail: "Leaders who create urgency through fear rather than aspiration. Fear motivates the first sprint. Purpose motivates the marathon." },
    { name: "The Reorganization as the Transformation", detail: "Restructuring the org chart is not transformation. It is activity that feels like transformation. The customer and the regulator do not care about the org chart." },
    { name: "Claiming credit, distributing blame", detail: "The fastest way to destroy trust in a new role. Credit goes to the team. Accountability belongs to the leader. Always." },
  ],
};

function SectionNav({ active, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6, padding: "0 4px" }}>The Operating System</div>
      {SECTIONS.map(s => (
        <button key={s.id} onClick={() => onSelect(s.id)} style={{
          background: active === s.id ? `${s.color}10` : "transparent",
          border: `1px solid ${active === s.id ? s.color + "45" : "rgba(255,255,255,0.05)"}`,
          borderRadius: 7, padding: "9px 12px", cursor: "pointer", textAlign: "left",
          display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s",
        }}>
          <span style={{ fontSize: 13, color: active === s.id ? s.color : "rgba(255,255,255,0.2)" }}>{s.icon}</span>
          <span style={{ fontSize: 12, color: active === s.id ? "#fff" : "rgba(255,255,255,0.42)", fontWeight: active === s.id ? 500 : 400 }}>{s.label}</span>
        </button>
      ))}
      <div style={{ marginTop: 10, padding: "14px 12px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 8 }}>
        <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>The Standard</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontStyle: "italic", lineHeight: 1.7 }}>
          "None of us are smarter than all of us together."
        </div>
      </div>
    </div>
  );
}

function PhilosophyView() {
  const [openPillar, setOpenPillar] = useState(null);
  const [openPrinciple, setOpenPrinciple] = useState(null);
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ padding: "14px 18px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 10, marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontStyle: "italic" }}>"{PHILOSOPHY.statement}"</div>
      </div>
      <p style={{ margin: "0 0 20px", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>{PHILOSOPHY.distinction}</p>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Four Leadership Pillars</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 20 }}>
        {PHILOSOPHY.pillars.map((p, i) => (
          <button key={i} onClick={() => setOpenPillar(openPillar === i ? null : i)} style={{
            background: openPillar === i ? `${p.color}10` : "rgba(255,255,255,0.02)",
            border: `1px solid ${openPillar === i ? p.color + "40" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.18s",
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: openPillar === i ? "#fff" : "rgba(255,255,255,0.7)", marginBottom: openPillar === i ? 8 : 0 }}>{p.name}</div>
            {openPillar === i && (
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: 10 }}>{p.detail}</div>
                {p.behaviors.map((b, j) => (
                  <div key={j} style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", padding: "3px 0", borderTop: j > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>▪ {b}</div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Operating Principles</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {PHILOSOPHY.principles.map((p, i) => (
          <button key={i} onClick={() => setOpenPrinciple(openPrinciple === i ? null : i)} style={{
            background: openPrinciple === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
            border: `1px solid ${openPrinciple === i ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
            borderRadius: 8, padding: "12px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", marginBottom: openPrinciple === i ? 7 : 0 }}>{p.label}</div>
            {openPrinciple === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{p.detail}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function CadenceView() {
  const [openRhythm, setOpenRhythm] = useState(0);
  return (
    <div style={{ padding: "24px 28px" }}>
      <p style={{ margin: "0 0 20px", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{CADENCE.intro}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CADENCE.rhythms.map((r, i) => (
          <div key={i} style={{ background: openRhythm === i ? `${r.color}08` : "rgba(255,255,255,0.015)", border: `1px solid ${openRhythm === i ? r.color + "35" : "rgba(255,255,255,0.06)"}`, borderRadius: 10, overflow: "hidden", transition: "all 0.2s" }}>
            <button onClick={() => setOpenRhythm(openRhythm === i ? null : i)} style={{
              width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 14, textAlign: "left",
            }}>
              <div style={{ width: 56, height: 56, borderRadius: 8, background: `${r.color}15`, border: `1px solid ${r.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: r.color, fontFamily: "monospace", letterSpacing: 0.5 }}>{r.period}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{r.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{r.artifact} · {r.owner}</div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>{openRhythm === i ? "▲" : "▼"}</span>
            </button>
            {openRhythm === i && (
              <div style={{ padding: "0 18px 18px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {r.activities.map((a, j) => (
                    <div key={j} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "11px 13px" }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: r.color, marginBottom: 5 }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{a.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GovernanceView() {
  const [activeBody, setActiveBody] = useState(0);
  return (
    <div style={{ padding: "24px 28px" }}>
      <p style={{ margin: "0 0 6px", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{GOVERNANCE.intro}</p>
      <div style={{ padding: "10px 14px", background: "rgba(106,58,154,0.08)", border: "1px solid rgba(106,58,154,0.2)", borderRadius: 8, marginBottom: 18, fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>{GOVERNANCE.principle}</div>
      <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
        {GOVERNANCE.bodies.map((b, i) => (
          <button key={i} onClick={() => setActiveBody(i)} style={{
            flex: 1, background: activeBody === i ? `${b.color}10` : "transparent",
            border: `1px solid ${activeBody === i ? b.color + "45" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 8, padding: "10px 8px", cursor: "pointer", textAlign: "center", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: activeBody === i ? b.color : "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{b.abbrev}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3, lineHeight: 1.3 }}>{b.cadence.split("—")[0].trim()}</div>
          </button>
        ))}
      </div>
      {(() => {
        const b = GOVERNANCE.bodies[activeBody];
        return (
          <div style={{ background: `${b.color}06`, border: `1px solid ${b.color}20`, borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 3 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{b.cadence} · Chair: {b.chair}</div>
              </div>
              <div style={{ fontSize: 10, color: b.color, background: `${b.color}15`, padding: "4px 10px", borderRadius: 5, fontFamily: "monospace", height: "fit-content" }}>{b.abbrev}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: b.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 7 }}>Decides</div>
                {b.decisions.map((d, i) => <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", padding: "3px 0", borderBottom: i < b.decisions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>▪ {d}</div>)}
              </div>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 7 }}>Does NOT decide</div>
                {b.notDecisions.map((d, i) => <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", padding: "3px 0", borderBottom: i < b.notDecisions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>▪ {d}</div>)}
              </div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${b.color}20`, fontSize: 11, color: b.color, fontFamily: "monospace" }}>Artifact: {b.artifact}</div>
          </div>
        );
      })()}
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Escalation Path</div>
      {GOVERNANCE.escalation.map((e, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 10, padding: "8px 0", borderBottom: i < GOVERNANCE.escalation.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "start" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{e.trigger}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)" }}>{e.level}</div>
          <div style={{ fontSize: 10, color: COLORS.gold, fontFamily: "monospace" }}>{e.time}</div>
        </div>
      ))}

      {/* ALIGNED AUTONOMY */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Aligned Autonomy</div>
        <div style={{ padding: "14px 18px", background: "rgba(106,58,154,0.08)", border: "1px solid rgba(106,58,154,0.2)", borderRadius: 10, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: 6 }}>{GOVERNANCE.alignedAutonomy.tagline}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{GOVERNANCE.alignedAutonomy.definition}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {GOVERNANCE.alignedAutonomy.how.map((h, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 10, padding: "9px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.purple }}>{h.layer}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}><span style={{ color: COLORS.red }}>Guardrail: </span>{h.guardrail}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}><span style={{ color: COLORS.green }}>Autonomy: </span>{h.autonomy}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 8 }}>
          <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5 }}>The Test</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontStyle: "italic" }}>{GOVERNANCE.alignedAutonomy.test}</div>
        </div>
      </div>
    </div>
  );
}

function TeamView() {
  const [activePhase, setActivePhase] = useState(0);
  const [openRole, setOpenRole] = useState(null);
  return (
    <div style={{ padding: "24px 28px" }}>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{TEAM.intro}</p>
      <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
        {TEAM.evolution.map((e, i) => (
          <button key={i} onClick={() => setActivePhase(i)} style={{
            flex: 1, background: activePhase === i ? `${e.color}10` : "transparent",
            border: `1px solid ${activePhase === i ? e.color + "45" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 8, padding: "10px", cursor: "pointer", textAlign: "center", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 10, color: activePhase === i ? e.color : "rgba(255,255,255,0.25)", fontFamily: "monospace", letterSpacing: 1, marginBottom: 3 }}>{e.phase}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: activePhase === i ? e.color : "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{e.abbrev}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{e.model}</div>
          </button>
        ))}
      </div>
      {(() => {
        const e = TEAM.evolution[activePhase];
        return (
          <div style={{ background: `${e.color}06`, border: `1px solid ${e.color}20`, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: e.color, fontStyle: "italic", marginBottom: 8 }}>{e.when}</div>
            <p style={{ margin: "0 0 10px", fontSize: 12, color: "rgba(255,255,255,0.52)", lineHeight: 1.7 }}>{e.structure}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ background: "rgba(58,122,85,0.08)", border: "1px solid rgba(58,122,85,0.2)", borderRadius: 7, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.green, letterSpacing: 1, marginBottom: 5, fontFamily: "monospace" }}>STRENGTH</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{e.strength}</div>
              </div>
              <div style={{ background: "rgba(139,58,58,0.08)", border: "1px solid rgba(139,58,58,0.2)", borderRadius: 7, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.red, letterSpacing: 1, marginBottom: 5, fontFamily: "monospace" }}>RISK</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{e.risk}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}><span style={{ color: e.color }}>Use when:</span> {e.right_when}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}><span style={{ color: COLORS.red }}>Not when:</span> {e.wrong_when}</div>
            </div>
          </div>
        );
      })()}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 16 }}>
        {TEAM.roles.map((r, i) => (
          <button key={i} onClick={() => setOpenRole(openRole === i ? null : i)} style={{
            background: openRole === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
            border: `1px solid ${openRole === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
            borderRadius: 8, padding: "11px 13px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", marginBottom: openRole === i ? 6 : 0 }}>{r.role}</div>
            {openRole === i && (
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.6, marginBottom: 7 }}>{r.accountability}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {r.skills.map((s, j) => <span key={j} style={{ fontSize: 10, color: COLORS.teal, background: "rgba(46,125,154,0.1)", padding: "2px 7px", borderRadius: 4 }}>{s}</span>)}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Talent Principles</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        {TEAM.talent.map((t, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gold, marginBottom: 4 }}>{t.principle}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>{t.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeasurementView() {
  const [activeTier, setActiveTier] = useState(0);
  return (
    <div style={{ padding: "24px 28px" }}>
      <p style={{ margin: "0 0 12px", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{MEASUREMENT.intro}</p>
      <div style={{ padding: "10px 14px", background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 8, marginBottom: 6 }}>
        <div style={{ fontSize: 11, fontFamily: "monospace", color: COLORS.gold }}>{MEASUREMENT.formula}</div>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontStyle: "italic", marginBottom: 18, padding: "0 2px" }}>{MEASUREMENT.formulaNote}</div>
      <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
        {MEASUREMENT.tiers.map((t, i) => (
          <button key={i} onClick={() => setActiveTier(i)} style={{
            flex: 1, background: activeTier === i ? `${t.color}10` : "transparent",
            border: `1px solid ${activeTier === i ? t.color + "45" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 8, padding: "9px 8px", cursor: "pointer", textAlign: "center", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 11, color: activeTier === i ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: activeTier === i ? 500 : 400, lineHeight: 1.3 }}>{t.tier}</div>
            <div style={{ fontSize: 10, color: activeTier === i ? t.color : "rgba(255,255,255,0.25)", marginTop: 3 }}>{t.desc}</div>
          </button>
        ))}
      </div>
      {(() => {
        const t = MEASUREMENT.tiers[activeTier];
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
            {t.metrics.map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, alignItems: "start" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{m.name}</div>
                <div style={{ fontSize: 11, color: t.color, fontFamily: "monospace", textAlign: "center" }}>{m.target}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.55 }}>{m.why}</div>
              </div>
            ))}
          </div>
        );
      })()}
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Reporting by Audience</div>
      {MEASUREMENT.reporting.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 10, padding: "8px 0", borderBottom: i < MEASUREMENT.reporting.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{r.audience}</div>
          <div style={{ fontSize: 10, color: COLORS.gold, fontFamily: "monospace", textAlign: "center" }}>{r.frequency}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{r.focus}</div>
        </div>
      ))}
    </div>
  );
}

function EntryView() {
  const [openPhase, setOpenPhase] = useState(0);
  const [openAnti, setOpenAnti] = useState(null);
  return (
    <div style={{ padding: "24px 28px" }}>
      <p style={{ margin: "0 0 12px", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{ENTRY.intro}</p>
      <div style={{ padding: "14px 18px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 10, marginBottom: 18 }}>
        <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>Pre-Interview Intention</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontStyle: "italic", lineHeight: 1.78 }}>{ENTRY.intention}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {ENTRY.phases.map((p, i) => (
          <div key={i} style={{ background: openPhase === i ? `${p.color}08` : "rgba(255,255,255,0.015)", border: `1px solid ${openPhase === i ? p.color + "35" : "rgba(255,255,255,0.06)"}`, borderRadius: 10, overflow: "hidden" }}>
            <button onClick={() => setOpenPhase(openPhase === i ? null : i)} style={{
              width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 14, textAlign: "left",
            }}>
              <div style={{ width: 56, height: 56, borderRadius: 8, background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: p.color, fontFamily: "monospace" }}>{p.phase}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2, fontStyle: "italic" }}>{p.focus}</div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>{openPhase === i ? "▲" : "▼"}</span>
            </button>
            {openPhase === i && (
              <div style={{ padding: "0 18px 18px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  {p.activities.map((a, j) => (
                    <div key={j} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "11px 13px" }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: p.color, marginBottom: 5 }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{a.detail}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: p.color, fontFamily: "monospace" }}>Deliverable: {p.deliverable}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 9 }}>Anti-Patterns to Avoid</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {ENTRY.antipatterns.map((a, i) => (
          <button key={i} onClick={() => setOpenAnti(openAnti === i ? null : i)} style={{
            background: openAnti === i ? "rgba(139,58,58,0.08)" : "rgba(255,255,255,0.015)",
            border: `1px solid ${openAnti === i ? "rgba(139,58,58,0.3)" : "rgba(255,255,255,0.06)"}`,
            borderRadius: 7, padding: "10px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: openAnti === i ? COLORS.red : "rgba(255,255,255,0.6)", marginBottom: openAnti === i ? 6 : 0 }}>{a.name}</div>
            {openAnti === i && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{a.detail}</div>}
          </button>
        ))}
      </div>

      {/* 30-DAY ARCHITECTURE DASHBOARD */}
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>First 30 Days — What to Stand Up</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { category: "Governance", color: COLORS.purple, items: ["Schedule weekly 1:1 with every direct report", "Establish weekly standup cadence", "Request access to last 3 audit reports and regulatory exams", "Identify the Architecture Review Board — does it exist?", "Read every ADR and post-mortem from the last 6 months"] },
            { category: "Measurement", color: COLORS.gold, items: ["Establish the four baseline metrics: deployment frequency, MTTR, change failure rate, automation coverage", "Request 12-month financial actuals vs. forecast", "Get the current team attrition data", "Find out what is being reported to the board today — and what is not"] },
            { category: "Technology", color: COLORS.teal, items: ["Map the production architecture — what systems exist, how they connect, where the risks are", "Identify the top 5 production incidents from the last 6 months", "Understand the CI/CD pipeline — where are the manual gates?", "Find the security vulnerabilities that are known but not yet fixed"] },
            { category: "People", color: COLORS.green, items: ["1:1 with every engineer who has been here more than 3 years — they know where the bodies are", "Identify the informal leaders — the people others go to when they need help", "Find out who is at flight risk", "Ask every manager: what would you fix if you had my authority?"] },
            { category: "Stakeholders", color: COLORS.red, items: ["Meet with every business unit leader who depends on your team", "Understand what they think of technology — the real answer, not the polished one", "Find out what promises have been made that you do not yet know about", "Identify the regulatory relationships — who manages OCC, FDIC, PCI auditors?"] },
            { category: "Quick Wins", color: COLORS.slate, items: ["Pick two things you can fix in 30 days that visibly matter to the team", "Do not pick the hardest problems — pick the ones that demonstrate you listen and act", "Communicate what you fixed and why — the act of communicating builds as much trust as the fix", "Resist the urge to announce your strategy — earn the right to be heard first"] },
          ].map((cat, i) => (
            <div key={i} style={{ background: `${cat.color}06`, border: `1px solid ${cat.color}18`, borderRadius: 9, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: cat.color, fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 }}>{cat.category}</div>
              {cat.items.map((item, j) => (
                <div key={j} style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", padding: "3px 0", borderTop: j > 0 ? "1px solid rgba(255,255,255,0.04)" : "none", lineHeight: 1.55 }}>▪ {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeadershipOS() {
  const [active, setActive] = useState("philosophy");
  const activeSection = SECTIONS.find(s => s.id === active);

  const views = {
    philosophy: <PhilosophyView />,
    cadence: <CadenceView />,
    governance: <GovernanceView />,
    team: <TeamView />,
    measurement: <MeasurementView />,
    entry: <EntryView />,
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", height: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>ARIV</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Leadership Operating System</span>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "sans-serif" }}>Quality@Speed · Karthik Loganathan</div>
        </div>
        <div style={{ display: "flex", height: 2 }}>
          {SECTIONS.map((s, i) => <div key={i} style={{ flex: 1, background: s.color, opacity: 0.5 }} />)}
        </div>
      </div>

      {/* HERO */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "24px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>
            Applicable to any transformation — QE, CIO, CXO, GTM, public, private, startup
          </div>
          <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 400, letterSpacing: -1, color: "#fff", lineHeight: 1.2 }}>
            The executive operating system<br />
            <em style={{ color: "rgba(255,255,255,0.38)" }}>that generates measurable outcomes</em>
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.35)", maxWidth: 600, lineHeight: 1.75 }}>
            Six interconnected components — philosophy, cadence, governance, team design, measurement, and the entry playbook. Not a framework to be implemented once. A system to be practiced continuously.
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 28px", display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, minHeight: 600 }}>
        <SectionNav active={active} onSelect={setActive} />
        <div style={{ background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${activeSection.color}65, ${activeSection.color}20, transparent)` }} />
          {views[active]}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "14px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", letterSpacing: 1 }}>ARIV · Leadership Operating System · Component D</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", letterSpacing: 1 }}>AUTHENTIC · RESILIENT · INTELLIGENT · VALOR</div>
        </div>
      </div>
    </div>
  );
}
