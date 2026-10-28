import {setRequestLocale} from 'next-intl/server';
import {Search} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {serviceMetadata} from '@/lib/serviceSeo';
import {cleanQuery, normalizeSearch, searchEntries, SEARCH_KINDS, getSearchSuggestion, searchUrl, type SearchKind} from '@/lib/search';
import {CITIES} from '@/lib/locations';
import {getSearchIndex} from '@/lib/searchIndex';
import {getSearchUi} from '@/lib/searchUi';
import styles from './search.module.css';
type Props={params:Promise<{locale:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function generateMetadata({params}:Props){const {locale}=await params;const ui=getSearchUi(locale);return {...serviceMetadata(locale,'/search',ui.button,ui.description),robots:{index:false,follow:true}};}
const PAGE_SIZE=12;
export default async function SearchPage({params,searchParams}:Props){
  const {locale}=await params;setRequestLocale(locale);
  const ui=getSearchUi(locale), values=await searchParams, query=cleanQuery(values.q);
  const rawKind=cleanQuery(values.kind), kind=SEARCH_KINDS.includes(rawKind as SearchKind)?rawKind as SearchKind:undefined;
  const city=CITIES.find(city=>city.slug===cleanQuery(values.city))?.slug ?? '';
  const short=!!query && normalizeSearch(query).length<2;
  const active=!!query || !!kind || !!city;
  const index=getSearchIndex(locale);
  const options={city,browse:!!kind||!!city};
  const candidates=searchEntries(index,query,options);
  const results=kind?candidates.filter(result=>result.kind===kind):candidates;
  const pages=Math.max(1,Math.ceil(results.length/PAGE_SIZE));
  const rawPage=cleanQuery(values.page);
  const page=Math.min(pages,/^[1-9]\d{0,8}$/.test(rawPage)?Number(rawPage):1);
  const visible=results.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  const suggestion=active&&!short&&!results.length&&query?getSearchSuggestion(index,query,{...options,kind}):null;
  return <div className={styles.page}>
    <Link href="/" className={styles.home}>{ui.home}</Link>
    <header><span className={styles.eyebrow}>Homefront Journal</span><h1>{ui.title}</h1><p>{ui.description}</p></header>
    <form role="search" action={`/${locale}/search`} method="get" className={styles.form}>
      <label htmlFor="site-search">{ui.label}</label>
      {kind&&<input type="hidden" name="kind" value={kind}/>}
      <div className={styles.controls}><input id="site-search" name="q" type="search" maxLength={120} defaultValue={query} placeholder={ui.placeholder} aria-describedby="search-summary"/><button type="submit" className="btn btn-primary"><Search size={18} aria-hidden="true"/>{ui.submit}</button></div>
      <div className={styles.location}><label htmlFor="search-city">{ui.location}</label><select id="search-city" name="city" defaultValue={city} aria-describedby="city-help"><option value="">{ui.anyCity}</option>{CITIES.map(city=><option key={city.slug} value={city.slug}>{city.name}</option>)}</select><p id="city-help">{ui.cityHelp}</p></div>
    </form>
    <nav className={styles.filters} aria-label={ui.filter}>
      <Link href={searchUrl(query,'',city)} aria-current={!kind?'page':undefined}>{ui.all}{active?` (${candidates.length})`:''}</Link>
      {SEARCH_KINDS.map(type=><Link key={type} href={searchUrl(query,type,city)} aria-current={kind===type?'page':undefined}>{ui[type]}{active?` (${candidates.filter(result=>result.kind===type).length})`:''}</Link>)}
    </nav>
    <div id="search-summary" className={styles.summary}><span>{short?ui.short:active?`${ui.count}: ${results.length ? `${(page-1)*PAGE_SIZE+1}–${Math.min(page*PAGE_SIZE,results.length)} ${ui.of} `:''}${results.length}`:ui.empty}</span>{active&&<Link href="/search">{ui.clear}</Link>}{(kind||city)&&<Link href={searchUrl(query)}>{ui.reset}</Link>}</div>
    {active&&!short&&!results.length&&<div className={styles.empty}><p>{ui.none}</p>{suggestion&&<p>{ui.suggestion} <Link href={searchUrl(suggestion,kind,city)}>{suggestion}</Link>?</p>}</div>}
    {visible.length>0&&<ul className={styles.results}>{visible.map(result=><li key={result.href}><Link href={result.href}><span className={styles.eyebrow}>{ui[result.kind]}{result.cityName?` · ${result.cityName}`:''}</span><h2>{result.title}</h2><p>{result.description}</p></Link></li>)}</ul>}
    {pages>1&&<nav className={styles.pagination} aria-label={ui.pagination}>{page>1?<Link rel="prev" href={searchUrl(query,kind,city,page-1)}>← {ui.previous}</Link>:<span/>}<span>{page} {ui.of} {pages}</span>{page<pages?<Link rel="next" href={searchUrl(query,kind,city,page+1)}>{ui.next} →</Link>:<span/>}</nav>}
    <aside className={styles.topics}><h2>{ui.popular}</h2><div>{ui.topics.map(topic=><Link key={topic} href={searchUrl(topic)}>{topic}</Link>)}</div></aside>
  </div>;
}
