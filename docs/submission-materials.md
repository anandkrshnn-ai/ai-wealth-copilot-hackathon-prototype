# Banking Innovation Hackathon 2026 – AI Wealth Copilot Prototype
**Track 1: Digital Wealth Management**

This document contains the final, polished copy for your Slide Deck (PPT) and your 3-Minute Demo Video Script.

---

## 🎙️ Part 1: 3-Minute Demo Script (Widescreen Walkthrough)

**Presenter Target:** Split-screen UI visible to judges.
**Live URL:** `https://anandkrshnn-ai.github.io/ai-wealth-copilot-hackathon-prototype/`

| Time | Spoken Script (Voiceover) | On-Screen Action |
|------|---------------------------|------------------|
| **0:00 – 0:25** | "Good morning, panel. This is **AI Wealth Copilot Prototype** — a compliance-first digital onboarding and wealth advisory prototype. It leverages secure, conversational AI to simplify customer goal capture, while using deterministic rules for suitability scoring, dynamic transaction behavioral checks, and relationship-manager handoffs." | Show the live site. Highlight the split-screen setup: Mobile Client on the left, Auditor Console on the right. |
| **0:25 – 0:55** | "Rather than confusing clients with dense compliance forms, the customer simply enters their goals in native text. Notice the **Model Provider Selector**. When we toggle to **Amazon Bedrock**, the console exposes the exact production-ready request structure and signed headers. Let's trigger the NLU parser to extract the structured intent profile." | Toggle provider dropdown to **Amazon Bedrock** → Select "Aarav Sharma" prompt chip → Click "Analyze". Point to the extracted profile in Card 5. |
| **0:55 – 1:30** | "Once the intent is parsed, our suitability engine automatically merges it with synthetic transaction logs. Look at the Auditor metrics card on the right: the engine dynamically audits the customer’s savings history, deducting points for cheque bounces, and adjusting scores for saving consistency. This goes beyond static profiling to assess active credit health." | Click through to Step 3. Highlight the **Derived Behavioral Signals** adjustments (+/- points) in the Auditor panel. |
| **1:30 – 2:00** | "Crucially, the rules engine enforces strict guardrails. For regulated or complex products like PMS or Alternative Investment Funds, the system automatically blocks direct digital fulfillment and initiates a secure Relationship Manager handoff, pre-populating an audit payload." | Select PMS/AIF or trigger an escalation (e.g. Priya Patel) → Show the escalation notice and handoff button. |
| **2:00 – 2:15** | "This split-screen visibility proves our core concept: AI for conversational accessibility, rules for deterministic compliance, and target architecture fully aligned to the secure AWS cloud sandbox. Thank you." | Hover over the Auditor Console logs, then end cleanly. |

---

## 📊 Part 2: Official Hackathon PPT Template Content

### Slide 1: Team Details
- **Team Name:** AI Wealth Copilot
- **Team Leader:** Anandakrishnan Damodaran
- **Problem Statement:** Problem Statement 1 – Digital Wealth Management
- **Organisation:** Independent Builder
- **Location:** Chennai, Tamil Nadu

### Slide 2: Brief about the idea
AI Wealth Copilot Prototype is a **guardrailed digital wealth adviser** embedded inside mobile banking applications. It converts customer goals and transaction behaviour into **explainable, suitability-compliant recommendations**.

The copilot uses a **hybrid model**: AI handles multilingual onboarding, financial goal discovery, education, and first-level advice, while complex or regulated cases are routed to certified Relationship Managers with full context.

A built-in **policy engine** enforces SEBI/RBI/IRDA suitability rules, prevents unauthorized advice, and creates an auditable trail of every recommendation — enabling banks to move safely from sandbox prototype to enterprise-scale deployment.

### Slide 3: Opportunities
**How is it different from other existing ideas?**
- Not a generic LLM chatbot — it is a **workflow-driven wealth copilot** with explicit suitability and compliance logic.
- Uses goals + behaviour + affordability + existing holdings (not just risk questionnaires or product pushes).
- Designed for **seamless RM handoff** with context summaries, not as a black-box robo-adviser.

**How will it solve the problem?**
- Scales personalised wealth conversations to mass-affluent and retail customers without linear RM headcount growth.
- Improves quality of leads for RMs by pre-screening suitability, risk, and readiness to invest.
- Improves financial literacy via multilingual, explainable interactions inside the mobile app.

**USP of the proposed solution**
- **Guardrailed GenAI**: Every recommendation passes through a policy & suitability engine before the customer sees it.
- **Explainability-first**: Recommendations are delivered as reason cards (goal fit, risk fit, product fit) — useful for customers, RMs, and auditors.
- **Deployment-ready architecture**: Clean separation between core bank data/services and the LLM layer, supporting sandbox, internal cloud, or on-prem rollout.

