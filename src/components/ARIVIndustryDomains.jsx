import { useState } from "react";

const COLORS = {
  gold: "#B8860B",
  teal: "#2E7D9A",
  green: "#3A7A55",
  purple: "#6A3A9A",
  red: "#8B3A3A",
  slate: "#3A4A5A",
  amber: "#8B6914",
};

const CLOUDS = [
  {
    id: "aws",
    label: "AWS",
    color: "#FF9900",
    services: {
      compute: "ECS / EKS / Lambda",
      data: "RDS Aurora / DynamoDB / Redshift",
      ai: "Bedrock / SageMaker / Comprehend",
      security: "IAM / KMS / GuardDuty / Security Hub",
      observability: "CloudWatch / X-Ray / OpenSearch",
      storage: "S3 / EFS / Glacier",
      network: "VPC / Route53 / CloudFront / WAF",
    },
    industries: ["Financial Services", "Wealth Management"],
    note: "AWS FinServ compliance — SOC2, PCI-DSS, FedRAMP. Strongest for card/banking regulated workloads.",
  },
  {
    id: "azure",
    label: "Azure",
    color: "#0089D6",
    services: {
      compute: "AKS / Container Apps / Functions",
      data: "Azure SQL / Cosmos DB / Synapse",
      ai: "Azure OpenAI / Cognitive Services / ML Studio",
      security: "Entra ID / Key Vault / Defender / Sentinel",
      observability: "Azure Monitor / App Insights / Log Analytics",
      storage: "Blob Storage / Data Lake / Archive",
      network: "VNet / Front Door / API Management / Firewall",
    },
    industries: ["Retail Pharmacy", "Healthcare"],
    note: "HIPAA BAA strongest. Microsoft M365/Teams ecosystem native. POS and retail integration depth.",
  },
  {
    id: "gcp",
    label: "GCP",
    color: "#34A853",
    services: {
      compute: "GKE / Cloud Run / Cloud Functions",
      data: "Cloud SQL / Bigtable / BigQuery",
      ai: "Vertex AI / Gemini / AutoML / Document AI",
      security: "IAM / Cloud KMS / Security Command Center",
      observability: "Cloud Monitoring / Trace / Logging / Error Reporting",
      storage: "Cloud Storage / Filestore / Archive",
      network: "VPC / Cloud CDN / Cloud Armor / Apigee",
    },
    industries: ["Data-Heavy Platforms", "Manufacturing", "Media"],
    note: "BigQuery + Vertex AI strongest for ML/analytics-first organizations. Apigee for API management at scale.",
  },
];

const LLMS = [
  { id: "claude", label: "Claude", vendor: "Anthropic", color: "#D4A049", strength: "Reasoning, governance, safety-critical, AIGP-aligned" },
  { id: "openai", label: "GPT-4o", vendor: "OpenAI", color: "#10A37F", strength: "General purpose, code generation, broad ecosystem" },
  { id: "copilot", label: "Copilot", vendor: "Microsoft", color: "#0089D6", strength: "GitHub-native, IDE integration, developer workflow" },
  { id: "gemini", label: "Gemini", vendor: "Google", color: "#34A853", strength: "Multimodal, BigQuery integration, GCP-native analytics" },
];

const INDUSTRIES = [
  {
    id: "discover",
    name: "Discover Financial Services",
    type: "Anchor Domain — 22 Years",
    cloud: "aws",
    scale: "50M+ cardmembers · $15B+ annual revenue · 20,000+ employees",
    depth: "full",
    color: COLORS.gold,
    domains: ["Card", "Banking", "Payments", "Contact Center"],
  },
  {
    id: "pharmacy",
    name: "Retail Pharmacy",
    type: "Reference Pattern",
    cloud: "azure",
    scale: "Enterprise omnichannel · 9,000+ locations · PBM integration",
    depth: "reference",
    color: COLORS.teal,
    domains: ["Prescription", "Loyalty", "Retail Commerce", "Care Delivery"],
  },
  {
    id: "wealth",
    name: "Wealth Management",
    type: "Reference Pattern",
    cloud: "aws",
    scale: "AUM-scale platform · Fiduciary-grade · Advisor + Client + Institutional",
    depth: "reference",
    color: COLORS.green,
    domains: ["Advisor Platform", "Client Portal", "Institutional", "Compliance"],
  },
];

