<?php
/**
 * User Settings Handler
 * Handles user settings and preferences
 */

require_once 'config.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    jsonResponse(false, 'Debes iniciar sesión');
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'get_settings':
        getSettings();
        break;
    case 'update_settings':
        updateSettings();
        break;
    case 'change_password':
        changePassword();
        break;
    case 'delete_account':
        deleteAccount();
        break;
    default:
        jsonResponse(false, 'Acción no válida');
}

/**
 * Get user settings
 */
function getSettings() {
    try {
        $db = getDB();
        $stmt = $db->prepare("SELECT * FROM user_settings WHERE user_id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $settings = $stmt->fetch();
        
        if ($settings) {
            jsonResponse(true, 'Configuración obtenida', $settings);
        } else {
            // Create default settings if they don't exist
            $stmt = $db->prepare("INSERT INTO user_settings (user_id) VALUES (?)");
            $stmt->execute([$_SESSION['user_id']]);
            getSettings(); // Recursive call to get newly created settings
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener configuración: ' . $e->getMessage());
    }
}

/**
 * Update user settings
 */
function updateSettings() {
    $language = sanitize($_POST['language'] ?? 'es');
    $theme = sanitize($_POST['theme'] ?? 'light');
    $notificationsEnabled = isset($_POST['notifications_enabled']) ? 1 : 0;
    $emailNotifications = isset($_POST['email_notifications']) ? 1 : 0;
    
    try {
        $db = getDB();
        
        // Check if settings exist
        $stmt = $db->prepare("SELECT id FROM user_settings WHERE user_id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        
        if ($stmt->fetch()) {
            // Update existing settings
            $stmt = $db->prepare("
                UPDATE user_settings 
                SET language = ?, theme = ?, notifications_enabled = ?, email_notifications = ?
                WHERE user_id = ?
            ");
            $stmt->execute([$language, $theme, $notificationsEnabled, $emailNotifications, $_SESSION['user_id']]);
        } else {
            // Insert new settings
            $stmt = $db->prepare("
                INSERT INTO user_settings (user_id, language, theme, notifications_enabled, email_notifications) 
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([$_SESSION['user_id'], $language, $theme, $notificationsEnabled, $emailNotifications]);
        }
        
        jsonResponse(true, 'Configuración actualizada correctamente', [
            'language' => $language,
            'theme' => $theme,
            'notifications_enabled' => $notificationsEnabled,
            'email_notifications' => $emailNotifications
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al actualizar configuración: ' . $e->getMessage());
    }
}

/**
 * Change user password
 */
function changePassword() {
    $currentPassword = $_POST['current_password'] ?? '';
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    
    // Validation
    if (empty($currentPassword) || empty($newPassword) || empty($confirmPassword)) {
        jsonResponse(false, 'Todos los campos son obligatorios');
    }
    
    if ($newPassword !== $confirmPassword) {
        jsonResponse(false, 'Las contraseñas nuevas no coinciden');
    }
    
    if (strlen($newPassword) < PASSWORD_MIN_LENGTH) {
        jsonResponse(false, 'La contraseña debe tener al menos ' . PASSWORD_MIN_LENGTH . ' caracteres');
    }
    
    try {
        $db = getDB();
        
        // Get current password hash
        $stmt = $db->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        
        if (!$user) {
            jsonResponse(false, 'Usuario no encontrado');
        }
        
        // Verify current password
        if (!password_verify($currentPassword, $user['password'])) {
            jsonResponse(false, 'La contraseña actual es incorrecta');
        }
        
        // Update password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $db->prepare("UPDATE users SET password = ? WHERE id = ?");
        $stmt->execute([$hashedPassword, $_SESSION['user_id']]);
        
        jsonResponse(true, 'Contraseña actualizada correctamente');
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al cambiar contraseña: ' . $e->getMessage());
    }
}

/**
 * Delete user account
 */
function deleteAccount() {
    $password = $_POST['password'] ?? '';
    $confirmation = $_POST['confirmation'] ?? '';
    
    if (empty($password)) {
        jsonResponse(false, 'Debes proporcionar tu contraseña');
    }
    
    if ($confirmation !== 'DELETE') {
        jsonResponse(false, 'Debes confirmar escribiendo DELETE');
    }
    
    try {
        $db = getDB();
        
        // Verify password
        $stmt = $db->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($password, $user['password'])) {
            jsonResponse(false, 'Contraseña incorrecta');
        }
        
        // Delete user (cascade will delete related data)
        $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        
        // Destroy session
        session_destroy();
        
        jsonResponse(true, 'Cuenta eliminada correctamente', ['redirect' => 'login.html']);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al eliminar cuenta: ' . $e->getMessage());
    }
}
?>
