/* ═══════════════════════════════════════════════════════════════
   LAKSHYA CHHAJED — PORTFOLIO SCRIPT v4.0  (Multi-Page)
   ═══════════════════════════════════════════════════════════════ */

/* ─── TOOL DATA ──────────────────────────────────────────────── */
const TOOLS=[
  {name:'AWS',      hex:'#FF9900',slug:'amazonaws/FF9900',     abbr:'AWS'},
  {name:'Docker',   hex:'#2496ED',slug:'docker/2496ED',        abbr:'DO'},
  {name:'K8s',      hex:'#326CE5',slug:'kubernetes/326CE5',    abbr:'K8s'},
  {name:'Terraform',hex:'#7B42BC',slug:'terraform/FFFFFF',     abbr:'TF'},
  {name:'GCP',      hex:'#4285F4',slug:'googlecloud/4285F4',   abbr:'GCP'},
  {name:'GitHub',   hex:'#8B949E',slug:'github/FFFFFF',        abbr:'GH'},
  {name:'Helm',     hex:'#277A9F',slug:'helm/277A9F',          abbr:'HLM'},
  {name:'Grafana',  hex:'#F46800',slug:'grafana/F46800',       abbr:'GRF'},
  {name:'Prometheus',hex:'#E6522C',slug:'prometheus/E6522C',   abbr:'PRM'},
  {name:'ArgoCD',   hex:'#EF7B4D',slug:'argo/EF7B4D',         abbr:'ARG'},
  {name:'Jenkins',  hex:'#D24939',slug:'jenkins/D24939',       abbr:'JNK'},
  {name:'Python',   hex:'#3776AB',slug:'python/3776AB',        abbr:'PY'},
  {name:'Linux',    hex:'#FCC624',slug:'linux/000000',         abbr:'NIX'},
  {name:'Loki',     hex:'#F5A623',slug:'grafana/F5A623',       abbr:'LKI'},
];

function hexToRgb(hex){
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

/* ─── PAGE TRANSITION ────────────────────────────────────────── */
(function(){
  const overlay=document.getElementById('ptOverlay');
  if(!overlay||typeof gsap==='undefined') return;

  /* Enter: slide overlay away upward */
  gsap.set(overlay,{scaleY:1,transformOrigin:'top'});
  gsap.to(overlay,{scaleY:0,duration:.65,ease:'power4.inOut',delay:.05});

  /* Exit: intercept page-link clicks */
  document.addEventListener('click',e=>{
    const link=e.target.closest('a.page-link');
    if(!link) return;
    const href=link.getAttribute('href');
    if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto')) return;
    e.preventDefault();
    gsap.set(overlay,{scaleY:0,transformOrigin:'bottom'});
    gsap.to(overlay,{scaleY:1,duration:.5,ease:'power4.inOut',onComplete:()=>{window.location.href=href;}});
  });
})();

/* ─── ACTIVE NAV LINK ────────────────────────────────────────── */
(function(){
  const page=document.documentElement.dataset.page||'home';
  document.querySelectorAll('.nav-links a[data-nav]').forEach(a=>{
    if(a.dataset.nav===page) a.classList.add('active');
  });
})();

/* ─── TEXT SCRAMBLE ──────────────────────────────────────────── */
function scramble(el,final,dur=1000){
  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  let f=0; const tot=Math.floor(dur/40);
  const iv=setInterval(()=>{
    el.textContent=final.split('').map((ch,i)=>{
      if(ch===' ') return ' ';
      if(i<(f/tot)*final.length) return ch;
      return chars[Math.floor(Math.random()*chars.length)];
    }).join('');
    if(++f>tot){el.textContent=final;clearInterval(iv);}
  },40);
}
document.querySelectorAll('.scramble').forEach(el=>{
  const txt=el.dataset.text||el.textContent;
  el.dataset.text=txt;
  new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;scramble(el,txt);o.disconnect();},{threshold:.5}).observe(el);
});

