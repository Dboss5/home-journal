"use client";
import { MapPin, ClipboardList, Check, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getCityProfile, getCityUi, getCityImageCredit } from '@/lib/cityProfiles';
import { SERVICE_IMAGES } from '@/lib/serviceImages';
import type { City } from '@/lib/locations';
import type { ServiceGuide } from '@/lib/serviceGuides';

type Props = {city: City; locale: string; serviceKey: string};
export function CityHeroVisual({city,locale,serviceKey,serviceLabel,serviceAlt}: Props & {serviceLabel: string; serviceAlt: string}) {
 const profile=getCityProfile(city.slug,locale);const ui=getCityUi(locale);const credit=getCityImageCredit(city.slug);
 return <div className="hf-city-visual">
  <figure className="hf-city-landmark">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={`/images/cities/${city.slug}.webp`} alt={profile.imageAlt} width={1400} height={900} fetchPriority="high" />
   <figcaption><MapPin size={16} aria-hidden="true" />{city.name}, Texas</figcaption>
  </figure>
  <div className="hf-city-service-inset">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={SERVICE_IMAGES[serviceKey]} alt={serviceAlt} width={260} height={180} />
   <span>{serviceLabel}</span>
  </div>
  <p className="hf-city-photo-credit">{ui.photo}: {credit.artist} · <a href={credit.source}>{credit.title}</a> · <a href={credit.licenseUrl} rel="license">{credit.license}</a> · {ui.adaptation}</p>
 </div>;
}
export function CityLocalContext({city,locale,serviceKey}: Props) {
 const p=getCityProfile(city.slug,locale);const ui=getCityUi(locale);
 return <section id="local-context" className="hf-city-section hf-city-local">
  <p className="accent-label">{ui.localLabel}</p><h2>{p.heading}</h2><p>{p.intro}</p>
  <div className="hf-city-focus"><ClipboardList size={26} aria-hidden="true" /><div><h3>{ui.focus.replace('{city}',city.name)}</h3><p>{p.serviceNotes[serviceKey]}</p></div></div>
  <div className="hf-city-context-grid">{p.checks.map((c,i)=><article key={c}><span>0{i+1}</span><h3>{c}</h3></article>)}</div>
  <p>{p.context}</p>
  <div className="hf-city-places"><span>{ui.places}</span>{p.places.map(place=><span key={place}>{place}</span>)}</div>
  <p className="hf-city-resource">{ui.source}: <a href={p.source.url}>{p.source.label}</a></p>
 </section>;
}
export function CityVisitPlan({city,locale,serviceKey,guide}: Props & {guide: ServiceGuide}) {
 const ui=getCityUi(locale);
 return <>
 <section id="compare-work" className="hf-city-section hf-city-quote">
  <p className="accent-label">{ui.quote}</p><h2>{ui.quoteTitle.replace('{city}',city.name)}</h2>
  <div className="hf-city-quote-grid"><article><h3>{ui.drivers}</h3><ul>{guide.drivers.map(item=><li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul><p className="hf-city-note">{ui.priceNote}</p></article>
  <article className="hf-city-question-sheet"><ClipboardList size={25} aria-hidden="true" /><h3>{ui.ask}</h3><ol>{guide.questions.map(q=><li key={q}>{q}</li>)}</ol></article></div>
 </section>
 <section id="plan-visit" className="hf-city-section hf-city-visit">
  <p className="accent-label">{ui.visit}</p><h2>{ui.prepareTitle.replace('{city}',city.name)}</h2>
  <ol>{guide.prepare.map((text,i)=><li key={text}><span>{ui.step} 0{i+1}</span><p>{text}</p></li>)}</ol>
 </section>
 </>;
}
export function CityReading({locale,reading}: {locale: string;reading: {slug: string;title: string;excerpt: string}[]}) {
 const ui=getCityUi(locale);if(!reading.length)return null;
 return <section className="hf-city-section"><h2>{ui.readingTitle}</h2><div className="hf-city-reading-grid">{reading.map(p=><Link href={`/blog/${p.slug}`} key={p.slug}><BookOpen size={24} aria-hidden="true" /><h3>{p.title}</h3><p>{p.excerpt}</p><span>{ui.read}</span></Link>)}</div></section>;
}
export function CityMap({city,locale}: {city: City;locale: string}) {
 const ui=getCityUi(locale);const bbox=[city.lng-.045,city.lat-.028,city.lng+.045,city.lat+.028].join(',');
 const mapUrl=`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${city.lat}%2C${city.lng}`;
 const link=`https://www.openstreetmap.org/?mlat=${city.lat}&mlon=${city.lng}#map=12/${city.lat}/${city.lng}`;
 return <section id="city-map" className="hf-city-section hf-city-map-section"><div><p className="accent-label">{ui.map}</p><h2>{ui.mapTitle.replace('{city}',city.name)}</h2><p>{ui.mapNote}</p><a href={link}>{ui.openMap}</a></div>
 <div className="hf-city-map"><iframe title={ui.mapFrame.replace('{city}',city.name)} src={mapUrl} width="800" height="380" loading="lazy" referrerPolicy="no-referrer" /><p>© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</p></div>
 </section>;
}