const DISCIPLINES = [
  {
    id: "application",
    label: "Application Engineering",
    icon: "◻",
    color: COLORS.teal,
    llm: { primary: "copilot", secondary: "claude", reason: "Copilot native in GitHub for code completion and PR review. Claude for architectural reasoning, API design, and test scenario generation." },
    full: {
      headline: "Full-stack, API-first, microservices architecture across Card, Banking, Payments, and Contact Center — 1,000+ applications in production.",
      stack: ["React / Next.js — digital channel UI", "Node.js / Java Spring Boot — API layer", "REST + GraphQL + gRPC — service communication", "GitHub + Jenkins / Trident — CI/CD pipeline", "Docker + Kubernetes — container orchestration", "Pact JVM — contract testing across 50+ microservices"],
      evidence: [
        { label: "Applications modernized", value: "1,000+", detail: "ClearCase to GitHub/Jenkins — full enterprise CI/CD transformation" },
        { label: "Release cadence", value: "Quarterly → Monthly", detail: "8 additional production releases per year post-transformation" },
        { label: "Microservices delivered", value: "Card + Banking + Payments", detail: "Greenfield banking platform — 18 months, regulatory scrutiny" },
        { label: "API platform", value: "SOA → Microservices", detail: "Service-Oriented Architecture practice established from greenfield" },
      ],
      pattern: "Strangler fig migration — monolith to microservices without big-bang rewrites. API-first contract definition before implementation. Feature flags for zero-downtime deployment.",
    },
    reference: {
      pharmacy: "React Native mobile + Next.js web. Node.js BFF layer. Prescription API integrating PBM endpoints (Caremark, Express Scripts, OptumRx). Microservices: patient-lookup, prescription, cart, checkout, loyalty. Pact contract testing across all service boundaries.",
      wealth: "Angular advisor portal + React client portal. Java Spring Boot API layer. FIX protocol for trading. REST APIs for portfolio data, account management, compliance reporting. Feature-flagged rollout per advisor segment.",
    },
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: "◈",
    color: COLORS.purple,
    llm: { primary: "claude", secondary: "gemini", reason: "Claude for data governance reasoning, PII classification, and audit-ready SQL generation. Gemini for BigQuery-native analytics and multimodal data pipelines on GCP." },
    full: {
      headline: "Enterprise data platform serving Card, Banking, and Payments analytics — real-time transaction processing, customer 360, and ML model serving at scale.",
      stack: ["Kafka — real-time event streaming", "Spark / EMR — batch processing", "Snowflake / Redshift — analytics warehouse", "dbt — data transformation and lineage", "Airflow — pipeline orchestration", "Tableau / Looker — executive dashboards", "SageMaker — ML model training and serving"],
      evidence: [
        { label: "Customer 360", value: "Card + Banking unified", detail: "Single customer view across Card and Banking with fine-grained role-based access control" },
        { label: "Real-time processing", value: "Transaction stream", detail: "Kafka-based event streaming for fraud detection, balance updates, and loyalty accrual" },
        { label: "Data governance", value: "SOX + PCI compliant", detail: "Lineage tracking, PII classification, and audit trail across all data assets" },
        { label: "ML platform", value: "Fraud + Risk models", detail: "SageMaker model serving with A/B testing, drift monitoring, and explainability" },
      ],
      pattern: "Data mesh ownership — each domain team owns their data products. Platform team provides the infrastructure and governance layer. Centralized catalog with decentralized ownership.",
    },
    reference: {
      pharmacy: "Azure Synapse for pharmacy analytics. Databricks for PBM claims processing. Real-time prescription eligibility checks via Cosmos DB. HIPAA-compliant data lake with Azure Purview for lineage and PII classification. Power BI for pharmacy operations dashboards.",
      wealth: "BigQuery for portfolio analytics. Snowflake for client data warehouse. Real-time market data streaming via Kafka. Looker for advisor performance dashboards. ML models for portfolio risk scoring and next-best-action recommendations.",
    },
  },
  {
    id: "infra",
    label: "Infrastructure & Cloud",
    icon: "⬡",
    color: COLORS.slate,
    llm: { primary: "claude", secondary: "copilot", reason: "Claude for infrastructure-as-code review, cost optimization reasoning, and architectural trade-off analysis. Copilot for Terraform and CloudFormation code generation in IDE." },
    full: {
      headline: "Enterprise infrastructure platform — from bare-metal data center to cloud-native AWS, supporting 20,000+ employees and 50M+ cardmembers across Card, Banking, and Payments.",
      stack: ["AWS ECS / EKS — container orchestration", "Terraform — infrastructure as code", "GitHub Actions — pipeline automation", "CloudFront + WAF — edge and DDoS protection", "Route53 — DNS and traffic management", "AWS Cost Explorer + Savings Plans — FinOps", "Multi-region active-active — 99.99% availability target"],
      evidence: [
        { label: "Applications migrated", value: "1,000+", detail: "On-premises to cloud-native — full infrastructure modernization program" },
        { label: "Availability", value: "99.99% target", detail: "Multi-region active-active for Card and Banking critical paths" },
        { label: "FinOps", value: "Cost optimization", detail: "Reserved instance strategy, Spot fleet for non-critical workloads, rightsizing program" },
        { label: "Infrastructure as Code", value: "100% Terraform", detail: "No manual console changes — all infrastructure version-controlled and peer-reviewed" },
      ],
      pattern: "Cloud-first for new workloads. Lift-and-shift for legacy with a modernization roadmap. Platform engineering team provides paved roads — golden paths that developers use without thinking about the infrastructure beneath.",
    },
    reference: {
      pharmacy: "Azure AKS for containerized pharmacy workloads. Terraform for multi-region deployment. Azure Front Door for global load balancing across 9,000+ locations. Azure Site Recovery for DR. FinOps via Azure Cost Management — critical for thin-margin retail.",
      wealth: "AWS EKS with multi-region for advisor platform availability. GCP BigQuery reserved capacity for analytics. Terraform modules shared across advisor and client portal. 99.99% SLA for trading-adjacent workloads. Cost allocation by business unit for P&L clarity.",
    },
  },
  {
    id: "security",
    label: "Platform & Security",
    icon: "◉",
    color: COLORS.red,
    llm: { primary: "claude", secondary: "openai", reason: "Claude for security policy reasoning, AIGP-governed threat analysis, and audit narrative generation. Constitutional AI training directly aligns with security-first posture. OpenAI for SAST/DAST tooling integrations." },
    full: {
      headline: "Zero-trust security architecture across Card, Banking, and Payments — PCI-DSS Level 1, SOX controls, OCC/FDIC consent order remediation, and supply chain security at enterprise scale.",
      stack: ["OAuth 2.0 + OIDC — federated identity", "AWS IAM + Secrets Manager — least-privilege access", "Snyk / SonarQube — SAST in CI pipeline", "OWASP ZAP — DAST for API endpoints", "AWS GuardDuty + Security Hub — threat detection", "HashiCorp Vault — secrets management", "Sigstore — supply chain signing and provenance"],
      evidence: [
        { label: "PCI-DSS", value: "Level 1 compliant", detail: "Card data handling — tokenization, encryption at rest and in transit, network segmentation" },
        { label: "Consent order", value: "OCC + FDIC delivered", detail: "Self-identification, self-correction frameworks — all requirements satisfied on schedule" },
        { label: "Zero-trust", value: "Identity-first", detail: "No implicit trust — every service-to-service call authenticated and authorized" },
        { label: "Supply chain", value: "SBOM + signing", detail: "Software Bill of Materials for all production artifacts — Sigstore signing in pipeline" },
      ],
      pattern: "Shift-left security — SAST in PR gate, DAST on staging deploy, penetration testing quarterly. Security as a platform service — not a gatekeeper. Developer-friendly tooling that catches issues early without slowing delivery.",
    },
    reference: {
      pharmacy: "Azure Entra ID for identity. HIPAA BAA with Microsoft. PHI encryption with Azure Key Vault. Defender for Cloud — continuous compliance monitoring. HITRUST certification path. PCI-DSS for pharmacy payment processing. Mend for open-source vulnerability scanning.",
      wealth: "SOC2 Type II + SEC Rule 17a-4 for record retention. AWS Macie for PII detection in S3. Identity governance with SailPoint. Privileged access management with CyberArk. FINRA data residency requirements — data never leaves US regions.",
    },
  },
  {
    id: "sre",
    label: "SRE & AIOps",
    icon: "⬢",
    color: COLORS.green,
    llm: { primary: "copilot", secondary: "claude", reason: "Copilot for GitHub-native alert triage and incident response in existing workflow. Claude for root cause analysis reasoning, post-mortem generation, and anomaly explanation in plain language." },
    full: {
      headline: "Site Reliability Engineering practice across 5,000+ contact center agents and 50M+ cardmembers — synthetic monitoring, AI-assisted incident response, and continuous reliability improvement.",
      stack: ["Datadog APM + Synthetics — observability platform", "PagerDuty — incident management and escalation", "OpenTelemetry — vendor-neutral instrumentation", "Blameless — SRE platform and post-mortems", "Prometheus + Grafana — metrics and dashboards", "Chaos Engineering — GameDays quarterly", "k6 — performance engineering in CI pipeline"],
      evidence: [
        { label: "Synthetic monitoring", value: "Every 5 minutes", detail: "Full customer journey synthetic transactions — cart, checkout, prescription, authentication" },
        { label: "MTTR", value: "Reduced significantly", detail: "AIOps correlation of alerts to recent deployments — faster root cause identification" },
        { label: "SLO framework", value: "99.9%+ availability", detail: "Error budgets per service — teams self-govern reliability against defined SLOs" },
        { label: "GameDays", value: "Quarterly cadence", detail: "Deliberate chaos injection — auth failure, database degradation, third-party API outage" },
      ],
      pattern: "SRE as embedded practice — reliability engineers embedded in product teams, not in a separate SRE team. Error budget policy governs when teams prioritize reliability work over feature delivery. AIOps reduces alert fatigue — signal over noise.",
    },
    reference: {
      pharmacy: "Azure Monitor + Application Insights for pharmacy digital channels. PagerDuty for pharmacy operations on-call. Synthetic monitoring on prescription refill and checkout journeys every 5 minutes. PBM API latency SLO — 8 second response time. GameDay: PBM outage simulation — queue vs. fail behavior tested quarterly.",
      wealth: "Datadog for advisor platform observability. Trading-adjacent SLOs — 99.99% for order management. Chaos engineering for market data feed disruption. Post-mortems with Blameless — every P1 incident within 48 hours. AIOps correlation: market volatility events to platform load patterns.",
    },
  },
  {
    id: "qe",
    label: "Quality Engineering",
    icon: "◆",
    color: COLORS.gold,
    llm: { primary: "claude", secondary: "openai", reason: "Claude for test generation, script healing, risk prioritization, and AIGP-governed quality decisions. Constitutional AI alignment critical for healthcare and financial services regulated test environments." },
    full: {
      headline: "Quality@Speed — enterprise quality engineering operating model across Card, Banking, Payments, and Contact Center. From 5% to 65% test automation. From quarterly to monthly release cadence.",
      stack: ["REST Assured — functional API validation", "Karate DSL — BDD API scenarios", "Pact JVM — consumer-driven contract testing", "k6 — two-stage performance engineering", "Karate E2E — cross-service journey testing", "GitHub Actions — five-layer parallel pipeline", "Claude API — agentic test generation and healing"],
      evidence: [
        { label: "Test automation", value: "5% → 65%", detail: "Enterprise automation from near-zero — COE to federated embedded model" },
        { label: "Test cycle", value: "4 weeks → 2 weeks", detail: "Parallel execution, shift-left, automated regression — $10M+/yr productivity recovered" },
        { label: "Release cadence", value: "Quarterly → Monthly", detail: "8 additional production releases per year — $22M+/yr feature value acceleration" },
        { label: "CI/CD platform", value: "1,000+ apps migrated", detail: "ClearCase to GitHub/Trident — intraday deployment for 80% of enterprise applications" },
      ],
      pattern: "Design for quality in the product lifecycle — not at the end. Federated embedded model — QE engineers embedded in product squads, governed by shared standards and tooling. Quality gates as pipeline infrastructure, not manual checkpoints.",
    },
    reference: {
      pharmacy: "Karate DSL for prescription API scenarios. Pact contract testing across PBM integration. k6 performance gates for pharmacy checkout (3-second SLA). Synthetic monitoring on prescription refill journey every 5 minutes. Test data via GenRocket synthetic generation — no PHI in test environments.",
      wealth: "REST Assured for portfolio API validation. Contract testing across advisor portal and market data feeds. Performance testing for trading-adjacent APIs — 500ms SLA for order status. Accessibility testing with axe-core — WCAG 2.1 AA for advisor and client portals.",
    },
  },
  {
    id: "governance",
    label: "Governance & Compliance",
    icon: "◈",
    color: COLORS.purple,
    llm: { primary: "claude", secondary: "openai", reason: "Claude is the only LLM with Constitutional AI training — directly aligned to governance, safety, and compliance reasoning. AIGP framework implementation, audit narrative generation, and regulatory response drafting. OpenAI as secondary for document processing and classification." },
    full: {
      headline: "Enterprise governance and regulatory compliance across OCC, FDIC, Federal Reserve, PCI-DSS, SOX, and WCAG — including active consent order delivery under regulatory scrutiny.",
      stack: ["GRC platform — ServiceNow or Archer", "JIRA — self-identification and remediation tracking", "Confluence — governance documentation and runbooks", "GitHub — audit trail for all code and infrastructure changes", "Datadog — control monitoring and evidence collection", "OpenTelemetry — audit trail for AI agent decisions"],
      regulations: [
        { code: "SOX", full: "Sarbanes-Oxley", domain: "Financial reporting controls", evidence: "Discover public company — IT general controls, change management, access reviews", color: COLORS.gold },
        { code: "PCI-DSS", full: "Payment Card Industry", domain: "Card data security — Level 1", evidence: "50M+ cardmembers — tokenization, encryption, network segmentation, quarterly pen testing", color: COLORS.red },
        { code: "OCC", full: "Office of Comptroller of Currency", domain: "National bank examination", evidence: "Consent order delivery — self-identification, self-correction, remediation on schedule", color: COLORS.teal },
        { code: "FDIC", full: "Federal Deposit Insurance Corporation", domain: "Banking operations and safety", evidence: "Direct bank operations — capital adequacy, liquidity, operational resilience reporting", color: COLORS.teal },
        { code: "FRB", full: "Federal Reserve Board", domain: "Bank holding company oversight", evidence: "Discover Bank holding structure — stress testing, resolution planning, supervisory reporting", color: COLORS.teal },
        { code: "HIPAA", full: "Health Insurance Portability", domain: "Patient health information", evidence: "Retail pharmacy context — PHI handling, BAA requirements, audit trail for data access", color: COLORS.green },
        { code: "WCAG 2.1", full: "Web Content Accessibility", domain: "Digital accessibility — AA", evidence: "Digital channel compliance — axe-core automated testing, manual audit quarterly", color: COLORS.slate },
      ],
      evidence: [
        { label: "Consent order", value: "OCC + FDIC delivered", detail: "All requirements satisfied on schedule — self-identification framework sustained post-order" },
        { label: "SOX controls", value: "IT General Controls", detail: "Change management, access reviews, audit logging — clean audit opinion sustained" },
        { label: "PCI-DSS", value: "Level 1 — annual audit", detail: "Card data handling — tokenization, encryption, network segmentation, quarterly pen testing" },
        { label: "Governance operating model", value: "Committee structure", detail: "Technology Risk Committee, Change Advisory Board, Architecture Review Board — sustained cadence" },
      ],
      pattern: "Governance as a product — with customers (regulators, auditors, leadership), outcomes (clean audit opinions, on-schedule remediation), and continuous improvement. Not a function that slows delivery. A capability that enables it.",
    },
    reference: {
      pharmacy: "HIPAA BAA with cloud provider. PHI classification and lineage tracking. Pharmacy board compliance per state. DEA schedule drug controls. 340B program audit requirements. WCAG 2.1 AA for pharmacy digital channels — legal requirement for prescription access.",
      wealth: "SEC Rule 17a-4 for record retention — WORM storage. FINRA supervision requirements. Fiduciary standard documentation. SOC2 Type II annual audit. State insurance regulators for annuity products. GDPR for international wealth management clients.",
    },
  },
];

