import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const port=3120;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:'pipe'});
let timer;
try {
 await new Promise((resolve,reject)=>{server.stdout.on('data',d=>{if(d.toString().includes('Ready'))resolve()});server.on('exit',()=>reject(Error('Server exited')));timer=setTimeout(()=>reject(Error('Server timeout')),15000)});clearTimeout(timer);
 const slugs=['pool','hvac','pest-control','plumbing','holiday-lighting','landscape','hardscape'];
 let count=0;
 for(const locale of ['en','es','fr']) {
  const m=JSON.parse(fs.readFileSync(`messages/${locale}.json`,'utf8'));
  for(const path of ['', '/about','/quote?service=pest','/blog',...slugs.map(s=>'/services/'+s),...['pool-service-cost-dfw','hvac-repair-cost-dfw','plumbing-cost-dfw'].map(s=>'/blog/'+s)]) {
   const res=await fetch(`http://127.0.0.1:${port}/${locale}${path}`);assert.equal(res.status,200,`${locale}${path}`);const html=await res.text();assert.match(html,new RegExp(`<html[^>]*lang="${locale}"`));
   const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
   assert.ok(!visible.includes('MISSING_MESSAGE'),`${locale}${path}: missing message`);
   if(path===''){assert.ok(visible.includes(m.home.poolCardTitle.replaceAll('&','&amp;')));}
   if(path.startsWith('/services/')){assert.ok(visible.includes(m.serviceGuide.discuss));assert.ok(visible.includes(`/${locale}/quote?service=`));assert.equal((visible.match(/<details /g)||[]).length,3);if(locale!=='en')for(const text of ['Discuss your project','homeowner guide','THE HOMEFRONT FIELD GUIDE','A useful quote explains','Our connection to'])assert.ok(!visible.includes(text),`${locale}${path}: English ${text}`);}
   if(path.startsWith('/blog/')&&locale!=='en'){assert.ok(!visible.includes('min read'));assert.ok(!visible.includes('Visit site'));assert.ok(!visible.includes('2025 Guide'));}
   count++;
  }
 }
 console.log(`PASS: ${count} localized routes, document languages, translated cards/service labels, FAQs and locale-preserving quote links`);
} finally {clearTimeout(timer);server.kill();}
