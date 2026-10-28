# Ten additional DFW city guides

The existing seven service categories now include 16 cities. This change adds 70 city/service combinations, each in English, Spanish and French: 210 new localized routes.

| City | Personalization focus | City photo |
| --- | --- | --- |
| Allen | Household routines, gates, irrigation and equipment access | Allen Heritage Center |
| Richardson | Previous alterations, changed spaces and service records | Eisemann Center |
| Rockwall | Site exposure, level changes and access across finished surfaces | Historic county courthouse |
| Southlake | Multiple systems, zones and itemized work | Town Square |
| Colleyville | Protecting existing trees, beds and adjoining finishes | City Hall |
| Flower Mound | Outdoor connections, steps and site drainage observations | Aerial city view |
| Coppell | Side/shared access, property edges and surface protection | Grapevine Springs Preserve footbridge |
| Carrollton | Building/unit identification, converted spaces and staged access | Historic depot |
| Grapevine | Existing materials and address-specific exterior review | Historic Main Street |
| Lewisville | Sequencing work around current uses and other trades | West Main Street |

Each city has original local context, three reference places, three visit checks, seven distinct service-planning notes and two additional local FAQs. The English notes have complete Spanish and French translations. Site conditions are framed as observations to check, not citywide diagnoses. No citywide price survey, response-time promise, branch office or address-level availability claim is added.

## Discovery and metadata

The new cities are included in homepage and service city lists, peer-city navigation, search, generated route parameters and the sitemap. Homepage copy and its FAQ now correctly describe 16 cities. Each new city/service description uses that service's tailored note. The new pages have nine visible FAQ answers and matching FAQPage data; the original six cities retain seven. Quote links keep both the city and the internal service key.

City-specific provider destinations were checked against their live headings for 22 service/city pairs. Where no suitable local destination was verified, the new pages use a relevant general service or brand resource. This does not confirm service availability.

## Photos, maps and sources

The ten real city photos are stored locally as optimized WebP files (approximately 1.7 MB total). All were visually inspected. Visible photo credits give author, source, license and the resizing adaptation. Source-photo licenses apply to the optimized photos; CC BY-SA photographs retain the same share-alike license. These licenses do not apply to the surrounding application code. Southlake's source is marked public domain and its author attribution is explicitly qualified as recorded on Wikimedia Commons.

Exact image provenance is in `lib/cityImageCredits.json`. Municipal/official visitor references and coordinate-source URLs are recorded in `docs/new-city-profile-sources.json`. Some municipal sites restrict automated fetching; indexed official material was checked for the limited landmark references used. Property-planning advice is original and conditional.

Map centers use the city coordinates retrieved from Wikipedia's coordinates API. The existing lazy-loaded OpenStreetMap reference maps retain attribution and the explanation that a map is not a provider office or confirmed service boundary.

## Validation

- `npm run build`: 511 generated pages.
- `npx tsc --noEmit` and `git diff --check`.
- `npm run check:city-expansion`: all 210 new localized routes, tailored text, photos/credits, map markers, unique metadata, canonical/hreflang, FAQ/schema agreement, correct brands/quote keys, sitemap, home/category/search discovery, 18 existing-city regressions and invalid-city 404.
- `npm run check:home-seo`: all three localized homepages, visible copy, metadata and matching homepage FAQ data.

Browser screenshot testing is unavailable in this environment. Existing responsive city layouts were retained and reviewed in source; photo assets were inspected directly. Third-party map rendering was not visually browser-tested.
