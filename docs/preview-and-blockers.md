# Preview and blockers

This branch is a **preview-only** replacement landing page. It is not a production publish.

## HOLD scope

Designer still owns in-app components. This landing page only reconstructs the hero phone from `assets/scene-hero.png` (Today chrome). Do not treat captures as a Designer pass of the product UI.

Recapture 1440/390 only after the live hero phone shows: title Today, calories-left ribbon, grouped MEALS list, and the system tab bar with Today / Cravings / Progress plus a filled +. Do not resubmit `92f41df…`, `bb748ce…`, `0b57a55…`, or `890622a…`.

Still locked and now on disk:

- Scene art: `scene-hero.png`, `scene-founding-access.png`, `scene-open-source-proof.png`
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

`npm run capture` is for landing-page proof that the hero phone chrome is on the live page. It is not a product-UI pass.

## Locked assets (hashed after pull)

| File | SHA-256 |
| --- | --- |
| `assets/sassy-center-transparent.png` | `1e200509ebbacb18d2d61719d35ed9c8deb9815cb3140b00786b13a4817a259f` |
| `assets/companion-sassy.png` | `5dcc5e1a6ea34875fe196c0fc7048aef3cbb6cbb965faa0e8c39f1172c95b78f` |
| `assets/scene-hero.png` | `70e2b2d6610cf268d95eea9d400002f7540709d70e5465e62285c7df33863737` |
| `assets/scene-founding-access.png` | `5a09486c085278afd06dc83902649c5427129e271b1cfd156d958f059c30c699` |
| `assets/scene-open-source-proof.png` | `448cd4542eb949bbb876bf3986927c267741a17fae83b3aa35c74b60e117f573` |

Hero, founding, and artifact place the real cutout. Phone z-index stays above Sassy so meal names and remaining calories stay readable. The hero phone is the locked Today chrome only.

## Blockers

### Designer visual/app

Designer still owns in-app components. Attachment history: earlier chat attachments arrived as descriptions, not persistable bytes. The five locked files are now in `assets/` on this branch. Hero scene hash is `70e2b2d6610cf268d95eea9d400002f7540709d70e5465e62285c7df33863737`.

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
