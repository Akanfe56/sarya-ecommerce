import { Link } from "react-router";
import Container from "../components/shared/Container";

const values = [
  {
    title: "Quality without compromise",
    description: "We take care to offer products chosen for their quality and lasting appeal.",
  },
  {
    title: "Integrity in action",
    description: "We aim to be open, honest, and thoughtful in every customer interaction.",
  },
  {
    title: "Customer-centered service",
    description: "Your experience matters to us, from discovering a product to receiving your order.",
  },
  {
    title: "Innovation and creativity",
    description: "We keep exploring fresh ideas while staying true to what makes Sarya special.",
  },
];

function About() {
  return (
    <main
      className="bg-cover bg-center py-12 md:py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(250, 249, 246, 0.68), rgba(250, 249, 246, 0.76)), url('/img/p3.jpg')",
      }}
    >
      <Container className="px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 rounded-3xl bg-[#0B0500] px-6 py-12 text-center text-white shadow-lg md:px-12 md:py-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#D8F1A0]">
              Quality · Style · Care
            </p>
            <h1 className="mb-5 text-4xl font-bold md:text-5xl">About Sarya</h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              A store built around thoughtful finds, dependable quality, and a
              shopping experience that feels personal.
            </p>
          </header>

          <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#75694f]">
              Our story
            </p>
            <h2 className="mb-5 text-2xl font-bold text-[#0B0500] md:text-3xl">
              Style and value, together
            </h2>
            <div className="max-w-4xl space-y-4 text-base leading-8 text-gray-700">
              <p>
                Welcome to Sarya, your destination for quality, style, and a
                thoughtful customer experience. We started with a clear purpose:
                to build a brand that goes beyond selling products—to inspire
                trust, build lasting relationships, and become a name people are
                proud to recommend.
              </p>
              <p>
                The idea for Sarya came from a desire to bring style, reliability,
                and affordability together. We believe customers should be able
                to find products that feel special and offer lasting value. We
                listen to feedback, adapt to changing tastes, and keep improving
                while staying true to our values.
              </p>
            </div>
          </section>

          <section className="my-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-[#D8F1A0] p-7 shadow-sm md:p-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#514b38]">
                Our mission
              </p>
              <h2 className="mb-4 text-2xl font-bold text-[#0B0500]">
                Make everyday life feel a little more special
              </h2>
              <p className="leading-7 text-[#27251f]">
                We create products and experiences that inspire trust, deliver
                value, and bring people together around a shared appreciation
                for quality and authenticity.
              </p>
            </article>
            <article className="rounded-3xl border border-white/70 bg-white/90 p-7 shadow-sm backdrop-blur-sm md:p-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#75694f]">
                Our vision
              </p>
              <h2 className="mb-4 text-2xl font-bold text-[#0B0500]">
                A name people feel connected to
              </h2>
              <p className="leading-7 text-gray-700">
                We envision Sarya becoming a household name known for quality,
                creativity, and care—growing our reach while keeping a personal,
                customer-first approach.
              </p>
            </article>
          </section>

          <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-10">
            <div className="mb-7 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#75694f]">
                What guides us
              </p>
              <h2 className="text-2xl font-bold text-[#0B0500] md:text-3xl">
                The values behind every choice
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <article key={value.title} className="rounded-2xl bg-[#f7f6f2] p-5 md:p-6">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B0500] text-sm font-bold text-[#D8F1A0]">
                    0{index + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-[#0B0500]">
                    {value.title}
                  </h3>
                  <p className="leading-6 text-gray-600">{value.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#0B0500] p-7 text-white shadow-lg md:flex-row md:items-center md:p-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D8F1A0]">
                Our promise
              </p>
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                You’re part of the Sarya story
              </h2>
              <p className="leading-7 text-white/75">
                Thank you for trusting us. We’ll keep working to make your
                experience thoughtful, memorable, and worthy of recommending.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-xl bg-[#D8F1A0] px-6 py-3 font-semibold text-[#0B0500] transition hover:bg-white"
              >
                Explore the store
              </Link>
              <Link
                to="/"
                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Back to homepage
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default About;
