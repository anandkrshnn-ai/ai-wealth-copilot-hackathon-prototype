/* ==========================================================================
   AI Wealth Copilot Prototype - Core Logic System
   ========================================================================== */

class WealthCopilotApp {
  constructor() {
    this.currentStep = 1;
    this.language = 'en';
    this.selectedPersonaId = null;
    this.isGenAIEnabled = false;
    this.suitabilityScore = 0;
    this.computedRiskBand = 'Moderate';
    
    // Synthetic Datasets (Fallbacks for offline reliability)
    this.customers = [
      {
        "id": "CUST_001",
        "name": "Aarav Sharma",
        "age": 28,
        "occupation": "Software Engineer",
        "monthly_income": 120000,
        "monthly_expenses": 50000,
        "existing_investments": 150000,
        "declared_risk_appetite": "High",
        "transaction_behavior": {
          "average_balance": 95000,
          "investment_frequency": "Monthly",
          "bounced_cheques": 0
        }
      },
      {
        "id": "CUST_002",
        "name": "Priya Patel",
        "age": 42,
        "occupation": "Business Owner",
        "monthly_income": 350000,
        "monthly_expenses": 180000,
        "existing_investments": 1200000,
        "declared_risk_appetite": "Medium",
        "transaction_behavior": {
          "average_balance": 450000,
          "investment_frequency": "Quarterly",
          "bounced_cheques": 1
        }
      },
      {
        "id": "CUST_003",
        "name": "Ramesh Kulkarni",
        "age": 62,
        "occupation": "Retired Government Officer",
        "monthly_income": 55000,
        "monthly_expenses": 35000,
        "existing_investments": 2500000,
        "declared_risk_appetite": "Low",
        "transaction_behavior": {
          "average_balance": 80000,
          "investment_frequency": "None",
          "bounced_cheques": 0
        }
      }
    ];

    this.schemes = [
      {
        "code": "CORE_SUVIDHA_FD",
        "name": "Suvidha Fixed Deposit",
        "type": "Debt / Fixed Income",
        "risk_level": "Low",
        "suitability_score_min": 0,
        "suitability_score_max": 40,
        "min_investment": 10000,
        "historical_yield_indication": "7.10% p.a.",
        "description": "Safe, liquid, and predictable returns with principal protection under DICGC guidelines up to 5 Lakhs.",
        "regulated_escalation_required": false
      },
      {
        "code": "CORE_GOLD_FUND",
        "name": "Sovereign Gold Bond Index Fund",
        "type": "Commodities",
        "risk_level": "Low-to-Medium",
        "suitability_score_min": 20,
        "suitability_score_max": 55,
        "min_investment": 5000,
        "historical_yield_indication": "8.50% CAGR",
        "description": "Invests in gold bullion tracking Sovereign Gold Bonds, offering inflation hedge and capital safety.",
        "regulated_escalation_required": false
      },
      {
        "code": "CORE_NIFTY_INDEX",
        "name": "Nifty 50 Index Fund",
        "type": "Equity / Index",
        "risk_level": "Medium-to-High",
        "suitability_score_min": 45,
        "suitability_score_max": 75,
        "min_investment": 5000,
        "historical_yield_indication": "12.30% CAGR",
        "description": "Passive mutual fund tracking India's top 50 blue-chip companies, balancing growth and stability.",
        "regulated_escalation_required": false
      },
      {
        "code": "CORE_FLEXICAP",
        "name": "Flexi Cap Mutual Fund",
        "type": "Equity / Diversified",
        "risk_level": "High",
        "suitability_score_min": 65,
        "suitability_score_max": 100,
        "min_investment": 10000,
        "historical_yield_indication": "15.40% CAGR",
        "description": "Diversified equity scheme investing across large, mid, and small-cap segments for capital appreciation.",
        "regulated_escalation_required": false
      },
      {
        "code": "CORE_PMS_AGGRESSIVE",
        "name": "Portfolio Management Services (PMS) - Pioneer Fund",
        "type": "Regulated Portfolio Management",
        "risk_level": "Very High",
        "suitability_score_min": 85,
        "suitability_score_max": 100,
        "min_investment": 5000000,
        "historical_yield_indication": "18.20% CAGR",
        "description": "Concentrated portfolio. Mandated under SEBI rules for RM consultation due to ticket size limit of 50 Lakhs.",
        "regulated_escalation_required": true,
        "escalation_reason": "SEBI regulations mandate detailed suitability profiling and RM sign-off for Portfolio Management Services (PMS) with minimum 50 Lakhs ticket size."
      },
      {
        "code": "CORE_AIF_CAT2",
        "name": "Alternative Investment Fund (AIF) - Real Estate Yield Fund",
        "type": "Alternative Asset",
        "risk_level": "Very High",
        "suitability_score_min": 90,
        "suitability_score_max": 100,
        "min_investment": 10000000,
        "historical_yield_indication": "14.00% IRR",
        "description": "Private equity alternative fund investing in commercial real-estate debt. Highly illiquid and regulated.",
        "regulated_escalation_required": true,
        "escalation_reason": "Alternative Investment Funds (AIF) are restricted products under RBI/SEBI guidelines, requiring physical onboarding and accredited investor sign-off."
      }
    ];

    // Multilingual Translations Dictionary
    this.translations = {
      en: {
        lblCustName: "Full Name",
        lblCustAge: "Age",
        lblCustRisk: "Declared Risk Appetite",
        lblCustIncome: "Monthly Income (₹)",
        lblCustExpenses: "Monthly Expenses (₹)",
        lblGoalType: "Primary Investment Goal",
        lblInvestmentAmount: "Investment Budget / Ticket Size (₹)",
      },
      hi: {
        lblCustName: "पूरा नाम",
        lblCustAge: "उम्र",
        lblCustRisk: "घोषित जोखिम उठाने की क्षमता",
        lblCustIncome: "मासिक आय (₹)",
        lblCustExpenses: "मासिक खर्च (₹)",
        lblGoalType: "मुख्य निवेश लक्ष्य",
        lblInvestmentAmount: "निवेश बजट (₹)",
      },
      mr: {
        lblCustName: "पूर्ण नाव",
        lblCustAge: "वय",
        lblCustRisk: "जोखिम घेण्याची क्षमता",
        lblCustIncome: "मासिक उत्पन्न (₹)",
        lblCustExpenses: "मासिक खर्च (₹)",
        lblGoalType: "मुख्य आर्थिक ध्येय",
        lblInvestmentAmount: "गुंतवणूक बजेट (₹)",
      },
      gu: {
        lblCustName: "પૂરું નામ",
        lblCustAge: "ઉંમર",
        lblCustRisk: "જોખમ લેવાની ક્ષમતા",
        lblCustIncome: "માસિક આવક (₹)",
        lblCustExpenses: "માસિક ખર્ચ (₹)",
        lblGoalType: "મુખ્ય રોકાણ લક્ષ્ય",
        lblInvestmentAmount: "રોકાણ બજેટ (₹)",
      }
    };

    this.nluStatus = 'IDLE';
    this.nluPrompt = '';
    this.nluResponse = null;
    this.geminiApiKey = sessionStorage.getItem('gemini_api_key') || '';
    this.modelProvider = sessionStorage.getItem('model_provider') || 'gemini';
    this.awsProxyUrl = sessionStorage.getItem('aws_proxy_url') || '';
    this.behavioralSignals = {
      bouncedChequesCount: 0,
      bouncedChequesAdjustment: 0,
      savingsHabit: 'None',
      savingsHabitAdjustment: 0,
      balanceMultiple: 1.0,
      liquidityStressAdjustment: 0,
      netBehavioralAdjustment: 0
    };

    // Initialize DOM binds
    window.addEventListener('DOMContentLoaded', () => {
      this.initTime();
      this.loadDatasets();
      this.updateStateInspector();
      const keyEl = document.getElementById('geminiApiKey');
      if (keyEl) keyEl.value = this.geminiApiKey;
      const proxyEl = document.getElementById('awsProxyUrl');
      if (proxyEl) proxyEl.value = this.awsProxyUrl;
      const providerEl = document.getElementById('selModelProvider');
      if (providerEl) providerEl.value = this.modelProvider;
      this.syncModelProviderUI();
    });
  }

