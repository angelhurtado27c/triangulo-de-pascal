var body = document.getElementsByTagName("body")[0];

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

window.addEventListener("resize", positionTriangle);