# Service page content and visual expansion

## Scope

Expand all seven existing main service categories in English, Spanish and French. Add service-specific option cards, two new FAQs per category, and relevant localized article links where articles exist. Keep the existing quotation, preparation, city navigation and provider-disclosure sections.

Use seven optimized local WebP assets for the service heroes, category cards and city-page heroes. Images are service illustrations, not claims that the depicted jobs were completed for Homefront customers. The landscape image is an aerial design visualization. Image descriptions are localized.

## Search metadata

Main service pages and the directory now define translated titles/descriptions, self-canonical URLs, language alternates including x-default, and social sharing fields. Main pages include WebPage, Service, BreadcrumbList and FAQPage data. FAQ data uses the same answers displayed in the expandable details.

City pages receive localized metadata and service-specific content/photos. Their Service and breadcrumb URLs use actual route slugs rather than translated display names. Provider names distinguish Poolburg pool services from Supremacy Service categories. No ratings, review counts, guarantees, new business addresses or verified-price claims are added. Structured data does not guarantee rich results or rankings.

## Verification

- Production build passed, including TypeScript and 217 generated pages.
- HTTP checks passed on all 21 translated main service pages: one H1, description, canonical and four language alternates, local photo, visible FAQ/schema parity and existing localized article destinations.
- HTTP checks passed on all 126 city pages: exact Service schema URL, canonical/hreflang, provider, one H1 and category-specific photo.
- All three directories expose the seven local images; all seven image endpoints serve image bytes.
- Desktop/mobile CSS was reviewed in source. Browser screenshot/layout checks could not run: the available browser process was blocked by the environment's socket restrictions. No screenshot review is claimed.
- Existing Next.js Edge Runtime and metadataBase warnings remain outside this change.

## Source assets

- `pool`: https://poolburg.com/wp-content/uploads/2026/05/00a874bb-4b13-40de-a90a-6126a8d68cc7.png
- `hvac`: https://supremacyservice.com/wp-content/uploads/2026/06/Supremacy-Air-Conditioner-Repair-In-Dallas-1024x819.webp
- `pest`: https://supremacyservice.com/wp-content/uploads/2026/09/Cockroach-Control-Extermination-in-Dallas-Fort-Worth.webp
- `plumbing`: https://supremacyservice.com/wp-content/uploads/2026/07/Toilet-Repairs-Rebuilds-services-in-Dallas-Tx-1.webp
- `lighting`: https://supremacyservice.com/wp-content/uploads/2026/08/Colorful-Lights-on-an-Upscale-Holiday-Home-installation-services-in-Dallas.webp
- `landscape`: https://designsboss.com/wp-content/uploads/2026/08/MA-1_7-Photo-1.jpg
- `hardscape`: https://designsboss.com/wp-content/uploads/2026/07/Hardscape-visualization.jpg
