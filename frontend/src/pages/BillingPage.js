import { useEffect, useState } from 'react';
import { CustomerDetails }  from './Billing/CustomerDetails';
import { SelectCustomer }   from './Billing/SelectCustomer';
import { BillingDetails }   from './Billing/BillingDetails';
import { SelectItem }       from './Billing/SelectItem';
import { TotalBill }        from './Billing/TotalBill';
import { FinalBill }        from './Billing/FinalBill';

export function Billing({
  customers, items, data, setData,
  customerBilling, setCustomerBilling,
  selectCustomer, setSelectCustomer,
  billingDetails, setBillingDetails,
  selectedItem, setSelectedItem,
  invoiceId, setInvoiceId,
}) {
  const [isPopupOpen, setIsPopupOpen]           = useState(false);
  const [isItemPopupOpen, setIsItemPopupOpen]   = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentSelectedItem, setCurrentSelectedItem] = useState(null);
  const [totalBill, setTotalBill]               = useState(false);
  const [finalBill, setFinalBill]               = useState(false);
  const [number, setNumber]                     = useState(1);

  useEffect(() => {
    if (billingDetails) {
      setSelectCustomer(false);
      setIsPopupOpen(false);
      setCustomerBilling(false);
    }
  }, [billingDetails, setSelectCustomer, setCustomerBilling]);

  useEffect(() => {
    if (customerBilling) {
      setSelectCustomer(false);
      setIsPopupOpen(false);
      setBillingDetails(false);
    }
  }, [customerBilling, setSelectCustomer, setBillingDetails]);

  useEffect(() => {
    if (totalBill) {
      setSelectCustomer(false);
      setIsItemPopupOpen(false);
      setCustomerBilling(false);
      setSelectedItem(false);
    }
  }, [totalBill, setSelectCustomer, setCustomerBilling, setSelectedItem]);

  return (
    <>
      {customerBilling && (
        <CustomerDetails
          customerBilling={customerBilling}
          selectCustomer={selectCustomer}
          setSelectCustomer={setSelectCustomer}
          setCustomerBilling={setCustomerBilling}
          setPopupOpen={setIsPopupOpen}
          selectedCustomer={selectedCustomer}
          customers={customers}
        />
      )}

      {selectCustomer && (
        <SelectCustomer
          customers={customers}
          isPopupOpen={isPopupOpen}
          setPopupOpen={setIsPopupOpen}
          setSelectCustomer={setSelectCustomer}
          setCustomerBilling={setCustomerBilling}
          setBillingDetails={setBillingDetails}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}

      {billingDetails && selectedCustomer && (
        <BillingDetails
          setCustomerBilling={setCustomerBilling}
          selectedCustomer={selectedCustomer}
          setSelectedItem={setSelectedItem}
          setIsItemPopupOpen={setIsItemPopupOpen}
          setBillingDetails={setBillingDetails}
          items={items}
        />
      )}

      {selectedItem && (
        <SelectItem
          items={items}
          setCurrentSelectedItem={setCurrentSelectedItem}
          isItemPopupOpen={isItemPopupOpen}
          setIsItemPopupOpen={setIsItemPopupOpen}
          setCustomerBilling={setCustomerBilling}
          setBillingDetails={setBillingDetails}
          setSelectedItem={setSelectedItem}
          setTotalBill={setTotalBill}
        />
      )}

      {totalBill && currentSelectedItem && (
        <TotalBill
          currentSelectedItem={currentSelectedItem}
          selectedCustomer={selectedCustomer}
          setTotalBill={setTotalBill}
          setBillingDetails={setBillingDetails}
          setFinalBill={setFinalBill}
          number={number}
          setNumber={setNumber}
          data={data}
          setData={setData}
          invoiceId={invoiceId}
          setInvoiceId={setInvoiceId}
        />
      )}

      {finalBill && currentSelectedItem && (
        <FinalBill
          currentSelectedItem={currentSelectedItem}
          selectedCustomer={selectedCustomer}
          number={number}
          invoiceId={invoiceId}
        />
      )}
    </>
  );
}
