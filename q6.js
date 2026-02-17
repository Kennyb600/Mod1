document.getElementById("btn1").addEventListener("click", function() {
  // Find elements with the class 'tutorial'
  let tutorials = document.querySelectorAll(".tutorial");
  
  // Change their background color to yellow
  tutorials.forEach(function(div) {
    div.style.backgroundColor = "yellow";
  });
});