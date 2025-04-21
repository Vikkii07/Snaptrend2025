"use client";

import React from "react";
import Header from "../../components/Header";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-hidden">
      <Header />

      <main className="w-full max-w-4xl mx-auto px-4 py-24 md:py-36 lg:py-48">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support</h1>
          <p className="text-lg text-neutral-400">
            Need help? Reach out to us — we’ll get back to you ASAP.
          </p>
        </section>

        <section className="space-y-12 text-neutral-200">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">📬 Contact Us</h2>
            <p>
              For technical issues or feedback, email us at{" "}
              <a href="mailto:support@snaptrend.ai" className="text-blue-400 underline">
                support@snaptrend.ai
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">📝 Send Us a Message</h2>
            <form
              action="https://formspree.io/f/your-form-id" // replace with your real Formspree form ID
              method="POST"
              className="space-y-6"
            >
              <div>
                <label className="block text-sm mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Link */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">📚 Browse FAQs</h2>
            <p>
              Find quick answers in our{" "}
              <a href="/faq" className="text-blue-400 underline">
                FAQ section
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
