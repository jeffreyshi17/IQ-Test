var w = 5;
var h = 5;
rowHints = [];
columnHints = [];
rowHints.push([3]);
rowHints.push([2, 2]);
rowHints.push([1, 1]);
rowHints.push([2, 2]);
rowHints.push([3]);
columnHints.push([3]);
columnHints.push([2, 2]);
columnHints.push([1, 1]);
columnHints.push([2, 2]);
columnHints.push([3]);
tableCreate(w, h, rowHints, columnHints);

function tableCreate(_w, _h, rH, cH) {
    rHL = Math.max.apply(Math, rH.map(function (el) {
        return el.length
    }));
    cHL = Math.max.apply(Math, cH.map(function (el) {
        return el.length
    }));
    
    
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
            td.style.border = '1px solid black';
            if (i < cHL && j < rHL) {
                td.className = 'hintcross';
            }
            else if (i < cHL || j < rHL) {
                td.className = 'hint';
                if (i < cHL) {
                    console.log(i,j);
                    td.appendChild(document.createTextNode(columnHints[j-rHL][rHL-1-i]||""));
                }
                if (j < rHL) {
                    td.appendChild(document.createTextNode(columnHints[i-cHL][cHL-1-j]||""));
                    //td.appendChild(document.createTextNode(rowHints[i-cHL]));
                }
            }
            else {
                td.className = 'off';
            }
        }
    }
    container.append(tbl);
}
$('#tbl').find('td').click(function () {
    console.log(this.parentNode.rowIndex + 1, this.cellIndex + 1);
    $(this).toggleClass("on off");
    checkWin();
});

function checkWin() {}