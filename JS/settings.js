document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const fontSize = document.getElementById('font-size');
  const contrast = document.getElementById('contrast');
  const darkMode = document.getElementById('dark-mode');
  const underlineLinks = document.getElementById('underline-links');
  const body = document.body;
  const html = document.documentElement;

  // Load settings from localStorage
  function loadSettings() {
    // Font size
    const fs = localStorage.getItem('tipperFontSize') || 'normal';
    fontSize.value = fs;
    setFontSize(fs);

    // Contrast
    const ct = localStorage.getItem('tipperContrast') || 'normal';
    contrast.value = ct;
    setContrast(ct);

    // Dark mode
    const dm = localStorage.getItem('tipperDarkMode') === 'true';
    darkMode.checked = dm;
    setDarkMode(dm);

    // Underline links
    const ul = localStorage.getItem('tipperUnderlineLinks') === 'true';
    underlineLinks.checked = ul;
    setUnderlineLinks(ul);
  }

  // Font size
  function setFontSize(size) {
    html.style.fontSize = size === 'normal' ? '16px' : size === 'large' ? '19px' : '22px';
    localStorage.setItem('tipperFontSize', size);
  }
  fontSize.onchange = e => setFontSize(e.target.value);

  // Contrast
  function setContrast(val) {
    if (val === 'high') {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    localStorage.setItem('tipperContrast', val);
  }
  contrast.onchange = e => setContrast(e.target.value);

  // Dark mode
  function setDarkMode(on) {
    if (on) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    localStorage.setItem('tipperDarkMode', on);
  }
  darkMode.onchange = e => setDarkMode(e.target.checked);

  // Underline links
  function setUnderlineLinks(on) {
    if (on) {
      body.classList.add('underline-links');
    } else {
      body.classList.remove('underline-links');
    }
    localStorage.setItem('tipperUnderlineLinks', on);
  }
  underlineLinks.onchange = e => setUnderlineLinks(e.target.checked);

  // Apply settings on all pages
  loadSettings();

  // --- Language Switcher Integration ---
  function setSpanish() {
    document.title = "Configuración | Tipper";
    document.getElementById('settings-title').textContent = "Configuración";
    document.getElementById('label-font-size').textContent = "Tamaño de fuente";
    document.getElementById('font-normal').textContent = "Normal";
    document.getElementById('font-large').textContent = "Grande";
    document.getElementById('font-xlarge').textContent = "Muy grande";
    document.getElementById('label-contrast').textContent = "Contraste";
    document.getElementById('contrast-normal').textContent = "Normal";
    document.getElementById('contrast-high').textContent = "Alto";
    document.getElementById('label-dark-mode').textContent = "Modo oscuro";
    document.getElementById('label-underline-links').textContent = "Subrayar enlaces";
    // Menu
    document.getElementById('settings-link').textContent = "Contacto";
    document.getElementById('menu-profile').textContent = "Mi perfil";
    document.getElementById('menu-settings').textContent = "Configuración";
    document.getElementById('menu-logout').textContent = "Cerrar sesión";
  }
  function setEnglish() {
    document.title = "Settings | Tipper";
    document.getElementById('settings-title').textContent = "Settings";
    document.getElementById('label-font-size').textContent = "Font size";
    document.getElementById('font-normal').textContent = "Normal";
    document.getElementById('font-large').textContent = "Large";
    document.getElementById('font-xlarge').textContent = "Extra large";
    document.getElementById('label-contrast').textContent = "Contrast";
    document.getElementById('contrast-normal').textContent = "Normal";
    document.getElementById('contrast-high').textContent = "High";
    document.getElementById('label-dark-mode').textContent = "Dark mode";
    document.getElementById('label-underline-links').textContent = "Underline links";
    // Menu
    document.getElementById('settings-link').textContent = "Settings";
    document.getElementById('menu-profile').textContent = "My profile";
    document.getElementById('menu-settings').textContent = "Settings";
    document.getElementById('menu-logout').textContent = "Log out";
  }
  // Listen for language button
  const observer = new MutationObserver(() => {
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    if (lang === 'en') setEnglish();
    else setSpanish();
  });
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) observer.observe(langBtn, { childList: true });
  // Set language on load
  const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
  if (lang === 'en') setEnglish();
  else setSpanish();
});