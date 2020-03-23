!function(e){var t={};function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const n=()=>{let e=!0;return{sendAttack:(e,t)=>{e.receiveAttack(t)},getPlayerTurn:()=>e,setPlayerTurn:t=>e=t}},o=()=>{const e={playerTurn:!1,availableCoordinates:["A1","B1","C1","D1","E1","F1","G1","H1","A2","B2","C2","D2","E2","F2","G2","H2","A3","B3","C3","D3","E3","F3","G3","H3","A4","B4","C4","D4","E4","F4","G4","H4","A5","B5","C5","D5","E5","F5","G5","H5","A6","B6","C6","D6","E6","F6","G6","H6","A7","B7","C7","D7","E7","F7","G7","H7","A8","B8","C8","D8","E8","F8","G8","H8"],maxLength:63,getAvailableCoordinates:function(){return this.availableCoordinates},setAvailableCoordinates:function(e,t){this.availableCoordinates=e.filter(e=>e!==t)},randomCoordinate:function(){const e=this.availableCoordinates[Math.floor(Math.random()*(this.maxLength-0+1))+0];this.maxLength=this.maxLength-1;const t=this.getAvailableCoordinates().find(t=>t===e);return this.setAvailableCoordinates(this.getAvailableCoordinates(),t),e}};return Object.assign(n(),e)},s=()=>{const e=[],t=[];return{getMissedShots:()=>t,getBattleships:()=>e,receiveAttack:a=>{const n=e.find(e=>e.getShipCoordinates().includes(a));n?n.hit(n.getShipCoordinates().indexOf(a)):t.push(a)},placeShip:(...t)=>{const a=function(e){const t=e;return{getShipCoordinates:()=>t,isSunk:()=>t.every(e=>"hit"===e),hit:e=>{t[e]="hit"}}}(t);e.push(a)},allShipsSunk:()=>e.map(e=>e.isSunk()).every(e=>!0===e)}},r={GameOver:e=>{const t=document.querySelector(".main-screen"),a=document.querySelector(".game-over-screen"),n=document.querySelector(".winner");t.style.opacity=.4,a.style.display="flex",n.textContent=e}};function l(e){const t=document.querySelector(`.gameboard-${e}`);for(let e=1;e<=64;e++){const a=document.createElement("div");a.classList.add("cell"),e<=8?a.dataset.coordinate=`A${e}`:e>8&&e<=16?a.dataset.coordinate=`B${e-8}`:e>16&&e<=24?a.dataset.coordinate=`C${e-16}`:e>24&&e<=32?a.dataset.coordinate=`D${e-24}`:e>32&&e<=40?a.dataset.coordinate=`E${e-32}`:e>40&&e<=48?a.dataset.coordinate=`F${e-40}`:e>48&&e<=56?a.dataset.coordinate=`G${e-48}`:e>56&&e<=64&&(a.dataset.coordinate=`H${e-56}`),t.appendChild(a)}}function i(){document.querySelector(".start-screen").classList.add("hide")}function c(){document.querySelector(".main-screen").style.display="flex"}function d(){document.querySelector(".boards div#container-two.container").style.display="none"}function u(){const e=document.querySelector("button.start-game");e.addEventListener("click",e=>{e.preventDefault(),function(){const e=document.querySelector(".boards div#container-two.container"),t=document.querySelector("#form-container"),a=document.querySelectorAll(".sunk-ships");e.style.display="flex",t.style.display="none",a.forEach(e=>e.style.display="flex")}()}),e.style.backgroundColor="#087e8b",e.style.color="white",e.style.transform="scale(1.1)"}function p(){document.querySelector("#container-one").style.display="none",document.querySelector(".cover-blanket").classList.remove("active"),document.querySelector("#container-two").style.display="flex",document.querySelector("#player-two-name").textContent="Captain Hack Finch"}const m=new RegExp("[A-Ha-h]{1}[1-8]"),h=new Event("input",{bubbles:!0,cancelable:!0}),g=[];let y=0;function f(e,t="false",a="false",n="false",o){document.querySelectorAll(`.gameboard-${o} .cell`).forEach(o=>{o.dataset.coordinate===e.toUpperCase()&&(o.dataset.ship="ship-part"),o.dataset.coordinate===t.toUpperCase()&&(o.dataset.ship="ship-part"),o.dataset.coordinate===a.toUpperCase()&&(o.dataset.ship="ship-part"),o.dataset.coordinate===n.toUpperCase()&&(o.dataset.ship="ship-part")})}function v(e,t,a){const n=function(e,t){return t.right>e.right-30&&t.bottom>e.bottom-50}(t,a),{horizontalCrash:o,verticalCrash:s}=function(e){const t=g.some(t=>t.bottom===e.bottom),a=g.some(t=>t.top===e.top),n=g.some(t=>t.right===e.left),o=g.some(t=>t.left===e.right),s=g.some(t=>t.bottom>=e.top&&t.top<=e.bottom&&(n||o));return{horizontalCrash:g.some(n=>n.right>=e.left&&n.left<=e.right&&(t||a)),verticalCrash:s}}(t);!n||o||s?(!n||o||s)&&e.setCustomValidity("Invalid coordinate"):e.setCustomValidity("")}function C(e,t,a){const n=document.getElementById("smallest-ship"),o=document.getElementById("place-smallest"),s=document.getElementById("smallest-quantity");let r=0;n.addEventListener("input",t=>{t.preventDefault();const a=document.querySelectorAll(`.gameboard-${e} .cell`);m.test(n.value)?m.test(n.value)&&n.setCustomValidity(""):n.setCustomValidity("Invalid coordinate"),a.forEach(e=>{if(e.dataset.coordinate===n.value.toUpperCase()){const t=document.querySelector(".current")||0;t&&t.remove();const a=document.createElement("div");a.classList.add("ship-starting-point"),a.classList.add("smallest-ship"),a.classList.add("current"),e.appendChild(a),e.dataset.ship&&n.setCustomValidity("Invalid coordinate")}})}),n.addEventListener("keyup",e=>{13===e.keyCode&&(e.preventDefault(),o.click())}),o.addEventListener("click",o=>{if(o.preventDefault(),new RegExp("[A-Ha-h]{1}[1-8]").test(n.value)&&r<4&&n.checkValidity()){const o=document.querySelector(".current");t.placeShip(n.value.toUpperCase()),o.dataset.first=n.value,f(n.value,"false","false","false",e),n.value="",s.textContent=`${++r}/4`,o.classList.remove("current"),n.focus(),y++,g.push(o.getBoundingClientRect()),4===r&&(n.disabled=!0,s.style.color="green",document.getElementById("smallest-ship").blur(),10===y&&("one-player"===a?u():"two-players"===a&&(document.querySelector(".cover-blanket").classList.add("active"),document.querySelector(".main-screen").style.display="none",document.querySelector(".pass-device-btn").addEventListener("click",p))))}})}function b(e,t,a=!1,n=!1,o=!1){e.dataset.first=t,a&&(e.dataset.second=a),n&&(e.dataset.third=n),o&&(e.dataset.fourth=o)}function S(e,t,a){!function(e,t,a){const n=document.querySelector(`.gameboard-${e}`).getBoundingClientRect(),o=document.getElementById("biggest-ship"),s=document.getElementById("place-biggest"),r=document.getElementById("rotate-biggest"),l=document.getElementById("biggest-quantity");o.focus(),document.querySelector(".biggest-ship-container").classList.add("jello-horizontal"),document.getElementById("bigger-ship").disabled=!0,document.getElementById("smaller-ship").disabled=!0,document.getElementById("smallest-ship").disabled=!0,o.addEventListener("input",()=>{const t=document.querySelectorAll(`.gameboard-${e} .cell`);m.test(o.value)?m.test(o.value)&&o.setCustomValidity(""):o.setCustomValidity("Invalid coordinate"),t.forEach(t=>{if(t.dataset.coordinate===o.value.toUpperCase()){document.querySelectorAll(`.gameboard-${e} .biggest-ship`).forEach(e=>e.remove());const a=document.createElement("div");a.classList.add("ship-starting-point"),a.classList.add("biggest-ship"),t.appendChild(a),v(o,a.getBoundingClientRect(),n)}})}),o.addEventListener("keyup",e=>{13===e.keyCode&&(e.preventDefault(),o.click())}),s.addEventListener("click",a=>{if(a.preventDefault(),m.test(o.value)&&o.checkValidity()){const a=document.querySelector(`.gameboard-${e} .biggest-ship`),[n,s]=o.value.toUpperCase();if(a.classList.contains("rotated")){if(a.classList.contains("rotated")){const o=`${n}${s}`,r=`${String.fromCharCode(n.charCodeAt(n)+1)}${s}`,l=`${String.fromCharCode(n.charCodeAt(n)+2)}${s}`,i=`${String.fromCharCode(n.charCodeAt(n)+3)}${s}`;t.placeShip(o,r,l,i),b(a,o,r,l,i),f(o,r,l,i,e)}}else{const o=`${n}${s}`,r=`${n}${parseInt(s)+1}`,l=`${n}${parseInt(s)+2}`,i=`${n}${parseInt(s)+3}`;t.placeShip(o,r,l,i),b(a,o,r,l,i),f(o,r,l,i,e),console.log(t.getBattleships())}o.value="",o.disabled=!0,l.textContent="1/1",l.style.color="green",r.disabled=!0,y++,document.querySelectorAll(".ship-container")[0].style.display="none",document.querySelectorAll(".ship-container")[1].classList.add("scale-in-hor-center"),document.getElementById("bigger-ship").disabled=!1,document.getElementById("bigger-ship").focus(),g.push(a.getBoundingClientRect())}}),r.addEventListener("click",t=>{t.preventDefault();const a=document.querySelector(`.gameboard-${e} .biggest-ship`);a.classList.toggle("rotated"),o.focus(),v(o,a.getBoundingClientRect(),n)})}(e,t),function(e,t,a){const n=document.querySelector(`.gameboard-${e}`).getBoundingClientRect(),o=document.getElementById("bigger-ship"),s=document.getElementById("place-bigger"),r=document.getElementById("rotate-bigger"),l=document.getElementById("bigger-quantity");let i=0;o.addEventListener("input",t=>{t.preventDefault();const a=document.querySelectorAll(`.gameboard-${e} .cell`);m.test(o.value)?m.test(o.value)&&o.setCustomValidity(""):o.setCustomValidity("Invalid coordinate"),a.forEach(e=>{if(e.dataset.coordinate===o.value.toUpperCase()){const t=document.querySelector(".current")||0;t&&t.remove();const a=document.createElement("div");a.classList.add("ship-starting-point"),a.classList.add("bigger-ship"),a.classList.add("current"),e.appendChild(a),v(o,a.getBoundingClientRect(),n)}})}),o.addEventListener("keyup",e=>{13===e.keyCode&&(e.preventDefault(),s.click())}),s.addEventListener("click",a=>{if(a.preventDefault(),new RegExp("[A-Ha-h]{1}[1-8]").test(o.value)&&i<2&&o.checkValidity()){const[a,n]=o.value.toUpperCase(),s=document.querySelector(".bigger-ship.current");if(s.classList.contains("rotated")){if(s.classList.contains("rotated")){const o=`${a}${n}`,r=`${String.fromCharCode(a.charCodeAt(a)+1)}${n}`,l=`${String.fromCharCode(a.charCodeAt(a)+2)}${n}`;t.placeShip(o,r,l),b(s,o,r,l),f(o,r,l,"false",e)}}else{const o=`${a}${n}`,r=`${a}${parseInt(n)+1}`,l=`${a}${parseInt(n)+2}`;t.placeShip(o,r,l),b(s,o,r,l),f(o,r,l,"false",e)}o.value="",l.textContent=`${++i}/2`,s.classList.remove("current"),o.focus(),y++,g.push(s.getBoundingClientRect()),2===i&&(o.disabled=!0,l.style.color="green",document.querySelectorAll(".ship-container")[1].style.display="none",document.querySelectorAll(".ship-container")[2].classList.add("scale-in-hor-center"),document.getElementById("smaller-ship").disabled=!1,document.getElementById("smaller-ship").focus())}}),r.addEventListener("click",e=>{e.preventDefault();const t=document.querySelector(".bigger-ship.current");t.classList.toggle("rotated"),o.focus(),v(o,t.getBoundingClientRect(),n)})}(e,t),function(e,t,a){const n=document.querySelector(`.gameboard-${e}`).getBoundingClientRect(),o=document.getElementById("smaller-ship"),s=document.getElementById("place-smaller"),r=document.getElementById("rotate-smaller"),l=document.getElementById("smaller-quantity");let i=0;o.addEventListener("input",t=>{t.preventDefault();const a=document.querySelectorAll(`.gameboard-${e} .cell`);m.test(o.value)?m.test(o.value)&&o.setCustomValidity(""):o.setCustomValidity("Invalid coordinate"),a.forEach(e=>{if(e.dataset.coordinate===o.value.toUpperCase()){const t=document.querySelector(".current")||0;t&&t.remove();const a=document.createElement("div");a.classList.add("ship-starting-point"),a.classList.add("smaller-ship"),a.classList.add("current"),e.appendChild(a),v(o,a.getBoundingClientRect(),n)}})}),o.addEventListener("keyup",e=>{13===e.keyCode&&(e.preventDefault(),s.click())}),s.addEventListener("click",a=>{if(a.preventDefault(),new RegExp("[A-Ha-h]{1}[1-8]").test(o.value)&&i<3&&o.checkValidity()){const[a,n]=o.value.toUpperCase(),s=document.querySelector(".current");if(s.classList.contains("rotated")){if(s.classList.contains("rotated")){const o=`${a}${n}`,r=`${String.fromCharCode(a.charCodeAt(a)+1)}${n}`;t.placeShip(o,r),b(s,o,r),f(o,r,"false","false",e)}}else{const o=`${a}${n}`,r=`${a}${parseInt(n)+1}`;t.placeShip(o,r),b(s,o,r),f(o,r,"false","false",e)}o.value="",l.textContent=`${++i}/3`,s.classList.remove("current"),o.focus(),y++,g.push(s.getBoundingClientRect()),3===i&&(o.disabled=!0,l.style.color="green",document.querySelectorAll(".ship-container")[2].style.display="none",document.querySelectorAll(".ship-container")[3].classList.add("scale-in-hor-center"),document.getElementById("smallest-ship").disabled=!1,document.getElementById("smallest-ship").focus())}}),r.addEventListener("click",e=>{e.preventDefault();const t=document.querySelector(".smaller-ship.current");t.classList.toggle("rotated"),o.focus(),v(o,t.getBoundingClientRect(),n)})}(e,t),C(e,t,a)}function E(){i(),c(),l("one"),l("two");const e=n(),t=s(),a=o(),u=s();return u.placeShip("A3","A4","A5","A6"),u.placeShip("C2","D2","E2"),u.placeShip("H5","H6","H7"),u.placeShip("D7","D8"),u.placeShip("A1","B1"),u.placeShip("G1","G2"),u.placeShip("C5"),u.placeShip("F8"),u.placeShip("H3"),u.placeShip("F5"),function(e,t){const a=Array.from(document.querySelectorAll(`.gameboard-${t} .cell`)),n=e.getBattleships().map(e=>e.getShipCoordinates()),o=[];for(let e=0;e<n.length;e++)for(let t=0;t<n[e].length;t++)o.push(n[e][t]);const s=[];for(let e=0;e<a.length;e++)for(let t=0;t<o.length;t++)a[e].dataset.coordinate===o[t]&&s.push(a[e]);s.forEach(e=>{e.classList.add("ship"),e.dataset.ship="ship-part"})}(u,"two"),function(e,t,a,n){const o=document.querySelectorAll(".gameboard-two .cell");o.forEach(s=>{s.addEventListener("click",l=>{l.target.dataset.hit||l.target.classList.contains("disabled")||(e.sendAttack(t,l.target.dataset.coordinate),o.forEach(e=>e.classList.add("disabled")),!l.target.dataset.ship&&e.getPlayerTurn()?(l.target.classList.add("sea"),s.dataset.hit="true",e.setPlayerTurn(!1),a.playerTurn=!0,setTimeout(()=>{!function e(t,a,n,o=!1){const s=document.querySelectorAll(".gameboard-one .cell"),l=document.querySelectorAll(".gameboard-two .cell"),i=o||t.randomCoordinate();t.sendAttack(a,i),s.forEach(o=>{if(!o.classList.contains("disabled")){if(o.dataset.coordinate===i&&o.dataset.ship&&!o.dataset.hit)return o.classList.add("explosion"),o.dataset.hit="true",n.setPlayerTurn(!1),L(a,"player1"),void setTimeout(()=>{e(t,a,n,function(e,t){const a=document.querySelectorAll(".ship-starting-point"),n=document.querySelectorAll(".gameboard-one .cell");let[o,s]=e;a.forEach(e=>{!t.dataset.ship||e.dataset.first!==t.dataset.coordinate&&e.dataset.second!==t.dataset.coordinate&&e.dataset.third!==t.dataset.coordinate&&e.dataset.fourth!==t.dataset.coordinate||(e.classList.contains("rotated")&&o<"H"?o=String.fromCharCode(o.charCodeAt(o)+1):!e.classList.contains("rotated")&&s<8&&(s=parseInt(s)+1))});const r=`${o}${s}`,l=Array.from(n).find(e=>e.dataset.coordinate===r);let i;if(l.dataset.hit)return i=!1,console.log(i),i;if(!l.dataset.hit)return i=`${o}${s}`,console.log(i),i}(i,o))},500);o.dataset.ship||o.dataset.coordinate!==i||(o.classList.add("sea"),o.dataset.hit="true")}a.allShipsSunk()&&(r.GameOver("Computer"),l.forEach(e=>{e.classList.add("disabled")}))}),n.setPlayerTurn(!0)}(a,n,e),o.forEach(e=>e.classList.remove("disabled"))},1e3)):l.target.dataset.ship&&e.getPlayerTurn()&&!l.target.dataset.hit&&(l.target.classList.add("explosion"),s.dataset.hit="true",o.forEach(e=>e.classList.remove("disabled")),L(t,"player2")),t.allShipsSunk()&&(r.GameOver("Human"),o.forEach(e=>{e.classList.add("disabled")})))})})}(e,u,a,t),d(),function(){const e=document.querySelectorAll(".cell"),t=Array.from(document.querySelectorAll(".ship-container input"));e.forEach(e=>{e.addEventListener("click",e=>{const[a]=t.filter(e=>!1===e.disabled);a.value=e.target.dataset.coordinate,a.dispatchEvent(h),a.focus()})})}(),{Human:e,HumanGameboard:t,Computer:a,ComputerGameboard:u}}function L(e,t){const a=document.querySelector(`#${t}-sunk-ships .biggest-sunk`),n=document.querySelector(`#${t}-sunk-ships .bigger-sunk`),o=document.querySelector(`#${t}-sunk-ships .smaller-sunk`),s=document.querySelector(`#${t}-sunk-ships .smallest-sunk`),r=document.querySelectorAll(`#${t}-sunk-ships figure`),l=e.getBattleships().filter(e=>{if(e.isSunk())return e});let i=0,c=0,d=0,u=0;l.map(e=>e.getShipCoordinates()).forEach(e=>{1===e.length?(u++,s.textContent=`${u}/4`,4===u&&r[3].classList.add("all-sunk")):2===e.length?(d++,o.textContent=`${d}/3`,3===d&&r[2].classList.add("all-sunk")):3===e.length?(c++,n.textContent=`${c}/2`,2===c&&r[1].classList.add("all-sunk")):4===e.length&&(i++,a.textContent=`${i}/1`,1===i&&r[0].classList.add("all-sunk"))})}function $(){return i(),c(),l("one"),l("two"),d(),document.querySelector("#player-one-name").textContent="Captain Jack Aubrey",document.querySelector("#player-two-name").textContent="Captain Hack Finch",{JackAubrey:n(),HackFinch:n(),AubreyGameboard:s(),FinchGameboard:s()}}document.querySelector(".one-player").addEventListener("click",e=>{e.preventDefault();const t=E(),{HumanGameboard:a}=t;S("one",a,"one-player")}),document.querySelector(".two-players").addEventListener("click",e=>{e.preventDefault(),function(){if(/Mobi|Android/i.test(navigator.userAgent)){document.querySelector("#form-title").textContent="Tap on a cell",document.querySelectorAll(".ship-container input").forEach(e=>e.setAttribute("readonly","readonly"))}}();const t=$(),{AubreyGameboard:a,FinchGameboard:n}=t;S("one",a,"two-players")}),document.querySelector("#reload").addEventListener("click",e=>{e.preventDefault(),location.reload()})}]);