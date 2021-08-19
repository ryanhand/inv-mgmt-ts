import { useState } from "react";
import { toast } from "react-toastify";
import { addItem } from "./api/itemsApi";
import { Input } from "./shared/Input";
import { Select } from "./shared/Select";
import { useHistory } from "react-router-dom";

export type NewItem = {
  name: string;
  category: string;
  onHandQty: number;
  safetyStockQty: number;
};

const emptyItem: NewItem = {
  name: "",
  category: "",
  onHandQty: 0,
  safetyStockQty: 0,
};

export function FoodForm() {
  const [newItem, setNewItem] = useState<NewItem>(emptyItem);
  const history = useHistory();

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = event.target;
    setNewItem({
      ...newItem,
      [id]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await addItem(newItem);
      toast.success("item added");
      history.push("/"); // redirect to home
    } catch (error) {
      toast.error("failed to add");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input onChange={onChange} label="Name" id="name" value={newItem.name} />
      <Select
        id="category"
        label="Category"
        onChange={onChange}
        placeholderOption="Select Type"
        value={newItem.category}
        options={[
          { label: "Exterior", value: "exterior" },
          { label: "Engine", value: "engine" },
        ]}
      />
      <Input
        onChange={onChange}
        id="onHandQty"
        label="On Hand"
        value={newItem.onHandQty.toString()}
      />
      <Input
        onChange={onChange}
        id="safetyStockQty"
        label="Safety Stock"
        value={newItem.safetyStockQty.toString()}
      />
      <input className="btn btn-primary" type="submit" value="Save Food" />
    </form>
  );
}
