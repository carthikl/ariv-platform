import { useState } from "react";

const COLORS = {
  gold: "#B8860B", teal: "#2E7D9A", green: "#3A7A55",
  purple: "#6A3A9A", red: "#8B3A3A", slate: "#4A5A6A", deep: "#2A1A5A",
};

const PROTOCOLS = [
  {
    id: "rag",
    label: "RAG",
    full: "Retrieval Augmented Generation",
    color: COLORS.teal,
    icon: "◈",
    tag: "Knowledge",
    tagline: "Ground AI responses in your enterprise knowledge — not hallucination.",
    why: "LLMs are trained on public data. Your enterprise knowledge — policies, procedures, product specs, regulatory guidance, customer data — is private. RAG connects the LLM to your knowledge at inference time, without fine-tuning or retraining. The result: accurate, grounded responses that cite your actual documents.",
    when: [
      "Customer service agents need policy answers — not fabricated ones",
      "Pharmacists need drug interaction data from your formulary",
      "Advisors need regulatory guidance from your compliance library",
      "Engineers need architecture decisions from your ADR repository",
    ],
    flow: [
      { step: "1", label: "Document Ingestion", desc: "Enterprise documents (PDFs, Word, Confluence, SharePoint) ingested and chunked into semantically meaningful segments. Chunk size is a key tuning parameter — too large loses precision, too small loses context.", color: COLORS.teal },
      { step: "2", label: "Embedding", desc: "Each chunk converted to a vector embedding — a numerical representation of its meaning. AWS Bedrock Titan Embeddings, OpenAI Ada, or Cohere. The embedding model determines what 'similar' means in your knowledge space.", color: COLORS.teal },
      { step: "3", label: "Vector Store", desc: "Embeddings stored in a vector database — Pinecone, pgvector (PostgreSQL extension), Weaviate, or Chroma. The vector store enables semantic similarity search: 'find chunks whose meaning is closest to this query.'", color: COLORS.teal },
      { step: "4", label: "Query Retrieval", desc: "User query is embedded with the same model. Vector similarity search returns the top-k most relevant chunks. Hybrid search (keyword + semantic) outperforms pure semantic for domain-specific content.", color: COLORS.teal },
      { step: "5", label: "Augmented Generation", desc: "Retrieved chunks injected into the Claude prompt as context. Claude generates a response grounded in the retrieved documents — with citations. The LLM reasons over your knowledge, not its training data.", color: COLORS.teal },
      { step: "6", label: "Governance", desc: "Every RAG query and response logged with the source documents retrieved. PII filtered before storage. Access control applied at retrieval — users only retrieve documents they are authorized to see. AIGP audit trail.", color: COLORS.red },
    ],
    enterprise: [
      { domain: "Financial Services", use: "Policy and procedure retrieval for contact center agents. Regulatory guidance for compliance teams. Product information for advisors. Credit decisioning documentation." },
      { domain: "Retail Pharmacy", use: "Drug interaction database retrieval for pharmacists. Prior authorization policy lookup. Insurance formulary queries. Clinical protocol retrieval." },
      { domain: "Wealth Management", use: "Investment policy statement retrieval. Compliance guidance for advisors. Client suitability framework lookup. Regulatory rule retrieval (SEC, FINRA)." },
    ],
    tools: ["AWS Bedrock Knowledge Bases", "Pinecone", "pgvector", "LangChain RAG pipeline", "Anthropic Claude claude-sonnet-4-20250514", "OpenTelemetry audit trail"],
    aigp: "MEDIUM risk — RAG retrieval is data access, not decision-making. AIGP controls: access control at retrieval boundary, PII filtering before storage, source citation required in every response, retrieval log retained 90 days.",
  },
  {
    id: "mcp",
    label: "MCP",
    full: "Model Context Protocol",
    color: COLORS.purple,
    icon: "⬡",
    tag: "Integration",
    tagline: "Give Claude structured, governed access to your enterprise systems.",
    why: "Without MCP, Claude can only work with what you put in the prompt. With MCP, Claude can securely call your APIs, query your databases, and read your live data — with a full audit trail and access control on every call. MCP is the plumbing that makes AI agents enterprise-ready.",
    when: [
      "Claude needs to retrieve a customer's real account balance — not a fabricated one",
      "An agent needs to check prescription refill eligibility in real time",
      "A compliance tool needs to query the live regulatory rule database",
      "An advisor AI needs to read the client's actual portfolio data",
    ],
    flow: [
      { step: "1", label: "MCP Server Definition", desc: "Each enterprise system exposes an MCP server — a structured interface that defines what tools Claude can call (get_account_balance, check_refill_eligibility, query_portfolio) and what parameters each tool accepts.", color: COLORS.purple },
      { step: "2", label: "Tool Registration", desc: "MCP tools registered with the Claude API call. Claude knows what tools are available and can decide which to call based on the user's request. Tool descriptions must be precise — Claude's decision to call a tool depends on understanding what it does.", color: COLORS.purple },
      { step: "3", label: "Claude Decision", desc: "Claude reasons about the user's request and determines which MCP tools to call, in what order, with what parameters. This is the agent intelligence layer — Claude orchestrates the tool calls to fulfill the request.", color: COLORS.purple },
      { step: "4", label: "Tool Execution", desc: "MCP server executes the tool call against the real enterprise system — calling the API, querying the database, reading the file system. The result is returned to Claude in a structured format.", color: COLORS.purple },
      { step: "5", label: "Response Integration", desc: "Claude integrates the tool results into its response. The customer gets an answer based on real data — not a hallucination. Multiple tool calls can be chained: get the account, check the balance, look up the payment history.", color: COLORS.purple },
      { step: "6", label: "Governance", desc: "Every MCP tool call logged: which tool, which parameters, which system, which user, what result. AIGP risk classification on every tool call. HIGH risk tools (account modifications, payment initiation) require human approval before execution.", color: COLORS.red },
    ],
    enterprise: [
      { domain: "Financial Services", use: "Account data retrieval, transaction history, balance inquiry, payment initiation, dispute submission, fraud reporting — all via MCP with full audit trail and access control." },
      { domain: "Retail Pharmacy", use: "Prescription refill eligibility, PBM claim status, patient medication history, prior auth status, inventory availability — HIPAA-governed MCP with PHI access logging." },
      { domain: "Wealth Management", use: "Portfolio data retrieval, position inquiry, trade status, account documents, compliance holds — SEC-compliant MCP with investment advice boundary enforcement." },
    ],
    tools: ["Anthropic MCP SDK", "MCP server implementations per enterprise system", "OAuth 2.0 + JWT — tool authorization", "OpenTelemetry — tool call audit trail", "AIGP risk classifier"],
    aigp: "HIGH risk for state-changing tools (payment, account modification, order submission). MEDIUM risk for read operations. AIGP controls: tool-level risk classification, human approval gate for HIGH risk tools, full parameter and result logging, access control per user identity.",
  },
  {
    id: "a2a",
    label: "A2A",
    full: "Agent-to-Agent Protocol",
    color: COLORS.green,
    icon: "⬢",
    tag: "Orchestration",
    tagline: "Multiple agents coordinating to solve problems no single agent can solve alone.",
    why: "A single agent has a single context window and a single set of tools. Complex enterprise workflows — prior authorization, multi-party settlement, cross-system compliance — require multiple agents working together. A2A defines how agents hand off work, share context, and coordinate actions across organizational boundaries.",
    when: [
      "Prescription refill requires coordination between patient agent, prescriber agent, and insurance agent",
      "Trade settlement requires coordination between advisor agent, compliance agent, and custodian agent",
      "Fraud investigation requires coordination between detection agent, case management agent, and customer communication agent",
      "Software deployment requires coordination between test agent, security agent, and release agent",
    ],
    flow: [
      { step: "1", label: "Orchestrator Agent", desc: "The orchestrator agent receives the user's request and decomposes it into subtasks. It knows which specialist agents exist and what each can do. It does not execute tasks — it coordinates agents that do.", color: COLORS.green },
      { step: "2", label: "Task Assignment", desc: "Orchestrator assigns subtasks to specialist agents via the A2A protocol. Each assignment includes: the task definition, the context needed to complete it, the expected output format, and the deadline.", color: COLORS.green },
      { step: "3", label: "Specialist Execution", desc: "Specialist agents execute their assigned tasks — using their own MCP tools, RAG knowledge, and reasoning capability. Each specialist is narrow and deep: the prescription agent knows pharmacy, the compliance agent knows regulation.", color: COLORS.green },
      { step: "4", label: "Result Aggregation", desc: "Orchestrator collects results from all specialist agents. It resolves conflicts, fills gaps, and synthesizes a coherent response. This is the hardest part of A2A — orchestration requires reasoning across multiple partial results.", color: COLORS.green },
      { step: "5", label: "Human Checkpoints", desc: "A2A workflows include explicit human checkpoint steps — points where the orchestrator pauses and requests human approval before proceeding. These are defined by the AIGP risk classification of the next action.", color: COLORS.red },
      { step: "6", label: "Attribution", desc: "Every A2A interaction is attributed: which orchestrator, which specialist agents, which tool calls, which human approvals, what outcome. The audit trail spans agent boundaries — the full workflow is reconstructable from logs.", color: COLORS.red },
    ],
    enterprise: [
      { domain: "Financial Services", use: "Prior auth workflow: patient agent collects information → prescriber agent sends renewal request → insurance agent validates coverage → results aggregated to patient. Cross-organizational A2A with full audit trail." },
      { domain: "Retail Pharmacy", use: "Fraud investigation: detection agent flags transaction → case agent opens investigation → customer agent initiates communication → resolution agent processes outcome. Sequential A2A with human checkpoint at investigation decision." },
      { domain: "Wealth Management", use: "Trade settlement: advisor agent submits trade → compliance agent validates suitability → custodian agent executes → confirmation agent sends confirmation. Parallel A2A with compliance human checkpoint." },
    ],
    tools: ["LangGraph — stateful agent orchestration", "A2A protocol (emerging standard)", "Claude claude-sonnet-4-20250514 — orchestrator reasoning", "Specialist agents (domain-specific)", "Redis — agent state management", "OpenTelemetry — cross-agent audit trail"],
    aigp: "CRITICAL risk for cross-organizational A2A (involves external party decisions). HIGH risk for multi-step workflows with state changes. AIGP controls: human checkpoint at every HIGH/CRITICAL decision point, full workflow audit trail, agent identity and version attribution, rollback capability for reversible actions.",
  },
  {
    id: "ucp",
    label: "UCP",
    full: "Universal Commerce Protocol",
    color: COLORS.gold,
    icon: "◆",
    tag: "Commerce",
    tagline: "A standard interface for executing commerce transactions across any system, network, or organization.",
    why: "Commerce happens across organizational boundaries — between a patient and a pharmacy, an advisor and a custodian, a merchant and a card network. Today each of these integrations is custom, point-to-point, and fragile. UCP defines a universal transaction language that any system can speak — enabling agentic commerce at scale without per-integration engineering.",
    when: [
      "An AI agent needs to execute a prescription payment across pharmacy POS, PBM, and insurance systems",
      "An advisor agent needs to submit a trade order that flows to custodian, compliance, and client systems simultaneously",
      "An agentic refill workflow needs to coordinate payment, verification, and fulfillment across independent systems",
      "A cross-border payment requires coordination across card networks, banking systems, and regulatory reporting",
    ],
    flow: [
      { step: "1", label: "Transaction Intent", desc: "The initiating agent (patient, advisor, merchant) expresses a commerce intent in UCP format — structured, complete, and machine-readable. UCP intent includes: parties, amounts, timing, conditions, and compliance metadata.", color: COLORS.gold },
      { step: "2", label: "Routing", desc: "UCP router determines the optimal path to fulfill the intent — which systems need to participate, in what order, with what SLA. The routing decision is based on the parties' registered UCP capabilities and the transaction type.", color: COLORS.gold },
      { step: "3", label: "Multi-Party Coordination", desc: "UCP coordinates all participating systems simultaneously or sequentially depending on dependencies. Each system receives its role in the transaction — what it needs to do, what it needs to confirm, and what it needs to report.", color: COLORS.gold },
      { step: "4", label: "Confirmation & Settlement", desc: "Each participating system confirms its part of the transaction. UCP manages the two-phase commit — all parties must confirm before settlement is final. If any party fails, UCP coordinates rollback across all participating systems.", color: COLORS.gold },
      { step: "5", label: "Regulatory Reporting", desc: "UCP generates the regulatory reporting artifacts required for each transaction type — PCI-DSS receipt, HIPAA transaction record, SEC trade confirmation, BSA/AML screening. These are generated at execution time, not assembled manually after the fact.", color: COLORS.red },
      { step: "6", label: "Governance", desc: "Every UCP transaction is immutable and attributable — logged with the initiating agent, all participating systems, the human who authorized it (if required), and the regulatory artifacts generated. The transaction record is the audit trail.", color: COLORS.red },
    ],
    enterprise: [
      { domain: "Financial Services", use: "Card payment processing across merchant, card network, issuer, and settlement system. Real-time payment via FedNow. Cross-border correspondent banking. ACH batch file coordination." },
      { domain: "Retail Pharmacy", use: "Prescription transaction coordination: POS → PBM adjudication → insurance → patient payment → DEA recording → state reporting. All in one UCP transaction with rollback if any step fails." },
      { domain: "Wealth Management", use: "Trade lifecycle: order entry → compliance validation → order routing → execution → allocation → settlement → confirmation → regulatory reporting. UCP as the transaction backbone across custodian, broker, and client systems." },
    ],
    tools: ["UCP protocol specification (emerging)", "Financial messaging standards: ISO 20022, FIX, HL7 FHIR", "Two-phase commit coordination", "Immutable transaction ledger", "Regulatory reporting engine", "AIGP CRITICAL tier governance"],
    aigp: "CRITICAL risk — all UCP transactions involve real-world financial or healthcare consequences. AIGP controls: human authorization required for all transactions above defined thresholds, two-phase commit prevents partial execution, immutable audit trail, regulatory reporting auto-generated, rollback capability within defined window.",
  },
];

