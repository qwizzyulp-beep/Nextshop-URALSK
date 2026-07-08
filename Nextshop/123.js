document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const callbackModal = document.getElementById('callbackModal');
  const callbackOpenButtons = document.querySelectorAll('.js-callback-open');
  const callbackCloseButtons = document.querySelectorAll('.js-callback-close');
  const callbackForm = document.getElementById('callbackForm');
  const callbackStatus = document.getElementById('callbackStatus');
  const orderForm = document.getElementById('orderForm');
  const orderStatus = document.getElementById('formStatus');
  const fabUp = document.getElementById('fabUp');
  const burger = document.getElementById('burger');
  const siteNav = document.getElementById('siteNav');

  const toggleModal = (show) => {
    if (!callbackModal) return;
    callbackModal.setAttribute('aria-hidden', show ? 'false' : 'true');
    document.body.style.overflow = show ? 'hidden' : '';
    if (show) {
      const firstInput = callbackModal.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  };

  callbackOpenButtons.forEach((button) => {
    button.addEventListener('click', () => toggleModal(true));
  });

  callbackCloseButtons.forEach((button) => {
    button.addEventListener('click', () => toggleModal(false));
  });

  if (callbackForm) {
    callbackForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = callbackForm.querySelector('input');
      if (!input || input.value.trim().length < 10) {
        callbackStatus.textContent = 'Пожалуйста, укажите корректный номер телефона.';
        callbackStatus.style.color = 'var(--danger)';
        return;
      }
      callbackStatus.style.color = 'var(--accent)';
      callbackStatus.textContent = 'Спасибо! Мы свяжемся с вами в течение дня.';
      callbackForm.reset();
      setTimeout(() => toggleModal(false), 1600);
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = orderForm.querySelector('input[name="name"]');
      const phone = orderForm.querySelector('input[name="phone"]');
      if (!name.value.trim() || !phone.value.trim()) {
        orderStatus.textContent = 'Заполните имя и телефон, чтобы отправить заявку.';
        orderStatus.style.color = 'var(--danger)';
        return;
      }
      orderStatus.style.color = 'var(--accent)';
      orderStatus.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
      orderForm.reset();
    });
  }

  const updateScrollButton = () => {
    if (!fabUp) return;
    if (window.scrollY > 320) {
      fabUp.classList.add('visible');
    } else {
      fabUp.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', updateScrollButton);

  if (fabUp) {
    fabUp.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (burger && siteNav) {
    burger.addEventListener('click', () => {
      siteNav.classList.toggle('nav--open');
    });
  }

  const categories = [
    { title: 'Двигатель', description: 'Поршни, ремни, шкивы, датчики и расходники.' },
    { title: 'Тормозная система', description: 'Колодки, диски, суппорта и тормозные шланги.' },
    { title: 'Подвеска', description: 'Амортизаторы, сайлентблоки, шаровые и втулки.' },
    { title: 'Электрика', description: 'Аккумуляторы, стартеры, генераторы и датчики.' },
  ];

  const products = [
    { title: 'Колодки передние', category: 'Тормозная система', price: '4 200 ₸', type: 'Тормоза', desc: 'Совместимы с большинством легковых моделей.', info: 'Артикул: BK-113' },
    { title: 'Амортизатор передний', category: 'Подвеска', price: '7 100 ₸', type: 'Подвеска', desc: 'Усиленный от производителя NEXT.', info: 'Артикул: AM-402' },
    { title: 'Топливный фильтр', category: 'Двигатель', price: '1 600 ₸', type: 'Фильтры', desc: 'Оригинальное качество и быстрая замена.', info: 'Артикул: TF-208' },
    { title: 'Аккумулятор 60 Ач', category: 'Электрика', price: '21 900 ₸', type: 'Электрика', desc: 'Гарантия 12 месяцев, стартовый ток 540 А.', info: 'Артикул: AK-660' },
  ];

  const catGrid = document.getElementById('catGrid');
  const productGrid = document.getElementById('productGrid');
  const catalogFilters = document.getElementById('catalogFilters');

  const renderCategories = () => {
    if (!catGrid) return;
    catGrid.innerHTML = categories.map((item) => `
      <article class="cat-card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `).join('');
  };

  const renderProducts = (filter = 'all') => {
    if (!productGrid) return;
    const filtered = filter === 'all' ? products : products.filter((item) => item.category === filter);
    productGrid.innerHTML = filtered.map((item) => `
      <article class="product-card">
        <h3>${item.title}</h3>
        <span>${item.type} · ${item.info}</span>
        <p>${item.desc}</p>
        <div class="price">${item.price}</div>
      </article>
    `).join('');
  };

  const setupFilters = () => {
    if (!catalogFilters) return;
    const filters = ['all', ...new Set(products.map((item) => item.category))];
    catalogFilters.innerHTML = filters.map((filter) => `
      <button class="filter-chip" type="button" data-filter="${filter}">${filter === 'all' ? 'Все' : filter}</button>
    `).join('');
    catalogFilters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      const selected = button.dataset.filter;
      catalogFilters.querySelectorAll('button').forEach((btn) => btn.classList.toggle('is-active', btn === button));
      renderProducts(selected);
    });
    const defaultButton = catalogFilters.querySelector('button[data-filter="all"]');
    if (defaultButton) defaultButton.classList.add('is-active');
  };

  renderCategories();
  setupFilters();
  renderProducts();
});
