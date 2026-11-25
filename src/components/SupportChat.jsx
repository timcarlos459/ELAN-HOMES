import { useState } from "react";
import { Link } from "react-router-dom";
import "./SupportChat.css";

const BOOKING_PRIVACY_RESPONSE =
  "I can help with general booking questions, but I cannot access individual booking records. Please select Talk to a Human Agent so our support team can securely check your booking.";

const getAIResponse = (question) => {
  const text = question.toLowerCase();

  if (
    text.includes("my booking") ||
    text.includes("track booking") ||
    text.includes("booking status") ||
    text.includes("booking reference") ||
    text.includes("where is my booking")
  ) {
    return BOOKING_PRIVACY_RESPONSE;
  }

  if (
    text.includes("property") ||
    text.includes("land") ||
    text.includes("buy")
  ) {
    return "ÉLAN HOMES helps customers discover properties and land for sale across Kenya. You can browse listings, view their details and request a viewing through your account.";
  }

  if (
    text.includes("stay") ||
    text.includes("b&b") ||
    text.includes("accommodation")
  ) {
    return "You can explore our available stays, select your preferred dates and submit a booking request. ÉLAN HOMES checks availability and sends an invoice to your registered email. The two-hour payment window begins when the invoice is successfully sent.";
  }

  if (
    text.includes("cancel") ||
    text.includes("refund") ||
    text.includes("early checkout")
  ) {
    return "Cancellation and early-checkout requests follow the applicable ÉLAN HOMES booking policies. Please review our Booking Policy for the details. If you need help with a specific booking, select Talk to a Human Agent.";
  }

  if (
    text.includes("account") ||
    text.includes("register") ||
    text.includes("sign in") ||
    text.includes("sign up")
  ) {
    return "You can browse ÉLAN HOMES without an account. An account is required to save favourites, request bookings or viewings, and contact support.";
  }

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("good morning") ||
    text.includes("good evening")
  ) {
    return "Hello and welcome to ÉLAN HOMES! I'm your AI support assistant. How can I help you today?";
  }

  return "I can help with general questions about ÉLAN HOMES, properties, land, stays, accounts and published booking policies. If you need help with a personal booking, payment or account matter, please select Talk to a Human Agent.";
};

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello and welcome to ÉLAN HOMES! I'm your AI support assistant. I can help with common questions about our services, properties, land, stays and booking policies. How can I help you?",
    },
  ]);
  const [supportMode, setSupportMode] = useState("ai");

  const isAuthenticated = Boolean(currentUser?.id);

  const sendMessage = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const customerMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        sender: "customer",
        text: customerMessage,
      },
      {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: getAIResponse(customerMessage),
      },
    ]);

    setMessage("");
  };

  const requestHumanAgent = () => {
    setSupportMode("human");
  };

  const returnToAI = () => {
    setSupportMode("ai");
  };

  return (
    <div className="elan-support-widget">
      {isOpen && (
        <section
          className="elan-support-panel"
          aria-label="ÉLAN HOMES live support"
        >
          <div className="elan-support-header">
            <div>
              <span className="elan-support-brand">ÉLAN HOMES</span>
              <h3>LIVE SUPPORT</h3>
              <p>
                {supportMode === "ai"
                  ? "AI Assistant · Available 24/7"
                  : "Human Customer Support"}
              </p>
            </div>

            <button
              type="button"
              className="elan-support-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close support chat"
            >
              ×
            </button>
          </div>

          <div className="elan-support-content">
            {!isAuthenticated ? (
              <div className="elan-support-login">
                <div className="elan-support-login-icon">♙</div>

                <h3>Sign in to get support</h3>

                <p>
                  Your ÉLAN HOMES account gives you access to our AI support
                  assistant and human customer support team. Whether you have a
                  question or need assistance, we're here to help. No booking is
                  necessary — just sign in and let's talk.
                </p>

                <Link
                  to="/signin"
                  className="elan-support-submit elan-support-login-link"
                  onClick={() => setIsOpen(false)}
                >
                  SIGN IN TO YOUR ACCOUNT
                </Link>

                <p className="elan-support-register-text">
                  Don't have an account?{" "}
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    Create an account
                  </Link>
                </p>
              </div>
            ) : supportMode === "human" ? (
              <div className="elan-support-login">
                <div className="elan-support-login-icon">♙</div>

                <h3>Talk to a Human Agent</h3>

                <p>
                  Our human support team can assist with individual bookings,
                  payment enquiries, refunds, complaints and account-related
                  matters.
                </p>

                <p>
                  If an agent is unavailable, your request can be queued for
                  follow-up once the support system is connected.
                </p>

                <button
                  type="button"
                  className="elan-support-submit"
                  onClick={returnToAI}
                >
                  RETURN TO AI ASSISTANT
                </button>
              </div>
            ) : (
              <>
                <div className="elan-support-intro">
                  <strong>AI Support Assistant</strong>
                  <p>
                    Ask me about ÉLAN HOMES services, properties, land, stays or
                    our published policies.
                  </p>
                </div>

                <div
                  className="elan-support-messages"
                  aria-live="polite"
                  aria-label="Support conversation"
                >
                  {messages.map((item) => (
                    <div
                      key={item.id}
                      className={`elan-support-message ${item.sender}`}
                    >
                      <span>
                        {item.sender === "assistant" ? "ÉLAN AI" : "YOU"}
                      </span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>

                <form className="elan-support-form" onSubmit={sendMessage}>
                  <label htmlFor="support-message">Your Question</label>

                  <textarea
                    id="support-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Ask us a general question..."
                    rows={3}
                    required
                  />

                  <button type="submit" className="elan-support-submit">
                    SEND MESSAGE
                  </button>
                </form>

                <div className="elan-support-human-option">
                  <p>Need personal assistance?</p>

                  <button type="button" onClick={requestHumanAgent}>
                    TALK TO A HUMAN AGENT
                  </button>
                </div>

                <p className="elan-support-privacy">
                  Never share your password, M-Pesa PIN or one-time verification
                  code with anyone.
                </p>

                <p className="elan-support-policy-link">
                  <Link to="/booking-policy">View our Booking Policy</Link>
                </p>
              </>
            )}
          </div>

          <div className="elan-support-footer">ÉLAN HOMES · Customer Care</div>
        </section>
      )}

      <button
        type="button"
        className={`elan-support-launcher ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close live support" : "Open live support"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span className="elan-support-launcher-close">×</span>
        ) : (
          <>
            <span className="elan-support-chat-icon">✉</span>
            <span>LIVE SUPPORT</span>
          </>
        )}
      </button>
    </div>
  );
}
