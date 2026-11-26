import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import "./Payment.css";

export default function Payment() {
  const { invoiceId } = useParams();

  const invoiceResult = useMemo(() => {
    try {
      const invoices = JSON.parse(localStorage.getItem("elanInvoices") || "[]");

      if (!Array.isArray(invoices)) {
        return {
          invoice: null,
          error: "Invalid invoice records.",
        };
      }

      const selectedInvoice = invoices.find(
        (item) => item.invoiceId === invoiceId || item.id === invoiceId,
      );

      return {
        invoice: selectedInvoice || null,
        error: "",
      };
    } catch {
      return {
        invoice: null,
        error: "We could not load this invoice.",
      };
    }
  }, [invoiceId]);

  const invoice = invoiceResult.invoice;

  const isOfficialInvoice =
    invoice?.invoiceStatus === "issued" &&
    Number.isFinite(Number(invoice?.amount)) &&
    Number(invoice.amount) > 0;

  // Frontend display only.
  // Actual payment status must come from verified backend records.
  const isPaid =
    invoice?.paymentStatus === "paid" && invoice?.verified === true;

  const formatCurrency = (amount) =>
    `KSh ${Number(amount).toLocaleString("en-KE")}`;

  if (invoiceResult.error) {
    return (
      <main className="payment-page">
        <SEO
          title="Invoice Error | ÉLAN HOMES"
          description="Unable to load your ÉLAN HOMES invoice."
        />

        <div className="payment-container payment-message">
          <span>ÉLAN HOMES FINANCE</span>
          <h1>Unable to Load Invoice</h1>

          <p>{invoiceResult.error}</p>

          <Link to="/bookings">Return to My Bookings</Link>
        </div>
      </main>
    );
  }

  if (!invoice) {
    return (
      <main className="payment-page">
        <SEO
          title="Invoice Not Found | ÉLAN HOMES"
          description="The requested ÉLAN HOMES invoice could not be found."
        />

        <div className="payment-container payment-message">
          <span>ÉLAN HOMES FINANCE</span>

          <h1>Invoice Not Found</h1>

          <p>
            We could not find an invoice matching this reference. Please check
            your invoice details or contact our support team.
          </p>

          <Link to="/bookings">Return to My Bookings</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="payment-page">
      <SEO
        title="Invoice Payment | ÉLAN HOMES"
        description="Review your ÉLAN HOMES invoice and payment information."
      />

      <div className="payment-container">
        {/* BREADCRUMB */}
        <nav className="payment-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/bookings">My Bookings</Link>
          <span>/</span>
          <span>Payment</span>
        </nav>

        {/* PAGE HEADING */}
        <header className="payment-heading">
          <span>ÉLAN HOMES • FINANCE</span>

          <h1>Invoice &amp; Payment</h1>

          <p>Review your invoice and payment status before proceeding.</p>
        </header>

        {/* INVOICE CARD */}
        <section className="payment-invoice-card">
          {/* INVOICE HEADER */}
          <div className="payment-invoice-header">
            <div>
              <span>ÉLAN HOMES</span>
              <h2>Invoice Summary</h2>
            </div>

            <span
              className={`payment-status ${
                isPaid
                  ? "payment-status-paid"
                  : isOfficialInvoice
                    ? "payment-status-issued"
                    : "payment-status-provisional"
              }`}
            >
              {isPaid ? "PAID" : isOfficialInvoice ? "ISSUED" : "PROVISIONAL"}
            </span>
          </div>

          {/* INVOICE REFERENCE */}
          <div className="payment-invoice-reference">
            <div>
              <small>Invoice Reference</small>

              <strong>
                {invoice.invoiceReference || invoice.id || invoice.invoiceId}
              </strong>
            </div>

            <div>
              <small>Invoice Type</small>

              <strong>
                {String(invoice.invoiceType || "Invoice")
                  .replaceAll("_", " ")
                  .toUpperCase()}
              </strong>
            </div>
          </div>

          {/* CUSTOMER DETAILS */}
          <div className="payment-customer-details">
            <h3>Customer Details</h3>

            <div>
              <span>Name</span>
              <strong>{invoice.customerName || "Not provided"}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{invoice.customerEmail || "Not provided"}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{invoice.customerPhone || "Not provided"}</strong>
            </div>
          </div>

          {/* LISTING DETAILS */}
          <div className="payment-listing-details">
            <h3>Booking / Service Details</h3>

            <div>
              <span>Listing</span>

              <strong>{invoice.listingName || "ÉLAN HOMES Service"}</strong>
            </div>

            <div>
              <span>Location</span>

              <strong>{invoice.listingLocation || "Kenya"}</strong>
            </div>
          </div>

          {/* TOTAL */}
          <div className="payment-total">
            <span>Total Amount</span>

            <strong>
              {isOfficialInvoice
                ? formatCurrency(invoice.amount)
                : "To be confirmed"}
            </strong>
          </div>

          {/* PAID STATUS */}
          {isPaid && (
            <div className="payment-paid-message">
              <strong>Payment Confirmed</strong>

              <p>
                This invoice has a verified payment status. Your official
                receipt will be available once the receipt record has been
                generated.
              </p>
            </div>
          )}

          {/* PROVISIONAL INVOICE */}
          {!isPaid && !isOfficialInvoice && (
            <div className="payment-provisional-message">
              <strong>Payment Not Yet Due</strong>

              <p>
                This is a provisional invoice summary. ÉLAN HOMES must confirm
                the service and issue the official invoice before payment can be
                made.
              </p>
            </div>
          )}

          {/* ISSUED INVOICE */}
          {!isPaid && isOfficialInvoice && (
            <div className="payment-instructions">
              <h3>M-Pesa Payment</h3>

              <p>
                Your official invoice has been issued. Payment instructions will
                be provided through the authorised ÉLAN HOMES payment system.
              </p>

              <p>
                M-Pesa payment processing is not yet connected. Please do not
                send money to an unofficial PayBill or phone number.
              </p>

              <div className="payment-provisional-message">
                <strong>Payment Integration Pending</strong>

                <p>
                  You will be able to pay securely once the official M-Pesa
                  integration is activated. Your invoice remains unpaid in the
                  meantime.
                </p>
              </div>
            </div>
          )}

          {/* SECURITY NOTICE */}
          <div className="payment-security-note">
            <p>
              ÉLAN HOMES will only mark an invoice as paid after receiving and
              verifying payment confirmation from the authorised payment
              provider.
            </p>
          </div>
        </section>

        {/* BACK LINK */}
        <div className="payment-back-link">
          <Link to="/bookings">← Back to My Bookings</Link>
        </div>
      </div>
    </main>
  );
}
