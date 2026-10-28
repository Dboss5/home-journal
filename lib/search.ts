export interface SearchEntry {href: string; title: string; description: string; kind: string; keywords?: string}
export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
}
export function cleanQuery(raw: string | string[] | undefined) {
  return (typeof raw === 'string' ? raw : raw?.[0] ?? '').trim().slice(0,120);
}
export function searchEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  const normalized = normalizeSearch(query);
  if(normalized.length < 2) return [];
  const tokens = normalized.split(/\s+/);
  return entries.map(entry => {
    const title = normalizeSearch(entry.title);
    const description = normalizeSearch(entry.description);
    const text = `${title} ${description} ${normalizeSearch(entry.keywords ?? '')}`;
    const score = tokens.every(token => text.includes(token)) ? tokens.reduce((sum,token) => sum + (title.includes(token) ? 5 : description.includes(token) ? 2 : 1),title.includes(normalized) ? 10 : 0) : 0;
    return {entry,score};
  }).filter(item => item.score > 0).sort((a,b) => b.score-a.score || a.entry.title.localeCompare(b.entry.title)).map(item => item.entry);
}
