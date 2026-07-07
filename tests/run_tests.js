// Simple Node.js test runner for AI Wealth Copilot Prototype
const { runTestSuite } = require('./suitability.test.js');

console.log("=================================================");
console.log("🏃 Running Suitability & Compliance Test Suite...");
console.log("=================================================");

try {
  const results = runTestSuite();
  let passedCount = 0;
  
  results.forEach(res => {
    if (res.status === "PASSED") {
      console.log(`✅ [PASS] ${res.name}`);
      passedCount++;
    } else {
      console.error(`❌ [FAIL] ${res.name}`);
      console.error(`   Error: ${res.error}`);
    }
  });

  console.log("=================================================");
  console.log(`📊 Test Summary: ${passedCount} / ${results.length} Passed`);
  console.log("=================================================");

  if (passedCount === results.length) {
    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.error("🚨 SOME TESTS FAILED!");
    process.exit(1);
  }
} catch (err) {
  console.error("💥 Critical test suite error:", err);
  process.exit(1);
}
