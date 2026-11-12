import Container from "./shared/Container";
import { Link } from "react-router";

const footerLinkClass =
  "text-sm text-white/65 transition-colors hover:text-[#D8F1A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F1A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0500]";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0500] text-white">
      <Container className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr] lg:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F1A0]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8F1A0] font-serif text-lg font-bold text-[#0B0500]">
                S
              </span>
              <span className="font-serif text-2xl font-semibold tracking-wide">SaRya</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Thoughtful finds for everyday style, from fragrances and watches to fashion essentials.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-[#D8F1A0] transition hover:border-[#D8F1A0] hover:bg-[#D8F1A0]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F1A0]"
            >
              Explore the shop <span aria-hidden="true">→</span>
            </Link>
          </div>

          <nav aria-label="Footer site links">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D8F1A0]">Discover</h2>
            <ul className="space-y-3.5">
              <li><Link className={footerLinkClass} to="/">Home</Link></li>
              <li><Link className={footerLinkClass} to="/products">Shop all</Link></li>
              <li><Link className={footerLinkClass} to="/about">About SaRya</Link></li>
              <li><Link className={footerLinkClass} to="/contact">Contact us</Link></li>
            </ul>
          </nav>

          <nav aria-label="Footer product categories">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D8F1A0]">Shop by category</h2>
            <ul className="space-y-3.5">
              <li><Link className={footerLinkClass} to="/tab1">Watches</Link></li>
              <li><Link className={footerLinkClass} to="/tab2">Fragrances</Link></li>
              <li><Link className={footerLinkClass} to="/tab3">Footwear</Link></li>
              <li><Link className={footerLinkClass} to="/tab4">Clothing</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D8F1A0]">We’re here to help</h2>
            <p className="text-sm leading-7 text-white/65">
              Have a question about a product or an order? Send us a message and we’ll be glad to help.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#D8F1A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F1A0]"
            >
              Visit our contact page <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SaRya Store. All rights reserved.</p>
          <p>Everyday finds, chosen with care.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
