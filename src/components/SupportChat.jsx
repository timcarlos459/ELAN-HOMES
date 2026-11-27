import { useState } from "react";
import { Link } from "react-router-dom";
import "./SupportChat.css";

const BOOKING_PRIVACY_RESPONSE =
  "I can help with general booking questions, but I cannot access individual booking records. Please select Talk to a Human Agent so our support team can securely check your booking.";

const PRIVATE_INFORMATION_RESPONSE =
  "For your security, I cannot access personal account information, payment records or individual transactions. Please select Talk to a Human Agent for assistance.";

const createMessageId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `message-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const normaliseQuestion = (question) =>
  question
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[?!.,;:]+/g, " ")
    .replace(/\s+/g, " ");

const containsAny = (text, phrases) =>
  phrases.some((phrase) => text.includes(phrase));

const getAIResponse = (question) => {
  const text = normaliseQuestion(question);

  if (!text) {
    return "Please enter a question so I can help you.";
  }

  // 1. Individual booking and reservation privacy.
  if (
    containsAny(text, [
      "my booking",
      "my reservation",
      "booking status",
      "reservation status",
      "track booking",
      "track my booking",
      "booking reference",
      "reservation reference",
      "where is my booking",
      "is my booking confirmed",
      "has my booking been confirmed",
      "check my booking",
      "check booking for me",
      "my check in",
      "my check-in",
      "my checkout",
      "my check-out",
      "my stay reservation",
    ])
  ) {
    return BOOKING_PRIVACY_RESPONSE;
  }

  // 2. Personal account, payment and transaction information.
  if (
    containsAny(text, [
      "my payment",
      "payment status",
      "my transaction",
      "transaction status",
      "my refund",
      "refund status",
      "my account",
      "my password",
      "my otp",
      "my verification code",
      "my invoice",
      "my receipt",
      "my profile",
      "my personal details",
      "my saved listings",
      "my account balance",
      "check my payment",
      "confirm my payment",
      "did my payment go through",
      "has my payment gone through",
    ])
  ) {
    return PRIVATE_INFORMATION_RESPONSE;
  }

  // 3. Greetings.
  if (
    /^(hello|hi|hey|good morning|good afternoon|good evening|habari)$/.test(
      text,
    )
  ) {
    return "Hello and welcome to ÉLAN HOMES! I'm your AI support assistant. I can help with general questions about properties, land, stays, listing submissions and our published policies. How can I help you today?";
  }

  // 4. About ÉLAN HOMES.
  if (
    containsAny(text, [
      "what is elan homes",
      "about elan homes",
      "what does elan homes do",
      "tell me about elan",
      "what services do you offer",
      "what services does elan",
    ])
  ) {
    return "ÉLAN HOMES is a Kenyan property and accommodation marketplace. We help customers discover properties and land for sale, as well as B&Bs and short stays. We also provide a central channel for enquiries and viewing or booking requests.";
  }

  // 5. General property and land information.
  if (
    containsAny(text, [
      "property",
      "properties",
      "land",
      "buy a house",
      "buy property",
      "buy land",
      "villa",
      "apartment",
      "house for sale",
      "homes for sale",
      "real estate",
    ])
  ) {
    return "ÉLAN HOMES helps customers discover properties and land for sale across Kenya. Browse the Properties or Land sections to explore listings and their details. You can submit a viewing request through the relevant listing. Property and land listings can be submitted free of charge by owners, subject to approval before publication.";
  }

  // 6. Viewing requests.
  if (
    containsAny(text, [
      "request a viewing",
      "property viewing",
      "land viewing",
      "view a property",
      "view a house",
      "view land",
      "viewing appointment",
      "viewing fee",
      "how do viewings work",
    ])
  ) {
    return "To request a property or land viewing, open the listing and select Request a Viewing. Provide your contact details and preferred appointment time, then review the applicable viewing fee and policy before submitting. ÉLAN HOMES coordinates the request. Any applicable fee must be disclosed before payment.";
  }

  // 7. General stay and accommodation information.
  if (
    containsAny(text, [
      "stay",
      "stays",
      "b&b",
      "accommodation",
      "holiday home",
      "short stay",
      "short stays",
      "book a room",
      "where can i stay",
      "places to stay",
      "furnished accommodation",
    ])
  ) {
    return "You can explore B&Bs, furnished accommodation and short stays in the Stays section. Open a listing, select your preferred dates and submit a booking request. Availability must be confirmed before your booking is finalised. ÉLAN HOMES will communicate the applicable payment instructions and booking conditions.";
  }

  // 8. General cancellation and refund policies.
  if (
    containsAny(text, [
      "cancellation policy",
      "refund policy",
      "how do cancellations work",
      "cancel a booking",
      "early checkout",
      "early check out",
      "early check-out",
      "booking cancellation",
      "booking refund policy",
    ])
  ) {
    return "Cancellation and early-checkout requests follow the applicable ÉLAN HOMES Booking Policy. Please review the published Booking Policy for the relevant conditions. For a specific booking or refund, select Talk to a Human Agent.";
  }

  // 9. Listing submission.
  if (
    containsAny(text, [
      "list my property",
      "list my land",
      "list my stay",
      "submit a listing",
      "become a curator",
      "property owner",
      "list my house",
      "how do i list",
      "how to list",
      "register as an owner",
    ])
  ) {
    return "Property, land and short-stay owners can submit listings to ÉLAN HOMES free of charge. Each submission is reviewed and must be approved before it appears publicly. You can begin through the List Your Property page. The owner registration and listing management process will be connected to the secure backend.";
  }

  // 10. Listing promotion.
  if (
    containsAny(text, [
      "promotion",
      "promote my listing",
      "featured listing",
      "sponsored listing",
      "advertise my property",
      "boost my listing",
      "listing promotion price",
      "promotion cost",
    ])
  ) {
    return "ÉLAN HOMES offers optional paid promotion for approved property and land listings. Current options are 24 hours (KSh 150), 7 days (KSh 800), 14 days (KSh 1,500) and 30 days (KSh 2,700). Stays are not included in the promotion programme. Only confirmed and verified payments activate a promotion.";
  }

  // 11. Registration and sign-in.
  if (
    containsAny(text, [
      "register",
      "sign in",
      "sign-in",
      "sign up",
      "sign-up",
      "create an account",
      "create account",
      "how do i join",
      "how to join",
    ])
  ) {
    return "You can browse publicly available ÉLAN HOMES listings without signing in. To access account features, select Register to create an account or Sign In if you already have one. Account registration and verification services will be connected to the secure backend.";
  }

  // 12. Website navigation.
  if (
    containsAny(text, [
      "where are your properties",
      "find properties",
      "search properties",
      "where can i find land",
      "find land",
      "where can i find stays",
      "find accommodation",
      "destinations",
      "search listings",
    ])
  ) {
    return "You can explore the website using the main navigation: Properties for homes and properties for sale, Land for land listings, Stays for B&Bs and short accommodation, and Destinations to explore available locations across Kenya.";
  }

  // 13. Contact and human assistance.
  if (
    containsAny(text, [
      "contact you",
      "contact elan",
      "contact support",
      "speak to someone",
      "talk to someone",
      "human agent",
      "customer service",
      "customer support",
      "complaint",
    ])
  ) {
    return "For personal assistance, complaints or questions that require staff attention, select Talk to a Human Agent below. You can also visit our Contact page. The live human support request system is still being connected.";
  }

  // 14. Default response.
  return "I can help with general questions about ÉLAN HOMES, properties, land, stays, viewing requests, listing submissions, promotions and published policies. I cannot access private customer records, verify payments or manage individual bookings. For personal assistance, please select Talk to a Human Agent.";
};

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [supportMode, setSupportMode] = useState("ai");

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello and welcome to ÉLAN HOMES! I'm your AI support assistant. I can help with general questions about our services, properties, land, stays and published policies. How can I help you?",
    },
  ]);

  const sendMessage = (event) => {
    event.preventDefault();

    const customerMessage = message.trim();

    if (!customerMessage || customerMessage.length > 1000) {
      return;
    }

    const customerEntry = {
      id: createMessageId(),
      sender: "customer",
      text: customerMessage,
    };

    const assistantEntry = {
      id: createMessageId(),
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
          <div className="elan-support-header">
            <div>
              <span className="elan-support-brand">ÉLAN HOMES</span>
              <h3>LIVE SUPPORT</h3>

              <p>
                {supportMode === "ai"
                  ? "AI Assistant · General Information"
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
                  The human support request and conversation system is not
                  connected yet. Contacting us through this link opens the
                  Contact page; it does not automatically create a support
                  ticket.
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
                    placeholder="Ask a general question..."
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
