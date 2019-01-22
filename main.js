var map = new Array();
var score = 0;

function newgame() {
    for (var i = 0; i < 4; ++i) {
        map[i] = new Array();
        for (var j = 0; j < 4; ++j) {
            map[i][j] = 0;
            var box = document.getElementById("box-"+i+"-"+j);
            box.setAttribute("class", "blank");
            box.innerText = "";
        }
    }
    randomCreateCeil();
    randomCreateCeil();
    document.getElementById("score").innerText = "0";
    score = 0;
}

function randomCreateCeil() {
    do {
        var ran1 = Math.round(Math.random()*3);
        var ran2 = Math.round(Math.random()*3);
    } while (map[ran1][ran2]);
    var id = "#box-" + ran1 + "-" + ran2;
    var box = document.getElementById("box-"+ran1+"-"+ran2);
    var ran3 = Math.round(Math.random()*3);
    if (ran3 > 2) {
        ran3 = 4;
        box.setAttribute("class", "num4");
    }
    else {
        ran3 = 2;
        box.setAttribute("class", "num2");
    }
    box.innerText = ran3.toString();
    $(id).fadeOut(0);
    $(id).fadeIn();
    map[ran1][ran2] = 1;
}

function move(keycode) {
    var move = false;
    switch (keycode) {
        case 87:
            for (var ocol = 0; ocol < 4; ++ocol) {
                var end = 0;
                for (var row = 1; row < 4; ++row) {
                    if (map[row][ocol]) {
                        for (var trow = row-1; trow >= end; --trow) {
                            var orow = trow + 1;
                            var obox = document.getElementById("box-"+orow+"-"+ocol);
                            var onum = Number(obox.innerText);
                            var tbox = document.getElementById("box-"+trow+"-"+ocol);
                            if (map[trow][ocol]) {
                                var tnum = Number(tbox.innerText);
                                if (tnum == onum) {
                                    merge(obox, tbox, false);
                                    map[orow][ocol] = 0;
                                    move = true;
                                    end = trow + 1;
                                }
                                break;
                            }
                            else {
                                merge(obox, tbox, true);
                                map[orow][ocol] = 0;
                                map[trow][ocol] = 1;
                                move = true;
                                // sleep
                                var i = 0;
                                while (i < 1000) {
                                    ++i;
                                }
                            }
                        }
                    }
                }
            }
            break;
        case 65:
            for (var orow = 0; orow < 4; ++orow) {
                var end = 0;
                for (var col = 1; col < 4; ++col) {
                    if (map[orow][col]) {
                        for (var tcol = col-1; tcol >= end; --tcol) {
                            var ocol = tcol + 1;
                            var obox = document.getElementById("box-"+orow+"-"+ocol);
                            var onum = Number(obox.innerText);
                            var tbox = document.getElementById("box-"+orow+"-"+tcol);
                            if (map[orow][tcol]) {
                                var tnum = Number(tbox.innerText);
                                if (tnum == onum) {
                                    merge(obox, tbox, false);
                                    map[orow][ocol] = 0;
                                    move = true;
                                    end = tcol + 1;
                                }
                                break;
                            }
                            else {
                                merge(obox, tbox, true);
                                map[orow][ocol] = 0;
                                map[orow][tcol] = 1;
                                move = true;
                                // sleep
                                var i = 0;
                                while (i < 1000) {
                                    ++i;
                                }
                            }
                        }
                    }
                }
            }
            break;
        case 83:
            for (var ocol = 0; ocol < 4; ++ocol) {
                var end = 3;
                for (var row = 2; row >= 0; --row) {
                    if (map[row][ocol]) {
                        for (var trow = row + 1; trow <= end; ++trow) {
                            var orow = trow - 1;
                            var obox = document.getElementById("box-"+orow+"-"+ocol);
                            var onum = Number(obox.innerText);
                            var tbox = document.getElementById("box-"+trow+"-"+ocol);
                            if (map[trow][ocol]) {
                                var tnum = Number(tbox.innerText);
                                if (tnum == onum) {
                                    merge(obox, tbox, false);
                                    map[orow][ocol] = 0;
                                    move = true;
                                    end = trow - 1;
                                }
                                break;
                            }
                            else {
                                merge(obox, tbox, true);
                                map[orow][ocol] = 0;
                                map[trow][ocol] = 1;
                                move = true;
                                // sleep
                                var i = 0;
                                while (i < 1000) {
                                    ++i;
                                }
                            }
                        }
                    }
                }
            }
            break;
        case 68:
            for (var orow = 0; orow < 4; ++orow) {
                var end = 3;
                for (var col = 2; col >= 0; --col) {
                    if (map[orow][col]) {
                        for (var tcol = col + 1; tcol <= end; ++tcol) {
                            var ocol = tcol - 1;
                            var obox = document.getElementById("box-"+orow+"-"+ocol);
                            var onum = Number(obox.innerText);
                            var tbox = document.getElementById("box-"+orow+"-"+tcol);
                            if (map[orow][tcol]) {
                                var tnum = Number(tbox.innerText);
                                if (tnum == onum) {
                                    merge(obox, tbox, false);
                                    map[orow][ocol] = 0;
                                    move = true;
                                    end = tcol - 1;
                                }
                                break;
                            }
                            else {
                                merge(obox, tbox, true);
                                map[orow][ocol] = 0;
                                map[orow][tcol] = 1;
                                move = true;
                                // sleep
                                var i = 0;
                                while (i < 1000) {
                                    ++i;
                                }
                            }
                        }
                    }
                }
            }
            break;
        default:
            return;
    }
    if (move) {
        randomCreateCeil();
    }
}

function merge(obox, tbox, isblank) {
    var tid = "#" + tbox.getAttribute("id");
    if (!isblank) {
        $(tid).fadeOut(0);
    }
    if (isblank) {
        tbox.setAttribute("class", obox.getAttribute("class"));
        tbox.innerText = obox.innerText;
    }
    else {
        var num = Number(tbox.innerText);
        num += num;
        tbox.innerText = num.toString();
        if (num == 4) {
            tbox.setAttribute("class", "num4");
        }
        else if (num == 8) {
            tbox.setAttribute("class", "num8");
        }
        else if (num == 16) {
            tbox.setAttribute("class", "num16");
        }
        else if (num == 32) {
            tbox.setAttribute("class", "num32");
        }
        else if (num == 64) {
            tbox.setAttribute("class", "num64");
        }
        else if (num <= 512) {
            tbox.setAttribute("class", "threedigits");
        }
        else if (num <= 8192) {
            tbox.setAttribute("class", "fourdigits");
        }
        else {
            tbox.setAttribute("class", "fivedigits");
        }
        score += num;
        var scorebox = document.getElementById("score");
        scorebox.innerText = score.toString();
    }
    obox.innerText = "";
    obox.setAttribute("class", "blank");
    if (!isblank) {
        $(tid).fadeIn();
    }
}

document.onkeydown = function(event) {
    if (event) {
        move(event.keyCode);
    }
}

newgame();