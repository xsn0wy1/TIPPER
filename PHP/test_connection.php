<?php
/**
 * Database Connection Test
 * Upload this file to your server and visit it in your browser to test the database connection
 * DELETE THIS FILE after testing for security!
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><title>Database Test</title></head><body>";
echo "<h1>Tipper Database Connection Test</h1>";

// Test 1: Check if config file exists
echo "<h2>Test 1: Config File</h2>";
if (file_exists('config.php')) {
    echo "✅ config.php exists<br>";
    require_once 'config.php';
} else {
    echo "❌ config.php not found<br>";
    exit;
}

// Test 2: Check database connection
echo "<h2>Test 2: Database Connection</h2>";
try {
    $db = getDB();
    echo "✅ Connected to database successfully<br>";
    echo "Database: " . DB_NAME . "<br>";
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "<br>";
    exit;
}

// Test 3: Check if tables exist
echo "<h2>Test 3: Database Tables</h2>";
$tables = ['users', 'contact_messages', 'user_sessions', 'user_settings'];
foreach ($tables as $table) {
    try {
        $stmt = $db->query("SELECT COUNT(*) FROM $table");
        $count = $stmt->fetchColumn();
        echo "✅ Table '$table' exists (rows: $count)<br>";
    } catch (Exception $e) {
        echo "❌ Table '$table' not found or error: " . $e->getMessage() . "<br>";
    }
}

// Test 4: Check PHP version and extensions
echo "<h2>Test 4: PHP Configuration</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "PDO Extension: " . (extension_loaded('pdo') ? '✅ Loaded' : '❌ Not loaded') . "<br>";
echo "PDO MySQL Driver: " . (extension_loaded('pdo_mysql') ? '✅ Loaded' : '❌ Not loaded') . "<br>";

// Test 5: Check session
echo "<h2>Test 5: Session Test</h2>";
echo "Session Status: " . session_status() . "<br>";
if (session_status() === PHP_SESSION_ACTIVE) {
    echo "✅ Session is active<br>";
} else {
    echo "❌ Session not active<br>";
}

echo "<hr>";
echo "<p><strong>⚠️ IMPORTANT:</strong> Delete this file (test_connection.php) after testing for security!</p>";
echo "</body></html>";
?>
