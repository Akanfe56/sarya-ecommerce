import { useState } from "react";
import { FiArrowUpRight, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend } from "react-icons/fi";
import Container from "../components/shared/Container";

const supportEmail = import.meta.env.VITE_CONTACT_EMAIL;
const supportPhone = import.meta.env.VITE_CONTACT_PHONE;
const supportWhatsApp = import.meta.env.VITE_CONTACT_WHATSAPP;
const supportAddress = import.meta.env.VITE_CONTACT_ADDRESS;

function Contacts() {
  const [notice, setNotice] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!supportWhatsApp && !supportEmail) {
      setNotice({
        type: "error",
        text: "The contact form is not set up yet. Please try again soon.",
      });
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    if (supportWhatsApp) {
      const number = supportWhatsApp.replace(/[^\d]/g, "");
      if (!number) {
        setNotice({ type: "error", text: "WhatsApp contact is not configured correctly. Please try again soon." });
        return;
      }
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(`Subject: ${subject}\n${body}`)}`, "_blank", "noopener,noreferrer");
      setNotice({ type: "success", text: "WhatsApp is opening with your message ready. Tap Send in WhatsApp to deliver it to us." });
      return;
    }

    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice({ type: "success", text: "Your email app is opening with your message ready to send." });
  };

  const contactMethods = [
    supportEmail && {
      label: "Email us",
      value: supportEmail,
      href: `mailto:${supportEmail}`,
      icon: <FiMail size={20} aria-hidden="true" />,
    },
    supportPhone && {
      label: "Call us",
      value: supportPhone,
      href: `tel:${supportPhone.replace(/[^+\d]/g, "")}`,
      icon: <FiPhone size={20} aria-hidden="true" />,
    },
    supportWhatsApp && {
      label: "WhatsApp us",
      value: supportWhatsApp,
      href: `https://wa.me/${supportWhatsApp.replace(/[^\d]/g, "")}`,
      icon: <FiMessageCircle size={20} aria-hidden="true" />,
    },
    supportAddress && {
      label: "Visit us",
      value: supportAddress,
      icon: <FiMapPin size={20} aria-hidden="true" />,
    },
  ].filter(Boolean);

  return (
    <main
      className="bg-cover bg-center py-12 md:py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(250, 249, 246, 0.64), rgba(250, 249, 246, 0.72)), url('/img/p3.jpg')",
      }}
    >
      <Container className="px-4 md:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#75694f]">
              We’re here to help
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-[#0B0500] md:text-5xl">
              Get in touch
            </h1>
            <p className="text-base leading-7 text-gray-600 md:text-lg">
              Questions about a product, an order, or anything else? Send us a
              message and the Sarya’s Store team will be glad to help.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-3xl bg-[#0B0500] p-7 text-white md:p-9">
              <h2 className="mb-3 text-2xl font-semibold">Contact information</h2>
              <p className="mb-8 leading-6 text-white/70">
                Choose a contact method or send us a note using the form.
              </p>

              {contactMethods.length > 0 ? (
                <div className="space-y-3">
                  {contactMethods.map(({ label, value, href, icon }) => {
                    const content = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#D8F1A0]">
                          {icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-white/60">{label}</span>
                          <span className="block break-words font-medium">{value}</span>
                        </span>
                        {href && <FiArrowUpRight aria-hidden="true" />}
                      </>
                    );

                    return href ? (
                      <a key={label} href={href} className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition hover:bg-white/5">
                        {content}
                      </a>
                    ) : (
                      <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 p-4">
                        {content}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/75">
                  Our support channels are being updated. You can still send a
                  message using the form on this page.
                </div>
              )}

              <div className="mt-10 rounded-2xl bg-[#D8F1A0] p-5 text-[#0B0500]">
                <p className="font-semibold">Sarya’s Store</p>
                <p className="mt-1 text-sm text-[#0B0500]/70">
                  Fragrance, watches, and style for every day.
                </p>
              </div>
            </aside>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-9">
              <h2 className="mb-2 text-2xl font-semibold text-[#0B0500]">Send us a message</h2>
              <p className="mb-7 text-sm leading-6 text-gray-600">
                Complete the form below and we’ll help with your enquiry.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your name
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15"
                      placeholder="Name"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                  <input
                    name="subject"
                    type="text"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15"
                    placeholder="What can we help with?"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                  <textarea
                    name="message"
                    rows="6"
                    required
                    className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15"
                    placeholder="Write your message here..."
                  />
                </label>

                {notice && (
                  <p
                    role="status"
                    className={`rounded-xl px-4 py-3 text-sm ${notice.type === "error" ? "bg-amber-50 text-amber-900" : "bg-green-50 text-green-800"}`}
                  >
                    {notice.text}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B0500] px-6 py-3.5 font-semibold text-white transition hover:bg-[#292016] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2 sm:w-auto"
                >
                  <FiSend aria-hidden="true" />
                  Send message
                </button>
              </form>
            </section>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Contacts;
