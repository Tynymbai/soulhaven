function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 3 and 8px
        const size = Math.random() * 5 + 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        // Random opacity
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Add animation with random duration
        const animationDuration = Math.random() * 5 + 3;
        star.style.animation = `twinkle ${animationDuration}s infinite alternate`;
        
        starsContainer.appendChild(star);
    }
}

// Add this to page styles
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createStars();
});

// Button click event
document.querySelector('.cta-button').addEventListener('click', () => {
    alert('Спасибо за интерес! Мы свяжемся с вами в ближайшее время.');
    // You can replace this with actual form submission logic
});

document.addEventListener('DOMContentLoaded', function() {
    const startButtons = document.querySelectorAll('.start-button');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const gameName = this.closest('.game-card').querySelector('.game-title').textContent;
            alert(`Вы начали игру: ${gameName}`);
        });
    });
});

// Add stars to background
function addStars() {
    const starBackground = document.querySelector('.star-background');
    const starCount = 30;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '★';
        star.style.fontSize = Math.random() * 20 + 10 + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        starBackground.appendChild(star);
    }
}

// Show notification for 5 seconds
document.getElementById('allCoursesBtn').addEventListener('click', function() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(function() {
        notification.classList.remove('show');
    }, 5000);
});

// Close notification when clicking the close button
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').classList.remove('show');
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    addStars();
});