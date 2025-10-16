<?php
/**
 * Contact Form Handler
 * Handles contact form submissions
 */

require_once 'config.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'submit':
        submitContactForm();
        break;
    case 'get_messages':
        getContactMessages();
        break;
    default:
        jsonResponse(false, 'Acción no válida');
}

/**
 * Submit contact form
 */
function submitContactForm() {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $phone = sanitize($_POST['phone'] ?? '');
    $subject = sanitize($_POST['subject'] ?? '');
    $message = sanitize($_POST['message'] ?? '');
    
    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        jsonResponse(false, 'Nombre, email y mensaje son obligatorios');
    }
    
    if (!isValidEmail($email)) {
        jsonResponse(false, 'Email no válido');
    }
    
    if (strlen($message) < 10) {
        jsonResponse(false, 'El mensaje debe tener al menos 10 caracteres');
    }
    
    try {
        $db = getDB();
        
        // Get user ID if logged in
        $userId = $_SESSION['user_id'] ?? null;
        
        // Insert contact message
        $stmt = $db->prepare("
            INSERT INTO contact_messages (name, email, phone, subject, message, user_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$name, $email, $phone, $subject, $message, $userId]);
        
        // Optional: Send email notification to admin
        // mail('admin@tipper.com', 'Nuevo mensaje de contacto', $message);
        
        jsonResponse(true, 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.', [
            'message_id' => $db->lastInsertId()
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al enviar el mensaje: ' . $e->getMessage());
    }
}

/**
 * Get contact messages (admin only)
 */
function getContactMessages() {
    // Check if user is admin (you can implement admin role checking)
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, 'Acceso no autorizado');
    }
    
    try {
        $db = getDB();
        
        $limit = intval($_GET['limit'] ?? 50);
        $offset = intval($_GET['offset'] ?? 0);
        $unreadOnly = isset($_GET['unread_only']) ? 1 : 0;
        
        $sql = "SELECT cm.*, u.username 
                FROM contact_messages cm 
                LEFT JOIN users u ON cm.user_id = u.id";
        
        if ($unreadOnly) {
            $sql .= " WHERE cm.is_read = 0";
        }
        
        $sql .= " ORDER BY cm.created_at DESC LIMIT ? OFFSET ?";
        
        $stmt = $db->prepare($sql);
        $stmt->execute([$limit, $offset]);
        $messages = $stmt->fetchAll();
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM contact_messages";
        if ($unreadOnly) {
            $countSql .= " WHERE is_read = 0";
        }
        $stmt = $db->query($countSql);
        $total = $stmt->fetch()['total'];
        
        jsonResponse(true, 'Mensajes obtenidos', [
            'messages' => $messages,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener mensajes: ' . $e->getMessage());
    }
}
?>
