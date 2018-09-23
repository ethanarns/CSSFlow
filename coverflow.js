var paneCount = 6;
var listIndex = 0;
var canMove = true;
var DIST = 150;
var TIME = 500;

function setPanePos(el, pos) {
    el.style.left = "calc(50% - 30vh + " + pos + "px)";
}

function slidePanes(amt) {
    $(".pane").animate({
        left: "+=" + amt
    }, TIME, function() {
        //console.log("Done!");
    });
}

function clickTarget(e) {
    var t = e.target.id.substr(5, e.target.id.length-1);
    var dir;
    var diff = t - listIndex;
    if (diff === 0) {
        return;
    }
    if (diff < 0) {
        dir = "l";
    }
    else {
        dir = "r";
    }
    slidePanes(-DIST * diff);
    listIndex += diff;
    updatePanes(dir);
}

for (var j = 0; j < paneCount; j++) {
    var curPane = document.getElementById("pane-" + j);
    setPanePos(curPane, (j * DIST));
    curPane.addEventListener("click", clickTarget, false);
}

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
            curPane.style.animationName = "rotbackl";
        }
        else if (i === listIndex + 1) {
            curPane.style.animationName = "rotbackr";
        }
        else {
            curPane.style.animationName = (i < listIndex) ? "rotbackl" : "rotbackr";
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
    if (evt.keyCode === 39) {
        dir = "r";
        if (listIndex >= paneCount - 1) {
            return;
        }
        listIndex++;
        //offset += DIST;
        slidePanes(-DIST);
    }
    else if (evt.keyCode === 37) {
        dir = "l";
        if (listIndex <= 0) {
            return;
        }
        listIndex--;
        //offset -= DIST;
        slidePanes(DIST);
    }
    updatePanes(dir);
    canMove = false;
    window.setTimeout(function() {
        canMove = true;
    }, TIME - 100);
}
document.addEventListener("keydown", keydown, false);