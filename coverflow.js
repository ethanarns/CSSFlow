var paneCount = 6;
var listIndex = 0;
var canMove = true;

// Set up existing panes
function updatePanes(dir) {
    for (var i = 0; i < paneCount; i++) {
        var diff = listIndex - i;
        var curPane = document.getElementById("pane-" + i);
        
        // Set animation direction
        if (i === listIndex) {
            curPane.style.animationName = "rotforw" + dir;
        }
        else if (i === listIndex - 1) {
            curPane.style.animationName = "rotbackr";
        }
        else if (i === listIndex + 1) {
            curPane.style.animationName = "rotbackl";
        }
        else {
            curPane.style.animationName = (i > listIndex) ? "rotbackl" : "rotbackr";
        }
        // Set Z-Index
        curPane.style.zIndex = 100 - Math.abs(diff);
    }
}

updatePanes("l");

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
    updatePanes(dir);
    canMove = false;
    window.setTimeout(function() {
        canMove = true;
    }, 250);
}
document.addEventListener("keydown", keydown, false);