var paneCount = 4;
var listIndex = 0;
var canMove = true;
function keydown(evt) {
    if (!canMove) {
        console.log("Cannot move yet.");
        return;
    }
    var dir;
    if (evt.keyCode === 37) {
        dir = "l";
        if (listIndex >= paneCount - 1) {
            console.log("Out of bounds.");
            return;
        }
        listIndex++;
    }
    else if (evt.keyCode === 39) {
        dir = "r";
        if (listIndex <= 0) {
            console.log("Out of bounds");
            return;
        }
        listIndex--;
    }
    //console.log(listIndex);
    for (var i = 0; i < paneCount; i++) {
        var diff = Math.abs(listIndex - i);
        //console.log("" + i + "'s diff: " + diff);
        //console.log("id: pane-" + i);
        var curPane = document.getElementById("pane-" + i);
        curPane.style.zIndex = 100 - diff;
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