// ---------------------------------------------------------------
// This version is for files placed inside the "live" folder.
// The "../" in each "live" link means "go up one folder", so the
// links reach digital_clock, expense_tracker and tic_tac_toe.
// ---------------------------------------------------------------
const REPO = "https://github.com/kohinoornarwal/Web-Development";

const projects = [
  {
    icon: "⏰",
    title: "Digital Clock",
    description: "A clock that shows the current time on screen.",
    live: "../digital_clock/",
    code: REPO + "/tree/main/digital_clock"
  },
  {
    icon: "💸",
    title: "Expense Tracker",
    description: "Keep track of your spending and see where your money goes.",
    live: "../expense_tracker/",
    code: REPO + "/tree/main/expense_tracker"
  },
  {
    icon: "❌⭕",
    title: "Tic Tac Toe",
    description: "The classic two-player game of Xs and Os.",
    live: "../tic_tac_toe/",
    code: REPO + "/tree/main/tic_tac_toe"
  }
];

// Build the cards
const grid = document.getElementById("project-grid");
document.getElementById("count").textContent = projects.length;

projects.forEach(function (p, i) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML =
    '<div class="card-top"><span class="icon">' + p.icon + '</span>' +
    '<span class="num">0' + (i + 1) + '</span></div>' +
    '<h3>' + p.title + '</h3>' +
    '<p>' + p.description + '</p>' +
    '<div class="card-actions">' +
      '<a class="btn primary" href="' + p.live + '">Open project →</a>' +
      '<a class="btn" href="' + p.code + '" target="_blank" rel="noopener">View code</a>' +
    '</div>';
  grid.appendChild(card);
});

// Dark / light theme toggle (remembers the choice)
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);

document.getElementById("theme-toggle").addEventListener("click", function () {
  const current = root.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
