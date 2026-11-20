// Project by Kohinoor Narwal | GF202676017
// ----- Get elements -----
const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const filterInput = document.getElementById("filter");
const list = document.getElementById("list");
const errorEl = document.getElementById("error");

const incomeEl = document.getElementById("totalIncome");
const expenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("balance");

// ----- Load saved transactions from Local Storage -----
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ----- Add a new transaction -----
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Validation
  if (title === "") {
    errorEl.textContent = "Please enter a description.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    errorEl.textContent = "Please enter an amount greater than 0.";
    return;
  }
  errorEl.textContent = "";

  const transaction = {
    id: Date.now(),            // unique id
    title: title,
    amount: amount,
    type: typeInput.value,     // "income" or "expense"
    category: categoryInput.value
  };

  transactions.push(transaction);
  saveData();
  form.reset();
  showTransactions();
});

// ----- Delete a transaction -----
function deleteTransaction(id) {
  transactions = transactions.filter(function (t) {
    return t.id !== id;
  });
  saveData();
  showTransactions();
}

// ----- Update totals -----
function updateSummary() {
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      income += transactions[i].amount;
    } else {
      expense += transactions[i].amount;
    }
  }

  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = (income - expense).toFixed(2);
}

// ----- Show the list on the page -----
function showTransactions() {
  list.innerHTML = "";
  const filter = filterInput.value;

  const visible = transactions.filter(function (t) {
    return filter === "all" || t.type === filter;
  });

  if (visible.length === 0) {
    list.innerHTML = '<p class="empty">No transactions yet.</p>';
  }

  visible.forEach(function (t) {
    const li = document.createElement("li");
    li.className = t.type;

    const sign = t.type === "income" ? "+" : "-";
    const info = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = t.title; // textContent keeps user input safe
    const cat = document.createElement("small");
    cat.textContent = t.category;
    info.appendChild(name);
    info.appendChild(cat);

    const amt = document.createElement("span");
    amt.className = "amt";
    amt.textContent = sign + t.amount.toFixed(2);

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "Delete";
    del.addEventListener("click", function () {
      deleteTransaction(t.id);
    });

    li.appendChild(info);
    li.appendChild(amt);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateSummary();
}

filterInput.addEventListener("change", showTransactions);
showTransactions();
