import {calculate} from './partner-planning-model.mjs';
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const root=document.querySelector('#assumptions');
function update(){
 const input=Object.fromEntries([...root.querySelectorAll('input,select')].map(x=>[x.name,x.value]));
 document.querySelector('#teacherPct').disabled=input.teacherMode==='flat';
 document.querySelector('#teacherFlat').disabled=input.teacherMode!=='flat';
 document.querySelector('#sponsorFee').disabled=input.sponsorMethod!=='custom';
 const v=calculate(input,+input.price);
 for(const k of ['ticketGross','sponsor','gross','ticketFees','sponsorFees','teacher','software','ads','other','cash','labor','afterLabor'])document.querySelectorAll(`[data-value="${k}"]`).forEach(e=>e.textContent=money(v[k]));
 document.querySelector('#break-even').textContent=v.breakEven===null?(v.price===0?'Funding needed': 'No positive ticket margin'):`${v.breakEven} paid ${v.breakEven===1?'buyer':'buyers'}`;
 document.querySelector('#break-even-note').textContent=v.price===0?`A free class needs ${money(Math.max(0,-v.cash))} more cash funding under these assumptions.`:'Ticket buyers needed to cover modeled cash costs; preparation time and tax are excluded.';
 document.querySelector('#comparison-body').innerHTML=[0,5,10,25].map(p=>{const x=calculate(input,p);return `<tr${p===+input.price?' class="selected"':''}><th scope="row">${p===0?'Free':money(p)}</th><td>${money(x.gross)}</td><td>${money(x.ticketFees+x.sponsorFees)}</td><td>${money(x.teacher)}</td><td>${money(x.cash)}</td></tr>`}).join('');
 document.querySelector('#buyer-count').textContent=v.attendees;
 document.querySelector('#scenario-status').textContent=`Scenario updated: ${v.attendees} attendees at ${money(v.price)}; ${money(v.cash)} cash remaining before founder labor and tax.`;
}
root.addEventListener('input',update);root.addEventListener('change',update);
document.querySelector('#reset-scenario').addEventListener('click',()=>{root.querySelectorAll('input,select').forEach(e=>{if(e.tagName==='SELECT')e.selectedIndex=[...e.options].findIndex(o=>o.defaultSelected);else e.value=e.defaultValue});update()});
update();
