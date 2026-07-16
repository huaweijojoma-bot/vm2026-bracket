<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FIFA VM 2026 – Slutspelsstege</title>
<style>
  * { box-sizing:border-box;margin:0;padding:0; }
  body { background:linear-gradient(160deg,#DCF0FF 0%,#EAF5FF 40%,#F0F8FF 100%);font-family:'Segoe UI',Inter,system-ui,sans-serif;color:#0D2A4A;min-height:100vh; }
  .header { background:linear-gradient(135deg,#0B3D7A,#1468B0,#1A8ACA);text-align:center;padding:20px 16px 16px;box-shadow:0 3px 14px rgba(10,60,130,0.25); }
  .header h1 { font-size:22px;font-weight:900;letter-spacing:3px;color:#F5C518;text-transform:uppercase; }
  .header p  { font-size:11px;color:#A8D4F0;letter-spacing:1.5px;margin-top:4px;text-transform:uppercase; }
  .update-bar { background:rgba(255,255,255,0.8);backdrop-filter:blur(8px);border-bottom:1px solid #B8D8F0;padding:12px 16px;display:flex;flex-direction:column;align-items:center;gap:8px; }
  .btn { background:linear-gradient(135deg,#1058A0,#1878C0);color:white;border:none;border-radius:24px;padding:10px 26px;font-size:13px;font-weight:700;letter-spacing:1px;cursor:pointer;text-transform:uppercase;display:flex;align-items:center;gap:8px;box-shadow:0 3px 10px rgba(16,88,160,0.3);transition:all 0.2s; }
  .btn:hover { background:linear-gradient(135deg,#0D4A8A,#1468B0);transform:translateY(-1px); }
  .btn:disabled { background:linear-gradient(135deg,#7AA8C8,#90B8D8);cursor:not-allowed;transform:none; }
  .spinner { width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;vertical-align:middle; }
  @keyframes spin{to{transform:rotate(360deg)}}
  .meta { display:flex;gap:14px;font-size:10.5px;color:#5080A8;flex-wrap:wrap;justify-content:center; }
  .note-box  { font-size:10.5px;color:#0A5020;background:#D8F0E4;border:1px solid #6DC89A;border-radius:8px;padding:5px 16px;max-width:500px;text-align:center; }
  .error-box { font-size:10.5px;color:#7A1010;background:#FDDEDE;border:1px solid #E08888;border-radius:8px;padding:5px 16px;max-width:500px;text-align:center; }
  .last-up   { font-size:10px;color:#80A8C8; }
  .scroll-wrap { overflow-x:auto;-webkit-overflow-scrolling:touch;padding:12px 10px 16px; }
  .scroll-hint { text-align:center;font-size:10px;color:#7AAAC8;padding:2px 0 12px; }
  .rlbl { text-align:center;font-size:9px;font-weight:700;color:#4878A8;text-transform:uppercase;letter-spacing:1px;flex-shrink:0; }
  .rlbl .sub { font-size:7.5px;color:#80AACA;font-weight:400;margin-top:1px; }
  .rlbl.gold { color:#B07800; }
  .bracket { display:flex;align-items:stretch;min-width:1640px; }
  .bcol { display:flex;flex-direction:column;justify-content:space-around;flex-shrink:0; }
  .mc { width:158px;background:rgba(255,255,255,0.92);border:1.5px solid #B8D4EC;border-radius:9px;padding:4px;box-shadow:0 2px 8px rgba(30,80,140,0.08);flex-shrink:0; }
  .mc.done { background:rgba(220,248,232,0.92);border-color:#60B880; }
  .mc.pens { background:rgba(255,243,205,0.92);border-color:#C9A227; }
  .mc.live { background:rgba(255,235,210,0.95);border-color:#D06000;border-width:2px; }
  .mdate { font-size:7.5px;color:#80A8C8;text-align:center;margin-bottom:2px;font-family:monospace; }
  .tr { display:flex;align-items:center;justify-content:space-between;padding:3px 5px;border-radius:4px; }
  .tr.w  { background:rgba(40,160,80,0.13); }
  .tr.pw { background:rgba(201,162,39,0.13); }
  .tn { font-size:10px;font-weight:400;color:#1A3060;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
  .tn.wn  { color:#0A6020;font-weight:700; }
  .tn.pwn { color:#7A5A00;font-weight:700; }
  .ts { font-size:12px;font-weight:700;min-width:16px;text-align:right;margin-left:3px;color:#2A4A70; }
  .ts.wsc  { color:#0A6020; }
  .ts.pwsc { color:#7A5A00; }
  .ts.dash { color:#90B8D8;font-weight:400;font-size:10px; }
  .pnote { font-size:7.5px;color:#8A6800;text-align:center;background:rgba(201,162,39,0.1);border-radius:3px;padding:1px 4px;margin-top:1px; }
  .lnote { font-size:7.5px;color:#C05000;text-align:center;font-weight:700;margin-top:1px;animation:pulse 1.2s ease-in-out infinite; }
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  .div { height:1px;background:rgba(100,160,210,0.2);margin:2px 0; }
  .fc { width:158px;background:rgba(255,255,255,0.5);border:1.5px dashed #A8C8E0;border-radius:9px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;padding:5px;height:72px; }
  .fc.done-fc { background:rgba(220,248,232,0.6);border-color:#60B880;border-style:solid; }
  .fc.live-fc { background:rgba(255,235,210,0.7);border-color:#D06000;border-style:solid;border-width:2px; }
  .fl { font-size:9.5px;color:#1A3060;text-align:center;padding:0 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px;font-weight:500; }
  .fl.dim { color:#7098B8;font-weight:400;font-style:italic; }
  .fl.win { color:#0A6020;font-weight:700; }
  .fl.elim { color:#A0A8B8;font-weight:400;text-decoration:line-through; }
  .fdiv { height:1px;background:rgba(100,160,210,0.25);width:80%;margin:3px auto; }
  .fd { font-size:7px;color:#90B8D0;margin-top:3px;text-align:center; }
  .fin-wrap  { width:158px;flex-shrink:0;display:flex;align-items:center;justify-content:center; }
  .fin-inner { background:linear-gradient(160deg,#FFFBE8,#FFF3C0,#FFEEA0);border:2.5px solid #C9A227;border-radius:14px;padding:14px 8px;text-align:center;box-shadow:0 4px 24px rgba(200,160,30,0.28);width:148px; }
  .fin-trophy { font-size:26px;margin-bottom:4px; }
  .fin-title  { font-size:10px;font-weight:900;color:#7A5A00;letter-spacing:2px;text-transform:uppercase; }
  .fin-date   { font-size:8px;color:#907020;margin-top:4px;line-height:1.6; }
  .fin-teams  { margin-top:8px;padding:6px;background:rgba(255,255,255,0.6);border-radius:7px;border:1px solid #C9A227;font-size:9px;line-height:2; }
  .conn { position:relative;flex-shrink:0; }
  .cl { position:absolute;background:#90C0DC; }
  .cg { position:absolute;background:#C9A227; }
</style>
</head>
<body>

<div class="header">
  <h1>FIFA VM 2026</h1>
  <p>Officiell slutspelsstege · Round of 32 → Final · 28 juni – 19 juli 2026</p>
</div>

<div class="update-bar">
  <button class="btn" id="btnUpdate" onclick="updateResults()">
    <span id="btnIcon">⟳</span><span id="btnText">Uppdatera resultat med AI</span>
  </button>
  <div class="meta">
    <span><span style="color:#1A8A3A">●</span> Spelad</span>
    <span><span style="color:#C9A227">●</span> Straff/förlängning</span>
    <span><span style="color:#D06000">●</span> Pågår</span>
    <span id="doneCount" style="color:#5080A8"></span>
  </div>
  <div id="lastUp" class="last-up" style="display:none"></div>
  <div id="noteBox" class="note-box" style="display:none"></div>
  <div id="errorBox" class="error-box" style="display:none"></div>
</div>

<div class="scroll-wrap">
<div style="min-width:1640px">
<div style="display:flex;min-width:1640px;margin-bottom:6px;align-items:flex-end;">
  <div class="rlbl" style="width:162px">R32<div class="sub">28 jun–3 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">R16<div class="sub">4–7 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">KVARTSFINALER<div class="sub">9–11 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">SEMIFINALER<div class="sub">14–15 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl gold" style="width:158px">🏆 FINAL<div class="sub">19 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">SEMIFINALER<div class="sub">14–15 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">KVARTSFINALER<div class="sub">9–11 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">R16<div class="sub">4–7 jul</div></div>
  <div style="width:24px"></div>
  <div class="rlbl" style="width:162px">R32<div class="sub">28 jun–3 jul</div></div>
</div>
<div id="bracket" class="bracket"></div>
</div>
</div>
<div class="scroll-hint">← Svep åt sidan för hela bracketen →</div>

<script>
let S = {
  r32: {
    m73:{t1:"🇿🇦 Sydafrika",        s1:0, t2:"🇨🇦 Kanada",         s2:1, st:"F", p:null, date:"28/6"},
    m74:{t1:"🇧🇷 Brasilien",        s1:2, t2:"🇯🇵 Japan",           s2:1, st:"F", p:null, date:"29/6"},
    m75:{t1:"🇩🇪 Tyskland",         s1:1, t2:"🇵🇾 Paraguay",        s2:1, st:"P", p:"🇵🇾 Paraguay", date:"29/6"},
    m76:{t1:"🇳🇱 Nederländerna",    s1:1, t2:"🇲🇦 Marocko",         s2:1, st:"P", p:"🇲🇦 Marocko", date:"30/6"},
    m77:{t1:"🇫🇷 Frankrike",       s1:3, t2:"🇸🇪 Sverige",          s2:0, st:"F", p:null, date:"30/6"},
    m78:{t1:"🇨🇮 Elfenbenskusten", s1:1, t2:"🇳🇴 Norge",            s2:2, st:"F", p:null, date:"30/6"},
    m79:{t1:"🇲🇽 Mexiko",          s1:2, t2:"🇪🇨 Ecuador",          s2:0, st:"F", p:null, date:"1/7"},
    m80:{t1:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",          s1:2, t2:"🇨🇩 DR Kongo",        s2:1, st:"F", p:null, date:"2/7"},
    m81:{t1:"🇺🇸 USA",             s1:2, t2:"🇧🇦 Bosnien-H.",      s2:0, st:"F", p:null, date:"2/7"},
    m82:{t1:"🇧🇪 Belgien",         s1:3, t2:"🇸🇳 Senegal",          s2:2, st:"P", p:"🇧🇪 Belgien", date:"2/7"},
    m83:{t1:"🇵🇹 Portugal",        s1:2, t2:"🇭🇷 Kroatien",         s2:1, st:"F", p:null, date:"3/7"},
    m84:{t1:"🇪🇸 Spanien",         s1:3, t2:"🇦🇹 Österrike",        s2:0, st:"F", p:null, date:"3/7"},
    m85:{t1:"🇨🇭 Schweiz",         s1:2, t2:"🇩🇿 Algeriet",         s2:0, st:"F", p:null, date:"3/7"},
    m86:{t1:"🇦🇷 Argentina",       s1:2, t2:"🇨🇻 Kap Verde",        s2:2, st:"P", p:"🇦🇷 Argentina", date:"4/7"},
    m87:{t1:"🇦🇺 Australien",      s1:1, t2:"🇪🇬 Egypten",          s2:1, st:"P", p:"🇪🇬 Egypten", date:"4/7"},
    m88:{t1:"🇨🇴 Colombia",        s1:0, t2:"🇨🇭 Schweiz",          s2:0, st:"P", p:"🇨🇭 Schweiz", date:"7/7"},
  },
  r16: {
    m89:{t1:"🇵🇾 Paraguay",   s1:0, t2:"🇫🇷 Frankrike",   s2:1, st:"F", p:null, date:"4/7 Philadelphia"},
    m90:{t1:"🇨🇦 Kanada",     s1:0, t2:"🇲🇦 Marocko",     s2:3, st:"F", p:null, date:"4/7 Houston"},
    m91:{t1:"🇧🇷 Brasilien",  s1:1, t2:"🇳🇴 Norge",       s2:2, st:"F", p:null, date:"5/7 New Jersey"},
    m92:{t1:"🇲🇽 Mexiko",     s1:2, t2:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",     s2:3, st:"F", p:null, date:"5/7 Mexico City"},
    m93:{t1:"🇵🇹 Portugal",   s1:1, t2:"🇪🇸 Spanien",     s2:0, st:"F", p:null, date:"6/7 Dallas"},
    m94:{t1:"🇺🇸 USA",        s1:1, t2:"🇧🇪 Belgien",     s2:4, st:"F", p:null, date:"6/7 Seattle"},
    m95:{t1:"🇦🇷 Argentina",  s1:3, t2:"🇪🇬 Egypten",     s2:2, st:"F", p:null, date:"7/7 Atlanta"},
    m96:{t1:"🇨🇴 Colombia",   s1:0, t2:"🇨🇭 Schweiz",     s2:0, st:"P", p:"🇨🇭 Schweiz", date:"7/7 Vancouver"},
  },
  qf: {
    // LEFT half: qf1=Fra vs Mar (M89 vs M90), qf2=Nor vs Eng (M91 vs M92)
    qf1:{t1:"🇫🇷 Frankrike",  t2:"🇲🇦 Marocko",   s1:2, s2:0, st:"F", p:null, winner:"🇫🇷 Frankrike",  date:"9/7 Boston"},
    qf2:{t1:"🇳🇴 Norge",      t2:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   s1:1, s2:2, st:"F", p:null, winner:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   date:"11/7 Miami"},
    // RIGHT half: qf3=Bel vs Spa (M94 vs M93), qf4=Arg vs Sui (M95 vs M96)
    qf3:{t1:"🇧🇪 Belgien",    t2:"🇪🇸 Spanien",    s1:1, s2:2, st:"F", p:null, winner:"🇪🇸 Spanien",    date:"10/7 Los Angeles"},
    qf4:{t1:"🇦🇷 Argentina",  t2:"🇨🇭 Schweiz",    s1:3, s2:1, st:"F", p:null, winner:"🇦🇷 Argentina",  date:"11/7 Kansas City"},
  },
  sf: {
    // sf1: W(qf1) vs W(qf3) = Frankrike vs Spanien
    sf1:{t1:"🇫🇷 Frankrike",  t2:"🇪🇸 Spanien",    s1:0, s2:2, st:"F", p:null, winner:"🇪🇸 Spanien",    date:"14/7 Dallas"},
    // sf2: W(qf2) vs W(qf4) = England vs Argentina
    sf2:{t1:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   t2:"🇦🇷 Argentina",  s1:1, s2:2, st:"F", p:null, winner:"🇦🇷 Argentina",  date:"15/7 Atlanta"},
  },
  fin:{t1:"🇪🇸 Spanien", t2:"🇦🇷 Argentina", s1:null, s2:null, st:"", p:null, winner:null}
};

function win(m){ if(!m)return null; if(m.winner)return m.winner; if(m.st==="P")return m.p; if(m.st!=="F")return null; return m.s1>m.s2?m.t1:m.s2>m.s1?m.t2:null; }

function mcCard(m){
  if(!m)return'';
  const w=win(m);
  const isPens=m.st==="P",isDone=m.st==="F"||isPens,isLive=m.st==="L";
  let cls="mc";
  if(isLive)cls+=" live";else if(isPens)cls+=" pens";else if(isDone)cls+=" done";
  const row=(t,s,won,pw)=>{
    const nc=pw?'tn pwn':won?'tn wn':'tn';
    const sc=pw?'ts pwsc':won?'ts wsc':s!==null?'ts':'ts dash';
    const el=isDone&&!won&&!pw;
    return `<div class="tr${pw?' pw':won?' w':''}" style="${el?'opacity:0.4':''}"><span class="${nc}">${t}</span><span class="${sc}">${s!==null?s:'–'}</span></div>`;
  };
  const pw1=isPens&&m.p===m.t1,pw2=isPens&&m.p===m.t2;
  let ex='';
  if(isPens)ex=`<div class="pnote">${m.p} på straff</div>`;
  if(isLive)ex=`<div class="lnote">● PÅGÅR NU</div>`;
  return `<div class="${cls}"><div class="mdate">${m.date||''}</div>${row(m.t1,m.s1,w===m.t1&&!isPens,pw1)}<div class="div"></div>${row(m.t2,m.s2,w===m.t2&&!isPens,pw2)}${ex}</div>`;
}

function fcCard(m){
  if(!m)return'';
  const w=win(m);
  const isDone=m.st==="F"||(m.st==="P"&&(m.p||m.winner));
  const isLive=m.st==="L";
  const isPens=m.st==="P";
  let cls="fc";
  if(isLive)cls+=" live-fc";else if(isDone)cls+=" done-fc";
  const row=(t,s,won,pw)=>{
    const nc=pw?'fl win':won?'fl win':t?'fl':'fl dim';
    const el=isDone&&!won&&!pw;
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:1px 5px;${el?'opacity:0.4':''}${won||pw?'background:rgba(40,160,80,0.1);border-radius:3px;':''}">
      <span class="${nc}" style="flex:1;font-size:9.5px">${t||'TBD'}</span>
      ${isDone?`<span style="font-size:11px;font-weight:700;color:${won||pw?'#0A6020':'#2A4A70'};min-width:14px;text-align:right">${s!==null?s:'–'}</span>`:''}
    </div>`;
  };
  const pw1=isPens&&(m.p===m.t1||m.winner===m.t1);
  const pw2=isPens&&(m.p===m.t2||m.winner===m.t2);
  let ex='';
  if(isPens)ex=`<div class="pnote" style="font-size:7px">${m.winner||m.p} på straff</div>`;
  if(isLive)ex=`<div class="lnote">● PÅGÅR NU</div>`;
  return `<div class="${cls}">${row(m.t1,m.s1,w===m.t1&&!isPens,pw1)}<div class="fdiv"></div>${row(m.t2,m.s2,w===m.t2&&!isPens,pw2)}${ex}<div class="fd">${m.date||''}</div></div>`;
}

function col(items,H){return `<div class="bcol" style="width:162px;height:${H}px">${items.join('')}</div>`;}

function conn(count,side,H){
  const W=24;let h='';
  for(let i=0;i<count;i++){
    const pH=H/count,t1=i*pH+pH*.25,t2=i*pH+pH*.75,mid=i*pH+pH*.5,hf=W/2;
    if(side==='r'){
      h+=`<div class="cl" style="left:0;top:${t1}px;width:${hf}px;height:1px"></div>`;
      h+=`<div class="cl" style="left:0;top:${t2}px;width:${hf}px;height:1px"></div>`;
      h+=`<div class="cl" style="left:${hf-1}px;top:${t1}px;width:1px;height:${t2-t1}px"></div>`;
      h+=`<div class="cl" style="left:${hf}px;top:${mid}px;width:${hf}px;height:1px"></div>`;
    }else{
      h+=`<div class="cl" style="right:0;top:${t1}px;width:${hf}px;height:1px"></div>`;
      h+=`<div class="cl" style="right:0;top:${t2}px;width:${hf}px;height:1px"></div>`;
      h+=`<div class="cl" style="right:${hf-1}px;top:${t1}px;width:1px;height:${t2-t1}px"></div>`;
      h+=`<div class="cl" style="right:${hf}px;top:${mid}px;width:${hf}px;height:1px"></div>`;
    }
  }
  return `<div class="conn" style="width:${W}px;height:${H}px">${h}</div>`;
}
function goldConn(H){return `<div class="conn" style="width:24px;height:${H}px"><div class="cg" style="left:0;top:50%;width:24px;height:2px;transform:translateY(-50%)"></div></div>`;}

function render(){
  const H=640;
  const lR32=[mcCard(S.r32.m75),mcCard(S.r32.m77),mcCard(S.r32.m73),mcCard(S.r32.m76),mcCard(S.r32.m74),mcCard(S.r32.m78),mcCard(S.r32.m79),mcCard(S.r32.m80)];
  const lR16=[mcCard(S.r16.m89),mcCard(S.r16.m90),mcCard(S.r16.m91),mcCard(S.r16.m92)];
  const lQF=[fcCard(S.qf.qf1),fcCard(S.qf.qf2)];
  const lSF=[fcCard(S.sf.sf1)];

  const rR32=[mcCard(S.r32.m81),mcCard(S.r32.m82),mcCard(S.r32.m83),mcCard(S.r32.m84),mcCard(S.r32.m85),mcCard(S.r32.m86),mcCard(S.r32.m87),mcCard(S.r32.m88)];
  const rR16=[mcCard(S.r16.m94),mcCard(S.r16.m93),mcCard(S.r16.m96),mcCard(S.r16.m95)];
  const rQF=[fcCard(S.qf.qf3),fcCard(S.qf.qf4)];
  const rSF=[fcCard(S.sf.sf2)];

  const finW=win(S.fin);
  const finBox=`<div class="fin-wrap" style="height:${H}px"><div class="fin-inner">
    <div class="fin-trophy">🏆</div>
    <div class="fin-title">VM-Final</div>
    <div class="fin-date">19 juli 2026<br>MetLife Stadium, NJ</div>
    <div class="fin-teams">
      ${finW?`<span style="color:#0A6020;font-weight:700;font-size:10px">🏆 ${finW}</span>`:
      `<span style="font-weight:600">${S.fin.t1||'TBD'}</span><br><span style="color:#90A8C0;font-size:8px">vs</span><br><span style="font-weight:600">${S.fin.t2||'TBD'}</span>`}
    </div>
  </div></div>`;

  document.getElementById('bracket').innerHTML=
    col(lR32,H)+conn(4,'r',H)+col(lR16,H)+conn(2,'r',H)+col(lQF,H)+conn(1,'r',H)+col(lSF,H)+goldConn(H)+
    finBox+goldConn(H)+
    col(rSF,H)+conn(1,'l',H)+col(rQF,H)+conn(2,'l',H)+col(rR16,H)+conn(4,'l',H)+col(rR32,H);

  const cnt=[...Object.values(S.r32),...Object.values(S.r16),...Object.values(S.qf),...Object.values(S.sf)].filter(m=>m.st==="F"||m.st==="P").length+(S.fin.st==="F"?1:0);
  document.getElementById('doneCount').textContent=cnt+' matcher spelade';
}

async function updateResults(){
  const btn=document.getElementById('btnUpdate'),icon=document.getElementById('btnIcon'),
        txt=document.getElementById('btnText'),noteBox=document.getElementById('noteBox'),
        errorBox=document.getElementById('errorBox'),lastUp=document.getElementById('lastUp');
  btn.disabled=true;icon.innerHTML='<span class="spinner"></span>';txt.textContent='Söker live-resultat…';
  noteBox.style.display='none';errorBox.style.display='none';

  const summary = `NULÄGE VM 2026:
QF: Frankrike 2-0 Marocko, England 2-1 Norge (AET), Spanien 2-1 Belgien, Argentina 3-1 Schweiz (AET)
SF: Spanien 2-0 Frankrike, Argentina 2-1 England
FINAL 19 jul: Spanien vs Argentina (ej spelad ännu)
Bronsfinalen 18 jul: Frankrike vs England`;

  const prompt = `${summary}

Aktuellt state (JSON):
Final: ${JSON.stringify(S.fin)}

Sök på webben efter det SENASTE resultatet från VM 2026 finalen och bronsfinalen.
Svara ENBART med ett JSON-objekt (inga backticks, ingen text runt om):
{"fin":{"t1":"🇪🇸 Spanien","t2":"🇦🇷 Argentina","s1":null,"s2":null,"st":"","p":null,"winner":null},"note":"vad som hänt"}

Om finalen är spelad, fyll i s1, s2, st="F" och winner. Om den pågår, st="L".`;

  try {
    const res=await fetch('/.netlify/functions/update',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prompt})
    });
    if(!res.ok)throw new Error('HTTP '+res.status);
    const text=await res.text();
    const match=text.match(/\{[\s\S]*\}/);
    if(!match)throw new Error('Inget JSON i svaret');
    const parsed=JSON.parse(match[0]);
    if(parsed.fin&&parsed.fin.t1)S.fin={...S.fin,...parsed.fin};
    render();
    if(parsed.note){noteBox.textContent='✓ '+parsed.note;noteBox.style.display='block';}
    lastUp.textContent='Uppdaterad '+new Date().toLocaleTimeString('sv-SE');
    lastUp.style.display='block';
  } catch(e){
    errorBox.textContent='Fel: '+e.message;
    errorBox.style.display='block';
  }
  btn.disabled=false;icon.textContent='⟳';txt.textContent='Uppdatera resultat med AI';
}

render();
</script>
</body>
</html>
