// قائمة جانبية متجاوبة + تبديل الوضع الليلي + تحسينات تجربة المستخدم

document.addEventListener('DOMContentLoaded', function () {
  // تبديل الوضع الليلي
  const themeBtn = document.getElementById('toggleTheme');
  themeBtn?.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.setAttribute('aria-pressed', newTheme === 'dark');
    themeBtn.querySelector('i').className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });

  // قائمة جانبية للجوال
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== navToggle) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // إغلاق القائمة عند اختيار عنصر
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // تمرير ناعم لجميع الروابط الداخلية
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // تحسينات إضافية: إظهار زر العودة للأعلى عند التمرير
  let backToTop = document.getElementById('backToTop');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'btn ghost';
    backToTop.title = 'العودة للأعلى';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '32px';
    backToTop.style.left = '32px';
    backToTop.style.display = 'none';
    backToTop.style.zIndex = '999';
    document.body.appendChild(backToTop);
  }
  window.addEventListener('scroll', function () {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
