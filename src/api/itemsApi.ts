import { NewItem } from "../ItemForm";

export async function getItems() {
  const response = await fetch("http://localhost:3001/items");
  if (!response.ok) throw new Error("Call to get items failed.");
  return response.json();
}

export async function deleteItem(id: number) {
  const response = await fetch("http://localhost:3001/items/" + id, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Delete failed");
  return response.json();
}

export async function addItem(item: NewItem) {
  const response = await fetch("http://localhost:3001/items/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Save failed");
  return response.json();
}
