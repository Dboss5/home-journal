# Homepage text and metadata

The homepage keeps its backyard hero, service illustrations, city cards, animations and editorial palette. Its visible copy now explains its role as a Dallas–Fort Worth homeowner resource and referral platform.

Updated English, Spanish and French content includes a descriptive H1 and introduction, seven service summaries, local context for the six existing city guides, quote-preparation steps, the Poolburg/Supremacy relationship, three recent question-led article previews, calculator guidance and four common planning questions. The existing hero heading width accommodates the longer text. Article previews link to their matching translated posts and local WebP covers.

The homepage route generates a localized title, description, canonical URL, language alternates and social metadata. WebSite, WebPage and FAQPage JSON-LD describe the visible page and use the same FAQ translation data as the rendered answers. No LocalBusiness location, opening-hours, ratings or appointment-availability claims are introduced.

Verification: clean `npm run build`, `npx tsc --noEmit`, `git diff --check` and `npm run check:home-seo`. The production-page checks cover all three locales, exactly one H1, visible localized copy, metadata, canonical/hreflang, matching FAQs/schema, seven service links, nine live article destinations, calculator/brand/quote links and the original hero asset. Browser screenshot testing is unavailable; responsive layout changes were source-reviewed.
