import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const js = readFileSync(join(root, "form.js"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");
const docs = existsSync(join(root, "docs/preview-and-blockers.md"))
  ? readFileSync(join(root, "docs/preview-and-blockers.md"), "utf8")
  : "";
const published = [html, css, js].join("\n");
const allText = [published, readme, docs].join("\n");

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

describe("forbidden claims and theater", () => {
  const forbidden = [
    "if you fit",
    "We will not take everyone",
    "Founding access opening soon",
    "Opening soon",
    "A small early cohort",
    "Bestie is open source",
    "Bestie is an open-source project",
    "Bestie is an open source",
    "foundation",
    "Founding Girls",
    "Ask to be on the list",
    "vote",
    "A vote on tone and recovery copy",
    "source publication pending",
    "Founding Builder",
    "C$5",
    "C$15",
    "C$35",
    "open-source project",
    "Bestie is an open-source project",
    "Help steward Bestie in the open"
  ];

  for (const phrase of forbidden) {
    test(`does not include “${phrase}”`, () => {
      assert.equal(
        published.toLowerCase().includes(phrase.toLowerCase()),
        false,
        `forbidden phrase present: ${phrase}`
      );
    });
  }

  test("does not invent numeric prices or checkout", () => {
    assert.match(html, /No payment today/);
    assert.doesNotMatch(published, /C\$5|C\$15|C\$35|CA\$35/);
    assert.doesNotMatch(published, /stripe\.com|buy now|subscribe now/i);
    assert.doesNotMatch(html, /href=["'][^"']*(checkout|paypal|stripe|ko-fi)/i);
    assert.doesNotMatch(html, /\bMember\b|\bMembers\b/);
    assert.doesNotMatch(html, /Help steward Bestie in the open/i);
    assert.doesNotMatch(html, /open-source project/i);
  });

  test("does not claim current open-source status", () => {
    assert.match(html, /Bestie is not open source today/);
    assert.match(html, /Bestie is being prepared for an open-source release/);
    assert.doesNotMatch(html, /Bestie is open source/i);
  });

  test("does not use selection or scarcity theater", () => {
    assert.doesNotMatch(published, /if you fit|will not take everyone|limited spots|only \d+ left/i);
  });

  test("does not ship vote or governance wording", () => {
    assert.doesNotMatch(published, /\bvote\b|\bvotes\b|\bvoting\b/i);
    assert.doesNotMatch(published, /A vote on tone and recovery copy/i);
  });
});

describe("product founding access waitlist", () => {
  test("hero uses the locked product copy", () => {
    assert.match(html, /CALORIE TRACKING, NO GUILT/);
    assert.match(html, /Keep the plan\. Lose the guilt trip\./);
    assert.match(
      html,
      /Log food in seconds, park a craving, and keep showing up after a messy day—with a bestie on your side\./
    );
  });

  test("founding-access section uses locked copy and waitlist fields", () => {
    assert.match(html, /Help shape the bestie you actually want to hear from\./);
    assert.match(html, /Get early access to the working product\./);
    assert.match(html, /Give feedback on tone and recovery copy\./);
    assert.match(
      html,
      /Get early access to the working product\. Give feedback on tone and recovery copy\./
    );
    assert.match(html, /Amounts are not shown here\./);
    assert.match(html, /No payment today\. Not equity\. No fake exclusivity\./);
    assert.match(html, /You’re on the founding access list\./);
    assert.match(html, /<form[^>]+id="founding-access-form"/);
    assert.match(html, /<label for="name">Name<\/label>/);
    assert.match(html, /<label for="email">Email<\/label>/);
    assert.match(html, /I am 18 or older/);
    assert.match(html, /Join founding access/);
  });

  test("waitlist is not labeled as supporter enrollment", () => {
    const formChunk = html.slice(
      html.indexOf('id="founding-access-form"'),
      html.indexOf("</form>", html.indexOf('id="founding-access-form"'))
    );
    assert.doesNotMatch(formChunk, /Founding Supporter|supporter enrollment/i);
    assert.match(js, /founding-access-form/);
    assert.match(js, /Founding Access/);
    assert.doesNotMatch(js, /Founding Girls|supporter enrollment/i);
  });
});

describe("Bestie Founding Supporter section", () => {
  test("uses the exact supporter label and disabled CTA", () => {
    assert.ok(count(html, "Bestie Founding Supporter") >= 1);
    assert.doesNotMatch(html, /Founding Partner|founding member/i);
    assert.match(html, /<h2 id="supporter-title">Bestie Founding Supporter<\/h2>/);
    assert.match(html, /Bestie is being prepared for an open-source release\./);
    assert.match(html, /Enrollment is disabled\./);
    assert.match(html, /These prices are information only\./);
    assert.match(html, /id="supporter-cta"[^>]*disabled/);
    assert.doesNotMatch(html, /id="supporter-form"|href=["'][^"']*enroll/i);
  });

  test("lists only the locked informational amounts", () => {
    assert.match(html, /CA\$5 \/ month — Founding Supporter/);
    assert.match(html, /Project updates\. Supporter badge\./);
    assert.match(html, /CA\$15 \/ month — Founding Circle/);
    assert.match(html, /Everything in Founding Supporter, plus optional public name listing with consent, and early notices about public builds\./);
    assert.match(html, /CA\$50 \/ month — Founding Steward/);
    assert.match(html, /Everything in Founding Circle, plus roadmap feedback sessions \/ submit feedback\./);
    assert.match(html, /Feedback is explicitly non-binding and provides no authority\./);
    assert.doesNotMatch(html, /C\$5|C\$15|C\$35|Founding Builder/);
    assert.doesNotMatch(html, /\d+%/);
  });

  test("ledger is labeled and empty", () => {
    assert.match(html, /Funding &amp; Spending Ledger|Funding & Spending Ledger/);
    assert.match(html, /Founder-maintained; not platform-verified\./);
    assert.match(html, /No activity yet/);
    for (const col of [
      "Gross receipts",
      "Ko-fi/Stripe fees",
      "Taxes reserved",
      "Net receipts",
      "Dated expenses",
      "Purpose/category",
      "Receipt/reference IDs"
    ]) {
      assert.match(html, new RegExp(col));
    }
    assert.match(html, /CAD/);
  });

  test("includes the verbatim community-support disclaimer", () => {
    assert.match(
      html,
      /Community support only\. A Bestie Founding Supporter receives only the listed community benefits\. This is not an investment and provides no ownership, equity, profit share, dividends, financial return, appreciation, escrow, insurance, governance rights, or claim on Bestie or its assets\. Payments are not represented as charitable donations or tax-deductible\./
    );
  });
});

describe("product scenes and construction locks", () => {
  test("includes locked product section copy", () => {
    const lines = [
      "Logging should feel like a tap, not homework.",
      "Recents first. Search focused. Barcode and copy-yesterday within reach. The companion stays out of the sheet so nothing slows the job.",
      "Want it now. Decide later.",
      "Park a craving without moral labels. Revisit it, enjoy it on purpose, reschedule it, or watch it expire.",
      "The day went off plan. You didn't.",
      "Bestie tells the truth without turning one dinner into a three-day disappearance. No punishment workout. No apology. Just the next meal.",
      "Progress without the lecture.",
      "A one-minute check-in, soft consistency, optional weight, and one useful focus for next week. Private by default.",
      "Keep showing up. We'll meet you there.",
      "Show the artifact. Skip the star theater.",
      "The repo is private and being prepared for an open-source release. Until the exact source module, license, and commit are public, this page shows only the verified build artifact.",
      "Being prepared for an open-source release."
    ];
    for (const line of lines) {
      assert.match(html, new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  test("scene 5 is weekly consistency and scene 6 is Sassy identity", () => {
    assert.match(html, /data-scene="5"/);
    assert.match(html, /data-scene="6"/);
    const scene5 = html.slice(html.indexOf('data-scene="5"'), html.indexOf('data-scene="5"') + 1800);
    assert.match(scene5, /5 of 7 days showed up|WEEKLY CARD/i);
    const scene6 = html.slice(html.indexOf('data-scene="6"'), html.indexOf('id="supporter"'));
    assert.match(scene6, /sassy|identity/i);
  });

  test("artifact facts are limited to verified local values", () => {
    assert.match(html, /Companion\.usdz/);
    assert.match(html, /835,441 bytes/);
    assert.match(html, /\/Companion/);
    assert.match(html, /cab2d50c30a20cb307268992ea3713ae99c3d27c42205c0c85df0d16da3b1e59/);
    assert.doesNotMatch(html, /stargazers|contributors|MIT License|github.com\/.*\/blob/i);
  });

  test("Fast Log sheet does not include Sassy", () => {
    const start = html.indexOf('id="fast-log"');
    const end = html.indexOf('id="craving-vault"');
    const sheet = html.slice(start, end);
    assert.doesNotMatch(sheet, /sassy-figure|aria-label="Sassy"/i);
  });
});

describe("accessibility, motion, and metadata", () => {
  test("uses semantic landmarks and a single h1", () => {
    assert.match(html, /<html lang="en">/);
    assert.match(html, /href="#main"/);
    assert.match(html, /<main id="main"/);
    assert.match(html, /<nav /);
    assert.match(html, /<footer /);
    assert.equal(count(html, "<h1"), 1);
    assert.match(html, /<h2/);
  });

  test("respects reduced motion and visible focus", () => {
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /:focus-visible/);
  });

  test("includes SEO title, description, and social metadata without an invented canonical", () => {
    assert.match(html, /<title>Bestie/);
    assert.match(html, /meta name="description"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /rel="icon"/);
    assert.doesNotMatch(html, /rel="canonical"/);
  });

  test("does not add analytics snippets", () => {
    assert.doesNotMatch(html, /plausible|goatcounter|cloudflareinsights|gtag|googletagmanager|analytics\.js/i);
  });
});

describe("docs record preview-only blockers", () => {
  test("documents Pages, analytics, and asset persistence blockers", () => {
    assert.match(docs, /GitHub Pages/);
    assert.match(docs, /analytics/i);
    assert.match(docs, /attachment/i);
  });
});
