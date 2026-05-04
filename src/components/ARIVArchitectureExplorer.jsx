import { useState } from "react";

const COLORS = {
  gold: "#B8860B",
  teal: "#2E7D9A",
  green: "#3A7A55",
  purple: "#6A3A9A",
  red: "#8B3A3A",
  slate: "#4A5A6A",
  amber: "#8B6914",
  coral: "#8B4A3A",
};

const CLOUD_SERVICES = {
  aws: {
    label: "AWS", color: "#FF9900",
    ui: "CloudFront + S3 + Amplify",
    api: "API Gateway + ALB + AppMesh",
    compute: "ECS / EKS / Lambda",
    data: "RDS Aurora / DynamoDB / ElastiCache",
    ai: "Bedrock / SageMaker / Comprehend",
    security: "IAM / KMS / GuardDuty / WAF",
    observability: "CloudWatch / X-Ray / OpenSearch",
    messaging: "SQS / SNS / EventBridge / Kafka (MSK)",
  },
  azure: {
    label: "Azure", color: "#0089D6",
    ui: "Azure CDN + Static Web Apps + Front Door",
    api: "API Management + Application Gateway",
    compute: "AKS / Container Apps / Functions",
    data: "Azure SQL / Cosmos DB / Redis Cache",
    ai: "Azure OpenAI / Cognitive Services / ML Studio",
    security: "Entra ID / Key Vault / Defender / Sentinel",
    observability: "Azure Monitor / App Insights / Log Analytics",
    messaging: "Service Bus / Event Grid / Event Hubs",
  },
  gcp: {
    label: "GCP", color: "#34A853",
    ui: "Cloud CDN + Firebase Hosting + Cloud Armor",
    api: "Apigee / Cloud Endpoints / Istio",
    compute: "GKE / Cloud Run / Cloud Functions",
    data: "Cloud SQL / Bigtable / Memorystore",
    ai: "Vertex AI / Gemini / AutoML / Document AI",
    security: "IAM / Cloud KMS / Security Command Center",
    observability: "Cloud Monitoring / Trace / Logging",
    messaging: "Pub/Sub / Dataflow / Cloud Tasks",
  },
};

const STACK_LAYERS = [
  { id: "ui", label: "UI Layer", icon: "◻", color: COLORS.teal },
  { id: "api", label: "API Gateway", icon: "⬡", color: COLORS.slate },
  { id: "intelligence", label: "AI / RAG / MCP", icon: "◈", color: COLORS.purple },
  { id: "services", label: "Microservices", icon: "⬢", color: COLORS.green },
  { id: "data", label: "Data & Events", icon: "◆", color: COLORS.gold },
  { id: "infra", label: "Infrastructure", icon: "◉", color: COLORS.amber },
  { id: "governance", label: "Governance", icon: "◈", color: COLORS.red },
];

