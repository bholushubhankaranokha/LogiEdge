import { Card } from '../../components/Card';
import { AddItem } from './AddItem';
import { useState } from 'react';

export function ItemBody({ items, setItems }) {
  const [addItem, setAddItem] = useState(false);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
    setAddItem(false);
  }

  async function handleDeleteItem(id) {
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting item');
    }
  }

  return addItem ? (
    <AddItem
      setItems={handleAddItem}
      items={items}
      handleCancel={() => setAddItem(false)}
    />
  ) : (
    <Items
      onAddItem={setAddItem}
      items={items}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

function Items({ onAddItem, items, handleDeleteItem }) {
  return (
    <div className="customer-body">
      <h1 className="master">Items</h1>
      <div className="Add-div">
        <div className="Add-btn" onClick={() => onAddItem(true)}>
          + Add
        </div>
      </div>
      <div className="flex-container">
        {items.length === 0 && (
          <p style={{ marginLeft: '34px', marginTop: '20px', color: '#666', fontWeight: 400 }}>
            No items yet. Click Add to create one.
          </p>
        )}
        {items.map((item) => (
          <Card key={item.id}>
            <span>{item.itemName}</span>
            <div className={item.status === 'Active' ? 'active' : 'In-Active'}>
              <span className="span-active">{item.status}</span>
            </div>
            <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
              X
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
