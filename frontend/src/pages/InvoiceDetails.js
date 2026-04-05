export function InvoiceDetails({ data, id }) {
  const invoice = data.find((d) => d.id === id);

  if (!invoice) {
    return (
      <div className="body">
        <h1 className="master">Invoice not found</h1>
      </div>
    );
  }

  return (
    <div className="boss">
      <div className="body">
        <h1 className="master">Invoice Details</h1>
        <div className="customer-container">
          <div className="invoiceId">
            <h3 className="details">Customer Details</h3>
            <div className="invoiceDiv">
              <span>{invoice.invoiceID}</span>
            </div>
          </div>
          <hr />
          <div>
            <p>Name : {invoice.customerName}</p>
            <p>Address : {invoice.address}</p>
            <p>Pan Card : {invoice.pan}</p>
            <p>GST Num : {invoice.gstNum || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="body space">
        <div className="customer-container">
          <h3 className="details">Items</h3>
          <hr />
          <div className="boss">
            <div className="main-div">
              <div className="div1">
                <p>Name</p>
                <p className="laptop">{invoice.items}</p>
              </div>
              <div className="div2">
                <p>Quantity</p>
                <div className="btnspan">
                  <span className="span">
                    <span className="number span">{invoice.number}</span>
                  </span>
                </div>
              </div>
              <div className="div3">
                <p>Price</p>
                <div className="btnspan">
                  <span className="number span">
                    ₹ {(invoice.amount * invoice.number).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {!invoice.gstNum && (
              <div className="main-div">
                <div className="div1">
                  <p>GST 18%</p>
                </div>
                <div className="gst">
                  <div className="gstAmount">
                    <p>₹ {(invoice.amount * invoice.number * 0.18).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}

            <hr className="horizontal-space" />
            <div className="main-div">
              <div className="div1">
                <p className="white">spacer</p>
              </div>
              <div className="div2">
                <p>Total</p>
              </div>
              <div className="div3">
                <span className="number span">₹ {parseFloat(invoice.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