const CHANNELS = [
  {
    id: "web",
    label: "Web",
    icon: "◻",
    color: COLORS.teal,
    desc: "Digital storefront and self-service portal — the highest-volume customer touchpoint across all industries.",
    industries: { discover: "Card account management, statements, payments, rewards redemption, new account opening", pharmacy: "Prescription refill, pharmacy locator, health records, photo, beauty, loyalty", wealth: "Advisor portal, client portal, portfolio dashboard, document vault, trade entry" },
    stack: {
      ui: {
        pattern: "React / Next.js — server-side rendering for SEO and performance. Component library shared across web and mobile (React Native Web). Micro-frontend architecture — each domain team owns their UI module independently.",
        tools: ["React 18 + Next.js 14", "TypeScript — strict mode", "Tailwind + Design System", "Storybook — component library", "Cypress — E2E", "Lighthouse — performance budget"],
        decision: "SSR for authenticated pages (account, dashboard). SSG for marketing pages. CSR for real-time data (balances, positions). Hydration boundary between static and dynamic is the architectural decision that most teams get wrong.",
      },
      api: {
        pattern: "BFF (Backend for Frontend) per channel — web BFF aggregates and transforms backend service responses specifically for the web experience. Prevents over-fetching and under-fetching. GraphQL for complex relational queries (portfolio, account history). REST for CRUD operations.",
        tools: ["GraphQL (Apollo Server)", "REST (Spring Boot / Node.js)", "API Gateway — rate limiting, auth", "OpenAPI 3.0 — contract-first", "Pact — consumer-driven contracts"],
        decision: "BFF per channel means web team owns their API layer. No coordination with mobile team for response shape changes. The cost is a service to maintain. The benefit is delivery velocity.",
      },
      intelligence: {
        pattern: "RAG (Retrieval Augmented Generation) for contextual help and personalization. Claude API for natural language query of account data, smart search, and customer service deflection. MCP connectors link Claude to live account data, product catalog, and knowledge base without fine-tuning.",
        tools: ["Claude claude-sonnet-4-20250514 — reasoning", "Vector DB (Pinecone / pgvector)", "Embedding model — Titan / Ada", "MCP server — account data connector", "LangChain / LangGraph — orchestration"],
        decision: "RAG over fine-tuning for regulated environments — customer data never leaves the control boundary. MCP gives Claude structured access to live data with audit trail. AIGP risk classification on every AI decision in the web channel.",
      },
      services: {
        pattern: "Domain-bounded microservices — each service owns its data and exposes an API. Services communicate via events (async) for non-critical paths and REST/gRPC (sync) for real-time reads. Strangler fig migration from monolith — one domain at a time.",
        tools: ["Java Spring Boot — core services", "Node.js — lightweight BFF and edge", "gRPC — inter-service sync", "Kafka — event streaming", "Pact JVM — contract testing"],
        decision: "Service granularity is the hardest decision. Too fine = distributed monolith. Too coarse = a monolith with a microservices label. Domain-driven design bounded contexts set the boundary. Each team owns one or two services end to end.",
      },
      data: {
        pattern: "CQRS + Event Sourcing for high-volume transactional domains (card transactions, prescription orders). Read replicas for reporting and analytics. Change Data Capture (CDC) to stream database changes to Kafka for downstream consumers.",
        tools: ["PostgreSQL / Aurora — transactional", "DynamoDB / Cosmos DB — session, cache", "Kafka — event streaming + CDC", "Redis — session and rate limit", "Snowflake — analytics warehouse"],
        decision: "Event sourcing preserves the full audit trail — every state change is an immutable event. Critical for regulatory compliance and debugging. The complexity cost is real. Apply it to domains where audit trail matters, not everywhere.",
      },
      infra: {
        pattern: "Multi-region active-active for critical paths (authentication, payment, prescription). Active-passive for analytics and reporting. Blue-green deployment for zero-downtime releases. Feature flags for progressive rollout per customer segment.",
        tools: ["Kubernetes (EKS / AKS / GKE)", "Terraform — infrastructure as code", "GitHub Actions — CI/CD pipeline", "Istio — service mesh", "ArgoCD — GitOps deployment"],
        decision: "Multi-region active-active is expensive and operationally complex. Apply it to the revenue-critical path only — not the whole platform. Define the blast radius clearly before committing to the architecture.",
      },
      governance: {
        pattern: "WCAG 2.1 AA automated in pipeline (axe-core). Accessibility is a legal requirement — not a nice-to-have. OWASP Top 10 in SAST (Snyk). CSP headers on all responses. Session management per OWASP ASVS Level 2. Cookie consent and privacy preference management.",
        tools: ["axe-core — accessibility automated", "Snyk — SAST in PR gate", "OWASP ZAP — DAST on staging", "Cookiebot / OneTrust — consent", "Content Security Policy"],
        decision: "Accessibility testing in the CI pipeline, not after launch. Every PR that touches UI runs axe-core. Failures block merge. This prevents the technical debt of retrofitting accessibility to a live product.",
      },
    },
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "◻",
    color: COLORS.green,
    desc: "Native-quality mobile experience — the primary channel for customer engagement in card, banking, pharmacy, and wealth management.",
    industries: { discover: "Card app — spend alerts, freeze card, pay bill, rewards, FICO score, instant messaging", pharmacy: "Rx refill, pharmacy chat, health tracker, digital coupons, drive-through pickup, prescription transfer", wealth: "Portfolio overview, market data, account alerts, document signing, advisor messaging, trade entry" },
    stack: {
      ui: {
        pattern: "React Native for shared codebase across iOS and Android with native performance. Native modules for biometrics, push notifications, camera (check deposit, prescription scan), and secure enclave. Expo for rapid iteration on shared components.",
        tools: ["React Native + Expo", "TypeScript — strict mode", "React Navigation", "react-native-biometrics", "Detox — E2E mobile testing", "Flipper — debugging"],
        decision: "React Native over Flutter for web code sharing (React Native Web). Over native (Swift/Kotlin) for delivery velocity and team size. The performance gap has closed for most use cases. Native modules bridge the remaining gaps.",
      },
      api: {
        pattern: "Mobile BFF — optimized response payloads for mobile network constraints. Offline-first architecture with local SQLite for account data, transaction history, and prescription records. Background sync when connectivity restores. Push notification orchestration via mobile BFF.",
        tools: ["Mobile BFF (Node.js / Go)", "REST — primary protocol (mobile network-friendly)", "GraphQL subscriptions — real-time alerts", "SQLite — offline data store", "Background fetch API"],
        decision: "Offline-first is non-negotiable for pharmacy and banking mobile. Customers in low-connectivity areas (rural pharmacy, subway banking) still need to see their balance and prescription status. SQLite is the local truth; sync reconciles on reconnect.",
      },
      intelligence: {
        pattern: "On-device ML for sensitive inference (facial recognition, spend categorization, medication reminders) — no data leaves the device. Server-side Claude API for complex reasoning (spending insights, drug interaction alerts, portfolio commentary). Push notification personalization via RAG.",
        tools: ["Core ML / TensorFlow Lite — on-device", "Claude API — server-side reasoning", "Firebase ML — model distribution", "APNs / FCM — push notifications", "MCP — secure data connector"],
        decision: "On-device inference for privacy-sensitive classification. Server-side for complex reasoning that requires context across the full account history. The boundary is: does the inference require data beyond what is already on the device?",
      },
      services: {
        pattern: "Same microservices as web — mobile BFF aggregates. Mobile-specific services: push notification service, device registry, biometric credential store. Deep linking service for in-app navigation from push notifications and marketing emails.",
        tools: ["Shared microservices (same as web)", "Push notification service", "Device registry service", "Deep link resolver", "Biometric credential service"],
        decision: "Services are shared. The BFF layer handles mobile-specific aggregation and transformation. This keeps the service count manageable and avoids duplicating business logic for each channel.",
      },
      data: {
        pattern: "Same event streaming as web. Mobile-specific: offline SQLite synced via CDC-derived API. Analytics event stream for mobile UX — session replay, crash reporting, funnel analysis. App performance monitoring for render time and network latency per device/OS version.",
        tools: ["Shared Kafka + databases", "SQLite — device offline store", "Amplitude / Mixpanel — product analytics", "Firebase Crashlytics — crash reporting", "Datadog RUM — real user monitoring"],
        decision: "Mobile analytics must capture the full user journey including failed network requests and offline sessions. Amplitude captures the UX funnel. Datadog RUM captures the performance signal. Both are needed — different questions, different tools.",
      },
      infra: {
        pattern: "Mobile CI/CD via Fastlane — automated build, test, and App Store / Play Store submission. Staged rollout — 1% → 10% → 50% → 100% over 72 hours. Feature flags (LaunchDarkly) for server-controlled feature activation without app update.",
        tools: ["Fastlane — iOS + Android CI/CD", "GitHub Actions — pipeline", "TestFlight / Firebase App Distribution", "LaunchDarkly — feature flags", "CodePush — JS bundle updates"],
        decision: "CodePush (React Native) allows JS-layer bug fixes without App Store review. Critical for regulated apps where a payment bug needs a same-day fix. The native binary still goes through review. The JS layer updates over the air.",
      },
      governance: {
        pattern: "App Store compliance (Apple Review Guidelines, Google Play Policy). PCI-DSS mobile payment standards. Certificate pinning for all API calls — prevents MITM attacks. Jailbreak / root detection. Screen capture prevention for sensitive data screens.",
        tools: ["Certificate pinning (TrustKit)", "Jailbreak detection (IOSSecuritySuite)", "Screen capture prevention", "App Transport Security (ATS)", "OWASP MASVS — mobile security standard"],
        decision: "Certificate pinning breaks developer tooling (Charles Proxy, Proxyman). The tradeoff is real — harder to debug, meaningfully more secure. Apply to authentication and payment screens only. Not to marketing or help content.",
      },
    },
  },
  {
    id: "contact-center",
    label: "Contact Center",
    icon: "◻",
    color: COLORS.gold,
    desc: "5,000+ agent platform — the highest-cost customer touchpoint and the one most transformed by AI. Average handle time is the primary financial lever.",
    industries: { discover: "Card servicing — disputes, fraud, payments, credit limit, account maintenance. Banking — deposit, transfer, wire, account opening. Payments — merchant support, settlement", pharmacy: "Prescription status, transfer in, prior auth support, insurance questions, pharmacy locator, specialty pharmacy", wealth: "Advisor support, client account queries, trade confirmation, document requests, compliance escalation" },
    stack: {
      ui: {
        pattern: "Unified agent desktop — single Chrome application replacing 6+ legacy systems. Customer 360 above the fold: identity, account summary, recent transactions, open cases, known issues. Next-best-action recommendations from Claude. Real-time transcript and sentiment from voice AI.",
        tools: ["React — agent desktop", "WebSocket — real-time data push", "WebRTC — voice integration", "Genesys / NICE — CTI integration", "Salesforce Service Cloud — case management"],
        decision: "The single agent desktop is the highest-ROI investment in contact center technology. Eliminating context switching across 6 systems saved 5 minutes per call at Discover. At 5,000 agents and 10M calls per year, that is $6M+ in annual capacity recovery.",
      },
      api: {
        pattern: "Agent experience API — aggregates customer data from Card, Banking, Payments, and Identity into a single real-time response. Sub-500ms SLA — agent cannot wait while a customer is on the line. Circuit breakers on every downstream service call. Graceful degradation when any system is unavailable.",
        tools: ["Agent Experience API (Java Spring Boot)", "GraphQL — flexible data aggregation", "Redis — customer session cache", "Resilience4j — circuit breakers", "Datadog APM — sub-500ms SLA monitoring"],
        decision: "The agent experience API is the most latency-sensitive service in the enterprise. 500ms is the maximum tolerable response time before agent experience degrades visibly. Cache aggressively. Fail fast. Degrade gracefully — show what you have, flag what you cannot retrieve.",
      },
      intelligence: {
        pattern: "Claude API for real-time agent assist — listens to the conversation (via transcript), suggests next actions, auto-fills case notes, identifies sentiment shift, and flags compliance risk. RAG connector links Claude to product knowledge base, policy documents, and customer history without fine-tuning.",
        tools: ["Claude claude-sonnet-4-20250514 — agent assist", "Whisper / Deepgram — real-time transcription", "RAG — knowledge base retrieval", "MCP — live account data connector", "A2A — escalation to specialist agent"],
        decision: "Agent assist must be non-intrusive. Suggestions appear in a panel — the agent reads them or ignores them. The AI never speaks on the agent's behalf. The AIGP risk classification: HIGH for compliance-adjacent suggestions (regulatory disclosures, dispute resolution scripts) — human reviews before sending.",
      },
      services: {
        pattern: "Contact center microservices: case management, interaction history, agent routing, callback scheduling, quality monitoring, real-time coaching. Integrated with core banking and card services via event-driven architecture — account changes propagate in real time to agent desktop without page refresh.",
        tools: ["Case management service", "Interaction history service", "Agent routing service (skills-based)", "Callback scheduling service", "Real-time coaching service"],
        decision: "Skills-based routing is the highest-ROI routing strategy — match the customer's issue to the agent with the highest resolution rate for that issue type. The routing model retrain monthly on case resolution data. A 5% improvement in first-call resolution is worth millions in repeat call reduction.",
      },
      data: {
        pattern: "Real-time event stream: every agent action, every customer statement, every case update is an event. Kafka topic per domain. Powers real-time dashboards for supervisors, quality monitoring, and coaching. Feeds ML models for handle time prediction, escalation risk, and next-best-action.",
        tools: ["Kafka — real-time event stream", "Flink — stream processing", "Redshift / Synapse — interaction analytics", "Tableau — supervisor dashboards", "SageMaker / Vertex AI — ML models"],
        decision: "Real-time supervisor dashboards change agent behavior. When agents can see their own handle time and sentiment trend live, performance improves without additional coaching. The data stream enables this — without it, supervisors only see yesterday's data.",
      },
      infra: {
        pattern: "Contact center is the most latency-sensitive workload. Sub-100ms for agent desktop interactions. Multi-region active-active for business continuity — a contact center outage during a product incident is a catastrophic compounding failure. 99.99% availability SLA.",
        tools: ["Multi-region EKS / AKS", "Global load balancing", "Redis Cluster — session", "CDN — static agent desktop assets", "Dedicated network egress — voice quality"],
        decision: "Dedicated network egress for voice traffic. Shared internet connectivity introduces packet loss and jitter that degrades voice quality below acceptable thresholds. The cost is $50-100K/year. The benefit is eliminating 20% of customer complaints about call quality.",
      },
      governance: {
        pattern: "PCI-DSS for payment processing during calls. FDCPA compliance for debt collection calls. TCPA compliance for outbound calling and recording consent. Call recording with PII masking — credit card numbers, SSNs, DOBs masked in transcript and recording before storage.",
        tools: ["Call recording with PII masking", "TCPA consent management", "Quality monitoring (Verint / NICE)", "Compliance script enforcement", "AIGP governance on AI suggestions"],
        decision: "AI suggestions in the agent desktop require AIGP HIGH risk classification for regulatory disclosures. The agent reads the suggestion and confirms it is appropriate before using it. The AI proposes, the human decides. This is the non-negotiable boundary.",
      },
    },
  },
  {
    id: "chat",
    label: "Chat / AI",
    icon: "◻",
    color: COLORS.purple,
    desc: "Conversational AI channel — the fastest-growing customer touchpoint and the one most directly powered by LLM capability.",
    industries: { discover: "Virtual assistant for card and banking self-service — balance inquiry, payment, dispute initiation, fraud reporting, product questions. Escalation to live agent with full context preserved", pharmacy: "Prescription refill via chat, drug interaction questions, prior auth status, pharmacy hours, insurance questions. Pharmacist escalation for clinical questions", wealth: "Portfolio questions, document requests, advisor scheduling, market data queries. Compliance-aware — investment advice boundary enforced" },
    stack: {
      ui: {
        pattern: "Embedded chat widget on web and mobile — not a separate app. Persistent conversation history. Typing indicators. Rich media responses: cards for product comparisons, quick replies for guided flows, file upload for document submission. Accessibility-first (ARIA, keyboard navigation, screen reader support).",
        tools: ["React chat component", "WebSocket — real-time messaging", "Web Crypto API — message encryption", "Rich message format (cards, quick replies)", "WCAG 2.1 AA — accessibility"],
        decision: "Persistent conversation history across sessions is table stakes in 2026. Customers should not have to re-explain context when they return to a chat. Store conversation history encrypted at rest. Retrieve on session start. The privacy implication is a regulatory disclosure requirement.",
      },
      api: {
        pattern: "Conversation management API — session state, history, context. Routes messages to the appropriate handler: FAQ (retrieval), transactional (service call), or complex reasoning (Claude API). Escalation API hands off conversation to agent with full context — no re-collection of information the customer already provided.",
        tools: ["Conversation API (Node.js)", "Intent classifier (Claude / fine-tuned)", "Escalation API — agent handoff", "WebSocket gateway", "Session state (Redis)"],
        decision: "The escalation handoff is where most AI chat implementations fail. The agent receives the customer with zero context from the conversation. The fix is to pass the full structured conversation summary to the agent desktop when escalation is triggered. One API call. Eliminates 2-3 minutes of re-verification per escalation.",
      },
      intelligence: {
        pattern: "Claude claude-sonnet-4-20250514 for complex reasoning, empathetic responses, and multi-step guided flows. RAG retrieval for FAQ and policy questions — grounded in source documents, not hallucinated. MCP connectors for live account data — Claude can retrieve the customer's actual balance, not a generic response. A2A for escalation to specialist agents.",
        tools: ["Claude claude-sonnet-4-20250514 — reasoning", "RAG — policy and product knowledge", "MCP — live account data", "A2A — specialist agent routing", "AIGP governance — every AI decision classified"],
        decision: "The boundary between what AI handles and what escalates to a human must be explicit and enforced — not emergent. In financial services: investment advice, dispute adjudication, and fraud investigation always escalate. The AI collects context, confirms identity, and initiates the process. The human makes the consequential decision.",
      },
      services: {
        pattern: "Intent classification → service routing → response generation → audit logging. Transactional intents (balance, payment, refill) hit microservices directly via MCP. Knowledge intents (policy, product) hit RAG retrieval. Complex intents (dispute, complaint) trigger a structured guided flow with human-in-the-loop at the decision point.",
        tools: ["Intent classification service", "Guided flow engine", "Microservices (same as web/mobile)", "RAG retrieval service", "Audit logging service"],
        decision: "Guided flows for high-stakes transactions — not open-ended conversation. Dispute initiation, prescription transfer, and account closure are guided flows: the AI collects structured data, confirms with the customer, and submits to the service. Open-ended conversation is for discovery and FAQ.",
      },
      data: {
        pattern: "Every conversation is a data asset. Conversation analytics: intent distribution, containment rate, escalation rate, sentiment trajectory, resolution rate. Feeds LLM fine-tuning pipeline (with PII stripped). Quality monitoring: random sample review of conversations touching compliance topics.",
        tools: ["Conversation analytics pipeline", "Kafka — conversation events", "Redshift / BigQuery — analytics", "LLM fine-tuning pipeline", "Quality monitoring dashboard"],
        decision: "Containment rate is the primary financial metric — what percentage of conversations are fully resolved without agent escalation. Every 1% improvement at scale is material cost reduction. But containment rate without customer satisfaction score is a dangerous metric — optimizing for containment while destroying satisfaction is worse than live agent handling.",
      },
      infra: {
        pattern: "Serverless for chat backend — Lambda / Cloud Functions. Auto-scales to handle traffic spikes (product incidents, marketing campaigns) without pre-provisioned capacity. Claude API rate limits are the binding constraint — implement request queuing and graceful degradation when limits are approached.",
        tools: ["Lambda / Cloud Functions — serverless", "API Gateway — WebSocket support", "SQS — request queuing", "Redis — session state", "Datadog — Claude API rate limit monitoring"],
        decision: "Claude API rate limits require a queuing strategy for high-traffic periods. Queue requests with priority — authenticated customers above unauthenticated. Graceful degradation: if Claude API is unavailable, fall back to retrieval-only mode (RAG without generation). Customers get accurate information, without the conversational wrapper.",
      },
      governance: {
        pattern: "AIGP risk classification on every Claude API call. HIGH risk: regulatory disclosures, dispute initiation, investment advice boundary. CRITICAL risk: any AI decision that affects a customer account state. Full conversation audit trail — every message, every AI decision, every MCP data access logged with 90-day retention.",
        tools: ["AIGP risk classifier", "Full conversation audit trail", "PII masking in logs", "Investment advice boundary enforcement", "TCPA consent for proactive chat"],
        decision: "Investment advice boundary is the hardest governance problem in wealth management AI chat. The line between information and advice is legally defined but practically blurry. The implementation: any response touching a specific security recommendation triggers a compliance disclosure and a human review flag. Not a block — a flag.",
      },
    },
  },
  {
    id: "instore",
    label: "In-Store",
    icon: "◻",
    color: COLORS.coral,
    desc: "Physical channel — the intersection of digital and physical. The transformation opportunity is using digital intelligence at the point of physical interaction.",
    industries: { discover: "Branch banking — teller workstation, new account opening, loan origination, notary services, safe deposit box. (Card has no physical stores — this maps to partner retail locations)", pharmacy: "Point of sale — prescription pickup, OTC purchase, consultation room, drive-through, immunization, photo lab, health clinic", wealth: "Advisor office — client meeting room, document signing, portfolio review, new account onboarding, notary" },
    stack: {
      ui: {
        pattern: "Hardened tablet or thin-client workstation for teller, pharmacist, and advisor. Offline-capable — store operations cannot stop because the network is slow. Queue management for pharmacy drive-through. Digital signage integration for in-store promotions and pharmacy wait times.",
        tools: ["React — workstation UI", "Electron — desktop app container", "SQLite — offline data store", "Queue management system", "Digital signage API"],
        decision: "Offline capability is the non-negotiable requirement for pharmacy POS. A patient picking up a controlled substance at 9pm cannot wait for a network timeout. Local prescription data, insurance eligibility cache, and payment processing must work offline. Sync to central systems when connectivity restores.",
      },
      api: {
        pattern: "Edge API — deployed to in-store compute for low-latency access. Syncs to central systems via CDC when connected. POS API integration for payment processing. Pharmacy system integration (QS1, PioneerRx, Epic) via HL7 FHIR for prescription data exchange. Identity verification via document scan + biometric.",
        tools: ["Edge API (Go / Node.js — lightweight)", "POS integration (Verifone / Ingenico)", "HL7 FHIR — pharmacy system integration", "Document scan + OCR", "Identity verification API"],
        decision: "HL7 FHIR is the standard for healthcare data exchange. Not all pharmacy systems support it natively — middleware translation layer is common. The translation layer is where data quality issues originate. Define the canonical data model and validate at the boundary.",
      },
      intelligence: {
        pattern: "Pharmacist AI assist — drug interaction alerts, therapeutic alternatives, prior auth status, insurance formulary coverage. Not autonomous decision-making — the pharmacist makes every clinical decision. AI surfaces relevant information at the point of care. Vision AI for prescription label verification.",
        tools: ["Claude API — pharmacist assist", "Drug interaction database (First Databank / Medi-Span)", "Prior auth status lookup", "Vision AI — label verification", "MCP — live patient record connector"],
        decision: "Drug interaction alerts have a false positive problem — over-alerting causes pharmacist alert fatigue and dismissal of real alerts. The AI must be calibrated: surface high-severity interactions prominently, suppress low-severity ones that the pharmacist already accounts for in their workflow. Precision over recall for clinical alerts.",
      },
      services: {
        pattern: "Shared microservices for patient data, prescription status, insurance eligibility, and inventory. In-store specific: queue management service, immunization record service, consultation scheduling service, photo lab service. Inventory sync with pharmacy warehouse management system.",
        tools: ["Shared pharmacy microservices", "Queue management service", "Immunization record service (VFC compliant)", "Inventory sync service", "Consultation scheduling service"],
        decision: "Immunization record services must integrate with state immunization information systems (IIS) for VFC (Vaccines for Children) program compliance. This is a regulatory requirement that most pharmacy platforms treat as an afterthought. Build the IIS integration before the immunization workflow, not after.",
      },
      data: {
        pattern: "Transaction data from every store location feeds central analytics in real time via Kafka. Inventory data feeds supply chain optimization. Prescription fill times and wait times feed operational efficiency dashboards. Patient satisfaction surveys trigger follow-up outreach.",
        tools: ["Kafka — in-store event stream", "Inventory management integration", "Operational dashboards (real-time)", "Patient satisfaction survey platform", "Supply chain analytics"],
        decision: "Prescription wait time is the in-store NPS driver — more than any other factor. Real-time wait time data enables proactive communication ('Your prescription will be ready in 45 minutes. Would you like a text notification?'). The data pipeline for this is straightforward. The decision to use it is a leadership choice.",
      },
      infra: {
        pattern: "Edge compute in each store — small footprint server for local processing. Central cloud for analytics, ML, and synchronization. SD-WAN for store network with automatic failover to cellular. 99.5% local availability target — the store operates with degraded but functional mode when cloud connectivity is lost.",
        tools: ["Edge compute (Intel NUC / AWS Outposts)", "SD-WAN (Meraki / VeloCloud)", "Cellular failover", "MDM — device management (Jamf / Intune)", "Remote monitoring and alerting"],
        decision: "MDM (Mobile Device Management) is essential for 9,000 store locations. Software updates, security patches, and configuration changes must be pushed centrally and applied reliably. Without MDM, stores run different software versions and security postures — a compliance and support nightmare.",
      },
      governance: {
        pattern: "HIPAA BAA for all in-store health data. State pharmacy board compliance per jurisdiction — 50 different regulatory environments. DEA compliance for controlled substance dispensing. PCI-DSS for in-store payment processing. ADA compliance for physical store accessibility (not just digital).",
        tools: ["HIPAA compliance framework", "State pharmacy board reporting", "DEA dispensing records system", "PCI-DSS Level 1 — in-store payment", "ADA compliance monitoring"],
        decision: "State pharmacy regulations vary significantly. What is permitted in one state (pharmacist-prescribed hormonal contraception, naloxone standing order) may be prohibited in another. The compliance framework must be jurisdiction-aware. A single national policy is not legally defensible.",
      },
    },
  },
  {
    id: "agent-tools",
    label: "Agent Tools",
    icon: "◻",
    color: COLORS.slate,
    desc: "Internal platform — the productivity layer for advisors, agents, pharmacists, and relationship managers. The quality of internal tools directly determines the quality of customer outcomes.",
    industries: { discover: "Internal card and banking agent tools — case management, fraud investigation, credit decisioning support, compliance monitoring, management dashboards", pharmacy: "Pharmacist workstation, technician queue management, clinical decision support, inventory management, prior auth workflow", wealth: "Advisor workstation, client relationship management, portfolio construction tools, compliance monitoring, proposal generation" },
    stack: {
      ui: {
        pattern: "Internal tool design prioritizes efficiency over aesthetics — keyboard shortcuts, bulk actions, configurable layouts, information density. Tabular data, not cards. Keyboard-first navigation. Context-aware defaults that reduce cognitive load. Dark mode as the default for long-session users.",
        tools: ["React + Ant Design / MUI (density-optimized)", "AG Grid — high-performance data tables", "Keyboard shortcut library", "Configurable dashboard (React Grid Layout)", "Dark mode default"],
        decision: "Consumer design patterns (cards, white space, animations) are wrong for internal tools. An agent processing 50 cases per day needs information density and keyboard efficiency. The design system for internal tools must be separate from the consumer design system.",
      },
      api: {
        pattern: "Internal API — no rate limiting, no public auth. Service mesh authentication (mTLS) between internal services. Bulk operation APIs for case management, batch updates, report generation. Admin APIs for configuration — feature flags, routing rules, threshold adjustments.",
        tools: ["Internal API (Java Spring Boot)", "mTLS — service mesh auth", "Bulk operation APIs", "Admin API — configuration management", "Internal GraphQL — flexible queries"],
        decision: "Internal APIs should not reuse public APIs. The performance requirements, data scope, and access patterns are fundamentally different. A public API exposes minimum necessary data with rate limiting. An internal API exposes full operational data with bulk operation support.",
      },
      intelligence: {
        pattern: "Copilot for developer tools and code review. Claude for case summarization, compliance document generation, regulatory response drafting, and complex reasoning tasks. Advisor AI: portfolio commentary generation, client proposal drafting, suitability analysis. AIGP HIGH risk classification for all investment-adjacent AI outputs.",
        tools: ["GitHub Copilot — developer tooling", "Claude API — case summarization, compliance drafting", "RAG — policy and regulatory knowledge base", "MCP — live case and account data", "AIGP risk classifier"],
        decision: "Internal users are more sophisticated than consumers but also more vulnerable to AI errors that propagate at scale. A compliance officer using AI to draft a regulatory response needs the AI to be accurate and auditable. AIGP audit trail is more important for internal tools than consumer tools — the stakes of an error are higher.",
      },
      services: {
        pattern: "Shared microservices plus internal-specific: case management, bulk processing, reporting, audit logging, configuration management, user provisioning (SCIM). Role-based access control — least-privilege per job function. Access reviews quarterly (SOX requirement).",
        tools: ["Case management service", "Bulk processing service", "Reporting service", "SCIM — user provisioning", "Role-based access control engine"],
        decision: "SCIM (System for Cross-domain Identity Management) automates user provisioning and de-provisioning. When an employee leaves, their access is revoked within hours — not days. This is a SOX IT general control. Manual provisioning processes fail this control — automate it.",
      },
      data: {
        pattern: "Operational analytics for management: agent productivity, case resolution rate, handle time, quality scores, compliance metrics. Advisor analytics: book of business health, client engagement, pipeline, revenue attribution. Real-time supervisory dashboards. Historical trend analysis with drill-down to individual cases.",
        tools: ["Operational analytics pipeline", "Tableau / Looker — management dashboards", "Salesforce Analytics — CRM data", "Redshift / Synapse — historical analysis", "Real-time supervisor dashboard"],
        decision: "Management dashboards must be role-appropriate. A front-line supervisor needs real-time agent productivity. A VP needs trend analysis and exception reports. A C-suite leader needs the one-page summary with the three numbers that matter. Build three dashboards, not one dashboard with 50 views.",
      },
      infra: {
        pattern: "Internal tools on the same Kubernetes platform as customer-facing services — shared infrastructure. Separate namespace, separate network policy. Lower availability SLA than customer-facing (99.5% vs 99.99%) — acceptable because agents have manual fallback processes. Maintenance windows permitted.",
        tools: ["Kubernetes — shared with customer-facing", "Separate namespace + network policy", "Active-passive DR (vs active-active for consumer)", "Maintenance window permitted", "MDM for agent workstations"],
        decision: "Different SLA for internal vs. customer-facing is correct and should be explicit. Applying 99.99% SLA requirements to internal tools is over-engineering. 99.5% with documented manual fallback processes is appropriate. The cost difference funds customer-facing resilience instead.",
      },
      governance: {
        pattern: "SOX IT general controls — access reviews, change management, segregation of duties. Privileged access management (PAM) for administrator functions. Every administrative action logged with the actor, timestamp, and rationale. Quarterly access reviews with automated evidence collection for audit.",
        tools: ["PAM — CyberArk / BeyondTrust", "SOX control monitoring", "Automated audit evidence collection", "Segregation of duties enforcement", "Quarterly access review workflow"],
        decision: "Segregation of duties is the SOX control that most internal tool implementations violate. The person who processes transactions cannot also approve them. The person who creates users cannot also approve access. Enforce this in the application layer — do not rely on policy documents and manual controls.",
      },
    },
  },
  {
    id: "agentic",
    label: "Agentic Commerce",
    icon: "◻",
    color: COLORS.purple,
    desc: "The emerging channel — AI agents acting on behalf of customers and businesses with minimal human intervention. The frontier of enterprise transformation.",
    industries: { discover: "Agentic bill payment — AI agent monitors due dates, negotiates payment plans, executes payments within defined parameters. Agentic fraud response — detect, freeze, initiate dispute without customer initiation", pharmacy: "Agentic refill management — AI monitors refill schedules, contacts prescribers for renewals, coordinates insurance prior auth, schedules pickup. No customer action required.", wealth: "Agentic portfolio rebalancing — AI executes rebalancing within defined parameters, tax-loss harvesting, dividend reinvestment. Advisor approves the strategy, AI executes." },
    stack: {
      ui: {
        pattern: "Agentic activity feed — customers see what agents have done on their behalf, not a prompt interface. Action history with natural language explanations. Pause/resume controls. Parameter configuration (spending limits, refill windows, rebalancing thresholds). Alert preferences for agent actions above defined thresholds.",
        tools: ["Agentic activity feed UI", "Parameter configuration interface", "Real-time agent action notifications", "Human override controls", "Audit trail viewer"],
        decision: "The UI for agentic commerce is a control panel, not a chat interface. Customers set parameters, review activity, and exercise override. The agent acts. This is the UX distinction between agentic commerce and chat AI — the customer is not in the conversation, they are in the governance seat.",
      },
      api: {
        pattern: "Agentic API — designed for machine consumption, not human-driven requests. Idempotent operations — agents may retry. Structured action responses with audit trail. Rate limiting per agent identity. Human override API — any agent action can be reversed within a defined window.",
        tools: ["Agentic API (idempotent design)", "Agent identity management", "Human override API", "Action reversal window", "Structured audit response"],
        decision: "Idempotency is the foundational requirement for agentic APIs. Agents retry on failure. Without idempotency, a retry creates a duplicate payment, duplicate refill, or duplicate trade. Every state-changing API must accept an idempotency key and return the same result on retry.",
      },
      intelligence: {
        pattern: "LangGraph for stateful multi-step agent workflows. Claude claude-sonnet-4-20250514 for reasoning and decision-making within defined boundaries. MCP connectors for secure data access. A2A (Agent-to-Agent) protocol for coordination between the customer agent and business-side agents (insurance, prescriber, advisor). UCP (Universal Commerce Protocol) for cross-platform transaction execution.",
        tools: ["LangGraph — agent orchestration", "Claude claude-sonnet-4-20250514 — reasoning", "MCP — secure data access", "A2A protocol — agent coordination", "UCP — universal commerce execution"],
        decision: "A2A protocol enables agents to coordinate across organizational boundaries. The patient refill agent coordinates with the prescriber's renewal agent and the insurance prior-auth agent — without human intermediation. This is the transformative capability. The governance requirement: every A2A interaction is logged and attributable.",
      },
      services: {
        pattern: "Agent execution service — manages agent lifecycle, parameter enforcement, and action logging. Action budget service — enforces spending limits, refill windows, and rebalancing thresholds defined by the customer. Rollback service — reverses agent actions within the defined reversal window. A2A coordination service.",
        tools: ["Agent execution service", "Action budget service", "Rollback service", "A2A coordination service", "Agent audit service"],
        decision: "The action budget service is the safety layer that makes agentic commerce deployable. Without it, an agent has unlimited authority. With it, the agent operates within explicit, customer-defined parameters. The customer trusts the agent because the agent cannot exceed the budget. Start narrow. Expand with demonstrated reliability.",
      },
      data: {
        pattern: "Agent action log — immutable, append-only record of every agent action, decision rationale, and outcome. Feeds oversight dashboard for operations team. Aggregate analytics: action success rate, reversal rate, customer satisfaction with agent actions, cost per agent-handled transaction vs. human-handled.",
        tools: ["Immutable action log (append-only)", "Agent analytics pipeline", "Operations oversight dashboard", "Customer satisfaction tracking", "Cost comparison analytics"],
        decision: "The reversal rate is the canary metric for agentic commerce. If customers are frequently reversing agent actions, the agent is acting outside the parameters customers actually intended — even if within the parameters customers configured. Monitor reversal rate as the leading indicator of agent trust erosion.",
      },
      infra: {
        pattern: "Serverless agent execution — agents run on demand, not continuously. EventBridge / Cloud Scheduler for time-triggered agents (monthly rebalancing, refill window check). SQS / Pub/Sub for event-triggered agents (fraud signal, due date alert, prescription expiry). Isolated execution environment per agent run.",
        tools: ["Lambda / Cloud Functions — serverless agent execution", "EventBridge — scheduled triggers", "SQS — event triggers", "Isolated execution sandbox", "Agent execution monitoring"],
        decision: "Isolated execution environment per agent run prevents agent state bleed between runs and customers. Each execution is a clean start from defined parameters. This is the security and correctness requirement. The performance cost is cold start latency — acceptable for scheduled agents, manageable for event-triggered agents.",
      },
      governance: {
        pattern: "AIGP CRITICAL risk classification for all agentic commerce actions — by definition. Every agent action requires a documented rationale. Human override mandatory for actions above defined thresholds. Regulatory compliance: agentic bill payment (EFTA), agentic trading (SEC Rule 15c3-5), agentic prescription (DEA, state pharmacy boards).",
        tools: ["AIGP CRITICAL tier — all actions", "Mandatory rationale logging", "Human override enforcement", "Regulatory compliance framework per domain", "Agent liability attribution"],
        decision: "Agentic commerce creates a new category of regulatory liability: who is responsible when an AI agent makes a decision that harms a customer? The legal framework is not settled. The operational response: every agent action is attributable to a named model version, a named configuration, and a named human who approved the parameters. The audit trail is the liability defense.",
      },
    },
  },
];

