"use strict";
const form=document.getElementById('demo-form');
const confirmation=document.getElementById('confirmation');
form.addEventListener('submit',event=>{event.preventDefault();document.getElementById('full-name').value='';document.getElementById('email').value='';form.hidden=true;confirmation.hidden=false;confirmation.focus();});
document.getElementById('reset-demo').addEventListener('click',()=>{form.reset();confirmation.hidden=true;form.hidden=false;document.getElementById('full-name').focus();});
/* Page-only reveal motion */
(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches||!('IntersectionObserver' in window))return;
  try{
    const selectors='.hero-copy,.hero .portrait,.section-title,.purpose-grid article,.pilot-top,.pilot-grid>div,.future-topic,.format-grid>div,.format-list,.preview-head,.preview-card,.source-row,.signup-grid>div,.faq>div,.archive-note';
    const elements=[...document.querySelectorAll(selectors)];
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}
    },{threshold:.05,rootMargin:'0px 0px -24px 0px'});
    elements.forEach((el,i)=>{el.dataset.reveal='';el.style.setProperty('--reveal-delay',`${i%3*65}ms`);observer.observe(el);});
    document.body.classList.add('motion-ready');
    preference.addEventListener('change',event=>{if(event.matches){document.body.classList.remove('motion-ready');observer.disconnect();}});
  }catch{document.body.classList.remove('motion-ready');}
})();
