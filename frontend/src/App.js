import { useEffect, useState } from 'react';
import { Master }         from './pages/MasterPage';
import { Dashboard }      from './pages/Dashboard';
import { Billing }        from './pages/BillingPage';
import { InvoiceDetails } from './pages/InvoiceDetails';

export default function App() {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <span className="header-logo">LogiEdge</span>
      <span className="header-tagline">Billing Dashboard By Bholu Shubhankar Anokha</span>
    </div>
  );
}

function Body() {
  const [dashboard, setDashboard] = useState(false);
  const [master,    setMaster]    = useState(true);
  const [billing,   setBilling]   = useState(false);
  const [masterBody,    setMasterBody]    = useState(true);
  const [customerMenu,  setCustomerMenu]  = useState(false);
  const [itemMenu,      setItemMenu]      = useState(false);
  const [customers,     setCustomer]      = useState([]);
  const [items,         setItems]         = useState([]);
  const [data,          setData]          = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [customerBilling,  setCustomerBilling]  = useState(true);
  const [selectCustomer,   setSelectCustomer]   = useState(false);
  const [billingDetails,   setBillingDetails]   = useState(false);
  const [selectedItem,     setSelectedItem]     = useState(false);
  const [average,          setAverage]          = useState(false);
  const [invoiceDetails,   setInvoiceDetails]   = useState(false);
  const [invoiceId,        setInvoiceId]        = useState('');
  const [id,               setId]               = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [custRes, itemRes, invRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/items'),
          fetch('/api/invoices'),
        ]);
        const [custData, itemData, invData] = await Promise.all([
          custRes.json(), itemRes.json(), invRes.json(),
        ]);

        setCustomer(custData.map((c) => ({
          id: c.id, name: c.name, address: c.address,
          panCardNumber: c.pan_card_number,
          GSTNumber: c.gst_number || '',
          status: c.status,
        })));
        setItems(itemData.map((i) => ({
          id: i.id, itemName: i.item_name,
          sellingPrice: parseFloat(i.selling_price),
          status: i.status,
        })));
        setData(invData.map((inv) => ({
          id: inv.id, invoiceID: inv.invoice_id,
          customerName: inv.customer_name, items: inv.item_name,
          amount: parseFloat(inv.amount), number: inv.quantity,
          totalAmount: parseFloat(inv.total_amount),
          address: inv.address, pan: inv.pan,
          gstNum: inv.gst_num || '',
        })));
      } catch (err) {
        console.error('Failed to load data', err);
        alert('Could not connect to server. Make sure backend is running on port 5001.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function handleMaster() {
    setMaster(true); setBilling(false); setDashboard(false);
    setCustomerMenu(false); setItemMenu(false);
    setMasterBody(true); setInvoiceDetails(false);
  }

  function handleDashboard() {
    setMaster(false); setBilling(false);
    setDashboard(true); setInvoiceDetails(false);
  }

  function handleBilling() {
    // reset billing flow each time
    setBilling(false);
    setAverage(true);
    setTimeout(() => { setBilling(true); setAverage(false); }, 100);
    setMaster(false); setDashboard(false);
    setCustomerBilling(true); setSelectCustomer(false);
    setBillingDetails(false); setSelectedItem(false);
    setInvoiceDetails(false);
  }

  const activeTab = dashboard ? 'dashboard' : master ? 'master' : billing ? 'billing' : '';

  if (loading) {
    return (
      <>
        <Navbar onMaster={handleMaster} onDashboard={handleDashboard} onBilling={handleBilling} activeTab="master" />
        <div className="body" style={{ paddingTop: '40px' }}>
          <p style={{ marginLeft: '34px', fontSize: '20px' }}>Loading data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar onMaster={handleMaster} onDashboard={handleDashboard} onBilling={handleBilling} activeTab={activeTab} />

      {dashboard && (
        <Dashboard
          data={data} setData={setData}
          setInvoiceDetails={setInvoiceDetails}
          setDashboard={setDashboard}
          setId={setId}
        />
      )}

      {master && (
        <Master
          masterBody={masterBody}   setMasterBody={setMasterBody}
          customer={customerMenu}   setCustomerMenu={setCustomerMenu}
          itemMenu={itemMenu}       setItemMenu={setItemMenu}
          customers={customers}     setCustomer={setCustomer}
          items={items}             setItems={setItems}
        />
      )}

      {billing && (
        <Billing
          customers={customers}   items={items}
          data={data}             setData={setData}
          customerBilling={customerBilling}   setCustomerBilling={setCustomerBilling}
          selectCustomer={selectCustomer}     setSelectCustomer={setSelectCustomer}
          billingDetails={billingDetails}     setBillingDetails={setBillingDetails}
          selectedItem={selectedItem}         setSelectedItem={setSelectedItem}
          invoiceId={invoiceId}               setInvoiceId={setInvoiceId}
        />
      )}

      {average && <span />}

      {invoiceDetails && <InvoiceDetails data={data} id={id} />}
    </>
  );
}

function Navbar({ onBilling, onMaster, onDashboard, activeTab }) {
  return (
    <div className="navbar-wrapper">
      <ul className="navbar">
        <li onClick={onDashboard} className={activeTab === 'dashboard' ? 'nav-active' : ''}>
          <span className="nav-icon">&#9641;</span> Dashboard
        </li>
        <li onClick={onMaster} className={activeTab === 'master' ? 'nav-active' : ''}>
          <span className="nav-icon">&#9672;</span> Master
        </li>
        <li onClick={onBilling} className={activeTab === 'billing' ? 'nav-active' : ''}>
          <span className="nav-icon">&#9678;</span> Billing
        </li>
      </ul>
    </div>
  );
}
