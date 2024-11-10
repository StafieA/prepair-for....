import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import LogoHeader from "./LogoHeader";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirm = window.confirm(
      "Are you sure you want to delete the list ?"
    );
    if (confirm) setItems([]);
  }
  return (
    <div className="app">
      <LogoHeader />
      <Form setItems={setItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
