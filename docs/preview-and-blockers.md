# Preview and blockers

This branch is a **preview-only** replacement landing page. It is not a production publish.

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
npm run capture
```

Rendered captures (after `npm run capture`) land in `artifacts/`:

- `artifacts/desktop-1440.png` (1440×9200)
- `artifacts/mobile-390.png` (390×15500)

OCR of those captures must show the truth line “being prepared for an open-source release”, the label “Bestie Founding Supporter”, and the informational amounts CA$5, CA$15, and CA$50. It must not find vote, Member, “open-source project”, “Help steward Bestie in the open”, “source publication pending”, C$5 / C$15 / C$35, or Founding Builder.

No GitHub Pages settings were changed. Pages was already unset on this repository.

## Blockers

### Designer source images were not on disk

Designer source is independently vote-clean and may be used again. In this environment the studio mount is still missing, so those files could not be opened or copied.

Approved art lock still **not on disk**. Every PNG on this VM was hashed; none matched:

- `companion-sassy.png` `5dcc5e1a6ea34875fe196c0fc7048aef3cbb6cbb965faa0e8c39f1172c95b78f`
- `sassy-center-transparent.png` `1e200509ebbacb18d2d61719d35ed9c8deb9815cb3140b00786b13a4817a259f`
- `scene-hero.png` `96a9d37e556fc30162f83adfa4bf83fa83abe330c63ac1d4cb10e9f9084064fd`
- `scene-founding-access.png` `d8442bed38fcbd0c21ea02528e7ab70266ab70b2bd9598754bc1e05826778cc6`
- `scene-open-source-proof.png` `448cd4542eb949bbb876bf3986927c267741a17fae83b3aa35c74b60e117f573`

Chat attachments arrived as descriptions, not persistable bytes. No replacement character was invented. The page references `assets/sassy-center-transparent.png` and no longer ships a CSS stand-in. Copy those five files into `assets/` when they are on disk.

Designer signed `/workspace/studio/bestie/visual/web/scene-founding-access.png`. That path, and the other studio visual paths below, were **not present** here:

- `/workspace/studio/bestie/visual/web/desktop-landing-1440.png`
- `/workspace/studio/bestie/visual/web/mobile-landing-390.png`
- `/workspace/studio/bestie/visual/web/scene-founding-access.png`
- `/workspace/studio/bestie/visual/web/scene-open-source-proof.png`
- `/workspace/studio/bestie/visual/web/mobile-scene-open-source-proof.png`
- `/workspace/studio/bestie/visual/web/source/mobile-scene-founding-access.png`
- `/workspace/studio/bestie/web-visual-wall.md`
- `/workspace/studio/bestie/visual-launch-system.md`

Conversation attachments arrived as descriptions, not persistable image bytes. Product scenes are HTML/CSS reconstructions of the approved comps. Sassy is a CSS decorative figure, not the 3D companion file. The requested mobile artifact PNG (`SHA-256 4bf3bd0739bb1f69eae847066a1aba45cf0fc65d5eb98ce29f171afde5748790`) could not be hashed or copied here.

Do not reuse `/workspace/studio/bestie/visual/web/source/mobile-scene-open-source-proof.png` (called stale).

### Analytics

No approved analytics provider or key exists in this repo. None was added.

### Canonical URL

README mentioned `https://theprincesajjad.github.io/bestie-founding/`, but GitHub Pages is not enabled and must not be turned on from this work. No canonical tag was invented.

### Product waitlist plumbing

The existing `formsubmit.co` AJAX endpoint and inbox already in `form.js` are preserved for the **product founding access waitlist** only (name, email, 18+). That is not Bestie Founding Supporter enrollment and does not charge.

### Price and tier brief

The cherry founding scene uses the patched cream invitation card: includes list, status “Information only · enrollment off”, and informational CA$5 / CA$15 / CA$50. Join founding access is the product waitlist, not a pay control. Do not print “pricing shared only when locked.” The signed scene path `/workspace/studio/bestie/visual/web/scene-founding-access.png` (SHA-256 `5a09486c085278afd06dc83902649c5427129e271b1cfd156d958f059c30c699`) was not present in this environment, so those exact bytes could not be copied. No Founding Builder, no C$35, no Member or partner status label.

### GitHub Pages / production

Production settings were not changed. Do not enable Pages from this preview.
