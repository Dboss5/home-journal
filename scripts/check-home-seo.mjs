import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const port=3161;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:'pipe'});
let timer;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
try{
 await new Promise((resolve,reject)=>{server.stdout.on('data',d=>{if(d.toString().includes('Ready'))resolve()});server.once('exit',()=>reject(Error('Server exited')));timer=setTimeout(()=>reject(Error('Server timeout')),20000)});clearTimeout(timer);
 const titles=new Set();const descriptions=new Set();
 const get=async path=>{const res=await fetch(`http://127.0.0.1:${port}${path}`);assert.equal(res.status,200,path);return res.text()};
 for(const locale of ['en','es','fr']){
  const home=JSON.parse(fs.readFileSync(`messages/${locale}.json`,'utf8')).home;
  const html=await get(`/${locale}`);
  const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
  assert.ok(!html.includes('function PlanningTools()'));
  assert.equal((visible.match(/<h1\b/g)||[]).length,1,`${locale}: one H1`);
  assert.ok(visible.includes(escape(home.heroTitle)));assert.ok(!visible.includes('MISSING_MESSAGE'));
  for(const value of [...Object.values(home.serviceDescriptions),home.servicesSub,home.whyBody1,home.whyBody2,home.planningBody,home.journalSub]) assert.ok(visible.includes(escape(value)),`${locale}: visible localized copy`);
  const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);assert.ok(title.includes(escape(home.metaTitle)));
  assert.ok(html.includes(`<meta name="description" content="${escape(home.metaDescription)}"`));assert.ok(!descriptions.has(home.metaDescription));descriptions.add(home.metaDescription);
  assert.match(html,new RegExp(`<link rel="canonical" href="[^"]+/${locale}"`));
  for(const language of ['en','es','fr','x-default'])assert.ok(html.includes(`hrefLang="${language}"`));
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(schema['@graph'].map(s=>s['@type']),['WebSite','WebPage','FAQPage']);
  const faq=schema['@graph'][2];assert.equal(faq.mainEntity.length,4);const faqHtml=visible.split('id="home-questions">')[1].split('</section>')[0];assert.equal((faqHtml.match(/<details\b/g)||[]).length,4);
  for(const [i,item] of home.faqs.entries()){assert.ok(visible.includes(escape(item.q)));assert.ok(visible.includes(escape(item.a)));assert.equal(faq.mainEntity[i].name,item.q);assert.equal(faq.mainEntity[i].acceptedAnswer.text,item.a);}
  for(const slug of ['pool','hvac','pest-control','plumbing','holiday-lighting','landscape','hardscape'])assert.ok(visible.includes(`href="/${locale}/services/${slug}"`));
  for(const slug of ['why-is-my-pool-losing-water','why-is-my-ac-leaking-water','why-is-my-water-heater-not-making-hot-water']){
   assert.ok(visible.includes(`href="/${locale}/blog/${slug}"`));await get(`/${locale}/blog/${slug}`);assert.ok(fs.existsSync(`public/images/blog/${slug}.webp`));
  }
  for(const path of ['/calculators','/our-brands','/quote'])assert.ok(visible.includes(`href="/${locale}${path}"`));
  assert.ok(visible.includes('/images/hero/homefront-backyard.webp')||visible.includes('%2Fimages%2Fhero%2Fhomefront-backyard.webp'));
 }
 console.log('PASS: three localized homepages, one H1, visible service/local/planning copy, unique metadata, canonicals/hreflang, matching four FAQs and schema, seven service links, nine live article links, calculator/brand/quote links and existing hero.');
}finally{clearTimeout(timer);server.kill()}
