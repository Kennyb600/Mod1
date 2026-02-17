function myFunction() {
  // Find the <style> element
  let styleElement = document.querySelector("style");
  
  // Check if a style block exists, extract its contents, and display it
  if (styleElement) {
    document.getElementById("demo").innerText = styleElement.innerHTML;
  } else {
    document.getElementById("demo").innerText = "No internal styles found.";
  }
}