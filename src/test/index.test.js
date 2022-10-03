import { capitalize } from ".."

test("capitalize", () => {
  expect(capitalize("something")).toBe("SOMETHING")
})
