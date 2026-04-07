document.addEventListener('DOMContentLoaded', function() {
  // --- 1. 夜间模式逻辑 ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  // --- 2. 智能导航逻辑 (修复子页面跳转) ---
  const navLinks = document.querySelectorAll('.nav-links a, .logo a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // 如果是首页内部的锚点跳转 (例如 #updates 或 /#updates)
      if (href.includes('#')) {
        const targetID = href.split('#')[1];
        const targetElement = document.getElementById(targetID);

        // 如果当前页面能找到这个 ID (说明在首页)，执行平滑滚动
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        // 如果找不到 ID (说明在文章页)，不拦截，让它正常跳回首页
      }
    });
  });

  // --- 3. FAQ 折叠逻辑 ---
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.parentElement.classList.toggle('active');
    });
  });

  // --- 4. 滚动监听 (导航栏变色) ---
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 5. 简单的淡入观察器 ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
