import { useId } from "react";

/** Decorative editorial artwork; links and headings carry accessible labels. */
export function HomeIllustration({ kind = "home" }: { kind?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 480 330" fill="none" aria-hidden="true" className={`hf-illustration hf-art-${kind}`}>
      <defs>
        <linearGradient id={id} x1="60" y1="20" x2="400" y2="330" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5EAD6" /><stop offset="1" stopColor="#E3CFA8" />
        </linearGradient>
      </defs>
      <rect width="480" height="330" rx="24" fill={`url(#${id})`} />
      <circle cx="377" cy="68" r="32" fill="#C4A05A" opacity=".55" />
      <path d="M0 251C96 218 170 259 250 236S400 220 480 244V330H0Z" fill="#9FAF91" />
      <path d="M0 290C100 254 200 286 281 269S404 264 480 280V330H0Z" fill="#768A73" />
      <path d="M95 164L224 72L354 164" fill="#713F3C" stroke="#422F31" strokeWidth="8" strokeLinejoin="round" />
      <path d="M115 159H336V269H115Z" fill="#F5E8D1" stroke="#806754" strokeWidth="3" />
      <path d="M102 163H350" stroke="#C3A16B" strokeWidth="5" />
      <path d="M206 203H251V269H206Z" fill="#793D3A" />
      {[143, 275].map(x => <g key={x}><rect x={x} y="189" width="33" height="43" rx="2" fill="#375C62" stroke="#C3A16B" strokeWidth="4" /><path d={`M${x+16} 189V232M${x} 210H${x+33}`} stroke="#E9DCC3" strokeWidth="2" /></g>)}
      <path d="M216 269L184 330H280L240 269" fill="#D9C19A" />
      <path d="M57 270V159M57 191L37 169M57 209L79 187" stroke="#5C6047" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="55" cy="143" rx="37" ry="49" fill="#4F7060" /><circle cx="82" cy="165" r="24" fill="#64816A" />
      <path d="M389 270V193" stroke="#5C6047" strokeWidth="6" /><ellipse cx="389" cy="180" rx="32" ry="43" fill="#4F7060" />
      {(kind === "pool" || kind === "home") && <g><path d="M18 281H164L143 318H0Z" fill="#EEE1C8" /><path d="M29 287H151L136 311H14Z" fill="#3D919A" /><path d="M33 296Q56 288 81 296T133 296" stroke="#B6D6CF" strokeWidth="3" /></g>}
      {kind === "hvac" && <g><rect x="306" y="229" width="62" height="53" rx="6" fill="#375C62" stroke="#EEE1C8" strokeWidth="3" /><circle cx="337" cy="253" r="18" stroke="#DDD1B4" strokeWidth="3" /><path d="M337 238V269M322 253H352M326 242L348 264M326 264L348 242" stroke="#DDD1B4" strokeWidth="2" /><path d="M367 220Q389 206 370 189M381 227Q407 209 389 189" stroke="#375C62" strokeWidth="3" strokeLinecap="round" /></g>}
      {kind === "plumbing" && <g><path d="M120 280H170V249H194" stroke="#B3854B" strokeWidth="15" strokeLinejoin="round" /><path d="M120 280H170V249H194" stroke="#E5C790" strokeWidth="7" strokeLinejoin="round" /><path d="M200 260C185 281 185 290 200 292C215 290 215 281 200 260Z" fill="#3D919A" /></g>}
      {kind === "pest" && <g><path d="M342 210L373 199L404 210V238C404 260 373 279 373 279S342 260 342 238Z" fill="#713F3C" stroke="#F4E5C9" strokeWidth="4" /><path d="M358 237L369 248L391 223" stroke="#F4E5C9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></g>}
      {kind === "lighting" && <g><path d="M102 166L224 79L349 166" stroke="#D5AD5B" strokeWidth="3" />{[125,155,185,215,245,275,305,335].map((x,i)=><circle key={x} cx={x} cy={166-Math.min(i,7-i)*19} r="5" fill="#FFF0B8" stroke="#B68A42" />)}</g>}
      {kind === "landscape" && <g>{[36,95,319,437].map((x,i)=><g key={x}><path d={`M${x} 301V${268-i*3}`} stroke="#3E6251" strokeWidth="3" /><ellipse cx={x-7} cy={281-i*3} rx="10" ry="5" fill="#D6B06A" transform={`rotate(30 ${x-7} ${281-i*3})`} /><circle cx={x} cy={264-i*3} r="8" fill="#9B5148" /></g>)}</g>}
      {kind === "hardscape" && <g><path d="M272 279H445L474 326H292Z" fill="#B09173" stroke="#E6D2AF" strokeWidth="3" /><path d="M282 293H454M287 309H464M312 279L334 326M353 279L375 326M394 279L416 326" stroke="#E6D2AF" strokeWidth="2" /></g>}
    </svg>
  );
}
