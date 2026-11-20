// Project by Kohinoor Narwal | GF202676017
// Get the elements from the page
const timeEl = document.getElementById("time");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");
const formatBtn = document.getElementById("formatBtn");

let is24Hour = false; // false = 12-hour format

// Add a leading zero: 5 -> "05"
function pad(num) {
  return num < 10 ? "0" + num : String(num);
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (is24Hour) {
    ampmEl.textContent = "";
  } else {
    ampmEl.textContent = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12; // 0 o'clock shows as 12
  }

  timeEl.textContent = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

  // Show the date, e.g. "Friday, 20 November 2026"
  dateEl.textContent = now.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
}

// Button toggles between 12-hour and 24-hour format
formatBtn.addEventListener("click", function () {
  is24Hour = !is24Hour;
  formatBtn.textContent = is24Hour ? "Switch to 12-hour" : "Switch to 24-hour";
  updateClock();
});

updateClock();                   // show immediately
setInterval(updateClock, 1000);  // then update every 1 second
