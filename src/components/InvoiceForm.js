import React, { useState } from "react";

const initialFormData = {
  seller: {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pan_no: "",
    gst_no: "",
  },
  billing: {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    state_code: "",
  },
  items: [
    { description: "", unit_price: 0, quantity: 0, discount: 0, tax_rate: 18 },
  ],
  orderDetails: { order_no: "", order_date: "" },
  invoiceDetails: { invoice_no: "", invoice_date: "", reverse_charge: "No" },
  placeOfSupply: "",
  placeOfDelivery: "",
  signature: null,
};

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setFormData({
        ...formData,
        [keys[0]]: { ...formData[keys[0]], [keys[1]]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          description: "",
          unit_price: 0,
          quantity: 0,
          discount: 0,
          tax_rate: 18,
        },
      ],
    });
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, signature: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Seller Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="seller.name"
          placeholder="Name"
          value={formData.seller.name}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="seller.address"
          placeholder="Address"
          value={formData.seller.address}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="seller.city"
          placeholder="City"
          value={formData.seller.city}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="seller.state"
          placeholder="State"
          value={formData.seller.state}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="seller.pincode"
          placeholder="Pincode"
          value={formData.seller.pincode}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="seller.pan_no"
          placeholder="PAN No."
          value={formData.seller.pan_no}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="seller.gst_no"
          placeholder="GST Registration No."
          value={formData.seller.gst_no}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <h2 className="text-lg font-semibold my-4">Billing Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="billing.name"
          placeholder="Name"
          value={formData.billing.name}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="billing.address"
          placeholder="Address"
          value={formData.billing.address}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="billing.city"
          placeholder="City"
          value={formData.billing.city}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="billing.state"
          placeholder="State"
          value={formData.billing.state}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="billing.pincode"
          placeholder="Pincode"
          value={formData.billing.pincode}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="billing.state_code"
          placeholder="State/UT Code"
          value={formData.billing.state_code}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <h2 className="text-lg font-semibold my-4">Items</h2>
      {formData.items.map((item, index) => (
        <div key={index} className="grid border-y py-4  lg:grid-cols-4 gap-4">
          <label htmlFor={`description-${index}`} className="text-sm font-medium">{`Item ${index + 1}`}</label>
          <input
            type="text"
            id={`description-${index}`}
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, e)}
            className="input-field col-span-4"
          />

          <label htmlFor={`unit_price-${index}`} className="text-sm font-medium">Unit Price:</label>
          <input
            type="number"
            id={`unit_price-${index}`}
            name="unit_price"
            placeholder="Unit Price"
            value={item.unit_price}
            onChange={(e) => handleItemChange(index, e)}
            className="input-field"
          />

          <label htmlFor={`quantity-${index}`} className="text-sm font-medium">Quantity:</label>
          <input
            type="number"
            id={`quantity-${index}`}
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            className="input-field"
          />

          <label htmlFor={`discount-${index}`} className="text-sm font-medium">Discount:</label>
          <input
            type="number"
            id={`discount-${index}`}
            name="discount"
            placeholder="Discount"
            value={item.discount}
            onChange={(e) => handleItemChange(index, e)}
            className="input-field"
          />

          <label htmlFor={`tax_rate-${index}`} className="text-sm font-medium">Tax Rate:</label>
          <input
            type="number"
            id={`tax_rate-${index}`}
            name="tax_rate"
            placeholder="Tax Rate"
            value={item.tax_rate}
            onChange={(e) => handleItemChange(index, e)}
            className="input-field"
          />
        </div>
      ))}

      <button type="button" className="btn px-4 py-1 border my-4 bg-slate-300 font-[500] rounded" onClick={addItem}>
        Add Item
      </button>

      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="invoiceDetails.reverse_charge" className="text-sm font-medium">Reverse Charge:</label>
        <select
          name="invoiceDetails.reverse_charge"
          id="invoiceDetails.reverse_charge"
          value={formData.invoiceDetails.reverse_charge}
          onChange={handleChange}
          className="input-field"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <h2 className="text-lg font-semibold my-4">Other Details</h2>
      <input
        type="text"
        name="placeOfSupply"
        placeholder="Place of Supply"
        value={formData.placeOfSupply}
        onChange={handleChange}
        className="input-field m-4"
      />
      <input
        type="text"
        name="placeOfDelivery"
        placeholder="Place of Delivery"
        value={formData.placeOfDelivery}
        onChange={handleChange}
        className="input-field m-4"
      />

      <h2 className="text-lg font-semibold my-4">Signature</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleSignatureChange}
        className="input-field"
      />

      <button type="submit" className="btn btn-primary font-[500] bg-black text-white px-4 py-2 rounded mt-4">
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
