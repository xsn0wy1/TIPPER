document.addEventListener("DOMContentLoaded", function () {
  const faqBtn = document.getElementById('faq-bot-btn');
  const faqChat = document.getElementById('faq-bot-chat');
  const faqClose = document.getElementById('faq-bot-close');
  const faqMessages = document.getElementById('faq-bot-messages');
  const faqOptionsContainer = faqMessages.querySelector('.faq-bot-options');
  const faqHeader = document.getElementById('faq-bot-header');
  const faqIntro = faqMessages.querySelector('.faq-bot-intro');

  // Spanish and English FAQ data
  const faqData = {
    es: {
      intro: "¡Hola! Soy el bot de ayuda de Tipper.<br>¿En qué puedo ayudarte?",
      header: "🤖 Tipper Ayuda",
      questions: [
        { key: "tarjetas", text: "¿Cómo uso las tarjetas de tutoriales?" },
        { key: "temas", text: "¿Cómo busco temas o consejos específicos?" },
        { key: "perfil", text: "¿Cómo edito mi perfil o mis preferencias?" },
        { key: "guardar", text: "¿Cómo guardo o vuelvo a ver un tutorial?" }
      ],
      answers: {
        tarjetas: "Para usar las tarjetas de tutoriales, haz clic en la que te interese. Se abrirá una guía paso a paso fácil de seguir.",
        temas: "Usa la barra de búsqueda o el menú principal para encontrar temas específicos, como 'llamadas', 'internet' o 'seguridad'.",
        perfil: "Para editar tu perfil o tus preferencias, entra a tu cuenta y selecciona 'Configuración'. Allí podrás actualizar tus datos.",
        guardar: "Cuando termines un tutorial, puedes marcarlo como favorito o guardarlo para verlo más tarde desde tu perfil."
      }
    },
    en: {
      intro: "Hi! I'm Tipper's help bot.<br>How can I assist you?",
      header: "🤖 Tipper Help",
      questions: [
        { key: "tarjetas", text: "How do I use tutorial cards?" },
        { key: "temas", text: "How do I search for specific topics or tips?" },
        { key: "perfil", text: "How do I edit my profile or preferences?" },
        { key: "guardar", text: "How do I save or revisit a tutorial?" }
      ],
      answers: {
        tarjetas: "To use tutorial cards, click on the one you're interested in. A step-by-step guide will open.",
        temas: "Use the search bar or main menu to find specific topics like 'calls', 'internet', or 'security'.",
        perfil: "To edit your profile or preferences, log in and select 'Settings'. There you can update your information.",
        guardar: "When you finish a tutorial, you can mark it as a favorite or save it to view later from your profile."
      }
    }
  };

  // Render FAQ bot language
  function setFaqLang(lang) {
    // Remove previous answers
    faqMessages.querySelectorAll('.faq-bot-msg.faq-bot-answer').forEach(e => e.remove());
    // Set header and intro
    faqHeader.textContent = faqData[lang].header;
    faqIntro.innerHTML = faqData[lang].intro;
    // Set questions
    faqOptionsContainer.innerHTML = '';
    faqData[lang].questions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'faq-bot-option';
      btn.setAttribute('data-faq', q.key);
      btn.textContent = q.text;
      btn.addEventListener('click', function () {
        // Remove previous answers
        faqMessages.querySelectorAll('.faq-bot-msg.faq-bot-answer').forEach(e => e.remove());
        // Show answer
        const msg = document.createElement('div');
        msg.className = 'faq-bot-msg faq-bot-answer';
        msg.textContent = faqData[lang].answers[q.key] || (lang === 'en' ? "Sorry! I don't have information about that." : "¡Lo siento! No tengo información sobre eso.");
        faqMessages.appendChild(msg);
      });
      faqOptionsContainer.appendChild(btn);
    });
  }

  // Initial language setup
  let lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
  setFaqLang(lang);

  // Open/close FAQ bot
  faqBtn.addEventListener('click', () => {
    faqChat.classList.toggle('faq-bot-hidden');
  });
  faqClose.addEventListener('click', () => {
    faqChat.classList.add('faq-bot-hidden');
  });

  // Listen for language changes (button or storage)
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
      setFaqLang(lang);
    });
  }
  window.addEventListener('storage', (e) => {
    if (e.key === 'tipperLang') {
      lang = e.newValue === 'en' ? 'en' : 'es';
      setFaqLang(lang);
    }
  });
});