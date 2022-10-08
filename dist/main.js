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
    return ship
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

  ;(0,_ui__WEBPACK_IMPORTED_MODULE_0__.displaySetup)(playerBoard)

  /* playerBoard.placeShip(0, 5, playerBoard.carrier)
  playerBoard.placeShip(1, 0, playerBoard.battleship)
  playerBoard.placeShip(2, 0, playerBoard.cruiser)
  playerBoard.placeShip(3, 0, playerBoard.submarine)
  playerBoard.placeShip(4, 0, playerBoard.destroyer)

  computerBoard.placeShip(0, 0, computerBoard.carrier)
  computerBoard.placeShip(1, 0, computerBoard.battleship)
  computerBoard.placeShip(2, 0, computerBoard.cruiser)
  computerBoard.placeShip(3, 0, computerBoard.submarine)
  computerBoard.placeShip(4, 0, computerBoard.destroyer)

  displayBoard(playerBoard, computerBoard) */
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
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard),
/* harmony export */   "displaySetup": () => (/* binding */ displaySetup)
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
        if (isHit) e.target.classList.add("hit")
        else e.target.classList.add("not-hit")
        e.target.style.pointerEvents = "none"
        if (gameBoard2.gameOver()) console.log("Gameover, player win")
      }
      square2.onclick = (e) => {
        const isHit = gameBoard2.receiveAttack(i, j)
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

function displaySetup(gameBoard) {
  const carrier = document.querySelector("img[alt='carrier']")
  carrier.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.alt)
  })

  const board = document.querySelector(".setup-board")
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) {
      const square = document.createElement("div")
      square.setAttribute("data-x", `${i}`)
      square.setAttribute("data-y", `${j}`)
      square.addEventListener("dragover", (e) => {
        e.preventDefault()
      })
      square.addEventListener("drop", (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("text")
        const placedShip = gameBoard.placeShip(i, j, gameBoard[data])
        if (placedShip)
          for (let k = 0; k < placedShip.length; k++) {
            document
              .querySelector(`div[data-x="${i}"][data-y="${j + k}"]`)
              .classList.add("exist-ship")
          }
        console.table(gameBoard.board)
      })
      board.appendChild(square)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUN4QyxDQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGtEQUFZOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2R3FDO0FBQ3JDLENBQXNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxREFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSx1Q0FBdUMsRUFBRTtBQUN6Qyx1Q0FBdUMsRUFBRTtBQUN6QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0EsNENBQTRDLEVBQUUsYUFBYSxNQUFNO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7VUNqRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQsIGNvbXB1dGVyUGxheSB9XG5pbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL3VpXCJcblxuZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgaXNIaXQ6IDAsXG4gICAgaGl0KCkge1xuICAgICAgdGhpcy5pc0hpdCsrXG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBpZiAodGhpcy5pc0hpdCA9PSBsZW5ndGgpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICB9XG59XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheSgxMClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBib2FyZFtpXSA9IEFycmF5KDEwKVxuXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUpXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQpXG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKDMpXG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoMylcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcCgyKVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwKSB7XG4gICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcFxuICAgIH1cbiAgICByZXR1cm4gc2hpcFxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KClcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSB0cnVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmNydWlzZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuc3VibWFyaW5lLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmRlc3Ryb3llci5pc1N1bmsoKVxuICAgIClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIGNhcnJpZXIsXG4gICAgYmF0dGxlc2hpcCxcbiAgICBjcnVpc2VyLFxuICAgIHN1Ym1hcmluZSxcbiAgICBkZXN0cm95ZXIsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2FtZU92ZXIsXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKVxuXG4gIGRpc3BsYXlTZXR1cChwbGF5ZXJCb2FyZClcblxuICAvKiBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMCwgNSwgcGxheWVyQm9hcmQuY2FycmllcilcbiAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDAsIHBsYXllckJvYXJkLmJhdHRsZXNoaXApXG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcCgyLCAwLCBwbGF5ZXJCb2FyZC5jcnVpc2VyKVxuICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMywgMCwgcGxheWVyQm9hcmQuc3VibWFyaW5lKVxuICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgMCwgcGxheWVyQm9hcmQuZGVzdHJveWVyKVxuXG4gIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDAsIDAsIGNvbXB1dGVyQm9hcmQuY2FycmllcilcbiAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMCwgY29tcHV0ZXJCb2FyZC5iYXR0bGVzaGlwKVxuICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgyLCAwLCBjb21wdXRlckJvYXJkLmNydWlzZXIpXG4gIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDAsIGNvbXB1dGVyQm9hcmQuc3VibWFyaW5lKVxuICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg0LCAwLCBjb21wdXRlckJvYXJkLmRlc3Ryb3llcilcblxuICBkaXNwbGF5Qm9hcmQocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpICovXG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVyUGxheSgpIHtcbiAgY29uc3Qgbm90SGl0ID0gW11cbiAgY29uc3Qgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllcjE+LnNxdWFyZVwiKVxuICBmb3IgKGxldCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm90LWhpdFwiKSlcbiAgICAgIGNvbnRpbnVlXG4gICAgbm90SGl0LnB1c2gobm9kZSlcbiAgfVxuICBjb25zb2xlLmxvZyhub3RIaXQpXG4gIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm90SGl0Lmxlbmd0aClcbiAgbm90SGl0W2luZGV4XS5jbGljaygpXG59XG5cbnN0YXJ0R2FtZSgpXG4iLCJleHBvcnQgeyBkaXNwbGF5Qm9hcmQsIGRpc3BsYXlTZXR1cCB9XG5pbXBvcnQgeyBjb21wdXRlclBsYXkgfSBmcm9tIFwiLi9pbmRleFwiXG5cbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZChnYW1lQm9hcmQxLCBnYW1lQm9hcmQyKSB7XG4gIGNvbnN0IHBsYXllcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjFcIilcbiAgY29uc3QgcGxheWVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMlwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBjb25zdCBzcXVhcmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIilcbiAgICAgIHNxdWFyZTIuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKVxuICAgICAgaWYgKGdhbWVCb2FyZDEuYm9hcmRbaV1bal0pXG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IGdhbWVCb2FyZDEuYm9hcmRbaV1bal0ubGVuZ3RoXG4gICAgICBpZiAoZ2FtZUJvYXJkMi5ib2FyZFtpXVtqXSlcbiAgICAgICAgc3F1YXJlMi50ZXh0Q29udGVudCA9IGdhbWVCb2FyZDIuYm9hcmRbaV1bal0ubGVuZ3RoXG4gICAgICBzcXVhcmUub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZUJvYXJkMS5yZWNlaXZlQXR0YWNrKGksIGopXG4gICAgICAgIGlmIChpc0hpdCkgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuICAgICAgICBlbHNlIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJub3QtaGl0XCIpXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICBpZiAoZ2FtZUJvYXJkMi5nYW1lT3ZlcigpKSBjb25zb2xlLmxvZyhcIkdhbWVvdmVyLCBwbGF5ZXIgd2luXCIpXG4gICAgICB9XG4gICAgICBzcXVhcmUyLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpc0hpdCA9IGdhbWVCb2FyZDIucmVjZWl2ZUF0dGFjayhpLCBqKVxuICAgICAgICBpZiAoaXNIaXQpIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcbiAgICAgICAgZWxzZSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibm90LWhpdFwiKVxuICAgICAgICBlLnRhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgY29tcHV0ZXJQbGF5KClcbiAgICAgICAgaWYgKGdhbWVCb2FyZDEuZ2FtZU92ZXIoKSkgY29uc29sZS5sb2coXCJHYW1lb3ZlciwgY29tcHV0ZXIgd2luXCIpXG4gICAgICB9XG4gICAgICBwbGF5ZXIxLmFwcGVuZENoaWxkKHNxdWFyZSlcbiAgICAgIHBsYXllcjIuYXBwZW5kQ2hpbGQoc3F1YXJlMilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cChnYW1lQm9hcmQpIHtcbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdbYWx0PSdjYXJyaWVyJ11cIilcbiAgY2Fycmllci5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZS50YXJnZXQuYWx0KVxuICB9KVxuXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZXR1cC1ib2FyZFwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGAke2l9YClcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgYCR7an1gKVxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICBjb25zdCBwbGFjZWRTaGlwID0gZ2FtZUJvYXJkLnBsYWNlU2hpcChpLCBqLCBnYW1lQm9hcmRbZGF0YV0pXG4gICAgICAgIGlmIChwbGFjZWRTaGlwKVxuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcGxhY2VkU2hpcC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLXg9XCIke2l9XCJdW2RhdGEteT1cIiR7aiArIGt9XCJdYClcbiAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJleGlzdC1zaGlwXCIpXG4gICAgICAgICAgfVxuICAgICAgICBjb25zb2xlLnRhYmxlKGdhbWVCb2FyZC5ib2FyZClcbiAgICAgIH0pXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==