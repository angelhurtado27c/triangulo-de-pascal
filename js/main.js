document.onmousedown = function() { return false; }
var body = document.getElementsByTagName("body")[0];

var displayTriangle = new DisplayTriangle( document.getElementById("triangle"), 10 );
var numberRows = document.getElementById("number-rows");

numberRows.innerHTML = displayTriangle.triangle.size;

positionTriangle();

document.getElementById("add").addEventListener("click", function() {
    displayTriangle.addLastRow();
    numberRows.innerHTML = displayTriangle.triangle.size;
    
    positionTriangle();
});

document.getElementById("delete").addEventListener("click", function() {
    if ( displayTriangle.triangle.size > 3 ) {
        displayTriangle.deleteLastRow();
        numberRows.innerHTML = displayTriangle.triangle.size;

        positionTriangle();
    }
});

window.addEventListener("resize", positionTriangle);

function positionTriangle() {
    var triangleHeight = displayTriangle.divTriangle.clientHeight;
    var screenHeight = body.clientHeight;
    var triangleWidth = displayTriangle.divTriangle.clientWidth;
    var screenWidth = body.clientWidth;

    if ( triangleHeight > screenHeight )
        displayTriangle.divTriangle.style.top = "0";
    else
        displayTriangle.divTriangle.style.top = "auto";
    
    if ( triangleWidth > screenWidth )
        displayTriangle.divTriangle.style.left = "0";
    else
        displayTriangle.divTriangle.style.left = "auto";
}