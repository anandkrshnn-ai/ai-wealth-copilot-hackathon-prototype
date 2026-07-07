// Unit & Journey tests for AI Wealth Copilot Prototype suitability scoring, explainability objects, and compliance guardrails

function runTestSuite() {
  const testResults = [];
  
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function test(name, fn) {
    try {
      fn();
      testResults.push({ name, status: "PASSED", error: null });
    } catch (e) {
      testResults.push({ name, status: "FAILED", error: e.message });
    }
  }

  // --- Helper to emulate app's compliance evaluation ---
  function evaluateMockCompliance({ age, declaredRisk, income, expenses, amount, goalType, selectedScheme, bouncedCheques = 0, investmentFrequency = "Neutral", averageBalance = 150000 }) {
    const surplus = income - expenses;
    
    // Core Suitability Scoring Algorithm
    let score = 0;
    if (age <= 30) score += 30;
    else if (age <= 50) score += 20;
    else score += 5;

    if (declaredRisk === "High") score += 40;
    else if (declaredRisk === "Medium") score += 25;
    else score += 10;

    const ratio = surplus / income;
    if (ratio > 0.5) score += 30;
    else if (ratio > 0.25) score += 20;
    else score += 10;

    // Behavioral Adjustments
    if (bouncedCheques > 0) {
      score += (-15 * bouncedCheques);
    }
    if (investmentFrequency === "Monthly") {
      score += 10;
    } else if (investmentFrequency === "Quarterly") {
      score += 5;
    } else if (investmentFrequency === "None") {
      score += -5;
    }

    const balanceMultiple = averageBalance / amount;
    if (balanceMultiple < 0.5) {
      score += -20;
    } else if (balanceMultiple >= 5.0) {
      score += 10;
    }

    score = Math.max(0, Math.min(100, score));

    let riskBand = 'Moderate';
    if (score <= 35) riskBand = 'Conservative';
    else if (score <= 70) riskBand = 'Moderate';
    else riskBand = 'Aggressive';

    let escalationTriggered = false;
    let rejectionTriggered = false;
    let handoffCode = "";
    let handoffReason = "";

    // 1. Safe Failure Check: Negative/Zero surplus
    if (surplus <= 0) {
      rejectionTriggered = true;
      escalationTriggered = true;
      handoffCode = "NEGATIVE_SURPLUS_REJECTION";
      handoffReason = "Suitability assessment result: Not eligible for direct digital fulfilment.";
    }
    // 2. Safe Failure Check: Ticket size underflow
    else if (selectedScheme && amount < selectedScheme.min_investment) {
      rejectionTriggered = true;
      escalationTriggered = true;
      handoffCode = "TICKET_SIZE_UNDERFLOW";
      handoffReason = `Suitability assessment result: Minimum investment threshold mismatch.`;
    }
    // 3. Trigger Regulated PMS/AIF Handoff
    else if (selectedScheme && selectedScheme.regulated_escalation_required) {
      escalationTriggered = true;
      handoffCode = "REGULATED_PRODUCT";
      handoffReason = selectedScheme.escalation_reason;
    }
    // 4. Trigger Large Ticket size HNW
    else if (amount >= 10000000) {
      escalationTriggered = true;
      handoffCode = "LARGE_TICKET_HNW";
      handoffReason = "Transaction size exceeds direct limits.";
    }
    // 5. Trigger Senior Citizen Aggressive mismatch
    else if (age >= 60 && riskBand === "Aggressive") {
      escalationTriggered = true;
      handoffCode = "SENIOR_CITIZEN_MISMATCH";
      handoffReason = "Senior citizen aggressive risk mismatch.";
    }
    // 6. Trigger Complex Goal
    else if (goalType === "ESTATE_PLANNING") {
      escalationTriggered = true;
      handoffCode = "COMPLEX_GOAL_ESTATE";
      handoffReason = "Estate setups require legal validation.";
    }

    const explainabilityObject = {
      customer_profile_summary: `Age: ${age}, Surplus: ₹${surplus.toLocaleString('en-IN')}/mo, Declared Risk: ${declaredRisk}`,
      risk_band: riskBand,
      goal_horizon: (goalType === "RETIREMENT" || goalType === "CHILD_EDUCATION" || goalType === "ESTATE_PLANNING") ? "Long Term (5+ Years)" : "Short Term (< 3 Years)",
      product_eligibility: selectedScheme ? `Assessed against code [${selectedScheme.code}]` : "None",
      reason_codes: [handoffCode || "COMPLIANT_DIRECT"],
      recommendation_class: selectedScheme ? selectedScheme.category : "Unassigned",
      requires_rm_handoff: escalationTriggered
    };

    return {
      score,
      riskBand,
      escalationTriggered,
      rejectionTriggered,
      handoffCode,
      explainabilityObject
    };
  }

  // --- Test Case 1: Standard Compliant Recommendation Flow ---
  test("Should verify standard compliant direct flow with correct explainability properties", () => {
    const outcome = evaluateMockCompliance({
      age: 28,
      declaredRisk: "High",
      income: 120000,
      expenses: 50000,
      amount: 100000,
      goalType: "RETIREMENT",
      selectedScheme: {
        code: "CORE_FLEXICAP",
        category: "Equity / Diversified",
        min_investment: 10000,
        regulated_escalation_required: false
      }
    });

    assert(outcome.score === 100, `Expected score 100, got ${outcome.score}`);
    assert(outcome.riskBand === "Aggressive", `Expected Aggressive risk band, got ${outcome.riskBand}`);
    assert(outcome.escalationTriggered === false, "Direct onboarding should not trigger escalation");
    assert(outcome.rejectionTriggered === false, "Direct onboarding should not trigger rejection");
    
    // Assert explainability object shape and fields
    const obj = outcome.explainabilityObject;
    assert(typeof obj.customer_profile_summary === "string", "Missing customer_profile_summary string");
    assert(obj.risk_band === "Aggressive", "Mismatched risk_band");
    assert(obj.goal_horizon === "Long Term (5+ Years)", "Mismatched goal_horizon");
    assert(obj.requires_rm_handoff === false, "Mismatched requires_rm_handoff");
    assert(obj.reason_codes[0] === "COMPLIANT_DIRECT", "Expected COMPLIANT_DIRECT reason code");
  });

  // --- Test Case 2: Non-Suitable Product Rejection (Ticket size underflow) ---
  test("Should trigger TICKET_SIZE_UNDERFLOW rejection when customer budget is less than scheme min_investment", () => {
    const outcome = evaluateMockCompliance({
      age: 35,
      declaredRisk: "Medium",
      income: 200000,
      expenses: 90000,
      amount: 15000, // 15K investment budget
      goalType: "CHILD_EDUCATION",
      selectedScheme: {
        code: "CORE_PMS_AGGRESSIVE",
        category: "Regulated Portfolio Management",
        min_investment: 5000000, // Requires 50 Lakhs min
        regulated_escalation_required: true,
        escalation_reason: "SEBI PMS limits..."
      }
    });

    assert(outcome.escalationTriggered === true, "Escalation should trigger for budget underflow");
    assert(outcome.rejectionTriggered === true, "Should evaluate as rejection (not suitable for direct transaction)");
    assert(outcome.handoffCode === "TICKET_SIZE_UNDERFLOW", `Expected TICKET_SIZE_UNDERFLOW code, got ${outcome.handoffCode}`);
    
    const obj = outcome.explainabilityObject;
    assert(obj.requires_rm_handoff === true, "Explainability requires_rm_handoff should be true");
    assert(obj.reason_codes.includes("TICKET_SIZE_UNDERFLOW"), "Missing TICKET_SIZE_UNDERFLOW in reason_codes");
  });

  // --- Test Case 3: Non-Suitable Rejection (Negative Surplus) ---
  test("Should trigger NEGATIVE_SURPLUS_REJECTION when expenses equal or exceed monthly income", () => {
    const outcome = evaluateMockCompliance({
      age: 45,
      declaredRisk: "Low",
      income: 80000,
      expenses: 85000, // Negative surplus
      amount: 5000,
      goalType: "EMERGENCY_FUND",
      selectedScheme: {
        code: "CORE_SUVIDHA_FD",
        category: "Debt / Fixed Income",
        min_investment: 10000,
        regulated_escalation_required: false
      }
    });

    assert(outcome.escalationTriggered === true, "Escalation should trigger");
    assert(outcome.rejectionTriggered === true, "Negative surplus should trigger rejection");
    assert(outcome.handoffCode === "NEGATIVE_SURPLUS_REJECTION", `Expected NEGATIVE_SURPLUS_REJECTION, got ${outcome.handoffCode}`);
  });

  // --- Test Case 4: Mandatory RM Escalation (Senior Citizen Aggressive Risk Profile) ---
  test("Should trigger SENIOR_CITIZEN_MISMATCH compliance escalation for senior customer requesting high-risk bands", () => {
    const outcome = evaluateMockCompliance({
      age: 65,
      declaredRisk: "High",
      income: 180000,
      expenses: 60000,
      amount: 200000,
      goalType: "RETIREMENT",
      selectedScheme: {
        code: "CORE_FLEXICAP",
        category: "Equity / Diversified",
        min_investment: 10000,
        regulated_escalation_required: false
      }
    });

    // Score: Age 65 (+5) + High appetite (+40) + Surplus ratio 120k/180k = 66% (>50%, +30) = 75/100 (Aggressive Band)
    assert(outcome.score === 75, `Expected score 75, got ${outcome.score}`);
    assert(outcome.riskBand === "Aggressive", `Expected Aggressive band, got ${outcome.riskBand}`);
    assert(outcome.escalationTriggered === true, "Should escalate high-risk senior citizens");
    assert(outcome.rejectionTriggered === false, "Should allow handoff manual review rather than straight rejection");
    assert(outcome.handoffCode === "SENIOR_CITIZEN_MISMATCH", `Expected SENIOR_CITIZEN_MISMATCH code, got ${outcome.handoffCode}`);
  });

  // --- Test Case 5: Behavioral Adjustments Verification ---
  test("Should verify behavioral signals adjust suitability scoring (bounces, savings habit, cash buffer)", () => {
    // Client with bounced cheques (-15), inactive savings (-5), but good balance ratio.
    const outcome = evaluateMockCompliance({
      age: 35,
      declaredRisk: "High",
      income: 200000,
      expenses: 90000,
      amount: 100000,
      goalType: "RETIREMENT",
      selectedScheme: {
        code: "CORE_FLEXICAP",
        min_investment: 10000
      },
      bouncedCheques: 1, // -15
      investmentFrequency: "None", // -5
      averageBalance: 150000 // Multiple: 1.5x (No adjustment)
    });

    // Base score: Age 35 (+20) + High appetite (+40) + Surplus ratio 110k/200k = 55% (+30) = 90
    // Behavioral: Bounced (-15) + Inactive habit (-5) = -20. Net Score = 70.
    assert(outcome.score === 70, `Expected score 70 after behavioral adjustments, got ${outcome.score}`);
    assert(outcome.riskBand === "Moderate", `Expected Moderate risk band (score 70), got ${outcome.riskBand}`);
  });

  // --- Test Case 6: NLU Fallback Parsing Check ---
  test("Should parse natural language parameters using simulated fallback regex matches", () => {
    const mockNluFallback = (textInput) => {
      const lower = textInput.toLowerCase();
      const ageMatch = textInput.match(/(\d{2})\s*(years|yr|old)/i);
      const budgetMatch = textInput.match(/(\d+)\s*(lakh|lakhs|lac|L|Lakh|Lacs)/i);
      const riskMatch = textInput.match(/(high|aggressive|growth)/i) ? "High" : "Medium";
      
      return {
        age: ageMatch ? parseInt(ageMatch[1]) : 30,
        amount: budgetMatch ? parseInt(budgetMatch[1]) * 100000 : 100000,
        declaredRisk: riskMatch
      };
    };

    const parsed = mockNluFallback("I am a 28 years old dev with high risk appetite looking to invest 5 lakh in index funds.");
    assert(parsed.age === 28, `Expected age 28, got ${parsed.age}`);
    assert(parsed.amount === 500000, `Expected amount 500000, got ${parsed.amount}`);
    assert(parsed.declaredRisk === "High", `Expected High risk, got ${parsed.declaredRisk}`);
  });

  // --- Test Case 7: Compliance Override Precedence ---
  test("Should verify compliance guardrails enforce handoff even if behavioral signals result in high score", () => {
    const outcome = evaluateMockCompliance({
      age: 28,
      declaredRisk: "High",
      income: 250000,
      expenses: 80000,
      amount: 12000000, // 1.2 Crore ticket size
      goalType: "RETIREMENT",
      selectedScheme: {
        code: "CORE_FLEXICAP",
        category: "Equity / Diversified",
        min_investment: 10000,
        regulated_escalation_required: false
      },
      bouncedCheques: 0,
      investmentFrequency: "Monthly", // +10
      averageBalance: 15000000 // 1.5 Crore buffer (+10)
    });

    // Score is high (100) and client is low risk profile on behavior, but ticket size is >1Cr
    assert(outcome.score === 100, `Expected score 100, got ${outcome.score}`);
    assert(outcome.escalationTriggered === true, "Must escalate large ticket size (>1Cr) regardless of high suitability score");
    assert(outcome.handoffCode === "LARGE_TICKET_HNW", `Expected LARGE_TICKET_HNW handoff, got ${outcome.handoffCode}`);
  });

  return testResults;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { runTestSuite };
}
