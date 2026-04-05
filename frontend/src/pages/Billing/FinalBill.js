export function FinalBill({ currentSelectedItem, selectedCustomer, number, invoiceId }) {
  const amount = parseFloat(currentSelectedItem.sellingPrice);
  const subtotal = amount * number;
  const isGSTRegistered = !!(selectedCustomer.GSTNumber && selectedCustomer.GSTNumber.trim());
  const gstAmount   = isGSTRegistered ? 0 : subtotal * 0.18;
  const totalAmount = subtotal + gstAmount;

  return (
    <div className="boss">
      <div className="body">
        <h1 className="master">Billing</h1>
        <div className="customer-container">
          <div className="invoiceId">
            <h3 className="details">Customer Details</h3>
            <div className="invoiceDiv"><span>{invoiceId}</span></div>
          </div>
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
                    <span className="number span">{number}</span>
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

          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#00680a', fontWeight: '700', fontSize: '18px' }}>
              ✓ Invoice Created Successfully!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
