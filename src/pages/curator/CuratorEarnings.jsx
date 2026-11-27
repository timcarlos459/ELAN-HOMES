import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CuratorEarnings.css";

function CuratorEarnings() {
  useEffect(() => {
    document.title = "Curator Earnings | ÉLAN HOMES";

    return () => {
      document.title = "ÉLAN HOMES";
    };
  }, []);

  const earnings = {
    total: 0,
    pending: 0,
    paid: 0,
    transactions: [],
  };

  return (
    <main className="curator-earnings-page">
      <section className="curator-earnings-hero">
        <Link to="/curator" className="curator-earnings-back">
          ← Back to Dashboard
        </Link>

        <span className="curator-earnings-eyebrow">CURATOR ACCOUNT</span>

        <h1>My Earnings</h1>

        <p>
          Track your commissions, completed transactions and payment history
          through ÉLAN HOMES.
        </p>
      </section>

      <section className="curator-earnings-container">
        <div className="curator-earnings-notice">
          <strong>How curator earnings work</strong>
          <p>
            Earnings are recorded after eligible transactions are successfully
            completed and verified by ÉLAN HOMES. Applicable commission rates
            depend on your approved agreement and the transaction category.
          </p>
        </div>

        <div className="curator-earnings-summary">
          <article className="curator-earnings-card featured">
            <span>Total Earnings</span>
            <h2>KSh {earnings.total.toLocaleString("en-KE")}</h2>
            <small>Verified earnings recorded</small>
          </article>

          <article className="curator-earnings-card">
            <span>Pending Earnings</span>
            <h2>KSh {earnings.pending.toLocaleString("en-KE")}</h2>
            <small>Awaiting verification or payment</small>
          </article>

          <article className="curator-earnings-card">
            <span>Total Paid</span>
            <h2>KSh {earnings.paid.toLocaleString("en-KE")}</h2>
            <small>Payments recorded</small>
          </article>
        </div>

        <section className="curator-earnings-history">
          <div className="curator-earnings-section-heading">
            <div>
              <span>PAYMENT RECORDS</span>
              <h2>Earnings History</h2>
            </div>
          </div>

          {earnings.transactions.length === 0 ? (
            <div className="curator-earnings-empty">
              <span className="curator-earnings-empty-icon">₦</span>
              <h3>No earnings recorded yet</h3>
              <p>
                Once eligible transactions are completed and verified, your
                earnings and payment records will appear here.
              </p>
            </div>
          ) : (
            <div className="curator-earnings-table-wrapper">
              <table className="curator-earnings-table">
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Category</th>
                    <th>Commission</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.reference}</td>
                      <td>{transaction.category}</td>
                      <td>KSh {transaction.amount.toLocaleString("en-KE")}</td>
                      <td>{transaction.status}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="curator-earnings-support">
          <h3>Need help with your earnings?</h3>
          <p>
            Contact the ÉLAN HOMES team for assistance with verified
            commissions, payment records or transaction queries.
          </p>
          <Link to="/curator" className="curator-earnings-dashboard-link">
            Return to Dashboard
          </Link>
        </section>

        <p className="curator-earnings-demo-note">
          Demonstration page: earnings are currently sample zero values. Live
          commission calculations and payment records will require backend
          integration.
        </p>
      </section>
    </main>
  );
}

export default CuratorEarnings;
