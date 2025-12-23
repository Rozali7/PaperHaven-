import React, { useState } from "react";
import "../styles/Contacts.css";
import {API_URL} from "../config";

export default function Contact() {
  const [sent, setSent] = useState(false); //tracks if the message was successfully sent
  const [loading, setLoading] = useState(false); //prevents double submit
  const [error, setError] = useState(""); //shows backend errors if something fails

  const [form, setForm] = useState({ name: "", email: "", message: "" }); //stores user input

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value }); //updates the correct field by name

  const onSubmit = async (e) => {
    e.preventDefault(); //prevents page refresh when submitting
    setError(""); //reset previous errors
    setSent(false); //reset message state if user submits again

    //basic validation (frontend)
    if (!form.name || !form.email || !form.message) return;

    try {
      setLoading(true); //disable button while sending

      //send message to backend (so it can be inserted into MySQL messages table)
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST", //POST = send data to server
        headers: { "Content-Type": "application/json" }, //we are sending JSON
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }), //req.body in backend will receive this
      });

      const data = await res.json(); //read backend response

      if (!res.ok) {
        //backend returned an error status (400/500/etc.)
        setError(data.message || "Message failed. Please try again.");
        return;
      }

      //if we reach here then message saved successfully in database
      setSent(true);

      //optional: clear fields after success
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact">
      <div className="container grid">
        {/* LEFT */}
        <div className="col">
          <h1>Contact Us</h1>
          <p className="muted">
            Have a question, a suggestion, or a favorite read to share?
          </p>

          <form className="card form" onSubmit={onSubmit}>
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Your Message
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={onChange}
                placeholder="Tell us what you’re reading, wondering about, or looking for…"
                required
              />
            </label>

            <div className="row">
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* show error if message fails */}
              {error && <span className="hint" style={{ color: "red" }}>{error}</span>}

              {/* original messages (kept) */}
              {!sent && !error && (
                <span className="hint">
                  We usually reply within 1–2 business days.
                </span>
              )}
              {sent && (
                <span className="thanks">
                  ✨ Thank you! Your message was received and saved. We’ll reply soon.
                </span>
              )}
            </div>
          </form>

          {/* Small contact info strip */}
          <div className="contact-meta">
            <span>📧 hello@paperhaven.com</span>
            <span>🕰 Mon–Fri, 9am–6pm</span>
            <span>📚 Online-only bookstore</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col illust card">
          <div className="paper">
            <div className="fold" />
            <h3>We read every note.</h3>
            <p>Expect a friendly reply within 1–2 days.</p>
          </div>
        </div>
      </div>
    </section>
  );
}






