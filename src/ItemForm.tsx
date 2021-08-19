import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addItem, editItem, getItem } from "./api/itemsApi";
import { Input } from "./shared/Input";
import { Select } from "./shared/Select";
import { useHistory, useParams } from "react-router-dom"; // useParams allows you to read params from the url
import { Item } from "./App";

/*
get the matching food via fetch
  - create the function that does it
  - useEffect to load it
populate the form
save the values
return to app
*/

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

export function ItemForm() {
  const [item, setItem] = useState<NewItem | Item>(emptyItem);
  const history = useHistory();
  const { itemId }: any = useParams();

  useEffect(() => {
    async function callGetItem() {
      setItem(await getItem(itemId));
    }
    if (itemId) callGetItem();
  }, [itemId]);

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = event.target;
    // create a copy of the existing state, but change the name property to the new value (so we're not changing state, ie. the ref to the object is the same)
    setItem({
      ...item, // spread syntax
      [id]: value, // computed property
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevents the browser from reloading the screen by default (which happens when a form is submitted)
    try {
      itemId ? await editItem({ ...item, id: itemId }) : await addItem(item);
      toast.success("Item saved.");
      history.push("/"); // redirect to home
    } catch (error) {
      toast.error("failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{itemId ? "Edit" : "Add"} Food</h1>
      <Input onChange={onChange} label="Name" id="name" value={item.name} />
      <Select
        id="category"
        label="Category"
        onChange={onChange}
        placeholderOption="Select Type"
        value={item.category}
        options={[
          { label: "Exterior", value: "exterior" },
          { label: "Engine", value: "engine" },
        ]}
      />
      <Input
        onChange={onChange}
        id="onHandQty"
        label="On Hand"
        value={item.onHandQty.toString()}
      />
      <Input
        onChange={onChange}
        id="safetyStockQty"
        label="Safety Stock"
        value={item.safetyStockQty.toString()}
      />
      <input className="btn btn-primary" type="submit" value="Save Item" />
    </form>
  );
}
