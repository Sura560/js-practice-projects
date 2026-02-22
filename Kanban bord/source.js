const columns = document.querySelectorAll('.column');
const cards = document.querySelectorAll('.card');

let currentCard = null;

    document.addEventListener('dragstart', (e) => {
        currentCard = e.target;       
        currentCard.style.opacity = '0.5';              
})  
    document.addEventListener('dragend', (e) => {
        currentCard = null;       
        e.target.style.opacity = '1';
    })
columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
    })
    column.addEventListener('drop', () => {
        column.appendChild(currentCard);
        saveBoard();
    })
})

function saveBoard () {
    const savedBoard = {};
    columns.forEach(column => {
        const columnId = column.id;
        const cards = column.querySelectorAll('.card');
        savedBoard[columnId] = [];
        cards.forEach(card => {
            savedBoard[columnId].push(card.textContent);
        })
        
    });
    localStorage.setItem('kanbanBoard', JSON.stringify(savedBoard));
}
function loadBoard() {
    const savedBoard = JSON.parse(localStorage.getItem('kanbanBoard'));
    if(!savedBoard) return;
    Object.keys(savedBoard).forEach(columnId => {
        const column = document.getElementById(columnId);
        column.querySelectorAll('.card').forEach(card => card.remove());

        savedBoard[columnId].forEach(cardText => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('draggable', 'true');
            card.textContent = cardText;
            column.appendChild(card);
        });
    });   
}
loadBoard();
