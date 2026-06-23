import fs from "node:fs";

const evidencePath = process.env.RUNX_INPUT_EVIDENCE_PATH ?? "";
const reportPath = process.env.RUNX_INPUT_REPORT_PATH ?? "";
const claimRef = process.env.RUNX_INPUT_CLAIM_REF ?? "";

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(64);
}

if (!evidencePath || !reportPath || !claimRef) {
  fail("evidence_path, report_path, and claim_ref are required");
}

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const report = fs.readFileSync(reportPath, "utf8");

if (typeof evidence.summary !== "string" || evidence.summary.length < 40) {
  fail("evidence summary is too short");
}
if (!Array.isArray(evidence.observations) || evidence.observations.length < 6) {
  fail("evidence observations are too few");
}
if (!report.includes("## Findings") || report.length < 1000) {
  fail("report is not substantive");
}
if (/receipt\s+is\s+still\s+pending|receipt\s+generation\s+should\s+be\s+retried|could\s+not\s+be\s+produced/i.test(report + "\n" + JSON.stringify(evidence))) {
  fail("final evidence/report must not declare the governed receipt missing");
}
const counts = evidence.observations.find((item) => item.kind === "board_counts")?.counts;
if (!counts || counts.total_bounties < 1) {
  fail("board counts are missing");
}

const result = {
  ok: true,
  claim_ref: claimRef,
  schema: evidence.schema,
  summary: evidence.summary,
  observation_count: evidence.observations.length,
  counts,
  report_chars: report.length,
  validated_artifacts: {
    evidence_path: evidencePath,
    report_path: reportPath,
  },
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
