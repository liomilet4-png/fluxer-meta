# Frantic #86 contract-drafter delivery report

- **Immutable package:** Published `liomilet4-png/contract-drafter@sha-baaae804293e` with `runx-cli 0.8.2`; registry digest is `sha256:7f10f2943d6700813987f61e4ff1753473c1f16c4f7024f293bfcf423ae90620`.
- **Public source:** PR [runxhq/runx#382](https://github.com/runxhq/runx/pull/382) is pinned to source revision `1389b8286713e49a3282eb5e71307e1c01dd5acd` and contains `X.yaml`, `SKILL.md`, two fixtures, and signed local harness evidence.
- **Local harness:** `runx harness ./skills/contract-drafter --json` passed `sealed_complete_template_parties_terms` and `refused_missing_required_term` with zero assertion errors.
- **Hosted harness:** `runx registry publish ./skills/contract-drafter/SKILL.md --registry https://api.runx.ai --json` returned hosted `status=published`, confirming registry acceptance of the inline-harness package.
- **Clean install:** `runx add liomilet4-png/contract-drafter@sha-baaae804293e --registry https://api.runx.ai --to <clean-dir> --json` installed the immutable digest into a new directory.
- **Real dogfood:** A post-publish `runx skill liomilet4-png/contract-drafter@sha-baaae804293e ... --json` run assembled a distinct consulting agreement input and sealed as receipt `sha256:b4f124398871e3b951f310d0d5d65a1e2d38b9acf0f133139d17a4f4cc4091d6`.
- **Draft output:** The dogfood result has draft ref `contract-drafter:consulting-basic-v2:2026-09-01:northstar-analytics:cedar-health-systems`, `review_status=draft_for_review`, and `delivery_status=not_sent`.
- **Visible deviations:** The output names the `fees` baseline (`30 days`) and proposed change (`20 days`), plus the `term` baseline (`30 days notice`) and proposed change (`60 days notice`). No hidden or inferred change is present.
- **Send boundary:** `send_proposal` targets canonical `send-as` runner `plan`, binds the supplied principal and audience, requires human approval and legal review, and records `provider_delivery=not_executed`. The skill sends nothing.
- **Refusal proof:** Omitting required `governing_law` leaves the runner at `needs_agent`; no `draft_doc` or `send_proposal` is emitted, and the report records `missing required term: governing_law`.
- **Receipt verification:** `runx verify --receipt dogfood-receipt.json --json` returned `valid=true` with production signature mode. The submitted receipt is the post-publish registry dogfood receipt, not the harness fixture receipt.
- **Why install it:** An operator can turn an approved template and explicit deal sheet into a review packet without silently changing the baseline or accidentally treating a draft as sent.

## Install, run, verify

```text
runx add liomilet4-png/contract-drafter@sha-baaae804293e --registry https://api.runx.ai
runx registry read liomilet4-png/contract-drafter@sha-baaae804293e --registry https://api.runx.ai --json
runx skill liomilet4-png/contract-drafter@sha-baaae804293e --registry https://api.runx.ai --input-json template=<json> --input-json parties=<json> --input-json terms=<json> --json
runx resume <run-id> answers.json --json
runx verify --receipt <receipt.json> --json
```

Supply only source-controlled templates, named parties, and explicit deal terms. Do not add unsupplied clauses or use the draft as legal approval. A separate approved provider adapter is required for any delivery.
