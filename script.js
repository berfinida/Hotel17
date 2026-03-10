(function(){
  const root = document.documentElement;
  const THEME_KEY = 'hotel17-theme';
  const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const menu = document.getElementById('mobile-menu');
  const menuPanel = menu ? menu.querySelector('.mobile-menu-panel') : null;
  const menuToggle = document.getElementById('menu-toggle');
  const menuCloseTriggers = menu ? menu.querySelectorAll('[data-menu-close]') : [];
  const menuLinks = menu ? menu.querySelectorAll('a') : [];
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');
  const contactNameField = document.getElementById('contact-name-field');
  const contactEmailField = document.getElementById('contact-email-field');
  const contactMessageField = document.getElementById('contact-message-field');
  const bookingPsychology = document.getElementById('booking-psychology');
  const heroSection = document.querySelector('.hero');
  const header = document.querySelector('.header');
  const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
  const galleryLightbox = document.getElementById('gallery-lightbox');
  const galleryLightboxImage = galleryLightbox ? galleryLightbox.querySelector('#gallery-lightbox-image') : null;
  const galleryLightboxCaption = galleryLightbox ? galleryLightbox.querySelector('#gallery-lightbox-caption') : null;
  const galleryLightboxCounter = galleryLightbox ? galleryLightbox.querySelector('#gallery-lightbox-count') : null;
  const galleryLightboxPrev = galleryLightbox ? galleryLightbox.querySelector('[data-gallery-prev]') : null;
  const galleryLightboxNext = galleryLightbox ? galleryLightbox.querySelector('[data-gallery-next]') : null;
  const galleryLightboxCloseBtn = galleryLightbox ? galleryLightbox.querySelector('.gallery-lightbox-close') : null;
  const galleryLightboxClose = galleryLightbox ? galleryLightbox.querySelectorAll('[data-gallery-lightbox-close]') : [];
  const modal = document.getElementById('room-detail-modal');
  const modalDialog = modal ? modal.querySelector('.room-modal-dialog') : null;
  const modalTriggers = document.querySelectorAll('.room-card[data-room]');
  const modalCloseTriggers = modal ? modal.querySelectorAll('[data-room-close]') : [];
  const heroImage = document.getElementById('room-modal-hero-image');
  const eyebrow = document.getElementById('room-modal-eyebrow');
  const title = document.getElementById('room-modal-title');
  const subtitle = document.getElementById('room-modal-subtitle');
  const description = document.getElementById('room-modal-description');
  const capacity = document.getElementById('room-modal-capacity');
  const bed = document.getElementById('room-modal-bed');
  const amenities = document.getElementById('room-modal-amenities');
  const gallery = document.getElementById('room-modal-gallery');

  const roomDataByLang = {
    tr: {
      exclusive: {
        eyebrow: 'Exclusive Suite',
        title: 'Exclusive Oda',
        subtitle: 'Şehrin merkezinde geniş ve lüks bir konfor.',
        description: 'Geniş yatak, özel oturma alanı, sıcak ışıklar ve imza lounge hissiyle tasarlandı.',
        capacity: '3 Misafire Kadar',
        bed: '1 King Bed + Lounge Sofa',
        size: '36 m²',
        breakfast: 'Kahvaltı Dahil',
        hero: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80',
        amenities: ['Özel oturma alanı', 'Premium kahve seti', 'Geniş yağmur duşu', 'Akıllı TV ve ses sistemi'],
        gallery: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80']
      },
      deluxe: {
        eyebrow: 'Deluxe Comfort',
        title: 'Deluxe Oda',
        subtitle: 'Zarif detaylar ve dengeli konfor.',
        description: 'Doğal dokular, fonksiyonel düzen ve sakin paletle modern konfor.',
        capacity: '2 Misafire Kadar',
        bed: '1 Queen Bed',
        size: '28 m²',
        breakfast: 'Kahvaltı Dahil',
        hero: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1800&q=80',
        amenities: ['Çalışma masası', 'Nespresso kahve makinesi', 'Hızlı Wi-Fi', 'Sessiz klima'],
        gallery: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1000&q=80']
      },
      standard: {
        eyebrow: 'Refined Standard',
        title: 'Standart Oda',
        subtitle: 'Sade lüks ve işlevsel konfor.',
        description: 'Kompakt plan, ortopedik yatak ve sakin ışıklarla huzurlu konaklama.',
        capacity: '2 Misafire Kadar',
        bed: '1 Double Bed',
        size: '22 m²',
        breakfast: 'Opsiyonel',
        hero: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1800&q=80',
        amenities: ['Ortopedik yatak', 'Yağmur duşu', 'Minibar', 'Günlük temizlik'],
        gallery: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1000&q=80']
      },
      economy: {
        eyebrow: 'Smart Stay',
        title: 'Ekonomi Oda',
        subtitle: 'Akıllı fiyat, sıcak atmosfer ve merkezi konum.',
        description: 'Kısa konaklamalar için temel konforu sıcak bir atmosferle sunar.',
        capacity: '2 Misafire Kadar',
        bed: '1 Double Bed',
        size: '20 m²',
        breakfast: 'Opsiyonel',
        hero: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=80',
        amenities: ['Hızlı check-in', 'Akıllı depolama', 'Isıtma-soğutma', 'Ücretsiz Wi-Fi'],
        gallery: ['https://images.unsplash.com/photo-1616594039964-3f58f2fd8cf3?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80']
      }
    },
    en: {}
  };
  roomDataByLang.en = JSON.parse(JSON.stringify(roomDataByLang.tr));
  Object.keys(roomDataByLang.en).forEach(function(key){
    const room = roomDataByLang.en[key];
    room.title = room.title.replace('Oda','Room');
    room.subtitle = {
      exclusive: 'Spacious, luminous comfort in the heart of the city.',
      deluxe: 'Balanced comfort with refined details.',
      standard: 'Essential comfort with a clean aesthetic.',
      economy: 'Smart rates, warm atmosphere, central access.'
    }[key];
    room.description = {
      exclusive: 'King bed, private lounge corner, warm lighting, and signature lounge feel.',
      deluxe: 'Natural textures, functional layout, and a calm palette for modern comfort.',
      standard: 'Compact plan with orthopedic bed, soft lighting, and calm colors.',
      economy: 'Designed for short escapes with essential comfort and a warm feel.'
    }[key];
    room.capacity = {
      exclusive: 'Up to 3 Guests',
      deluxe: 'Up to 2 Guests',
      standard: 'Up to 2 Guests',
      economy: 'Up to 2 Guests'
    }[key];
    room.bed = room.bed.replace('Oda','Room');
  });
  Object.keys(roomDataByLang.en).forEach(function(key){
    const room = roomDataByLang.en[key];
    if (!room) return;
    room.amenities = {
      exclusive: ['Private lounge corner', 'Premium coffee set', 'Large rain shower', 'Smart TV & sound system'],
      deluxe: ['Work desk', 'Nespresso machine', 'High-speed Wi-Fi', 'Quiet climate control'],
      standard: ['Orthopedic bed', 'Rain shower', 'Minibar', 'Daily housekeeping'],
      economy: ['Fast check-in', 'Smart storage', 'Heating & cooling', 'Free Wi-Fi']
    }[key] || room.amenities;
    room.breakfast = {
      exclusive: 'Breakfast Included',
      deluxe: 'Breakfast Included',
      standard: 'Optional',
      economy: 'Optional'
    }[key] || room.breakfast;
    room.size = {
      exclusive: '36 m²',
      deluxe: '28 m²',
      standard: '22 m²',
      economy: '20 m²'
    }[key] || room.size;
  });

  const bookingPsychologyMessagesByLang = {
    tr: [
      'Bugün talebiniz ulaştığında en kısa sürede geri dönüş hedefliyoruz.',
      'Ödeme ve konaklama tercihlerinizi onayladığınızda en hızlı şekilde dönüş sağlıyoruz.',
      'Erken planlamadaki odalarımız, size daha fazla güven ve konfor sağlar.'
    ],
    en: [
      'We aim to respond quickly when your request arrives today.',
      'Once you confirm payment and stay preferences, we reply fast.',
      'Early planning gives you more confidence and comfort.'
    ]
  };
  let bookingPsychologyMessages = bookingPsychologyMessagesByLang.tr;

  function setTheme(theme){
    root.setAttribute('data-theme', theme);
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){}
    const label = theme === 'light' ? '&#9728;' : '&#9790;';
    themeToggles.forEach(btn => { btn.innerHTML = label; });
  }

  function readStoredTheme(){
    try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; }
  }

  function toggleTheme(){
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(next);
  }

  themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));
  setTheme(readStoredTheme() || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.langBtn === 'en' ? 'en' : 'tr';
      langButtons.forEach(b => {
        const active = b.dataset.langBtn === lang;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      applyTranslations(lang);
    });
  });

  function getActiveLang(){
    const activeBtn = Array.from(langButtons).find(b => b.classList.contains('is-active'));
    if (activeBtn) return activeBtn.dataset.langBtn === 'en' ? 'en' : 'tr';
    return document.documentElement.lang === 'en' ? 'en' : 'tr';
  }

  function openMenu(){
    if (!menu || !menuPanel) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden','false');
    document.body.classList.add('menu-open');
    menuToggle && menuToggle.setAttribute('aria-expanded','true');
    menuPanel.focus({preventScroll:true});
  }
  function closeMenu(){
    if (!menu || !menuPanel) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden','true');
    document.body.classList.remove('menu-open');
    menuToggle && menuToggle.setAttribute('aria-expanded','false');
    menuToggle && menuToggle.focus({preventScroll:true});
  }
  if (menuToggle) menuToggle.addEventListener('click', () => menu && menu.classList.contains('is-open') ? closeMenu() : openMenu());
  menuCloseTriggers.forEach(node => node.addEventListener('click', closeMenu));
  menuLinks.forEach(node => node.addEventListener('click', closeMenu));

  function trapFocus(container, event){
    if (event.key !== 'Tab' || !container) return;
    const focusable = Array.from(container.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu && menu.classList.contains('is-open')) closeMenu();
    if (event.key === 'Tab' && menu && menu.classList.contains('is-open')) trapFocus(menuPanel, event);
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
    if (event.key === 'Tab' && modal && modal.classList.contains('is-open')) trapFocus(modalDialog, event);
  });

  function setBookingPsychologyMessage(index){
    if (!bookingPsychology) return;
    bookingPsychology.textContent = bookingPsychologyMessages[index % bookingPsychologyMessages.length];
  }
  function startBookingPsychologyTicker(){
    if (!bookingPsychology) return;
    setBookingPsychologyMessage(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % bookingPsychologyMessages.length;
      setBookingPsychologyMessage(idx);
    }, 4300);
  }

  function setRoomContent(roomKey){
    if (!modal || !roomDataByLang.tr[roomKey]) return;
    const lang = langButtons && Array.from(langButtons).some(btn => btn.classList.contains('is-active') && btn.dataset.langBtn === 'en') ? 'en' : 'tr';
    const room = roomDataByLang[lang][roomKey];
    if (!room || !heroImage || !eyebrow || !title || !subtitle || !description || !capacity || !bed || !amenities || !gallery) return;
    heroImage.src = room.hero;
    heroImage.alt = room.title;
    eyebrow.textContent = room.eyebrow;
    title.textContent = room.title;
    subtitle.textContent = room.subtitle;
    description.textContent = room.description;
    capacity.textContent = room.capacity;
    bed.textContent = room.bed;
    amenities.innerHTML = room.amenities.map(item => '<div class="room-modal-amenity">' + item + '</div>').join('');
    const galleryAlt = lang === 'en' ? room.title + ' image' : room.title + ' görseli';
    gallery.innerHTML = room.gallery.map(src => '<img loading="lazy" decoding="async" src="' + src + '" alt="' + galleryAlt + '">').join('');

    const sizeWrap = document.getElementById('room-modal-size-wrap');
    const sizeNode = document.getElementById('room-modal-size');
    if (sizeWrap && sizeNode) {
      if (room.size) {
        sizeNode.textContent = room.size;
        sizeWrap.hidden = false;
      } else {
        sizeWrap.hidden = true;
      }
    }
    const breakfastWrap = document.getElementById('room-modal-breakfast-wrap');
    const breakfastNode = document.getElementById('room-modal-breakfast');
    if (breakfastWrap && breakfastNode) {
      if (room.breakfast) {
        breakfastNode.textContent = room.breakfast;
        breakfastWrap.hidden = false;
      } else {
        breakfastWrap.hidden = true;
      }
    }
  }

  function openModal(roomKey){
    if (!modal || !modalDialog) return;
    setRoomContent(roomKey);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    modalDialog.focus({preventScroll:true});
  }

  function closeModal(){
    if (!modal || !modalDialog) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  modalTriggers.forEach(card => {
    card.addEventListener('click', (e) => { e.preventDefault(); openModal(card.dataset.room); });
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.room); } });
  });
  modalCloseTriggers.forEach(btn => btn.addEventListener('click', closeModal));

  const galleryLightboxCards = galleryCards.map(card => {
    const img = card.querySelector('img');
    const titleNode = card.querySelector('.gallery-copy h3');
    return img ? { src: img.src, alt: img.alt || '', caption: titleNode ? titleNode.textContent.trim() : '' } : null;
  }).filter(Boolean);
  let activeGalleryIndex = 0;
  let lastFocused = null;

  function renderGallery(index){
    if (!galleryLightboxImage || !galleryLightboxCaption || !galleryLightboxCounter) return;
    const item = galleryLightboxCards[index];
    if (!item) return;
    galleryLightboxImage.classList.add('is-swapping');
    galleryLightboxImage.onload = () => {
      galleryLightboxImage.classList.remove('is-swapping');
    };
    galleryLightboxImage.src = item.src;
    galleryLightboxImage.alt = item.alt;
    galleryLightboxCaption.textContent = item.caption;
    galleryLightboxCounter.textContent = (index + 1) + ' / ' + galleryLightboxCards.length;
    if (galleryLightboxImage.complete) {
      window.setTimeout(() => galleryLightboxImage.classList.remove('is-swapping'), 0);
    }
  }

  function openGallery(index){
    if (!galleryLightbox) return;
    activeGalleryIndex = index;
    renderGallery(activeGalleryIndex);
    galleryLightbox.classList.add('is-open');
    galleryLightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('lightbox-open');
    lastFocused = document.activeElement;
    galleryLightboxCloseBtn && galleryLightboxCloseBtn.focus({preventScroll:true});
  }

  function closeGallery(){
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('is-open');
    galleryLightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('lightbox-open');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function prevGallery(){
    activeGalleryIndex = (activeGalleryIndex - 1 + galleryLightboxCards.length) % galleryLightboxCards.length;
    renderGallery(activeGalleryIndex);
  }
  function nextGallery(){
    activeGalleryIndex = (activeGalleryIndex + 1) % galleryLightboxCards.length;
    renderGallery(activeGalleryIndex);
  }

  galleryCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.addEventListener('click', () => openGallery(index));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGallery(index); } });
  });
  galleryLightboxClose.forEach(btn => btn.addEventListener('click', closeGallery));
  if (galleryLightboxPrev) galleryLightboxPrev.addEventListener('click', prevGallery);
  if (galleryLightboxNext) galleryLightboxNext.addEventListener('click', nextGallery);
  document.addEventListener('keydown', (e) => {
    if (!galleryLightbox || !galleryLightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') return closeGallery();
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevGallery(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); nextGallery(); }
  });

  function validateEmail(value){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
  function setFieldError(fieldWrap, errorNode, message){
    if (!fieldWrap || !errorNode) return;
    if (!message){ fieldWrap.classList.remove('is-invalid'); errorNode.textContent=''; errorNode.classList.remove('visible'); return; }
    fieldWrap.classList.add('is-invalid');
    errorNode.textContent = message;
    errorNode.classList.add('visible');
  }
  function setContactStatus(message, state){
    if (!contactStatus) return;
    contactStatus.textContent = message || '';
    contactStatus.classList.remove('success','error');
    if (state) contactStatus.classList.add(state);
  }
  function validateContact(){
    let valid = true;
    const strings = getStrings(getActiveLang());
    const nameVal = contactName && contactName.value.trim();
    const emailVal = contactEmail && contactEmail.value.trim();
    const msgVal = contactMessage && contactMessage.value.trim();
    setFieldError(contactNameField, document.getElementById('contact-name-error'), '');
    setFieldError(contactEmailField, document.getElementById('contact-email-error'), '');
    setFieldError(contactMessageField, document.getElementById('contact-message-error'), '');
    if (!nameVal){ setFieldError(contactNameField, document.getElementById('contact-name-error'), strings.contact_error_name); valid = false; }
    if (!validateEmail(emailVal)){ setFieldError(contactEmailField, document.getElementById('contact-email-error'), strings.contact_error_email); valid = false; }
    if (!msgVal || msgVal.length < 10){ setFieldError(contactMessageField, document.getElementById('contact-message-error'), strings.contact_error_message); valid = false; }
    return valid;
  }
  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const strings = getStrings(getActiveLang());
      if (!validateContact()) { setContactStatus(strings.contact_status_error, 'error'); return; }
      contactForm.reset();
      setContactStatus(strings.contact_status_success, 'success');
    });
  }

  function updateHeroParallax(){
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    const range = Math.max(heroSection.offsetHeight || window.innerHeight, 420);
    const progress = Math.max(0, Math.min(range, -rect.top));
    const ratio = progress / range;
    heroSection.style.setProperty('--hero-parallax-offset', (ratio * -16).toFixed(2) + 'px');
  }
  function scheduleParallax(){ window.requestAnimationFrame(updateHeroParallax); }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.addEventListener('scroll', scheduleParallax, {passive:true});
    window.addEventListener('resize', scheduleParallax);
    scheduleParallax();
  }

  /* Header scroll state */
  function updateHeaderState(){
    if (!header) return;
    const scrolled = window.scrollY > 10;
    header.classList.toggle('header-scrolled', scrolled);
  }
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  function hideLoader(){
    if (hideLoader.done) return;
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    hideLoader.done = true;
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.style.overflow = '';
      setTimeout(() => { loader.remove(); }, 700);
    }, 1000);
  }

  if (document.readyState === 'complete') hideLoader();
  else window.addEventListener('load', hideLoader, { once: true });
  setTimeout(hideLoader, 3000);

  startBookingPsychologyTicker();

  /* Register reveal targets */
  [
    ['.section', 'fade-up'],
    ['.room-card', 'fade-up'],
    ['.gallery-card', 'fade-up'],
    ['.stat', 'fade-in']
  ].forEach((pair) => {
    const selector = pair[0];
    const anim = pair[1];
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('reveal', anim);
    });
  });

  /* Scroll reveal */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* Loader fade-out */
  window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.style.overflow = '';
      setTimeout(() => loader.remove(), 700);
    }, 1000);
  });

  /* Booking form simulation */
  const bookingForm = document.getElementById('booking-form');
  const bookingCheckin = document.getElementById('booking-checkin');
  const bookingCheckout = document.getElementById('booking-checkout');
  const bookingGuests = document.getElementById('booking-guests');
  const bookingRoom = document.getElementById('booking-room');
  const bookingStatus = document.getElementById('booking-status');
  const bookingSubmit = bookingForm ? bookingForm.querySelector('button[type="submit"]') : null;
  const bookingModal = document.getElementById('booking-result-modal');
  const bookingModalDialog = bookingModal ? bookingModal.querySelector('.booking-modal-dialog') : null;
  const bookingClose = bookingModal ? bookingModal.querySelectorAll('[data-booking-close]') : [];
  const summaryCheckin = document.getElementById('summary-checkin');
  const summaryCheckout = document.getElementById('summary-checkout');
  const summaryGuests = document.getElementById('summary-guests');
  const summaryRoom = document.getElementById('summary-room');
  const summaryRate = document.getElementById('summary-rate');
  const summaryTotal = document.getElementById('summary-total');
  const bookingContinueBtn = document.getElementById('booking-continue-btn');
  const bookingContactBtn = document.getElementById('booking-contact-btn');

    let i18nStrings = { tr: {}, en: {} };
  const fallbackStrings = {
    booking_status_required: 'Lütfen tüm alanları doldurun.',
    booking_status_date: 'Çıkış tarihi, giriş tarihinden sonra olmalıdır.',
    booking_submit_loading: 'Gönderiliyor...',
    booking_status_success: 'Talebiniz alındı. En kısa sürede size dönüş yapacağız.',
    booking_rate_suffix: ' / gece',
    booking_result_title: 'İyi haber — bu tarihlerde müsaitliğimiz var',
    booking_result_desc: 'Bu tarihler için sadece birkaç oda kaldı. Misafirlerin çoğu rezervasyonunu aynı gün tamamlıyor.',
    booking_submit: 'Oda Müsaitliğini Kontrol Et',
    booking_continue: 'Rezervasyona Devam Et',
    booking_contact: 'İletişim Formu',
    booking_whatsapp: 'WhatsApp ile İletişim',
    booking_modal_badge: 'Premium Demo',
    booking_modal_eyebrow: 'Müsaitlik',
    room_economy: 'Ekonomi',
    room_standard: 'Standart',
    room_deluxe: 'Deluxe',
    room_exclusive: 'Exclusive',
    contact_status_error: 'Lütfen formu eksiksiz tamamlayın.',
    contact_status_success: 'Mesajınız alındı, kısa sürede dönüş yapacağız.',
    contact_error_name: 'Lütfen adınızı girin.',
    contact_error_email: 'Lütfen geçerli bir e-posta girin.',
    contact_error_message: 'Mesajınız en az 10 karakter olmalı.'
  };
  let i18nLoaded = false;

  function getStrings(lang){
    const strings = i18nStrings && i18nStrings[lang];
    if (strings && Object.keys(strings).length) return strings;
    return fallbackStrings;
  }

    function readEmbeddedI18n(){
    const node = document.getElementById('i18n-data');
    if (!node) return null;
    try {
      return JSON.parse(node.textContent);
    } catch (e) {
      return null;
    }
  }

  function loadI18n(){
    const embedded = readEmbeddedI18n();
    if (embedded && typeof embedded === 'object') {
      i18nStrings = embedded;
      i18nLoaded = true;
      return Promise.resolve(embedded);
    }
    return fetch('i18n.json', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          i18nStrings = data;
          i18nLoaded = true;
        }
        return data;
      })
      .catch(() => {
        i18nLoaded = false;
        return null;
      });
  }
  const ROOM_SUGGESTIONS = {
    '1': 'economy',
    '2': 'standard',
    '3': 'deluxe',
    '4': 'exclusive'
  };

  const roomRates = {
    economy: 2200,
    standard: 2900,
    deluxe: 3900,
    exclusive: 4900
  };

  function formatPrice(value){
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value);
  }

  function diffNights(checkIn, checkOut){
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }

  function toInputDate(value){
    const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function addDays(date, days){
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    next.setDate(next.getDate() + days);
    return next;
  }

  function syncCheckoutMin(){
    if (!bookingCheckin || !bookingCheckout) return;
    const checkinDate = bookingCheckin.value ? new Date(bookingCheckin.value) : new Date();
    const minCheckout = addDays(checkinDate, 1);
    const minValue = toInputDate(minCheckout);
    bookingCheckout.min = minValue;
    if (!bookingCheckout.value || new Date(bookingCheckout.value) <= checkinDate){
      bookingCheckout.value = minValue;
    }
  }

  function setDefaultBookingDates(){
    if (!bookingCheckin || !bookingCheckout) return;
    const today = new Date();
    const tomorrow = addDays(today, 1);
    bookingCheckin.value = toInputDate(today);
    bookingCheckin.min = toInputDate(today);
    bookingCheckout.value = toInputDate(tomorrow);
    bookingCheckout.min = toInputDate(tomorrow);
  }

  function applyRoomSuggestion(){
    if (!bookingGuests || !bookingRoom) return;
    const rawValue = bookingGuests.value || '';
    const numeric = rawValue.match(/\d+/);
    const suggested = ROOM_SUGGESTIONS[numeric ? numeric[0] : rawValue];
    if (suggested) bookingRoom.value = suggested;
  }
  function applyTranslations(lang){
    const strings = getStrings(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      if (key && strings[key]) node.textContent = strings[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(node => {
      const mapping = node.getAttribute('data-i18n-attr');
      if (!mapping) return;
      mapping.split(',').forEach(pair => {
        const parts = pair.split(':').map(item => item.trim());
        if (parts.length !== 2) return;
        const attr = parts[0];
        const key = parts[1];
        if (attr && key && strings[key]) node.setAttribute(attr, strings[key]);
      });
    });
    if (bookingSubmit) bookingSubmit.textContent = strings.booking_submit || bookingSubmit.textContent;
    bookingPsychologyMessages = bookingPsychologyMessagesByLang[lang] || bookingPsychologyMessagesByLang.tr;
    setBookingPsychologyMessage(0);
    if (bookingStatus && bookingStatus.dataset.i18nKey && strings[bookingStatus.dataset.i18nKey]) {
      bookingStatus.textContent = strings[bookingStatus.dataset.i18nKey];
    }
  }

  const initialLang = getActiveLang();
  loadI18n().then(() => applyTranslations(initialLang));

  function openBookingModal(){
    if (!bookingModal) return;
    bookingModal.classList.add('is-open');
    bookingModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    bookingModalDialog && bookingModalDialog.focus({preventScroll:true});
  }

  function closeBookingModal(){
    if (!bookingModal) return;
    bookingModal.classList.remove('is-open');
    bookingModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  if (bookingClose && bookingClose.length){
    bookingClose.forEach(btn => btn.addEventListener('click', closeBookingModal));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('is-open')) {
      closeBookingModal();
    }
  });

  if (bookingContinueBtn){
    bookingContinueBtn.addEventListener('click', closeBookingModal);
  }
  if (bookingContactBtn){
    bookingContactBtn.addEventListener('click', () => {
      closeBookingModal();
      const contact = document.getElementById('contact');
      contact && contact.scrollIntoView({ behavior:'smooth' });
    });
  }

  function validateBookingForm(){
    if (!bookingCheckin || !bookingCheckout || !bookingGuests || !bookingRoom) return false;
    const checkinVal = bookingCheckin.value;
    const checkoutVal = bookingCheckout.value;
    const guestsVal = bookingGuests.value;
    const roomVal = bookingRoom.value;
    const strings = getStrings(getActiveLang());
    bookingStatus.textContent = '';
    bookingStatus.dataset.i18nKey = '';

    if (!checkinVal || !checkoutVal || !guestsVal || !roomVal){
      bookingStatus.textContent = strings.booking_status_required;
      bookingStatus.dataset.i18nKey = 'booking_status_required';
      return false;
    }
    if (new Date(checkoutVal) <= new Date(checkinVal)){
      bookingStatus.textContent = strings.booking_status_date;
      bookingStatus.dataset.i18nKey = 'booking_status_date';
      return false;
    }
    return true;
  }

  if (bookingForm){
    setDefaultBookingDates();
    syncCheckoutMin();
    applyRoomSuggestion();
    if (bookingCheckin){
      bookingCheckin.addEventListener('change', () => {
        syncCheckoutMin();
      });
    }
    if (bookingCheckout){
      bookingCheckout.addEventListener('change', () => {
        syncCheckoutMin();
      });
    }
    if (bookingGuests){
      bookingGuests.addEventListener('change', applyRoomSuggestion);
    }
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateBookingForm()) return;
      const strings = getStrings(getActiveLang());
      if (bookingSubmit){
        bookingSubmit.disabled = true;
        bookingSubmit.dataset.label = bookingSubmit.textContent;
        bookingSubmit.textContent = strings.booking_submit_loading;
      }
      const checkinVal = bookingCheckin.value;
      const checkoutVal = bookingCheckout.value;
      const guestsVal = bookingGuests.value;
      const guestsLabel = bookingGuests.options[bookingGuests.selectedIndex] ? bookingGuests.options[bookingGuests.selectedIndex].textContent : guestsVal;
      const roomVal = bookingRoom.value;
      const nights = diffNights(checkinVal, checkoutVal);
      const rate = roomRates[roomVal] || 3200;
      const total = rate * nights;

      summaryCheckin.textContent = checkinVal;
      summaryCheckout.textContent = checkoutVal;
      summaryGuests.textContent = guestsLabel;
      summaryRoom.textContent = strings['room_' + roomVal] || (roomVal.charAt(0).toUpperCase() + roomVal.slice(1));
      summaryRate.textContent = formatPrice(rate) + strings.booking_rate_suffix;
      summaryTotal.textContent = formatPrice(total);
      document.getElementById('booking-result-title').textContent = strings.booking_result_title;
      document.getElementById('booking-result-title').nextElementSibling.textContent = strings.booking_result_desc;

      setTimeout(() => {
        bookingStatus.textContent = strings.booking_status_success;
        bookingStatus.dataset.i18nKey = 'booking_status_success';
        openBookingModal();
        if (bookingSubmit){
          bookingSubmit.disabled = false;
          bookingSubmit.textContent = bookingSubmit.dataset.label || strings.booking_submit;
        }
      }, 500);
    });
  }

  /* Hero stagger entrance */
  const heroStaggerEls = document.querySelectorAll('.hero [data-hero-stagger]');
  if (heroStaggerEls.length) {
    heroStaggerEls.forEach((el, index) => {
      el.style.setProperty('--hero-delay', `${0.1 + index * 0.12}s`);
    });
    const hero = document.querySelector('.hero');
    if (hero && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          heroStaggerEls.forEach(el => el.classList.add('is-visible'));
          obs.disconnect();
        });
      }, { threshold: 0.2 });
      heroObserver.observe(hero);
    } else {
      heroStaggerEls.forEach(el => el.classList.add('is-visible'));
    }
  }
})();













