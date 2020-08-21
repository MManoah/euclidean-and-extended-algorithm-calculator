var submit = document.querySelector("#submit");
var value1 = document.querySelector("#fvalue");
var value2 = document.querySelector("#svalue");
var answer = document.querySelector(".answer");
submit.addEventListener("mousedown", function () {
  // Try to convert string value to integer
  let a = Number(value1.value);
  let b = Number(value2.value);

  // Check for valid input
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    answer.innerHTML = "<h1>Please enter valid numbers!</h1>";
  } else if (
    a > Number.MAX_SAFE_INTEGER ||
    b > Number.MAX_SAFE_INTEGER ||
    a < 0 ||
    b < 0
  ) {
    answer.innerHTML = `<h1>Please enter numbers between 0 ≤ x ≤ ${Number.MAX_SAFE_INTEGER}</h1>`;
  } else {
    // Clear everything in the answer field for a new solution
    answer.innerHTML = "";

    //            q,r1,r2, r
    var values = [1, 1, 1, 1];

    // R1 will be the bigger value out of the two numbers
    if (a > b) {
      values[1] = a;
      values[2] = b;
    } else {
      values[1] = b;
      values[2] = a;
    }
    if (values[1] % values[2] === 0) {
      var h2 = document.createElement("H2");
      var text = document.createTextNode(`GCD: ${values[2]}`);
      h2.appendChild(text);
      return answer.appendChild(h2);
    } else if (values[2] === 0) {
      return createHeading(`GCD: ${values[1]}`, answer);
    }
    var table = document.createElement("TABLE");
    var columns = ["Q", "R1", "R2", "R"];
    var row = table.insertRow(-1);
    for (var i = 0; i < columns.length; i++) {
      var cell = row.insertCell(i);
      cell.innerHTML = columns[i];
    }

    // When the remainder of r1 and r2 is 0 the solution has been found
    while (values[1] % values[2] !== 0) {
      let quotient = getQuotient(values[1], values[2]);
      makeRow(values, quotient, table);

      // The new table row values for r1 and r2 will be the previous row shifted from right to left
      values[1] = values[2];
      values[2] = values[3];
    }
    let quotient = getQuotient(values[1], values[2]);
    makeRow(values, quotient, table);
    answer.appendChild(table);
    createHeading(`GCD: ${values[2]} (R2)`, answer);
  }
});

// Divides r1 / r2 and rounds that down to get the largest possible quotient
function getQuotient(r1, r2) {
  return Math.floor(r1 / r2);
}

function makeRow(values, quotient, table) {
  values[0] = quotient;
  values[3] = values[1] % values[2];
  var row = table.insertRow(-1);
  for (var i = 0; i < values.length; i++) {
    var cell = row.insertCell(i);
    cell.innerHTML = values[i];
  }
}

function createHeading(textValue, parent) {
  var h2 = document.createElement("H2");
  var text = document.createTextNode(textValue);
  h2.appendChild(text);
  parent.appendChild(h2);
}
