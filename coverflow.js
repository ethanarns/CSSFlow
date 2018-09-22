var paneCount = 4;
var listIndex = 1;
var canMove = true;
function keydown(evt) {
    if (!canMove) {
        return;
    }
    var dir;
    if (evt.keyCode === 37) {
        dir = "l";
        if (listIndex >= paneCount - 1) {
            return;
        }
        listIndex++;
    }
    else if (evt.keyCode === 39) {
        dir = "r";
        if (listIndex <= 0) {
            return;
        }
        listIndex--;
    }
    for (var i = 0; i < paneCount; i++) {
        var diff = listIndex - i;
        var curPane = document.getElementById("pane-" + i);
        curPane.style.zIndex = 100 - Math.abs(diff);
        if (i === listIndex) {
            curPane.style.animationName = "rotforw" + dir;
        }
        else if (i === listIndex - 1) {
            curPane.style.animationName = "rotbackr";
        }
        else if (i === listIndex + 1) {
            curPane.style.animationName = "rotbackl";
        }
    }
    canMove = false;
    window.setTimeout(function() {
        canMove = true;
    }, 250);
}
document.addEventListener("keydown", keydown, false);