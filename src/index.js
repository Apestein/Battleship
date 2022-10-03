export { Ship }

function Ship(length) {
  return {
    length,
    isHit: Array(length),
    hit(n) {
      this.isHit[n] = true
    },
    isSunk() {
      for (let element of this.isHit) {
        if (element != true) return false
      }
      return true
    },
  }
}
let ship = Ship(5)
console.log(ship.isSunk())
