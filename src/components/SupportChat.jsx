import { useState } from "react";
import { Link } from "react-router-dom";
import "./SupportChat.css";

const BOOKING_PRIVACY_RESPONSE =
  "I can help with general booking questions, but I cannot access individual booking records. Please select Talk to a Human Agent so our support team can securely check your booking.";

const PRIVATE_INFORMATION_RESPONSE =
  "For your security, I cannot access personal account information, payment records or individual transactions. Please select Talk to a Human Agent for assistance.";

const getAIResponse = (question) => {
  const text = question.toLowerCase().trim();

  // Individual booking information
  if (
    text.includes("my booking") ||
    text.includes("track booking") ||
    text.includes("booking status") ||
    text.includes("booking reference") ||
    text.includes("where is my booking") ||
    text.includes("my reservation") ||
    text.includes("my reservation status")
  ) {
    return BOOKING_PRIVACY_RESPONSE;
  }

  // Personal payment and account information
  if (
    text.includes("my payment") ||
    text.includes("payment status") ||
    text.includes("my transaction") ||
    text.includes("my refund") ||
    text.includes("my account") ||
    text.includes("my password") ||
    text.includes("my otp") ||
    text.includes("my invoice") ||
    text.includes("my receipt")
  ) {
    return PRIVATE_INFORMATION_RESPONSE;
  }

  // General property and land information
  if (
    text.includes("property") ||
    text.includes("land") ||
    text.includes("buy") ||
    text.includes("villa") ||
    text.includes("apartment") ||
    text.includes("house for sale")
  ) {
    return "ÉLAN HOMES helps customers discover properties and land for sale across Kenya. You can browse listings, explore property details and request a viewing. Property and land listings can be submitted free of charge by owners, subject to ÉLAN HOMES approval.";
  }

  // General stay information
  if (
    text.includes("stay") ||
    text.includes("b&b") ||
    text.includes("accommodation") ||
    text.includes("holiday home") ||
    text.includes("short stay") ||
    text.includes("book a room")
  ) {
    return "You can explore our available B&Bs, furnished accommodation and short stays, select your preferred dates and submit a booking request. ÉLAN HOMES checks availability and communicates the booking confirmation and payment instructions. For an individual booking, please speak to a Human Agent.";
  }

  // Cancellation and refund policies
  if (
    text.includes("cancel") ||
    text.includes("refund") ||
    text.includes("early checkout") ||
    text.includes("early check-out") ||
    text.includes("cancellation policy")
  ) {
    return "Cancellation and early-checkout requests follow the applicable ÉLAN HOMES Booking Policy. You can review the published terms on our Booking Policy page. If you need help with a specific booking or refund, select Talk to a Human Agent.";
  }

  // Listing submission
  if (
    text.includes("list my property") ||
    text.includes("submit a listing") ||
    text.includes("become a curator") ||
    text.includes("list my land") ||
    text.includes("list my stay") ||
    text.includes("property owner")
  ) {
    return "Property, land and short-stay owners are welcome to submit listings to ÉLAN HOMES free of charge. Every listing is reviewed and must be approved before appearing publicly. You can begin through the List Your Property page.";
  }

  // Promotion information
  if (
    text.includes("promotion") ||
    text.includes("featured listing") ||
    text.includes("sponsored listing")
  ) {
    return "ÉLAN HOMES offers optional paid promotion for approved property and land listings. Promotion is available for 24 hours, 7 days, 14 days or 30 days. Stays are not currently included in the promotion programme.";
  }

  // Account and registration
  if (
    text.includes("account") ||
    text.includes("register") ||
    text.includes("sign in") ||
    text.includes("sign up") ||
    text.includes("create account")
  ) {
    return "You can browse publicly available ÉLAN HOMES listings without signing in. Creating an account allows you to access account features such as saved listings, booking requests and viewing requests. Select Sign In or Create Account from the website menu.";
  }

  // Greetings
  if (
    /^(hello|hi|hey|good morning|good afternoon|good evening)[!. ]*$/.test(text)
  ) {
    return "Hello and welcome to ÉLAN HOMES! I'm your AI support assistant. I can help with general questions about our properties, land, stays, listings and published policies. How can I help you today?";
  }

  return "I can help with general questions about ÉLAN HOMES, properties, land, stays, listing submissions, accounts and published booking policies. I cannot access private customer records or process payments. If you need personal assistance, please select Talk to a Human Agent.";
};

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [supportMode, setSupportMode] = useState("ai");

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello and welcome to ÉLAN HOMES! I'm your AI support assistant. I can help with general questions about our services, properties, land, stays and booking policies. How can I help you?",
    },
  ]);

  const sendMessage = (event) => {
    event.preventDefault();

    const customerMessage = message.trim();

    if (!customerMessage) {
      return;
    }

    const customerEntry = {
      id: crypto.randomUUID(),
      sender: "customer",
      text: customerMessage,
    };

    const assistantEntry = {
      id: crypto.randomUUID(),
      sender: "assistant",
      text: getAIResponse(customerMessage),
    };

    setMessages((previous) => [...previous, customerEntry, assistantEntry]);

    setMessage("");
  };

  const requestHumanAgent = () => {
    setSupportMode("human");
  };

  const returnToAI = () => {
    setSupportMode("ai");
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div className="elan-support-widget">
      {isOpen && (
        <section
          className="elan-support-panel"
          aria-label="ÉLAN HOMES customer support"
          aria-modal="false"
        >
          {/* HEADER */}

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
              onClick={closeChat}
              aria-label="Close support chat"
            >
              ×
            </button>
          </div>

          <div className="elan-support-content">
            {/* HUMAN SUPPORT */}

            {supportMode === "human" ? (
              <div className="elan-support-login">
                <div className="elan-support-login-icon">♙</div>

                <h3>Talk to a Human Agent</h3>

                <p>
                  Our customer support team can assist with individual bookings,
                  payment enquiries, refunds, complaints and account-related
                  matters.
                </p>

                <p>
                  For your security, our team may need to verify your identity
                  before discussing private account or booking information.
                </p>

                <Link
                  to="/contact"
                  className="elan-support-submit elan-support-login-link"
                  onClick={closeChat}
                >
                  CONTACT ÉLAN HOMES
                </Link>

                <p className="elan-support-register-text">
                  Our human support request system will be connected to the
                  website backend later.
                </p>

                <button
                  type="button"
                  className="elan-support-back"
                  onClick={returnToAI}
                >
                  RETURN TO AI ASSISTANT
                </button>
              </div>
            ) : (
              <>
                {/* AI INTRODUCTION */}

                <div className="elan-support-intro">
                  <strong>AI Support Assistant</strong>

                  <p>
                    Ask me about ÉLAN HOMES services, properties, land, stays or
                    our published policies.
                  </p>
                </div>

                {/* CONVERSATION */}

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

                {/* MESSAGE FORM */}

                <form className="elan-support-form" onSubmit={sendMessage}>
                  <label htmlFor="support-message">Your Question</label>

                  <textarea
                    id="support-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Ask us a general question..."
                    rows={3}
                    maxLength={1000}
                    required
                  />

                  <button
                    type="submit"
                    className="elan-support-submit"
                    disabled={!message.trim()}
                  >
                    SEND MESSAGE
                  </button>
                </form>

                {/* HUMAN ESCALATION */}

                <div className="elan-support-human-option">
                  <p>Need personal assistance?</p>

                  <button type="button" onClick={requestHumanAgent}>
                    TALK TO A HUMAN AGENT
                  </button>
                </div>

                {/* PRIVACY */}

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

          {/* FOOTER */}

          <div className="elan-support-footer">ÉLAN HOMES · Customer Care</div>
        </section>
      )}

      {/* CHAT LAUNCHER */}

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
