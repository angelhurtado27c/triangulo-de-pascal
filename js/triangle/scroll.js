var triangle = document.getElementById("triangle");
var numberRows = document.getElementById("number-rows");
numberRows.innerHTML = displayTriangle.triangle.size;



// add

document.getElementById("add").addEventListener("click", addRowTriangle);

function addRowTriangle() {
    displayTriangle.addLastRow();
    numberRows.innerHTML = displayTriangle.iRow + 1;
    
    positionTriangle();
    window.scrollTo(window.scrollX + 33, window.scrollY);
}



// delete

document.getElementById("delete").addEventListener("click", deleteRowTriangle);

function deleteRowTriangle() {
    if ( displayTriangle.iRow > 2 ) {
        displayTriangle.deleteLastRow(focus);
        numberRows.innerHTML = displayTriangle.iRow + 1;
    }
}

function focus() {
    positionTriangle();
    window.scrollTo(window.scrollX - 33, window.scrollY);
}