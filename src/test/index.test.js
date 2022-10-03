import { Ship } from ".."

test("Ship Factory", () => {
  let ship = Ship(5)
  expect(Ship(5).length).toBe(5)
  expect(Ship(5).isHit.length).toBe(5)
  expect(Ship(5).isSunk()).toBe(false)
  ship.hit(0)
  expect(ship.isHit[0]).toBe(true)
})
