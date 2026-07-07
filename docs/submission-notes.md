# Hackathon Submission Notes - Banking Innovation Hackathon 2026

This document contains pre-filled copy-paste text blocks for the official hackathon submission form, alongside strategic shortlist boosters and a deck outline.

---

## 📋 Official Submission Form Fields

### 1. Selected Challenge Track
> Track 1: Digital Wealth Management

### 2. Submission Title / Project Name
> AI Wealth Copilot Prototype: A Compliance-Guided Hybrid Advisory Platform

### 3. Submission Description / Executive Summary
> **AI Wealth Copilot Prototype** is a digital wealth advisory pilot designed for mobile banking. It guides retail clients through multilingual goal capture, integrates savings account transaction telemetry, and determines product suitability through an inspectable local rule engine. 
> To prevent mis-selling and protect consumer interests, the application features deterministic compliance guardrails (RBI/SEBI aligned). If a customer request triggers a regulatory threshold—such as selecting high-risk alternative assets (AIF/PMS), transaction sizes exceeding ₹1 Crore, or senior citizens in aggressive bands—the app locks direct checkout, displays a clear warning, and seamlessly transfers the onboarding payload to a Relationship Manager (RM) along with an auditable explainability metadata payload.

### 4. Git Repository Link
> `https://github.com/anandkrshnn-ai/ai-wealth-copilot-hackathon-prototype`

### 5. Live Demo Deployment Link
> `https://anandkrshnn-ai.github.io/ai-wealth-copilot-hackathon-prototype/`

---

## 🚀 Shortlist Boosters (Strategic Competitive Advantages)

To capture the judges' attention and secure a spot in the final rounds, highlight these features in the submission commentary:

1.  **Auditor-First Design Hook:** The interface features a side-by-side view. Judges can see both the customer-facing mobile onboarding wizard and the internal bank auditor console simultaneously, proving full compliance in a single flow.
2.  **SEBI Suitability Conformity:** Demonstrates direct mapping to SEBI risk-profiling expectations by calculating suitability scores based on age, income ratios, and self-declarations.
3.  **Active Safe-Failure Logic:** Includes direct rejections for negative surplus or underflow investment sizes, validating that the system protects consumers first.
4.  **Local Test Evidence:** Features an automated Node-based test runner validating four distinct compliant, reject, and escalation scenarios.
5.  **Multilingual Goal Ingestion:** Supports immediate localization of goals across English, Hindi, Marathi, and Gujarati.

---

## 📊 Presentation Deck Structure (Strategic Recommendation)

Our recommended deck structure for the mandatory PDF upload:

*   **Slide 1: Title & Opportunity:** AI Wealth Copilot Prototype - Scaling digital wealth advisory while maintaining 100% SEBI/RBI compliance.
*   **Slide 2: The Core Challenge:** Mass retail clients lack access to human advisor guidance, while automated portals risk mis-selling speculative products without proper KYC and limit intercepts.
*   **Slide 3: Hybrid Solution Architecture:** The digital gateway paths: compliant retail profiles proceed to automated checkout, while complex or high-risk cases escalate to relationship managers.
*   **Slide 4: Technical Execution & Explainability:** Detailed breakdown of the risk weight calculations and the structured `explainabilityObject` payload.
*   **Slide 5: Business Impact & private cloud Roadmap:** Shows direct integration steps into the bank's core ingestion private subnets.