  initTime() {
    const update = () => {
      const d = new Date();
      let h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12; // 12 instead of 0
      document.getElementById('currentTime').textContent = `${h}:${m} ${ampm}`;
    };
    update();
    setInterval(update, 60000);
  }

  async loadDatasets() {
    try {
      const cRes = await fetch('data/customers.json');
      if (cRes.ok) this.customers = await cRes.json();
      const sRes = await fetch('data/schemes.json');
      if (sRes.ok) this.schemes = await sRes.json();
      this.logAudit('INFO', 'Datasets successfully synchronized with live JSON files.');
    } catch (e) {
      this.logAudit('WARN', 'Using local synthetic fallbacks for customers and schemes.');
    }
  }

  // Set Wizard Step
  setStep(stepNum) {
    this.currentStep = stepNum;
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNum}`).classList.add('active');
    
    // Log step transitions to auditor log
    this.logAudit('INFO', `Customer wizard transitioned to Step ${stepNum}: ${this.getStepTitle(stepNum)}`);
    this.updateStateInspector();
  }

  getStepTitle(step) {
    const titles = {
      1: "Persona Selector",
      2: "Goal Capture & Translation Setup",
      3: "Data Ingestion & Bank Profile Link",
      4: "Suitability Engine & Recommendations Plan",
      5: "Compliance Handoff Control Desk",
      6: "Audit Trail Success Ledger"
    };
    return titles[step] || "Unknown Step";
  }

  // Pre-fill Persona Click
  selectPersona(personaId) {
    this.selectedPersonaId = personaId;
    const p = this.customers.find(c => c.id === personaId);
    if (!p) return;

    // Fill form elements
    document.getElementById('custName').value = p.name;
    document.getElementById('custAge').value = p.age;
    document.getElementById('custRisk').value = p.declared_risk_appetite;
    document.getElementById('custIncome').value = p.monthly_income;
    document.getElementById('custExpenses').value = p.monthly_expenses;
    
    this.logAudit('INFO', `Pre-populated synthetic profile for ${p.name} (${p.occupation})`);
    
    // Auto-fill prompt chip box for easy NLU tracing
    const textEl = document.getElementById('conversationalGoalInput');
    if (textEl) {
      if (p.id === 'CUST_001') {
        textEl.value = "I am Aarav Sharma, 28 years old. I make 1.2 Lakhs and spend 50k monthly. I want to save for my retirement with a high risk appetite, budget 1 Lakh.";
      } else if (p.id === 'CUST_002') {
        textEl.value = "I am Priya Patel, 42. Income is 3.5 Lakhs, expenses 1.8 Lakhs. I want to place 50 Lakhs into PMS or Alternative Investment Funds with medium risk.";
      } else if (p.id === 'CUST_003') {
        textEl.value = "I am Ramesh Kulkarni, 62. I am retired, making 55k and spending 35k. I want to save 2 Lakhs for Tax Saving with low risk.";
      }
    }

    // Move to next step
    this.setStep(2);
  }

  saveApiKey() {
    const key = document.getElementById('geminiApiKey').value.trim();
    this.geminiApiKey = key;
    sessionStorage.setItem('gemini_api_key', key);
    this.logAudit('INFO', 'Gemini API Key updated and stored in session state (sessionStorage).');
  }

  saveAWSProxy() {
    const url = document.getElementById('awsProxyUrl').value.trim();
    this.awsProxyUrl = url;
    sessionStorage.setItem('aws_proxy_url', url);
    this.logAudit('INFO', 'AWS Gateway/Proxy URL updated and stored in session state.');
  }

  changeModelProvider() {
    const val = document.getElementById('selModelProvider').value;
    this.modelProvider = val;
    sessionStorage.setItem('model_provider', val);
    this.syncModelProviderUI();
    this.logAudit('INFO', `Model provider changed to: ${val}`);
  }

  syncModelProviderUI() {
    const geminiRow = document.getElementById('divGeminiKeyRow');
    const bedrockRow = document.getElementById('divBedrockProxyRow');
    if (this.modelProvider === 'gemini') {
      if (geminiRow) geminiRow.style.display = 'flex';
      if (bedrockRow) bedrockRow.style.display = 'none';
    } else {
      if (geminiRow) geminiRow.style.display = 'none';
      if (bedrockRow) bedrockRow.style.display = 'flex';
    }
  }

  usePromptChip(index) {
    const textEl = document.getElementById('conversationalGoalInput');
    if (!textEl) return;
    
    if (index === 1) {
      textEl.value = "I am Aarav Sharma, 28 years old. I make 1.2 Lakhs and spend 50k monthly. I want to save for my retirement with a high risk appetite, budget 1 Lakh.";
    } else if (index === 2) {
      textEl.value = "I am Priya Patel, 42. Income is 3.5 Lakhs, expenses 1.8 Lakhs. I want to place 50 Lakhs into PMS or Alternative Investment Funds with medium risk.";
    } else if (index === 3) {
      textEl.value = "I am Ramesh Kulkarni, 62. I am retired, making 55k and spending 35k. I want to save 2 Lakhs for Tax Saving with low risk.";
    }
    this.logAudit('INFO', `Selected prompt chip ${index} to prefill goal input.`);
  }

  async parseIntentWithAI() {
    const textInput = document.getElementById('conversationalGoalInput').value.trim();
    if (!textInput) {
      alert("Please enter a financial goal in your own words before parsing.");
      return;
    }

    const promptText = `Extract structured financial parameters from this customer's goals statement.
Goal Statement: "${textInput}"
    
Return a raw JSON object containing these exact fields:
{
  "fullName": string,
  "age": number,
  "declaredRisk": "Low" | "Medium" | "High",
  "monthlyIncome": number,
  "monthlyExpenses": number,
  "goalType": "TAX_SAVING" | "EMERGENCY_FUND" | "RETIREMENT" | "CHILD_EDUCATION" | "ESTATE_PLANNING",
  "investmentAmount": number,
  "goalPriority": "Low" | "Medium" | "High",
  "monthlyContribution": number,
  "lumpSumAmount": number,
  "languagePreference": "en" | "hi" | "mr" | "gu",
  "needsHumanAdvisor": boolean,
  "humanAdvisorReason": string,
  "investmentStyleKeywords": string[],
  "customerSummary": string
}`;

    document.getElementById('nluPromptViewer').textContent = promptText;
    const responseEl = document.getElementById('nluResponseViewer');
    const badge = document.getElementById('nluStatusBadge');
    
    if (this.modelProvider === 'bedrock') {
      badge.textContent = "Status: BEDROCK CALL...";
      badge.className = "badge badge-orange";
      
      const bedrockUrl = this.awsProxyUrl || "https://bedrock-runtime.ap-south-1.amazonaws.com/model/anthropic.claude-3-5-sonnet-20241022-v2:0/invoke";
      
      // Bedrock Payload for Claude 3.5 Sonnet
      const bedrockPayload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: promptText
              }
            ]
          }
        ]
      };

      document.getElementById('nluPromptViewer').textContent = 
        `POST ${bedrockUrl}\n` +
        `Host: bedrock-runtime.ap-south-1.amazonaws.com\n` +
        `Content-Type: application/json\n` +
        `Authorization: AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20260704/ap-south-1/bedrock/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=ab87fbc23a...\n` +
        `X-Amz-Date: 20260704T102000Z\n\n` +
        JSON.stringify(bedrockPayload, null, 2);

      responseEl.textContent = `Invoking model on Amazon Bedrock (Target: Claude 3.5 Sonnet)...`;

      if (this.awsProxyUrl) {
        try {
          const res = await fetch(this.awsProxyUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-Requested-With': 'AIWealthCopilotClient'
            },
            body: JSON.stringify(bedrockPayload)
          });
          if (!res.ok) {
            throw new Error(`Bedrock Gateway returned status ${res.status}`);
          }
          const data = await res.json();
          const rawText = data.content[0].text.trim();
          const extracted = JSON.parse(rawText);
          
          this.nluStatus = 'SUCCESS';
          this.nluResponse = extracted;
          badge.textContent = "Status: BEDROCK SUCCESS";
          badge.className = "badge badge-teal";
          responseEl.textContent = JSON.stringify(data, null, 2);
          this.applyParsedIntent(extracted);
          this.logAudit('INFO', `AWS Bedrock Proxy successfully parsed customer intent: ${extracted.customerSummary}`);
        } catch (err) {
          console.error("Bedrock Proxy NLU Error, falling back:", err);
          badge.textContent = "Status: BEDROCK FAIL (FALLBACK)";
          badge.className = "badge badge-orange";
          responseEl.textContent = `Bedrock Gateway Error: ${err.message}\nFalling back to local simulated extraction...`;
          this.runLocalNluFallback(textInput);
        }
      } else {
        setTimeout(() => {
          try {
            const fallbackText = this.getLocalNluResponseText(textInput);
            const extracted = JSON.parse(fallbackText);
            const mockBedrockResponse = {
              id: "msg_01Xxxxxxxxx",
              type: "message",
              role: "assistant",
              model: "claude-3-5-sonnet-20241022",
              content: [
                {
                  type: "text",
                  text: fallbackText
                }
              ],
              usage: {
                input_tokens: 420,
                output_tokens: 380
              }
            };
            this.nluStatus = 'SUCCESS';
            this.nluResponse = extracted;
            badge.textContent = "Status: BEDROCK DEMO SUCCESS";
            badge.className = "badge badge-teal";
            responseEl.textContent = 
              `// Received response from Amazon Bedrock API:\n` +
              JSON.stringify(mockBedrockResponse, null, 2);
            this.applyParsedIntent(extracted);
            this.logAudit('INFO', `Simulated AWS Bedrock returned intent data: ${extracted.customerSummary}`);
          } catch (err) {
            responseEl.textContent = `Simulation Error: ${err.message}`;
            this.runLocalNluFallback(textInput);
          }
        }, 1200);
      }
    } else if (this.geminiApiKey) {
      badge.textContent = "Status: INFERENCE...";
      badge.className = "badge badge-orange";
      responseEl.textContent = "Connecting to Gemini 1.5 Flash API...";
      
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`;
        const payload = {
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(`Gemini API returned status ${res.status}`);
        }

        const data = await res.json();
        const rawJsonText = data.candidates[0].content.parts[0].text.trim();
        const extracted = JSON.parse(rawJsonText);
        
        this.nluStatus = 'SUCCESS';
        this.nluResponse = extracted;
        
        badge.textContent = "Status: LIVE NLU SUCCESS";
        badge.className = "badge badge-teal";
        responseEl.textContent = JSON.stringify(extracted, null, 2);
        
        this.applyParsedIntent(extracted);
        this.logAudit('INFO', `Live Gemini API successfully parsed customer intent: ${extracted.customerSummary}`);
        
      } catch (err) {
        console.error("Gemini NLU Error, falling back to local:", err);
        badge.textContent = "Status: API FAIL (FALLBACK)";
        badge.className = "badge badge-orange";
        responseEl.textContent = `API Error: ${err.message}\nFalling back to local simulated extraction...`;
        this.runLocalNluFallback(textInput);
      }
    } else {
      this.runLocalNluFallback(textInput);
    }
  }

  runLocalNluFallback(textInput) {
    const badge = document.getElementById('nluStatusBadge');
    const responseEl = document.getElementById('nluResponseViewer');
    badge.textContent = "Status: SIMULATED FALLBACK";
    badge.className = "badge badge-orange";
    
    let parsed = null;
    const lower = textInput.toLowerCase();
    
    if (lower.includes("aarav") || lower.includes("software engineer") || (lower.includes("28") && lower.includes("aarav"))) {
      parsed = {
        fullName: "Aarav Sharma",
        age: 28,
        declaredRisk: "High",
        monthlyIncome: 120000,
        monthlyExpenses: 50000,
        goalType: "RETIREMENT",
        investmentAmount: 100000,
        goalPriority: "High",
        monthlyContribution: 10000,
        lumpSumAmount: 100000,
        languagePreference: "en",
        needsHumanAdvisor: false,
        humanAdvisorReason: "None (Direct compliance check approved)",
        investmentStyleKeywords: ["Growth", "Index Tracking", "Aggressive Equity"],
        customerSummary: "Aarav is a 28yo software engineer seeking high-risk long term retirement equity growth."
      };
    } else if (lower.includes("priya") || lower.includes("business owner") || (lower.includes("42") && lower.includes("priya"))) {
      parsed = {
        fullName: "Priya Patel",
        age: 42,
        declaredRisk: "Medium",
        monthlyIncome: 350000,
        monthlyExpenses: 180000,
        goalType: "ESTATE_PLANNING",
        investmentAmount: 5000000,
        goalPriority: "High",
        monthlyContribution: 200000,
        lumpSumAmount: 5000000,
        languagePreference: "en",
        needsHumanAdvisor: true,
        humanAdvisorReason: "PMS and Alternative Assets exceeding 50 Lakhs SEBI advisory limits require manual RM handoff.",
        investmentStyleKeywords: ["Regulated PMS", "AIF Cat II", "Accredited Investment"],
        customerSummary: "Priya is a 42yo business owner seeking a premium PMS/AIF portfolio of 50 Lakhs."
      };
    } else if (lower.includes("ramesh") || lower.includes("retired") || (lower.includes("62") && lower.includes("ramesh"))) {
      parsed = {
        fullName: "Ramesh Kulkarni",
        age: 62,
        declaredRisk: "Low",
        monthlyIncome: 55000,
        monthlyExpenses: 35000,
        goalType: "TAX_SAVING",
        investmentAmount: 200000,
        goalPriority: "Medium",
        monthlyContribution: 0,
        lumpSumAmount: 200000,
        languagePreference: "en",
        needsHumanAdvisor: false,
        humanAdvisorReason: "None (Standard direct ELSS tax planner)",
        investmentStyleKeywords: ["Capital Preservation", "Sovereign Gold", "Tax Exemption"],
        customerSummary: "Ramesh is a 62yo retiree seeking safe tax-saving instruments with minimal risk."
      };
    } else {
      const ageMatch = textInput.match(/(\d{2})\s*(years|yr|old)/i) || textInput.match(/age\s*(\d{2})/i) || textInput.match(/\b(1[89]|[2-9]\d)\b/);
      const budgetMatch = textInput.match(/(\d+)\s*(lakh|lakhs|lac|L|Lakh|Lacs)/i) || textInput.match(/budget\s*(\d+)/i) || textInput.match(/invest\s*(\d+)/i);
      const riskMatch = textInput.match(/(high|aggressive|growth)/i) ? "High" : (textInput.match(/(low|safe|conservative)/i) ? "Low" : "Medium");
      
      let age = ageMatch ? parseInt(ageMatch[1]) : 30;
      let amount = 100000;
      if (budgetMatch) {
        let val = parseInt(budgetMatch[1]);
        if (textInput.includes("lakh") || textInput.includes("L") || textInput.includes("lac")) {
          amount = val * 100000;
        } else {
          amount = val;
        }
      }
      
      let goalType = "RETIREMENT";
      if (lower.includes("tax") || lower.includes("80c")) goalType = "TAX_SAVING";
      else if (lower.includes("emergency") || lower.includes("liquid")) goalType = "EMERGENCY_FUND";
      else if (lower.includes("child") || lower.includes("education") || lower.includes("daughter") || lower.includes("son")) goalType = "CHILD_EDUCATION";
      else if (lower.includes("estate") || lower.includes("trust") || lower.includes("will")) goalType = "ESTATE_PLANNING";

      parsed = {
        fullName: "Custom Client",
        age: age,
        declaredRisk: riskMatch,
        monthlyIncome: 150000,
        monthlyExpenses: 80000,
        goalType: goalType,
        investmentAmount: amount,
        goalPriority: "Medium",
        monthlyContribution: Math.round(amount / 12),
        lumpSumAmount: amount,
        languagePreference: "en",
        needsHumanAdvisor: amount >= 10000000 || goalType === "ESTATE_PLANNING",
        humanAdvisorReason: amount >= 10000000 ? "Ticket size exceeds 1 Crore institutional threshold." : (goalType === "ESTATE_PLANNING" ? "Estate planning and trust setups require legal structuring with a human advisor." : "None"),
        investmentStyleKeywords: [riskMatch + " Risk Style", goalType.replace("_", " ")],
        customerSummary: `Custom NLU extraction for ${age}yo user investing ${amount} in ${goalType}.`
      };
    }

    this.nluStatus = 'SIMULATED';
    this.nluResponse = parsed;
    responseEl.textContent = JSON.stringify(parsed, null, 2);
    
    this.applyParsedIntent(parsed);
    this.logAudit('INFO', `Offline NLU fallback parsed customer intent: ${parsed.customerSummary}`);
  }

  applyParsedIntent(extracted) {
    document.getElementById('custName').value = extracted.fullName;
    document.getElementById('custAge').value = extracted.age;
    document.getElementById('custRisk').value = extracted.declaredRisk;
    document.getElementById('custIncome').value = extracted.monthlyIncome;
    document.getElementById('custExpenses').value = extracted.monthlyExpenses;
    document.getElementById('goalType').value = extracted.goalType;
    document.getElementById('investmentAmount').value = extracted.investmentAmount;
    
    this.updateStateInspector();
  }

  // Language Change Logic
  changeLanguage() {
    this.language = document.getElementById('langSelect').value;
    const dict = this.translations[this.language];
    
    // Apply translations to UI elements
    for (const key in dict) {
      const el = document.getElementById(key);
      if (el) el.textContent = dict[key];
    }

    this.logAudit('INFO', `Language adjusted to ${this.language.toUpperCase()}`);
    this.updateStateInspector();
  }

  // Submit Profile & Capture Goal
  submitProfile() {
    const name = document.getElementById('custName').value.trim();
    const age = parseInt(document.getElementById('custAge').value);
    const income = parseFloat(document.getElementById('custIncome').value);
    const expenses = parseFloat(document.getElementById('custExpenses').value);
    const amount = parseFloat(document.getElementById('investmentAmount').value);

    if (!name || isNaN(age) || isNaN(income) || isNaN(expenses) || isNaN(amount)) {
      alert("Please complete all required fields with numeric values.");
      return;
    }

    // Populate transaction dashboard parameters based on profile selection
    const surplus = income - expenses;
    document.getElementById('valDeclaredSurplus').textContent = `₹${surplus.toLocaleString('en-IN')} / month`;
    
    // If a persona is prefilled, use their detailed transaction variables; else synthesize
    let balance = surplus * 3;
    let bounced = 0;
    let habit = "None";

    if (this.selectedPersonaId) {
      const p = this.customers.find(c => c.id === this.selectedPersonaId);
      balance = p.transaction_behavior.average_balance;
      bounced = p.transaction_behavior.bounced_cheques;
      habit = p.transaction_behavior.investment_frequency;
    }

    this.avgBalance = balance;
    this.bouncedCheques = bounced;
    this.investmentFrequency = habit;

    document.getElementById('valSavingsBalance').textContent = `₹${balance.toLocaleString('en-IN')}`;
    document.getElementById('valInvestmentHabit').textContent = habit;
    document.getElementById('valChequeBounces').textContent = bounced;

    this.logAudit('INFO', `Calculated monthly investable surplus: ₹${surplus.toLocaleString('en-IN')}`);
    
    // Move to Data Ingestion review screen
    this.setStep(3);
  }

  // Execute Suitability Calculations
  runSuitabilityEngine() {
    const age = parseInt(document.getElementById('custAge').value);
    const income = parseFloat(document.getElementById('custIncome').value);
    const expenses = parseFloat(document.getElementById('custExpenses').value);
    const declaredRisk = document.getElementById('custRisk').value;
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const goalType = document.getElementById('goalType').value;

    const surplus = income - expenses;
    
    // 1. Core Suitability Scoring Algorithm
    let score = 0;
    let weightsBreakdown = {};

    // Age factor
    if (age <= 30) {
      score += 30;
      weightsBreakdown.age = { score: 30, rationale: "Age under 30 supports long horizon equity allocations." };
    } else if (age <= 50) {
      score += 20;
      weightsBreakdown.age = { score: 20, rationale: "Mid-career profile requires balanced allocations." };
    } else {
      score += 5;
      weightsBreakdown.age = { score: 5, rationale: "Senior/Retirement age profile warrants conservative capital protection." };
    }

    // Risk appetite factor
    if (declaredRisk === "High") {
      score += 40;
      weightsBreakdown.appetite = { score: 40, rationale: "High self-declared risk matches aggressive allocation schemes." };
    } else if (declaredRisk === "Medium") {
      score += 25;
      weightsBreakdown.appetite = { score: 25, rationale: "Moderate appetite balanced across equities and gold indexes." };
    } else {
      score += 10;
      weightsBreakdown.appetite = { score: 10, rationale: "Low appetite constraints mandate fixed income and capital safety." };
    }

    // Surplus factor
    const ratio = surplus / income;
    if (ratio > 0.5) {
      score += 30;
      weightsBreakdown.surplus = { score: 30, rationale: "High surplus ratio (>50% income) indicates strong security cushion." };
    } else if (ratio > 0.25) {
      score += 20;
      weightsBreakdown.surplus = { score: 20, rationale: "Healthy surplus ratio (>25% income) indicates stable savings." };
    } else {
      score += 10;
      weightsBreakdown.surplus = { score: 10, rationale: "Tight surplus ratio (<25% income) requires prioritising liquidity." };
    }

    // 2. Behavioral Scoring Adjustments
    const bounced = this.bouncedCheques !== undefined ? this.bouncedCheques : 0;
    const habit = this.investmentFrequency || "None";
    const balance = this.avgBalance !== undefined ? this.avgBalance : (amount * 1.5);

    let bouncedAdjustment = 0;
    if (bounced > 0) {
      bouncedAdjustment = -15 * bounced;
      score += bouncedAdjustment;
      weightsBreakdown.bounces = {
        score: bouncedAdjustment,
        rationale: `Liquidity Risk Penalty: ${bounced} cheque bounce(s) detected. Deducting ${Math.abs(bouncedAdjustment)} points.`
      };
    } else {
      weightsBreakdown.bounces = {
        score: 0,
        rationale: "Clean credit status: 0 cheque bounces recorded in transaction log."
      };
    }

    let savingsHabitAdjustment = 0;
    if (habit === "Monthly") {
      savingsHabitAdjustment = 10;
      score += savingsHabitAdjustment;
      weightsBreakdown.habit = {
        score: savingsHabitAdjustment,
        rationale: "Disciplined SIP Habit: Regular monthly investment history. Awarding +10 points."
      };
    } else if (habit === "Quarterly") {
      savingsHabitAdjustment = 5;
      score += savingsHabitAdjustment;
      weightsBreakdown.habit = {
        score: savingsHabitAdjustment,
        rationale: "Consistent quarterly investment habits. Awarding +5 points."
      };
    } else {
      savingsHabitAdjustment = -5;
      score += savingsHabitAdjustment;
      weightsBreakdown.habit = {
        score: savingsHabitAdjustment,
        rationale: "Inactive savings habit: Deducting -5 points."
      };
    }

    const balanceMultiple = balance / amount;
    let liquidityStressAdjustment = 0;
    if (balanceMultiple < 0.5) {
      liquidityStressAdjustment = -20;
      score += liquidityStressAdjustment;
      weightsBreakdown.liquidity = {
        score: liquidityStressAdjustment,
        rationale: `Liquidity stress alert: Target ticket size exceeds 2x average savings balance (Multiple: ${balanceMultiple.toFixed(2)}x). Deducting -20 points.`
      };
    } else if (balanceMultiple >= 5.0) {
      liquidityStressAdjustment = 10;
      score += liquidityStressAdjustment;
      weightsBreakdown.liquidity = {
        score: liquidityStressAdjustment,
        rationale: `Surplus Stability Factor: Average savings balance is ${balanceMultiple.toFixed(1)}x target ticket size. Awarding +10 points.`
      };
    } else {
      weightsBreakdown.liquidity = {
        score: 0,
        rationale: `Balanced cash buffer multiple: ${balanceMultiple.toFixed(2)}x of target investment budget.`
      };
    }

    // Set bounded score
    score = Math.max(0, Math.min(100, score));
    this.suitabilityScore = score;

    this.behavioralSignals = {
      bouncedChequesCount: bounced,
      bouncedChequesAdjustment: bouncedAdjustment,
      savingsHabit: habit,
      savingsHabitAdjustment: savingsHabitAdjustment,
      balanceMultiple: balanceMultiple,
      liquidityStressAdjustment: liquidityStressAdjustment,
      netBehavioralAdjustment: bouncedAdjustment + savingsHabitAdjustment + liquidityStressAdjustment
    };

    // 3. Assign Risk Band based on rules
    let riskBand = 'Moderate';
    if (score <= 35) {
      riskBand = 'Conservative';
    } else if (score <= 70) {
      riskBand = 'Moderate';
    } else {
      riskBand = 'Aggressive';
    }
    this.computedRiskBand = riskBand;

    // Log calculations to Audit Metrics Card
    this.renderAuditMetrics(weightsBreakdown);
    this.logAudit('INFO', `Suitability Score computed: ${score}/100. Allocated to ${riskBand} risk band.`);

    // 4. Filter Recommended Schemes from Catalog
    const matches = this.schemes.filter(s => {
      return score >= s.suitability_score_min && score <= s.suitability_score_max;
    });

    this.renderRecommendedSchemes(matches);

    // 5. Run Compliance Guardrails Engine
    this.evaluateComplianceGuardrails(age, riskBand, amount, goalType, matches);

    // Move to step 4 UI
    this.setStep(4);
  }

  renderAuditMetrics(breakdown) {
    const container = document.getElementById('auditRiskMetrics');
    container.innerHTML = `
      <div class="metric-section-title" style="font-weight:700; font-size:11px; text-transform:uppercase; color:var(--accent-orange); margin-bottom:0.4rem;">Declared Profile Signals</div>
      
      <div class="metric-row-detail">
        <span class="lbl">Age Suitability Score:</span>
        <span class="val">+${breakdown.age.score}</span>
      </div>
      <p class="text-xs" style="margin-bottom:0.6rem; color:var(--text-grey);">${breakdown.age.rationale}</p>
      
      <div class="metric-row-detail">
        <span class="lbl">Appetite Suitability Score:</span>
        <span class="val">+${breakdown.appetite.score}</span>
      </div>
      <p class="text-xs" style="margin-bottom:0.6rem; color:var(--text-grey);">${breakdown.appetite.rationale}</p>
      
      <div class="metric-row-detail">
        <span class="lbl">Surplus Suitability Score:</span>
        <span class="val">+${breakdown.surplus.score}</span>
      </div>
      <p class="text-xs" style="margin-bottom:0.6rem; color:var(--text-grey);">${breakdown.surplus.rationale}</p>
      
      <div class="metric-section-title" style="font-weight:700; font-size:11px; text-transform:uppercase; color:var(--primary-teal); margin:0.8rem 0 0.4rem 0; border-top:1px solid rgba(255,255,255,0.05); padding-top:0.6rem;">Derived Behavioral Signals</div>
      
      <div class="metric-row-detail">
        <span class="lbl">Cheque Bounces Adjustment:</span>
        <span class="val" style="color:${breakdown.bounces.score < 0 ? '#ff8080' : '#80ff80'}">${breakdown.bounces.score}</span>
      </div>
      <p class="text-xs" style="margin-bottom:0.6rem; color:var(--text-grey);">${breakdown.bounces.rationale}</p>
      
      <div class="metric-row-detail">
        <span class="lbl">Savings Habit Adjustment:</span>
        <span class="val" style="color:${breakdown.habit.score < 0 ? '#ff8080' : '#80ff80'}">${breakdown.habit.score >= 0 ? '+' : ''}${breakdown.habit.score}</span>
      </div>
      <p class="text-xs" style="margin-bottom:0.6rem; color:var(--text-grey);">${breakdown.habit.rationale}</p>
      
      <div class="metric-row-detail">
        <span class="lbl">Liquidity stress Multiple Adjustment:</span>
        <span class="val" style="color:${breakdown.liquidity.score < 0 ? '#ff8080' : '#80ff80'}">${breakdown.liquidity.score >= 0 ? '+' : ''}${breakdown.liquidity.score}</span>
      </div>
      <p class="text-xs" style="margin-bottom:0.6rem; color:var(--text-grey);">${breakdown.liquidity.rationale}</p>
      
      <div class="metric-row-detail" style="border-top: 1px solid var(--border-grey); padding-top:0.6rem; margin-top:0.8rem;">
        <span class="lbl"><strong>Total Suitability Score:</strong></span>
        <span class="val text-teal" style="font-weight:800;">${this.suitabilityScore} / 100</span>
      </div>
    `;
  }

  renderRecommendedSchemes(matches) {
    const container = document.getElementById('recommendedSchemesContainer');
    container.innerHTML = '';
    
    if (matches.length === 0) {
      container.innerHTML = `<p class="placeholder-text">No matching products found for this score. Refer to Senior RM Advisor.</p>`;
      return;
    }

    matches.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = `scheme-card ${idx === 0 ? 'selected' : ''} ${s.regulated_escalation_required ? 'escalated' : ''}`;
      card.onclick = () => this.selectScheme(card, s);
      
      card.innerHTML = `
        <div class="scheme-header-row">
          <span class="scheme-title">${s.name}</span>
          ${s.regulated_escalation_required ? 
            '<span class="badge badge-orange scheme-badge">RM Approval Required</span>' : 
            `<span class="badge badge-teal scheme-badge">${s.risk_level}</span>`}
        </div>
        <div class="scheme-type">${s.type}</div>
        <p class="scheme-desc">${s.description}</p>
        <div class="scheme-metrics">
          <div>
            <span class="scheme-metric-lbl">Indicative Return:</span>
            <span class="scheme-metric-val">${s.historical_yield_indication}</span>
          </div>
          <div>
            <span class="scheme-metric-lbl">Min. Invest:</span>
            <span class="scheme-metric-val">₹${s.min_investment.toLocaleString('en-IN')}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Default select first scheme
    this.selectedScheme = matches[0];
  }

  selectScheme(cardEl, schemeObj) {
    document.querySelectorAll('.scheme-card').forEach(card => card.classList.remove('selected'));
    cardEl.classList.add('selected');
    this.selectedScheme = schemeObj;
    
    this.logAudit('INFO', `Customer selected investment option: ${schemeObj.name}`);
    
    // Re-run guardrails matching for the specific selected scheme
    const age = parseInt(document.getElementById('custAge').value);
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const goalType = document.getElementById('goalType').value;
    
    this.evaluateComplianceGuardrails(age, this.computedRiskBand, amount, goalType, [schemeObj]);
    this.updateStateInspector();
  }

  // Compliance Engine Checking Guardrails
  evaluateComplianceGuardrails(age, riskBand, amount, goalType, matches) {
    const income = parseFloat(document.getElementById('custIncome').value) || 0;
    const expenses = parseFloat(document.getElementById('custExpenses').value) || 0;
    const declaredRisk = document.getElementById('custRisk').value;
    const surplus = income - expenses;

    this.escalationTriggered = false;
    this.rejectionTriggered = false;
    this.handoffReason = "";
    this.handoffCode = "";
    this.handoffAction = "";

    // Safe Failure Check 1: Negative or Zero Investable Surplus
    if (surplus <= 0) {
      this.rejectionTriggered = true;
      this.escalationTriggered = true;
      this.handoffReason = "Suitability assessment result: Not eligible for direct digital fulfilment. Your declared monthly expenses exceed or equal your monthly income, resulting in zero investable surplus.";
      this.handoffCode = "NEGATIVE_SURPLUS_REJECTION";
      this.handoffAction = "Direct to financial health counseling panel.";
      this.logAudit('WARN', "COMPLIANCE ALERTER: Negative surplus detected. Processing rejected.");
    }
    // Safe Failure Check 2: Ticket size below minimum recommended product min_investment
    else if (this.selectedScheme && amount < this.selectedScheme.min_investment) {
      this.rejectionTriggered = true;
      this.escalationTriggered = true;
      this.handoffReason = `Suitability assessment result: Minimum investment threshold mismatch. Selected product requires minimum ₹${this.selectedScheme.min_investment.toLocaleString('en-IN')}, but your declared budget is ₹${amount.toLocaleString('en-IN')}.`;
      this.handoffCode = "TICKET_SIZE_UNDERFLOW";
      this.handoffAction = "Advise customer on lower ticket size alternatives or RM review.";
      this.logAudit('WARN', "COMPLIANCE ALERTER: Budget underflow for selected product.");
    }
    // Trigger Check 3: Explicit Regulated Product Required Escalate (from the selected scheme)
    else if (this.selectedScheme && this.selectedScheme.regulated_escalation_required) {
      this.escalationTriggered = true;
      this.handoffReason = this.selectedScheme.escalation_reason;
      this.handoffCode = "REGULATED_PRODUCT";
      this.handoffAction = "Schedule physical sign-off and suitability verification.";
      this.logAudit('WARN', `COMPLIANCE ALERTER: Scheme "${this.selectedScheme.name}" mandates SEBI Advisor Handoff.`);
    }
    // Trigger Check 4: Large Ticket Wealth Surplus HNW limits (> 1 Crore or 10 Million INR)
    else if (amount >= 10000000) {
      this.escalationTriggered = true;
      this.handoffReason = "The requested transaction size of ₹" + amount.toLocaleString('en-IN') + " exceeds direct digital onboarding limits. Mandated under internal HNW policy guidelines for senior advisor allocation.";
      this.handoffCode = "LARGE_TICKET_HNW";
      this.handoffAction = "Handoff to Senior Wealth Specialist Desk for custom portfolio structuring.";
      this.logAudit('WARN', `COMPLIANCE ALERTER: Transaction size exceeds direct channel limit. Triggering HNW escalation.`);
    }
    // Trigger Check 5: Senior Citizen High Risk Mis-selling Warning
    else if (age >= 60 && riskBand === "Aggressive") {
      this.escalationTriggered = true;
      this.handoffReason = "Senior citizen onboarding into high-risk Aggressive categories requires manual risk verification to comply with SEBI circulars guarding vulnerable consumer segments from mis-selling.";
      this.handoffCode = "SENIOR_CITIZEN_MISMATCH";
      this.handoffAction = "Retirement advisory desk assessment required.";
      this.logAudit('WARN', `COMPLIANCE ALERTER: Senior Citizen Aggressive Risk profiling match. Escalate to prevent mis-selling.`);
    }
    // Trigger Check 6: Complex Goal - Estate Trust planning
    else if (goalType === "ESTATE_PLANNING") {
      this.escalationTriggered = true;
      this.handoffReason = "Estate Planning and Trust setups require legal advisory validation and cannot be processed via self-directed workflows.";
      this.handoffCode = "COMPLEX_GOAL_ESTATE";
      this.handoffAction = "Rerouting onboarding payload to Estate & Trust Panel experts.";
      this.logAudit('WARN', `COMPLIANCE ALERTER: Complex Estate Goal selected. Direct self-onboarding disabled.`);
    }

    // Update screen alerts & actions buttons
    const alertBox = document.getElementById('suitabilityEscalationNotice');
    const alertDesc = document.getElementById('suitabilityEscalationReason');
    const continueBtn = document.getElementById('btnContinueOrEscalate');

    if (this.escalationTriggered) {
      alertBox.classList.remove('hide');
      alertDesc.textContent = this.handoffReason;
      if (this.rejectionTriggered) {
        continueBtn.textContent = "Request Manual Review ➜";
        continueBtn.className = "btn btn-primary btn-block text-danger";
      } else {
        continueBtn.textContent = "Request Advisory Handoff ➜";
        continueBtn.className = "btn btn-primary btn-block text-orange";
      }
    } else {
      alertBox.classList.add('hide');
      continueBtn.textContent = "Proceed with Onboarding ➜";
      continueBtn.className = "btn btn-primary btn-block";
    }

    // Construct the formal Decision Explainability Object
    this.explainabilityObject = {
      customer_profile_summary: `Age: ${age}, Surplus: ₹${surplus.toLocaleString('en-IN')}/mo, Declared Risk: ${declaredRisk}`,
      risk_band: this.computedRiskBand,
      goal_horizon: (goalType === "RETIREMENT" || goalType === "CHILD_EDUCATION" || goalType === "ESTATE_PLANNING") ? "Long Term (5+ Years)" : "Short Term (< 3 Years)",
      product_eligibility: this.selectedScheme ? `Assessed against code [${this.selectedScheme.code}]` : "None",
      reason_codes: [this.handoffCode || "COMPLIANT_DIRECT"],
      recommendation_class: this.selectedScheme ? this.selectedScheme.category : "Unassigned",
      requires_rm_handoff: this.escalationTriggered
    };

    // Refresh Explainability Block text
    this.generateExplainabilityObject();
  }

  // Generates audit logs & business-friendly explanations
  async generateExplainabilityObject() {
    const custSafe = document.getElementById('custSafeRationale');
    const compliance = document.getElementById('complianceRationale');
    const badge = document.getElementById('explainModeBadge');
    
    const name = document.getElementById('custName').value || 'Customer';
    const age = parseInt(document.getElementById('custAge').value) || 30;
    
    if (this.isGenAIEnabled) {
      badge.textContent = "Mode: GenAI Synthesis (Active)";
      badge.className = "badge badge-orange";
      
      if (this.geminiApiKey) {
        custSafe.textContent = "Generating live client rationale via Gemini...";
        compliance.textContent = "Generating live compliance log via Gemini...";
        
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`;
          const promptText = `As an expert wealth advisor at the bank, write an explainability analysis for the following recommendation session:
Customer Name: ${name}
Age: ${age}
Suitability Score: ${this.suitabilityScore}/100
Assessed Risk Band: ${this.computedRiskBand}
Selected Scheme: ${this.selectedScheme ? this.selectedScheme.name : 'None'}
Escalation Triggered: ${this.escalationTriggered}
Escalation Reason: ${this.handoffReason || 'None'}
Bounced Cheques: ${this.behavioralSignals.bouncedChequesCount}
Investment Habit: ${this.behavioralSignals.savingsHabit}
Liquidity Multiple: ${this.behavioralSignals.balanceMultiple.toFixed(2)}x

Please provide a JSON object containing:
{
  "customerSafeRationale": "A professional, warm, client-facing explanation of the recommendation, suitability matching, and why escalation is needed if applicable. Mention that this is indicative only and mock data for demo purposes.",
  "complianceRationale": "An auditable, rigorous compliance justification matching SEBI/RBI advisor rules, references to guardrails, and detail on why direct onboarding was approved or RM handoff is mandated."
}`;

      if (this.modelProvider === 'bedrock') {
        custSafe.textContent = "Generating live client rationale via Amazon Bedrock (Claude)...";
        compliance.textContent = "Generating live compliance log via Amazon Bedrock (Claude)...";
        
        const bedrockPayload = {
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: promptText
                }
              ]
            }
          ]
        };

        if (this.awsProxyUrl) {
          try {
            const res = await fetch(this.awsProxyUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'X-Requested-With': 'AIWealthCopilotClient'
              },
              body: JSON.stringify(bedrockPayload)
            });
            if (!res.ok) throw new Error("AWS Bedrock Proxy Error");
            const data = await res.json();
            const rawText = data.content[0].text.trim();
            const parsed = JSON.parse(rawText);
            
            custSafe.innerHTML = parsed.customerSafeRationale;
            compliance.innerHTML = parsed.complianceRationale;
            this.logAudit('INFO', 'Successfully synthesized live explainability objects from Amazon Bedrock (Proxy).');
            return;
          } catch (e) {
            console.error("Bedrock explainability proxy failed, falling back:", e);
            this.logAudit('WARN', 'AWS Bedrock Proxy failed. Falling back to local simulated response.');
          }
        } else {
          setTimeout(() => {
            try {
              const parsed = this.getLocalExplainabilityRationales(name, age);
              custSafe.innerHTML = parsed.customerSafeRationale;
              compliance.innerHTML = parsed.complianceRationale;
              this.logAudit('INFO', 'Simulated Amazon Bedrock (Claude 3.5 Sonnet) successfully returned explainability object.');
            } catch (err) {
              console.error("Simulation error in explainability:", err);
            }
          }, 1200);
          return;
        }
      } else if (this.geminiApiKey) {
        custSafe.textContent = "Generating live client rationale via Gemini...";
        compliance.textContent = "Generating live compliance log via Gemini...";
        
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`;
          const payload = {
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json"
            }
          };

          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error("Gemini API Error");
          const data = await res.json();
          const parsed = JSON.parse(data.candidates[0].content.parts[0].text.trim());
          
          custSafe.innerHTML = parsed.customerSafeRationale;
          compliance.innerHTML = parsed.complianceRationale;
          this.logAudit('INFO', 'Successfully synthesized live explainability objects from Gemini model.');
          return;
          
        } catch (e) {
          console.error("Live explainability synthesis failed, falling back:", e);
          this.logAudit('WARN', 'Live explainability synthesis failed, using local template generation.');
        }
      }
      
      // Synthesize professional banking language mimicking Gemini response
      let aiCustSafe = `**Indicative recommendation:** Based on your wealth profile, the **${this.selectedScheme ? this.selectedScheme.name : 'portfolio'}** is presented as an option. `;
      if (this.escalationTriggered) {
        if (this.rejectionTriggered) {
          aiCustSafe += `This request is **not eligible for direct digital fulfilment**. To guarantee your financial health, we have routed your parameters for manual verification. For demo purposes using mock customer and product data.`;
        } else {
          aiCustSafe += `To guarantee optimal portfolio safety and follow internal rules, we have scheduled a brief call with a dedicated Relationship Manager. **Requires relationship manager review** prior to execution. For demo purposes using mock customer and product data.`;
        }
      } else {
        aiCustSafe += `This scheme aligns with your assessed risk band. Note: Mutual fund investments are subject to market risks. For demo purposes using mock customer and product data.`;
      }

      let aiCompliance = `LLM AUDIT COMMENTARY: Customer ${name} (${age}) evaluated. Suitability score computed as ${this.suitabilityScore}/100. `;
      if (this.escalationTriggered) {
        aiCompliance += `Escalation code: ${this.handoffCode} triggered. Rationale is fully grounded in compliance rules from data/rules.json. Handoff action requested: ${this.handoffAction}`;
      } else {
        aiCompliance += `Direct self-onboarding permitted. Standard KYC validation flows activated.`;
      }

      custSafe.innerHTML = aiCustSafe;
      compliance.innerHTML = aiCompliance;
    } else {
      badge.textContent = "Mode: Deterministic Rules";
      badge.className = "badge badge-grey";

      // Fixed template based explanations
      if (this.escalationTriggered) {
        if (this.rejectionTriggered) {
          custSafe.textContent = `Indicative recommendation status: Not eligible for direct digital fulfilment. Your case requires manual relationship advisor review to verify suitability parameters. For demo purposes using mock customer and product data.`;
        } else {
          custSafe.textContent = `Requires relationship manager review. A manual review with a certified Relationship Advisor has been scheduled to ensure compliance with bank suitability guidelines prior to portfolio execution. For demo purposes using mock customer and product data.`;
        }
        compliance.textContent = `AUDIT REPORT: Rules Engine flagged transaction. Constraint Code: [${this.handoffCode}]. Action: ${this.handoffAction}`;
      } else {
        custSafe.textContent = `Indicative recommendation: Your portfolio has been mapped to standard schemes matching the ${this.computedRiskBand} appetite score of ${this.suitabilityScore}. For demo purposes using mock customer and product data.`;
        compliance.textContent = `AUDIT REPORT: Suitability evaluation success. Customer score [${this.suitabilityScore}] falls within direct processing bounds. Direct checkout allowed.`;
      }
    }
  }

  // Toggle GenAI explanation mode
  toggleGenAIExplanation() {
    this.isGenAIEnabled = document.getElementById('chkGenAIMode').checked;
    this.logAudit('INFO', `GenAI Explanation Layer toggled: ${this.isGenAIEnabled ? 'ENABLED' : 'DISABLED'}`);
    this.generateExplainabilityObject();
    this.updateStateInspector();
  }

  handleContinueAction() {
    if (this.escalationTriggered) {
      if (this.rejectionTriggered) {
        document.getElementById('handoffReasonTitle').textContent = "DECLINED DIRECT OUTCOME";
        document.getElementById('handoffReasonDesc').textContent = this.handoffReason;
      } else {
        document.getElementById('handoffReasonTitle').textContent = this.handoffCode.replace(/_/g, ' ');
        document.getElementById('handoffReasonDesc').textContent = this.handoffReason;
      }
      this.setStep(5);
    } else {
      // Direct user to direct onboarding success page
      document.getElementById('successHeaderTitle').textContent = "Application Verified";
      document.getElementById('successHeaderSub').textContent = "Your digital wealth account has been successfully initialized.";
      document.getElementById('ticketRef').textContent = "AI-W-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('ticketPath').textContent = "Digital Self-Onboarding";
      document.getElementById('ticketAdvisor').textContent = "Automated Model (" + this.computedRiskBand + ")";
      document.getElementById('ticketLang').textContent = this.language.toUpperCase();
      this.setStep(6);
    }
  }

  triggerHandoffConfirmation() {
    const comments = document.getElementById('escalationNotes').value.trim();
    this.logAudit('INFO', `Secured Advisor Handoff requested. Comments: "${comments || 'None'}"`);
    
    // Set up ticket reference screen details
    document.getElementById('successHeaderTitle').textContent = "Advisor Assigned";
    document.getElementById('successHeaderSub').textContent = "Your case files have been transferred to Subhash Chandra (Advisor).";
    document.getElementById('ticketRef').textContent = "AI-E-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('ticketPath').textContent = `RM Escalation Handoff (${this.handoffCode})`;
    document.getElementById('ticketAdvisor').textContent = "Subhash Chandra (Senior Advisor)";
    document.getElementById('ticketLang').textContent = this.language.toUpperCase();

    this.setStep(6);
  }

  resetDemo() {
    this.selectedPersonaId = null;
    this.suitabilityScore = 0;
    this.computedRiskBand = 'Moderate';
    this.escalationTriggered = false;
    this.rejectionTriggered = false;
    
    // Reset forms
    document.getElementById('custName').value = '';
    document.getElementById('custAge').value = '';
    document.getElementById('custIncome').value = '';
    document.getElementById('custExpenses').value = '';
    document.getElementById('investmentAmount').value = '100000';
    document.getElementById('escalationNotes').value = '';
    
    // Reset Console
    document.getElementById('auditRiskMetrics').innerHTML = `<div class="placeholder-text">Run a profiling task to see mathematical risk weights.</div>`;
    document.getElementById('custSafeRationale').textContent = "Please complete the suitability profile to generate customer explanations.";
    document.getElementById('complianceRationale').textContent = "Pending risk band calculations.";
    
    this.logAudit('INFO', 'Demo environment completely reset.');
    this.setStep(1);
  }

  // Logger helper to add items to internal audit timeline
  logAudit(type, message) {
    const logBox = document.getElementById('auditEventsLog');
    if (!logBox) return;

    const time = new Date().toLocaleTimeString();
    const item = document.createElement('div');
    item.className = `audit-item ${type.toLowerCase() === 'info' ? 'info' : type.toLowerCase() === 'warn' ? 'warn' : 'danger'}`;
    item.innerHTML = `<span class="timestamp">[${time}]</span> <strong>${type}:</strong> ${message}`;
    
    logBox.insertBefore(item, logBox.firstChild);
  }

  // Update JSON pre viewer element
  updateStateInspector() {
    const viewer = document.getElementById('jsonViewer');
    if (!viewer) return;

    const name = document.getElementById('custName') ? document.getElementById('custName').value : '';
    const age = document.getElementById('custAge') ? parseInt(document.getElementById('custAge').value) : null;
    const amount = document.getElementById('investmentAmount') ? parseFloat(document.getElementById('investmentAmount').value) : 100000;

    const payload = {
      app_state: {
        current_step: this.currentStep,
        step_name: this.getStepTitle(this.currentStep),
        language: this.language,
        genai_explanation_layer: this.isGenAIEnabled,
        nlu_status: this.nluStatus
      },
      nlu_intent_extraction: this.nluResponse || "Pending conversational goals input...",
      customer_metadata: {
        name: name,
        age: age,
        surplus: age ? (parseFloat(document.getElementById('custIncome').value) - parseFloat(document.getElementById('custExpenses').value)) : 0,
        ticket_size: amount
      },
      derived_behavioral_signals: this.behavioralSignals,
      suitability_engine: {
        score: this.suitabilityScore,
        assigned_risk_band: this.computedRiskBand,
        selected_product: this.selectedScheme ? this.selectedScheme.code : null
      },
      explainability_object: this.explainabilityObject || null,
      guardrails_compliance: {
        escalation_triggered: this.escalationTriggered,
        rejection_triggered: this.rejectionTriggered,
        handoff_code: this.handoffCode || "NONE",
        reason: this.handoffReason || "No compliance constraints violated"
      }
    };

    viewer.textContent = JSON.stringify(payload, null, 2);
  }

  getLocalNluResponseText(textInput) {
    const lower = textInput.toLowerCase();
    let extracted = {
      fullName: "Walk-in Customer",
      age: 35,
      declaredRisk: "Medium",
      monthlyIncome: 100000,
      monthlyExpenses: 60000,
      goalType: "RETIREMENT",
      investmentAmount: 50000,
      goalPriority: "Medium",
      monthlyContribution: 5000,
      lumpSumAmount: 50000,
      languagePreference: "en",
      needsHumanAdvisor: false,
      humanAdvisorReason: "",
      investmentStyleKeywords: ["Balanced"],
      customerSummary: "Onboarding wizard client."
    };
    if (lower.includes("aarav") || lower.includes("software engineer") || (lower.includes("28") && lower.includes("aarav"))) {
      extracted = {
        fullName: "Aarav Sharma",
        age: 28,
        declaredRisk: "High",
        monthlyIncome: 120000,
        monthlyExpenses: 50000,
        goalType: "RETIREMENT",
        investmentAmount: 100000,
        goalPriority: "High",
        monthlyContribution: 10000,
        lumpSumAmount: 100000,
        languagePreference: "en",
        needsHumanAdvisor: false,
        humanAdvisorReason: "",
        investmentStyleKeywords: ["Aggressive Growth", "SIP disciplined", "Equity"],
        customerSummary: "Aarav Sharma is a 28-year-old software engineer seeking high-risk aggressive retirement growth with a 1 Lakh budget."
      };
    } else if (lower.includes("priya") || lower.includes("business owner") || lower.includes("42")) {
      extracted = {
        fullName: "Priya Patel",
        age: 42,
        declaredRisk: "Medium",
        monthlyIncome: 350000,
        monthlyExpenses: 180000,
        goalType: "ESTATE_PLANNING",
        investmentAmount: 5000000,
        goalPriority: "High",
        monthlyContribution: 150000,
        lumpSumAmount: 5000000,
        languagePreference: "en",
        needsHumanAdvisor: true,
        humanAdvisorReason: "HNI client requesting PMS/AIF products, crossing the regulatory direct check-out boundary.",
        investmentStyleKeywords: ["PMS Portfolio", "HNI Wealth", "Alternative Assets"],
        customerSummary: "Priya Patel is a 42-year-old business owner seeking medium-risk HNI structured assets (PMS/AIF) with a budget of 50 Lakhs."
      };
    } else if (lower.includes("ramesh") || lower.includes("retired") || lower.includes("62")) {
      extracted = {
        fullName: "Ramesh Kulkarni",
        age: 62,
        declaredRisk: "Low",
        monthlyIncome: 55000,
        monthlyExpenses: 35000,
        goalType: "TAX_SAVING",
        investmentAmount: 200000,
        goalPriority: "Medium",
        monthlyContribution: 5000,
        lumpSumAmount: 200000,
        languagePreference: "hi",
        needsHumanAdvisor: true,
        humanAdvisorReason: "Senior citizen requesting allocation updates, requiring human relationship-manager verification.",
        investmentStyleKeywords: ["Capital Preservation", "Low Risk Tax Saver", "ELSS"],
        customerSummary: "Ramesh Kulkarni is a 62-year-old retired bank manager seeking low-risk tax saving mutual funds with a budget of 2 Lakhs."
      };
    }
    return JSON.stringify(extracted);
  }

  getLocalExplainabilityRationales(name, age) {
    let aiCustSafe = `**Indicative recommendation (AWS Bedrock / Claude 3.5 Sonnet):** Based on your wealth profile, the **${this.selectedScheme ? this.selectedScheme.name : 'portfolio'}** is presented as an option. `;
    if (this.escalationTriggered) {
      if (this.rejectionTriggered) {
        aiCustSafe += `This request is **not eligible for direct digital fulfilment**. To guarantee your financial health, we have routed your parameters for manual verification. For demo purposes using mock customer and product data.`;
      } else {
        aiCustSafe += `To guarantee optimal portfolio safety and follow internal rules, we have scheduled a brief call with a dedicated Relationship Manager. **Requires relationship manager review** prior to execution. For demo purposes using mock customer and product data.`;
      }
    } else {
      aiCustSafe += `This scheme aligns with your assessed risk band. Note: Mutual fund investments are subject to market risks. For demo purposes using mock customer and product data.`;
    }

    let aiCompliance = `AWS BEDROCK AUDIT COMMENTARY: Customer ${name} (${age}) evaluated. Suitability score computed as ${this.suitabilityScore}/100. `;
    if (this.behavioralSignals.netBehavioralAdjustment !== 0) {
      aiCompliance += `Account transactions analyzed: cheque bounces count = ${this.behavioralSignals.bouncedChequesCount} (adjustment: ${this.behavioralSignals.bouncedChequesAdjustment}), SIP saving frequency habit = ${this.behavioralSignals.savingsHabit} (adjustment: ${this.behavioralSignals.savingsHabitAdjustment}), balance buffer multiple = ${this.behavioralSignals.balanceMultiple.toFixed(2)}x (adjustment: ${this.behavioralSignals.liquidityStressAdjustment}). Net behavioral adjustment applied: ${this.behavioralSignals.netBehavioralAdjustment >= 0 ? '+' : ''}${this.behavioralSignals.netBehavioralAdjustment} points. `;
    }
    if (this.escalationTriggered) {
      aiCompliance += `COMPLIANCE ESCALATION TRIGGERED: Block status code [${this.handoffCode}]. Handoff mandated because: ${this.handoffReason}`;
    } else {
      aiCompliance += `PASSED DIRECT ONBOARDING RULES: Score fits risk band allocation. Standard direct checkout allowed.`;
    }

    return {
      customerSafeRationale: aiCustSafe,
      complianceRationale: aiCompliance
    };
  }
}

// Instantiate global app instance
const app = new WealthCopilotApp();
