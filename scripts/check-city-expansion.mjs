import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const cities=JSON.parse(fs.readFileSync('lib/additionalCities.json','utf8'));
const credits=JSON.parse(fs.readFileSync('lib/cityImageCredits.json','utf8'));
const locales=['en','es','fr'];
const services={'pool':'pool','hvac':'hvac','pest-control':'pest','plumbing':'plumbing','holiday-lighting':'lighting','landscape':'landscape','hardscape':'hardscape'};
assert.equal(cities.length,10);assert.equal(new Set(cities.map(c=>c.slug)).size,10);
const profiles=Object.fromEntries(locales.map(l=>[l,JSON.parse(fs.readFileSync(`lib/cityProfiles.${l}.json`,'utf8'))]));
for(const locale of locales){
 const notes=new Set();const introductions=new Set();
 for(const city of cities){
  const p=profiles[locale][city.slug];assert.ok(p);assert.ok(!introductions.has(p.intro));introductions.add(p.intro);
  assert.equal(p.checks.length,3);assert.equal(p.places.length,3);assert.equal(p.faqs.length,2);
  for(const key of Object.values(services)){const text=p.serviceNotes[key];assert.ok(text.length>70);assert.ok(!notes.has(text));notes.add(text)}
  assert.ok(credits[city.slug].artist);assert.ok(credits[city.slug].licenseUrl.startsWith('http'));assert.ok(credits[city.slug].source.startsWith('https://commons.wikimedia.org/'));
  assert.ok(fs.existsSync(`public/images/cities/${city.slug}.webp`));assert.ok(city.lat>32&&city.lat<34&&city.lng< -96&&city.lng> -98);
 }
 assert.equal(notes.size,70);
}
const port=3167;const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:'pipe'});let timer;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
const get=async path=>{const r=await fetch(`http://127.0.0.1:${port}${path}`);assert.equal(r.status,200,path);return r.text()};
const visible=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
try{
 await new Promise((resolve,reject)=>{server.stdout.on('data',d=>{if(d.toString().includes('Ready'))resolve()});server.once('exit',()=>reject(Error('Server exited')));timer=setTimeout(()=>reject(Error('Server timeout')),20000)});clearTimeout(timer);
 const sitemap=await get('/sitemap.xml');const descriptions=new Set();
 const tasks=locales.flatMap(locale=>cities.flatMap(city=>Object.entries(services).map(([slug,key])=>({locale,city,slug,key}))));
 let completed=0;
 async function check({locale,city,slug,key}){
  const path=`/${locale}/services/${slug}/${city.slug}`;const html=await get(path);const body=visible(html);const p=profiles[locale][city.slug];
  assert.equal((body.match(/<h1\b/g)||[]).length,1,path);
  for(const copy of [p.heading,p.intro,p.context,p.serviceNotes[key],...p.checks,...p.places,...p.faqs.flatMap(f=>[f.q,f.a])])assert.ok(body.includes(escape(copy)),`${path}: personalized copy`);
  assert.ok(body.includes(`/images/cities/${city.slug}.webp`));assert.ok(body.includes(`alt="${escape(p.imageAlt)}"`));
  assert.ok(body.includes(`href="${escape(credits[city.slug].source)}"`));assert.ok(body.includes(`href="${escape(credits[city.slug].licenseUrl)}"`));
  assert.ok(body.includes(`marker=${city.lat}%2C${city.lng}`));assert.match(body,/<iframe[^>]+loading="lazy"/);
  assert.ok(body.includes(`href="/${locale}/quote?service=${key}&amp;city=${city.slug}"`));
  assert.match(html,new RegExp(`<link rel="canonical" href="[^"]+${path}"`));
  for(const l of [...locales,'x-default'])assert.ok(html.includes(`hrefLang="${l}"`));
  const description=html.match(/<meta name="description" content="([^"]+)"/)[1];assert.ok(!descriptions.has(description),path);descriptions.add(description);
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  assert.deepEqual(schemas.map(s=>s['@type']),['Service','BreadcrumbList','FAQPage','WebPage']);
  assert.equal(schemas[0].areaServed.name,city.name);assert.equal(schemas[0].areaServed.geo.latitude,city.lat);assert.equal(schemas[0].provider.name,key==='pool'?'Poolburg':'Supremacy Service');
  assert.equal(schemas[2].mainEntity.length,9);assert.equal((body.match(/<details class="hf-city-faq-item"/g)||[]).length,9);
  for(const f of schemas[2].mainEntity){assert.ok(body.includes(escape(f.name)));assert.ok(body.includes(escape(f.acceptedAnswer.text)));}
  assert.ok(sitemap.includes(path));completed++;
 }
 for(let i=0;i<tasks.length;i+=7)await Promise.all(tasks.slice(i,i+7).map(check));
 assert.equal(completed,210);
 for(const locale of locales){
  const home=await get(`/${locale}`);for(const city of cities)assert.ok(home.includes(`href="/${locale}/services/pool/${city.slug}"`));
  for(const [slug,key] of Object.entries(services)){
   const category=await get(`/${locale}/services/${slug}`);for(const city of cities)assert.ok(category.includes(`href="/${locale}/services/${slug}/${city.slug}"`));
  }
  for(const city of cities){const search=await get(`/${locale}/search?q=${encodeURIComponent(city.name)}`);assert.ok(search.includes(`href="/${locale}/services/pool/${city.slug}"`));}
  for(const old of ['dallas','plano','frisco','mckinney','fort-worth','arlington']){const html=visible(await get(`/${locale}/services/pool/${old}`));assert.equal((html.match(/<details class="hf-city-faq-item"/g)||[]).length,7);}
 }
 for(const city of cities){const r=await fetch(`http://127.0.0.1:${port}/images/cities/${city.slug}.webp`);assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/image/);}
 assert.equal((await fetch(`http://127.0.0.1:${port}/en/services/pool/not-a-city`)).status,404);
 console.log('PASS: 210 new localized city/service pages; 210 tailored notes; 60 local FAQ entries; 10 photo endpoints/credits; maps, unique metadata, canonicals/hreflang, matching FAQ schema, correct brands/quote keys, sitemap, home/category/search discovery, 18 existing-city regressions and invalid-city 404.');
}finally{clearTimeout(timer);server.kill()}
