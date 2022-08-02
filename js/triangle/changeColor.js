document.onclick = click;
document.onmousedown = function(){document.onmousemove = clickMove; return false;};
document.onmouseup = function(){document.onmousemove = null;};

function click(e){
    var element = e.target;

    if (element.parentNode.className == "row") {
        element.style.background = element.environment.colors.background;
        element.style.color = element.environment.colors.color;
    }
}

function clickMove(e) {
    if (e.buttons == 1) {
        var element = e.target;

        if (element.parentNode.className == "row") {
            element.style.background = element.environment.colors.background;
            element.style.color = element.environment.colors.color;
        }
    }
}