# Frantic #95 bug report: inconsistent artifact name in bounty 97 public API

## Target

- URL: `https://gofrantic.com/v1/bounties/97`
- Surface: public Frantic API, logged-out readable
- Bug type: wrong or inconsistent API data

## Summary

The public API response for bounty 97 disagrees with itself about the required machine-readable evidence artifact.

- `bounty.criteria.artifacts` says the delivery needs `evidence_json`.
- `bounty.criteria.deliveryExample` also uses `evidence_json=...`.
- `bounty.required_artifacts` says the delivery needs `status_json`.
- `bounty.delivery_contract.artifacts[].name` also uses `status_json` and omits `evidence_json`.

## Reproduction

1. Fetch `https://gofrantic.com/v1/bounties/97`.
2. Compare `bounty.criteria.artifacts`.
3. Compare `bounty.required_artifacts`.
4. Compare `bounty.delivery_contract.artifacts[].name`.
5. Compare the names shown in `bounty.criteria.deliveryExample`.

PowerShell reproduction:

```powershell
$r = Invoke-RestMethod -Uri 'https://gofrantic.com/v1/bounties/97'
[pscustomobject]@{
  criteria_artifacts = ($r.bounty.criteria.artifacts -join ',')
  top_required = ($r.bounty.required_artifacts -join ',')
  contract_artifacts = (($r.bounty.delivery_contract.artifacts | ForEach-Object { $_.name }) -join ',')
  delivery_example = ($r.bounty.criteria.deliveryExample -replace "`n", ' | ')
} | ConvertTo-Json
```

Observed result:

```json
{
  "criteria_artifacts": "public_url,evidence_json,receipt_ref,report",
  "top_required": "status_json,public_url,receipt_ref,report",
  "contract_artifacts": "status_json,public_url,receipt_ref,report",
  "delivery_example": "public_url=https://gofrantic.com/bounty/<number> | evidence_json=https://example.com/cleared-posting-evidence.json | receipt_ref=hfr_<your-funding-receipt> | receipt_ref=<worker-payout-receipt> | report=https://example.com/cleared-posting-report.md"
}
```

## Expected Result

The public API should use one artifact name consistently across:

- `criteria.artifacts`
- `required_artifacts`
- `delivery_contract.artifacts`
- `criteria.deliveryExample`

For this bounty, the consistent name appears to be `evidence_json`, because the narrative criteria and example both ask for a machine-readable evidence JSON file.

## Actual Result

The API response mixes `evidence_json` and `status_json`.

## Impact

A worker or integration that follows `required_artifacts` or `delivery_contract` could prepare `status_json`, while the criteria and example ask for `evidence_json`. That makes delivery preparation ambiguous and can cause preflight or review confusion.

## Duplicate Check

Bounty 95 already shows one delivered bug under review in the public event stream. The public event stream does not expose that report's artifact contents, so reviewer duplicate checking is still required.

## Privacy

This report uses only public Frantic API data. It includes no tokens, cookies, wallet secrets, email codes, private account data, or local machine paths.
