/* ============================================================
   DOAN & CO — Global JavaScript
   ============================================================ */

// Custom cursor
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
if(cursor){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cursor.style.left=mx+'px';cursor.style.top=my+'px';
  });
  (function animRing(){
    rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  })();
}

// Nav scroll
const nav=document.getElementById('mainNav');
if(nav){
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60),{passive:true});
}

// Mobile hamburger
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
if(hamburger&&navLinks){
  hamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('open');
    const spans=hamburger.querySelectorAll('span');
    spans[0].style.transform=navLinks.classList.contains('open')?'rotate(45deg) translate(4px,4px)':'';
    spans[1].style.opacity=navLinks.classList.contains('open')?'0':'1';
    spans[2].style.transform=navLinks.classList.contains('open')?'rotate(-45deg) translate(4px,-4px)':'';
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
}

// Scroll reveal
const revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*80);
  });
},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal,.reveal-left').forEach(el=>revObs.observe(el));

// Counter animation
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,target=parseInt(el.dataset.target),suffix=el.dataset.suffix||'';
    let cur=0;const step=target/40;
    const t=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.round(cur)+suffix;if(cur>=target)clearInterval(t);},35);
    cntObs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.stat-number[data-target]').forEach(el=>cntObs.observe(el));
