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
    for (let i = 0; i < ship.length; i++) {
      if (y + i > 10) return
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
  playerBoard.placeShip(0, 0, playerBoard.carrier)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUN4QyxDQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLGtEQUFZO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEd1QjtBQUN2QixDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgY29tcHV0ZXJQbGF5IH1cbmltcG9ydCB7IGRpc3BsYXlCb2FyZCB9IGZyb20gXCIuL3VpXCJcblxuZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgaXNIaXQ6IDAsXG4gICAgaGl0KCkge1xuICAgICAgdGhpcy5pc0hpdCsrXG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBpZiAodGhpcy5pc0hpdCA9PSBsZW5ndGgpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICB9XG59XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheSgxMClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBib2FyZFtpXSA9IEFycmF5KDEwKVxuXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUpXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQpXG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKDMpXG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoMylcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcCgyKVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoeSArIGkgPiAxMCkgcmV0dXJuXG4gICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHNoaXBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT0gXCJvYmplY3RcIikge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKVxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHRydWVcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jYXJyaWVyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmJhdHRsZXNoaXAuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuY3J1aXNlci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zdWJtYXJpbmUuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZGVzdHJveWVyLmlzU3VuaygpXG4gICAgKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgY2FycmllcixcbiAgICBiYXR0bGVzaGlwLFxuICAgIGNydWlzZXIsXG4gICAgc3VibWFyaW5lLFxuICAgIGRlc3Ryb3llcixcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnYW1lT3ZlcixcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKClcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpXG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcCgwLCAwLCBwbGF5ZXJCb2FyZC5jYXJyaWVyKVxuICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMCwgcGxheWVyQm9hcmQuYmF0dGxlc2hpcClcbiAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDIsIDAsIHBsYXllckJvYXJkLmNydWlzZXIpXG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcCgzLCAwLCBwbGF5ZXJCb2FyZC5zdWJtYXJpbmUpXG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCAwLCBwbGF5ZXJCb2FyZC5kZXN0cm95ZXIpXG5cbiAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMCwgMCwgY29tcHV0ZXJCb2FyZC5jYXJyaWVyKVxuICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCAwLCBjb21wdXRlckJvYXJkLmJhdHRsZXNoaXApXG4gIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDIsIDAsIGNvbXB1dGVyQm9hcmQuY3J1aXNlcilcbiAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgMCwgY29tcHV0ZXJCb2FyZC5zdWJtYXJpbmUpXG4gIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQsIDAsIGNvbXB1dGVyQm9hcmQuZGVzdHJveWVyKVxuXG4gIGNvbnNvbGUudGFibGUocGxheWVyQm9hcmQuYm9hcmQpXG4gIGRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZClcbn1cblxuZnVuY3Rpb24gY29tcHV0ZXJQbGF5KCkge1xuICBjb25zdCBub3RIaXQgPSBbXVxuICBjb25zdCBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyMT4uc3F1YXJlXCIpXG4gIGZvciAobGV0IG5vZGUgb2Ygbm9kZUxpc3QpIHtcbiAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgfHwgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJub3QtaGl0XCIpKVxuICAgICAgY29udGludWVcbiAgICBub3RIaXQucHVzaChub2RlKVxuICB9XG4gIGNvbnNvbGUubG9nKG5vdEhpdClcbiAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub3RIaXQubGVuZ3RoKVxuICBub3RIaXRbaW5kZXhdLmNsaWNrKClcbn1cblxuc3RhcnRHYW1lKClcbiIsImV4cG9ydCB7IGRpc3BsYXlCb2FyZCB9XG5pbXBvcnQgeyBjb21wdXRlclBsYXkgfSBmcm9tIFwiLi9pbmRleFwiXG5cbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZChnYW1lQm9hcmQxLCBnYW1lQm9hcmQyKSB7XG4gIGNvbnN0IHBsYXllcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjFcIilcbiAgY29uc3QgcGxheWVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMlwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBjb25zdCBzcXVhcmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIilcbiAgICAgIHNxdWFyZTIuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKVxuICAgICAgaWYgKGdhbWVCb2FyZDEuYm9hcmRbaV1bal0pXG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IGdhbWVCb2FyZDEuYm9hcmRbaV1bal0ubGVuZ3RoXG4gICAgICBpZiAoZ2FtZUJvYXJkMi5ib2FyZFtpXVtqXSlcbiAgICAgICAgc3F1YXJlMi50ZXh0Q29udGVudCA9IGdhbWVCb2FyZDIuYm9hcmRbaV1bal0ubGVuZ3RoXG4gICAgICBzcXVhcmUub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZUJvYXJkMS5yZWNlaXZlQXR0YWNrKGksIGopXG4gICAgICAgIGNvbnNvbGUudGFibGUoZ2FtZUJvYXJkMS5ib2FyZClcbiAgICAgICAgaWYgKGlzSGl0KSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgIGVsc2UgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm5vdC1oaXRcIilcbiAgICAgICAgZS50YXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIGlmIChnYW1lQm9hcmQyLmdhbWVPdmVyKCkpIGNvbnNvbGUubG9nKFwiR2FtZW92ZXIsIHBsYXllciB3aW5cIilcbiAgICAgIH1cbiAgICAgIHNxdWFyZTIub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZUJvYXJkMi5yZWNlaXZlQXR0YWNrKGksIGopXG4gICAgICAgIGNvbnNvbGUudGFibGUoZ2FtZUJvYXJkMi5ib2FyZClcbiAgICAgICAgaWYgKGlzSGl0KSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgIGVsc2UgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm5vdC1oaXRcIilcbiAgICAgICAgZS50YXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgICAgIGlmIChnYW1lQm9hcmQxLmdhbWVPdmVyKCkpIGNvbnNvbGUubG9nKFwiR2FtZW92ZXIsIGNvbXB1dGVyIHdpblwiKVxuICAgICAgfVxuICAgICAgcGxheWVyMS5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgICBwbGF5ZXIyLmFwcGVuZENoaWxkKHNxdWFyZTIpXG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==