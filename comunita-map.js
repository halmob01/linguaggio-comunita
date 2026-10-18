/* Illustrazioni SVG: società e relazioni, senza asset medievali. */
(function mountCommunityMap(root) {
  'use strict';
  const RED='#146b78', INK='#172d3b', PAPER='#f4f8f7', SAND='#d6e6df', GOLD='#d5ad67', TEAL='#4a8b74';
  const safe=n=>Number.isFinite(Number(n))?Math.max(0,Math.min(100,Number(n))):60;
  const person=(x,y,s=1,color=RED)=>`<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><circle cx="0" cy="-17" r="8" fill="${SAND}"/><path d="M-11-5H11L15 21H-15Z" fill="${color}"/><path d="M-7 22L-11 37M7 22L11 37M-12 3L-21 18M12 3L21 18" fill="none"/></g>`;
  const house=(x,y,w=74,color=RED)=>`<g transform="translate(${x} ${y})" stroke="${INK}" stroke-width="3" stroke-linejoin="round"><rect width="${w}" height="56" fill="#fff"/><path d="M-8 1L${w/2} -32L${w+8} 1Z" fill="${color}"/><path d="M${w/2-9} 56V28h18v28" fill="${SAND}"/><rect x="10" y="13" width="14" height="14" fill="${GOLD}"/></g>`;
  const background=(title)=>`<rect width="480" height="270" fill="${PAPER}"/><circle cx="421" cy="43" r="24" fill="${GOLD}" opacity=".5"/><path d="M0 215Q80 192 160 213T320 201T480 210V270H0Z" fill="#e2d6c4"/><text x="20" y="28" fill="${INK}" font-family="sans-serif" font-weight="800" letter-spacing="1.6" font-size="10">${title}</text>`;
  const people=(count,startX=95,y=218,step=45)=>Array.from({length:count},(_,i)=>person(startX+i*step,y,.52,i%3===0?RED:i%3===1?TEAL:INK)).join('');
  const links=(coords)=>`<g fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="5 7" opacity=".75">${coords.map(([x,y,xx,yy])=>`<path d="M${x} ${y}Q${(x+xx)/2} ${Math.min(y,yy)-30} ${xx} ${yy}"/>`).join('')}</g>`;
  function town(v={},kind='villaggio'){
    const resources=safe(v.risorse),trust=safe(v.fiducia),cohesion=safe(v.coesione);
    const n=Math.max(2,Math.ceil(cohesion/20));
    const crates=Math.max(1,Math.ceil(resources/20));
    const t=trust>65?'#cde8dc':trust<35?'#e8d7c7':'#e2efec';
    return `<g><path d="M0 206H480V270H0Z" fill="${t}"/><path d="M0 210H480" stroke="${INK}" stroke-width="3"/>
      ${house(39,130,94,TEAL)}${house(191,139,88,RED)}${house(342,126,95,GOLD)}
      ${Array.from({length:crates},(_,i)=>`<rect x="${24+i*22}" y="247" width="18" height="18" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>`).join('')}
      ${people(n,180,231,Math.min(46,230/n))}
      <circle cx="235" cy="172" r="13" fill="${trust>40?TEAL:RED}" stroke="${INK}" stroke-width="3"/>
      <path d="M214 172h42M235 151v42" stroke="#fff" stroke-width="3"/>
      ${kind==='crisi'?`<path d="M380 118Q368 89 390 69Q385 96 402 104Q415 83 407 69Q440 107 427 130Z" fill="${RED}"><animate attributeName="opacity" values=".8;1;.8" dur="1.7s" repeatCount="indefinite"/></path><path d="M356 75Q340 60 349 43M375 69Q358 53 371 37" stroke="#a39b9c" fill="none" stroke-width="5"/>`:''}
      </g>`;
  }
  function network(){
    const circles=[[90,137],[189,96],[285,159],[388,106],[223,217]];
    return `${links([[90,137,189,96],[189,96,285,159],[285,159,388,106],[90,137,223,217],[223,217,285,159]])}
      ${circles.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="33" fill="${i===2?'#f4d9d8':'#ffffff'}" stroke="${INK}" stroke-width="3"/>${person(x,y+12,.54,i===2?RED:TEAL)}`).join('')}`;
  }
  function speech(){
    return `${people(3,75,218,155)}<path d="M60 65h150q14 0 14 14v54q0 14-14 14h-70l-24 23v-23H60q-13 0-13-14V79q0-14 13-14Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M78 94h115M78 113h86" stroke="${RED}" stroke-width="7" stroke-linecap="round"/><path d="M284 56h141v82H344l-26 22v-22h-34Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M305 82h95M305 106h69" stroke="${TEAL}" stroke-width="7" stroke-linecap="round"/>`;
  }
  function exchange(){
    return `${house(38,119,95,TEAL)}${house(347,119,95,RED)}
      <path d="M144 145H335" stroke="${INK}" stroke-width="4" stroke-dasharray="8 8"/>
      <path d="M289 134l29 11-29 11" fill="none" stroke="${INK}" stroke-width="4"/>
      <circle cx="241" cy="148" r="43" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>
      <circle cx="241" cy="148" r="29" fill="none" stroke="${INK}" stroke-width="3"/>
      <path d="M223 151l12 12 24-31" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
      ${person(88,240,.63,TEAL)}${person(405,240,.63,RED)}
      <path d="M181 246h111" stroke="${RED}" stroke-width="3" stroke-dasharray="6 6"/>`;
  }
  function assembly(){
    return `${town({},'patto')}<g transform="translate(268 55)"><rect width="145" height="78" rx="3" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M18 20h109M18 38h90M18 56h102" stroke="${RED}" stroke-width="6" stroke-linecap="round"/></g>`;
  }
  function memory(v){
    return `${town(v)}<g transform="translate(129 39)" stroke="${INK}" stroke-width="3">
     <rect x="0" y="0" width="215" height="145" fill="#fff" />
     <rect x="-10" y="0" width="23" height="145" rx="10" fill="${SAND}"/>
     <rect x="205" y="0" width="23" height="145" rx="10" fill="${SAND}"/>
     <circle cx="113" cy="46" r="15" fill="${GOLD}" />
     <path d="M93 69h40l16 39h-74Z" fill="${RED}"/>
     <path d="M44 120h135" stroke="${TEAL}" stroke-width="5" stroke-linecap="round"/>
     </g>`;
  }
  function coverArt(kind,v){
    if(kind==='reti')return network();
    if(kind==='parole')return speech();
    if(kind==='scambi'||kind==='mercato')return exchange();
    if(kind==='progetto')return `${town(v)}<g stroke="${RED}" stroke-width="4" stroke-dasharray="5 7" fill="none"><path d="M23 199V73h434v126"/></g>`;
    if(kind==='patto')return assembly();
    if(kind==='memoria'||kind==='ponte')return memory(v);
    return town(v,kind);
  }
  function markup(kind='villaggio',values={}) {
    const titles={reti:'01 / COLLABORARE',parole:'02 / LINGUAGGIO',scambi:'03 / CONVENZIONI',villaggio:'04 / VITA SOCIALE',progetto:'05 / UNA NUOVA CITTÀ',patto:'IL PATTO',mercato:'GLI SCAMBI',crisi:'LA CRISI',memoria:'LA MEMORIA',ponte:'VERSO L’EPICA'};
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" role="img" aria-label="${titles[kind]||'La comunità'}" preserveAspectRatio="xMidYMid meet">
     ${background(titles[kind]||'LA COMUNITÀ')}${coverArt(kind,values)}</svg>`;
  }
  const api={markup};
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ComunitaMap=api;
})(typeof globalThis==='object'?globalThis:this);
