import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import "./Receipt.css";

export default function Receipt() {
  const { receiptId } = useParams();

  /* =====================================
     LOAD RECEIPT FROM LOCAL STORAGE
  ===================================== */

  const receiptResult = useMemo(() => {
    try {
      const savedReceipts = JSON.parse(
        localStorage.getItem("elanReceipts") || "[]",
      );

      if (!Array.isArray(savedReceipts)) {
        return {
          receipt: null,
          error: "Invalid receipt records.",
        };
      }

      const selectedReceipt = savedReceipts.find(
        (item) =>
          item.receiptId === receiptId ||
          item.id === receiptId ||
          item.reference === receiptId,
      );

      return {
        receipt: selectedReceipt || null,
        error: "",
      };
    } catch {
      return {
        receipt: null,
        error: "We could not load this receipt.",
      };
    }
  }, [receiptId]);

  const receipt = receiptResult.receipt;

  /* =====================================
     PAYMENT VERIFICATION
  ===================================== */

  const amount = Number(receipt?.amount);

  const isValidAmount = Number.isFinite(amount) && amount > 0;

  const isVerified =
    receipt?.paymentStatus === "paid" &&
    receipt?.verified === true &&
    isValidAmount;

  /* =====================================
     FORMATTERS
  ===================================== */

  const formatPrice = (value) =>
    `KSh ${Number(value).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (value) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =====================================
     PRINT RECEIPT
  ===================================== */

  const handlePrint = () => {
    if (isVerified) {
      window.print();
    }
  };

  /* =====================================
     RECEIPT NOT FOUND
  ===================================== */

  if (!receipt) {
    return (
      <main className="receipt-page">
        <SEO
          title="Payment Receipt | ÉLAN HOMES"
          description="ÉLAN HOMES payment receipt."
          noindex={true}
        />

        <section className="receipt-message">
          <span>ÉLAN HOMES</span>

          <h1>Receipt Not Available</h1>

          <p>
            {receiptResult.error ||
              "We could not find a receipt matching this reference."}
          </p>

          <Link to="/bookings">Return to My Bookings</Link>
        </section>
      </main>
    );
  }

  /* =====================================
     UNVERIFIED PAYMENT
  ===================================== */

  if (!isVerified) {
    return (
      <main className="receipt-page">
        <SEO
          title="Payment Verification | ÉLAN HOMES"
          description="Check your ÉLAN HOMES payment status."
          noindex={true}
        />

        <section className="receipt-message">
          <span>ÉLAN HOMES PAYMENT SERVICES</span>

          <h1>Payment Verification Pending</h1>

          <p>
            This payment has not yet been verified. An official receipt will
            become available after payment confirmation.
          </p>

          <div className="receipt-reference-box">
            <small>PAYMENT REFERENCE</small>

            <strong>
              {receipt.receiptReference ||
                receipt.reference ||
                receipt.receiptId ||
                receipt.id}
            </strong>
          </div>

          <Link to="/bookings">Return to My Bookings</Link>
        </section>
      </main>
    );
  }

  /* =====================================
     VERIFIED OFFICIAL RECEIPT
  ===================================== */

  return (
    <main className="receipt-page">
      <SEO
        title="Official Payment Receipt | ÉLAN HOMES"
        description="Official verified payment receipt from ÉLAN HOMES."
        noindex={true}
      />

      <div className="receipt-container">
        {/* TOP ACTIONS */}

        <div className="receipt-top-actions">
          <Link to="/bookings">← My Bookings</Link>

          <button type="button" onClick={handlePrint}>
            PRINT RECEIPT
          </button>
        </div>

        <article className="receipt-card">
          {/* HEADER */}

          <header className="receipt-header">
            <div className="receipt-brand">
              <span>ÉLAN</span>

              <small>HOMES</small>
            </div>

            <div className="receipt-header-right">
              <span>OFFICIAL RECEIPT</span>

              <strong>PAYMENT CONFIRMED</strong>
            </div>
          </header>

          {/* SUCCESS BANNER */}

          <div className="receipt-success-banner">
            <span className="receipt-check">✓</span>

            <div>
              <h1>Payment Successful</h1>

              <p>Your payment has been verified by ÉLAN HOMES.</p>
            </div>
          </div>

          {/* RECEIPT NUMBER */}

          <section className="receipt-number-section">
            <div>
              <small>RECEIPT NUMBER</small>

              <strong>
                {receipt.receiptReference ||
                  receipt.reference ||
                  receipt.receiptId ||
                  receipt.id}
              </strong>
            </div>

            <div>
              <small>PAYMENT DATE</small>

              <strong>
                {formatDate(receipt.paidAt || receipt.paymentDate)}
              </strong>
            </div>
          </section>

          {/* CUSTOMER DETAILS */}

          <section className="receipt-details">
            <h2>Customer Details</h2>

            <div>
              <span>Customer Name</span>

              <strong>
                {receipt.customerName ||
                  receipt.customer?.fullName ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <span>Email Address</span>

              <strong>
                {receipt.customerEmail ||
                  receipt.customer?.email ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <span>Phone Number</span>

              <strong>
                {receipt.customerPhone ||
                  receipt.customer?.phone ||
                  "Not available"}
              </strong>
            </div>
          </section>

          {/* TRANSACTION DETAILS */}

          <section className="receipt-details">
            <h2>Transaction Details</h2>

            <div>
              <span>Service</span>

              <strong>
                {receipt.serviceName ||
                  receipt.listingTitle ||
                  receipt.description ||
                  "ÉLAN HOMES Service"}
              </strong>
            </div>

            <div>
              <span>Booking / Enquiry Reference</span>

              <strong>
                {receipt.bookingReference ||
                  receipt.enquiryReference ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <span>Invoice Reference</span>

              <strong>{receipt.invoiceReference || "Not available"}</strong>
            </div>

            <div>
              <span>Payment Method</span>

              <strong>{receipt.paymentMethod || "M-Pesa"}</strong>
            </div>

            <div>
              <span>M-Pesa Transaction Code</span>

              <strong>
                {receipt.mpesaTransactionCode ||
                  receipt.transactionCode ||
                  "Not available"}
              </strong>
            </div>
          </section>

          {/* TOTAL */}

          <section className="receipt-total-section">
            <span>AMOUNT PAID</span>

            <strong>{formatPrice(amount)}</strong>
          </section>

          {/* PAYMENT STATUS */}

          <div className="receipt-paid-status">
            <span>PAYMENT STATUS</span>

            <strong>PAID — VERIFIED</strong>
          </div>

          {/* FOOTER */}

          <footer className="receipt-footer">
            <p>Thank you for choosing ÉLAN HOMES.</p>

            <small>
              This receipt is issued electronically following verified payment
              confirmation.
            </small>

            <strong>ÉLAN HOMES | Live. Stay. Invest.</strong>
          </footer>
        </article>
      </div>
    </main>
  );
}
