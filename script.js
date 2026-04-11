document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);
  initCusdisTheme(currentTheme);  // 页面加载时初始化

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      initCusdisTheme(theme);  // 主题切换时更新
    });
  }
});

// Cusdis 主题初始化函数
function initCusdisTheme(theme) {
  if (window.CUSDIS && window.CUSDIS.setTheme) {
    window.CUSDIS.setTheme(theme === 'dark' ? 'dark' : 'light');
  }
}

// 监听 Cusdis 加载完成后调整高度
window.addEventListener('message', e => {
  if (e.data && e.data.type === 'cusdis:height') {
    const iframe = document.querySelector('#cusdis_thread iframe');
    if (iframe) {
      iframe.style.height = e.data.data + 'px';
      iframe.style.minHeight = e.data.data + 'px';
    }
  }
});

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

window.addEventListener('message', e => {
  if (e.data && e.data.type === 'cusdis:height') {
    const iframe = document.querySelector('#cusdis_thread iframe');
    if (iframe) {
      iframe.style.height = e.data.data + 'px';
    }
  }
});
