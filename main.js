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

  function placeShip(x, y, ship, axis) {
    if (axis == "y" && y + ship.length > 10) return
    if (axis == "x" && x + ship.length > 10) return

    for (let i = 0; i < ship.length; i++) {
      if (axis == "y" && this.board[x][y + i]) return
      if (axis == "x" && this.board[x + i][y]) return
    }

    for (let i = 0; i < ship.length; i++) {
      if (axis == "y") this.board[x][y + i] = ship
      else this.board[x + i][y] = ship
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

  ;(0,_ui__WEBPACK_IMPORTED_MODULE_0__.displaySetup)(playerBoard, computerBoard)
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
      square.classList.add("cell")
      square2.classList.add("cell")
      if (gameBoard1.board[i][j]) square.classList.add("exist-ship")
      if (gameBoard2.board[i][j]) square2.classList.add("exist-ship")
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

function displaySetup(playerBoard, computerBoard) {
  const startBtn = document.querySelector("#start-btn")
  startBtn.onclick = () => {
    if (document.querySelectorAll(".ships>img").length != 0) return
    displayBoard(playerBoard, computerBoard)
    document.querySelector(".modal").style.display = "none"
  }
  const rotateBtn = document.querySelector("#rotate-btn")
  rotateBtn.onclick = (e) => {
    const shipImages = document.querySelectorAll(".ships>img")
    if (e.target.getAttribute("data") == "y") {
      e.target.setAttribute("data", "x")
      for (let img of shipImages) img.style.transform = "rotate(90deg)"
    } else {
      e.target.setAttribute("data", "y")
      for (let img of shipImages) img.style.transform = "rotate(0)"
    }
  }
  const carrier = document.querySelector("img[alt='carrier']")
  const battleShip = document.querySelector("img[alt='battleship']")
  const cruiser = document.querySelector("img[alt='cruiser']")
  const submarine = document.querySelector("img[alt='submarine']")
  const destroyer = document.querySelector("img[alt='destroyer']")
  const ships = [carrier, battleShip, cruiser, submarine, destroyer]
  for (let ship of ships) {
    ship.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.alt)
    })
  }

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
        let axis = document.querySelector("#rotate-btn").getAttribute("data")
        const placedShip = playerBoard.placeShip(i, j, playerBoard[data], axis)
        if (placedShip) {
          for (let k = 0; k < placedShip.length; k++) {
            if (axis == "y")
              document
                .querySelector(`div[data-x="${i}"][data-y="${j + k}"]`)
                .classList.add("exist-ship")
            else
              document
                .querySelector(`div[data-x="${i + k}"][data-y="${j}"]`)
                .classList.add("exist-ship")
          }
          const sourceAlt = e.dataTransfer.getData("text")
          document.querySelector(`img[alt="${sourceAlt}"]`).remove()
        }
        console.table(playerBoard.board)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUN4QyxDQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsa0RBQVk7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakdxQztBQUNyQyxDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxREFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHVDQUF1QyxFQUFFO0FBQ3pDLHVDQUF1QyxFQUFFO0FBQ3pDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QjtBQUNqRDtBQUNBO0FBQ0EsOENBQThDLEVBQUUsYUFBYSxNQUFNO0FBQ25FO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxNQUFNLGFBQWEsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsVUFBVTtBQUN2RDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7Ozs7OztVQ2hHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgY29tcHV0ZXJQbGF5IH1cbmltcG9ydCB7IGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL3VpXCJcblxuZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgaXNIaXQ6IDAsXG4gICAgaGl0KCkge1xuICAgICAgdGhpcy5pc0hpdCsrXG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBpZiAodGhpcy5pc0hpdCA9PSBsZW5ndGgpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICB9XG59XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheSgxMClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBib2FyZFtpXSA9IEFycmF5KDEwKVxuXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUpXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQpXG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKDMpXG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoMylcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcCgyKVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwLCBheGlzKSB7XG4gICAgaWYgKGF4aXMgPT0gXCJ5XCIgJiYgeSArIHNoaXAubGVuZ3RoID4gMTApIHJldHVyblxuICAgIGlmIChheGlzID09IFwieFwiICYmIHggKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm5cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGF4aXMgPT0gXCJ5XCIgJiYgdGhpcy5ib2FyZFt4XVt5ICsgaV0pIHJldHVyblxuICAgICAgaWYgKGF4aXMgPT0gXCJ4XCIgJiYgdGhpcy5ib2FyZFt4ICsgaV1beV0pIHJldHVyblxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGF4aXMgPT0gXCJ5XCIpIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcFxuICAgICAgZWxzZSB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHNoaXBcbiAgICB9XG4gICAgcmV0dXJuIHNoaXBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gdHJ1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBnYW1lT3ZlcigpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNhcnJpZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuYmF0dGxlc2hpcC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5jcnVpc2VyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLnN1Ym1hcmluZS5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5kZXN0cm95ZXIuaXNTdW5rKClcbiAgICApXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBjYXJyaWVyLFxuICAgIGJhdHRsZXNoaXAsXG4gICAgY3J1aXNlcixcbiAgICBzdWJtYXJpbmUsXG4gICAgZGVzdHJveWVyLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdhbWVPdmVyLFxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKVxuICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKClcblxuICBkaXNwbGF5U2V0dXAocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpXG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVyUGxheSgpIHtcbiAgY29uc3Qgbm90SGl0ID0gW11cbiAgY29uc3Qgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllcjE+LnNxdWFyZVwiKVxuICBmb3IgKGxldCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm90LWhpdFwiKSlcbiAgICAgIGNvbnRpbnVlXG4gICAgbm90SGl0LnB1c2gobm9kZSlcbiAgfVxuICBjb25zb2xlLmxvZyhub3RIaXQpXG4gIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm90SGl0Lmxlbmd0aClcbiAgbm90SGl0W2luZGV4XS5jbGljaygpXG59XG5cbnN0YXJ0R2FtZSgpXG4iLCJleHBvcnQgeyBkaXNwbGF5Qm9hcmQsIGRpc3BsYXlTZXR1cCB9XG5pbXBvcnQgeyBjb21wdXRlclBsYXkgfSBmcm9tIFwiLi9pbmRleFwiXG5cbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZChnYW1lQm9hcmQxLCBnYW1lQm9hcmQyKSB7XG4gIGNvbnN0IHBsYXllcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjFcIilcbiAgY29uc3QgcGxheWVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMlwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBjb25zdCBzcXVhcmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpXG4gICAgICBzcXVhcmUyLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpXG4gICAgICBpZiAoZ2FtZUJvYXJkMS5ib2FyZFtpXVtqXSkgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJleGlzdC1zaGlwXCIpXG4gICAgICBpZiAoZ2FtZUJvYXJkMi5ib2FyZFtpXVtqXSkgc3F1YXJlMi5jbGFzc0xpc3QuYWRkKFwiZXhpc3Qtc2hpcFwiKVxuICAgICAgc3F1YXJlLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpc0hpdCA9IGdhbWVCb2FyZDEucmVjZWl2ZUF0dGFjayhpLCBqKVxuICAgICAgICBpZiAoaXNIaXQpIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcbiAgICAgICAgZWxzZSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibm90LWhpdFwiKVxuICAgICAgICBlLnRhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgaWYgKGdhbWVCb2FyZDIuZ2FtZU92ZXIoKSkgY29uc29sZS5sb2coXCJHYW1lb3ZlciwgcGxheWVyIHdpblwiKVxuICAgICAgfVxuICAgICAgc3F1YXJlMi5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lQm9hcmQyLnJlY2VpdmVBdHRhY2soaSwgailcbiAgICAgICAgaWYgKGlzSGl0KSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgIGVsc2UgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm5vdC1oaXRcIilcbiAgICAgICAgZS50YXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgICAgIGlmIChnYW1lQm9hcmQxLmdhbWVPdmVyKCkpIGNvbnNvbGUubG9nKFwiR2FtZW92ZXIsIGNvbXB1dGVyIHdpblwiKVxuICAgICAgfVxuICAgICAgcGxheWVyMS5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgICBwbGF5ZXIyLmFwcGVuZENoaWxkKHNxdWFyZTIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpIHtcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWJ0blwiKVxuICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBzPmltZ1wiKS5sZW5ndGggIT0gMCkgcmV0dXJuXG4gICAgZGlzcGxheUJvYXJkKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gIH1cbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGUtYnRuXCIpXG4gIHJvdGF0ZUJ0bi5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBzaGlwSW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwcz5pbWdcIilcbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcInlcIikge1xuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInhcIilcbiAgICAgIGZvciAobGV0IGltZyBvZiBzaGlwSW1hZ2VzKSBpbWcuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoOTBkZWcpXCJcbiAgICB9IGVsc2Uge1xuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInlcIilcbiAgICAgIGZvciAobGV0IGltZyBvZiBzaGlwSW1hZ2VzKSBpbWcuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoMClcIlxuICAgIH1cbiAgfVxuICBjb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2NhcnJpZXInXVwiKVxuICBjb25zdCBiYXR0bGVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2JhdHRsZXNoaXAnXVwiKVxuICBjb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2NydWlzZXInXVwiKVxuICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW1nW2FsdD0nc3VibWFyaW5lJ11cIilcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2Rlc3Ryb3llciddXCIpXG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZVNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxuICBmb3IgKGxldCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBlLnRhcmdldC5hbHQpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZXR1cC1ib2FyZFwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGAke2l9YClcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgYCR7an1gKVxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICBsZXQgYXhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlLWJ0blwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhXCIpXG4gICAgICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoaSwgaiwgcGxheWVyQm9hcmRbZGF0YV0sIGF4aXMpXG4gICAgICAgIGlmIChwbGFjZWRTaGlwKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwbGFjZWRTaGlwLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZiAoYXhpcyA9PSBcInlcIilcbiAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEteD1cIiR7aX1cIl1bZGF0YS15PVwiJHtqICsga31cIl1gKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiZXhpc3Qtc2hpcFwiKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS14PVwiJHtpICsga31cIl1bZGF0YS15PVwiJHtqfVwiXWApXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJleGlzdC1zaGlwXCIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFsdCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW1nW2FsdD1cIiR7c291cmNlQWx0fVwiXWApLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS50YWJsZShwbGF5ZXJCb2FyZC5ib2FyZClcbiAgICAgIH0pXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==