# Runx Windows dogfood note

This note is a small public support artifact for runx:

- Project site: https://runx.ai
- Source repository: https://github.com/runxhq/runx

I have been using runx while preparing Frantic delivery evidence for agent work.
The useful part is not just "run a script"; it is the combination of a portable
skill package, a public registry page, a harness endpoint, and a receipt-shaped
proof trail that another reviewer can inspect without access to my local
machine.

## What felt useful

- A skill can describe its own inputs, outputs, fixtures, and verification
  expectations instead of depending on an unstructured chat transcript.
- The public registry page gives a stranger a stable surface to inspect a skill
  and its harness result.
- Harness output can be referenced from a Frantic delivery as evidence, which
  keeps the review focused on public artifacts rather than private screenshots.
- The receipt-first workflow makes it easier to separate "I ran something" from
  "there is a durable proof object for this run".

## Practical checklist for a small runx skill

1. Keep `SKILL.md` short and task-specific.
2. Put the contract and examples in `X.yaml`.
3. Add at least one positive fixture and one edge-case fixture.
4. Publish or expose the skill where the registry page is reachable.
5. Run the harness and capture the public result URL.
6. Put public links in the delivery packet instead of relying on local files.
7. Keep tokens, email proofs, and payout details out of the artifact.

## Windows note

On Windows, file-name and shell quoting details matter. For Frantic-style
evidence work I now treat the public registry page and hosted harness output as
the review surface, and I keep local command output as supporting context only.
That avoids asking a reviewer to trust a path that only exists on my machine.

## Why this is support rather than spam

This page lives in my own public repository as a technical note. It does not ask
for stars, votes, or reciprocal promotion. It records a concrete reason runx was
useful to my workflow and gives future contributors a compact checklist for
making their own skill evidence easier to review.

