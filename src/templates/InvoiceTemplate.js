import React from "react";
import logoImg from "../assets/logo.png";

const InvoiceTemplate = React.forwardRef(({ data }, ref) => {
  // Generate a unique  number
  const invoiceNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number

  // Get current date for order date and invoice date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  // Calculate total tax amount
  const totalTaxAmount = data.items.reduce((total, item) => {
    const taxAmount = (item.unit_price * item.quantity * item.tax_rate) / 100;
    return total + taxAmount;
  }, 0);

  // Calculate total price
  const totalPrice = data.items.reduce((total, item) => {
    const itemPrice = item.unit_price * item.quantity - item.discount;
    return total + itemPrice;
  }, 0);

  return (
    <div ref={ref} className="p-4">
      <div className="flex gap-4 justify-between">
        <img src={logoImg} alt="logo" className="w-1/3 max-w-[100px]" />
        <div className="w-2/3 text-right">
          <h1 className="text-xl font-bold">
            Tax Invoice/Bill of Supply/Cash Memo
          </h1>
          <p className="text-gray-500">(Original for Recipient)</p>
        </div>
      </div>

      <div className="grid my-4 grid-cols-2 gap-4">
        <div>
          <h1 className="text-xl font-bold">Sold By:</h1>
          <p>{data.seller.name}</p>
          <p>{data.seller.address}</p>
          <p>{data.seller.city}</p>
          <p>{data.seller.state}</p>
          <p>{data.seller.pincode}</p>
          <p>
            <span className="font-bold">PAN No.:</span> {data.seller.pan_no}
          </p>
          <p>
            <span className="font-bold">GST No. :</span>
            {data.seller.gst_no}
          </p>
        </div>

        <div className="text-right">
          <h1 className="text-xl font-bold">Billing Address:</h1>
          <p>{data.billing.name}</p>
          <p>{data.billing.address}</p>
          <p>{data.billing.city}</p>
          <p>{data.billing.state}</p>
          <p>{data.billing.pincode}</p>
          <p>
            <span className="font-bold">State Code :</span>
            {data.billing.state_code}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p>
          <span className="font-bold">Place of Supply:</span>{" "}
          {data.placeOfSupply}
        </p>
        <p>
          <span className="font-bold">Place of Delivery:</span>{" "}
          {data.placeOfDelivery}
        </p>
      </div>

      <div className="grid my-4 grid-cols-2 gap-4">
        <div>
          <p>
            <span className="font-bold"> Order No.:</span> {orderNumber}
          </p>{" "}
          <p>
            <span className="font-bold">Order Date: </span> {formattedDate}
          </p>
        </div>
        <div className="text-right">
          <p>
            <span className="font-bold"> Invoice Date:</span> {formattedDate}
          </p>
          <p>
            <span className="font-bold"> Reverse Charge:</span>{" "}
            {data.invoiceDetails.reverse_charge}
          </p>
          <p>
            <span className="font-bold"> Invoice No.:</span> {invoiceNumber}
          </p>
        </div>
      </div>

      <div className="border grid m-2">
        <div className="bg-slate-200 flex py-2 px-2 justify-between w-full">
          <p>Description</p>
          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Discount</p>
          <p>Tax Amount</p>
        </div>
        {data.items.map((item, index) => (
          <div key={index} className="flex justify-between p-2 w-full">
            <p>{item.description}</p>
            <p>{item.unit_price}</p>
            <p>{item.quantity}</p>
            <p>{item.discount}</p>
            <p>Rs.{(item.tax_rate * item.unit_price) / 100}</p>
          </div>
        ))}
        <div className="flex">
             <div className="bg-slate-100 flex py-2 px-2 justify-end w-full">
          <p className="font-bold">Total Tax Amount:</p>
          <p>{totalTaxAmount.toFixed(2)}</p>
        </div>
        <div className="bg-slate-100 flex py-2 px-2 justify-end w-full">
          <p className="font-bold">Total Price:</p>
          <p>{totalPrice.toFixed(2)}</p>
        </div>
        </div>
       
      </div>

      <div className="text-right text-xl grid my-4">
        <p className="font-bold">{data.seller.name}</p>
        {data.signature && (
          <div className="border-2 w-fit ml-auto my-2 max-w-[200px] object-cover max-h-[100px]">
            <img
              src={data.signature}
              alt="Signature"
              style={{ height: "auto" }}
            />
          </div>
        )}
        <p className="font-bold">Authorized Signatory</p>
      </div>
    </div>
  );
});

export default InvoiceTemplate;
