import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {spawn} from 'node:child_process';
const manifest=JSON.parse(fs.readFileSync(process.argv[2] ?? 'docs/content/seo-blog-batch-2026-10-28.json','utf8'));
assert.equal(Object.keys(manifest).length,10);
const posts=[];
for(const locale of ['en','es','fr']){
 const titles=new Set();
 for(const [slug,item] of Object.entries(manifest)){
  const {data,content}=matter(fs.readFileSync(`content/blog/${locale}/${slug}.mdx`,'utf8'));
  assert.ok(!titles.has(data.title));titles.add(data.title);
  assert.equal(data.date,'2026-10-28');assert.equal(data.showRelated,false);
  assert.equal(data.coverImage,item.image);assert.ok(data.coverImageAlt.length>20);
  assert.ok(fs.existsSync(`public${data.coverImage}`));
  const urls=[...content.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(m=>m[1]);
  assert.equal(urls.length,3);assert.deepEqual([...urls].sort(),[...item.urls].sort());
  const host=item.brand==='Poolburg'?'poolburg.com':'supremacyservice.com';
  assert.equal(urls.filter(url=>new URL(url).hostname===host).length,2);
  assert.ok(!urls.some(url=>new URL(url).hostname===(host==='poolburg.com'?'supremacyservice.com':'poolburg.com')));
  assert.equal((content.match(/^## /gm)||[]).length,3);assert.equal((content.match(/^### /gm)||[]).length,2);
  assert.ok(content.trim().startsWith('**'));assert.ok(content.split(/\s+/).length>240);
  assert.ok(data.excerpt.length>=100 && data.excerpt.length<=200);
  posts.push({locale,slug,data});
 }
}
const port=3157;const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:'pipe'});let timer;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
try{
 await new Promise((resolve,reject)=>{server.stdout.on('data',d=>{if(d.toString().includes('Ready'))resolve()});server.on('exit',()=>reject(Error('Server exited')));timer=setTimeout(()=>reject(Error('Server timeout')),20000)});clearTimeout(timer);
 const get=async(path)=>{const r=await fetch(`http://127.0.0.1:${port}${path}`);assert.equal(r.status,200,path);return r.text()};
 const sitemap=await get('/sitemap.xml');
 const indexes=Object.fromEntries(await Promise.all(['en','es','fr'].map(async l=>[l,await get(`/${l}/blog`)])));
 const descriptions=new Set();
 for(const {locale,slug,data} of posts){
  const path=`/${locale}/blog/${slug}`;const html=await get(path);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,path);
  assert.ok(html.includes(escape(data.title)));assert.ok(html.includes(escape(data.coverImageAlt)));
  assert.ok(html.includes(`<meta name="description" content="${escape(data.excerpt)}"`));
  assert.ok(!descriptions.has(data.excerpt));descriptions.add(data.excerpt);
  assert.match(html,new RegExp(`<link rel="canonical" href="[^"]+${path}"`));
  assert.ok(html.includes('<meta property="og:type" content="article"'));
  assert.ok(html.includes(data.coverImage));
  for(const l of ['en','es','fr','x-default']) assert.ok(html.includes(`hrefLang="${l}"`));
  const json=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const article=json.flatMap(s=>s['@graph']??[]).find(s=>s['@type']==='BlogPosting');
  assert.equal(article.headline,data.title);assert.equal(article.inLanguage,locale);assert.equal(article.description,data.excerpt);assert.ok(article.image.url.endsWith(data.coverImage));
  const body=html.split('class="hf-post-body">')[1].split('<div class="hf-post-trust">')[0];
  assert.equal((body.match(/<a\b/g)||[]).length,3);
  for(const url of manifest[slug].urls) assert.ok(body.includes(`href="${url}"`));
  assert.ok(indexes[locale].includes(`href="${path}"`));assert.ok(sitemap.includes(path));
  if(process.argv[2]) {
    const search=await get(`/${locale}/search?q=${encodeURIComponent(data.title)}`);
    assert.ok(search.includes(`href="${path}"`),`Search discovers ${path}`);
    const serviceSlug=manifest[slug].serviceSlug;
    if(serviceSlug){const service=await get(`/${locale}/services/${serviceSlug}`);assert.ok(service.includes(`href="${path}"`),`Service links ${path}`);}
  }
 }
 for(const item of Object.values(manifest)){const r=await fetch(`http://127.0.0.1:${port}${item.image}`);assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/image/);}
 for(const locale of ['en','es','fr']){
  const results=await get(`/${locale}/search?q=${encodeURIComponent(locale==='en'?'tankless':locale==='es'?'sin tanque':'instantané')}`);
  assert.ok(results.includes(`/${locale}/blog/is-a-tankless-water-heater-worth-it`));
  const service=await get(`/${locale}/services/pool`);assert.ok(service.includes(`/${locale}/blog/why-is-my-pool-losing-water`));
  const old=await get(`/${locale}/blog/why-is-my-pool-cloudy`);assert.ok(old.includes('og:type'));assert.ok(old.includes('BlogPosting'));
 }
 console.log('PASS: 30 localized articles; 90 correct editorial links; 10 local images; unique metadata, canonical/hreflang, social metadata, article schema, sitemap/blog/search discovery, service backlinks and existing-post regression checks.');
}finally{clearTimeout(timer);server.kill()}
