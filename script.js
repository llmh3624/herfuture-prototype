// ── STATE ──
var role=null, terms=false, gender=null, country=null, lang=null;
var career=null, careerTypes=new Set();
var userName='', timerInt=null, t0=null, stopped=false;
var isDutch=false;

// ── TRANSLATIONS ──
var TR={
  en:{
    w1Title:'Welcome to <em>your</em>future.',
    w1Body:'As a HerFuture member, you are now part of a vibrant community that supports your growth and guides your career.',
    w2Title:"You're <em>one step</em> away from",
    vp1h:'Events:',vp1p:'In-house days, workshops, dinners, and community meetups—all for free.',
    vp2h:'Jobs &amp; Internships:',vp2p:'Grow your career and apply to opportunities in 1 click.',
    vp3h:'Inspiring women in IT &amp; STEM:',vp3p:'Build your network. <em>When you see her, you can become her.</em>',
    w2Btn:'Get Started',
    genderQ:'how do you identify?',gFemale:'Female',gMale:'Male',gNonbinary:'Non-binary',gNext:'Next',
    locTitle:'🌍 Where are you based?',
    locSub:'This helps us show you relevant events and opportunities in your area.',
    langQ:'what is your main language?',
    langNote:'If you speak Dutch fluently, please choose Dutch to be included in Dutch-speaking vacancies and events.',
    locNext:'Next',
    careerTitle:'Are you currently open to career opportunities?',
    careerYes:'Yes',careerNo:'No',
    careerFull:'Full-time jobs',careerIntern:'Internship',careerPart:'Part-time',
    careerHint:'Select at least one',careerNext:'Next',
    eduQ:'what do you study?',
    startDate:'📅 Start date',
    stillStudying:'I am still studying here',
    gradDate:'🎓 Graduation date',eduNext:'Next',
    byTitle:'Lastly, what year were you born?',
    byNote:"That's all! Please make sure your notifications are on — you'll need it to register for events and receive important updates.",
    byBtn:'Finish registration',
    badgeTitle:'New badge unlocked!',badgeSub:'Sign up',
    badgeMsg:"You're in! Let's rise, connect and thrive together.",badgeBtn:'Earn more badges',
    completeTitle:'Onboarding Complete!',completeSub:'Total time to complete',
    feedRole:'HerFuture Student Member',
    feedAmb:'Connect with an ambassador',
    statEvents:'Attended events',statJobs:'Job applications',
    feedEvents:'My events overview',
    eventsEmpty:"The best events are waiting for you.<br><a href='#'>Check them out!</a>",
    appTitle:'Get the HerFuture App',appSub:'Better in the app! Download now.',
    appDl:'Download',appLater:'Later'
  },
  nl:{
    w1Title:'Welkom bij <em>jouw</em>toekomst.',
    w1Body:'Als HerFuture-lid ben je nu onderdeel van een levendige community die jouw groei ondersteunt en je carrière begeleidt.',
    w2Title:'Je bent er <em>bijna</em>',
    vp1h:'Evenementen:',vp1p:'Bedrijfsdagen, workshops, diners en community meetups — allemaal gratis.',
    vp2h:'Banen &amp; Stages:',vp2p:'Groei in je carrière en solliciteer met 1 klik.',
    vp3h:'Inspirerende vrouwen in IT &amp; STEM:',vp3p:'Bouw je netwerk. <em>Als je haar ziet, kun jij haar worden.</em>',
    w2Btn:'Aan de slag',
    genderQ:'hoe identificeer jij je?',gFemale:'Vrouw',gMale:'Man',gNonbinary:'Non-binair',gNext:'Volgende',
    locTitle:'🌍 Waar woon je?',
    locSub:'Dit helpt ons je relevante evenementen en kansen in jouw regio te tonen.',
    langQ:'wat is je voertaal?',
    langNote:'Spreek je vloeiend Nederlands? Kies dan Nederlands om meegenomen te worden in Nederlandstalige vacatures en evenementen.',
    locNext:'Volgende',
    careerTitle:'Ben je momenteel open voor carrièrekansen?',
    careerYes:'Ja',careerNo:'Nee',
    careerFull:'Fulltime banen',careerIntern:'Stage',careerPart:'Parttime',
    careerHint:'Selecteer minstens één optie',careerNext:'Volgende',
    eduQ:'wat studeer je?',
    startDate:'📅 Startdatum',
    stillStudying:'Ik studeer hier nog',
    gradDate:'🎓 Afstudeerdatum',eduNext:'Volgende',
    byTitle:'Tot slot, in welk jaar ben je geboren?',
    byNote:'Dat is alles! Zorg dat je meldingen aan staan — je hebt ze nodig om je aan te melden voor evenementen en updates te ontvangen.',
    byBtn:'Registratie voltooien',
    badgeTitle:'Nieuwe badge ontgrendeld!',badgeSub:'Aanmelding',
    badgeMsg:'Je bent erbij! Laten we samen groeien, verbinden en bloeien.',badgeBtn:'Verdien meer badges',
    completeTitle:'Onboarding Voltooid!',completeSub:'Totale tijd',
    feedRole:'HerFuture Student Lid',
    feedAmb:'Verbind met een ambassador',
    statEvents:'Bijgewoonde evenementen',statJobs:'Sollicitaties',
    feedEvents:'Mijn evenementenoverzicht',
    eventsEmpty:"De beste evenementen wachten op je.<br><a href='#'>Bekijk ze hier!</a>",
    appTitle:'Download de HerFuture App',appSub:'Beter in de app! Download nu.',
    appDl:'Downloaden',appLater:'Later'
  }
};

