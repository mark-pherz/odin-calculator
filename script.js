let currentInput = "";
let previousInput = "";
let operation = null;
let resultDisplayed = false;

function updateScreen() {
  document.getElementById("screen").textContent = currentInput || "0";
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "btn-eval") return;
    if (
      ["btn-plus", "btn-minus", "btn-multiply", "btn-divide"].includes(
        button.id
      )
    ) {
      if (currentInput === "" && button.id === "btn-minus") {
        currentInput = "-";
        updateScreen();
        return;
      } else if (currentInput === "-") {
        return;
      }

      previousInput = currentInput;
      currentInput = "";
      switch (button.id) {
        case "btn-plus":
          operation = "+";
          break;
        case "btn-minus":
          operation = "-";
          break;
        case "btn-multiply":
          operation = "*";
          break;
        case "btn-divide":
          operation = "/";
          break;
      }
      resultDisplayed = false;
      updateScreen();
      return;
    }
    if (resultDisplayed) {
      currentInput = "";
      resultDisplayed = false;
    }
    if (button.id === "btn-dot" && currentInput.includes(".")) {
      return;
    }
    const value = button.textContent;
    currentInput += value;
    updateScreen();
  });
});

document.getElementById("btn-eval").addEventListener("click", () => {
  if (previousInput === "" || currentInput === "" || !operation) {
    return;
  }

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  let result = 0;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
  }

  currentInput = result.toString();
  operation = null;
  previousInput = "";
  resultDisplayed = true;
  updateScreen();
});

document.getElementById("btn-reset").addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operation = null;
  resultDisplayed = false;
  updateScreen();
});
