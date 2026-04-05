import { useState } from 'react';

export function AddItem({ setItems, items, handleCancel }) {
  const [itemName, setItemName]     = useState('');
  const [sellingPrice, setPrice]    = useState('');
  const [status, setStatus]         = useState('Active');
  const [loading, setLoading]       = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemName || !sellingPrice) return alert('Please fill in all required fields.');
    if (parseFloat(sellingPrice) <= 0) return alert('Selling price must be greater than 0.');
    if (items.some((i) => i.itemName.toLowerCase() === itemName.toLowerCase())) {
      return alert('An item with this name already exists.');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, sellingPrice: parseFloat(sellingPrice), status }),
      });
      const resData = await res.json();
      if (!res.ok) return alert(resData.error || 'Failed to add item');

      setItems({
        id: resData.id,
        itemName: resData.item_name,
        sellingPrice: parseFloat(resData.selling_price),
        status: resData.status,
      });
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="customer-body" onSubmit={handleSubmit}>
      <h1 className="master">Add New Item</h1>

      <div className="flex-container">
        <div className="input-box">
          <label>Item Name *</label>
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Enter item name" />
        </div>
        <div className="input-box">
          <label>Selling Price (₹) *</label>
          <input type="number" value={sellingPrice} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" min="1" />
        </div>
      </div>

      <div className="flex-container">
        <div className="input-box">
          <label>Status *</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="In-Active">In-Active</option>
          </select>
        </div>
      </div>

      <button type="button" onClick={handleCancel} className="Cancel-btn" disabled={loading}>Cancel</button>
      <button type="submit" className="Create-btn" disabled={loading}>{loading ? 'Saving...' : 'Create'}</button>
    </form>
  );
}
