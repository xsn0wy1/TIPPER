/**
 * iPhone-style Notification System
 * Beautiful notifications for user interactions
 */

class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createContainer());
        } else {
            this.createContainer();
        }
    }

    createContainer() {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.notification-container');
        }
    }

    /**
     * Show a notification
     * @param {Object} options - Notification options
     * @param {string} options.title - Notification title
     * @param {string} options.message - Notification message
     * @param {string} options.type - Type: 'success', 'error', 'warning', 'info', 'welcome'
     * @param {number} options.duration - Duration in ms (default: 5000)
     * @param {string} options.icon - Icon emoji or image URL
     * @param {boolean} options.showProgress - Show progress bar (default: true)
     * @param {Function} options.onClick - Click callback
     */
    show(options) {
        // Ensure container exists
        if (!this.container) {
            this.createContainer();
        }

        const {
            title = 'Notificación',
            message = '',
            type = 'info',
            duration = 5000,
            icon = null,
            showProgress = true,
            onClick = null
        } = options;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        // Check for dark mode
        if (this.isDarkMode()) {
            notification.classList.add('dark-mode');
        }

        // Create icon
        const iconElement = document.createElement('div');
        iconElement.className = `notification-icon ${type}`;
        
        if (icon) {
            if (icon.startsWith('http') || icon.startsWith('./') || icon.startsWith('/')) {
                // It's an image URL
                const img = document.createElement('img');
                img.src = icon;
                img.alt = 'Icon';
                iconElement.appendChild(img);
            } else {
                // It's an emoji or text
                iconElement.textContent = icon;
            }
        } else {
            // Default icons based on type
            const defaultIcons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ',
                welcome: '👋'
            };
            iconElement.textContent = defaultIcons[type] || '•';
        }

        // Create content
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'notification-title';
        titleElement.textContent = title;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'notification-message';
        messageElement.textContent = message;
        
        content.appendChild(titleElement);
        if (message) {
            content.appendChild(messageElement);
        }

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Cerrar notificación');

        // Assemble notification
        notification.appendChild(iconElement);
        notification.appendChild(content);
        notification.appendChild(closeBtn);

        // Add progress bar
        if (showProgress && duration > 0) {
            const progress = document.createElement('div');
            progress.className = `notification-progress ${type}`;
            notification.appendChild(progress);
        }

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Add click handler
        if (onClick) {
            notification.style.cursor = 'pointer';
            notification.addEventListener('click', (e) => {
                if (!e.target.classList.contains('notification-close')) {
                    onClick();
                    this.remove(notification);
                }
            });
        }

        // Close button handler
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.remove(notification);
        });

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }

        // Play sound (optional)
        this.playNotificationSound();

        return notification;
    }

    /**
     * Remove a notification
     */
    remove(notification) {
        if (!notification || !notification.parentElement) return;
        
        notification.classList.add('exit');
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }

    /**
     * Show welcome notification
     */
    showWelcome(username, profilePicture = null) {
        const hour = new Date().getHours();
        let greeting = '¡Hola';
        
        if (hour < 12) {
            greeting = '¡Buenos días';
        } else if (hour < 19) {
            greeting = '¡Buenas tardes';
        } else {
            greeting = '¡Buenas noches';
        }

        this.show({
            title: `${greeting}, ${username}!`,
            message: 'Bienvenido de vuelta a Tipper',
            type: 'welcome',
            icon: profilePicture || '👋',
            duration: 5000,
            showProgress: true
        });
    }

    /**
     * Show success notification
     */
    success(title, message, duration = 4000) {
        return this.show({
            title,
            message,
            type: 'success',
            duration
        });
    }

    /**
     * Show error notification
     */
    error(title, message, duration = 5000) {
        return this.show({
            title,
            message,
            type: 'error',
            duration
        });
    }

    /**
     * Show warning notification
     */
    warning(title, message, duration = 4000) {
        return this.show({
            title,
            message,
            type: 'warning',
            duration
        });
    }

    /**
     * Show info notification
     */
    info(title, message, duration = 4000) {
        return this.show({
            title,
            message,
            type: 'info',
            duration
        });
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        this.notifications.forEach(notification => {
            this.remove(notification);
        });
    }

    /**
     * Check if dark mode is enabled
     */
    isDarkMode() {
        return window.matchMedia && 
               window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Play notification sound (optional)
     */
    playNotificationSound() {
        // You can add a subtle notification sound here
        // For now, we'll use the system beep or skip it
        try {
            // Uncomment if you want a sound
            // const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjaR1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFApGn+DyvmwhBjaS1/LNeyoHKXzH8N6SRgoVXbTp66hVFA==');
            // audio.volume = 0.2;
            // audio.play().catch(() => {});
        } catch (e) {
            // Ignore sound errors
        }
    }
}

// Create global instance
const notifications = new NotificationSystem();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationSystem;
}
