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
});