/* ─── FLOATING LOGO GRID + DEVOPS CITY ──────────────────────── */
function buildLogoGrid(){
  const grid=document.getElementById('logoGrid');
  const city=document.getElementById('devopsCity');
  if(!grid) return;

  if(city){
    const ct=[...TOOLS,...TOOLS.slice(0,5)];
    ct.forEach((t,i)=>{
      const rgb=hexToRgb(t.hex);
      const bw=44+Math.floor(Math.random()*44);
      const bh=55+Math.floor(Math.random()*110);
      const b=document.createElement('div');
      b.className='city-building';
      b.style.cssText=`left:${((i/ct.length)*98).toFixed(1)}%;width:${bw}px;height:${bh}px;--brand-rgb:${rgb};animation-delay:-${(i*.38).toFixed(2)}s;animation-duration:${(5+Math.random()*3).toFixed(1)}s`;
      const img=document.createElement('img');
      img.src=`https://cdn.simpleicons.org/${t.slug}`;
      img.className='city-logo'; img.alt='';
      img.onerror=()=>{img.remove();const sp=document.createElement('span');sp.style.cssText=`font-family:monospace;font-size:.55rem;font-weight:800;color:rgba(${rgb},.35);padding-top:4px;`;sp.textContent=t.abbr;b.appendChild(sp);};
      b.appendChild(img); city.appendChild(b);
    });
  }

  TOOLS.forEach((t,i)=>{
    const rgb=hexToRgb(t.hex);
    const item=document.createElement('div');
    item.className='logo-float-item';
    item.style.setProperty('--float-delay',`-${(i*.45).toFixed(2)}s`);
    item.style.setProperty('--float-dur',`${(3.2+(i%4)*.5).toFixed(1)}s`);
    item.style.setProperty('--brand-rgb',rgb);
    const badge=document.createElement('div'); badge.className='logo-badge';
    const img=document.createElement('img');
    img.src=`https://cdn.simpleicons.org/${t.slug}`; img.alt=t.name; img.crossOrigin='anonymous';
    img.onerror=()=>{img.remove();const fb=document.createElement('span');fb.className='logo-badge-fallback';fb.textContent=t.abbr;badge.appendChild(fb);};
    badge.appendChild(img);
    const label=document.createElement('div'); label.className='logo-float-label'; label.textContent=t.name;
    item.appendChild(badge); item.appendChild(label); grid.appendChild(item);
    item.addEventListener('mouseenter',()=>badge.style.animationPlayState='paused');
    item.addEventListener('mouseleave',()=>badge.style.animationPlayState='');
  });
}

/* ─── MARQUEE LOGOS (index page) ────────────────────────────── */
(function(){
  const tracks=document.querySelectorAll('.marquee-track');
  if(!tracks.length) return;
  tracks.forEach(track=>{
    TOOLS.forEach(t=>{
      const item=document.createElement('div');
      item.className='marquee-item';
      const img=document.createElement('img');
      img.src=`https://cdn.simpleicons.org/${t.slug}`; img.alt=t.name;
      img.onerror=()=>img.remove();
      item.appendChild(img);
      item.appendChild(document.createTextNode(t.name));
      track.appendChild(item);
    });
  });
  /* Duplicate for seamless loop */
  tracks.forEach(track=>{
    const clone=track.cloneNode(true);
    clone.setAttribute('aria-hidden','true');
    track.parentElement.appendChild(clone);
  });
})();

/* ─── DASHBOARD BARS ANIMATION ───────────────────────────────── */
(function(){
  const fills=document.querySelectorAll('.dash-bar-fill');
  if(!fills.length) return;
  new IntersectionObserver(([e],o)=>{
    if(!e.isIntersecting) return;
    fills.forEach(f=>{f.style.width=f.dataset.pct||'0%';});
    o.disconnect();
  },{threshold:.4}).observe(fills[0]);
})();

/* ─── LOADER ─────────────────────────────────────────────────── */
(function(){
  const fill=document.getElementById('loaderFill');
  const status=document.getElementById('loaderStatus');
  const loader=document.getElementById('loader');
  if(!loader) return;
  const msgs=['Booting infrastructure...','Provisioning Terraform...','Deploying containers...','Scaling Kubernetes...','Portfolio ready ✓'];
  let pct=0;
  const iv=setInterval(()=>{
    pct+=Math.random()*22+8; if(pct>100) pct=100;
    fill.style.width=pct+'%';
    status.textContent=msgs[Math.min(Math.floor(pct/25),msgs.length-1)];
    if(pct>=100){clearInterval(iv);setTimeout(()=>{loader.classList.add('hidden');startHeroAnim();},300);}
  },160);
})();