function tx(k){ var d=isDutch?TR.nl:TR.en; return d[k]||TR.en[k]||k; }
function greet(){ return (userName?'Hi '+userName:isDutch?'Hoi':'Hi there'); }

function applyTranslations(){
  var n=userName||(isDutch?'daar':'there');
  document.getElementById('w1-title').innerHTML=tx('w1Title');
  document.getElementById('w1-body').innerHTML=tx('w1Body');
  document.getElementById('w2-title').innerHTML=tx('w2Title');
  document.getElementById('vp1-h').innerHTML=tx('vp1h');
  document.getElementById('vp1-p').innerHTML=tx('vp1p');
  document.getElementById('vp2-h').innerHTML=tx('vp2h');
  document.getElementById('vp2-p').innerHTML=tx('vp2p');
  document.getElementById('vp3-h').innerHTML=tx('vp3h');
  document.getElementById('vp3-p').innerHTML=tx('vp3p');
  document.getElementById('w2-btn').textContent=tx('w2Btn');
  // Gender screen — rebuild full title safely
  document.getElementById('gender-title').textContent=(greet()+', '+tx('genderQ'));
  document.getElementById('gc-female').textContent=tx('gFemale');
  document.getElementById('gc-male').textContent=tx('gMale');
  document.getElementById('gc-nonbinary').textContent=tx('gNonbinary');
  document.getElementById('gender-btn').textContent=tx('gNext');
  // Location
  document.getElementById('loc-title').textContent=tx('locTitle');
  document.getElementById('loc-sub').textContent=tx('locSub');
  document.getElementById('lang-q-text').textContent=(greet()+', '+tx('langQ'));
  document.getElementById('lang-note').textContent=tx('langNote');
  document.getElementById('loc-btn').textContent=tx('locNext');
  // Career
  document.getElementById('career-title').textContent=tx('careerTitle');
  document.getElementById('cy-yes').textContent=tx('careerYes');
  document.getElementById('cy-no').textContent=tx('careerNo');
  document.getElementById('ct-full').textContent=tx('careerFull');
  document.getElementById('ct-intern').textContent=tx('careerIntern');
  document.getElementById('ct-part').textContent=tx('careerPart');
  document.getElementById('career-sub-hint').textContent=tx('careerHint');
  document.getElementById('career-btn').textContent=tx('careerNext');
  // Education
  document.getElementById('edu-name').textContent=n;
  document.getElementById('edu-q').textContent=tx('eduQ');
  document.getElementById('start-date-label').textContent=tx('startDate');
  document.getElementById('still-cb-label').textContent=tx('stillStudying');
  document.getElementById('grad-date-label').textContent=tx('gradDate');
  document.getElementById('edu-btn').textContent=tx('eduNext');
  // Birth year — plain text, no child spans
  document.getElementById('by-title').textContent=tx('byTitle');
  document.getElementById('by-note').textContent=tx('byNote');
  document.getElementById('by-btn').textContent=tx('byBtn');
  // Badge
  document.getElementById('badge-title').textContent=tx('badgeTitle');
  document.getElementById('badge-sub').textContent=tx('badgeSub');
  document.getElementById('badge-msg').textContent=tx('badgeMsg');
  document.getElementById('badge-btn').textContent=tx('badgeBtn');
  // Feed
  document.getElementById('complete-title').textContent=tx('completeTitle');
  document.getElementById('complete-sub').textContent=tx('completeSub');
  document.getElementById('feed-role').textContent=tx('feedRole');
  document.getElementById('feed-amb-label').textContent=tx('feedAmb');
  document.getElementById('stat-events').textContent=tx('statEvents');
  document.getElementById('stat-jobs').textContent=tx('statJobs');
  document.getElementById('feed-events-label').textContent=tx('feedEvents');
  document.getElementById('events-empty-text').innerHTML=tx('eventsEmpty');
  document.getElementById('app-title').textContent=tx('appTitle');
  document.getElementById('app-sub').textContent=tx('appSub');
  document.getElementById('app-dl-btn').textContent=tx('appDl');
  document.getElementById('app-later-btn').textContent=tx('appLater');
}

