import React, { useState } from "react";
import "../styles/Contacts.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
              <button type="submit">Send Message</button>
              {!sent && (
                <span className="hint">
                  We usually reply within 1–2 business days.
                </span>
              )}
              {sent && (
                <span className="thanks">
                  ✨ Thank you! We’ll write back soon with a thoughtful reply.
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