function CloudToggle({ selected, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: 1, marginRight: 4 }}>CLOUD</span>
      {CLOUDS.map(c => (
        <button key={c.id} onClick={() => onChange(c.id)} style={{
          background: selected === c.id ? `${c.color}20` : "transparent",
          border: `1px solid ${selected === c.id ? c.color : "rgba(255,255,255,0.1)"}`,
          borderRadius: 6, padding: "4px 12px", cursor: "pointer",
          fontSize: 12, fontWeight: 600, color: selected === c.id ? c.color : "rgba(255,255,255,0.35)",
          fontFamily: "monospace", transition: "all 0.15s",
        }}>{c.label}</button>
      ))}
    </div>
  );
}

function LLMBadge({ llmId }) {
  const llm = LLMS.find(l => l.id === llmId);
  if (!llm) return null;
  return (
    <span style={{
      fontSize: 10, color: llm.color, background: `${llm.color}18`,
      border: `1px solid ${llm.color}35`, borderRadius: 4,
      padding: "2px 7px", fontFamily: "monospace", letterSpacing: 0.3,
    }}>{llm.label}</span>
  );
}

function DisciplinePanel({ discipline, cloud, industry }) {
  const [openEvidence, setOpenEvidence] = useState(null);
  const cloudData = CLOUDS.find(c => c.id === cloud);
  const isDiscover = industry.id === "discover";

  return (
    <div style={{ padding: "24px 28px", overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20, color: discipline.color }}>{discipline.icon}</span>
          <div>
            <div style={{ fontSize: 10, color: discipline.color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 3 }}>
              {isDiscover ? "Full Evidence" : "Reference Pattern"}
            </div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#fff", letterSpacing: -0.3 }}>{discipline.label}</h3>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>LLM</span>
          <LLMBadge llmId={discipline.llm.primary} />
          <LLMBadge llmId={discipline.llm.secondary} />
        </div>
      </div>

      {/* LLM reasoning */}
      <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontStyle: "italic", lineHeight: 1.6 }}>{discipline.llm.reason}</div>
      </div>

      {/* Cloud services context */}
      {cloudData && (
        <div style={{ padding: "10px 14px", background: `${cloudData.color}0C`, border: `1px solid ${cloudData.color}30`, borderRadius: 8, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: cloudData.color, fontFamily: "monospace" }}>{cloudData.label}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>— {cloudData.note}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {Object.entries(cloudData.services).slice(0, 4).map(([k, v]) => (
              <div key={k} style={{ fontSize: 10, color: "rgba(255,255,255,0.42)" }}>
                <span style={{ color: cloudData.color, opacity: 0.7 }}>{k}: </span>{v}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 1, background: `linear-gradient(90deg, ${discipline.color}45, transparent)`, marginBottom: 16 }} />

      {isDiscover ? (
        <div>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{discipline.full.headline}</p>

          {/* Tech stack */}
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Technology Stack</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
            {discipline.full.stack.map((s, i) => (
              <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", background: `${discipline.color}10`, border: `1px solid ${discipline.color}25`, borderRadius: 5, padding: "3px 8px" }}>{s}</div>
            ))}
          </div>

          {/* Evidence */}
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Evidence — Discover Financial Services</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
            {discipline.full.evidence.map((e, i) => (
              <button key={i} onClick={() => setOpenEvidence(openEvidence === i ? null : i)} style={{
                background: openEvidence === i ? `${discipline.color}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${openEvidence === i ? discipline.color + "40" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 8, padding: "11px 13px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: discipline.color, marginBottom: 3 }}>{e.value}</div>
                <div style={{ fontSize: 11, color: "#fff", marginBottom: openEvidence === i ? 5 : 0 }}>{e.label}</div>
                {openEvidence === i && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.6 }}>{e.detail}</div>}
              </button>
            ))}
          </div>

          {/* Governance regulations if applicable */}
          {discipline.id === "governance" && (
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Regulatory Stack</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                {discipline.full.regulations.map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 10, padding: "8px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: r.color, fontFamily: "monospace" }}>{r.code}</div>
                    <div>
                      <div style={{ fontSize: 11, color: "#fff", marginBottom: 2 }}>{r.domain}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{r.evidence}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pattern */}
          <div style={{ padding: "12px 14px", background: `${discipline.color}08`, border: `1px solid ${discipline.color}22`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: discipline.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5 }}>The Pattern</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, fontStyle: "italic" }}>{discipline.full.pattern}</div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>
            Applied Pattern — {industry.name}
          </div>
          <div style={{ padding: "14px 16px", background: `${discipline.color}08`, border: `1px solid ${discipline.color}20`, borderRadius: 9, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.78 }}>
              {industry.id === "pharmacy" ? discipline.reference.pharmacy : discipline.reference.wealth}
            </div>
          </div>
          <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontStyle: "italic", lineHeight: 1.6 }}>
              Reference pattern applies the Discover evidence base to {industry.name} context. Full implementation adapts stack and tooling to {cloudData?.label} ecosystem and domain-specific regulatory requirements.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function IndustryDomains() {
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0]);
  const [activeDiscipline, setActiveDiscipline] = useState(DISCIPLINES[0]);
  const [cloud, setCloud] = useState(INDUSTRIES[0].cloud);

  const handleIndustryChange = (industry) => {
    setActiveIndustry(industry);
    setCloud(industry.cloud);
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", height: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>ARIV</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Industry Domain Deep Dives</span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <CloudToggle selected={cloud} onChange={setCloud} />
          </div>
        </div>
        <div style={{ display: "flex", height: 2 }}>
          {[COLORS.gold, COLORS.teal, COLORS.green, COLORS.purple, COLORS.red, COLORS.slate, COLORS.amber].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c, opacity: 0.5 }} />
          ))}
        </div>
      </div>

      {/* INDUSTRY SELECTOR */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 10 }}>
          {INDUSTRIES.map(ind => (
            <button key={ind.id} onClick={() => handleIndustryChange(ind)} style={{
              flex: 1, background: activeIndustry.id === ind.id ? `${ind.color}12` : "transparent",
              border: `1px solid ${activeIndustry.id === ind.id ? ind.color + "55" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 10, padding: "14px 18px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 10, color: activeIndustry.id === ind.id ? ind.color : "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 4 }}>
                {ind.type}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: activeIndustry.id === ind.id ? "#fff" : "rgba(255,255,255,0.5)", marginBottom: 4 }}>{ind.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", lineHeight: 1.5 }}>{ind.scale}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                {ind.domains.map((d, i) => (
                  <span key={i} style={{ fontSize: 9, color: activeIndustry.id === ind.id ? ind.color : "rgba(255,255,255,0.25)", background: `${ind.color}10`, padding: "1px 6px", borderRadius: 3, letterSpacing: 0.3 }}>{d}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 28px", display: "grid", gridTemplateColumns: "190px 1fr", gap: 16, minHeight: 620 }}>

        {/* DISCIPLINE NAV */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6, padding: "0 4px" }}>Disciplines</div>
          {DISCIPLINES.map(d => (
            <button key={d.id} onClick={() => setActiveDiscipline(d)} style={{
              background: activeDiscipline.id === d.id ? `${d.color}10` : "transparent",
              border: `1px solid ${activeDiscipline.id === d.id ? d.color + "45" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 7, padding: "9px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 13, color: activeDiscipline.id === d.id ? d.color : "rgba(255,255,255,0.2)" }}>{d.icon}</span>
              <span style={{ fontSize: 12, color: activeDiscipline.id === d.id ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: activeDiscipline.id === d.id ? 500 : 400, lineHeight: 1.3 }}>{d.label}</span>
            </button>
          ))}

          {/* Active cloud context */}
          <div style={{ marginTop: 10, padding: "12px 12px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Active Cloud</div>
            {(() => {
              const c = CLOUDS.find(c => c.id === cloud);
              return (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.color, fontFamily: "monospace", marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", lineHeight: 1.6 }}>
                    {c.industries.join(" · ")}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Active LLMs */}
          <div style={{ padding: "12px 12px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>LLM Layer</div>
            <div style={{ marginBottom: 4 }}><LLMBadge llmId={activeDiscipline.llm.primary} /></div>
            <div><LLMBadge llmId={activeDiscipline.llm.secondary} /></div>
          </div>
        </div>

        {/* DISCIPLINE DETAIL */}
        <div style={{
          background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${activeDiscipline.color}60, ${activeDiscipline.color}20, transparent)` }} />
          <DisciplinePanel discipline={activeDiscipline} cloud={cloud} industry={activeIndustry} />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "14px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "monospace", letterSpacing: 1 }}>
            ARIV · Industry Domain Deep Dives · Component C
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "monospace", letterSpacing: 1 }}>
            PLUGGABLE: AWS · Azure · GCP · Claude · OpenAI · Copilot · Gemini
          </div>
        </div>
      </div>
    </div>
  );
}
