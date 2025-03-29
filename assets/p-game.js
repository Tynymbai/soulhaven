document.addEventListener('DOMContentLoaded', function() {
    const puzzleContainer = document.querySelector('.puzzle-container');
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const fullImage = document.getElementById('full-image');
    const startButton = document.getElementById('start-button');
    const shuffleButton = document.getElementById('shuffle-button');
    const completeButton = document.getElementById('complete-button');
    const completedMessage = document.querySelector('.completed-message');
    
    const rows = 4;
    const cols = 4;
    const pieces = [];
    
    let pieceWidth, pieceHeight;
    let draggedPiece = null;
    let isCompleted = false;
    let gameStarted = false;
    
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Show preview
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                
                fullImage.src = e.target.result;
                
                startButton.disabled = false;
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    startButton.addEventListener('click', function() {
        if (!fullImage.src) {
            alert('Пожалуйста, выберите изображение');
            return;
        }
        
        if (!fullImage.complete) {
            fullImage.onload = initializePuzzle;
        } else {
            initializePuzzle();
        }
    });
    
    function initializePuzzle() {
        while (pieces.length > 0) {
            const piece = pieces.pop();
            if (piece.parentNode) {
                piece.parentNode.removeChild(piece);
            }
        }
        
        startButton.style.display = 'none';
        shuffleButton.style.display = 'block';
        completeButton.style.display = 'block';
        document.querySelector('.image-upload').style.display = 'none';
        
        pieceWidth = puzzleContainer.offsetWidth / cols;
        pieceHeight = puzzleContainer.offsetHeight / rows;
        
        createPuzzle();
        gameStarted = true;
        
        setTimeout(shufflePieces, 500);
    }
    
    function createDefaultPuzzle() {
        const defaultImageUrl = '../img/beach.png';
        fullImage.src = defaultImageUrl;
        
        fullImage.onload = initializePuzzle;
    }
    
    function createPuzzle() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.dataset.row = i;
                piece.dataset.col = j;
                
                piece.style.backgroundImage = `url('${fullImage.src}')`;
                piece.style.backgroundPosition = `-${j * pieceWidth}px -${i * pieceHeight}px`;
                piece.style.width = `${pieceWidth}px`;
                piece.style.height = `${pieceHeight}px`;
                
                piece.style.left = `${j * pieceWidth}px`;
                piece.style.top = `${i * pieceHeight}px`;
                
                piece.draggable = true;
                piece.addEventListener('dragstart', handleDragStart);
                piece.addEventListener('dragend', handleDragEnd);
                piece.addEventListener('touchstart', handleTouchStart, {passive: false});
                piece.addEventListener('touchmove', handleTouchMove, {passive: false});
                piece.addEventListener('touchend', handleTouchEnd);
                
                pieces.push(piece);
                puzzleContainer.appendChild(piece);
            }
        }
        
        puzzleContainer.addEventListener('dragover', handleDragOver);
        puzzleContainer.addEventListener('drop', handleDrop);
    }
    
    function shufflePieces() {
        if (!gameStarted) return;
        
        if (isCompleted) {
            resetPuzzle();
        }
        
        completedMessage.classList.remove('show');
        
        pieces.forEach(piece => {
            piece.classList.remove('correct');
            
            const randomX = Math.random() * (puzzleContainer.offsetWidth - pieceWidth);
            const randomY = Math.random() * (puzzleContainer.offsetHeight - pieceHeight);
            
            piece.style.left = `${randomX}px`;
            piece.style.top = `${randomY}px`;
            piece.draggable = true;
        });
        
        isCompleted = false;
    }
    
    function resetPuzzle() {
        pieces.forEach(piece => {
            piece.classList.remove('correct');
            piece.draggable = true;
        });
        isCompleted = false;
    }
    
    function checkCompletion() {
        let completed = true;
        
        pieces.forEach(piece => {
            const row = parseInt(piece.dataset.row);
            const col = parseInt(piece.dataset.col);
            const correctX = col * pieceWidth;
            const correctY = row * pieceHeight;
            
            const isCorrectPosition = 
                Math.abs(piece.offsetLeft - correctX) < 10 && 
                Math.abs(piece.offsetTop - correctY) < 10;
            
            if (!isCorrectPosition) {
                completed = false;
            }
        });
        
        if (completed && !isCompleted) {
            completePuzzle();
        }
    }
    
    function completePuzzle() {
        pieces.forEach(piece => {
            const row = parseInt(piece.dataset.row);
            const col = parseInt(piece.dataset.col);
            
            piece.style.left = `${col * pieceWidth}px`;
            piece.style.top = `${row * pieceHeight}px`;
            
            piece.classList.add('correct');
            piece.draggable = false;
        });
        
        isCompleted = true;
        completedMessage.classList.add('show');
        
        setTimeout(() => {
            completedMessage.classList.remove('show');
        }, 3000);
    }
    
    function handleDragStart(e) {
        if (isCompleted) return;
        
        draggedPiece = this;
        const dragIcon = document.createElement('div');
        dragIcon.style.opacity = "0";
        document.body.appendChild(dragIcon);
        e.dataTransfer.setDragImage(dragIcon, 0, 0);
        
        this.dragOffsetX = e.clientX - this.getBoundingClientRect().left;
        this.dragOffsetY = e.clientY - this.getBoundingClientRect().top;
        
        e.dataTransfer.setData('text/plain', '');
        setTimeout(() => {
            this.style.opacity = '0.6';
        }, 0);
    }
    
    function handleDragEnd() {
        this.style.opacity = '1';
        
        checkCompletion();
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        if (draggedPiece) {
            const containerRect = puzzleContainer.getBoundingClientRect();
            
            let newX = e.clientX - containerRect.left - draggedPiece.dragOffsetX;
            let newY = e.clientY - containerRect.top - draggedPiece.dragOffsetY;
            
            newX = Math.max(0, Math.min(newX, containerRect.width - pieceWidth));
            newY = Math.max(0, Math.min(newY, containerRect.height - pieceHeight));
            
            draggedPiece.style.left = `${newX}px`;
            draggedPiece.style.top = `${newY}px`;
        }
    }
    
    function handleDrop(e) {
        e.preventDefault();
    }
    
    function handleTouchStart(e) {
        if (isCompleted) return;
        
        e.preventDefault();
        
        draggedPiece = this;
        const touch = e.touches[0];
        
        this.dragOffsetX = touch.clientX - this.getBoundingClientRect().left;
        this.dragOffsetY = touch.clientY - this.getBoundingClientRect().top;
        
        this.style.opacity = '0.6';
    }
    
    function handleTouchMove(e) {
        if (!draggedPiece) return;
        
        e.preventDefault(); 
        
        const touch = e.touches[0];
        const containerRect = puzzleContainer.getBoundingClientRect();
        
        let newX = touch.clientX - containerRect.left - draggedPiece.dragOffsetX;
        let newY = touch.clientY - containerRect.top - draggedPiece.dragOffsetY;
        
        newX = Math.max(0, Math.min(newX, containerRect.width - pieceWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - pieceHeight));
        
        draggedPiece.style.left = `${newX}px`;
        draggedPiece.style.top = `${newY}px`;
    }
    
    function handleTouchEnd() {
        if (!draggedPiece) return;
        
        draggedPiece.style.opacity = '1';
        
        checkCompletion();
        
        draggedPiece = null;
    }
    
    window.addEventListener('resize', function() {
        if (!gameStarted) return;
        
        pieceWidth = puzzleContainer.offsetWidth / cols;
        pieceHeight = puzzleContainer.offsetHeight / rows;
        
        pieces.forEach(piece => {
            const row = parseInt(piece.dataset.row);
            const col = parseInt(piece.dataset.col);
            
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            
            if (isCompleted) {
                piece.style.left = `${col * pieceWidth}px`;
                piece.style.top = `${row * pieceHeight}px`;
            }
        });
    });
    
    shuffleButton.addEventListener('click', shufflePieces);
    completeButton.addEventListener('click', completePuzzle);
    
    if (document.querySelector('.image-upload-label')) {
        document.querySelector('.image-upload-label').addEventListener('click', function() {
            imageInput.click();
        });
    }
});