import { Ship, Gameboard } from ".."

test("Ship Factory", () => {
  let ship = Ship(5)
  expect(ship.isSunk()).toBe(false)
  ship.hit()
  expect(ship.isHit).toBe(1)
})

test("Gameboard Factory", () => {
  let gameboard = Gameboard()
  let x = 0
  let y = 0
  let ship = Ship(5)
  gameboard.placeShip(x, y, ship)
  for (let i = 0; i < ship.length; i++) {
    expect(gameboard.board[x][y + i]).toBeTruthy()
  }
  expect(gameboard.receiveAttack(x, y)).toBe(true)
  expect(gameboard.receiveAttack(9, 9)).toBe(false)
  gameboard.carrier.isHit = 5
  gameboard.battleship.isHit = 4
  gameboard.cruiser.isHit = 3
  gameboard.submarine.isHit = 3
  gameboard.destroyer.isHit = 2
  expect(gameboard.gameOver()).toBe(true)
})
