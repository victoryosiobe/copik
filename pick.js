let body = document.body;
let result1 = document.getElementById("result1");
let result2 = result1.nextElementSibling;
let result3 = result2.nextElementSibling;
var h1El = document.getElementsByTagName("h1");
let colors_plate = document.getElementById("color");

function getColor() {
  // code that sets the color value
  let colors = colors_plate.value;
  result1.textContent = colors;
  result2.textContent = hexToRgb(colors);
  result3.textContent = hexToHsl(colors);
  result1.style.color = colors;
  result2.style.color = colors;
  result3.style.color = colors;
  body.style.background = colors;
  console.log(body.style.background);
}

function hexToRgb(hex, alpha = 1) {
  try {
    var r = parseInt(hex.substring(1, 3), 16);
    var g = parseInt(hex.substring(3, 5), 16);
    var b = parseInt(hex.substring(5, 7), 16);

    // Check if hex has alpha channel (8 characters including #)
    if (hex.length === 9) {
      alpha = parseInt(hex.substring(7, 9), 16) / 255;
      adjustForEyes(r, g, b, alpha);
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha.toFixed(2) + ")";
    }

    adjustForEyes(r, g, b, alpha);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  } catch (err) {
    alert("Sorry, error somewhere. " + err);
  }
}

function hexToHsl(hex) {
  try {
    var r = parseInt(hex.substring(1, 3), 16) / 255;
    var g = parseInt(hex.substring(3, 5), 16) / 255;
    var b = parseInt(hex.substring(5, 7), 16) / 255;
    var alpha = 1;

    // Check if hex has alpha channel
    if (hex.length === 9) {
      alpha = parseInt(hex.substring(7, 9), 16) / 255;
    }

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    if (alpha < 1) {
      return (
        "hsla(" + h + ", " + s + "%, " + l + "%, " + alpha.toFixed(2) + ")"
      );
    }
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  } catch (err) {
    alert("Sorry, error somewhere. " + err);
    return "HSL conversion error";
  }
}

function adjustForEyes(r, g, b, alpha = 1) {
  // Calculate perceived brightness using luminance formula
  // Apply alpha to the calculation
  var brightness = (r * 0.299 + g * 0.587 + b * 0.114) * alpha;

  if (brightness < 128 || alpha < 0.5) {
    h1El[0].style.color = "white";
    result1.style.background = "white";
    result2.style.background = "white";
    result3.style.background = "white";
    colors_plate.style.outlineColor = "white";
  } else {
    h1El[0].style.color = "black";
    result1.style.background = "black";
    result2.style.background = "black";
    result3.style.background = "black";
    colors_plate.style.outlineColor = "black";
  }
}

