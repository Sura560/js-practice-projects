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
    })
})