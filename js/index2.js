window.onload = function () {

    var oBox = document.getElementById('con');
    var aDiv = oBox.getElementsByTagName('div');
    var aImg = oBox.getElementsByTagName('img');

    // 总分数
    var oScroe = document.getElementById('scroe');
    var oP = oScroe.getElementsByTagName('P')[0];
    var addScroe = 0;

    var moveNum = 0;
    var showNum = 0;
    var is2048 = false;
    var is8192 = false;
    var isWin = true;

    var arrDivAll = [];
    var arrValueAll = [];


    beginGame();
    function beginGame() {
        setAttr();
        init();
        init();
        init();
    }



    // 为div添加自定义属性
    function setAttr() {
        for (var i = 0; i < aDiv.length; i++) {
            aDiv[i].x = i % 4;
            aDiv[i].y = Math.floor(i / 4);
            aDiv[i].t = 0;
            console.log(aDiv[i].x + ',' + aDiv[i].y + ',' + aDiv[i].t);
        }

    }

    //初始化
    function init() {
        var arr = [];
        // 获得随机数
        var num = Math.random() > 0.8 ? 4 : 2;
        // console.log(num);
        //获取为0 的div
        for (var i = 0; i < aDiv.length; i++) {
            if (aDiv[i].t == 0) {
                arr.push(aDiv[i]);
            }
        }
        // 随机获取位置
        var posNum = Math.floor(Math.random() * arr.length);
        console.log(posNum);

        var creatImg = document.createElement('img');
        creatImg.src = 'img/cube_' + num + '.png';
        arr[posNum].appendChild(creatImg);
        arr[posNum].t = num;

    }

    // 监听按键按下
    document.onkeydown = function (ev) {
        var ev = ev || event;
        arrDivAll = [];
        arrValueAll = [];
        moveNum = 0;
        showNum = 0;

        switch (ev.keyCode) {
            case 37:
                // ←
                console.log('←');
                for (var i = 0; i < 4; i++) {
                    run(37, [aDiv[i * 4], aDiv[i * 4 + 1], aDiv[i * 4 + 2], aDiv[i * 4 + 3]]);
                }
                break;
            case 38:
                // ↑
                console.log('↑');
                for (var i = 0; i < 4; i++) {
                    run(38, [aDiv[i], aDiv[i + 1 * 4], aDiv[i + 2 * 4], aDiv[i + 3 * 4]]);
                }

                break;
            case 39:
                // →
                console.log('→');
                for (var i = 0; i < 4; i++) {
                    run(39, [aDiv[i * 4], aDiv[i * 4 + 1], aDiv[i * 4 + 2], aDiv[i * 4 + 3]]);
                }
                break;
            case 40:
                // ↓
                console.log('↓');
                for (var i = 0; i < 4; i++) {
                    run(40, [aDiv[i], aDiv[i + 1 * 4], aDiv[i + 2 * 4], aDiv[i + 3 * 4]]);
                }
                break;
        }
    }

    function run(k, arr) {

        //获取一行数据 37,arr[div00 div01 div02 dic03]
        // 存入有值的div
        console.log(arr);
        var arrDiv = [];
        // 存入div中的值
        var arrValue = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].children[0]) {
                arrDiv.push(arr[i]);
                arrValue.push(arr[i].t)
            }
        }
        // arrDiv = [div00 div01 div02 dic03]
        // arrValue = [2,2,2,2]
        if (k == 37 || k == 38) {
            for (var i = 0; i < arrValue.length; i++) {
                if (arrValue[i + 1] && arrValue[i] == arrValue[i + 1]) {
                    addScroe += arrValue[i]; //2 4
                    arrValue[i] = arrValue[i] * 2;  //4 4
                    arrValue.splice(i + 1, 1);
                    arrDiv[i] = arrDiv[i + 1]; //div01 div03
                    arrDiv.splice(i + 1, 1);
                    if(arrValue[i] == 2048) {
                        alert('恭喜达到2048');
                    }
                    if(arrValue[i]== 8192 ) {
                        alert('恭喜达到8192');
                    }
                }

            }
        } else {
            // arrDiv = [div00 div01 div02 dic03]
            // arrValue = [2,2,2,2]
            for (var i = arrValue.length - 1; i >= 0; i--) {
                if (arrValue[i - 1] && arrValue[i] == arrValue[i - 1]) {
                    addScroe += arrValue[i]; //2 4
                    arrValue[i] = arrValue[i] * 2;  //4 4
                    arrValue.splice(i - 1, 1);
                    arrDiv[i] = arrDiv[i - 1]; //div01 div03
                    arrDiv.splice(i - 1, 1);
                    i--;
                    if(arrValue[i] == 2048) {
                        alert('恭喜达到2048');
                    }
                    if(arrValue[i]== 8192 ) {
                        alert('恭喜达到8192');
                    }
                }

            }
        }

        // 创建二位数组
        arrDivAll.push(arrDiv);
        arrValueAll.push(arrValue);
        if (arrDivAll.length == 4) {
            startMove(k, arrDivAll, arrValueAll)
        }

    }
    function startMove(k, arrDivAll, arrValueAll) {
        var dir = null;
        var speed = null;
        var timer = null;


        // arrDiv = [div01  dic03]
        // arrValue = [4,4]
        if (k == 39 || k == 40) {
            for (var i = 0; i < arrDivAll.length; i++) {
                for (var j = 0; j < arrDivAll[i].length; j++) {
                    if (arrDivAll[i].length != 4) {
                        arrDivAll[i].unshift(null);
                        arrValueAll[i].unshift(0);
                    }else {
                        break;
                    }
                }

            }
        }
        for (var i = 0; i < arrDivAll.length; i++) {
            for (var j = 0; j < arrDivAll[i].length; j++) {
                if (k == 37) {
                    if (j != arrDivAll[i][j].x || arrValueAll[i][j] != arrDivAll[i][j].t) {
                        moveNum++;
                    }
                }
                if (k == 38) {
                    if (j != arrDivAll[i][j].y || arrValueAll[i][j] != arrDivAll[i][j].t) {
                        moveNum++;
                    }
                }
                if(k == 39) {
                    if(arrDivAll[i][j] && (j != arrDivAll[i][j].x || arrValueAll[i][j] != arrDivAll[i][j].t)) {
                        moveNum++;
                    }
                }if(k == 40) {
                    if(arrDivAll[i][j]&& (j != arrDivAll[i][j].y || arrValueAll[i][j] != arrDivAll[i][j].t)) {
                        moveNum++;
                    }
                }
            }
        }

        for (var i = 0; i < arrValueAll.length; i++) {
            for (var j = 0; j < arrValueAll[i].length; j++) {
                if (arrValueAll[i][j] != 0) showNum++;
                if(arrValueAll[i][j] == 2048) {
                    alert('恭喜达到2048');
                }
                if(arrValueAll[i][j] == 8192 ) {
                    alert('恭喜达到8192');
                }
            }
        }
        if (moveNum == 0) {
            return;
        }
        if(showNum==15 || showNum==16) {
            // 格子已满
            isWin = false;
        }else {
            isWin =true;
        }
        if (k == 37 ) {

            for (var i = 0; i < arrDivAll.length; i++) {
                for (var j = 0; j < arrDivAll[i].length; j++) {
                    if (j != arrDivAll[i][j].x || arrValueAll[i][j] != arrDivAll[i][j].t) {
                        dir = (j - arrDivAll[i][j].x) * 80;
                        speed = (arrDivAll[i][j].x - j) * 40;
                        doMove(arrDivAll[i][j].children[0], speed, 'left',dir, function () {
                            moveNum--;
                            if (moveNum == 0) {
                                reset2048(k, arrValueAll, showNum);
                            }
                        })
                    }
                }
            }
        } else if (k == 38 ) {
            for (var i = 0; i < arrDivAll.length; i++) {
                for (var j = 0; j < arrDivAll[i].length; j++) {
                    if (j != arrDivAll[i][j].y || arrValueAll[i][j] != arrDivAll[i][j].t) {
                        dir = (j - arrDivAll[i][j].y) * 109;
                        speed = (arrDivAll[i][j].y - j) * 50;
                        doMove(arrDivAll[i][j].children[0], speed, 'top', dir, function () {
                            moveNum--;
                            if (moveNum == 0) {
                                reset2048(k, arrValueAll, showNum);
                            }
                        })
                    }
                }
            }
        }else if( k == 39) {
            for (var i = 0; i < arrDivAll.length; i++) {
                for (var j = 0; j < arrDivAll[i].length; j++) {
                    if (arrDivAll[i][j] && (j != arrDivAll[i][j].x || arrValueAll[i][j] != arrDivAll[i][j].t)) {
                        dir = (j - arrDivAll[i][j].x) * 80;
                        speed = (arrDivAll[i][j].x - j) * 40;
                        doMove(arrDivAll[i][j].children[0], speed, 'left',dir, function () {
                            moveNum--;
                            if (moveNum == 0) {
                                reset2048(k, arrValueAll, showNum);
                            }
                        })
                    }
                }
            }
        }else if(k == 40) {
            for (var i = 0; i < arrDivAll.length; i++) {
                for (var j = 0; j < arrDivAll[i].length; j++) {
                    if (arrDivAll[i][j] && (j != arrDivAll[i][j].y || arrValueAll[i][j] != arrDivAll[i][j].t)) {
                        dir = (j - arrDivAll[i][j].y) * 109;
                        speed = (arrDivAll[i][j].y - j) * 50;
                        doMove(arrDivAll[i][j].children[0], speed, 'top', dir, function () {
                            moveNum--;
                            if (moveNum == 0) {
                                reset2048(k, arrValueAll, showNum);
                            }
                        })
                    }
                }
            }
        }
    }


    function reset2048(k, arrValueAll, showNum) {
        fnReset();
        // arrDiv = [div01  dic03]
        // arrValue = [4,4]
        for (var i = 0; i < arrValueAll.length; i++) {
            for (var j = 0; j < arrValueAll[i].length; j++) {
                if (arrValueAll[i][j]) {
                    var oImg = document.createElement('img');
                    oImg.src = 'img/cube_' + arrValueAll[i][j] + '.png';
                    if (k == 37 || k == 39) {
                        aDiv[i * 4 + j].appendChild(oImg);
                        aDiv[i * 4 + j].t = arrValueAll[i][j];
                    }
                    if (k == 38 || k == 40) {
                        aDiv[j * 4 + i].appendChild(oImg);
                        aDiv[j * 4 + i].t = arrValueAll[i][j];
                    }
                    showNum--;//0
                }
            }
        }
        oP.innerHTML = addScroe;
        if (showNum == 0) {
            init();
            console.log()
            if(!isWin) {
                win = 0;
                for(var i=0;i<aDiv.length;i++) {
                    if((i+1)%4==0&&aDiv[i+4]&&aDiv[i].t==aDiv[i+4].t){
                        return;
                    } else if((i+1)%4!=0&&aDiv[i].t==aDiv[i+1].t||aDiv[i+4]&&aDiv[i].t==aDiv[i+4].t){
                        return;
                    } else{
                        win++;
                    }
                }

                if(win==16) {
                    setTimeout(function(){
                        alert('游戏结束');
                        fnReset();
                        beginGame();
                    },500)
                    isWin = true;

                }
            }
        }


    }
    // 移动函数
    function doMove(obj, num, attr, target, endFn) {

        num = parseInt(getStyle(obj, attr)) < target ? num : -num;

        clearInterval(obj.timer);
        obj.timer = setInterval(function () {

            var speed = parseInt(getStyle(obj, attr)) + num;
            if (speed < target && num < 0 || speed > target && num > 0) {
                speed = target;//
            }
            obj.style[attr] = speed + 'px'; //-
            if (speed == target) {
                clearInterval(obj.timer);
                if (typeof endFn == 'function') {
                    endFn();
                }
            }
        }, 30);
    }


    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    }
    // 复位
    function fnReset() {
        for (var i = 0; i < aDiv.length; i++) {
            if (aDiv[i].children[0]) {
                aDiv[i].removeChild(aDiv[i].children[0]);
                aDiv[i].t = 0;
            }
        }
    }

}