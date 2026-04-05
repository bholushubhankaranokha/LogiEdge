import { useState } from 'react';

function generateInvoiceID() {
  return 'INVC' + Math.floor(Math.random() * 900000 + 100000).toString();
}

export function TotalBill({
  currentSelectedItem, selectedCustomer,
  setTotalBill, setBillingDetails, setFinalBill,
  number, setNumber, data, setData, setInvoiceId,
}) {
  const [loading, setLoading] = useState(false);
  // BUG FIX: generate once on mount — was regenerating on every qty +/- re-render
  const [invoiceID] = useState(generateInvoiceID);

  const amount = parseFloat(currentSelectedItem.sellingPrice);
  const subtotal = amount * number;
  const isGSTRegistered = !!(selectedCustomer.GSTNumber && selectedCustomer.GSTNumber.trim());
  const gstAmount   = isGSTRegistered ? 0 : subtotal * 0.18;
  const totalAmount = subtotal + gstAmount;

  async function handleCreate() {
    setLoading(true);
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId:   invoiceID,
          customerName: selectedCustomer.name,
          itemName:    currentSelectedItem.itemName,
          amount,
          quantity:    number,
          totalAmount,
          address:     selectedCustomer.address,
          pan:         selectedCustomer.panCardNumber,
          gstNum:      selectedCustomer.GSTNumber || null,
        }),
      });
      const resData = await res.json();
      if (!res.ok) return alert(resData.error || 'Failed to create invoice');

      setData([...data, {
        id:           resData.id,
        invoiceID:    resData.invoice_id,
        customerName: resData.customer_name,
        items:        resData.item_name,
        amount:       parseFloat(resData.amount),
        number:       resData.quantity,
        totalAmount:  parseFloat(resData.total_amount),
        address:      resData.address,
        pan:          resData.pan,
        gstNum:       resData.gst_num || '',
      }]);
      setInvoiceId(invoiceID);
      setTotalBill(false);
      setFinalBill(true);
    } catch (err) {
      console.error(err);
      alert('Server error. Could not save invoice.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="boss">
      <div className="body">
        <h1 className="master">Billing</h1>
        <div className="customer-container">
          <h3 className="details">Customer Details</h3>
          <hr />
          <div>
            <p>Name : {selectedCustomer.name}</p>
            <p>Address : {selectedCustomer.address}</p>
            <p>Pan Card : {selectedCustomer.panCardNumber}</p>
            <p>GST Number : {selectedCustomer.GSTNumber || 'Not Registered'}</p>
          </div>
        </div>
      </div>

      <div className="body space">
        <div className="customer-container" style={{ height: 'auto', paddingBottom: '20px' }}>
          <h3 className="details">Items</h3>
          <hr />
          <div className="boss">
            <div className="main-div">
              <div className="div1">
                <p>Name</p>
                <p className="laptop">{currentSelectedItem.itemName}</p>
              </div>
              <div className="div2">
                <p>Qty</p>
                <div className="btnspan">
                  <span className="span">
                    <button className="button" onClick={() => setNumber((n) => Math.max(1, n - 1))}>-</button>
                    <span className="number span">{number}</span>
                    <button className="button" onClick={() => setNumber((n) => n + 1)}>+</button>
                  </span>
                </div>
              </div>
              <div className="div3">
                <p>Price</p>
                <div className="btnspan">
                  <span className="number span">₹ {subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {!isGSTRegistered && (
              <div className="main-div">
                <div className="div1"><p>GST 18%</p></div>
                <div className="gst">
                  <div className="gstAmount"><p>₹ {gstAmount.toFixed(2)}</p></div>
                </div>
              </div>
            )}

            {isGSTRegistered && (
              <div className="main-div">
                <div className="div1">
                  <p style={{ color: '#00680a', fontSize: '16px' }}>GST Registered – GST Not Applied</p>
                </div>
              </div>
            )}

            <hr className="horizontal-space" />
            <div className="main-div">
              <div className="div1"><p className="white">spacer</p></div>
              <div className="div2"><p>Total</p></div>
              <div className="div3">
                <span className="number span">₹ {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="btndiv">
            <button className="Cancel-btn" onClick={() => { setTotalBill(false); setBillingDetails(true); }} disabled={loading}>
              Cancel
            </button>
            <button className="Create-btn" onClick={handleCreate} disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
