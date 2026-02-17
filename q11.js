let allParagraphs = document.querySelectorAll("p");

allParagraphs.forEach(function(p) {
  // When the mouse enters
  p.addEventListener("mouseenter", function() {
    p.style.fontWeight = "bold";
    p.style.color = "blue";
  });
  
  // When the mouse leaves
  p.addEventListener("mouseleave", function() {
    p.style.fontWeight = "normal";
    p.style.color = "black";
  });
});