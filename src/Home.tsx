import { getItems, deleteItem } from "./api/itemsApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export type Item = {
  id: number;
  name: string;
  category: string;
  onHandQty: number;
  safetyStockQty: number;
};

export function Home() {
  const { data: items, isLoading } = useQuery("items", getItems);

  if (isLoading || !items) return <p>"Loading..."</p>;

  return (
    <>
      <ToastContainer />
      <h1>Inventory Manager</h1>

      <Link to="/item">Add Food</Link>
      {!items.length ? (
        <p>Uh oh, no items in inventory.</p>
      ) : (
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
                <td
                  style={
                    item.onHandQty < item.safetyStockQty
                      ? {
                          background: "yellow",
                        }
                      : {}
                  }
                >
                  {item.onHandQty}
                </td>
                <td>{item.safetyStockQty}</td>
                <button
                  onClick={async () => {
                    await deleteItem(item.id);
                    // setItems(items.filter((i) => i.id !== item.id));
                  }}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ReactQueryDevtools />
    </>
  );
}
