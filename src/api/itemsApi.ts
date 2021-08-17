export async function getItems() {
  return fetch("http://localhost:3001/items");
}
