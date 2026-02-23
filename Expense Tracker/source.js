const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expenses');

const history = document.querySelector('.transaction-history');
const description = document.getElementById('text');
const amount = document.getElementById('amount');
const submitBtn = document.getElementById('submit-btn');

const Transactions = JSON.parse(localStorage.getItem('transactions')) || [];

updateUI()


function addTransaction(e) {
    e.preventDefault();
    if (description.value.trim() === '' || amount.value.trim() === '' || amount.value === 0) {return}
    const transaction = {
        id: crypto.randomUUID(),
        description: description.value,
        amount: +amount.value
    }   
    Transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(Transactions));
    updateUI();
    description.value = '';
    amount.value = '';
}

function expenseAmount() {
    const expenseTransactions = Transactions.filter(transaction => transaction.amount < 0);
    const totalExpense = expenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return totalExpense;
}

function incomeAmount() {
    const incomeTransactions = Transactions.filter(transaction => transaction.amount > 0);
    const totalIncome = incomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return totalIncome;
}

function balanceAmount() {
    const totalBalance = incomeAmount() + expenseAmount();
    return totalBalance;
}

function updateUI() {
    balance.textContent = `$${balanceAmount().toFixed(2)}`;
    income.textContent = `$${incomeAmount().toFixed(2)}`;
    expense.textContent = `$${Math.abs(expenseAmount()).toFixed(2)}`;
    history.innerHTML = '';
    Transactions.forEach(transaction => renderTransaction(transaction));
}

function renderTransaction(transaction) {
    const transactionEl = document.createElement('li');
    transactionEl.classList.add('transaction-item');
    transactionEl.innerHTML = `
        <span>${transaction.description}</span>
        <span>$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" data-id="${transaction.id}">X</button>
    `;
    history.appendChild(transactionEl);
}
submitBtn.addEventListener('click', addTransaction);

history.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const transactionId = e.target.getAttribute('data-id');
        const transactionIndex = Transactions.findIndex(transaction => transaction.id === transactionId);
        Transactions.splice(transactionIndex, 1);
        localStorage.setItem('transactions', JSON.stringify(Transactions));
        updateUI();
    }
});