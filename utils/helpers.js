export function* values(obj) {
  for (let prop of Object.keys(obj)) {
    yield obj[prop]
  }
}