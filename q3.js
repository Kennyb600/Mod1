document.getElementById("button1").addEventListener("click", function() {
  // Find all <textarea> and <p> elements
  let elements = document.querySelectorAll("textarea, p");
  
  // Loop through the NodeList and set their border color to red
  elements.forEach(function(el) {
    el.style.border = "2px solid red";
  });
});