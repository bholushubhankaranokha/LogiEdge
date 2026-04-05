import { useState } from 'react';

export function AddCustomer({ setCustomers, handleCancel, customers }) {
  const [name, setName]               = useState('');
  const [address, setAddress]         = useState('');
  const [panCardNumber, setPan]       = useState('');
  const [GSTNumber, setGST]           = useState('');
  const [status, setStatus]           = useState('Active');
  const [panError, setPanError]       = useState('');
  const [gstError, setGstError]       = useState('');
  const [loading, setLoading]         = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !address || !panCardNumber || !status) {
      return alert('Please fill in all required fields.');
    }
    if (panCardNumber.length !== 10) {
      return setPanError('PAN Card must be exactly 10 characters');
    }
    if (GSTNumber && GSTNumber.length !== 15) {
      return setGstError('GST Number must be exactly 15 characters');
    }
    if (customers.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      return alert('A customer with this name already exists.');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, panCardNumber, GSTNumber, status }),
      });
      const resData = await res.json();
      if (!res.ok) return alert(resData.error || 'Failed to add customer');

      setCustomers({
        id: resData.id,
        name: resData.name,
        address: resData.address,
        panCardNumber: resData.pan_card_number,
        GSTNumber: resData.gst_number || '',
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
      <h1 className="master">Add New Customer</h1>

      <div className="flex-container">
        <div className="input-box">
          <label>Customer Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter customer name" />
        </div>
        <div className="input-box">
          <label>Customer Address *</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
        </div>
      </div>

      <div className="flex-container">
        <div className="input-box">
          <label>PAN Card Number *</label>
          <input
            maxLength={10} type="text" value={panCardNumber}
            onChange={(e) => { setPan(e.target.value.toUpperCase()); setPanError(''); }}
            placeholder="10 character PAN"
          />
          {panError && <p className="error">{panError}</p>}
        </div>
        <div className="input-box">
          <label>GST Number <span className="optional-label">(Optional)</span></label>
          <input
            maxLength={15} type="text" value={GSTNumber}
            onChange={(e) => { setGST(e.target.value.toUpperCase()); setGstError(''); }}
            placeholder="15 character GST (if applicable)"
          />
          {gstError && <p className="error">{gstError}</p>}
          <p className="gst-hint">* If GST number is provided, GST will NOT be added to billing amount.</p>
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
