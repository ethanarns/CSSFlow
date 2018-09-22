var paneCount = 4;
var listIndex = 0;
function keydown(evt) {
    var dir;
    if (evt.keyCode === 39) {
        dir = "l";
        if (listIndex >= paneCount - 1) {
            return;
        }
        listIndex++;
    }
    else if (evt.keyCode === 37) {
        dir = "r";
        if (listIndex <= 0) {
            return;
        }
        listIndex--;
    }
    console.log(listIndex);
    for (var i = 0; i < paneCount; i++) {
        //console.log("id: pane-" + i);
        var curPane = document.getElementById("pane-" + i);
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
}
document.addEventListener("keydown", keydown, false);