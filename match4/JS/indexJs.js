"use strict"
var i, j;
var gridWidth = 7;
var gridHeight = 6;
var color = 0;

var row = [];
var dir = [[1,1,1,0,-1,-1,-1,0], [-1,0,1,1,1,0,-1,-1]];
var vec = [1,1,1,1];

var win;

row.push(new Array());// add dummy roof
for (j=0; j<gridWidth+2; j++){row[i].push(0);}

// add grid
for (i=0; i<6; i++){
    row.push(new Array());
    row[i].push(0); // add dummy side
    for (j=0; j<gridWidth; j++){row[i].push(0);}
    row[i].push(0); // add dummy side
}

row.push(new Array());// add dummy ground
for (j=0; j<gridWidth+2; j++){row[i].push(0);}

function insertCoin(_col){ // _col is used as index
    _col += 1; // compense for dummy side
    for (i=1; i<gridHeight; i++){ // maybe gridHeight + 1
        if (row[i][_col] != 0){
            if (i==1){return false;}
            row[i-1][_col] = color+1;
            color ^= 1;
            win = winCondition(_col, i);
            return true;
        }
    }
    row[gridHeight+1][_col] = color+1;
    color ^= 1;

    win = winCondition(_col, i);
    return true;
}

function winCondition(_col, _row){
    for (i=0; i<8; i++){
        if (row[_row][_col] == row[_row+dir[0][i]][_col+dir[1][i]]){
            if (i<4){vec[i] += 1 + checkMatch(i);}
            if (i >= 4){vec[i-4] += 1 + checkMatch(i-4, _row, _col);}
        }
    }
    for (i=0; i<4; i++){
        if (vec[i] >= 4){return true;}
    }
    return false;
}
function checkMatch(_dir, _row, _col){
    if (row[_row][_col] == row[_row+dir[0][_dir]][_col+dir[1][_dir]]){
        vec[_dir] += 1 + checkMatch(_dir);
    }
}

function display(){
    for (i=1; i<gridHeight+1; i++){
        for (j=1; j<gridWidth; j++){
            var list = document.getElementsByClassName("row"+i)[0];
            if(row[i][j]==1){document.getElementByClass("row"+i).getElementByClass("col"+j)}
        }
    }
}