### Slide 4: List of features offered by the solution
- Goal-based onboarding – capture short-term/long-term goals, liquidity needs, and timelines through a conversational flow.
- Risk profiling & segmentation – combine KYC, demographics, income, dependents, and behaviour to assign risk bands.
- Product suitability engine – map core banking products (MFs, bonds, deposits, insurance) to customer segment, horizon, and risk.
- Multilingual chat + voice interface – pan-India language support with optional avatar-based UX (English, Hindi, Marathi, Gujarati).
- RM escalation workflow – auto-flag complex or regulated cases and route them to RMs with a one-page summary.
- Audit trail & compliance logging – store prompts, recommendations, rule decisions, and approvals for review.
- Event-driven nudges – goal-driven alerts (missed SIP, surplus cash, market events) with contextual advice.
- Advisor cockpit (future) – RM dashboard for case prioritisation, rationale review, and customer engagement.

### Slide 5: Process flow diagram / Use-case diagram
1. **Customer login & consent** – User logs into mobile app and opts into Wealth Copilot.
2. **Profile & goal capture** – Assistant collects goals, horizon, liquidity needs, dependents, and existing investments.
3. **Risk & suitability computation** – Engine computes risk band and filters eligible products using policy rules.
4. **AI recommendation card** – Copilot generates a summary card with recommended products, allocations, and rationale.
5. **RM review (if required)** – Complex or regulated cases are queued to an RM for approval or modification.
6. **Execution & monitoring** – On approval, the journey triggers transactions and sets up monitoring & nudges.

### Slide 6: Screens / Journey View
- **Screen 1 (Onboarding):** Login & Consent (Multilingual conversational assistant starts).
- **Screen 2 (Profiling):** Goal & Risk Profiling (Collects constraints, checks dynamic transaction behavior).
- **Screen 3 (Recommendation):** Explainable Recommendation (Presents card with Goal, Risk, and Product fit reasons).
- **Screen 4 (Execution):** RM Review / Execution (Automated RM handoff summary for complex/regulated checkouts).

*Footer: A guided, compliant journey from discovery to execution — with AI for scale and RM oversight for trust.*

### Slide 7: Architecture diagram of the proposed solution
- **Channel & Experience Layer:** Client Mobile App, RM / Branch Portal, Channel API Gateway.
- **AI & Logic Layer:** Experience Orchestrator (chat/voice, session state), LLM & Tool Router, Policy & Suitability Engine (SEBI/RBI/IRDA rules).
- **Data & Core Banking Layer:** Customer Profile & KYC, Product Catalogue, Portfolio & Transaction History, Logging & Audit logs.

*Note: The architecture isolates bank data inside private subnets, routing to Amazon Bedrock via secure private VPC endpoints.*

### Slide 8: Technologies to be used in the solution
- **Frontend & UX:** HTML5, CSS3, Vanilla responsive design, multilingual template UX.
- **AI & Reasoning:** Gemini 1.5 Flash client-side integration, Amazon Bedrock Claude 3.5 proxy model format, structured prompt templates.
- **Backend & Data:** Local session state management, Customer profile JSON mocks, PostgreSQL auditor console logs.
- **Security & Compliance:** OAuth / SSO mock layers, DPDP-aligned consent captures, AWS KMS envelope encryption mocks.

### Slide 9: Estimated implementation cost & timeline
- **Timeline**: 6–8 weeks from hackathon prototype to sandbox-ready pilot.
- **Team**: 3–5 engineers (Frontend, AI/ML, Backend/Integration, QA).
- **Infra**: Low-to-moderate incremental cost by leveraging existing cloud capabilities and caching data during pilot.
- **Business Impact**: Uplift in advisory reach, cross-sell, and RM productivity once rolled out.

### Slide 10: Snapshots of the prototype
- **Snapshot 01:** Goal & Profile Discovery (Conversational goal box + prompt chips panel).
- **Snapshot 02:** Suitability Analysis (Calculated suitability scores + dynamic behavioral signals cards).
- **Snapshot 03:** Advisory Rationale (Customer-safe rationale + compliance audit comments).
- **Snapshot 04:** RM Review & Escalation (Automatic RM connection window + handoff context payloads).

### Slide 11: Prototype Performance report / Benchmarking
- **Response time:** < 5 seconds for generating advisory cards.
- **Guardrail coverage:** 100% of customer-visible advice flows pass policy checks.
- **Explainability:** Delivers 3 critical reason cards for goal, risk, and product alignment.
- **1-Click Handoff:** RMs receive context payloads with complete scoring audit logs.

### Slide 12: Additional Details / Future Development
- **Near-term:** Scheme-level mutual fund recommendations; basic RM cockpit queue view.
- **Longer-term:** Model-risk governance workflows; prompt versioning and replay logs; expanded support for retirement and insurance journeys.

### Slide 13: Submission Links
- **GitHub Public Repository:** `https://github.com/anandkrshnn-ai/ai-wealth-copilot-hackathon-prototype`
- **Live Deployment Link:** `https://anandkrshnn-ai.github.io/ai-wealth-copilot-hackathon-prototype/`
- **Demo Video Link (3 Minutes):** *(Insert your YouTube/Drive video link here)*
