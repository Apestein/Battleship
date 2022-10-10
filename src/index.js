export { Ship, Gameboard, computerPlay, randomize }
import { displaySetup } from "./ui"

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

  displaySetup(playerBoard, computerBoard)
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
