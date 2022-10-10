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
/* harmony export */   "computerPlay": () => (/* binding */ computerPlay),
/* harmony export */   "randomize": () => (/* binding */ randomize)
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
  const computerBoard = randomize()

  ;(0,_ui__WEBPACK_IMPORTED_MODULE_0__.displaySetup)(playerBoard, computerBoard)
}

function computerPlay() {
  const notHit = []
  const nodeList = document.querySelectorAll(".player1>.cell")
  for (let node of nodeList) {
    if (node.classList.contains("hit") || node.classList.contains("not-hit"))
      continue
    notHit.push(node)
  }
  const index = Math.floor(Math.random() * notHit.length)
  notHit[index].click()
}

function randomize(newBoard, ships) {
  newBoard = newBoard ?? Gameboard()
  ships = ships ?? [
    newBoard.carrier,
    newBoard.battleship,
    newBoard.cruiser,
    newBoard.submarine,
    newBoard.destroyer,
  ]
  if (!ships.length) return newBoard

  let x = Math.floor(Math.random() * 10)
  let y = Math.floor(Math.random() * 10)
  let axis = Math.random() > 0.5 ? "y" : "x"
  let isPlaced = newBoard.placeShip(x, y, ships[0], axis)
  if (isPlaced) ships.shift()
  return randomize(newBoard, ships)
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
  const randomBtn = document.querySelector("#random-btn")
  randomBtn.onclick = () => {
    playerBoard = (0,_index__WEBPACK_IMPORTED_MODULE_0__.randomize)()
    updateBoard(playerBoard.board)
    const imgs = document.querySelectorAll(".ships>img")
    for (let img of imgs) img.remove()
  }
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

function updateBoard(board) {
  const cells = document.querySelectorAll(".setup-board .exist-ship")
  for (let cell of cells) cell.classList.remove("exist-ship")

  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) {
      if (board[i][j]) {
        document
          .querySelector(`div[data-x="${i}"][data-y="${j}"]`)
          .classList.add("exist-ship")
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Li9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgY29tcHV0ZXJQbGF5LCByYW5kb21pemUgfVxuaW1wb3J0IHsgZGlzcGxheVNldHVwIH0gZnJvbSBcIi4vdWlcIlxuXG5mdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBpc0hpdDogMCxcbiAgICBoaXQoKSB7XG4gICAgICB0aGlzLmlzSGl0KytcbiAgICB9LFxuICAgIGlzU3VuaygpIHtcbiAgICAgIGlmICh0aGlzLmlzSGl0ID09IGxlbmd0aCkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG4gIH1cbn1cblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IEFycmF5KDEwKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIGJvYXJkW2ldID0gQXJyYXkoMTApXG5cbiAgY29uc3QgY2FycmllciA9IFNoaXAoNSlcbiAgY29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoNClcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoMylcbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcCgzKVxuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKDIpXG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHgsIHksIHNoaXAsIGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PSBcInlcIiAmJiB5ICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuXG4gICAgaWYgKGF4aXMgPT0gXCJ4XCIgJiYgeCArIHNoaXAubGVuZ3RoID4gMTApIHJldHVyblxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXhpcyA9PSBcInlcIiAmJiB0aGlzLmJvYXJkW3hdW3kgKyBpXSkgcmV0dXJuXG4gICAgICBpZiAoYXhpcyA9PSBcInhcIiAmJiB0aGlzLmJvYXJkW3ggKyBpXVt5XSkgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXhpcyA9PSBcInlcIikgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSBzaGlwXG4gICAgICBlbHNlIHRoaXMuYm9hcmRbeCArIGldW3ldID0gc2hpcFxuICAgIH1cbiAgICByZXR1cm4gc2hpcFxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KClcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSB0cnVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmNydWlzZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuc3VibWFyaW5lLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmRlc3Ryb3llci5pc1N1bmsoKVxuICAgIClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIGNhcnJpZXIsXG4gICAgYmF0dGxlc2hpcCxcbiAgICBjcnVpc2VyLFxuICAgIHN1Ym1hcmluZSxcbiAgICBkZXN0cm95ZXIsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2FtZU92ZXIsXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSByYW5kb21pemUoKVxuXG4gIGRpc3BsYXlTZXR1cChwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZClcbn1cblxuZnVuY3Rpb24gY29tcHV0ZXJQbGF5KCkge1xuICBjb25zdCBub3RIaXQgPSBbXVxuICBjb25zdCBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyMT4uY2VsbFwiKVxuICBmb3IgKGxldCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm90LWhpdFwiKSlcbiAgICAgIGNvbnRpbnVlXG4gICAgbm90SGl0LnB1c2gobm9kZSlcbiAgfVxuICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vdEhpdC5sZW5ndGgpXG4gIG5vdEhpdFtpbmRleF0uY2xpY2soKVxufVxuXG5mdW5jdGlvbiByYW5kb21pemUobmV3Qm9hcmQsIHNoaXBzKSB7XG4gIG5ld0JvYXJkID0gbmV3Qm9hcmQgPz8gR2FtZWJvYXJkKClcbiAgc2hpcHMgPSBzaGlwcyA/PyBbXG4gICAgbmV3Qm9hcmQuY2FycmllcixcbiAgICBuZXdCb2FyZC5iYXR0bGVzaGlwLFxuICAgIG5ld0JvYXJkLmNydWlzZXIsXG4gICAgbmV3Qm9hcmQuc3VibWFyaW5lLFxuICAgIG5ld0JvYXJkLmRlc3Ryb3llcixcbiAgXVxuICBpZiAoIXNoaXBzLmxlbmd0aCkgcmV0dXJuIG5ld0JvYXJkXG5cbiAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgbGV0IGF4aXMgPSBNYXRoLnJhbmRvbSgpID4gMC41ID8gXCJ5XCIgOiBcInhcIlxuICBsZXQgaXNQbGFjZWQgPSBuZXdCb2FyZC5wbGFjZVNoaXAoeCwgeSwgc2hpcHNbMF0sIGF4aXMpXG4gIGlmIChpc1BsYWNlZCkgc2hpcHMuc2hpZnQoKVxuICByZXR1cm4gcmFuZG9taXplKG5ld0JvYXJkLCBzaGlwcylcbn1cblxuc3RhcnRHYW1lKClcbiIsImV4cG9ydCB7IGRpc3BsYXlCb2FyZCwgZGlzcGxheVNldHVwIH1cbmltcG9ydCB7IGNvbXB1dGVyUGxheSwgcmFuZG9taXplIH0gZnJvbSBcIi4vaW5kZXhcIlxuXG5mdW5jdGlvbiBkaXNwbGF5Qm9hcmQoZ2FtZUJvYXJkMSwgZ2FtZUJvYXJkMikge1xuICBjb25zdCBwbGF5ZXIxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxXCIpXG4gIGNvbnN0IHBsYXllcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjJcIilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgY29uc3Qgc3F1YXJlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKVxuICAgICAgc3F1YXJlMi5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKVxuICAgICAgaWYgKGdhbWVCb2FyZDEuYm9hcmRbaV1bal0pIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZXhpc3Qtc2hpcFwiKVxuICAgICAgaWYgKGdhbWVCb2FyZDIuYm9hcmRbaV1bal0pIHNxdWFyZTIuY2xhc3NMaXN0LmFkZChcImV4aXN0LXNoaXBcIilcbiAgICAgIHNxdWFyZS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lQm9hcmQxLnJlY2VpdmVBdHRhY2soaSwgailcbiAgICAgICAgaWYgKGlzSGl0KSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgIGVsc2UgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm5vdC1oaXRcIilcbiAgICAgICAgZS50YXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIGlmIChnYW1lQm9hcmQyLmdhbWVPdmVyKCkpIGNvbnNvbGUubG9nKFwiR2FtZW92ZXIsIHBsYXllciB3aW5cIilcbiAgICAgIH1cbiAgICAgIHNxdWFyZTIub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZUJvYXJkMi5yZWNlaXZlQXR0YWNrKGksIGopXG4gICAgICAgIGlmIChpc0hpdCkgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuICAgICAgICBlbHNlIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJub3QtaGl0XCIpXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICBjb21wdXRlclBsYXkoKVxuICAgICAgICBpZiAoZ2FtZUJvYXJkMS5nYW1lT3ZlcigpKSBjb25zb2xlLmxvZyhcIkdhbWVvdmVyLCBjb21wdXRlciB3aW5cIilcbiAgICAgIH1cbiAgICAgIHBsYXllcjEuYXBwZW5kQ2hpbGQoc3F1YXJlKVxuICAgICAgcGxheWVyMi5hcHBlbmRDaGlsZChzcXVhcmUyKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKSB7XG4gIGNvbnN0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmFuZG9tLWJ0blwiKVxuICByYW5kb21CdG4ub25jbGljayA9ICgpID0+IHtcbiAgICBwbGF5ZXJCb2FyZCA9IHJhbmRvbWl6ZSgpXG4gICAgdXBkYXRlQm9hcmQocGxheWVyQm9hcmQuYm9hcmQpXG4gICAgY29uc3QgaW1ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcHM+aW1nXCIpXG4gICAgZm9yIChsZXQgaW1nIG9mIGltZ3MpIGltZy5yZW1vdmUoKVxuICB9XG4gIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydC1idG5cIilcbiAgc3RhcnRCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwcz5pbWdcIikubGVuZ3RoICE9IDApIHJldHVyblxuICAgIGRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZClcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICB9XG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlLWJ0blwiKVxuICByb3RhdGVCdG4ub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3Qgc2hpcEltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcHM+aW1nXCIpXG4gICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGFcIikgPT0gXCJ5XCIpIHtcbiAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ4XCIpXG4gICAgICBmb3IgKGxldCBpbWcgb2Ygc2hpcEltYWdlcykgaW1nLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDkwZGVnKVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ5XCIpXG4gICAgICBmb3IgKGxldCBpbWcgb2Ygc2hpcEltYWdlcykgaW1nLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDApXCJcbiAgICB9XG4gIH1cbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdbYWx0PSdjYXJyaWVyJ11cIilcbiAgY29uc3QgYmF0dGxlU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdbYWx0PSdiYXR0bGVzaGlwJ11cIilcbiAgY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdbYWx0PSdjcnVpc2VyJ11cIilcbiAgY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J3N1Ym1hcmluZSddXCIpXG4gIGNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdbYWx0PSdkZXN0cm95ZXInXVwiKVxuICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGVTaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cbiAgZm9yIChsZXQgc2hpcCBvZiBzaGlwcykge1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZS50YXJnZXQuYWx0KVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2V0dXAtYm9hcmRcIilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEteFwiLCBgJHtpfWApXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS15XCIsIGAke2p9YClcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9KVxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIilcbiAgICAgICAgbGV0IGF4aXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvdGF0ZS1idG5cIikuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKVxuICAgICAgICBjb25zdCBwbGFjZWRTaGlwID0gcGxheWVyQm9hcmQucGxhY2VTaGlwKGksIGosIHBsYXllckJvYXJkW2RhdGFdLCBheGlzKVxuICAgICAgICBpZiAocGxhY2VkU2hpcCkge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcGxhY2VkU2hpcC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWYgKGF4aXMgPT0gXCJ5XCIpXG4gICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLXg9XCIke2l9XCJdW2RhdGEteT1cIiR7aiArIGt9XCJdYClcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImV4aXN0LXNoaXBcIilcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEteD1cIiR7aSArIGt9XCJdW2RhdGEteT1cIiR7an1cIl1gKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiZXhpc3Qtc2hpcFwiKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzb3VyY2VBbHQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGltZ1thbHQ9XCIke3NvdXJjZUFsdH1cIl1gKS5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUudGFibGUocGxheWVyQm9hcmQuYm9hcmQpXG4gICAgICB9KVxuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQoYm9hcmQpIHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNldHVwLWJvYXJkIC5leGlzdC1zaGlwXCIpXG4gIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImV4aXN0LXNoaXBcIilcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBpZiAoYm9hcmRbaV1bal0pIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEteD1cIiR7aX1cIl1bZGF0YS15PVwiJHtqfVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJleGlzdC1zaGlwXCIpXG4gICAgICB9XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==