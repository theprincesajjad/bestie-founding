# Preview and blockers

This branch is a **preview-only** replacement landing page. It is not a production publish.

## Frozen hero lock

Hero is frozen on `assets/scene-hero-locked.png` SHA-256 `4388d49871a6bf9b3a68bf9b5ca11b7a47cfd35edd038232b4961f54a72abc25`. Ignore `scene-hero.png` if it keeps changing. Do not implement moving or stale `scene-hero.png` hashes. No deploy.

The landing-page hero phone is the in-progress Today chrome from that frozen file. Real Sassy in the world uses the committed transparent cutout. Founding and artifact scenes are unchanged.

No replacement character was invented. GitHub Pages and production were not changed. No deploy.

New captures after the frozen hero chrome was on the live page:

| File | SHA-256 |
| --- | --- |
| `artifacts/desktop-1440.png` | `83f7d8e8820175953ad03863f79d7b11a1016ddaf5c1cb6bdcdd5b191ba0e5fe` |
| `artifacts/mobile-390.png` | `bca8e2f2df951c394ff6fd4b4d49a85ca6a86702d19ab2afa3b978e4be4c79af` |

Do not resubmit `92f41df…`, `bb748ce…`, `0b57a55…`, or `890622a…`.

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

`npm run capture` is for landing-page proof that the frozen hero phone chrome is on the live page. It is not a product-UI pass. Ignore `scene-hero.png`.

## Locked assets (hashed after pull)

| File | SHA-256 |
| --- | --- |
| `assets/sassy-center-transparent.png` | `1e200509ebbacb18d2d61719d35ed9c8deb9815cb3140b00786b13a4817a259f` |
| `assets/companion-sassy.png` | `5dcc5e1a6ea34875fe196c0fc7048aef3cbb6cbb965faa0e8c39f1172c95b78f` |
| `assets/scene-hero-locked.png` | `4388d49871a6bf9b3a68bf9b5ca11b7a47cfd35edd038232b4961f54a72abc25` |
| `assets/scene-hero.png` | **ignored if it keeps changing** |
| `assets/scene-founding-access.png` | `5a09486c085278afd06dc83902649c5427129e271b1cfd156d958f059c30c699` |
| `assets/scene-open-source-proof.png` | `448cd4542eb949bbb876bf3986927c267741a17fae83b3aa35c74b60e117f573` |

Hero, founding, and artifact place the real cutout. Phone z-index stays above Sassy so meal names and remaining calories stay readable.

## Blockers

### Designer visual/app and hero phone

Hero phone implements frozen `scene-hero-locked.png` only. Ignore `scene-hero.png`. Attachment history: earlier chat attachments arrived as descriptions, not persistable bytes. Designer still owns in-app components beyond this landing-page phone.

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
