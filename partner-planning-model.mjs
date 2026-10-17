// Illustrative USD planning model. No data persistence or payment integration.
const finite=(v,f=0,max=1e7)=>Math.min(max,Math.max(0,Number.isFinite(+v)?+v:f));
export function calculate(input={},price=10){
 const attendees=Math.floor(finite(input.attendees,20,100000));
 price=finite(price,10,100000);
 const sponsor=finite(input.sponsor),software=finite(input.software,17),ads=finite(input.ads),other=finite(input.other);
 const pct=finite(input.cardPct,2.9,100)/100,fixed=finite(input.cardFixed,.30,1000);
 const teacherRate=finite(input.teacherPct,10,100)/100,flat=input.teacherMode==='flat';
 const ticketGross=attendees*price,gross=ticketGross+sponsor;
 const ticketFees=price>0?ticketGross*pct+attendees*fixed:0;
 const sponsorFees=sponsor>0?(input.sponsorMethod==='card'?sponsor*pct+fixed:input.sponsorMethod==='custom'?finite(input.sponsorFee):0):0;
 const teacher=flat?finite(input.teacherFlat):gross*teacherRate;
 const cash=gross-ticketFees-sponsorFees-teacher-software-ads-other;
 const labor=finite(input.laborHours,3,10000)*finite(input.laborRate,50,100000);
 const contribution=price*(1-pct-(flat?0:teacherRate))-fixed;
 const fixedToCover=software+ads+other+(flat?teacher:0)-sponsor+sponsorFees+(flat?0:sponsor*teacherRate);
 const breakEven=price===0?null:fixedToCover<=0?0:contribution>0?Math.ceil((fixedToCover-1e-9)/contribution):null;
 return {attendees,price,ticketGross,sponsor,gross,ticketFees,sponsorFees,teacher,software,ads,other,cash,labor,afterLabor:cash-labor,breakEven};
}
