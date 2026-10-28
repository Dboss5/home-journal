# Search update

Search covers service guides, all 16 cities, all 36 articles per language, six calculators, and seven core pages. Article body text is searchable; result previews use the authored excerpt. Markdown link destinations are omitted from the index.

Results use accent-insensitive word and prefix matching, common service aliases in English, Spanish and French, and basic question stop words. AC maps to HVAC; plumber, fontanero and plombier map to plumbing. Title matches rank above descriptions and body text. Local queries prioritize the named city and exclude other city guides, even when those guides mention a nearby city. Service metadata reduces unrelated cross-service matches, while preserving direct title matches such as electrical planning for holiday lighting.

Content-type chips and a city selector work with server-rendered GET forms and shareable URLs, without client JavaScript. City selection limits results to local guides. Results paginate at 12 per page, preserving filters and query; page numbers are validated and clamped. Empty queries can browse a selected content type or city. Short queries retain guidance. Search pages remain noindex, follow.

For a zero-result query, a small spelling correction is offered only if it produces results within the selected filters. This is a suggestion, never a silent query replacement. This remains a local lexical search, without semantic/vector matching or an external search service.

Validation: production build, TypeScript, and `npm run check:search`. The search check exercises ranking, aliases, accent handling, city disambiguation, filters, pagination, parameter validation, query escaping, suggestions, all 108 localized article-title searches, and EN/ES/FR production responses. Browser visual verification was not available; responsive styles and accessibility attributes were reviewed in source.
