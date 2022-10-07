export { displayBoard }
import { computerPlay } from "./index"

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
        computerPlay()
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
