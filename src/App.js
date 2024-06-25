import React, { useRef, useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTemplate from "./templates/InvoiceTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";
const App = () => {
  const [formData, setFormData] = useState(null);
  const invoiceRef = useRef();

  const handleGenerateInvoice = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    if (formData) {
      const input = invoiceRef.current;

      if (!input) {
        console.error("Invoice template element not found");
        return;
      }

      html2canvas(input, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          if (imgData === "data:,") {
            console.error("Failed to capture the canvas content");
            return;
          }

          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 295; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;

          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          // Convert the PDF to a Blob
          const pdfBlob = pdf.output("blob");

          // Create a URL for the Blob and open it in a new tab
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, "_blank");
        })
        .catch((error) => {
          console.error("Error generating canvas:", error);
        });
    }
  }, [formData]);

  return (
    <div>
      <h1 className="text-xl font-bold text-center m-4 border-b">
        Made By Ayush
      </h1>
      <InvoiceForm onSubmit={handleGenerateInvoice} />

      {formData && (
        <div
          style={{ position: "absolute", top: "-10000px", left: "-10000px" }}
        >
          <InvoiceTemplate ref={invoiceRef} data={formData} />
        </div>
      )}
    </div>
  );
};

export default App;
