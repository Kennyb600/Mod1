let selectElement = document.getElementById("languageSelect");
let messageDisplay = document.getElementById("message");

selectElement.addEventListener("change", function() {
  let selectedValue = selectElement.value;

  // Display a message using a switch statement
  switch (selectedValue) {
    case "js":
      messageDisplay.textContent = "You selected JavaScript. Great for frontend!";
      break;
    case "php":
      messageDisplay.textContent = "You selected PHP. Excellent for server-side processing.";
      break;
    case "py":
      messageDisplay.textContent = "You selected Python. Awesome for data and backends!";
      break;
    default:
      messageDisplay.textContent = "";
  }
});