const PIN='2001';let pin='';
function dots(){document.querySelectorAll('#dots i').forEach((x,i)=>x.classList.toggle('on',i<pin.length))}
function press(n){if(pin.length<4){pin+=n;dots();document.getElementById('error').textContent='';if(pin.length===4)setTimeout(check,160)}}
function check(){if(pin===PIN){afterLogin()}else{document.getElementById('error').textContent='Wrong PIN 💗 Try again';pin='';dots()}}
function clearPin(){pin='';dots();document.getElementById('error').textContent=''}function back(){pin=pin.slice(0,-1);dots()}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active')}
function blow(){document.getElementById('flame').style.display='none';document.getElementById('hint').textContent='Wish made! ✨';document.getElementById('finalBtn').classList.remove('hidden');burst()}
let playing=false;function toggleMusic(){let a=document.getElementById('music');playing?a.pause():a.play().catch(()=>{});playing=!playing;document.getElementById('musicBtn').textContent=playing?'❚❚':'♫'}
const c=document.getElementById('confetti'),x=c.getContext('2d');let ps=[];function rs(){c.width=innerWidth;c.height=innerHeight}rs();addEventListener('resize',rs);
function burst(){for(let i=0;i<130;i++)ps.push({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*11,vy:-Math.random()*9-2,g:.17,s:Math.random()*7+3,r:Math.random()*6.2})}
(function anim(){x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=.08;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=`hsl(${(p.x+p.y)%360},85%,70%)`;x.fillRect(-p.s/2,-p.s/2,p.s,p.s);x.restore()});ps=ps.filter(p=>p.y<innerHeight+30);requestAnimationFrame(anim)})()

// Birthday unlock time: 8 August 2026, 12:00 AM (visitor's local time)
const BIRTHDAY = new Date(2026, 7, 8,8, 0, 0);
let countdownTimer=null;
function afterLogin(){
  if(new Date() >= BIRTHDAY){ go('intro'); burst(); }
  else { go('countdown'); updateCountdown(); countdownTimer=setInterval(updateCountdown,1000); }
}
function updateCountdown(){
  let diff=BIRTHDAY-new Date();
  if(diff<=0){
    if(countdownTimer) clearInterval(countdownTimer);
    go('intro'); burst(); return;
  }
  const d=Math.floor(diff/86400000);
  diff%=86400000;
  const h=Math.floor(diff/3600000); diff%=3600000;
  const m=Math.floor(diff/60000); diff%=60000;
  const s=Math.floor(diff/1000);
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}
