document.addEventListener("DOMContentLoaded", function () {
  // Profile picture preview
  const picInput = document.getElementById('edit-pic');
  const picImg = document.getElementById('edit-profile-pic');
  picImg.onclick = () => picInput.click();
  picImg.onkeydown = (e) => { if(e.key === "Enter" || e.key === " ") picInput.click(); };
  picInput.onchange = function() {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        picImg.src = e.target.result;
      };
      reader.readAsDataURL(this.files[0]);
    }
  };

  // Cancel button returns to profile page
  document.getElementById('cancel-btn').onclick = function() {
    window.location.href = "profile.html";
  };

  // Load user profile from database
  loadUserProfile();

  // Save button validation and database update
  document.getElementById('edit-profile-form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('edit-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const age = document.getElementById('edit-age').value.trim();
    const city = document.getElementById('edit-city').value.trim();
    const msg = document.getElementById('edit-profile-msg');
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';

    // Simple validation
    if (name.length < 2) {
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? "Name must be at least 2 characters." : "El nombre debe tener al menos 2 caracteres.";
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/u.test(name)) {
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? "Name can only contain letters and spaces." : "El nombre solo puede contener letras y espacios.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? "Invalid email." : "Correo electrónico no válido.";
      return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? "Age must be between 1 and 120." : "La edad debe estar entre 1 y 120.";
      return;
    }
    if (city.length < 2) {
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? "City must be at least 2 characters." : "La ciudad debe tener al menos 2 caracteres.";
      return;
    }

    // Save to database
    try {
      const response = await fetch('PHP/user.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          action: 'update_profile',
          full_name: name,
          email: email,
          age: age,
          city: city
        })
      });

      const result = await response.json();

      if (result.success) {
        msg.style.color = "#4f8cff";
        msg.textContent = lang === 'en' ? "Profile saved! Redirecting..." : "¡Perfil guardado! Redirigiendo...";
        
        // Show success notification
        if (typeof notifications !== 'undefined') {
          notifications.success(
            lang === 'en' ? 'Profile Updated' : 'Perfil actualizado',
            lang === 'en' ? 'Your changes have been saved' : 'Tus cambios se han guardado'
          );
        }
        
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1200);
      } else {
        msg.style.color = "#ff4f4f";
        msg.textContent = result.message || (lang === 'en' ? 'Error saving profile' : 'Error al guardar perfil');
      }
    } catch (error) {
      msg.style.color = "#ff4f4f";
      msg.textContent = lang === 'en' ? 'Connection error. Please try again.' : 'Error de conexión. Intenta de nuevo.';
      console.error('Error:', error);
    }
  };

  // --- Language Switcher for this page ---
  function setEditProfileSpanish() {
    document.title = "Editar Perfil | Tipper";
    document.getElementById('label-pic').textContent = "Foto de perfil";
    document.getElementById('label-name').textContent = "Nombre";
    document.getElementById('label-email').textContent = "Correo electrónico";
    document.getElementById('label-age').textContent = "Edad";
    document.getElementById('label-city').textContent = "Ciudad";
    document.getElementById('cancel-btn').textContent = "Cancelar";
    document.getElementById('save-btn').textContent = "Guardar";
    // Menu
    document.getElementById('menu-profile').textContent = "Mi perfil";
    document.getElementById('menu-settings').textContent = "Configuración";
    document.getElementById('menu-logout').textContent = "Cerrar sesión";
  }
  function setEditProfileEnglish() {
    document.title = "Edit Profile | Tipper";
    document.getElementById('label-pic').textContent = "Profile picture";
    document.getElementById('label-name').textContent = "Name";
    document.getElementById('label-email').textContent = "Email";
    document.getElementById('label-age').textContent = "Age";
    document.getElementById('label-city').textContent = "City";
    document.getElementById('cancel-btn').textContent = "Cancel";
    document.getElementById('save-btn').textContent = "Save";
    // Menu
    document.getElementById('menu-profile').textContent = "My profile";
    document.getElementById('menu-settings').textContent = "Settings";
    document.getElementById('menu-logout').textContent = "Log out";
  }
  // Listen for language button
  const observer = new MutationObserver(() => {
    const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
    if (lang === 'en') setEditProfileEnglish();
    else setEditProfileSpanish();
  });
  // Observe changes to lang-btn text (triggered by your main js.js)
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    observer.observe(langBtn, { childList: true });
  }
  // Set language on load
  const lang = localStorage.getItem('tipperLang') === 'en' ? 'en' : 'es';
  if (lang === 'en') setEditProfileEnglish();
  else setEditProfileSpanish();
});

/**
 * Load user profile from database
 */
async function loadUserProfile() {
  console.log('Loading user profile from database...');
  try {
    const response = await fetch('PHP/user.php?action=get_profile');
    const result = await response.json();
    console.log('Profile load result:', result);

    if (result.success) {
      const user = result.data;
      console.log('User data:', user);
      
      // Update form fields if they exist
      if (document.getElementById('edit-name')) {
        document.getElementById('edit-name').value = user.full_name || '';
      }
      if (document.getElementById('edit-email')) {
        document.getElementById('edit-email').value = user.email || '';
      }
      if (document.getElementById('edit-age')) {
        document.getElementById('edit-age').value = user.age || '';
      }
      if (document.getElementById('edit-city')) {
        document.getElementById('edit-city').value = user.city || '';
      }
      
      // Update profile display if on profile.html
      if (document.getElementById('profile-name')) {
        document.getElementById('profile-name').textContent = user.username || 'User';
      }
      if (document.getElementById('profile-email')) {
        document.getElementById('profile-email').textContent = user.email || '';
      }
      if (document.getElementById('profile-age')) {
        document.getElementById('profile-age').textContent = user.age ? user.age + ' años' : '';
      }
      if (document.getElementById('profile-city')) {
        document.getElementById('profile-city').textContent = user.city || '';
      }
      if (document.getElementById('profile-member')) {
        document.getElementById('profile-member').textContent = user.member_since || '2025';
      }
      
      // Update profile picture
      if (user.profile_picture && document.getElementById('profile-pic')) {
        document.getElementById('profile-pic').src = user.profile_picture;
      }
      if (user.profile_picture && document.getElementById('edit-profile-pic')) {
        document.getElementById('edit-profile-pic').src = user.profile_picture;
      }
    } else {
      // Not logged in, redirect to login
      if (result.message && result.message.includes('sesión')) {
        window.location.href = 'login.html';
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
}