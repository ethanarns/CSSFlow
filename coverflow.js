var paneCount = 4;
var listIndex = 0;
function keydown(evt) {
    if (evt.keyCode === 39) {
        listIndex++;
    }
    else if (evt.keyCode === 37) {
        listIndex--;
    }
    for (var i = 0; i < paneCount; i++) {
        console.log("id: pane-" + i);
        var curPane = document.getElementById("pane-" + i);
        console.log(curPane.innerHTML);
    }
}
document.addEventListener("keydown", keydown, false);