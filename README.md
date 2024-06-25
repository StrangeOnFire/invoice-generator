# Invoice Generation Application

## Overview

This application allows users to fill out an invoice form, upload a signature, and generate a PDF preview of the invoice. The form inputs are cleared after submission.

## Components

### 1. App.js
- Manages form submission and PDF generation.
- Uses `html2canvas` and `jsPDF` to generate a PDF.
- Opens the generated PDF in a new browser tab for preview.
- Clears the form after submission.

### 2. InvoiceForm.js
- Collects seller, billing, item, order, and invoice details.
- Supports signature image upload.
- Resets form fields after submission.

### 3. InvoiceTemplate.js
- Displays invoice details including the signature.
- Used by `App.js` to generate the PDF.

## Usage

1. Fill out the form with the necessary invoice details.
2. Upload a signature image.
3. Submit the form to generate and preview the PDF in a new tab.
4. The form inputs will be cleared automatically.
