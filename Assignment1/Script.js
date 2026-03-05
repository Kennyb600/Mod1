// ================= QUESTION 1 =================
try {
  let x = 5;
  let y = 10;
  let sum = x + y;
  document.getElementById("demo1").innerHTML = sum;
} catch (err) { console.error("Error in Q1:", err); }

// ================= QUESTION 2 =================
try {
  document.getElementById("btn2").addEventListener("click", function() {
    let firstName = prompt("Q2: Enter your first name:");
    let lastName = prompt("Q2: Enter your last name:");
    let age = prompt("Q2: Enter your age:");
    if(firstName || lastName || age) {
      alert(`User Details:\nName: ${firstName} ${lastName}\nAge: ${age}`);
    }
  });
} catch (err) { console.error("Error in Q2:", err); }

// ================= QUESTION 3 =================
try {
  document.getElementById("button3").addEventListener("click", function() {
    let elements = document.querySelectorAll("#q3 textarea, #q3 p");
    elements.forEach(function(el) {
      el.style.border = "2px solid red";
    });
  });
} catch (err) { console.error("Error in Q3:", err); }

// ================= QUESTION 4 =================
try {
  let newParagraph = document.createElement("p");
  let courseName = "Dynamic Websites & Applications";
  newParagraph.textContent = `Welcome to the ${courseName} module!`;
  document.getElementById("q4").appendChild(newParagraph);
} catch (err) { console.error("Error in Q4:", err); }

// ================= QUESTION 5 =================
try {
  let target = document.getElementById("targetparagraph5");
  if(target) {
    target.addEventListener("click", function() {
      target.style.color = "Gold";
      target.style.backgroundColor = "red";
    });
  }
} catch (err) { console.error("Error in Q5:", err); }

// ================= QUESTION 6 =================
try {
  document.getElementById("btn6").addEventListener("click", function() {
    let tutorials = document.querySelectorAll("#q6 .tutorial");
    tutorials.forEach(function(div) {
      div.style.backgroundColor = "yellow";
    });
  });
} catch (err) { console.error("Error in Q6:", err); }

// ================= QUESTION 7 =================
try {
  let selectElement = document.getElementById("languageSelect");
  let messageDisplay = document.getElementById("message");

  if(selectElement && messageDisplay) {
    selectElement.addEventListener("change", function() {
      let selectedValue = selectElement.value;
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
  }
} catch (err) { console.error("Error in Q7:", err); }

// ================= QUESTION 8 =================
try {
  window.addEventListener("load", function() {
    let imgElement = document.getElementById("image");
    if(imgElement) {
      imgElement.src = "mountain.jpg";
      imgElement.alt = "Picture of a mountain"; 
    }
  });
} catch (err) { console.error("Error in Q8:", err); }

// ================= QUESTION 9 =================
window.myFunction9 = function() {
  let styleElement = document.querySelector("style");
  let demo9 = document.getElementById("demo9");
  if (styleElement && demo9) {
    demo9.innerText = styleElement.innerHTML;
  } else if (demo9) {
    demo9.innerText = "No internal styles found.";
  }
};

// ================= QUESTION 10 =================
try {
  let q10Paragraphs = document.querySelectorAll("#q10 p");
  q10Paragraphs.forEach(function(p) {
    p.addEventListener("mouseover", function() {
      p.style.color = "red";
    });
    p.addEventListener("mouseout", function() {
      p.style.color = ""; 
    });
  });
} catch (err) { console.error("Error in Q10:", err); }

// ================= QUESTION 11 =================
try {
  let q11Paragraphs = document.querySelectorAll("#q11 p");
  q11Paragraphs.forEach(function(p) {
    p.addEventListener("mouseenter", function() {
      p.style.fontWeight = "bold";
      p.style.color = "blue";
    });
    p.addEventListener("mouseleave", function() {
      p.style.fontWeight = "normal";
      p.style.color = "black";
    });
  });
} catch (err) { console.error("Error in Q11:", err); }

// ================= QUESTION 12 =================
window.myFunction12 = function() {
  let pToRemove = document.getElementById("demo12");
  if (pToRemove) {
    pToRemove.remove();
  }
};

// ================= QUESTION 13 =================
try {
  let fruits = ["Cherry", "Banana", "Pineapple", "Guava", "Mango"];
  let lastItem = fruits[fruits.length - 1];
  let demo13 = document.getElementById("demo13");
  if(demo13) {
    demo13.innerHTML = `The last fruit is: <strong>${lastItem}</strong>`;
  }
} catch (err) { console.error("Error in Q13:", err); }