const INTEGRATION_PATTERNS = [
  {
    name: "RAG + MCP",
    color: COLORS.teal,
    desc: "Retrieve knowledge, then act on live data. The most common enterprise AI pattern.",
    example: "Agent retrieves drug interaction policy from RAG, then queries live patient medication history via MCP, then generates a pharmacist alert that cites both the policy and the patient's actual data.",
  },
  {
    name: "MCP + A2A",
    color: COLORS.purple,
    desc: "Multiple agents coordinating via shared enterprise systems.",
    example: "Orchestrator agent coordinates prescription refill: patient agent collects consent via MCP, prescriber agent sends renewal via MCP, insurance agent validates via MCP — A2A coordinates the workflow across all three.",
  },
  {
    name: "A2A + UCP",
    color: COLORS.green,
    desc: "Agent coordination that culminates in a real commerce transaction.",
    example: "Advisor agent validates suitability (A2A with compliance agent), then executes the trade (UCP across broker, custodian, and reporting systems), then confirms to the client (A2A with communication agent).",
  },
  {
    name: "RAG + MCP + A2A + UCP",
    color: COLORS.gold,
    desc: "The full intelligence stack — knowledge, tools, coordination, and execution.",
    example: "Agentic prescription refill: RAG retrieves formulary policy, MCP checks eligibility, A2A coordinates patient-prescriber-insurer workflow, UCP executes the multi-party transaction and generates the DEA record.",
  },
];

