import { Item } from "../Home";
import { NewItem } from "../ItemForm";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getItems() {
  const response = await fetch(baseUrl + "items");
  if (!response.ok) throw new Error("Call to get items failed.");
  return response.json() as Promise<Item[]>;
}

export async function getItem(id: number) {
  const response = await fetch(baseUrl + "items/" + id);
  if (!response.ok) throw new Error("Call to get items failed.");
  return response.json() as Promise<Item>;
}

export async function deleteItem(id: number) {
  const response = await fetch(baseUrl + "items/" + id, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Delete failed");
  return response.json();
}

export async function addItem(item: NewItem) {
  const response = await fetch(baseUrl + "items/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Save failed");
  return response.json() as Promise<Item>;
}

export async function editItem(item: Item) {
  const response = await fetch(baseUrl + "items/" + item.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Save failed");
  return response.json() as Promise<Item>;
}
