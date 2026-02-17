function myFunction() {
  let pToRemove = document.getElementById("demo");
  // Check if it exists before trying to remove to avoid errors on multiple clicks
  if (pToRemove) {
    pToRemove.remove();
  }
}