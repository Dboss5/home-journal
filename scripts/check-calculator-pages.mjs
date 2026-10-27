// Run after npm run build. Checks the production HTML, metadata and discovery paths.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const port=3138;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:'pipe'});
const routes={'pool-volume':['pool','pool'],'ac-running-cost':['hvac','hvac'],'water-leak-waste':['plumbing','plumbing'],'holiday-light-cost':['holiday-lighting','lighting'],'mulch-quantity':['landscape','landscape'],'patio-pavers':['hardscape','hardscape']};
let timer;
const escape=s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
async function page(path){const r=await fetch(`http://127.0.0.1:${port}${path}`);assert.equal(r.status,200,path);return r.text();}
try {
  await new Promise((resolve,reject)=>{server.stdout.on('data',d=>{if(d.toString().includes('Ready'))resolve()});server.once('exit',()=>reject(Error('Server exited')));timer=setTimeout(()=>reject(Error('Server timeout')),20000)});clearTimeout(timer);
  const sitemap=await page('/sitemap.xml');
  const descriptions=new Set();
  for(const locale of ['en','es','fr']){
    const content=JSON.parse(fs.readFileSync(`lib/calculators/${locale}.json`,'utf8'));
    const hub=await page(`/${locale}/calculators`);
    assert.equal((hub.match(/<h1\b/g)||[]).length,1);
    assert.ok(hub.includes(escape(content.ui.title)));
    for(const [slug,[service,key]] of Object.entries(routes)){
      const path=`/${locale}/calculators/${slug}`;
      assert.ok(hub.includes(`href="${path}"`),`hub links ${path}`);
      assert.ok(sitemap.includes(path),`sitemap includes ${path}`);
      const html=await page(path);
      const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
      const copy=content.calculators[slug];
      assert.equal((visible.match(/<h1\b/g)||[]).length,1,path);
      assert.ok(visible.includes(escape(copy.title)));
      assert.ok(visible.includes(escape(copy.question)));
      assert.ok(visible.includes(escape(copy.answer)));
      assert.ok(visible.includes('aria-live="polite"'));
      assert.ok(visible.includes('type="number"'));
      assert.ok(visible.includes('aria-describedby="hint-'));
      assert.ok(visible.includes(`href="/${locale}/services/${service}"`));
      assert.ok(visible.includes(`href="/${locale}/quote?service=${key}"`));
      assert.ok(visible.includes(`/images/services/${key}.webp`));
      assert.ok(html.includes(`<html lang="${locale}"`));
      assert.match(html,new RegExp(`<link rel="canonical" href="[^"]+${path}"`));
      for(const language of ['en','es','fr','x-default'])assert.ok(html.includes(`hrefLang="${language}"`));
      const description=html.match(/<meta name="description" content="([^"]+)"/)[1];
      assert.ok(!descriptions.has(description),'unique description');descriptions.add(description);
      const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
      assert.deepEqual(schema['@graph'].map(x=>x['@type']),['WebPage','BreadcrumbList','FAQPage']);
      assert.equal(schema['@graph'][2].mainEntity[0].acceptedAnswer.text,copy.answer);
      const serviceHtml=await page(`/${locale}/services/${service}`);
      assert.ok(serviceHtml.includes(`href="${path}"`),`service links ${path}`);
    }
    assert.ok(sitemap.includes(`/${locale}/calculators`));
  }
  assert.equal((await fetch(`http://127.0.0.1:${port}/en/calculators/unknown`)).status,404);
  console.log('PASS: 21 calculator routes, 18 service backlinks, sitemap, unique metadata, hreflang, structured data, accessible fields, photos, matching quote parameters and unknown-slug 404.');
} finally {clearTimeout(timer);server.kill();}
