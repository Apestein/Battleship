export { Ship, Gameboard, computerPlay }
import { displayBoard } from "./ui"

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
  displayBoard(playerBoard, computerBoard)
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
