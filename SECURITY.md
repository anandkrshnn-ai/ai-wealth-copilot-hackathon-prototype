# Security Policy - AI Wealth Copilot Prototype

AI Wealth Copilot Prototype is designed with bank-grade security and compliance guardrails. This policy details how to report vulnerabilities and outlines security guidelines for active deployments.

## Supported Versions

Only the latest release version is actively supported with security updates.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | Yes       |

## Reporting a Vulnerability

As this is a banking-grade prototype, security is a paramount concern. If you discover a security vulnerability, please report it via the following steps:

1.  **Do not disclose it publicly** (e.g. via GitHub Issues).
2.  Send a detailed vulnerability report to the maintainers at `security-alert@example.com`.
3.  Include a proof of concept, step-by-step reproduction guide, and detail the impact.

You will receive an acknowledgment of your report within 24–48 hours.

## Key Security Guardrails for Banking Deployment

If deploying this advisory framework to a production environment:

1.  **Data Isolation:** Ensure all customer data fetched from Savings Ledgers is processed in-memory or stored within encrypted VPC-bound database instances.
2.  **API Transport:** All calls from the client application to GenAI endpoints or Core Banking Systems must be encrypted via HTTPS/TLS 1.3 with JWT-based authorization tokens.
3.  **Cross-Site Scripting (XSS):** Any user commentary entered in the relationship manager handoff text area must be sanitized prior to rendering inside internal RM consoles.
4.  **No Financial Declarations Modification:** User risk score mappings must be signed by server-side private keys to prevent client-side tampered calculations.
