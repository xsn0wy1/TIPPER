document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector('nav');
  let langBtn = document.getElementById('lang-btn');
  if (!langBtn) {
    langBtn = document.createElement('button');
    langBtn.id = 'lang-btn';
    langBtn.textContent = 'EN';
    langBtn.style.marginLeft = '1.5em';
    langBtn.style.padding = '0.4em 1em';
    langBtn.style.borderRadius = '6px';
    langBtn.style.border = 'none';
    langBtn.style.background = '#4f8cff';
    langBtn.style.color = '#fff';
    langBtn.style.fontWeight = '700';
    langBtn.style.cursor = 'pointer';
    nav.appendChild(langBtn);
  }

  let spanish = localStorage.getItem('tipperLang') !== 'en';

  function setSpanish() {
    if (langBtn) langBtn.textContent = "EN";
    if (document.querySelector('#intro')) {
      document.querySelector('#intro h1').textContent = "Bienvenido a Tipper";
      document.querySelector('#intro p').textContent = "Consejos de tecnología para personas mayores";
      document.querySelectorAll('.card h2')[0].textContent = "¿Cómo hacer una videollamada?";
      document.querySelectorAll('.card p')[0].textContent = "Guía paso a paso para usar WhatsApp, Zoom y Skype.";
      document.querySelectorAll('.card h2')[1].textContent = "¿Cómo crear una contraseña segura?";
      document.querySelectorAll('.card p')[1].textContent = "Consejos para proteger tus cuentas en línea.";
    }

    if (document.title.includes('contraseña')) {
      if (langBtn) langBtn.textContent = "EN";
      document.querySelector('h1').textContent = "¿Cómo crear una contraseña segura?";
      document.querySelector('article p').textContent = "Proteger tus cuentas en línea es muy importante. Algunos consejos para crear contraseñas seguras:";
      const lis = document.querySelectorAll('ul li');
      lis[0].textContent = "Usa al menos 12 caracteres.";
      lis[1].textContent = "Combina letras mayúsculas, minúsculas, números y símbolos.";
      lis[2].textContent = "No uses datos personales como tu nombre o fecha de nacimiento.";
      lis[3].textContent = "No repitas contraseñas en diferentes sitios.";
      lis[4].textContent = "Considera usar un gestor de contraseñas.";
      document.querySelector('strong').textContent = "Ejemplo de contraseña segura:";
      document.querySelector('a').innerHTML = "&#8592; Volver al inicio";
    }

    if (document.title.includes('videollamada')) {
      if (langBtn) langBtn.textContent = "EN";
      document.querySelector('h1').textContent = "¿Cómo hacer una videollamada?";
      document.querySelector('article p').textContent = "Las videollamadas te permiten ver y hablar con tus seres queridos desde cualquier lugar. Aquí tienes una guía rápida:";
      const lis = document.querySelectorAll('ol li');
      lis[0].innerHTML = "<strong>WhatsApp:</strong> Abri un chat, toca el ícono de cámara y espera a que contesten.";
      lis[1].innerHTML = "<strong>Zoom:</strong> Descarga la app, crea una cuenta, y únete a una reunión con el enlace que te envíen.";
      lis[2].innerHTML = "<strong>Skype:</strong> Agrega a tu contacto y haz clic en el botón de videollamada.";
      document.querySelectorAll('article p')[1].textContent = "Recorda tener buena conexión a internet y activar la cámara y el micrófono.";
      document.querySelector('a').innerHTML = "&#8592; Volver al inicio";
    }

    if (document.title.includes('Perfil')) {
      if (langBtn) langBtn.textContent = "EN";
      document.title = "Mi Perfil | Tipper";
      document.getElementById('profile-name').textContent = "nicundo peluriotti";
      document.getElementById('profile-email').textContent = "correo@gmail.com";
      document.getElementById('label-age').textContent = "Edad:";
      document.getElementById('profile-age').textContent = "189 años";
      document.getElementById('label-city').textContent = "Ciudad:";
      document.getElementById('profile-city').textContent = "fedecity";
      document.getElementById('label-member').textContent = "Miembro desde:";
      document.getElementById('profile-member').textContent = "2026";
      document.getElementById('edit-btn').textContent = "Editar perfil";
      document.getElementById('logout-btn').textContent = "Cerrar sesión";
    }

    if (document.getElementById('menu-profile')) document.getElementById('menu-profile').textContent = "Mi perfil";
    if (document.getElementById('menu-settings')) document.getElementById('menu-settings').textContent = "Configuración";
    if (document.getElementById('menu-logout')) document.getElementById('menu-logout').textContent = "Cerrar sesión";

    if (document.getElementById('nav-videollamadas')) document.getElementById('nav-videollamadas').textContent = "Videollamadas";
    if (document.getElementById('nav-contrasenas')) document.getElementById('nav-contrasenas').textContent = "Contraseñas";
    if (document.getElementById('nav-internet')) document.getElementById('nav-internet').textContent = "Internet";
    if (document.getElementById('nav-contacto')) document.getElementById('nav-contacto').textContent = "Contacto";
    if (document.querySelector('footer p')) document.querySelector('footer p').textContent = "© 2025 Tipper";

    // New content for calls section
    if (document.getElementById('calls-title')) document.getElementById('calls-title').textContent = "Videollamadas y Llamadas";
    if (document.getElementById('calls-desc')) document.getElementById('calls-desc').textContent = "Aprende a usar las aplicaciones más populares para comunicarte con tus seres queridos.";
    if (document.getElementById('card-whatsapp-title')) document.getElementById('card-whatsapp-title').textContent = "Videollamadas en WhatsApp";
    if (document.getElementById('card-whatsapp-desc')) document.getElementById('card-whatsapp-desc').textContent = "Cómo hacer una videollamada paso a paso usando WhatsApp.";
    if (document.getElementById('card-zoom-title')) document.getElementById('card-zoom-title').textContent = "Videollamadas en Zoom";
    if (document.getElementById('card-zoom-desc')) document.getElementById('card-zoom-desc').textContent = "Únete y organiza reuniones virtuales fácilmente con Zoom.";
    if (document.getElementById('card-skype-title')) document.getElementById('card-skype-title').textContent = "Videollamadas en Skype";
    if (document.getElementById('card-skype-desc')) document.getElementById('card-skype-desc').textContent = "Guía para realizar videollamadas y llamadas de voz en Skype.";
    if (document.getElementById('card-phone-title')) document.getElementById('card-phone-title').textContent = "Llamadas telefónicas básicas";
    if (document.getElementById('card-phone-desc')) document.getElementById('card-phone-desc').textContent = "Aprende a hacer y recibir llamadas desde tu teléfono móvil.";
    if (document.getElementById('card-facetime-title')) document.getElementById('card-facetime-title').textContent = "Videollamadas en FaceTime";
    if (document.getElementById('card-facetime-desc')) document.getElementById('card-facetime-desc').textContent = "Cómo usar FaceTime para comunicarte con otros usuarios de Apple.";

    // Passwords section content
    if (document.getElementById('passwords-title')) document.getElementById('passwords-title').textContent = "Contraseñas Seguras";
    if (document.getElementById('passwords-desc')) document.getElementById('passwords-desc').textContent = "Aprende a proteger tus cuentas y crear contraseñas fuertes y seguras.";
    if (document.getElementById('card-create-title')) document.getElementById('card-create-title').textContent = "Cómo crear una contraseña segura";
    if (document.getElementById('card-create-desc')) document.getElementById('card-create-desc').textContent = "Guía paso a paso para crear contraseñas difíciles de adivinar.";
    if (document.getElementById('card-manager-title')) document.getElementById('card-manager-title').textContent = "Gestores de contraseñas";
    if (document.getElementById('card-manager-desc')) document.getElementById('card-manager-desc').textContent = "Descubre cómo usar aplicaciones para guardar tus contraseñas.";
    if (document.getElementById('card-change-title')) document.getElementById('card-change-title').textContent = "Cambiar tu contraseña";
    if (document.getElementById('card-change-desc')) document.getElementById('card-change-desc').textContent = "Aprende cuándo y cómo cambiar tus contraseñas de forma segura.";
    if (document.getElementById('card-recovery-title')) document.getElementById('card-recovery-title').textContent = "Recuperar una contraseña olvidada";
    if (document.getElementById('card-recovery-desc')) document.getElementById('card-recovery-desc').textContent = "Pasos para recuperar el acceso a tus cuentas si olvidas la contraseña.";
    if (document.getElementById('card-avoid-title')) document.getElementById('card-avoid-title').textContent = "Errores comunes al crear contraseñas";
    if (document.getElementById('card-avoid-desc')) document.getElementById('card-avoid-desc').textContent = "Evita los errores más frecuentes y mantén tus cuentas protegidas.";

    // Internet section content
    if (document.getElementById('internet-title')) document.getElementById('internet-title').textContent = "Consejos de Internet";
    if (document.getElementById('internet-desc')) document.getElementById('internet-desc').textContent = "Aprende a navegar, buscar información y mantenerte seguro en Internet.";
    if (document.getElementById('card-wifi-title')) document.getElementById('card-wifi-title').textContent = "Cómo conectarse a Wi-Fi";
    if (document.getElementById('card-wifi-desc')) document.getElementById('card-wifi-desc').textContent = "Guía para conectarte a redes Wi-Fi en casa y en lugares públicos.";
    if (document.getElementById('card-browser-title')) document.getElementById('card-browser-title').textContent = "Usar un navegador web";
    if (document.getElementById('card-browser-desc')) document.getElementById('card-browser-desc').textContent = "Aprende a usar Chrome, Safari, Edge y otros navegadores.";
    if (document.getElementById('card-search-title')) document.getElementById('card-search-title').textContent = "Buscar información en Internet";
    if (document.getElementById('card-search-desc')) document.getElementById('card-search-desc').textContent = "Consejos para encontrar lo que necesitas usando Google y otros buscadores.";
    if (document.getElementById('card-security-title')) document.getElementById('card-security-title').textContent = "Seguridad en Internet";
    if (document.getElementById('card-security-desc')) document.getElementById('card-security-desc').textContent = "Cómo proteger tus datos y evitar fraudes en línea.";
    if (document.getElementById('card-email-title')) document.getElementById('card-email-title').textContent = "Correo electrónico seguro";
    if (document.getElementById('card-email-desc')) document.getElementById('card-email-desc').textContent = "Aprende a enviar, recibir y proteger tus emails.";

    spanish = true;
    localStorage.setItem('tipperLang', 'es');
  }

  function setEnglish() {
    if (langBtn) langBtn.textContent = "ES";
    if (document.querySelector('#intro')) {
      document.querySelector('#intro h1').textContent = "Welcome to Tipper";
      document.querySelector('#intro p').textContent = "Technology tips for seniors";
      document.querySelectorAll('.card h2')[0].textContent = "How to make a video call?";
      document.querySelectorAll('.card p')[0].textContent = "Step-by-step guide for WhatsApp, Zoom and Skype.";
      document.querySelectorAll('.card h2')[1].textContent = "How to create a secure password?";
      document.querySelectorAll('.card p')[1].textContent = "Tips to protect your online accounts.";
    }

    if (document.title.includes('contraseña')) {
      if (langBtn) langBtn.textContent = "ES";
      document.querySelector('h1').textContent = "How to create a secure password?";
      document.querySelector('article p').textContent = "Protecting your online accounts is very important. Here are some tips for creating secure passwords:";
      const lis = document.querySelectorAll('ul li');
      lis[0].textContent = "Use at least 12 characters.";
      lis[1].textContent = "Combine uppercase, lowercase, numbers, and symbols.";
      lis[2].textContent = "Don't use personal data like your name or birth date.";
      lis[3].textContent = "Don't reuse passwords on different sites.";
      lis[4].textContent = "Consider using a password manager.";
      document.querySelector('strong').textContent = "Example of a secure password:";
      document.querySelector('a').innerHTML = "&#8592; Back to home";
    }

    if (document.title.includes('videollamada')) {
      if (langBtn) langBtn.textContent = "ES";
      document.querySelector('h1').textContent = "How to make a video call?";
      document.querySelector('article p').textContent = "Video calls let you see and talk to your loved ones from anywhere. Here is a quick guide:";
      const lis = document.querySelectorAll('ol li');
      lis[0].innerHTML = "<strong>WhatsApp:</strong> Open a chat, tap the camera icon and wait for them to answer.";
      lis[1].innerHTML = "<strong>Zoom:</strong> Download the app, create an account, and join a meeting with the link you receive.";
      lis[2].innerHTML = "<strong>Skype:</strong> Add your contact and click the video call button.";
      document.querySelectorAll('article p')[1].textContent = "Make sure you have a good internet connection and your camera and microphone are on.";
      document.querySelector('a').innerHTML = "&#8592; Back to home";
    }

    if (document.title.includes('Perfil')) {
      if (langBtn) langBtn.textContent = "ES";
      document.title = "My Profile | Tipper";
      document.getElementById('profile-name').textContent = "nicundo peluriotti";
      document.getElementById('profile-email').textContent = "correo@gmail.com";
      document.getElementById('label-age').textContent = "Age:";
      document.getElementById('profile-age').textContent = "189 years";
      document.getElementById('label-city').textContent = "City:";
      document.getElementById('profile-city').textContent = "fedecity";
      document.getElementById('label-member').textContent = "Member since:";
      document.getElementById('profile-member').textContent = "2026";
      document.getElementById('edit-btn').textContent = "Edit profile";
      document.getElementById('logout-btn').textContent = "Log out";
    }

    if (document.getElementById('menu-profile')) document.getElementById('menu-profile').textContent = "My profile";
    if (document.getElementById('menu-settings')) document.getElementById('menu-settings').textContent = "Settings";
    if (document.getElementById('menu-logout')) document.getElementById('menu-logout').textContent = "Log out";

    if (document.getElementById('nav-videollamadas')) document.getElementById('nav-videollamadas').textContent = "Video calls";
    if (document.getElementById('nav-contrasenas')) document.getElementById('nav-contrasenas').textContent = "Passwords";
    if (document.getElementById('nav-internet')) document.getElementById('nav-internet').textContent = "Internet";
    if (document.getElementById('nav-contacto')) document.getElementById('nav-contacto').textContent = "Contact";
    if (document.querySelector('footer p')) document.querySelector('footer p').textContent = "© 2025 Tipper";

    // New content for calls section
    if (document.getElementById('calls-title')) document.getElementById('calls-title').textContent = "Video & Phone Calls";
    if (document.getElementById('calls-desc')) document.getElementById('calls-desc').textContent = "Learn to use the most popular apps to connect with your loved ones.";
    if (document.getElementById('card-whatsapp-title')) document.getElementById('card-whatsapp-title').textContent = "WhatsApp Video Calls";
    if (document.getElementById('card-whatsapp-desc')) document.getElementById('card-whatsapp-desc').textContent = "How to make a video call step by step using WhatsApp.";
    if (document.getElementById('card-zoom-title')) document.getElementById('card-zoom-title').textContent = "Zoom Video Calls";
    if (document.getElementById('card-zoom-desc')) document.getElementById('card-zoom-desc').textContent = "Join and host virtual meetings easily with Zoom.";
    if (document.getElementById('card-skype-title')) document.getElementById('card-skype-title').textContent = "Skype Video Calls";
    if (document.getElementById('card-skype-desc')) document.getElementById('card-skype-desc').textContent = "Guide to making video and voice calls on Skype.";
    if (document.getElementById('card-phone-title')) document.getElementById('card-phone-title').textContent = "Basic Phone Calls";
    if (document.getElementById('card-phone-desc')) document.getElementById('card-phone-desc').textContent = "Learn to make and receive calls from your mobile phone.";
    if (document.getElementById('card-facetime-title')) document.getElementById('card-facetime-title').textContent = "FaceTime Video Calls";
    if (document.getElementById('card-facetime-desc')) document.getElementById('card-facetime-desc').textContent = "How to use FaceTime to connect with other Apple users.";

    // Passwords section content
    if (document.getElementById('passwords-title')) document.getElementById('passwords-title').textContent = "Secure Passwords";
    if (document.getElementById('passwords-desc')) document.getElementById('passwords-desc').textContent = "Learn to protect your accounts and create strong, secure passwords.";
    if (document.getElementById('card-create-title')) document.getElementById('card-create-title').textContent = "How to create a secure password";
    if (document.getElementById('card-create-desc')) document.getElementById('card-create-desc').textContent = "Step-by-step guide to creating hard-to-guess passwords.";
    if (document.getElementById('card-manager-title')) document.getElementById('card-manager-title').textContent = "Password managers";
    if (document.getElementById('card-manager-desc')) document.getElementById('card-manager-desc').textContent = "Discover how to use apps to store your passwords.";
    if (document.getElementById('card-change-title')) document.getElementById('card-change-title').textContent = "Change your password";
    if (document.getElementById('card-change-desc')) document.getElementById('card-change-desc').textContent = "Learn when and how to change your passwords safely.";
    if (document.getElementById('card-recovery-title')) document.getElementById('card-recovery-title').textContent = "Recover a forgotten password";
    if (document.getElementById('card-recovery-desc')) document.getElementById('card-recovery-desc').textContent = "Steps to regain access to your accounts if you forget your password.";
    if (document.getElementById('card-avoid-title')) document.getElementById('card-avoid-title').textContent = "Common password mistakes";
    if (document.getElementById('card-avoid-desc')) document.getElementById('card-avoid-desc').textContent = "Avoid frequent mistakes and keep your accounts protected.";

    // Internet section content
    if (document.getElementById('internet-title')) document.getElementById('internet-title').textContent = "Internet Tips";
    if (document.getElementById('internet-desc')) document.getElementById('internet-desc').textContent = "Learn to browse, search for information, and stay safe online.";
    if (document.getElementById('card-wifi-title')) document.getElementById('card-wifi-title').textContent = "How to connect to Wi-Fi";
    if (document.getElementById('card-wifi-desc')) document.getElementById('card-wifi-desc').textContent = "Guide to connecting to Wi-Fi at home and in public places.";
    if (document.getElementById('card-browser-title')) document.getElementById('card-browser-title').textContent = "Using a web browser";
    if (document.getElementById('card-browser-desc')) document.getElementById('card-browser-desc').textContent = "Learn to use Chrome, Safari, Edge and other browsers.";
    if (document.getElementById('card-search-title')) document.getElementById('card-search-title').textContent = "Searching for information online";
    if (document.getElementById('card-search-desc')) document.getElementById('card-search-desc').textContent = "Tips for finding what you need using Google and other search engines.";
    if (document.getElementById('card-security-title')) document.getElementById('card-security-title').textContent = "Internet security";
    if (document.getElementById('card-security-desc')) document.getElementById('card-security-desc').textContent = "How to protect your data and avoid online scams.";
    if (document.getElementById('card-email-title')) document.getElementById('card-email-title').textContent = "Safe email";
    if (document.getElementById('card-email-desc')) document.getElementById('card-email-desc').textContent = "Learn to send, receive and protect your emails.";

    spanish = false;
    localStorage.setItem('tipperLang', 'en');
  }

  // Always set language on load
  if (spanish) setSpanish();
  else setEnglish();

  // Always set up the button event
  if (langBtn) {
    langBtn.onclick = function () {
      if (spanish) setEnglish();
      else setSpanish();
    };
  }

  // Profile menu toggle
  const pfpBtn = document.getElementById('pfp-btn');
  const pfpMenu = document.getElementById('pfp-menu');
  if (pfpBtn && pfpMenu) {
    pfpBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      pfpMenu.classList.toggle('active');
    });
    document.addEventListener('click', function (e) {
      if (!pfpMenu.contains(e.target) && e.target !== pfpBtn) {
        pfpMenu.classList.remove('active');
      }
    });
  }
});