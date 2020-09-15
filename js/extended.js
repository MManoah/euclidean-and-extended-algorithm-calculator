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

    // s1=1, s2=0, t1=0, t2=1 will always be the default starting values
    //            q,r1, r2,  r,s1,s2, s,t1,t2, t
    var values = [1, 1, 99, 98, 1, 0, 1, 0, 1, "placeholder"];

    // R1 will be the bigger value out of the two numbers
    if (a > b) {
      values[1] = a;
      values[2] = b;
    } else {
      values[1] = b;
      values[2] = a;
      a = b;
      b = values[2];
    }
    if (values[1] % values[2] === 0) {
      createHeading(`GCD: ${values[2]}`, answer);
      createHeading("S: 0", answer);
      return createHeading("T: 1", answer);
    } else if (values[2] === 0) {
      createHeading(`GCD: ${values[1]}`, answer);
      createHeading("S: 1", answer);
      return createHeading("T: 0", answer);
    }
    var table = document.createElement("TABLE");
    var columns = ["Q", "R1", "R2", "R", "S1", "S2", "S", "T1", "T2", "T"];
    newTableRow(table, columns);

    // When the remainder is 0 the solution has been found
    while (values[2] % values[3] !== 0) {
      // Placeholder indicates that the loop is running for the first time
      if (values[9] !== "placeholder") {
        shiftTable(table, values, false);
      } else {
        let quotient = getQuotient(values[1], values[2]);
        values[0] = quotient;
        values[3] = values[1] % values[2];
        values[6] = calculateS(values[4], values[5], values[0]);
        values[9] = calculateT(values[7], values[8], values[0]);
        newTableRow(table, values);
      }
    }
    shiftTable(table, values, true);
    answer.appendChild(table);
    createHeading(`GCD: ${values[2]} (R2)`, answer);
    createHeading(`S: ${values[5]} (S2)`, answer);
    createHeading(`T: ${values[8]} (T2)`, answer);
    createHeading(
      `(${a} * ${values[5]}) + (${b} * ${values[8]}) = ${values[2]}`,
      answer
    );
  }
});

// Divides r1 / r2 and rounds that down to get the largest possible quotient
function getQuotient(r1, r2) {
  return Math.floor(r1 / r2);
}

// s=s1-s2*q
function calculateS(s1, s2, q) {
  return s1 - s2 * q;
}

// t=t1-t2*q
function calculateT(t1, t2, q) {
  return t1 - t2 * q;
}

function createHeading(textValue, parent) {
  var h2 = document.createElement("H2");
  var text = document.createTextNode(textValue);
  h2.appendChild(text);
  parent.appendChild(h2);
}

function newTableRow(table, values) {
  var row = table.insertRow(-1);
  for (var i = 0; i < values.length; i++) {
    var cell = row.insertCell(i);
    cell.innerHTML = values[i];
  }
}

// The new table row values for r1, r2, s1, s2, t1, t2 will be the previous row shifted from right to left
function shiftTable(table, values, qInc) {
  values[1] = values[2];
  values[2] = values[3];
  values[4] = values[5];
  values[5] = values[6];
  values[7] = values[8];
  values[8] = values[9];
  let quotient = getQuotient(values[1], values[2]);
  values[0] = quotient;
  if (qInc) values[0]++;
  values[6] = calculateS(values[4], values[5], values[0]);
  values[9] = calculateT(values[7], values[8], values[0]);
  values[3] = values[1] % values[2];
  newTableRow(table, values);
}
