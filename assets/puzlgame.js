document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-btn');
    const loginButton = document.querySelector('.login-btn');

    startButton.addEventListener('click', function() {
        // Логика начала игры
        alert('Начинаем игру "Собери пазлы"!');
    });

    loginButton.addEventListener('click', function() {
        // Логика входа/регистрации
        alert('Переход к входу/регистрации');
    });
});