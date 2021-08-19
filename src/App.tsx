import { useEffect, useState } from "react";
import { getItems, deleteItem } from "./api/itemsApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Item = {
  id: number;
  name: string;
  category: string;
  onHandQty: number;
  safetyStockQty: number;
};

export function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function callGetItems() {
      const data = await getItems();
      setItems(data);
    }
    callGetItems();
  }, []);

  return (
    <>
      <ToastContainer />
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
              <button
                onClick={async () => {
                  await deleteItem(item.id);
                  setItems(items.filter((i) => i.id !== item.id));
                }}
              >
                Delete
              </button>
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
