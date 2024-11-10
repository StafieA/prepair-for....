import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <LogoHeader />
      <Form setItems={setItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function LogoHeader() {
  return <h1>🌴🍸Far Away💼🛫</h1>;
}
function Form({ setItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //function handleAddItems(item) {}

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setItems((items) => [newItem, ...items]);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤔</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}
function PackingList({ items, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ itemObj, handleDeleteItem }) {
  return (
    <li>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => handleDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list and you already packedX(X%)</em>
    </footer>
  );
}

export default App;
