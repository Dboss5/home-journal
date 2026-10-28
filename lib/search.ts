export const SEARCH_KINDS = ['service', 'city', 'article', 'calculator', 'page'] as const;
export type SearchKind = typeof SEARCH_KINDS[number];
export interface SearchEntry {
  href: string; title: string; description: string; kind: SearchKind;
  keywords?: string; service?: string; brand?: string; city?: string; cityName?: string;
}
export interface SearchOptions {kind?: SearchKind; city?: string; browse?: boolean}
export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
export function cleanQuery(raw: string | string[] | undefined) {
  return (typeof raw === 'string' ? raw : raw?.[0] ?? '').trim().slice(0, 120);
}
const stopWords = new Set(('a an the is my why do does how can what in near me for to of and at with on i it are ' +
  'el la los las un una mi por que como de del en para y se es al su ' +
  'le la les un une mon ma mes pourquoi comment des du de est et pour dans je').split(' '));
const aliases: Record<string, string> = {};
const groups: Record<string, string[]> = {
  hvac: ['ac','aircon','cvc','climatizacion','climatisation','chauffage'],
  plumbing: ['plumber','plumbers','plomero','plomeros','fontanero','fontaneros','plomeria','fontaneria','plomberie','plombier','plombiers'],
  pool: ['pools','piscina','piscinas','piscine','piscines'],
  pest: ['pests','plaga','plagas','nuisible','nuisibles','antiparasitaire'],
  electrical: ['electric','electrician','electricians','electricidad','electrico','electrica','electricite','electricien'],
  landscape: ['landscaping','jardineria','paysagisme','paysager'],
  hardscape: ['hardscaping','pavers','paver','adoquines','adoquin','paves','pave'],
  holiday: ['christmas','navidad','navidenas','navideno','noel','holidays'],
  calculator: ['calculators','calculadora','calculadoras','calculateur','calculateurs'],
  service: ['services','servicio','servicios'],
  repair: ['repairs','reparacion','reparaciones','reparation','reparations'],
  leak: ['leaks','leaking','fuga','fugas','fuite','fuites'],
  mulch: ['mantillo','paillis'],
};
for (const [canonical, words] of Object.entries(groups)) for (const word of words) aliases[word] = canonical;
function canonical(value: string) {
  return normalizeSearch(value)
    .replace(/\b(?:air conditioners?|air conditioning|air con|a c|aire acondicionado)\b/g, 'hvac')
    .replace(/\b(?:pest control|control de plagas|lutte antiparasitaire|lutte contre les nuisibles)\b/g, 'pest')
    .replace(/\bft worth\b|\bfortworth\b/g, 'fort worth')
    .replace(/\bmc kinney\b/g, 'mckinney').replace(/\bflowermound\b/g, 'flower mound')
    .split(' ').map(word => aliases[word] ?? word).join(' ');
}
function queryTokens(value: string) {
  return [...new Set(canonical(value).split(' ').filter(word => word && !stopWords.has(word)))];
}
function matches(words: Set<string>, token: string) {
  return words.has(token) || (token.length >= 4 && [...words].some(word => word.startsWith(token)));
}
function phraseIncludes(value: string, phrase: string) {return (` ${value} `).includes(` ${phrase} `);}
function inScope(entry: SearchEntry, options: SearchOptions) {
  return (!options.kind || entry.kind === options.kind) && (!options.city || entry.city === options.city);
}
export function searchEntries(entries: SearchEntry[], query: string, options: SearchOptions = {}): SearchEntry[] {
  const normalized = canonical(query);
  if (normalizeSearch(query).length < 2) return !query.trim() && options.browse ? entries.filter(entry => inScope(entry, options)).sort((a,b) => a.title.localeCompare(b.title)) : [];
  const tokens = queryTokens(query);
  if (!tokens.length) return [];
  const knownServices = ['pool','hvac','plumbing','pest','electrical','landscape','hardscape'];
  const requestedServices = knownServices.filter(service => tokens.includes(service));
  const requestedCities = [...new Map(entries.filter(e => e.city && e.cityName).map(e => [e.city!, canonical(e.cityName!)])).entries()]
    .filter(([, name]) => phraseIncludes(normalized, name)).map(([slug]) => slug);
  return entries.filter(entry => inScope(entry, options)).map(entry => {
    // A local query must not match every city through a shared DFW heading.
    if (requestedCities.length === 1 && entry.city && entry.city !== requestedCities[0]) return {entry, score: 0};
    const title = canonical(entry.title);
    if (requestedServices.length === 1 && entry.service && entry.service !== requestedServices[0] && !tokens.every(token => matches(new Set(title.split(' ')), token))) return {entry, score: 0};
    const description = canonical(entry.description);
    const keywords = canonical(`${entry.keywords ?? ''} ${entry.brand ?? ''}`);
    const tw = new Set(title.split(' ')), dw = new Set(description.split(' ')), kw = new Set(keywords.split(' '));
    if (!tokens.every(token => matches(tw,token) || matches(dw,token) || matches(kw,token))) return {entry, score: 0};
    let score = tokens.reduce((sum, token) => sum + (matches(tw,token) ? 8 : matches(dw,token) ? 3 : 1), 0);
    if (phraseIncludes(title,normalized)) score += 12;
    score += {service:8, calculator:6, article:4, city:0, page:0}[entry.kind];
    if (entry.city) score += requestedCities.includes(entry.city) || options.city === entry.city ? 25 : -5;
    return {entry, score: Math.max(1,score)};
  }).filter(item => item.score > 0).sort((a,b) => b.score-a.score || a.entry.title.localeCompare(b.entry.title)).map(item => item.entry);
}
function editDistance(a: string, b: string) {
  let row = Array.from({length:b.length+1},(_,i) => i);
  for(let i=1;i<=a.length;i++) {const next=[i];for(let j=1;j<=b.length;j++) next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}
  return row[b.length];
}
// Suggest only a small spelling change that actually produces scoped results.
export function getSearchSuggestion(entries: SearchEntry[], query: string, options: SearchOptions = {}): string | null {
  const normalized=normalizeSearch(query);const words=normalized.split(' ');
  const dictionary=[...new Set(entries.filter(entry => inScope(entry,options)).flatMap(entry => normalizeSearch(`${entry.title} ${entry.cityName ?? ''}`).split(' ')))].filter(word=>word.length>=4&&!stopWords.has(word));
  for(let i=0;i<words.length;i++) {
    const word=words[i];if(word.length<4||stopWords.has(word))continue;
    if(dictionary.some(candidate=>canonical(candidate)===canonical(word)))continue;
    const candidates=dictionary.map(candidate=>({candidate,distance:editDistance(word,candidate)})).filter(c=>c.distance>0&&c.distance<=(word.length>=7?2:1)).sort((a,b)=>a.distance-b.distance||a.candidate.localeCompare(b.candidate));
    for(const {candidate} of candidates){const changed=[...words];changed[i]=candidate;const suggestion=changed.join(' ');if(searchEntries(entries,suggestion,options).length)return suggestion;}
  }
  return null;
}
export function searchUrl(query: string, kind = '', city = '', page = 1) {
  const params = new URLSearchParams();if(query)params.set('q',query);if(kind)params.set('kind',kind);if(city)params.set('city',city);if(page>1)params.set('page',String(page));
  return `/search${params.size ? `?${params.toString()}` : ''}`;
}
