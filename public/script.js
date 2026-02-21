 // public/script.js - Shared JavaScript Functions

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.background = type === 'success' ? '#27ae60' : '#e74c3c';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Format time
function formatTime(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ta-IN');
}

// Get status color
function getStatusColor(status) {
    const colors = {
        'new': '#3498db',
        'received': '#f39c12',
        'preparing': '#e67e22',
        'ready': '#27ae60',
        'completed': '#95a5a6'
    };
    return colors[status] || '#95a5a6';
}

// Calculate time difference
function getTimeDiff(startTime, endTime = Date.now()) {
    if (!startTime) return 0;
    const diff = Math.floor((endTime - startTime) / 1000); // seconds
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play sound for new order
function playNotificationSound() {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        formatTime,
        getStatusColor,
        getTimeDiff,
        playNotificationSound
    };
}
