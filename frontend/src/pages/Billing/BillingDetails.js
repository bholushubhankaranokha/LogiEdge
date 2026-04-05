export function BillingDetails({
  setCustomerBilling, selectedCustomer,
  setSelectedItem, setIsItemPopupOpen,
  setBillingDetails, items,
}) {
  function onBill() {
    const activeItems = items.filter((i) => i.status === 'Active');
    if (items.length === 0) return alert('Please add Items first to proceed.');
    if (activeItems.length === 0) return alert('No active items available.');
    setIsItemPopupOpen(true);
    setSelectedItem(true);
    setBillingDetails(false);
  }

  return (
    <div>
      <div className="body">
        <h1 className="master">Billing</h1>
        <div className="customer-container">
          <h3 className="details">Customer Details</h3>
          <hr />
          <div>
            <p>Name <span>: {selectedCustomer.name}</span></p>
            <p>Address <span>: {selectedCustomer.address}</span></p>
            <p>Pan Card <span>: {selectedCustomer.panCardNumber}</span></p>
            <p>GST Number <span>: {selectedCustomer.GSTNumber || 'Not Registered'}</span></p>
          </div>
        </div>
      </div>

      <div className="body space">
        <div className="customer-container">
          <h3 className="details">Items</h3>
          <hr />
          <div className="center-add">
            <div className="Add-btn" onClick={onBill}>+ ADD</div>
          </div>
        </div>
      </div>
    </div>
  );
}
