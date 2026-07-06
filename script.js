const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.site-nav');menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));
document.querySelectorAll('.faq-item button').forEach(button=>button.addEventListener('click',()=>{const item=button.closest('.faq-item');const isOpen=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(other=>{other.classList.remove('open');other.querySelector('button').setAttribute('aria-expanded','false');other.querySelector('button span').textContent='＋'});if(!isOpen){item.classList.add('open');button.setAttribute('aria-expanded','true');button.querySelector('span').textContent='−'}}));
const roles={admin:{tag:'ADMIN VIEW',title:'See the full school picture',copy:'Coordinate admissions, staff, academics, fees and reporting from a shared operational view.',items:['Centralized records and permissions','Consistent day-to-day processes','Decision-ready dashboards']},teacher:{tag:'TEACHER VIEW',title:'Keep classroom work moving',copy:'Handle attendance, timetables, assignments and student progress without juggling disconnected tools.',items:['Faster classroom routines','Clear academic schedules','Current student context']},parent:{tag:'PARENT EXPERIENCE',title:'Stay informed without the noise',copy:'Give families a clearer channel for school notices, academic updates and important reminders.',items:['Relevant school updates','Better communication continuity','A more connected experience']}};
document.querySelectorAll('.role-tabs>button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.role-tabs>button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});button.classList.add('active');button.setAttribute('aria-selected','true');const data=roles[button.dataset.role];document.querySelector('#role-panel').innerHTML=`<span>${data.tag}</span><h3>${data.title}</h3><p>${data.copy}</p><ul>${data.items.map(item=>`<li>${item}</li>`).join('')}</ul>`}));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const reveals=document.querySelectorAll('.reveal');if(reduced){reveals.forEach(el=>el.classList.add('visible'))}else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});reveals.forEach(el=>observer.observe(el))}
const SITE_NAME='School Management System';
const GOOGLE_SCRIPT_URL='https://script.google.com/macros/s/AKfycbwwLxYf-0OoxZbBAdw3-RW_5mem-Hje0VaVwrFdoR0AavsxBRpgIQeWGaN2vaIocDHkHA/exec';

async function handleSubmit(event){
  event.preventDefault();
  const enquiryForm=event.currentTarget;
  const submitBtn=enquiryForm.querySelector('button[type="submit"]');
  const statusEl=document.querySelector('#form-status');
  const originalLabel=submitBtn.textContent;
  submitBtn.disabled=true;
  submitBtn.textContent='Submitting…';
  statusEl.textContent='';
  statusEl.className='form-status';
  const fd=new FormData(enquiryForm);
  const payload={name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),message:fd.get('message'),campaign:SITE_NAME,url:window.location.href};
  try{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    statusEl.textContent='✓ Thank you! Your enquiry has been submitted successfully.';
    statusEl.className='form-status success';
    enquiryForm.reset();
  }catch(error){
    console.error('Form submission error:',error);
    statusEl.textContent='✕ Something went wrong. Please try again.';
    statusEl.className='form-status error';
  }finally{
    submitBtn.disabled=false;
    submitBtn.textContent=originalLabel;
  }
}

document.querySelector('#year').textContent=new Date().getFullYear();
