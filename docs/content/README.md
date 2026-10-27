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