// ── NAVIGATION ──
function go(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  document.getElementById(id).classList.add('active');
  var dark=(id==='s-badge');
  document.getElementById('status-bar').style.background=dark?'var(--deep-purple)':'var(--pale-blush)';
  document.getElementById('status-bar').style.color=dark?'#fff':'var(--text-dark)';
}

// ── TIMER ──
function startTimer(){
  if(t0)return; t0=Date.now();
  document.getElementById('timer-pill').style.display='block';
  timerInt=setInterval(function(){
    if(stopped)return;
    var s=Math.floor((Date.now()-t0)/1000);
    document.getElementById('timer-display').textContent=fmt(s);
  },500);
}
function stopTimer(){
  stopped=true; clearInterval(timerInt);
  var s=Math.floor((Date.now()-t0)/1000);
  var f=fmt(s);
  document.getElementById('final-time').textContent=f;
  document.getElementById('timer-display').textContent=f;
}
function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}

// ── S1 ──
function pickRole(r){
  role=r;
  document.querySelectorAll('.role-card').forEach(function(c){c.classList.remove('selected');});
  document.getElementById('rc-'+r).classList.add('selected');
  if(r==='student'&&!t0)startTimer();
}
function onTerms(){terms=document.getElementById('terms-cb').checked;}
function fromRole(){
  if(!role){alert('Please select a profile type.');return;}
  if(!terms){document.getElementById('terms-err').style.display='block';return;}
  if(role!=='student'){alert('This prototype covers the Student flow only.');return;}
  go('s-signup');
}

