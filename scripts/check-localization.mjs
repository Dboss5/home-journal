import fs from 'node:fs';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import {serialize} from 'next-mdx-remote/serialize';
const locales=['en','es','fr'];
const messages=Object.fromEntries(locales.map(l=>[l,JSON.parse(fs.readFileSync(`messages/${l}.json`,'utf8'))]));
function flatten(value,prefix=''){return Object.entries(value).flatMap(([k,v])=>v!==null&&typeof v==='object'?flatten(v,prefix+k+'.'):[[prefix+k,v]]);}
const reference=new Map(flatten(messages.en));
for(const locale of locales){const entries=new Map(flatten(messages[locale]));assert.deepEqual([...entries.keys()].sort(),[...reference.keys()].sort(),`${locale}: message keys`);for(const [key,value] of entries){assert.ok(value.trim(),`${locale}: empty ${key}`);assert.deepEqual([...value.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort(),[...reference.get(key).matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort(),`${locale}: placeholders ${key}`);}}
const source=fs.readFileSync('lib/serviceGuides.ts','utf8');const en=JSON.parse(source.slice(source.indexOf('{',source.indexOf('export const SERVICE_GUIDES')),source.lastIndexOf(';')));
for(const locale of ['es','fr']){const guides=JSON.parse(fs.readFileSync(`lib/serviceGuides.${locale}.json`,'utf8'));assert.deepEqual(Object.keys(guides).sort(),Object.keys(en).sort());for(const [key,guide]of Object.entries(guides)){assert.deepEqual(flatten(guide).map(([k])=>k).sort(),flatten(en[key]).map(([k])=>k).sort());for(const field of ['scenarios','scope','drivers','prepare','questions','faqs'])assert.equal(guide[field].length,en[key][field].length);assert.equal(guide.article,en[key].article);assert.equal(guide.source.url,en[key].source.url);assert.notEqual(guide.intro,en[key].intro);}}
for(const locale of locales)for(const slug of ['pool-service-cost-dfw','hvac-repair-cost-dfw','plumbing-cost-dfw']){const {data,content}=matter(fs.readFileSync(`content/blog/${locale}/${slug}.mdx`,'utf8'));assert.ok(data.title&&data.excerpt);assert.ok(!content.includes('$'));await serialize(content);}
console.log('PASS: message key/placeholder parity, all 21 service-guide shapes, nine MDX articles');
