!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).Podtable=t()}(this,function(){function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return function(e,n){void 0===n&&(n={});var r,o,l=function(e){return"string"==typeof e||e instanceof String?document.querySelector(e):e}(e);!function(e){var t=!0;if(null===e)throw new Error("Unable to access target HTMLTableElement");if(!(e instanceof HTMLTableElement))throw new Error("Element is not an HTMLTableElement");if(null===e.tHead)throw new Error("Table should have only one THEAD");if(e.tHead.rows.length<=0)throw new Error("tHead doesnt contain HTMLTableRowElement");if(e.tHead.rows[0].cells.length<2)throw new Error("tHead HTMLTableRowElement should have atleast 2 cells");if(e.tBodies.length<=0||e.tBodies.length>1)throw new Error("Table should have only one TBODY");e.tBodies[0].rows.length<=0&&(t=-1),u(t),h()}(l);var i=o.clientWidth,a=[],s=[],c=[0],d=this;function u(e){-1==e?r=l.tHead.rows[0]:1==e&&(r=l.tBodies[0].rows[0])}function h(){(o=document.createElement("div")).setAttribute("id","podtable-container"),l.parentNode.insertBefore(o,l),o.appendChild(l)}function f(e){var t=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("div");n.colSpan=s.length,r.classList.add("child-grid-row"),t.classList.add("child");for(var o=0;o<e.length;o++)r.append(e[o]);return n.append(r),t.append(n),t}function v(e){var t=document.createElement("div");t.classList.add("child-grid-col");var n=document.createElement("div"),r=document.createElement("div");return n.innerHTML=l.tHead.rows[0].cells[e.cellIndex].innerHTML,r.innerHTML=e.innerHTML,t.append(n),t.append(r),t}function m(e){if(!(a.length<=0)){var t=e.currentTarget.parentElement;if(t.classList.contains("has-child"))t.classList.remove("has-child"),t.nextElementSibling.remove();else{t.classList.add("has-child");for(var n=[],r=0;r<t.cells.length;r++)t.cells[r].classList.contains("hidden")&&n.push(v(t.cells[r]));t.parentNode.insertBefore(f(n),t.nextSibling)}}}function g(){a.length>0?l.classList.add("show-toggle"):(document.querySelectorAll(".has-child").forEach(function(e){e.classList.remove("has-child")}),l.classList.remove("show-toggle"),l.tHead.rows[0].cells[l.tHead.rows[0].cells.length-1].classList.remove("expanded"))}function p(){var e=document.querySelectorAll(".child");if(e.length>0){for(var n=[],r=0;r<e.length;r++)n.push(e[r].previousElementSibling);for(var o=0;o<n.length;o++){for(var l,i=[],s=t(n[o].cells);!(l=s()).done;){var c=l.value;c.classList.contains("hidden")&&i.push(v(c))}n[o].nextElementSibling.remove(),a.length>0&&n[o].after(f(i)),g()}}}function y(e,n){void 0===n&&(n=l),a.push(e);for(var r,o=t(n.rows);!(r=o()).done;){var i=r.value;i.classList.contains("child")||i.cells[e].classList.add("hidden")}T(e)}function L(){for(var e=0;e<a.length;e++)for(var n,r=t(l.rows);!(n=r()).done;){var o=n.value;o.classList.contains("child")||o.cells[a[e]].classList.remove("hidden")}a=[]}function w(){L();for(var e=0;e<s.length;e++)r.clientWidth>o.clientWidth&&(a.includes(s[e])||c.includes(s[e])||(y(s[e]),p()));g()}function b(){w(),a.length<=0&&(T(-1),p())}function E(){a=[];for(var e=s.length,t=0;t<e;t++)r.clientWidth>o.clientWidth&&(a.includes(s[t])||c.includes(s[t])||y(s[t]));g()}function T(e){d.current=e,n.event&&H()}function H(){if(n.event)try{n.method(d)}catch(e){console.error(e)}}if(function(e){for(var t=[],n=0;n<r.cells.length;n++)t.push(n);if(s=Object.prototype.hasOwnProperty.call(e,"priority")&&Array.isArray(e.priority)&&e.priority.length>0?Array.from(new Set(e.priority.concat(t.reverse()))):t.reverse(),c.push(t.length-1),Object.prototype.hasOwnProperty.call(e,"keepCell")){if(!Array.isArray(e.keepCell))throw TypeError("keep cell must be of type array");c=[].concat(c,e.keepCell)}}(n),function(e){e.tHead.rows[0].lastElementChild.classList.add("main-toggle");for(var n,r=t(e.tBodies[0].rows);!(n=r()).done;)n.value.lastElementChild.classList.add("toggle")}(l),function(){if(E(),function(){for(var e=document.querySelectorAll(".toggle"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){m(e)});document.querySelector(".main-toggle").addEventListener("click",function(e){!function(e){if(!(a.length<=0)){var t=document.querySelectorAll(".toggle"),n=e.currentTarget;if(n.classList.contains("expanded")){for(var r=0;r<t.length;r++)t[r].parentElement.classList.contains("has-child")&&t[r].click();n.classList.remove("expanded")}else{for(var o=0;o<t.length;o++)t[o].parentElement.classList.contains("has-child")||t[o].click();n.classList.add("expanded")}}}(e)})}(),!function(){var e=!1;try{new ResizeObserver(function(e){e[0].target.clientWidth!==i&&(w(),a.length<=0&&(T(-1),p())),i=e[0].target.clientWidth}).observe(o),e=!0}catch(t){e=!1}return e}())try{(function(e,t){var n={},r=document.createElement("object");function o(){this.contentDocument.defaultView.addEventListener("resize",t)}return n.start=function(){r.classList.add("pt-object"),r.type="text/html",r.data="about:blank",r.onload=o,e.appendChild(r)},n.stop=function(){r.contentDocument.defaultView.removeEventListener("resize",t),e.removeChild(r)},n})(o,b).start()}catch(e){window.addEventListener("resize",function(){return b()})}}(),function(e){var n=e.tBodies[0];new MutationObserver(function(n){for(var o,l=t(n);!(o=l()).done;){var i=o.value;"childList"===i.type&&1===i.addedNodes.length?"TR"!=i.addedNodes[0].tagName||i.addedNodes[0].classList.contains("child")||((a=i.addedNodes[0]).lastElementChild.classList.add("toggle"),a.lastElementChild.addEventListener("click",function(e){return m(e)}),H()):"childList"===i.type&&1===i.removedNodes.length&&"TR"==i.removedNodes[0].tagName&&!i.removedNodes[0].classList.contains("child")&&i.removedNodes[0].classList.contains("has-child")&&i.nextSibling.remove()}var a;r=e.tBodies[0].rows.length<=0?e.tHead.rows[0]:e.tBodies[0].rows[0],L(),E()}).observe(n,{childList:!0})}(l),n.event)return d}});
//# sourceMappingURL=podtable.js.map
