# Tipper Database Documentation

## Setup Instructions

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Web server (Apache/Nginx) or PHP built-in server

### Installation Steps

1. **Create the Database**
   - Open phpMyAdmin, MySQL Workbench, or your MySQL command line
   - Import the `database.sql` file:
   ```sql
   mysql -u root -p < database.sql
   ```
   Or simply copy and paste the content into your SQL client

2. **Configure Database Connection**
   - Open `PHP/config.php`
   - Update these settings with your database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'tipper_db');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   ```

3. **Set Up PHP Session Support**
   - Ensure PHP session support is enabled in your php.ini
   - The uploads directory will be created automatically

4. **Test the Connection**
   - Start your web server or use PHP built-in server:
   ```bash
   php -S localhost:8000
   ```
   - Visit `http://localhost:8000/login.html`

## Database Structure

### Tables

#### 1. `users`
Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| username | VARCHAR(50) | Unique username |
| email | VARCHAR(100) | Unique email |
| password | VARCHAR(255) | Hashed password |
| full_name | VARCHAR(100) | User's full name |
| age | INT | User's age |
| city | VARCHAR(100) | User's city |
| profile_picture | VARCHAR(255) | Path to profile picture |
| created_at | TIMESTAMP | Registration date |
| updated_at | TIMESTAMP | Last update |
| last_login | TIMESTAMP | Last login time |
| is_active | BOOLEAN | Account status |

#### 2. `contact_messages`
Stores messages from the contact form.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | Sender name |
| email | VARCHAR(100) | Sender email |
| phone | VARCHAR(20) | Sender phone |
| subject | VARCHAR(200) | Message subject |
| message | TEXT | Message content |
| user_id | INT | Linked user (if logged in) |
| created_at | TIMESTAMP | Message date |
| is_read | BOOLEAN | Read status |

#### 3. `user_sessions`
Tracks active user sessions for security.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| user_id | INT | User reference |
| session_token | VARCHAR(255) | Session token |
| ip_address | VARCHAR(45) | User IP |
| user_agent | TEXT | Browser info |
| created_at | TIMESTAMP | Session start |
| expires_at | TIMESTAMP | Session expiry |

#### 4. `user_settings`
Stores user preferences and settings.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| user_id | INT | User reference |
| language | VARCHAR(10) | Preferred language |
| theme | VARCHAR(20) | UI theme |
| notifications_enabled | BOOLEAN | Notification status |
| email_notifications | BOOLEAN | Email notifications |

## API Endpoints

### Authentication (`PHP/auth.php`)

#### Register User
```javascript
fetch('PHP/auth.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
        action: 'register',
        username: 'usuario',
        email: 'email@example.com',
        password: 'password123'
    })
});
```

#### Login User
```javascript
fetch('PHP/auth.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
        action: 'login',
        username: 'usuario',
        password: 'password123'
    })
});
```

#### Logout
```javascript
fetch('PHP/auth.php?action=logout');
```

#### Check Session
```javascript
fetch('PHP/auth.php?action=check_session');
```

### User Profile (`PHP/user.php`)

#### Get Profile
```javascript
fetch('PHP/user.php?action=get_profile');
```

#### Update Profile
```javascript
fetch('PHP/user.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
        action: 'update_profile',
        full_name: 'Nombre Completo',
        email: 'nuevo@email.com',
        age: 25,
        city: 'Ciudad'
    })
});
```

#### Upload Profile Picture
```javascript
const formData = new FormData();
formData.append('action', 'upload_picture');
formData.append('profile_picture', fileInput.files[0]);

fetch('PHP/user.php', {
    method: 'POST',
    body: formData
});
```

### Contact Form (`PHP/contact.php`)

#### Submit Contact Form
```javascript
fetch('PHP/contact.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
        action: 'submit',
        name: 'Nombre',
        email: 'email@example.com',
        phone: '+598 099999999',
        subject: 'Asunto',
        message: 'Mensaje...'
    })
});
```

### Settings (`PHP/settings.php`)

#### Get Settings
```javascript
fetch('PHP/settings.php?action=get_settings');
```

#### Update Settings
```javascript
fetch('PHP/settings.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
        action: 'update_settings',
        language: 'es',
        theme: 'dark',
        notifications_enabled: 1,
        email_notifications: 1
    })
});
```

#### Change Password
```javascript
fetch('PHP/settings.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
        action: 'change_password',
        current_password: 'oldpass',
        new_password: 'newpass',
        confirm_password: 'newpass'
    })
});
```

## Security Features

- ✅ Password hashing using PHP's `password_hash()`
- ✅ SQL injection protection with prepared statements
- ✅ XSS prevention with input sanitization
- ✅ Session management and tracking
- ✅ CSRF protection ready (implement tokens as needed)
- ✅ Email validation
- ✅ File upload validation

## Sample Data

The database includes two sample users for testing:
- **Username**: `User1`, **Password**: `password123`
- **Username**: `admin`, **Password**: `password123`

## Next Steps

1. Update your JavaScript files to use these API endpoints
2. Implement session checking on page load
3. Add form validation on the frontend
4. Test all functionality
5. Change sample passwords in production
6. Set up HTTPS for security
7. Consider adding CSRF tokens for forms

## Support

For issues or questions, contact the development team at tipper@gmail.com
