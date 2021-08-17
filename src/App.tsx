import { useEffect, useState } from "react";
import { getItems } from "./api/itemsApi";

type Item = {
  name: string;
  category: string;
  onHandQty: number;
  safetyStockQty: number;
};

export function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function callGetItems() {
      const respone = await getItems();
      if (!respone.ok) throw new Error("Call to get items failed.");
      const json = await respone.json();
      setItems(json);
    }
    callGetItems();
  }, []);

  return (
    <>
      <h1>Inventory Manager</h1>
      <table>
        <thead>
          <th></th>
          <th>Name</th>
          <th>Category</th>
          <th>On Hand</th>
          <th>Safety Stock</th>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <button onClick={() => alert("clicked")}>Delete</button>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.onHandQty}</td>
              <td>{item.safetyStockQty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
