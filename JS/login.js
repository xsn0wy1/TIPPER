document.addEventListener("DOMContentLoaded", function () {
  // Tabs logic
  document.getElementById('login-tab').onclick = function() {
    document.getElementById('login-form').style.display = '';
    document.getElementById('register-form').style.display = 'none';
    this.classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
    clearMsgs();
  };

  document.getElementById('register-tab').onclick = function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = '';
    this.classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
    clearMsgs();
  };

  function clearMsgs() {
    document.getElementById('login-msg').textContent = "";
    document.getElementById('register-msg').textContent = "";
  }

  // Language-dependent feedback messages
  const messages = {
    es: {
      loginUserShort: "El usuario debe tener al menos 3 caracteres.",
      loginPassShort: "La contraseña debe tener al menos 8 caracteres.",
      loginSuccess: "¡Bienvenido!",
      loginFail: "Usuario o contraseña incorrectos.",
      regUser: "Usuario: 3-16 letras o números, sin caracteres especiales.",
      regEmail: "Email no válido.",
      regPass: "Contraseña: mínimo 8 letras o números, sin caracteres especiales.",
      regSuccess: "¡Registro exitoso!"
    },
    en: {
      loginUserShort: "Username must be at least 3 characters.",
      loginPassShort: "Password must be at least 8 characters.",
      loginSuccess: "Welcome!",
      loginFail: "Incorrect username or password.",
      regUser: "Username: must contain 3-16 letters or numbers, no special characters.",
      regEmail: "Invalid email.",
      regPass: "Password: must contain at least 8 letters or numbers, no special characters.",
      regSuccess: "Register successful!"
    }
  };

  // Login validation with database integration
  document.getElementById('login-form').onsubmit = async function(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;
    const msg = document.getElementById('login-msg');
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    
    if (user.length < 3) {
      msg.style.color = "#ff4f4f";
      msg.textContent = messages[lang].loginUserShort;
      return;
    }
    if (pass.length < 6) {
      msg.style.color = "#ff4f4f";
      msg.textContent = messages[lang].loginPassShort;
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = lang === 'en' ? 'Signing in...' : 'Iniciando sesión...';

    try {
      // Make API call to login
      const response = await fetch('PHP/auth.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          action: 'login',
          username: user,
          password: pass
        })
      });

      const result = await response.json();

      if (result.success) {
        msg.style.color = "#4f8cff";
        msg.textContent = messages[lang].loginSuccess;
        
        // Store user data for welcome notification
        localStorage.setItem('tipperUser', JSON.stringify({
          username: result.data.username,
          email: result.data.email,
          showWelcome: true
        }));

        setTimeout(() => {
          window.location.href = result.data.redirect || "index.html";
        }, 800);
      } else {
        msg.style.color = "#ff4f4f";
        msg.textContent = result.message || messages[lang].loginFail;
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    } catch (error) {
      console.error('Login error:', error);
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? 'Connection error. Please try again.' : 'Error de conexión. Intenta de nuevo.';
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  };

  // Register validation with database integration
  document.getElementById('register-form').onsubmit = async function(e) {
    e.preventDefault();
    const user = document.getElementById('register-user').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const pass = document.getElementById('register-pass').value;
    const msg = document.getElementById('register-msg');
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    const userRegex = /^[a-zA-Z0-9_]{3,16}$/; // 3-16 chars
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userRegex.test(user)) {
      msg.style.color = "#ff4f4f";
      msg.textContent = messages[lang].regUser;
      return;
    }
    if (!emailRegex.test(email)) {
      msg.style.color = "#ff4f4f";
      msg.textContent = messages[lang].regEmail;
      return;
    }
    if (pass.length < 6) {
      msg.style.color = "#ff4f4f";
      msg.textContent = messages[lang].regPass;
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = lang === 'en' ? 'Creating account...' : 'Creando cuenta...';

    try {
      // Make API call to register
      const response = await fetch('PHP/auth.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          action: 'register',
          username: user,
          email: email,
          password: pass
        })
      });

      const result = await response.json();

      if (result.success) {
        msg.style.color = "#4f8cff";
        msg.textContent = messages[lang].regSuccess;
        
        // Store user data for welcome notification
        localStorage.setItem('tipperUser', JSON.stringify({
          username: result.data.username,
          email: result.data.email,
          showWelcome: true
        }));

        setTimeout(() => {
          window.location.href = result.data.redirect || "index.html";
        }, 800);
      } else {
        msg.style.color = "#ff4f4f";
        msg.textContent = result.message;
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    } catch (error) {
      console.error('Register error:', error);
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? 'Connection error. Please try again.' : 'Error de conexión. Intenta de nuevo.';
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  };

  // Language switcher for login/register page
  let header = document.querySelector('header');
  if (!document.getElementById('lang-btn')) {
    const langBtn = document.createElement('button');
    langBtn.id = 'lang-btn';
    langBtn.textContent = 'EN';
    langBtn.style.marginLeft = 'auto';
    langBtn.style.padding = '0.4em 1em';
    langBtn.style.borderRadius = '6px';
    langBtn.style.border = 'none';
    langBtn.style.background = '#4f8cff';
    langBtn.style.color = '#fff';
    langBtn.style.fontWeight = '700';
    langBtn.style.cursor = 'pointer';
    header.appendChild(langBtn);

      langBtn.addEventListener("mouseover", () => {
  langBtn.style.background = "black";
});

langBtn.addEventListener("mouseout", () => {
  langBtn.style.background = "#4f8cff";
});

    let spanish = localStorage.getItem('tipperLang') !== 'en';

    function setSpanish() {
      langBtn.textContent = "EN";
      document.title = "Iniciar sesión | Tipper";
      document.getElementById('login-tab').textContent = "Iniciar sesión";
      document.getElementById('register-tab').textContent = "Registrarse";
      document.querySelector('#login-form h2').textContent = "Iniciar sesión";
      document.getElementById('login-user').placeholder = "Usuario o Email";
      document.getElementById('login-pass').placeholder = "Contraseña";
      document.querySelector('#login-form button[type="submit"]').textContent = "Entrar";
      document.querySelector('#register-form h2').textContent = "Registrarse";
      document.getElementById('register-user').placeholder = "Usuario";
      if(document.getElementById('register-email')) document.getElementById('register-email').placeholder = "Email";
      document.getElementById('register-pass').placeholder = "Contraseña";
      document.querySelector('#register-form button[type="submit"]').textContent = "Crear cuenta";
      document.querySelector('footer p').textContent = "© 2025 Tipper";
      // Update feedback if present
      updateFeedback();
      spanish = true;
      localStorage.setItem('tipperLang', 'es');
    }

    function setEnglish() {
      langBtn.textContent = "ES";
      document.title = "Login | Tipper";
      document.getElementById('login-tab').textContent = "Login";
      document.getElementById('register-tab').textContent = "Sign Up";
      document.querySelector('#login-form h2').textContent = "Login";
      document.getElementById('login-user').placeholder = "Username or Email";
      document.getElementById('login-pass').placeholder = "Password";
      document.querySelector('#login-form button[type="submit"]').textContent = "Sign in";
      document.querySelector('#register-form h2').textContent = "Register";
      document.getElementById('register-user').placeholder = "Username";
      if(document.getElementById('register-email')) document.getElementById('register-email').placeholder = "Email";
      document.getElementById('register-pass').placeholder = "Password";
      document.querySelector('#register-form button[type="submit"]').textContent = "Create account";
      document.querySelector('footer p').textContent = "© 2025 Tipper";
      // Update feedback if present
      updateFeedback();
      spanish = false;
      localStorage.setItem('tipperLang', 'en');
    }

    // Update feedback messages if present
    function updateFeedback() {
      const loginMsg = document.getElementById('login-msg');
      const regMsg = document.getElementById('register-msg');
      const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
      // Only translate if the message matches a known string
      Object.keys(messages[lang]).forEach(key => {
        if (loginMsg.textContent === messages[lang === 'en' ? 'es' : 'en'][key]) {
          loginMsg.textContent = messages[lang][key];
        }
        if (regMsg.textContent === messages[lang === 'en' ? 'es' : 'en'][key]) {
          regMsg.textContent = messages[lang][key];
        }
      });
    }

    // Set language on load
    if (spanish) setSpanish();
    else setEnglish();

    langBtn.onclick = function () {
      if (spanish) setEnglish();
      else setSpanish();
      clearMsgs();
    };
  }

  // Show/Hide password buttons
  function initShowHideButtons() {
    document.querySelectorAll('.show-pass').forEach(button => {
      // associated input is the previous sibling input inside .password-field
      const pwInput = button.parentElement.querySelector('input');
      if (!pwInput) return;

      button.addEventListener('click', () => {
        const isNowShown = button.classList.toggle('active');
        pwInput.type = isNowShown ? 'text' : 'password';
        button.setAttribute('aria-pressed', String(isNowShown));
        button.setAttribute('aria-label', isNowShown ? 'Ocultar contraseña' : 'Mostrar contraseña');
        // small animation pulse
        button.animate([{ transform: 'translateY(-50%) scale(1)' }, { transform: 'translateY(-50%) scale(1.06)' }, { transform: 'translateY(-50%) scale(1)' }], { duration: 320, easing: 'ease-out' });
      });
      // keep state in sync if input's type is changed elsewhere
      const observer = new MutationObserver(() => {
        const shown = pwInput.type === 'text';
        button.classList.toggle('active', shown);
        button.setAttribute('aria-pressed', String(shown));
      });
      observer.observe(pwInput, { attributes: true, attributeFilter: ['type'] });
    });
  }
  initShowHideButtons();
});