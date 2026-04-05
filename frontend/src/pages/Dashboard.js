import React, { useState } from 'react';

export function Dashboard({ data, setInvoiceDetails, setDashboard, setId }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  function handleViewDetails(invoiceID, id) {
    setInvoiceDetails(true);
    setDashboard(false);
    setId(id);
    setSelectedInvoice((prev) => (prev === invoiceID ? null : invoiceID));
  }

  const filteredData = data.filter((invoice) =>
    invoice.invoiceID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="body">
        {/* BUG FIX: was showing "Billing" — corrected to "Dashboard" */}
        <h1 className="master">Dashboard</h1>
        <div className="Search">
          <input
            type="text"
            placeholder="Search by Invoice ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="body">
        {filteredData.length === 0 ? (
          <p style={{ marginLeft: '34px', marginTop: '20px', color: '#666' }}>
            No invoices found.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>Invoice ID</td>
                <td>Customer Name</td>
                <td>Item Name</td>
                <td>Amount</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((invoice) => (
                <React.Fragment key={invoice.invoiceID}>
                  <tr>
                    <td>{invoice.invoiceID}</td>
                    <td>{invoice.customerName}</td>
                    <td>{invoice.items}</td>
                    <td>₹ {parseFloat(invoice.totalAmount).toFixed(2)}</td>
                    <td>
                      <button
                        className="Viewbutton"
                        onClick={() => handleViewDetails(invoice.invoiceID, invoice.id)}
                      >
                        {selectedInvoice === invoice.invoiceID ? 'Close' : 'View'}
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
