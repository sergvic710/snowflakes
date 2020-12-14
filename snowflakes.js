var snowsrc = "http://blogger4you.narod.ru/Kartinki/snow3.gif"

var sn_fl = 15; /* number of snowflakes */
var hidesnowtime = 20; /* time for one period of snowfall */
var sflakes = [] /* array snowflakes-objects*/
var i, doc_width = window.innerWidth,
    /* width of client's brouser window. */
    doc_height = window.innerHeight; /* heigh for client's brouser window. */

function initFall() {
    for (i = 0; i < sn_fl; ++i) {
        var snFlake = { /* set object "snFlake" */
            dx: 0,
            /* начальная координата по иксу */
            xp: Math.random() * (doc_width - 50), // set position variables
            yp: Math.random() * doc_height,
            am: Math.random() * 20, // set amplitude variables
            stx: 0.02 + Math.random() / 10, // set step variables
            sty: 0.7 + Math.random(), // set step variables
            index: i + 1000,
            /* css z-index  */
        }
        sflakes.push(snFlake)

//    document.write("<div id=\"dot" + i + "\" style=\"POSITION: absolute; Z-INDEX: " + snFlake.index + "; VISIBILITY: visible; TOP: 15px; LEFT: 15px;\"><img src='" + snowsrc + "' border=\"0\"><\/div>");

        var divSnow = document.createElement('div');
        divSnow.id = 'dot' + i;
        divSnow.style.position = 'absolute';
        divSnow.style.zIndex = snFlake.index;
        divSnow.style.visibility = 'visible';
        divSnow.style.top = '15px'
        divSnow.style.left = '15px'
        var divImg = document.createElement('img');
        divImg.src = snowsrc;
        divSnow.appendChild(divImg);
        document.body.appendChild(divSnow);
    }
}

function snowFall() {
    doc_width = window.innerWidth - 10
    doc_height = window.innerHeight
    for (i = 0; i < sn_fl; ++i) { // iterate for every dot
        sflakes[i].yp += sflakes[i].sty /* перемещение по у */

        if (sflakes[i].yp > doc_height - 50) { /* при достижении нижнего положения снежинка пойдет вверх . Генерим новые координаты для снежинки*/
            sflakes[i].xp = Math.random() * (doc_width - sflakes[i].am - 30);
            sflakes[i].yp = 0;
            sflakes[i].stx = 0.02 + Math.random() / 10;
            sflakes[i].sty = 0.7 + Math.random();
        }
        sflakes[i].dx += sflakes[i].stx; /* перемещение по х */
        document.getElementById("dot" + i).style.top = sflakes[i].yp + "px";
        document.getElementById("dot" + i).style.left = sflakes[i].xp + sflakes[i].am * Math.sin(sflakes[i].dx) + "px";
    }
    snowtimer = setTimeout("snowFall()", 30);
}

function hidesnow() {
    if (window.snowtimer) clearTimeout(snowtimer)
    for (i = 0; i < sn_fl; i++) document.getElementById("dot" + i).style.visibility = "hidden"
}


document.addEventListener("DOMContentLoaded", function () {
    initFall();
    snowFall();
    if (hidesnowtime > 0)
        setTimeout("hidesnow()", hidesnowtime * 4000)
});
