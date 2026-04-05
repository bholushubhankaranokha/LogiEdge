import { Card } from '../../components/Card';

export function SelectCustomer({
  customers, isPopupOpen, setPopupOpen,
  setSelectCustomer, setCustomerBilling,
  setBillingDetails, setSelectedCustomer,
}) {
  function closePopup() {
    setPopupOpen(false);
    setSelectCustomer(false);
    setCustomerBilling(true);
  }

  return (
    <div className="body">
      <div className="card-column">
        <h1 className="master">Billing</h1>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button Add-btn" onClick={closePopup}>Close</button>
              <h1 className="master">Customers</h1>
              <div className="flex-container">
                {customers.map((customer) => {
                  const isActive = customer.status === 'Active';
                  return (
                    <div
                      key={customer.id}
                      onClick={() => {
                        if (!isActive) return;
                        setSelectedCustomer(customer);
                        setBillingDetails(true);
                        setSelectCustomer(false);
                        setPopupOpen(false);
                      }}
                      className={isActive ? 'pointer' : ''}
                      title={!isActive ? 'This customer is inactive' : ''}
                    >
                      <Card classs={isActive ? undefined : 'disable'}>
                        <span>{customer.name}</span>
                        <div className={isActive ? 'active' : 'In-Active'}>
                          <span className="span-active">{customer.status}</span>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
