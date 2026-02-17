// Find all <p> elements
let paragraphs = document.querySelectorAll("p");

paragraphs.forEach(function(p) {
  // Change text color to red on hover
  p.addEventListener("mouseover", function() {
    p.style.color = "red";
  });
  
  // Revert back when the mouse leaves
  p.addEventListener("mouseout", function() {
    p.style.color = ""; 
  });
});