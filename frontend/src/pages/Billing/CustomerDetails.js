export function CustomerDetails({ customerBilling, setSelectCustomer, customers, setCustomerBilling, setPopupOpen }) {
  function openPopup() {
    const activeCustomers = customers.filter((c) => c.status === 'Active');
    if (customers.length === 0) return alert('Please add a Customer first to proceed.');
    if (activeCustomers.length === 0) return alert('No active customers available.');
    setPopupOpen(true);
    setSelectCustomer(true);
    setCustomerBilling(false);
  }

  return (
    <>
      {customerBilling && (
        <div className="body">
          <h1 className="master">Billing</h1>
          <div className="customer-container">
            <h3 className="details">Customer Details</h3>
            <hr />
            <div className="center-add">
              <div className="Add-btn" onClick={openPopup}>+ ADD</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
