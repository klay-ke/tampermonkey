// ==UserScript==
// @name         witness-lee-hymns
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Klay Ke
// @match        http://www.witness-lee-hymns.org/hymns/*.html
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let num = $("h1").text();
    $("h1").remove();
    $("body").append("<div id='hymn_number' style='position: fixed; left:0px; top:0px; z-index: 999; text-align: center;'><p style='padding: 10px; cursor: move; z-index: 9999; margin:0; font-size: 25px; background-color: #2196F3; color: #fff;'>"+num+"</p></div>");


    dragElement(document.getElementById("hymn_number"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
})();