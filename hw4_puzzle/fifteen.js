'use strict';

//初始化
window.onload = function () {
    document.body.onselectstart = function () {
        return false;
    };

    var puzzleArea = document.getElementById('puzzlearea');
    puzzleArea.classList.add('puzzleArea');

    var tempArray = new Array();
    for (var i = 1; i <= 15; i++) {
        tempArray.push(buildTile(i));
    }

    //15个tiles的事件
    tempArray.forEach((current) => {
        current.onmouseover = mouseOver;
        current.onmouseout = mouseOut;
        current.onclick = move;
        puzzleArea.appendChild(current);
    });

    //空格
    var emptyTile = this.document.createElement('div');
    emptyTile.id = "emptyTile";
    emptyTile.classList.add('emptyTile');
    puzzleArea.appendChild(emptyTile);

    document.getElementById('shufflebutton').onclick = shuffle;

};

//新建一个tile
function buildTile(num) {
    var thisDiv = document.createElement('div');
    thisDiv.innerHTML = num;
    thisDiv.classList.add('tiles');

    var xmove = (num - 1) % 4 * (-100);
    var ymove = parseInt((num - 1) / 4) * (-100);

    thisDiv.style.backgroundPosition = xmove + "px " + ymove + "px";
    return thisDiv;
}

//鼠标移入的话
//如果可以移动
//变回原来的样式
function mouseOver() {
    if (canMove(this)) {
        this.classList.add('tilesHover');
    }
}

//鼠标移出的话去掉样式
function mouseOut() {
    this.classList.remove('tilesHover');
}

//判断是否可以移动该方块
//用元素的欧式距离判断
function canMove(element) {
    let empty = document.getElementById('emptyTile');

    let thisLeft = element.offsetLeft;
    let thisTop = element.offsetTop;
    let empLeft = empty.offsetLeft;
    let empTop = empty.offsetTop;

    let dist = (thisLeft - empLeft) * (thisLeft - empLeft) + (thisTop - empTop) * (thisTop - empTop);
    if (dist <= 12100) {
        return true;
    }

    return false;
}

//交换函数
function move() {
    let empty = document.getElementById('emptyTile');

    if (canMove(this)) {
        swapNodes(this, empty);
    }

    checkIsWin();
}

//交换两个父节点相同的节点的位置
function swapNodes(n1, n2) {
    var p1 = n1.parentNode;
    var p2 = n2.parentNode;
    var i1, i2;

    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;

    for (var i = 0; i < p1.children.length; i++) {
        if (p1.children[i].isEqualNode(n1)) {
            i1 = i;
        }
    }
    for (var i = 0; i < p2.children.length; i++) {
        if (p2.children[i].isEqualNode(n2)) {
            i2 = i;
        }
    }

    if (p1.isEqualNode(p2) && i1 < i2) {
        i2++;
    }
    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
}

//根据文档的伪代码改造而来
function shuffle() {
    let empty = document.getElementById('emptyTile');
    let parent = empty.parentNode;
    let times = 1000;

    while (times--) {
        let neightbours = [];
        for (let j = 0; j < parent.children.length; j++) {
            if (!parent.children[j].isEqualNode(empty) && canMove(parent.children[j])) {
                neightbours.push(j);
            }
        }
        let rand = rnd(1, neightbours.length);
        swapNodes(parent.children[neightbours[rand-1]], empty);
    }
}

//获得n和m之间的随机数
function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}

//判断是否胜利
function checkIsWin() {
    let empty = document.getElementById('emptyTile');
    let parent = document.getElementById('puzzlearea');

    let isWin = true;
    for (let i = 0; i < parent.children.length; i++) {
        let temp = parent.children[i];
        if(temp.isEqualNode(empty)){
            if(i == 15){
                continue;
            }
        }
        else if (temp.innerHTML != i + 1) {
            isWin = false;
        }
    }

    if(isWin){
        alert('You Win!!!');
    }
}