function CloudPill({ cloudId }) {
  const c = Object.values(CLOUD_SERVICES).find((_, i) => Object.keys(CLOUD_SERVICES)[i] === cloudId);
  const cs = CLOUD_SERVICES[cloudId];
  if (!cs) return null;
  return <span style={{ fontSize: 10, color: cs.color, background: `${cs.color}18`, border: `1px solid ${cs.color}35`, borderRadius: 4, padding: "2px 7px", fontFamily: "monospace" }}>{cs.label}</span>;
}

function StackLayerView({ layer, channelStack, cloud }) {
  const cs = CLOUD_SERVICES[cloud];
  const data = channelStack[layer.id];
  if (!data) return null;

  return (
    <div style={{ padding: "20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 18, color: layer.color }}>{layer.icon}</span>
        <div>
          <div style={{ fontSize: 10, color: layer.color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 2 }}>Layer</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>{layer.label}</div>
        </div>
        {cs && layer.id !== "intelligence" && layer.id !== "governance" && (
          <div style={{ marginLeft: "auto" }}>
            <CloudPill cloudId={cloud} />
          </div>
        )}
      </div>

      {/* Cloud-specific services for this layer */}
      {cs && layer.id === "api" && (
        <div style={{ padding: "8px 12px", background: `${cs.color}0C`, border: `1px solid ${cs.color}28`, borderRadius: 7, marginBottom: 12, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
          <span style={{ color: cs.color, fontFamily: "monospace" }}>{cs.label}: </span>{cs.api}
        </div>
      )}
      {cs && layer.id === "data" && (
        <div style={{ padding: "8px 12px", background: `${cs.color}0C`, border: `1px solid ${cs.color}28`, borderRadius: 7, marginBottom: 12, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
          <span style={{ color: cs.color, fontFamily: "monospace" }}>{cs.label}: </span>{cs.data} · {cs.messaging}
        </div>
      )}
      {cs && layer.id === "infra" && (
        <div style={{ padding: "8px 12px", background: `${cs.color}0C`, border: `1px solid ${cs.color}28`, borderRadius: 7, marginBottom: 12, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
          <span style={{ color: cs.color, fontFamily: "monospace" }}>{cs.label}: </span>{cs.compute} · {cs.observability}
        </div>
      )}
      {cs && layer.id === "security" && (
        <div style={{ padding: "8px 12px", background: `${cs.color}0C`, border: `1px solid ${cs.color}28`, borderRadius: 7, marginBottom: 12, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
          <span style={{ color: cs.color, fontFamily: "monospace" }}>{cs.label}: </span>{cs.security}
        </div>
      )}

      <p style={{ margin: "0 0 14px", fontSize: 12, color: "rgba(255,255,255,0.52)", lineHeight: 1.78 }}>{data.pattern}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
        {data.tools.map((t, i) => (
          <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", background: `${layer.color}10`, border: `1px solid ${layer.color}25`, borderRadius: 4, padding: "2px 8px" }}>{t}</div>
        ))}
      </div>

      <div style={{ padding: "12px 14px", background: `${layer.color}08`, border: `1px solid ${layer.color}20`, borderRadius: 8 }}>
        <div style={{ fontSize: 10, color: layer.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5 }}>The Decision</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic", lineHeight: 1.7 }}>{data.decision}</div>
      </div>
    </div>
  );
}

export default function ArchitectureExplorer() {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [activeLayer, setActiveLayer] = useState(STACK_LAYERS[0]);
  const [cloud, setCloud] = useState("aws");

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>ARIV</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Architecture Explorer</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace", marginRight: 4 }}>CLOUD</span>
            {Object.entries(CLOUD_SERVICES).map(([id, c]) => (
              <button key={id} onClick={() => setCloud(id)} style={{
                background: cloud === id ? `${c.color}18` : "transparent",
                border: `1px solid ${cloud === id ? c.color : "rgba(255,255,255,0.1)"}`,
                borderRadius: 5, padding: "3px 10px", cursor: "pointer",
                fontSize: 11, fontWeight: 600, color: cloud === id ? c.color : "rgba(255,255,255,0.3)",
                fontFamily: "monospace", transition: "all 0.15s",
              }}>{c.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", height: 2 }}>
          {CHANNELS.map((c, i) => <div key={i} style={{ flex: 1, background: c.color, opacity: 0.45 }} />)}
        </div>
      </div>

      {/* CHANNEL SELECTOR */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 28px", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 8, minWidth: 700 }}>
          {CHANNELS.map(ch => (
            <button key={ch.id} onClick={() => { setActiveChannel(ch); setActiveLayer(STACK_LAYERS[0]); }} style={{
              flex: 1, background: activeChannel.id === ch.id ? `${ch.color}12` : "transparent",
              border: `1px solid ${activeChannel.id === ch.id ? ch.color + "55" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 8, padding: "10px 10px", cursor: "pointer", textAlign: "center", transition: "all 0.18s", minWidth: 90,
            }}>
              <div style={{ fontSize: 10, color: activeChannel.id === ch.id ? ch.color : "rgba(255,255,255,0.22)", letterSpacing: 0.5, fontFamily: "monospace", marginBottom: 4 }}>{ch.icon}</div>
              <div style={{ fontSize: 12, color: activeChannel.id === ch.id ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: activeChannel.id === ch.id ? 500 : 400 }}>{ch.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CHANNEL DESC + INDUSTRY CONTEXT */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, alignItems: "start" }}>
          <div style={{ gridColumn: "1" }}>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{activeChannel.desc}</p>
          </div>
          {[
            { key: "discover", label: "Discover", color: COLORS.gold },
            { key: "pharmacy", label: "Retail Pharmacy", color: COLORS.teal },
            { key: "wealth", label: "Wealth Mgmt", color: COLORS.green },
          ].map(ind => (
            <div key={ind.key} style={{ padding: "10px 12px", background: `${ind.color}08`, border: `1px solid ${ind.color}20`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: ind.color, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5 }}>{ind.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{activeChannel.industries[ind.key]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN — STACK EXPLORER */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px", display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, minHeight: 520 }}>

        {/* LAYER NAV */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6, padding: "0 4px" }}>Stack Layers</div>
          {STACK_LAYERS.map(l => (
            <button key={l.id} onClick={() => setActiveLayer(l)} style={{
              background: activeLayer.id === l.id ? `${l.color}10` : "transparent",
              border: `1px solid ${activeLayer.id === l.id ? l.color + "45" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 7, padding: "9px 11px", cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 12, color: activeLayer.id === l.id ? l.color : "rgba(255,255,255,0.2)" }}>{l.icon}</span>
              <span style={{ fontSize: 11, color: activeLayer.id === l.id ? "#fff" : "rgba(255,255,255,0.42)", fontWeight: activeLayer.id === l.id ? 500 : 400, lineHeight: 1.3 }}>{l.label}</span>
            </button>
          ))}

          {/* Cloud context */}
          <div style={{ marginTop: 8, padding: "11px 12px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
            {(() => {
              const c = CLOUD_SERVICES[cloud];
              return (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.color, fontFamily: "monospace", marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>AI: {c.ai}</div>
                </div>
              );
            })()}
          </div>

          {/* Connectors preview */}
          <div style={{ padding: "11px 12px", background: "rgba(106,58,154,0.06)", border: "1px solid rgba(106,58,154,0.2)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: COLORS.purple, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>Connectors</div>
            {["MCP", "A2A", "UCP", "RAG"].map((c, i) => (
              <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", padding: "2px 0" }}>{c}</div>
            ))}
          </div>
        </div>

        {/* LAYER DETAIL */}
        <div style={{ background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${activeLayer.color}60, ${activeLayer.color}20, transparent)` }} />
          <StackLayerView layer={activeLayer} channelStack={activeChannel.stack} cloud={cloud} />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "12px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", letterSpacing: 1 }}>ARIV · Architecture Explorer · Component A</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: "monospace", letterSpacing: 1 }}>7 CHANNELS · 7 LAYERS · PLUGGABLE CLOUD + AI</div>
        </div>
      </div>
    </div>
  );
}
