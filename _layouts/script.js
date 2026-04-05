// 页面 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 平滑滚动：导航链接点击时，滚动到相应锚点
  const navLinks = document.querySelectorAll('a[href^="#"]');
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
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      let targetID = this.getAttribute('href').substring(1);
      let targetElement = document.getElementById(targetID);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // “进入网站”按钮：滚动到最新更新板块
  const enterBtn = document.getElementById('enter-button');
  if (enterBtn) {
    enterBtn.addEventListener('click', function() {
      let updatesSection = document.getElementById('whatIsKA');
      if (updatesSection) {
        updatesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // FAQ 折叠：点击问题时展开/收起答案
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    let question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      // 切换当前项的 active 状态
      item.classList.toggle('active');
    });
  });

  // 捐赠按钮和弹窗逻辑
  const donateBtn = document.getElementById('donate-button');
  const modal = document.getElementById('donate-modal');
  const modalClose = document.querySelector('.modal-close');
  if (donateBtn && modal) {
    donateBtn.addEventListener('click', function() {
      modal.style.display = 'flex'; // 显示弹窗
    });
  }
  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.style.display = 'none'; // 关闭弹窗
    });
  }
  // 点击弹窗外部也关闭弹窗
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 名词解释搜索功能
  const searchInput = document.getElementById('glossary-search');
  const glossaryList = document.getElementById('glossary-list');
  if (searchInput && glossaryList) {
    searchInput.addEventListener('input', function() {
      let filter = this.value.trim().toLowerCase();
      let items = glossaryList.getElementsByTagName('li');
      Array.from(items).forEach(item => {
        // 如果术语或解释包含搜索关键字，则显示，否则隐藏
        if (item.textContent.toLowerCase().indexOf(filter) > -1) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    // 当滚动超过 100 像素（或者 window.innerHeight 封面高度）时添加类
    if (window.scrollY > 100) { 
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
  });

  // 滚动动画：当带有 .fade-in 的元素进入视口时添加 .show 类
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeElements.forEach(el => {
    observer.observe(el);
  });
});
