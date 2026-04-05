import { Card } from '../../components/Card';
import { AddCustomer } from './AddCustomer';
import { useState } from 'react';

export function CustomerBody({ customers, setCustomer }) {
  const [addCustomer, setAddCustomer] = useState(false);

  function handleAddCustomer(newCustomer) {
    setCustomer((prev) => [...prev, newCustomer]);
    setAddCustomer(false);
  }

  async function handleDeleteCustomer(id) {
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCustomer((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert('Failed to delete customer');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting customer');
    }
  }

  return addCustomer ? (
    <AddCustomer
      setCustomers={handleAddCustomer}
      handleCancel={() => setAddCustomer(false)}
      customers={customers}
    />
  ) : (
    <Customers
      onAddCustomer={setAddCustomer}
      customers={customers}
      handleDeleteCustomer={handleDeleteCustomer}
    />
  );
}

function Customers({ onAddCustomer, customers, handleDeleteCustomer }) {
  return (
    <div className="customer-body">
      <h1 className="master">Customers</h1>
      <div className="Add-div">
        <div className="Add-btn" onClick={() => onAddCustomer(true)}>
          + Add
        </div>
      </div>
      <div className="flex-container">
        {customers.length === 0 && (
          <p style={{ marginLeft: '34px', marginTop: '20px', color: '#666', fontWeight: 400 }}>
            No customers yet. Click Add to create one.
          </p>
        )}
        {customers.map((customer) => (
          <Card key={customer.id}>
            <span>{customer.name}</span>
            <div className={customer.status === 'Active' ? 'active' : 'In-Active'}>
              <span className="span-active">{customer.status}</span>
            </div>
            <button className="delete-button" onClick={() => handleDeleteCustomer(customer.id)}>
              X
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
