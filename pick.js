let body = document.body
let result1 = document.getElementById('result1')
let result2 = result1.nextElementSibling
let result3 = result2.nextElementSibling
var h1El = document.getElementsByTagName('h1')
let colors_plate = document.getElementById('color')

function getColor() {
  // code that sets the color value
  let colors = colors_plate.value;
  result1.textContent = colors;
  result2.textContent = hexToRgb(colors);
  result3.textContent = hexToHla(colors);
  result1.style.color = colors;
  result2.style.color = colors;
  result3.style.color = colors;
  body.style.background = colors;
  console.log(body.style.background)

}

function hexToRgb(hex) {
  try {
    var r = parseInt(hex.substring(1, 3), 16);
    var g = parseInt(hex.substring(3, 5), 16);
    var b = parseInt(hex.substring(5, 7), 16);
    adjustForEyes(r, g, b)
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  catch (err) {
    alert('Sorry, error somewhere. ' + err)
  }
}

function hexToHla(hex) {
  return 'Hla color code comming soon.'
}

function adjustForEyes(r, g, b) {
  if ((r < 170) && (g < 170) && (b < 170 || b > 170)) { // > for difficulty in seeing with blue.
    h1El[0].style.color = 'white'
    result1.style.background = 'white'
    result2.style.background = 'white'
    result3.style.background = 'white'
    colors_plate.style.outlineColor = 'white'
  }
  else {
    h1El[0].style.color = 'black'
    result1.style.background = 'black'
    result2.style.background = 'black'
    result3.style.background = 'black'
    colors_plate.style.outlineColor = 'black'
  }
}