var w = 10;
var h = 10;
rowHints = [];
columnHints = [];
rowHints.push([1, 1, 1]);
rowHints.push([1, 1, 1]);
rowHints.push([]);
rowHints.push([7]);
rowHints.push([2, 6]);
rowHints.push([2, 4, 1]);
rowHints.push([8]);
rowHints.push([7]);
rowHints.push([1, 5, 1]);
rowHints.push([8]);
columnHints.push([1]);
columnHints.push([5, 1]);
columnHints.push([2, 7]);
columnHints.push([1, 4]);
columnHints.push([2, 7]);
columnHints.push([7]);
columnHints.push([2, 7]);
columnHints.push([5, 1]);
columnHints.push([1, 1, 1]);
columnHints.push([2, 1]);
var rHL = Math.max.apply(Math, rowHints.map(function (el) {
    return el.length
}));
var cHL = Math.max.apply(Math, columnHints.map(function (el) {
    return el.length
}));
tableCreate(w, h);

function tableCreate(_w, _h) {
    var container = $("#container")
        , tbl = document.createElement('table');
    tbl.id = "tbl";
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';
    for (var i = 0; i < _h + cHL; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < _w + rHL; j++) {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            td.style.border = '1px solid gray';
            if (i < cHL && j < rHL) {
                td.className = 'hintcross';
            }
            else if (i < cHL || j < rHL) {
                td.className = 'hint';
                if (i < cHL) {
                    td.appendChild(document.createTextNode(columnHints[j - rHL][i - cHL + columnHints[j - cHL].length] || ""));
                }
                if (j < rHL) {
                    td.appendChild(document.createTextNode(rowHints[i - cHL][j - rHL + rowHints[i - cHL].length] || ""));
                }
            }
            else {
                td.className = 'off';
            }
        }
    }
    container.append(tbl);
}
$('#tbl').find('td').on("click", (function () {
    //console.log(this.parentNode.rowIndex + 1, this.cellIndex + 1);
    $(this).toggleClass("on off");
    checkWin();
}));

function checkWin() {
    var table = document.getElementById("tbl");
    //table.rows.length
    var rowCheck = true;
    var columnCheck = true;
    for (var i = rHL; i < table.rows.length; i++) {
        var hints = rowHints[i - rHL];
        index = 0;
        var consecutive = 0;
        var failed = false;
        for (var j = cHL; j < table.rows[0].cells.length; j++) {
            var hint = hints[index];
            var cell = table.rows[i].cells[j];
            if ($(cell).hasClass("on")) {
                consecutive++;
                if (j == table.rows[0].cells.length - 1) {
                    if (consecutive != 0) {
                        if (consecutive == hint) {
                            consecutive = 0;
                            index++;
                        }
                        else {
                            failed = true;
                            break;
                        }
                    }
                }
            }
            else {
                if (consecutive != 0) {
                    if (consecutive == hint) {
                        consecutive = 0;
                        index++;
                    }
                    else {
                        failed = true;
                        break;
                    }
                }
            }
        }
        if (failed || index != hints.length) {
            rowCheck = false;
        }
    }
    for (var j = cHL; j < table.rows[0].cells.length; j++) {
        var hints = columnHints[j - cHL];
        index = 0;
        var consecutive = 0;
        var failed = false;
        for (var i = rHL; i < table.rows.length; i++) {
            var hint = hints[index];
            var cell = table.rows[i].cells[j];
            if ($(cell).hasClass("on")) {
                consecutive++;
                if (i == table.rows.length - 1) {
                    if (consecutive != 0) {
                        if (consecutive == hint) {
                            consecutive = 0;
                            index++;
                        }
                        else {
                            failed = true;
                            break;
                        }
                    }
                }
            }
            else {
                if (consecutive != 0) {
                    if (consecutive == hint) {
                        consecutive = 0;
                        index++;
                    }
                    else {
                        failed = true;
                        break;
                    }
                }
            }
        }
        if (failed || index != hints.length) {
            columnCheck = false;
            console.log("fail", j-2);
        }
        else {
            console.log("success", j-2);
        }
    }
    if (rowCheck && columnCheck) {
        setTimeout(function () {
            alert("Congrats, you win.");
        }, 10)
    }
}