document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // 1. 初始化主题
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);
  initCusdisTheme(currentTheme);

  // 主题切换
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      initCusdisTheme(theme);
    });
  }

  // 2. 智能导航逻辑
  const navLinks = document.querySelectorAll('.nav-links a, .logo a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href.includes('#')) {
        const targetID = href.split('#')[1];
        const targetElement = document.getElementById(targetID);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. FAQ 折叠逻辑
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.parentElement.classList.toggle('active');
    });
  });

  // 4. 滚动监听 (导航栏变色)
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 5. 淡入观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // 6. 捐赠弹窗
  const donateButton = document.getElementById('donate-button');
  const donateModal = document.getElementById('donate-modal');
  const modalClose = document.querySelector('.modal-close');

  if (donateButton && donateModal) {
    donateButton.addEventListener('click', () => {
      donateModal.style.display = 'flex';
    });
  }

  if (modalClose && donateModal) {
    modalClose.addEventListener('click', () => {
      donateModal.style.display = 'none';
    });
  }

  if (donateModal) {
    window.addEventListener('click', (e) => {
      if (e.target === donateModal) {
        donateModal.style.display = 'none';
      }
    });
  }

  // 7. 进入页面按钮
  const enterButton = document.getElementById('enter-button');
  if (enterButton) {
    enterButton.addEventListener('click', () => {
      const nextSection = document.getElementById('recommendation');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Cusdis 主题初始化函数 (在事件监听器外)
function initCusdisTheme(theme) {
  if (window.CUSDIS && window.CUSDIS.setTheme) {
    window.CUSDIS.setTheme(theme === 'dark' ? 'dark' : 'light');
  }
}

// Cusdis 高度监听 (在事件监听器外)
window.addEventListener('message', e => {
  if (e.data && e.data.type === 'cusdis:height') {
    const iframe = document.querySelector('#cusdis_thread iframe');
    if (iframe) {
      iframe.style.height = e.data.data + 'px';
      iframe.style.minHeight = e.data.data + 'px';
    }
  }
});
