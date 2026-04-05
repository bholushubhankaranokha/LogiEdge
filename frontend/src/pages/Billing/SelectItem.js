import { Card } from '../../components/Card';

export function SelectItem({
  items, setCurrentSelectedItem, setIsItemPopupOpen,
  isItemPopupOpen, setBillingDetails, setSelectedItem, setTotalBill,
}) {
  function closePopup() {
    setIsItemPopupOpen(false);
    setCurrentSelectedItem(null);
    setBillingDetails(true);
    setSelectedItem(false);
  }

  return (
    <div className="body">
      <h1 className="master">Billing</h1>
      <div className="card-column">
        {isItemPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button Add-btn" onClick={closePopup}>Close</button>
              <h1 className="master">Items</h1>
              <div className="flex-container">
                {items.map((item) => {
                  const isActive = item.status === 'Active';
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (!isActive) return;
                        setCurrentSelectedItem(item);
                        setTotalBill(true);
                        setSelectedItem(false);
                        setIsItemPopupOpen(false);
                      }}
                      className={isActive ? 'pointer' : ''}
                      title={!isActive ? 'This item is inactive' : ''}
                    >
                      <Card classs={isActive ? undefined : 'disable'}>
                        <span>{item.itemName}</span>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: '#555', paddingLeft: 0, paddingTop: '4px' }}>
                          ₹ {parseFloat(item.sellingPrice).toFixed(2)}
                        </p>
                        <div className={isActive ? 'active' : 'In-Active'}>
                          <span className="span-active">{item.status}</span>
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
