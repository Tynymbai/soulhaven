document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-btn');
    const loginButton = document.querySelector('.login-btn');

    backButton.addEventListener('click', function() {
        // Implement back navigation logic
        window.history.back();
    });

    loginButton.addEventListener('click', function() {
        // Implement login/registration modal or navigation
        alert('Redirecting to Login/Registration');
    });

    // Optional: Add some interactive elements
    const profilePhoto = document.querySelector('.profile-photo img');
    profilePhoto.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    profilePhoto.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});