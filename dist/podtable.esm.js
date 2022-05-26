function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,n){void 0===n&&(n={});var r,i,o=Object.assign({},{keepCell:[],priority:[],method:null,rowGroup:!1},n),a=function(e){return"string"==typeof e||e instanceof String?document.querySelector(e):e}(e);!function(e){if(!(e instanceof HTMLTableElement)||null==e||null==e.tHead)throw new Error("Invalid HTMLTableElement");if(e.tHead.rows.length<=0||e.tHead.rows[0].cells.length<0)throw new Error("Invalid tHead HTMLTableRowElement");h(e),u()}(a);var l=i.clientWidth,s=[],c=[],d={current:-1};function h(e){r=e.tHead.rows[0]}function u(){(i=document.createElement("div")).setAttribute("id","podtable-container"),a.parentNode.insertBefore(i,a),i.appendChild(a)}function v(e){var t=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("div");n.colSpan=c.length,r.classList.add("child-grid-row"),t.classList.add("child");for(var i=0;i<e.length;i++)r.append(e[i]);return n.append(r),t.append(n),t}function f(e){var t=document.createElement("div");t.classList.add("child-grid-col");var n=document.createElement("div"),r=document.createElement("div");return n.innerHTML=a.tHead.rows[0].cells[e.cellIndex].innerHTML,r.innerHTML=e.innerHTML,t.append(n),t.append(r),t}function m(e){if(!(s.length<=0)){var t=e.currentTarget.parentElement;if(t.classList.contains("has-child"))t.classList.remove("has-child"),t.nextElementSibling.remove();else{t.classList.add("has-child");for(var n=[],r=0;r<t.cells.length;r++)t.cells[r].classList.contains("hidden")&&n.push(f(t.cells[r]));t.parentNode.insertBefore(v(n),t.nextSibling)}}}function p(e){if(!(s.length<=0)){var t=document.querySelectorAll(".toggle"),n=e.currentTarget;if(n.classList.contains("expanded")){for(var r=0;r<t.length;r++)t[r].parentElement.classList.contains("has-child")&&t[r].click();n.classList.remove("expanded")}else{for(var i=0;i<t.length;i++)t[i].parentElement.classList.contains("has-child")||t[i].click();n.classList.add("expanded")}}}function g(){s.length>0?a.classList.add("show-toggle"):(document.querySelectorAll(".has-child").forEach(function(e){e.classList.remove("has-child")}),a.classList.remove("show-toggle"),a.tHead.rows[0].cells[a.tHead.rows[0].cells.length-1].classList.remove("expanded"))}function L(){var e=document.querySelectorAll("tr.child");if(e.length>0){for(var n,r=[],i=t(e);!(n=i()).done;)r.push(n.value.previousElementSibling);for(var o=0;o<r.length;o++){for(var a,l=[],c=t(r[o].cells);!(a=c()).done;){var d=a.value;d.classList.contains("hidden")&&l.push(f(d))}r[o].nextElementSibling.remove(),s.length>0&&r[o].after(v(l)),g()}}}function y(e,n){void 0===n&&(n=a),s.push(e);for(var r,i=t(n.rows);!(r=i()).done;){var o=r.value;o.classList.contains("child")||o.hasAttribute("data-ptr-ignore")||o.cells[e].classList.add("hidden")}A(e)}function w(){for(var e=0;e<s.length;e++)for(var n,r=t(a.rows);!(n=r()).done;){var i=n.value;i.classList.contains("child")||i.hasAttribute("data-ptr-ignore")||i.cells[s[e]].classList.remove("hidden")}s=[]}function b(){w();for(var e=0;e<c.length;e++)r.clientWidth>i.clientWidth&&(s.includes(c[e])||o.keepCell.includes(c[e])||(y(c[e]),L()));g()}function E(){b(),s.length<=0&&(A(-1),L())}function S(){s=[];for(var e=c.length,t=0;t<e;t++)r.clientWidth>i.clientWidth&&(s.includes(c[t])||o.keepCell.includes(c[t])||y(c[t]));g()}function A(e){d.current=e,o.method&&C()}function C(){if(o.method)try{o.method(d)}catch(e){console.error(e)}}if(function(){for(var e=[],t=0;t<r.cells.length;t++)e.push(t);if(c=Array.isArray(o.priority)&&o.priority.length>0?Array.from(new Set(o.priority.concat(e.reverse()))):e.reverse(),!Array.isArray(o.keepCell))throw TypeError("keepCell is not an array");o.keepCell.push(0,e.length-1)}(),function(e){for(var n,r=t(e.rows);!(n=r()).done;){var i=n.value;"TBODY"==i.parentElement.tagName.toUpperCase()?i.hasAttribute("data-ptr-ignore")||i.lastElementChild.classList.add("toggle"):i.lastElementChild.classList.add("main-toggle")}}(a),function(){if(S(),function(){for(var e=document.querySelectorAll(".toggle"),t=0;t<e.length;t++)e[t].addEventListener("click",m);document.querySelector(".main-toggle").addEventListener("click",p)}(),!function(){try{var e=new ResizeObserver(function(e){e[0].target.clientWidth!==l&&(b(),s.length<=0&&(A(-1),L())),l=e[0].target.clientWidth});e.observe(i),this.nativeResize=e}catch(e){return!1}}())try{this.watchResize=function(e,t){var n={},r=document.createElement("object");function i(){this.contentDocument.defaultView.addEventListener("resize",t)}return n.start=function(){r.classList.add("pt-object"),r.type="text/html",r.data="about:blank",r.onload=i,e.appendChild(r)},n.stop=function(){r.contentDocument.defaultView.removeEventListener("resize",t),e.removeChild(r)},n}(i,E),this.watchResize.start()}catch(e){window.addEventListener("resize",E)}}(),function(e){function n(e){e.hasAttribute("data-ptr-ignore")||(e.lastElementChild.classList.add("toggle"),e.lastElementChild.addEventListener("click",function(e){return m(e)}))}var r=o.rowGroup?e:e.tBodies[0];this.observer=new MutationObserver(function(r){for(var i,o=t(r);!(i=o()).done;){var a=i.value;if("childList"==a.type&&1==a.addedNodes.length){if("TBODY"==a.addedNodes[0].tagName.toUpperCase())for(var l,s=t(a.addedNodes[0].children);!(l=s()).done;)n(l.value),C();"TR"!=a.addedNodes[0].tagName.toUpperCase()||a.addedNodes[0].classList.contains("child")||(n(a.addedNodes[0]),C())}else"childList"==a.type&&1==a.removedNodes.length&&"TR"==a.removedNodes[0].tagName.toUpperCase()&&!a.removedNodes[0].classList.contains("child")&&a.removedNodes[0].classList.contains("has-child")&&a.nextSibling.remove()}h(e),w(),S()}),this.observer.observe(r,{childList:!0})}(a),this.watchResize=!1,this.nativeResize=!1,this.windowResize=!1,this.observer=!1,d.destroy=function(){return function(){window.removeEventListener("resize",E),w(),function(e,n,r){r.observer.disconnect(),void 0!==typeof r.nativeResize&&!1!==r.nativeResize||r.nativeResize.disconnect(),void 0!==typeof r.watchResize&&!1!==r.watchResize||r.watchResize.stop();for(var i,o=t(e.querySelectorAll("tr.has-child"));!(i=o()).done;){var a=i.value;a.classList.remove("has-child"),a.nextElementSibling.classList.contains("child")&&a.nextElementSibling.remove()}e.classList.remove("show-toggle"),n.replaceWith.apply(n,n.childNodes)}(a,i,this),function(){for(var e=document.querySelectorAll(".toggle"),t=0;t<e.length;t++)e[t].removeEventListener("click",m);document.querySelector(".main-toggle").removeEventListener("click",p)}()}()},o.method)return d}export{n as default};
//# sourceMappingURL=podtable.esm.js.map
