// Helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// set year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (data-theme on root)
const themeBtn = document.getElementById('toggleTheme');
function getTheme(){ return document.documentElement.getAttribute('data-theme') || 'light' }
function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeBtn.setAttribute('aria-pressed', t === 'dark');
  themeBtn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i><span class="visually-hidden">وضع فاتح</span>' : '<i class="fas fa-moon"></i><span class="visually-hidden">وضع داكن</span>';
}
themeBtn.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));

// IntersectionObserver for reveal and progress bars
const ioOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // animate progress fills inside
      entry.target.querySelectorAll('.progress-fill').forEach(p => {
        const val = Number(p.dataset.progress || 0);
        p.style.width = val + '%';
      });
      obs.unobserve(entry.target);
    }
  });
}, ioOptions);

// observe all .reveal or .card
$$('.reveal, .card').forEach(el => io.observe(el));

// Contact form: build mailto and open user's mail client
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if(!name || !email || !message){
    alert('الرجاء تعبئة جميع الحقول');
    return;
  }

  // build mailto
  const to = 'your-email@example.com'; // <-- غيّر إلى إيميلك
  const subject = encodeURIComponent(`رسالة من ${name} عبر صفحة خُزيمة`);
  const body = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\nالرسالة:\n${message}`);
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

  // فتح تطبيق البريد
  window.location.href = mailto;
});

// small enhancement: reduce motion for users who prefer reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  // Disable progress animation transitions
  document.querySelectorAll('.progress-fill').forEach(p => p.style.transition = 'none');
}

// Optional: smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});
