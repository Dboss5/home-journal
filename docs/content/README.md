# Sitemap inventory and focused article links

The complete [source URL inventory](source-url-inventory.csv) retains 863 entries from the three unique sitemaps supplied on 2026-10-27: 32 Supremacy posts, 162 Supremacy pages, and 669 Poolburg entries. Titles were extracted from the public WordPress API or HTML titles. The repeated Supremacy page sitemap was deduplicated. No Poolburg page sitemap was inferred.

## Removal before replacement

The previous five mixed-service articles and all their translations were removed from main in commit `9e2397332c203fa23c2e58e17e3880818bbaf4fd` before replacements were authored. Their old slugs are no longer included in the blog index or generated sitemap. The source inventory was preserved.

## Replacement policy

Each new article body contains exactly three links: two topically relevant brand links and one independent authority reference. Pool articles link only to Poolburg. HVAC, pest, plumbing, electrical and holiday-lighting articles link only to Supremacy Service. The five articles have English, Spanish and French versions, using identical destination URLs and translated anchor text. Source websites may remain in English.

| New slug | Brand links | Independent authority |
| --- | --- | --- |
| pool-maintenance-visit-checklist-dfw | Poolburg pool maintenance services; pool water testing | CDC home pool water treatment and testing |
| furnace-service-visit-checklist-dfw | Supremacy heater-not-working guide; heating maintenance | ENERGY STAR maintenance checklist |
| rodent-exclusion-inspection-dfw | Supremacy signs of rats/mice guide; rodent control and exclusion | EPA rodent prevention |
| hidden-household-water-leak-checklist-dfw | Supremacy water leak detection; main water-line repair cost | EPA WaterSense leak checking |
| christmas-lighting-power-plan-dfw | Supremacy electrical safety inspections; Christmas light installation | CPSC seasonal lighting guidance |

The MDX files contain the exact URLs. New pages opt out of automatic related-article cards using `showRelated: false`; existing articles keep their current behavior. Standard site navigation and the existing quote footer remain shared site elements, outside the three editorial links in the article body.

The new pages reuse the existing article layout. The pest article omits a cover rather than showing a pool image. No WordPress source content was changed.

## Question-led article batch — 2026-10-28

Ten additional topics were added in English, Spanish and French (30 MDX files): pool water loss, noisy pool pumps, green water after rain, AC water leaks, a hot room, no hot water, tankless conversion, attic scratching, repeated breaker trips and outdoor holiday-light trips.

Every article has an opening answer, three practical sections and two follow-up questions, with roughly 300–360 words per version. All use `showRelated: false` and exactly two matching-brand links plus one independent authority link. No price tables, fabricated search volumes, ranking guarantees or named expert endorsements were added. Sources were checked against the live destination pages before publication.

The [batch manifest](seo-blog-batch-2026-10-28.json) records editorial destinations and image provenance. Ten topic-specific covers were reused from the user-linked brand sites, reviewed visually, optimized to local WebP files and given descriptive translated alt text. They are illustrative covers, not records of work performed for a named customer. The covers total approximately 1.2 MB.

The shared article route now generates title/description, canonical and language-alternate URLs, article social metadata, and BlogPosting/BreadcrumbList JSON-LD. Existing posts receive the same metadata using their existing frontmatter. The new `coverImageAlt` field is optional for older posts. Matching service and city guides expose nine of the ten new articles through their existing reading sections; the electrical topic appears in the journal, search and sitemap alongside all others.

Validation: `npm run build`, `npx tsc --noEmit`, `npm run check:seo-blogs`, and `git diff --check`. The batch check validates the 30 production pages, 90 editorial links, 10 image endpoints, metadata/schema, blog/sitemap/search discovery and existing-post behavior. Browser screenshot review is unavailable in this environment; cover assets were inspected directly.

## Second question-led batch — 2026-10-28

Ten more topics were added in all three languages: return-jet bubbles, high pool-filter pressure, strong pool odor, AC short cycling, musty AC odors, slow sinks, low water pressure, returning ants, warm outlets and roof protection during holiday-light installation. They use new slugs and distinct questions from the first batch.

Each article retains the focused three-link policy: two relevant Poolburg or Supremacy destinations and one independent primary source. Covers include eight reused article/service references and two additional optimized plumbing assets from Supremacy; all were inspected for relevance. Cover alt text describes the illustration rather than claiming a diagnosis. Existing SEO metadata/schema, journal, search and sitemap automatically include the new posts. Nine topics are also added to the matching service/city reading lists; there is no electrical category page to link the electrical topic from.

The [second-batch manifest](seo-blog-batch-2026-10-28-02.json) records destinations, covers and service associations. All 29 unique editorial URLs were reachable during the pre-merge check. No dosing instructions, price estimates, ranking claims or fabricated credentials were added.

Validation: `npm run build` (301 generated pages), `npx tsc --noEmit`, `git diff --check`, and `npm run check:seo-blogs -- docs/content/seo-blog-batch-2026-10-28-02.json`. The checker now accepts an optional manifest and verifies all new title queries in search plus each available matching service backlink. All 30 new pages and 90 editorial links passed. Browser screenshot review is unavailable; cover assets were inspected directly.
