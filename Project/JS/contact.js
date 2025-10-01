document.addEventListener("DOMContentLoaded", function () {
  // Contact form validation and feedback
  const contactForm = document.getElementById('contact-form');
  const contactMsg = document.getElementById('contact-form-msg');
  contactForm.onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    if (name.length < 2) {
      contactMsg.style.color = "#ff4f4f";
      contactMsg.textContent = lang === 'en' ? "Name must be at least 2 characters." : "El nombre debe tener al menos 2 caracteres.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      contactMsg.style.color = "#ff4f4f";
      contactMsg.textContent = lang === 'en' ? "Invalid email." : "Correo electrónico no válido.";
      return;
    }
    if (message.length < 5) {
      contactMsg.style.color = "#ff4f4f";
      contactMsg.textContent = lang === 'en' ? "Message must be at least 5 characters." : "El mensaje debe tener al menos 5 caracteres.";
      return;
    }
    contactMsg.style.color = "#4f8cff";
    contactMsg.textContent = lang === 'en' ? "Message sent! Thank you." : "¡Mensaje enviado! Gracias.";
    setTimeout(() => { contactMsg.textContent = ""; contactForm.reset(); }, 1800);
  };

  // Feedback form validation and feedback
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackMsg = document.getElementById('contact-feedback-msg');
  feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    const feedback = document.getElementById('feedback').value.trim();
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    if (feedback.length < 5) {
      feedbackMsg.style.color = "#ff4f4f";
      feedbackMsg.textContent = lang === 'en' ? "Feedback must be at least 5 characters." : "La sugerencia debe tener al menos 5 caracteres.";
      return;
    }
    feedbackMsg.style.color = "#4f8cff";
    feedbackMsg.textContent = lang === 'en' ? "Suggestion sent! Thank you." : "¡Sugerencia enviada! Gracias.";
    setTimeout(() => { feedbackMsg.textContent = ""; feedbackForm.reset(); }, 1800);
  };

  // --- Language Switcher for this page ---
  function setContactSpanish() {
    document.title = "Contacto | Tipper";
    document.getElementById('contact-title').textContent = "Contacto y Información";
    document.getElementById('contact-info-title').textContent = "Información de contacto";
    document.getElementById('contact-email-label').textContent = "Correo:";
    document.getElementById('contact-phone-label').textContent = "Teléfono:";
    document.getElementById('contact-address-label').textContent = "Dirección:";
    document.getElementById('contact-form-title').textContent = "Envíanos un mensaje";
    document.getElementById('contact-form-name-label').textContent = "Nombre";
    document.getElementById('contact-form-email-label').textContent = "Correo electrónico";
    document.getElementById('contact-form-message-label').textContent = "Mensaje";
    document.getElementById('contact-form-submit').textContent = "Enviar";
    document.getElementById('contact-feedback-title').textContent = "¿Tienes sugerencias?";
    document.getElementById('feedback-label').textContent = "Tu opinión";
    document.getElementById('feedback-submit').textContent = "Enviar sugerencia";
    // Menu
    if (document.getElementById('menu-profile')) document.getElementById('menu-profile').textContent = "Mi perfil";
    if (document.getElementById('menu-settings')) document.getElementById('menu-settings').textContent = "Configuración";
    if (document.getElementById('menu-logout')) document.getElementById('menu-logout').textContent = "Cerrar sesión";
    if (document.getElementById('nav-contacto')) document.getElementById('nav-contacto').textContent = "Contacto";
  }
  function setContactEnglish() {
    document.title = "Contact | Tipper";
    document.getElementById('contact-title').textContent = "Contact & Information";
    document.getElementById('contact-info-title').textContent = "Contact Information";
    document.getElementById('contact-email-label').textContent = "Email:";
    document.getElementById('contact-phone-label').textContent = "Phone:";
    document.getElementById('contact-address-label').textContent = "Address:";
    document.getElementById('contact-form-title').textContent = "Send us a message";
    document.getElementById('contact-form-name-label').textContent = "Name";
    document.getElementById('contact-form-email-label').textContent = "Email";
    document.getElementById('contact-form-message-label').textContent = "Message";
    document.getElementById('contact-form-submit').textContent = "Send";
    document.getElementById('contact-feedback-title').textContent = "Have suggestions?";
    document.getElementById('feedback-label').textContent = "Your feedback";
    document.getElementById('feedback-submit').textContent = "Send suggestion";
    // Menu
    if (document.getElementById('menu-profile')) document.getElementById('menu-profile').textContent = "My profile";
    if (document.getElementById('menu-settings')) document.getElementById('menu-settings').textContent = "Settings";
    if (document.getElementById('menu-logout')) document.getElementById('menu-logout').textContent = "Log out";
    if (document.getElementById('nav-contacto')) document.getElementById('nav-contacto').textContent = "Contact";
  }
  // Listen for language button
  const observer = new MutationObserver(() => {
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    if (lang === 'en') setContactEnglish();
    else setContactSpanish();
  });
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) observer.observe(langBtn, { childList: true });
  // Set language on load
  const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
  if (lang === 'en') setContactEnglish();
  else setContactSpanish();
});