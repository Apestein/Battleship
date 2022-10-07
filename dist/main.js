/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "computerPlay": () => (/* binding */ computerPlay)
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/ui.js");

;

function Ship(length) {
  return {
    length,
    isHit: 0,
    hit() {
      this.isHit++
    },
    isSunk() {
      if (this.isHit == length) return true
      return false
    },
  }
}

function Gameboard() {
  const board = Array(10)
  for (let i = 0; i < 10; i++) board[i] = Array(10)

  const carrier = Ship(5)
  const battleship = Ship(4)
  const cruiser = Ship(3)
  const submarine = Ship(3)
  const destroyer = Ship(2)

  function placeShip(x, y, ship) {
    if (y + ship.length > 10) return
    for (let i = 0; i < ship.length; i++) {
      this.board[x][y + i] = ship
    }
  }

  function receiveAttack(x, y) {
    if (typeof this.board[x][y] == "object") {
      this.board[x][y].hit()
      this.board[x][y] = true
      return true
    }
    return false
  }

  function gameOver() {
    if (
      this.carrier.isSunk() &&
      this.battleship.isSunk() &&
      this.cruiser.isSunk() &&
      this.submarine.isSunk() &&
      this.destroyer.isSunk()
    )
      return true
    return false
  }

  return {
    board,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
    placeShip,
    receiveAttack,
    gameOver,
  }
}

function startGame() {
  const playerBoard = Gameboard()
  const computerBoard = Gameboard()
  playerBoard.placeShip(0, 5, playerBoard.carrier)
  playerBoard.placeShip(1, 0, playerBoard.battleship)
  playerBoard.placeShip(2, 0, playerBoard.cruiser)
  playerBoard.placeShip(3, 0, playerBoard.submarine)
  playerBoard.placeShip(4, 0, playerBoard.destroyer)

  computerBoard.placeShip(0, 0, computerBoard.carrier)
  computerBoard.placeShip(1, 0, computerBoard.battleship)
  computerBoard.placeShip(2, 0, computerBoard.cruiser)
  computerBoard.placeShip(3, 0, computerBoard.submarine)
  computerBoard.placeShip(4, 0, computerBoard.destroyer)

  console.table(playerBoard.board)
  ;(0,_ui__WEBPACK_IMPORTED_MODULE_0__.displayBoard)(playerBoard, computerBoard)
}

function computerPlay() {
  const notHit = []
  const nodeList = document.querySelectorAll(".player1>.square")
  for (let node of nodeList) {
    if (node.classList.contains("hit") || node.classList.contains("not-hit"))
      continue
    notHit.push(node)
  }
  console.log(notHit)
  const index = Math.floor(Math.random() * notHit.length)
  notHit[index].click()
}

startGame()


/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");

;

function displayBoard(gameBoard1, gameBoard2) {
  const player1 = document.querySelector(".player1")
  const player2 = document.querySelector(".player2")
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) {
      const square = document.createElement("div")
      const square2 = document.createElement("div")
      square.classList.add("square")
      square2.classList.add("square")
      if (gameBoard1.board[i][j])
        square.textContent = gameBoard1.board[i][j].length
      if (gameBoard2.board[i][j])
        square2.textContent = gameBoard2.board[i][j].length
      square.onclick = (e) => {
        const isHit = gameBoard1.receiveAttack(i, j)
        console.table(gameBoard1.board)
        if (isHit) e.target.classList.add("hit")
        else e.target.classList.add("not-hit")
        e.target.style.pointerEvents = "none"
        if (gameBoard2.gameOver()) console.log("Gameover, player win")
      }
      square.addEventListener("dragover", (e) => {
        e.preventDefault()
      })
      square.addEventListener("drop", (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("text")
      })
      square2.onclick = (e) => {
        const isHit = gameBoard2.receiveAttack(i, j)
        console.table(gameBoard2.board)
        if (isHit) e.target.classList.add("hit")
        else e.target.classList.add("not-hit")
        e.target.style.pointerEvents = "none"
        ;(0,_index__WEBPACK_IMPORTED_MODULE_0__.computerPlay)()
        if (gameBoard1.gameOver()) console.log("Gameover, computer win")
      }
      player1.appendChild(square)
      player2.appendChild(square2)
    }
}

