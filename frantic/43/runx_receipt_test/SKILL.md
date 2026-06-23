---
name: frantic-board-audit
description: Validate a Frantic board-health audit evidence file and report before delivery.
source:
  type: cli-tool
  command: node
  args:
    - run.mjs
  timeout_seconds: 30
  sandbox:
    profile: readonly
    cwd_policy: skill-directory
inputs:
  evidence_path:
    type: string
    required: true
    description: Path to the JSON evidence file.
  report_path:
    type: string
    required: true
    description: Path to the Markdown report.
  claim_ref:
    type: string
    required: true
    description: Frantic claim reference being audited.
runx:
  category: ops
  input_resolution:
    required:
      - evidence_path
      - report_path
      - claim_ref
---

# frantic-board-audit

Validates that a Frantic board-health audit has a substantive evidence summary,
at least six structured observations, board counts, and a findings section in the
human-readable report. It returns a compact JSON summary for the governed run receipt.
