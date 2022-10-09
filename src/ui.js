export { displayBoard, displaySetup }
import { computerPlay } from "./index"

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
        computerPlay()
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