// ── S2 ──
function togPwd(id,btn){
  var f=document.getElementById(id);
  f.type=(f.type==='password')?'text':'password';
  btn.textContent=(f.type==='password')?'👁':'🙈';
}
function chkPwd(){
  var p=document.getElementById('pw-f').value;
  var c=document.getElementById('pc-f').value;
  var rules={'r-len':p.length>=8,'r-spc':/[!@#$%^&*\-]/.test(p),
    'r-cap':/[A-Z]/.test(p),'r-num':/\d/.test(p),
    'r-nos':p.length>0&&!/\s/.test(p),'r-mtc':p.length>0&&p===c};
  Object.keys(rules).forEach(function(id){
    document.getElementById(id).classList.toggle('ok',rules[id]);
  });
}
function fromSignup(){
  var email=document.getElementById('email-f').value.trim();
  var fn=document.getElementById('fn-f').value.trim();
  if(fn)userName=fn;
  var chip=document.getElementById('verify-email');
  chip.textContent=email||'user@example.com';
  // Update name in subsequent screens
  var n=userName||(isDutch?'daar':'there');
  document.getElementById('edu-name').textContent=n;
  document.getElementById('gender-title').textContent=(greet()+', '+tx('genderQ'));
  document.getElementById('lang-q-text').textContent=(greet()+', '+tx('langQ'));
  document.getElementById('by-title').textContent=tx('byTitle');
  go('s-verify');
}

// ── S3 ──
function chkCode(el){
  var v=el.value.replace(/\D/g,'').slice(0,6); el.value=v;
  document.getElementById('code-n').textContent=v.length;
  document.getElementById('confirm-btn').disabled=(v.length<6);
}

// ── S6 ──
function pickGender(btn){
  document.querySelectorAll('#s-gender .choice-card').forEach(function(c){c.classList.remove('selected');});
  btn.classList.add('selected');
  document.getElementById('gender-btn').disabled=false;
}

// ── S7 ──
function onCountry(v){
  country=v; lang=null;
  var ls=document.getElementById('lang-sec');
  var lb=document.getElementById('loc-btn');
  document.getElementById('lb-dutch').classList.remove('selected');
  document.getElementById('lb-english').classList.remove('selected');
  if(v==='NL'){ls.classList.add('show');lb.disabled=true;}
  else{ls.classList.remove('show');lb.disabled=!v;isDutch=false;}
}
function pickLang(l){
  lang=l; isDutch=(l==='dutch');
  document.getElementById('lb-dutch').classList.toggle('selected',l==='dutch');
  document.getElementById('lb-english').classList.toggle('selected',l==='english');
  document.getElementById('loc-btn').disabled=false;
  applyTranslations();
}

// ── S8 ──
function pickCareer(c){
  career=c;
  document.getElementById('cy-yes').classList.toggle('selected',c==='yes');
  document.getElementById('cy-no').classList.toggle('selected',c==='no');
  var sub=document.getElementById('career-sub');
  var hint=document.getElementById('career-sub-hint');
  if(c==='yes'){
    sub.classList.add('show'); hint.style.display='block';
    careerTypes=new Set();
    document.querySelectorAll('#career-sub .yn-btn').forEach(function(b){b.classList.remove('selected');});
    document.getElementById('career-btn').disabled=true;
  } else {
    sub.classList.remove('show'); hint.style.display='none';
    careerTypes=new Set();
    document.getElementById('career-btn').disabled=false;
  }
}
function toggleCareerType(t){
  var idMap={fulltime:'ct-full',internship:'ct-intern',parttime:'ct-part'};
  if(careerTypes.has(t)){careerTypes.delete(t);}else{careerTypes.add(t);}
  Object.keys(idMap).forEach(function(k){
    document.getElementById(idMap[k]).classList.toggle('selected',careerTypes.has(k));
  });
  document.getElementById('career-btn').disabled=(careerTypes.size===0);
}

// ── S9 ──
function pickDeg(btn){
  document.querySelectorAll('.deg-pill').forEach(function(p){p.classList.remove('selected');});
  btn.classList.add('selected'); chkEdu();
}
function onStillStudying(){
  var checked=document.getElementById('still-cb').checked;
  document.getElementById('grad-date-section').style.display=checked?'none':'block';
  chkEdu();
}
function chkEdu(){
  var still=document.getElementById('still-cb').checked;
  var hasGrad=still||(document.getElementById('grad-mo').value&&document.getElementById('grad-yr').value);
  var ok=document.getElementById('study-f').value.trim()&&
         document.getElementById('uni-sel').value&&
         document.getElementById('study-mo').value&&
         document.getElementById('study-yr').value&&
         hasGrad;
  document.getElementById('edu-btn').disabled=!ok;
}

// ── S10 ──
function chkBy(){
  document.getElementById('by-btn').disabled=!document.getElementById('by-sel').value;
}

// ── COMPLETE ──
function toFeed(){
  stopTimer();
  var n=userName||(isDutch?'daar':'there');
  document.getElementById('feed-name').textContent=n;
  document.getElementById('feed-role').textContent=tx('feedRole');
  go('s-feed');
}

// ── CLOCK ──
function tick(){
  var n=new Date();
  document.getElementById('clock').textContent=
    String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');
}
tick(); setInterval(tick,15000);