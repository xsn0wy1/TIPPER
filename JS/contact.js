document.addEventListener("DOMContentLoaded", function () {
  // Contact form validation and database submission
  const contactForm = document.getElementById('contact-form');
  const contactMsg = document.getElementById('contact-form-msg');
  contactForm.onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
    const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
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
    if (message.length < 10) {
      contactMsg.style.color = "#ff4f4f";
      contactMsg.textContent = lang === 'en' ? "Message must be at least 10 characters." : "El mensaje debe tener al menos 10 caracteres.";
      return;
    }

    // Save to database
    try {
      const response = await fetch('PHP/contact.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          action: 'submit',
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message
        })
      });

      const result = await response.json();

      if (result.success) {
        contactMsg.style.color = "#4f8cff";
        contactMsg.textContent = lang === 'en' ? "Message sent! Thank you." : "¡Mensaje enviado! Gracias.";
        
        // Show success notification
        if (typeof notifications !== 'undefined') {
          notifications.success(
            lang === 'en' ? 'Message Sent!' : '¡Mensaje enviado!',
            lang === 'en' ? 'We will get back to you soon' : 'Te responderemos pronto'
          );
        }
        
        setTimeout(() => { 
          contactMsg.textContent = ""; 
          contactForm.reset(); 
        }, 1800);
      } else {
        contactMsg.style.color = "#ff4f4f";
        contactMsg.textContent = result.message || (lang === 'en' ? 'Error sending message' : 'Error al enviar mensaje');
      }
    } catch (error) {
      contactMsg.style.color = "#ff4f4f";
      contactMsg.textContent = lang === 'en' ? 'Connection error. Please try again.' : 'Error de conexión. Intenta de nuevo.';
      console.error('Error:', error);
    }
  };

  // Feedback form validation and database submission
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackMsg = document.getElementById('contact-feedback-msg');
  feedbackForm.onsubmit = async function(e) {
    e.preventDefault();
    const feedback = document.getElementById('feedback').value.trim();
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    
    if (feedback.length < 10) {
      feedbackMsg.style.color = "#ff4f4f";
      feedbackMsg.textContent = lang === 'en' ? "Feedback must be at least 10 characters." : "La sugerencia debe tener al menos 10 caracteres.";
      return;
    }

    // Save to database
    try {
      const response = await fetch('PHP/contact.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          action: 'submit',
          name: 'Feedback',
          email: 'feedback@tipper.com',
          subject: 'User Feedback',
          message: feedback
        })
      });

      const result = await response.json();

      if (result.success) {
        feedbackMsg.style.color = "#4f8cff";
        feedbackMsg.textContent = lang === 'en' ? "Suggestion sent! Thank you." : "¡Sugerencia enviada! Gracias.";
        
        // Show success notification
        if (typeof notifications !== 'undefined') {
          notifications.success(
            lang === 'en' ? 'Feedback Sent!' : '¡Sugerencia enviada!',
            lang === 'en' ? 'Thank you for your feedback' : 'Gracias por tu sugerencia'
          );
        }
        
        setTimeout(() => { 
          feedbackMsg.textContent = ""; 
          feedbackForm.reset(); 
        }, 1800);
      } else {
        feedbackMsg.style.color = "#ff4f4f";
        feedbackMsg.textContent = result.message || (lang === 'en' ? 'Error sending feedback' : 'Error al enviar sugerencia');
      }
    } catch (error) {
      feedbackMsg.style.color = "#ff4f4f";
      feedbackMsg.textContent = lang === 'en' ? 'Connection error. Please try again.' : 'Error de conexión. Intenta de nuevo.';
      console.error('Error:', error);
    }
  };
});