<?php
/**
 * Authentication Handler
 * Handles user login, registration, and logout
 */

require_once 'config.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        handleRegister();
        break;
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check_session':
        checkSession();
        break;
    default:
        jsonResponse(false, 'Acción no válida');
}

/**
 * Handle user registration
 */
function handleRegister() {
    $username = sanitize($_POST['username'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    // Validation
    if (empty($username) || empty($email) || empty($password)) {
        jsonResponse(false, 'Todos los campos son obligatorios');
    }
    
    if (strlen($username) < 3) {
        jsonResponse(false, 'El nombre de usuario debe tener al menos 3 caracteres');
    }
    
    if (!isValidEmail($email)) {
        jsonResponse(false, 'Email no válido');
    }
    
    if (strlen($password) < PASSWORD_MIN_LENGTH) {
        jsonResponse(false, 'La contraseña debe tener al menos ' . PASSWORD_MIN_LENGTH . ' caracteres');
    }
    
    try {
        $db = getDB();
        
        // Check if username exists
        $stmt = $db->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            jsonResponse(false, 'El nombre de usuario ya está en uso');
        }
        
        // Check if email exists
        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            jsonResponse(false, 'El email ya está registrado');
        }
        
        // Create user
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);
        
        $userId = $db->lastInsertId();
        
        // Create default settings for user
        $stmt = $db->prepare("INSERT INTO user_settings (user_id) VALUES (?)");
        $stmt->execute([$userId]);
        
        // Create session
        createUserSession($userId);
        
        jsonResponse(true, 'Registro exitoso', [
            'username' => $username,
            'email' => $email,
            'redirect' => 'index.html'
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error en el registro: ' . $e->getMessage());
    }
}

/**
 * Handle user login
 */
function handleLogin() {
    $userOrEmail = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($userOrEmail) || empty($password)) {
        jsonResponse(false, 'Usuario/Email y contraseña son obligatorios');
    }
    
    try {
        $db = getDB();
        
        // Find user by username or email
        $stmt = $db->prepare("SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1");
        $stmt->execute([$userOrEmail, $userOrEmail]);
        $user = $stmt->fetch();
        
        if (!$user) {
            jsonResponse(false, 'Usuario o contraseña incorrectos');
        }
        
        if (!$user['is_active']) {
            jsonResponse(false, 'Esta cuenta está desactivada');
        }
        
        // Verify password
        if (!password_verify($password, $user['password'])) {
            jsonResponse(false, 'Usuario o contraseña incorrectos');
        }
        
        // Update last login
        $stmt = $db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$user['id']]);
        
        // Create session
        createUserSession($user['id']);
        
        jsonResponse(true, 'Inicio de sesión exitoso', [
            'username' => $user['username'],
            'email' => $user['email'],
            'redirect' => 'index.html'
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error en el inicio de sesión: ' . $e->getMessage());
    }
}

/**
 * Handle user logout
 */
function handleLogout() {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        
        try {
            $db = getDB();
            // Delete user session from database
            $stmt = $db->prepare("DELETE FROM user_sessions WHERE user_id = ?");
            $stmt->execute([$userId]);
        } catch (PDOException $e) {
            // Continue with logout even if database deletion fails
        }
    }
    
    // Destroy session
    session_destroy();
    jsonResponse(true, 'Sesión cerrada exitosamente', ['redirect' => 'login.html']);
}

/**
 * Check if user is logged in
 */
function checkSession() {
    if (isset($_SESSION['user_id'])) {
        try {
            $db = getDB();
            $stmt = $db->prepare("SELECT id, username, email, profile_picture FROM users WHERE id = ? AND is_active = 1");
            $stmt->execute([$_SESSION['user_id']]);
            $user = $stmt->fetch();
            
            if ($user) {
                jsonResponse(true, 'Sesión activa', [
                    'user_id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'profile_picture' => $user['profile_picture']
                ]);
            }
        } catch (PDOException $e) {
            // Error checking session
        }
    }
    
    jsonResponse(false, 'No hay sesión activa');
}

/**
 * Create user session
 */
function createUserSession($userId) {
    $_SESSION['user_id'] = $userId;
    $_SESSION['logged_in'] = true;
    
    // Create session in database
    try {
        $db = getDB();
        $sessionToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + SESSION_LIFETIME);
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        
        $stmt = $db->prepare("INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $sessionToken, $ipAddress, $userAgent, $expiresAt]);
        
        $_SESSION['session_token'] = $sessionToken;
    } catch (PDOException $e) {
        // Continue even if session storage fails
    }
}
?>
