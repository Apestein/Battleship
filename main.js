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
        if (gameBoard1.gameOver()) {
          document.querySelector("#result").textContent =
            "Gameover! Computer Wins"
          document.querySelector(".player1").style.pointerEvents = "none"
          document.querySelector(".player2").style.pointerEvents = "none"
        }
      }
      square2.onclick = (e) => {
        const isHit = gameBoard2.receiveAttack(i, j)
        if (isHit) e.target.classList.add("hit")
        else e.target.classList.add("not-hit")
        e.target.style.pointerEvents = "none"
        if (gameBoard2.gameOver()) {
          document.querySelector("#result").textContent =
            "Gameover! Player Wins"
          document.querySelector(".player1").style.pointerEvents = "none"
          document.querySelector(".player2").style.pointerEvents = "none"
        } else (0,_index__WEBPACK_IMPORTED_MODULE_0__.computerPlay)()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgU2hpcCwgR2FtZWJvYXJkLCBjb21wdXRlclBsYXksIHJhbmRvbWl6ZSB9XG5pbXBvcnQgeyBkaXNwbGF5U2V0dXAgfSBmcm9tIFwiLi91aVwiXG5cbmZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGlzSGl0OiAwLFxuICAgIGhpdCgpIHtcbiAgICAgIHRoaXMuaXNIaXQrK1xuICAgIH0sXG4gICAgaXNTdW5rKCkge1xuICAgICAgaWYgKHRoaXMuaXNIaXQgPT0gbGVuZ3RoKSByZXR1cm4gdHJ1ZVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgfVxufVxuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gQXJyYXkoMTApXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykgYm9hcmRbaV0gPSBBcnJheSgxMClcblxuICBjb25zdCBjYXJyaWVyID0gU2hpcCg1KVxuICBjb25zdCBiYXR0bGVzaGlwID0gU2hpcCg0KVxuICBjb25zdCBjcnVpc2VyID0gU2hpcCgzKVxuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKDMpXG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoMilcblxuICBmdW5jdGlvbiBwbGFjZVNoaXAoeCwgeSwgc2hpcCwgYXhpcykge1xuICAgIGlmIChheGlzID09IFwieVwiICYmIHkgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm5cbiAgICBpZiAoYXhpcyA9PSBcInhcIiAmJiB4ICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChheGlzID09IFwieVwiICYmIHRoaXMuYm9hcmRbeF1beSArIGldKSByZXR1cm5cbiAgICAgIGlmIChheGlzID09IFwieFwiICYmIHRoaXMuYm9hcmRbeCArIGldW3ldKSByZXR1cm5cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChheGlzID09IFwieVwiKSB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHNoaXBcbiAgICAgIGVsc2UgdGhpcy5ib2FyZFt4ICsgaV1beV0gPSBzaGlwXG4gICAgfVxuICAgIHJldHVybiBzaGlwXG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT0gXCJvYmplY3RcIikge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKVxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHRydWVcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jYXJyaWVyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmJhdHRsZXNoaXAuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuY3J1aXNlci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zdWJtYXJpbmUuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZGVzdHJveWVyLmlzU3VuaygpXG4gICAgKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgY2FycmllcixcbiAgICBiYXR0bGVzaGlwLFxuICAgIGNydWlzZXIsXG4gICAgc3VibWFyaW5lLFxuICAgIGRlc3Ryb3llcixcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnYW1lT3ZlcixcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKClcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHJhbmRvbWl6ZSgpXG5cbiAgZGlzcGxheVNldHVwKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKVxufVxuXG5mdW5jdGlvbiBjb21wdXRlclBsYXkoKSB7XG4gIGNvbnN0IG5vdEhpdCA9IFtdXG4gIGNvbnN0IG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5ZXIxPi5jZWxsXCIpXG4gIGZvciAobGV0IG5vZGUgb2Ygbm9kZUxpc3QpIHtcbiAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgfHwgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJub3QtaGl0XCIpKVxuICAgICAgY29udGludWVcbiAgICBub3RIaXQucHVzaChub2RlKVxuICB9XG4gIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm90SGl0Lmxlbmd0aClcbiAgbm90SGl0W2luZGV4XS5jbGljaygpXG59XG5cbmZ1bmN0aW9uIHJhbmRvbWl6ZShuZXdCb2FyZCwgc2hpcHMpIHtcbiAgbmV3Qm9hcmQgPSBuZXdCb2FyZCA/PyBHYW1lYm9hcmQoKVxuICBzaGlwcyA9IHNoaXBzID8/IFtcbiAgICBuZXdCb2FyZC5jYXJyaWVyLFxuICAgIG5ld0JvYXJkLmJhdHRsZXNoaXAsXG4gICAgbmV3Qm9hcmQuY3J1aXNlcixcbiAgICBuZXdCb2FyZC5zdWJtYXJpbmUsXG4gICAgbmV3Qm9hcmQuZGVzdHJveWVyLFxuICBdXG4gIGlmICghc2hpcHMubGVuZ3RoKSByZXR1cm4gbmV3Qm9hcmRcblxuICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICBsZXQgYXhpcyA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyBcInlcIiA6IFwieFwiXG4gIGxldCBpc1BsYWNlZCA9IG5ld0JvYXJkLnBsYWNlU2hpcCh4LCB5LCBzaGlwc1swXSwgYXhpcylcbiAgaWYgKGlzUGxhY2VkKSBzaGlwcy5zaGlmdCgpXG4gIHJldHVybiByYW5kb21pemUobmV3Qm9hcmQsIHNoaXBzKVxufVxuXG5zdGFydEdhbWUoKVxuIiwiZXhwb3J0IHsgZGlzcGxheUJvYXJkLCBkaXNwbGF5U2V0dXAgfVxuaW1wb3J0IHsgY29tcHV0ZXJQbGF5LCByYW5kb21pemUgfSBmcm9tIFwiLi9pbmRleFwiXG5cbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZChnYW1lQm9hcmQxLCBnYW1lQm9hcmQyKSB7XG4gIGNvbnN0IHBsYXllcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjFcIilcbiAgY29uc3QgcGxheWVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMlwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBjb25zdCBzcXVhcmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpXG4gICAgICBzcXVhcmUyLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpXG4gICAgICBpZiAoZ2FtZUJvYXJkMS5ib2FyZFtpXVtqXSkgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJleGlzdC1zaGlwXCIpXG4gICAgICBpZiAoZ2FtZUJvYXJkMi5ib2FyZFtpXVtqXSkgc3F1YXJlMi5jbGFzc0xpc3QuYWRkKFwiZXhpc3Qtc2hpcFwiKVxuICAgICAgc3F1YXJlLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpc0hpdCA9IGdhbWVCb2FyZDEucmVjZWl2ZUF0dGFjayhpLCBqKVxuICAgICAgICBpZiAoaXNIaXQpIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcbiAgICAgICAgZWxzZSBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibm90LWhpdFwiKVxuICAgICAgICBlLnRhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgaWYgKGdhbWVCb2FyZDEuZ2FtZU92ZXIoKSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzdWx0XCIpLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIFwiR2FtZW92ZXIhIENvbXB1dGVyIFdpbnNcIlxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMVwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjJcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNxdWFyZTIub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZUJvYXJkMi5yZWNlaXZlQXR0YWNrKGksIGopXG4gICAgICAgIGlmIChpc0hpdCkgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuICAgICAgICBlbHNlIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJub3QtaGl0XCIpXG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICBpZiAoZ2FtZUJvYXJkMi5nYW1lT3ZlcigpKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXN1bHRcIikudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgXCJHYW1lb3ZlciEgUGxheWVyIFdpbnNcIlxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMVwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjJcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIH0gZWxzZSBjb21wdXRlclBsYXkoKVxuICAgICAgfVxuICAgICAgcGxheWVyMS5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgICBwbGF5ZXIyLmFwcGVuZENoaWxkKHNxdWFyZTIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpIHtcbiAgY29uc3QgcmFuZG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyYW5kb20tYnRuXCIpXG4gIHJhbmRvbUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHBsYXllckJvYXJkID0gcmFuZG9taXplKClcbiAgICB1cGRhdGVCb2FyZChwbGF5ZXJCb2FyZC5ib2FyZClcbiAgICBjb25zdCBpbWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwcz5pbWdcIilcbiAgICBmb3IgKGxldCBpbWcgb2YgaW1ncykgaW1nLnJlbW92ZSgpXG4gIH1cbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWJ0blwiKVxuICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBzPmltZ1wiKS5sZW5ndGggIT0gMCkgcmV0dXJuXG4gICAgZGlzcGxheUJvYXJkKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gIH1cbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGUtYnRuXCIpXG4gIHJvdGF0ZUJ0bi5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBzaGlwSW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwcz5pbWdcIilcbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcInlcIikge1xuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInhcIilcbiAgICAgIGZvciAobGV0IGltZyBvZiBzaGlwSW1hZ2VzKSBpbWcuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoOTBkZWcpXCJcbiAgICB9IGVsc2Uge1xuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInlcIilcbiAgICAgIGZvciAobGV0IGltZyBvZiBzaGlwSW1hZ2VzKSBpbWcuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoMClcIlxuICAgIH1cbiAgfVxuICBjb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2NhcnJpZXInXVwiKVxuICBjb25zdCBiYXR0bGVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2JhdHRsZXNoaXAnXVwiKVxuICBjb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2NydWlzZXInXVwiKVxuICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW1nW2FsdD0nc3VibWFyaW5lJ11cIilcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1thbHQ9J2Rlc3Ryb3llciddXCIpXG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZVNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxuICBmb3IgKGxldCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBlLnRhcmdldC5hbHQpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZXR1cC1ib2FyZFwiKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGAke2l9YClcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgYCR7an1gKVxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICBsZXQgYXhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlLWJ0blwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhXCIpXG4gICAgICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoaSwgaiwgcGxheWVyQm9hcmRbZGF0YV0sIGF4aXMpXG4gICAgICAgIGlmIChwbGFjZWRTaGlwKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwbGFjZWRTaGlwLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZiAoYXhpcyA9PSBcInlcIilcbiAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEteD1cIiR7aX1cIl1bZGF0YS15PVwiJHtqICsga31cIl1gKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiZXhpc3Qtc2hpcFwiKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS14PVwiJHtpICsga31cIl1bZGF0YS15PVwiJHtqfVwiXWApXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJleGlzdC1zaGlwXCIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFsdCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW1nW2FsdD1cIiR7c291cmNlQWx0fVwiXWApLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS50YWJsZShwbGF5ZXJCb2FyZC5ib2FyZClcbiAgICAgIH0pXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpXG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZChib2FyZCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2V0dXAtYm9hcmQgLmV4aXN0LXNoaXBcIilcbiAgZm9yIChsZXQgY2VsbCBvZiBjZWxscykgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZXhpc3Qtc2hpcFwiKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKylcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGlmIChib2FyZFtpXVtqXSkge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS14PVwiJHtpfVwiXVtkYXRhLXk9XCIke2p9XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImV4aXN0LXNoaXBcIilcbiAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9