/* ─── TYPED HERO ─────────────────────────────────────────────── */
function initTyped(){
  const el=document.getElementById('typed'); if(!el) return;
  const phrases=['DevOps Lead Engineer','AWS & GCP Architect','Kubernetes Specialist','Terraform Expert','Infrastructure Automator'];
  let pi=0,ci=0,del=false;
  function type(){
    const cur=phrases[pi];
    el.textContent=del?cur.slice(0,ci-1):cur.slice(0,ci+1);
    del?ci--:ci++;
    if(!del&&ci===cur.length){del=true;setTimeout(type,2200);return;}
    if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;}
    setTimeout(type,del?32:68);
  }
  setTimeout(type,1800);
}

/* ─── HERO ENTRANCE ──────────────────────────────────────────── */
function startHeroAnim(){
  if(typeof gsap!=='undefined'){
    gsap.timeline()
      .to('.hero-greeting',{opacity:1,y:0,duration:.7,ease:'power3.out'})
      .to('.hero-name',    {opacity:1,y:0,duration:.8,ease:'power3.out'},'-=.4')
      .to('.hero-terminal',{opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.5')
      .to('.hero-sub',     {opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.4')
      .to('.hero-btns',    {opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.4')
      .to('.hero-badges',  {opacity:1,y:0,duration:.5,ease:'power3.out'},'-=.3')
      .to('.hero-dashboard',{opacity:1,y:0,scale:1,duration:.8,ease:'power3.out'},'-=.8');
  } else {
    document.querySelectorAll('.hero-content>*,.hero-dashboard').forEach(el=>el.style.opacity=1);
  }
  buildLogoGrid();
  initTyped();
}

/* ─── GSAP SCROLL TRIGGERS ────────────────────────────────────── */
(function(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined'){
    document.querySelectorAll('.gsap-title,.gsap-up,.gsap-skill,.gsap-timeline,.gsap-cert').forEach(el=>el.classList.add('animated'));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.gsap-title').forEach(el=>{
    ScrollTrigger.create({trigger:el,start:'top 85%',onEnter:()=>{gsap.to(el,{opacity:1,x:0,duration:.8,ease:'power3.out'});el.classList.add('animated');}});
  });
  document.querySelectorAll('.gsap-up').forEach(el=>{
    const d=parseFloat(getComputedStyle(el).getPropertyValue('--delay')||'0');
    ScrollTrigger.create({trigger:el,start:'top 88%',onEnter:()=>{gsap.to(el,{opacity:1,y:0,delay:d,duration:.8,ease:'power3.out'});el.classList.add('animated');}});
  });
  const skills=document.querySelectorAll('.gsap-skill');
  if(skills.length){
    ScrollTrigger.create({trigger:skills[0],start:'top 85%',onEnter:()=>{gsap.to(skills,{opacity:1,scale:1,y:0,duration:.55,stagger:.07,ease:'back.out(1.5)'});skills.forEach(e=>e.classList.add('animated'));}});
  }
  document.querySelectorAll('.gsap-timeline').forEach((el,i)=>{
    ScrollTrigger.create({trigger:el,start:'top 88%',onEnter:()=>{gsap.to(el,{opacity:1,x:0,delay:i*.15,duration:.8,ease:'power3.out'});el.classList.add('animated');}});
  });
  const certs=document.querySelectorAll('.gsap-cert');
  if(certs.length){
    ScrollTrigger.create({trigger:certs[0],start:'top 85%',onEnter:()=>{gsap.to(certs,{opacity:1,y:0,duration:.6,stagger:.1,ease:'power3.out'});certs.forEach(e=>e.classList.add('animated'));}});
  }
  const logoGrid=document.getElementById('logoGrid');
  if(logoGrid){
    ScrollTrigger.create({trigger:logoGrid,start:'top 88%',onEnter:()=>{
      const items=document.querySelectorAll('.logo-float-item');
      gsap.set(items,{opacity:0,y:35,scale:.75});
      gsap.to(items,{opacity:1,y:0,scale:1,duration:.55,stagger:.06,ease:'back.out(1.5)'});
    }});
  }

  /* Whatido cards stagger */
  const wiCards=document.querySelectorAll('.whatido-card');
  if(wiCards.length){
    gsap.set(wiCards,{opacity:0,y:30});
    ScrollTrigger.create({trigger:wiCards[0],start:'top 85%',onEnter:()=>{
      gsap.to(wiCards,{opacity:1,y:0,duration:.6,stagger:.1,ease:'power3.out'});
    }});
  }

  /* Hero parallax */
  const heroContent=document.querySelector('.hero-content');
  if(heroContent){
    gsap.to('.hero-content',{y:-60,opacity:.4,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  }
})();

/* ─── COUNTER ────────────────────────────────────────────────── */
(function(){
  document.querySelectorAll('.counter').forEach(el=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return;
      const target=parseInt(el.dataset.target,10),dur=1400;
      let cur=0;
      const step=setInterval(()=>{cur++;el.textContent=cur;if(cur>=target)clearInterval(step);},dur/target);
      obs.disconnect();
    },{threshold:.5});
    obs.observe(el);
  });
})();

/* ─── CUSTOM CURSOR ──────────────────────────────────────────── */
(function(){
  const dot=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
  if(!dot||!ring||'ontouchstart' in window) return;
  let rx=0,ry=0;
  window.addEventListener('mousemove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';rx+=(e.clientX-rx)*.14;ry+=(e.clientY-ry)*.14;});
  (function raf(){ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(raf);})();
  document.querySelectorAll('a,button,.glass-card,.contact-item,.logo-float-item,.whatido-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });
})();

/* ─── MAGNETIC BUTTONS ───────────────────────────────────────── */
(function(){
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.28}px,${(e.clientY-r.top-r.height/2)*.28}px)`;});
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
})();

/* ─── VANILLA TILT ───────────────────────────────────────────── */
(function(){
  if(typeof VanillaTilt==='undefined') return;
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'),{max:8,speed:400,glare:true,'max-glare':.1});
})();

/* ─── NAV / SCROLL ───────────────────────────────────────────── */
(function(){
  const nav=document.getElementById('navbar'),btt=document.getElementById('backToTop');
  window.addEventListener('scroll',()=>{
    if(nav) nav.classList.toggle('scrolled',scrollY>50);
    if(btt) btt.classList.toggle('show',scrollY>400);
  },{passive:true});
  const btn=document.getElementById('hamburger'),nl=document.getElementById('navLinks');
  if(btn&&nl){
    btn.addEventListener('click',()=>nl.classList.toggle('open'));
    nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('open')));
    document.addEventListener('click',e=>{if(!btn.contains(e.target)&&!nl.contains(e.target))nl.classList.remove('open');});
  }
})();

/* ─── INTERACTIVE TERMINAL ────────────────────────────────────── */
(function(){
  const overlay=document.getElementById('termOverlay'),body=document.getElementById('termBody'),
    input=document.getElementById('termInput'),fab=document.getElementById('termFab'),
    closeBtn=document.getElementById('termClose'),sugBox=document.getElementById('termSuggestions');
  if(!overlay) return;

  const CMDS={
    help:cmdHelp,whoami:cmdWhoami,about:cmdAbout,skills:cmdSkills,
    certifications:cmdCerts,certs:cmdCerts,experience:cmdExperience,exp:cmdExperience,
    education:cmdEducation,edu:cmdEducation,contact:cmdContact,
    clear:cmdClear,exit:cmdExit,close:cmdExit,banner:cmdBanner,
  };
  const ALL=[...new Set(Object.keys(CMDS))];
  let hist=[],histIdx=-1,booted=false;

  function open(){overlay.classList.add('open');input.focus();if(!booted){booted=true;cmdBanner();}}
  function close(){overlay.classList.remove('open');}
  fab.addEventListener('click',open);
  closeBtn.addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close();});

  input.addEventListener('keydown',e=>{
    if(e.key==='Enter'){const r=input.value.trim();input.value='';updateSugg('');if(!r)return;hist.unshift(r);histIdx=-1;echoCmd(r);blank();run(r.toLowerCase().split(/\s+/));blank();return;}
    if(e.key==='ArrowUp'){e.preventDefault();if(histIdx<hist.length-1){histIdx++;input.value=hist[histIdx];}return;}
    if(e.key==='ArrowDown'){e.preventDefault();histIdx>0?(histIdx--,input.value=hist[histIdx]):(histIdx=-1,input.value='');return;}
    if(e.key==='Tab'){e.preventDefault();const m=ALL.find(c=>c.startsWith(input.value.trim())&&c!==input.value.trim());if(m){input.value=m;updateSugg(m);}}
  });
  input.addEventListener('input',()=>updateSugg(input.value.trim().toLowerCase()));

  function updateSugg(v){
    sugBox.innerHTML='';
    const list=v?ALL.filter(c=>c.startsWith(v)):['help','skills','certs','experience','contact'];
    list.forEach(c=>{const ch=document.createElement('button');ch.className='term-sug-chip'+(c===v?' active':'');ch.textContent=c;ch.addEventListener('click',()=>{input.value=c;input.focus();updateSugg(c);});sugBox.appendChild(ch);});
  }

  function html(h){const d=document.createElement('div');d.innerHTML=h;body.appendChild(d);body.scrollTop=body.scrollHeight;}
  function echoCmd(t){html(`<span class="tl tl-cmd">${esc(t)}</span>`);}
  function line(c,h){html(`<span class="tl ${c}">${h}</span>`);}
  function blank(){html('<span class="tl-blank"></span>');}
  function sep(){line('tl-sep','─'.repeat(50));}
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function tag(t){return `<span class="tl-tag">${t}</span>`;}
  function kv(k,v){const p=' '.repeat(Math.max(1,14-k.length));return `<span class="tl"><span class="tl-key">${k}</span>${p}<span class="tl-dim">│</span>  <span class="tl-val">${v}</span></span>`;}
  function run(parts){const fn=CMDS[parts[0]];fn?fn(parts.slice(1)):(line('tl-err',`command not found: <b>${esc(parts[0])}</b>`),line('tl-dim','  type <b class="tl-key">help</b>'));}

  function cmdBanner(){
    [' ██╗      ██████╗',' ██║     ██╔════╝',' ██║     ██║     ',' ██║     ██║     ',' ███████╗╚██████╗',` ╚══════╝ ╚═════╝  <span class="tl-dim">Portfolio CLI v4.0  ·  DevOps Lead Engineer</span>`]
      .forEach(l=>html(`<span class="tl tl-head" style="color:var(--accent);letter-spacing:0">${l}</span>`));
    blank();line('tl-dim',"  Welcome! I'm Lakshya's interactive terminal.");line('tl-dim','  Tab autocomplete · ↑↓ history · <span class="tl-key">help</span> for all commands');blank();updateSugg('');
  }
  function cmdHelp(){
    line('tl-head','  Available Commands');sep();
    [['whoami','Quick identity card'],['about','Full professional summary'],['skills','Technical skills'],['certifications','Cloud & IaC certs'],['experience','Work history'],['education','Academic background'],['contact','Email & LinkedIn'],['banner','Show welcome banner'],['clear','Clear terminal'],['exit','Close terminal']]
      .forEach(([c,d])=>html(`<span class="tl">  <span class="tl-ok">${c.padEnd(18)}</span><span class="tl-dim">${d}</span></span>`));
    blank();line('tl-dim','  Tab to autocomplete · ↑↓ for history');
  }
  function cmdWhoami(){
    line('tl-head','  Identity Card');sep();
    [['name','Lakshya Chhajed'],['role','DevOps Lead Engineer'],['company','IAMOPS | Growth Fanatics'],['level','L4 Lead Engineer'],['location','Surat, Gujarat, India'],['exp','4+ years Cloud & DevOps'],['clouds','AWS · GCP'],['linkedin','<a class="tl-link" href="https://www.linkedin.com/in/lakshya-chhajed" target="_blank">linkedin.com/in/lakshya-chhajed ↗</a>'],['status','<span class="tl-ok">● open to opportunities</span>']]
      .forEach(([k,v])=>html(kv(k,v)));
  }
  function cmdAbout(){
    line('tl-head','  About');sep();
    ['DevOps Lead Engineer · 4+ years designing cloud-native infra at scale on AWS & GCP.','','Terraform IaC · EKS/GKE Kubernetes · GitHub Actions GitOps','Full observability: Prometheus · Grafana · Loki · Mimir','Security: WAF · Shield Advanced · Vanta · Inspector','','Outside work: VFX · 3D Animation · Motion Graphics']
      .forEach(p=>line(p?'tl-val':'tl-blank',p||''));
  }
  function cmdSkills(){
    line('tl-head','  Technical Skills');sep();
    [['☁  Cloud',['AWS','GCP','EC2','ECS','EKS','GKE','Lambda','CloudFront','WAF']],['🐳  Containers',['Docker','Kubernetes','Helm','EKS','GKE','Karpenter','ArgoCD']],['🔧  IaC',['Terraform','Remote State','Workspaces','Modules']],['⚙  CI/CD',['GitHub Actions','Jenkins','ArgoCD','Blue-Green','GitOps']],['📊  Monitoring',['Grafana','Prometheus','Loki','Mimir','Promtail','OTel']],['💻  Scripting',['Python','Bash','YAML']],['🔒  Security',['AWS WAF','Shield','Vanta','Inspector','Security Hub']]]
      .forEach(([c,t])=>{blank();line('tl-ok',`  ${c}`);html(`<span class="tl">  ${t.map(tag).join(' ')}</span>`);});
  }
  function cmdCerts(){
    line('tl-head','  Certifications');sep();blank();
    [['tl-badge-pro','★','AWS Certified DevOps Engineer — Professional','Amazon Web Services'],['tl-badge-cert','★','AWS Certified Solutions Architect — Associate','Amazon Web Services'],['tl-badge-cert','★','HashiCorp Certified: Terraform Associate (003)','HashiCorp']]
      .forEach(([cls,icon,name,issuer])=>{html(`<span class="tl"><span class="${cls}">${icon}</span>  <span class="tl-ok">${name}</span></span>`);line('tl-dim',`     ${issuer}`);blank();});
  }
  function cmdExperience(){
    line('tl-head','  Experience');sep();blank();
    line('tl-ok','  IAMOPS | Growth Fanatics  ·  Aug 2022 — Present');
    [['L4 Lead Engineer','Jan 2026–Present'],['L3 DevOps Lead','2025'],['L2 DevOps Engineer','2024'],['L1 Cloud Engineer','2022–2023']].forEach(([l,d])=>html(`<span class="tl">  <span class="tl-key">${l}</span><span class="tl-dim">  · ${d}</span></span>`));
    blank();
    ['AWS & GCP infra: ECS/EKS/GKE with Terraform IaC','ECS → EKS migration with cost savings','On-demand K8s dev envs (one-click deploy)','CI/CD: GitHub Actions, Jenkins blue-green, ArgoCD GitOps','Observability: Prometheus · Grafana · Loki · Mimir','WAF + Shield + Vanta + Inspector security','MCP servers on EKS via Helm','Terraform workshops for team upskilling'].forEach(b=>line('tl-dim',`    ▸ ${b}`));
    blank();line('tl-ok','  AppGambit  ·  Dec 2021 — Jun 2022  ·  Internship');
    ['Terraform IaC for ALB, EC2, ECS, Route53','GitHub Actions CI/CD'].forEach(b=>line('tl-dim',`    ▸ ${b}`));
  }
  function cmdEducation(){
    line('tl-head','  Education');sep();blank();
    line('tl-ok','  BTech — Information Technology');line('tl-key','  Uka Tarsadia University  ·  2018–2022');line('tl-val','  CGPA: 9.04 / 10');
    blank();line('tl-ok','  Higher Secondary — Science');line('tl-key','  St. Xavier\'s High School  ·  2016–2018');line('tl-val','  Score: 84%');
  }
  function cmdContact(){
    line('tl-head','  Contact');sep();blank();
    html(kv('email','<a class="tl-link" href="mailto:lakshyachhajed@yahoo.com">lakshyachhajed@yahoo.com</a>'));
    html(kv('linkedin','<a class="tl-link" href="https://www.linkedin.com/in/lakshya-chhajed" target="_blank">linkedin.com/in/lakshya-chhajed ↗</a>'));
    html(kv('location','Surat, Gujarat, India'));
    blank();line('tl-dim','  Click links above to open directly.');
  }
  function cmdClear(){body.innerHTML='';blank();line('tl-dim','  Cleared. Type <span class="tl-key">help</span>.');}
  function cmdExit(){line('tl-dim','  Goodbye! Closing...');setTimeout(close,600);}
  updateSugg('');
})();

/* ─── THEME TOGGLE ───────────────────────────────────────────── */
(function(){
  const btn=document.getElementById('themeToggle'); if(!btn) return;
  const root=document.documentElement;
  const saved=localStorage.getItem('theme')||'dark';
  root.setAttribute('data-theme',saved);
  btn.addEventListener('click',()=>{
    const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    localStorage.setItem('theme',next);
  });
})();

/* ─── CONTACT FORM ───────────────────────────────────────────── */
(function(){
  const form=document.getElementById('contactForm'); if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const n=document.getElementById('cname').value,m=document.getElementById('cmessage').value;
    window.location.href=`mailto:lakshyachhajed@yahoo.com?subject=${encodeURIComponent('Portfolio Contact from '+n)}&body=${encodeURIComponent('Hi Lakshya,\n\n'+m+'\n\nFrom: '+n+'\nEmail: '+document.getElementById('cemail').value)}`;
  });
})();
