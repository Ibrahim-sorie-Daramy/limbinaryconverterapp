
function isValidBinary(binary) {
  return /^[01]+$/.test(binary);
}

function convertBinary() {
  const binaryInput = document.getElementById("binaryInput").value;
  const conversionType = document.getElementById("conversionType").value;
  const resultDiv = document.getElementById("result");
  const loadingDiv = document.getElementById("loading");

  // Clear previous result
  resultDiv.innerHTML = "";

  if (!isValidBinary(binaryInput)) {
    resultDiv.textContent =
      "Invalid input. Please enter a valid binary number.";
    return;
  }

  try {
    const decimal = parseInt(binaryInput, 2);
    let result = "";

    if (isNaN(decimal)) {
      throw new Error("Invalid input");
    }

    // Show loading indicator
    loadingDiv.style.display = "block";

    setTimeout(() => {
      switch (conversionType) {
        case "decimal":
          result = `Decimal: ${decimal}`;
          break;
        case "octal":
          result = `Octal: ${decimal.toString(8)}`;
          break;
        case "hexadecimal":
          result = `Hexadecimal: ${decimal.toString(16).toUpperCase()}`;
          break;
      }

      // Hide loading indicator and show result
      loadingDiv.style.display = "none";
      resultDiv.textContent = result;
    }, 500); // Simulate a delay for loading
  } catch (error) {
    resultDiv.textContent = "Error during conversion. Please try again.";
  }
}

function showSteps() {
  const binaryInput = document.getElementById("binaryInput").value;
  const conversionType = document.getElementById("conversionType").value;
  const resultDiv = document.getElementById("result");

  // Clear previous result
  resultDiv.innerHTML = "";

  if (!isValidBinary(binaryInput)) {
    resultDiv.textContent =
      "Invalid input. Please enter a valid binary number.";
    return;
  }

  try {
    const decimal = parseInt(binaryInput, 2);

    if (isNaN(decimal)) {
      throw new Error("Invalid input");
    }

    let steps = `Conversion Steps:\nBinary: ${binaryInput}\n`;

    if (conversionType === "decimal") {
      steps += `Step 1: Convert binary to decimal.\nResult: ${decimal}\n`;
      steps += `${binaryInput}₂ = `;
      for (let i = 0; i < binaryInput.length; i++) {
        const bit = binaryInput[binaryInput.length - 1 - i];
        steps += `(${bit} × 2^${i}) `;
        if (i < binaryInput.length - 1) {
          steps += `+ `;
        }
      }
      steps += `= ${decimal}₁₀\n`;
    } else if (conversionType === "octal") {
      const octal = decimal.toString(8);
      const paddedBinary = binaryInput.padStart(
        Math.ceil(binaryInput.length / 3) * 3,
        "0"
      );
      const groups = paddedBinary.match(/.{1,3}/g);
      const octalSteps = groups.map((group) => parseInt(group, 2));
      steps += `Step 1: Pad binary number with leading zeros to make its length a multiple of 3.\n${paddedBinary}₂\n`;
      steps += `Step 2: Group binary number into 3-bit groups and convert each group to octal.\n`;
      steps += `${paddedBinary}₂ = ${groups.join(" ")}₂\n`;
      steps += `${groups.join(" ")}₂ = ${octalSteps.join(" ")}₈\n`;
      steps += `Step 3: Combine octal digits.\nResult: ${octal}₈\n`;
    } else if (conversionType === "hexadecimal") {
      const hex = decimal.toString(16).toUpperCase();
      const paddedBinary = binaryInput.padStart(
        Math.ceil(binaryInput.length / 4) * 4,
        "0"
      );
      const groups = paddedBinary.match(/.{1,4}/g);
      const hexSteps = groups.map((group) =>
        parseInt(group, 2).toString(16).toUpperCase()
      );
      steps += `Step 1: Pad binary number with leading zeros to make its length a multiple of 4.\n${paddedBinary}₂\n`;
      steps += `Step 2: Group binary number into 4-bit groups and convert each group to hexadecimal.\n`;
      steps += `${paddedBinary}₂ = ${groups.join(" ")}₂\n`;
      steps += `${groups.join(" ")}₂ = ${hexSteps.join(" ")}₁₆\n`;
      steps += `Step 3: Combine hexadecimal digits.\nResult: ${hex}₁₆\n`;
    }

    resultDiv.textContent = steps;
  } catch (error) {
    resultDiv.textContent = "Error during conversion. Please try again.";
  }
}

function clearResult() {
  document.getElementById("binaryInput").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("loading").style.display = "none";
}