export default function ARIVIntelligenceLayer() {
  const [activeProtocol, setActiveProtocol] = useState(PROTOCOLS[0]);
  const [activeStep, setActiveStep] = useState(null);
  const [activePattern, setActivePattern] = useState(null);
  const [tab, setTab] = useState("flow");

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", height: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>ARIV</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Intelligence Layer</span>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "monospace" }}>RAG · MCP · A2A · UCP</div>
        </div>
        <div style={{ display: "flex", height: 2 }}>
          {PROTOCOLS.map((p, i) => <div key={i} style={{ flex: 1, background: p.color, opacity: 0.5 }} />)}
        </div>
      </div>

      {/* PROTOCOL SELECTOR */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 10 }}>
          {PROTOCOLS.map(p => (
            <button key={p.id} onClick={() => { setActiveProtocol(p); setActiveStep(null); setTab("flow"); }} style={{
              flex: 1, background: activeProtocol.id === p.id ? `${p.color}12` : "transparent",
              border: `1px solid ${activeProtocol.id === p.id ? p.color + "50" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.18s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 16, color: activeProtocol.id === p.id ? p.color : "rgba(255,255,255,0.25)" }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: activeProtocol.id === p.id ? p.color : "rgba(255,255,255,0.22)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>{p.tag}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: activeProtocol.id === p.id ? "#fff" : "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{p.label}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: activeProtocol.id === p.id ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>{p.full}</div>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 28px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

        {/* LEFT — DETAIL */}
        <div>
          {/* Header */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22, color: activeProtocol.color }}>{activeProtocol.icon}</span>
              <div>
                <div style={{ fontSize: 10, color: activeProtocol.color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>{activeProtocol.tag}</div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "#fff" }}>{activeProtocol.full}</h2>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", fontStyle: "italic", lineHeight: 1.7 }}>{activeProtocol.tagline}</p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
            {["flow", "why", "enterprise", "aigp"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: "none", border: "none", borderBottom: `2px solid ${tab === t ? activeProtocol.color : "transparent"}`,
                padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.35)", transition: "all 0.15s",
                textTransform: "capitalize", marginBottom: -1,
              }}>{t === "aigp" ? "AIGP Governance" : t === "flow" ? "How It Works" : t === "why" ? "When & Why" : "Enterprise Use"}</button>
            ))}
          </div>

          {/* Flow */}
          {tab === "flow" && (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {activeProtocol.flow.map((f, i) => (
                  <button key={i} onClick={() => setActiveStep(activeStep === i ? null : i)} style={{
                    background: activeStep === i ? `${f.color}0E` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeStep === i ? f.color + "40" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 9, padding: "12px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                    display: "flex", alignItems: "flex-start", gap: 14,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: activeStep === i ? f.color : "rgba(255,255,255,0.04)",
                      border: `1px solid ${activeStep === i ? f.color : "rgba(255,255,255,0.1)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 600, color: activeStep === i ? "#080808" : "rgba(255,255,255,0.3)",
                      fontFamily: "monospace",
                    }}>{f.step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: activeStep === i ? 8 : 0 }}>{f.label}</div>
                      {activeStep === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{f.desc}</div>}
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 5 }}>
                {activeProtocol.tools.map((t, i) => (
                  <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", background: `${activeProtocol.color}10`, border: `1px solid ${activeProtocol.color}25`, borderRadius: 4, padding: "2px 8px" }}>{t}</div>
                ))}
              </div>
            </div>
          )}

          {/* Why */}
          {tab === "why" && (
            <div>
              <div style={{ padding: "16px 18px", background: `${activeProtocol.color}08`, border: `1px solid ${activeProtocol.color}20`, borderRadius: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{activeProtocol.why}</div>
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Use When</div>
              {activeProtocol.when.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < activeProtocol.when.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ color: activeProtocol.color, fontSize: 12, marginTop: 1 }}>▪</span>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{w}</div>
                </div>
              ))}
            </div>
          )}

          {/* Enterprise */}
          {tab === "enterprise" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeProtocol.enterprise.map((e, i) => (
                <div key={i} style={{ background: `${activeProtocol.color}06`, border: `1px solid ${activeProtocol.color}18`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: activeProtocol.color, fontFamily: "monospace", marginBottom: 7, letterSpacing: 0.5 }}>{e.domain}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.52)", lineHeight: 1.75 }}>{e.use}</div>
                </div>
              ))}
            </div>
          )}

          {/* AIGP */}
          {tab === "aigp" && (
            <div>
              <div style={{ padding: "14px 18px", background: "rgba(139,58,58,0.08)", border: "1px solid rgba(139,58,58,0.22)", borderRadius: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: COLORS.red, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 7 }}>AIGP Governance Classification</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.52)", lineHeight: 1.75 }}>{activeProtocol.aigp}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "Risk Classification", desc: "Every protocol call classified LOW / MEDIUM / HIGH / CRITICAL before execution" },
                  { label: "Audit Trail", desc: "Every call logged with parameters, results, model version, and user identity" },
                  { label: "Human Oversight", desc: "HIGH and CRITICAL calls require named human approval before execution" },
                  { label: "Attribution", desc: "Every AI decision attributable to model version, prompt version, and agent version" },
                ].map((g, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "11px 13px" }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{g.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>{g.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — INTEGRATION PATTERNS */}
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>Integration Patterns</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {INTEGRATION_PATTERNS.map((p, i) => (
              <button key={i} onClick={() => setActivePattern(activePattern === i ? null : i)} style={{
                background: activePattern === i ? `${p.color}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${activePattern === i ? p.color + "40" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 8, padding: "11px 13px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: p.color, fontFamily: "monospace", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: activePattern === i ? 8 : 0 }}>{p.desc}</div>
                {activePattern === i && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontStyle: "italic", lineHeight: 1.65, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>{p.example}</div>
                )}
              </button>
            ))}
          </div>

          {/* Protocol comparison */}
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Protocol Comparison</div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 9, overflow: "hidden" }}>
            {[
              { attr: "What it does", rag: "Retrieves knowledge", mcp: "Calls tools", a2a: "Coordinates agents", ucp: "Executes transactions" },
              { attr: "Human role", rag: "Reviews responses", mcp: "Approves HIGH risk", a2a: "Approves checkpoints", ucp: "Authorizes transactions" },
              { attr: "Risk tier", rag: "MEDIUM", mcp: "MEDIUM–HIGH", a2a: "HIGH–CRITICAL", ucp: "CRITICAL" },
              { attr: "Reversible", rag: "Always", mcp: "Usually", a2a: "Partially", ucp: "Within window" },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr 1fr", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ padding: "8px 10px", fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace", borderRight: "1px solid rgba(255,255,255,0.05)" }}>{row.attr}</div>
                {["rag", "mcp", "a2a", "ucp"].map((p, j) => (
                  <div key={j} style={{
                    padding: "8px 8px", fontSize: 10,
                    color: activeProtocol.id === p ? PROTOCOLS.find(pr => pr.id === p).color : "rgba(255,255,255,0.38)",
                    borderRight: j < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: activeProtocol.id === p ? `${PROTOCOLS.find(pr => pr.id === p).color}08` : "transparent",
                    lineHeight: 1.4,
                  }}>{row[p]}</div>
                ))}
              </div>
            ))}
          </div>

          {/* The non-negotiable */}
          <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5 }}>The Non-Negotiable</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontStyle: "italic" }}>
              "Every layer of the intelligence stack must be auditable, attributable, and reversible within defined boundaries. The enterprise that cannot explain why its AI made a decision is not ready for regulated AI deployment."
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "12px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>ARIV · Intelligence Layer · Component B</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>RAG · MCP · A2A · UCP · AIGP GOVERNED</div>
        </div>
      </div>
    </div>
  );
}
