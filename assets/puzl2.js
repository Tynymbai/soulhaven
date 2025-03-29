document.addEventListener('DOMContentLoaded', () => {
    const puzzleCards = document.querySelectorAll('.puzzle-card');
    const playButton = document.querySelector('.play-button');
    let selectedPuzzle = null;

    puzzleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove previous selection
            puzzleCards.forEach(c => c.classList.remove('selected'));
            
            // Mark current card as selected
            card.classList.add('selected');
            selectedPuzzle = card.querySelector('h3').textContent;
        });
    });

    playButton.addEventListener('click', () => {
        if (selectedPuzzle) {
            alert(`Вы выбрали пазл: ${selectedPuzzle}`);
            // Here you would typically redirect to the puzzle game
        } else {
            alert('Пожалуйста, выберите пейзаж');
        }
    });
});