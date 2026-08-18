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

- `artifacts/desktop-1440.png` (1440×8200)
- `artifacts/mobile-390.png` (390×14000)

OCR of those captures found the truth line “being prepared for an open-source release” and the label “Bestie Founding Supporter”. It did not find vote, Member, “open-source project”, “Help steward Bestie in the open”, or “source publication pending”.

No GitHub Pages settings were changed. Pages was already unset on this repository.

## Blockers

### Designer source images were not on disk

Designer signed `/workspace/studio/bestie/visual/web/scene-founding-access.png`. That path, and the other studio visual paths below, were **not present** in this environment, so the signed bytes could not be copied into the build:

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

No price or tier brief was used as a source. No C$ amounts, no Founding Builder / Founding Steward names, no numbered tiers, and no Member or partner status label.

### GitHub Pages / production

Production settings were not changed. Do not enable Pages from this preview.
