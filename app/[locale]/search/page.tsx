import {setRequestLocale} from 'next-intl/server';
import {Search} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {serviceMetadata} from '@/lib/serviceSeo';
import {cleanQuery,normalizeSearch,searchEntries} from '@/lib/search';
import {getSearchIndex} from '@/lib/searchIndex';
import {getSearchUi} from '@/lib/searchUi';
import styles from './search.module.css';
type Props={params:Promise<{locale:string}>;searchParams:Promise<{q?:string|string[]}>};
export async function generateMetadata({params}:Props){const {locale}=await params;const ui=getSearchUi(locale);return {...serviceMetadata(locale,'/search',ui.button,ui.description),robots:{index:false,follow:true}};}
export default async function SearchPage({params,searchParams}:Props){
  const {locale}=await params;setRequestLocale(locale);
  const ui=getSearchUi(locale);const query=cleanQuery((await searchParams).q);
  const short=normalizeSearch(query).length<2;
  const results=searchEntries(getSearchIndex(locale),query);
  return <div className={styles.page}>
    <Link href="/" className={styles.home}>{ui.home}</Link>
    <header><span className={styles.eyebrow}>Homefront Journal</span><h1>{ui.title}</h1><p>{ui.description}</p></header>
    <form role="search" action={`/${locale}/search`} method="get" className={styles.form}>
      <label htmlFor="site-search">{ui.label}</label>
      <div className={styles.controls}><input id="site-search" name="q" type="search" maxLength={120} defaultValue={query} placeholder={ui.placeholder} aria-describedby="search-summary"/><button type="submit" className="btn btn-primary"><Search size={18} aria-hidden="true"/>{ui.submit}</button></div>
    </form>
    <div id="search-summary" className={styles.summary}>{query ? short ? ui.short : `${ui.count}: ${results.length}` : ui.empty}{query && <Link href="/search">{ui.clear}</Link>}</div>
    {query && !short && results.length===0 && <p className={styles.empty}>{ui.none}</p>}
    {results.length>0 && <ul className={styles.results}>{results.map(result => <li key={result.href}><Link href={result.href}><span className={styles.eyebrow}>{ui[result.kind as 'service'|'city'|'article'|'calculator']}</span><h2>{result.title}</h2><p>{result.description}</p></Link></li>)}</ul>}
    <aside className={styles.topics}><h2>{ui.popular}</h2><div>{ui.topics.map(topic => <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`}>{topic}</Link>)}</div></aside>
  </div>;
}
