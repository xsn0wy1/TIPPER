<?php
/**
 * User Profile Handler
 * Handles user profile operations (view, update)
 */

require_once 'config.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    jsonResponse(false, 'Debes iniciar sesión');
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'get_profile':
        getProfile();
        break;
    case 'update_profile':
        updateProfile();
        break;
    case 'upload_picture':
        uploadProfilePicture();
        break;
    default:
        jsonResponse(false, 'Acción no válida');
}

/**
 * Get user profile data
 */
function getProfile() {
    try {
        $db = getDB();
        $stmt = $db->prepare("
            SELECT u.*, us.language, us.theme, us.notifications_enabled 
            FROM users u 
            LEFT JOIN user_settings us ON u.id = us.user_id 
            WHERE u.id = ?
        ");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        
        if ($user) {
            // Don't send password
            unset($user['password']);
            
            // Format member since date
            $memberSince = date('Y', strtotime($user['created_at']));
            $user['member_since'] = $memberSince;
            
            jsonResponse(true, 'Perfil obtenido', $user);
        } else {
            jsonResponse(false, 'Usuario no encontrado');
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener perfil: ' . $e->getMessage());
    }
}

/**
 * Update user profile
 */
function updateProfile() {
    $fullName = sanitize($_POST['full_name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $age = intval($_POST['age'] ?? 0);
    $city = sanitize($_POST['city'] ?? '');
    
    // Validate email
    if (!empty($email) && !isValidEmail($email)) {
        jsonResponse(false, 'Email no válido');
    }
    
    try {
        $db = getDB();
        
        // Check if email is already taken by another user
        if (!empty($email)) {
            $stmt = $db->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
            $stmt->execute([$email, $_SESSION['user_id']]);
            if ($stmt->fetch()) {
                jsonResponse(false, 'Este email ya está en uso');
            }
        }
        
        // Update user profile
        $stmt = $db->prepare("
            UPDATE users 
            SET full_name = ?, email = ?, age = ?, city = ?
            WHERE id = ?
        ");
        $stmt->execute([$fullName, $email, $age, $city, $_SESSION['user_id']]);
        
        jsonResponse(true, 'Perfil actualizado correctamente', [
            'full_name' => $fullName,
            'email' => $email,
            'age' => $age,
            'city' => $city
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al actualizar perfil: ' . $e->getMessage());
    }
}

/**
 * Upload profile picture
 */
function uploadProfilePicture() {
    if (!isset($_FILES['profile_picture'])) {
        jsonResponse(false, 'No se ha enviado ninguna imagen');
    }
    
    $file = $_FILES['profile_picture'];
    
    // Validate file
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    $maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!in_array($file['type'], $allowedTypes)) {
        jsonResponse(false, 'Tipo de archivo no permitido. Solo se permiten imágenes (JPG, PNG, GIF)');
    }
    
    if ($file['size'] > $maxSize) {
        jsonResponse(false, 'El archivo es demasiado grande. Tamaño máximo: 5MB');
    }
    
    // Create uploads directory if it doesn't exist
    $uploadDir = '../uploads/profiles/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'profile_' . $_SESSION['user_id'] . '_' . time() . '.' . $extension;
    $filepath = $uploadDir . $filename;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        try {
            $db = getDB();
            $dbPath = './uploads/profiles/' . $filename;
            
            // Update user profile picture
            $stmt = $db->prepare("UPDATE users SET profile_picture = ? WHERE id = ?");
            $stmt->execute([$dbPath, $_SESSION['user_id']]);
            
            jsonResponse(true, 'Imagen de perfil actualizada', ['profile_picture' => $dbPath]);
        } catch (PDOException $e) {
            jsonResponse(false, 'Error al guardar en la base de datos: ' . $e->getMessage());
        }
    } else {
        jsonResponse(false, 'Error al subir la imagen');
    }
}
?>