function dragDrop() {
  const carrier = document.querySelector("img[data='5']")
  carrier.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.data)
  })
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUN4QyxDQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLGtEQUFZO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEd1QjtBQUN2QixDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7OztVQ2xEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgY29tcHV0ZXJQbGF5IH1cbmltcG9ydCB7IGRpc3BsYXlCb2FyZCB9IGZyb20gXCIuL3VpXCJcblxuZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgaXNIaXQ6IDAsXG4gICAgaGl0KCkge1xuICAgICAgdGhpcy5pc0hpdCsrXG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBpZiAodGhpcy5pc0hpdCA9PSBsZW5ndGgpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICB9XG59XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheSgxMClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBib2FyZFtpXSA9IEFycmF5KDEwKVxuXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUpXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQpXG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKDMpXG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoMylcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcCgyKVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwKSB7XG4gICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gdHJ1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBnYW1lT3ZlcigpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNhcnJpZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuYmF0dGxlc2hpcC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5jcnVpc2VyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLnN1Ym1hcmluZS5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5kZXN0cm95ZXIuaXNTdW5rKClcbiAgICApXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBjYXJyaWVyLFxuICAgIGJhdHRsZXNoaXAsXG4gICAgY3J1aXNlcixcbiAgICBzdWJtYXJpbmUsXG4gICAgZGVzdHJveWVyLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdhbWVPdmVyLFxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKVxuICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKClcbiAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDAsIDUsIHBsYXllckJvYXJkLmNhcnJpZXIpXG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcCgxLCAwLCBwbGF5ZXJCb2FyZC5iYXR0bGVzaGlwKVxuICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMiwgMCwgcGxheWVyQm9hcmQuY3J1aXNlcilcbiAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDMsIDAsIHBsYXllckJvYXJkLnN1Ym1hcmluZSlcbiAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDQsIDAsIHBsYXllckJvYXJkLmRlc3Ryb3llcilcblxuICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgwLCAwLCBjb21wdXRlckJvYXJkLmNhcnJpZXIpXG4gIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDAsIGNvbXB1dGVyQm9hcmQuYmF0dGxlc2hpcClcbiAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMiwgMCwgY29tcHV0ZXJCb2FyZC5jcnVpc2VyKVxuICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCAwLCBjb21wdXRlckJvYXJkLnN1Ym1hcmluZSlcbiAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNCwgMCwgY29tcHV0ZXJCb2FyZC5kZXN0cm95ZXIpXG5cbiAgY29uc29sZS50YWJsZShwbGF5ZXJCb2FyZC5ib2FyZClcbiAgZGlzcGxheUJvYXJkKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKVxufVxuXG5mdW5jdGlvbiBjb21wdXRlclBsYXkoKSB7XG4gIGNvbnN0IG5vdEhpdCA9IFtdXG4gIGNvbnN0IG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5ZXIxPi5zcXVhcmVcIilcbiAgZm9yIChsZXQgbm9kZSBvZiBub2RlTGlzdCkge1xuICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBub2RlLmNsYXNzTGlzdC5jb250YWlucyhcIm5vdC1oaXRcIikpXG4gICAgICBjb250aW51ZVxuICAgIG5vdEhpdC5wdXNoKG5vZGUpXG4gIH1cbiAgY29uc29sZS5sb2cobm90SGl0KVxuICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vdEhpdC5sZW5ndGgpXG4gIG5vdEhpdFtpbmRleF0uY2xpY2soKVxufVxuXG5zdGFydEdhbWUoKVxuIiwiZXhwb3J0IHsgZGlzcGxheUJvYXJkIH1cbmltcG9ydCB7IGNvbXB1dGVyUGxheSB9IGZyb20gXCIuL2luZGV4XCJcblxuZnVuY3Rpb24gZGlzcGxheUJvYXJkKGdhbWVCb2FyZDEsIGdhbWVCb2FyZDIpIHtcbiAgY29uc3QgcGxheWVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMVwiKVxuICBjb25zdCBwbGF5ZXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyXCIpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKylcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgIGNvbnN0IHNxdWFyZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKVxuICAgICAgc3F1YXJlMi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpXG4gICAgICBpZiAoZ2FtZUJvYXJkMS5ib2FyZFtpXVtqXSlcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gZ2FtZUJvYXJkMS5ib2FyZFtpXVtqXS5sZW5ndGhcbiAgICAgIGlmIChnYW1lQm9hcmQyLmJvYXJkW2ldW2pdKVxuICAgICAgICBzcXVhcmUyLnRleHRDb250ZW50ID0gZ2FtZUJvYXJkMi5ib2FyZFtpXVtqXS5sZW5ndGhcbiAgICAgIHNxdWFyZS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lQm9hcmQxLnJlY2VpdmVBdHRhY2soaSwgailcbiAgICAgICAgY29uc29sZS50YWJsZShnYW1lQm9hcmQxLmJvYXJkKVxuICAgICAgICBpZiAoaXNIaXQpIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcbiAgICAgICAgZWxzZSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibm90LWhpdFwiKVxuICAgICAgICBlLnRhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgaWYgKGdhbWVCb2FyZDIuZ2FtZU92ZXIoKSkgY29uc29sZS5sb2coXCJHYW1lb3ZlciwgcGxheWVyIHdpblwiKVxuICAgICAgfVxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgfSlcbiAgICAgIHNxdWFyZTIub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZUJvYXJkMi5yZWNlaXZlQXR0YWNrKGksIGopXG4gICAgICAgIGNvbnNvbGUudGFibGUoZ2FtZUJvYXJkMi5ib2FyZClcbiAgICAgICAgaWYgKGlzSGl0KSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgIGVsc2UgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm5vdC1oaXRcIilcbiAgICAgICAgZS50YXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgICAgIGlmIChnYW1lQm9hcmQxLmdhbWVPdmVyKCkpIGNvbnNvbGUubG9nKFwiR2FtZW92ZXIsIGNvbXB1dGVyIHdpblwiKVxuICAgICAgfVxuICAgICAgcGxheWVyMS5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgICBwbGF5ZXIyLmFwcGVuZENoaWxkKHNxdWFyZTIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFnRHJvcCgpIHtcbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdbZGF0YT0nNSddXCIpXG4gIGNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGUudGFyZ2V0LmRhdGEpXG4gIH0pXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9