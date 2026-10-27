# Home service calculators

Six tools are available under `/[locale]/calculators`, with individual pages in English, Spanish and French:

| URL slug | Service | Output |
| --- | --- | --- |
| `pool-volume` | Poolburg / pool | Rectangular pool US gallons and liters |
| `ac-running-cost` | Supremacy / HVAC | Energy-only USD cost and kWh |
| `water-leak-waste` | Supremacy / plumbing | US gallons lost and water-only USD cost |
| `holiday-light-cost` | Supremacy / holiday lighting | Energy-only USD cost and kWh |
| `mulch-quantity` | Supremacy / landscape | Cubic yards and rounded-up whole bags |
| `patio-pavers` | Supremacy / hardscape | Rounded-up whole pavers and area |

## Behavior and assumptions

- Calculations update in the browser, with no network request or form submission.
- Example measurements and utility rates are editable and explicitly labeled as examples. Rates are not local market claims.
- Inputs use US customary units, suitable for the existing DFW service guides. Currency is USD in every locale; only formatting changes by locale.
- Invalid, empty, non-finite, out-of-range and fractional count/day inputs suppress both results. Deep-end pool depth cannot be less than shallow-end depth. Reset restores the example.
- Zero power, hours and utility rates are valid; dimensions and collection time must be positive. No chemical dosing, pesticide quantity, equipment sizing or circuit-capacity recommendations are made.
- Pool geometry assumes a rectangular footprint and a uniformly sloping floor. Pavers assume one rectangular size with editable waste allowance. Mulch excludes settlement and delivery allowances. Each page displays its formula, preparation instructions and limitations.
- References link to NIST, EIA, EPA WaterSense, CPSC, Iowa State University Extension and the paver manufacturer's technical guide as relevant. The site explains the arithmetic in original wording.
- Existing service imagery is reused, including its localized descriptive alt text. No new image licenses or remote image dependencies are introduced.

## Discovery and metadata

The header, mobile menu and footer link to the hub. Six matching service pages link to their calculator; each calculator links back to its service guide and the matching quote-form service key. No pool calculator routes to Supremacy.

All 21 localized routes are included in the sitemap. Pages have canonical URLs, language alternates, unique descriptions and service images for social sharing. Detail pages include WebPage, BreadcrumbList and FAQPage JSON-LD matching visible content; the hub has CollectionPage/ItemList markup. No ratings or rich-result guarantees are claimed.

## Verification

- `npm run build`
- `npx tsc --noEmit`
- `npm run test:calculators`: independent worked examples, unit conversions, ceilings, zero use, invalid values, range boundaries and locale completeness.
- `npm run check:calculator-pages` (after build): 21 production routes, 18 service backlinks, sitemap, metadata, language alternates, visible FAQs/JSON-LD, live-result and field-label markup, service images, quote service keys and unknown-slug 404.

Responsive CSS was reviewed at 900/620px breakpoints, with a 1050px header breakpoint for the added navigation link. A browser screenshot review is not available in this environment; HTTP/HTML checks do not substitute for visual or assistive-technology testing.
