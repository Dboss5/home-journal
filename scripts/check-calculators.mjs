import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../lib/calculators/engine.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext}}).outputText;
const {CALCULATORS,getCalculator,defaults,calculate}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const near = (actual, expected) => assert.ok(Math.abs(actual-expected)<1e-7, `${actual} != ${expected}`);
const run = (slug, changes = {}) => { const c = getCalculator(slug); return calculate(c, {...defaults(c), ...Object.fromEntries(Object.entries(changes).map(([k,v]) => [k,String(v)]))}); };
// Independently calculated examples, rounding, unit conversions and zero consumption.
near(run('pool-volume')[0], 15148.05194805195);
near(run('pool-volume')[1], 57341.6143488);
near(run('pool-volume',{length:1,width:1,shallow:1,deep:1})[0],1728/231);
near(run('ac-running-cost')[0],81); near(run('ac-running-cost')[1],540);
assert.deepEqual(run('ac-running-cost',{hours:0}),[0,0]);
assert.deepEqual(run('ac-running-cost',{rate:0}),[0,540]);
near(run('water-leak-waste')[0],2700);near(run('water-leak-waste')[1],13.5);
near(run('water-leak-waste',{collected:128,seconds:86400,days:1})[0],1);
near(run('holiday-light-cost')[0],1.89);near(run('holiday-light-cost')[1],12.6);
near(run('mulch-quantity')[0],75/27);assert.equal(run('mulch-quantity')[1],38);
assert.deepEqual(run('mulch-quantity',{area:108,depth:3,bag:3}),[1,9]);
assert.deepEqual(run('patio-pavers'),[132,120]);
assert.deepEqual(run('patio-pavers',{paverLength:6,paverWidth:6,waste:0}),[480,120]);
assert.equal(run('patio-pavers',{length:1,width:1,paverLength:7,paverWidth:7,waste:0})[0],3);
assert.equal(run('pool-volume',{shallow:6,deep:3}),null);
assert.equal(run('holiday-light-cost',{strings:1.5}),null);
assert.equal(run('ac-running-cost',{days:30.5}),null);
assert.equal(run('ac-running-cost',{hours:25}),null);
for(const calc of CALCULATORS) {
  for(const field of calc.fields) {
    for(const bad of ['', ' ', 'NaN', 'Infinity', 'abc', String(field.min-1), String(field.max+1)]) {
      assert.equal(calculate(calc,{...defaults(calc),[field.key]:bad}),null,`${calc.slug}/${field.key} rejects ${bad}`);
    }
  }
  const extremes=Object.fromEntries(calc.fields.map(f => [f.key,String(f.max)]));
  assert.ok(calculate(calc,extremes).every(n => Number.isFinite(n) && n>=0));
}
assert.equal(getCalculator('unknown'),undefined);
for(const locale of ['en','es','fr']) {
  const c=JSON.parse(fs.readFileSync(new URL(`../lib/calculators/${locale}.json`,import.meta.url)));
  for(const calc of CALCULATORS) {
    const copy=c.calculators[calc.slug];
    for(const key of ['title','description','instructions','formula','caveat','question','answer'])assert.ok(copy[key]?.length>10);
    assert.equal(copy.resultLabels.length,2);
    for(const f of calc.fields) assert.ok(c.fields[f.key]);
  }
}
console.log('PASS: six formulas, unit conversions, ceiling rules, zero use, bounds, invalid inputs and EN/ES/FR content.');
