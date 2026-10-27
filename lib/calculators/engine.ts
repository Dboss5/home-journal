// All dimensions use US customary units; rates are supplied by the reader.
export type Field = {key: string; unit: string; initial: number; min: number; max: number; integer?: boolean};
const field = (key: string, unit: string, initial: number, min = 0.01, max = 100000, integer = false): Field => ({key, unit, initial, min, max, integer});
export const CALCULATORS = [
  {slug: 'pool-volume', service: 'pool', serviceSlug: 'pool', fields: [field('length','ft',30), field('width','ft',15), field('shallow','ft',3), field('deep','ft',6)]},
  {slug: 'ac-running-cost', service: 'hvac', serviceSlug: 'hvac', fields: [field('watts','W',3000,0,100000), field('hours','h',6,0,24), field('days','',30,1,366,true), field('rate','USD/kWh',0.15,0,100)]},
  {slug: 'water-leak-waste', service: 'plumbing', serviceSlug: 'plumbing', fields: [field('collected','US fl oz',8), field('seconds','s',60,1,86400), field('days','',30,1,366,true), field('waterRate','USD/1,000 US gal',5,0,1000)]},
  {slug: 'holiday-light-cost', service: 'lighting', serviceSlug: 'holiday-lighting', fields: [field('strings','',10,1,10000,true), field('watts','W',7,0,10000), field('hours','h',6,0,24), field('days','',30,1,366,true), field('rate','USD/kWh',0.15,0,100)]},
  {slug: 'mulch-quantity', service: 'landscape', serviceSlug: 'landscape', fields: [field('area','ft²',300), field('depth','in',3,0.01,24), field('bag','ft³',2,0.01,100)]},
  {slug: 'patio-pavers', service: 'hardscape', serviceSlug: 'hardscape', fields: [field('length','ft',12), field('width','ft',10), field('paverLength','in',12,0.1,120), field('paverWidth','in',12,0.1,120), field('waste','%',10,0,100)]},
] as const;
export type Calculator = typeof CALCULATORS[number];
export type CalculatorSlug = Calculator['slug'];
export function getCalculator(slug: string) { return CALCULATORS.find(item => item.slug === slug); }
export function defaults(calc: Calculator): Record<string, string> { return Object.fromEntries(calc.fields.map(f => [f.key, String(f.initial)])); }
export function validInputs(calc: Calculator, values: Record<string, string>): boolean {
  return calc.fields.every(f => values[f.key]?.trim() !== '' && Number.isFinite(Number(values[f.key])) && Number(values[f.key]) >= f.min && Number(values[f.key]) <= f.max && (!f.integer || Number.isInteger(Number(values[f.key]))))
    && (calc.slug !== 'pool-volume' || Number(values.deep) >= Number(values.shallow));
}
export function calculate(calc: Calculator, values: Record<string, string>): number[] | null {
  if (!validInputs(calc, values)) return null;
  const v = Object.fromEntries(Object.entries(values).map(([k,n]) => [k,Number(n)]));
  switch (calc.slug) {
    case 'pool-volume': { const cubicFeet = v.length*v.width*(v.shallow+v.deep)/2; return [cubicFeet*7.48051948051948,cubicFeet*28.316846592]; }
    case 'ac-running-cost': { const kwh = v.watts*v.hours*v.days/1000; return [kwh*v.rate,kwh]; }
    case 'water-leak-waste': { const gallons = (v.collected/128)/v.seconds*86400*v.days; return [gallons,gallons*v.waterRate/1000]; }
    case 'holiday-light-cost': { const kwh = v.strings*v.watts*v.hours*v.days/1000; return [kwh*v.rate,kwh]; }
    case 'mulch-quantity': { const cubicFeet = v.area*v.depth/12; return [cubicFeet/27,Math.ceil(cubicFeet/v.bag)]; }
    case 'patio-pavers': { const area = v.length*v.width; return [Math.ceil(area/(v.paverLength*v.paverWidth/144)*(1+v.waste/100)),area]; }
  }
}
