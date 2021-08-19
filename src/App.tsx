import { useEffect, useState } from "react";
import { getItems, deleteItem } from "./api/itemsApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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

      <Link to="/item">Add Food</Link>
      <table>
        <thead>
          <th>Name</th>
          <th>Category</th>
          <th>On Hand</th>
          <th>Safety Stock</th>
          <th></th>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td>
                <Link to={"/item/" + item.id}>{item.name}</Link>
              </td>
              <td>{item.category}</td>
              <td>{item.onHandQty}</td>
              <td>{item.safetyStockQty}</td>
              <button
                onClick={async () => {
                  await deleteItem(item.id);
                  setItems(items.filter((i) => i.id !== item.id));
                }}
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
