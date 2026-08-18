# Preview and blockers

This branch is a **preview-only** replacement landing page. It is not a production publish.

## HOLD — wait for one frozen hero hash

Do not recapture. Do not chase a moving `scene-hero.png`. No deploy. Implement Today chrome only after CEO/Designer confirm **one frozen hash**.

Do not implement any of these moving or stale hashes:

| Note | SHA-256 |
| --- | --- |
| Previously stated Designer lock (not frozen here) | `adf9c5863c71dfe6c1b003347274d373d566f56a83597e6772fd04a8c1dfd3de` |
| `bf3c2a95…` — no longer on disk; do not implement | `bf3c2a95becf25a213819b296aafc63de01809590da24671ded82c9bfa7f1eec` |
| CEO current on-disk hash — do not implement until frozen | `36df4e56b8d50285116e3e1039e9df4f0d6454ebed9cfa8341f7bee266f21483` |
| This VM after pull (`70e2b2d6…`) — Designer: stale; do not implement | `70e2b2d6610cf268d95eea9d400002f7540709d70e5465e62285c7df33863737` |

Wait for a confirmed matching hero file.

Still locked and now on disk:

- Founding and artifact scene art
- Real Sassy cutout: `sassy-center-transparent.png` (source lock `companion-sassy.png`)

No replacement character was invented. GitHub Pages and production were not changed. No deploy.

Existing captures `0b57a55…` and `890622a…` remain FAIL and must not be resubmitted. Also do not resubmit `92f41df…` or `bb748ce…`.

## Local preview

From the repo root:

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

```bash
npm test
npm run lint
npm run build
```

Do **not** run `npm run capture` for a pass until Designer replaces the hero phone and visual/app.

## Locked assets (hashed after pull)

| File | SHA-256 |
| --- | --- |
| `assets/sassy-center-transparent.png` | `1e200509ebbacb18d2d61719d35ed9c8deb9815cb3140b00786b13a4817a259f` |
| `assets/companion-sassy.png` | `5dcc5e1a6ea34875fe196c0fc7048aef3cbb6cbb965faa0e8c39f1172c95b78f` |
| `assets/scene-hero.png` | **unconfirmed** — see HOLD hashes above |
| `assets/scene-founding-access.png` | `5a09486c085278afd06dc83902649c5427129e271b1cfd156d958f059c30c699` |
| `assets/scene-open-source-proof.png` | `448cd4542eb949bbb876bf3986927c267741a17fae83b3aa35c74b60e117f573` |

Hero, founding, and artifact place the real cutout. Phone z-index stays above Sassy so meal names stay readable. The hero phone UI itself is rejected placeholder chrome pending Designer replacement.

## Blockers

### Designer visual/app and hero phone

Wait for CEO/Designer to confirm one frozen hero hash before implementing Today chrome. Do not implement `bf3c2a95…` (gone) or `36df4e56…` (unfrozen). Attachment history: earlier chat attachments arrived as descriptions, not persistable bytes. Founding, artifact, and Sassy locks remain on disk. `scene-hero.png` is unconfirmed.

### Analytics

No approved analytics provider or key exists in this repo. None was added.

### Canonical URL

README mentioned `https://theprincesajjad.github.io/bestie-founding/`, but GitHub Pages is not enabled and must not be turned on from this work. No canonical tag was invented.

### Product waitlist plumbing

The existing `formsubmit.co` AJAX endpoint and inbox already in `form.js` are preserved for the **product founding access waitlist** only (name, email, 18+). That is not Bestie Founding Supporter enrollment and does not charge.

### Price and tier brief

The cherry founding scene cream invitation card stays locked: includes list, status “Information only · enrollment off”, and informational CA$5 / CA$15 / CA$50. Join founding access is the product waitlist, not a pay control. No Founding Builder, no C$35, no Member or partner status label.

### GitHub Pages / production

Production settings were not changed. Do not enable Pages from this preview.
