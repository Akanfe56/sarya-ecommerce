import Container from "../components/shared/Container";
import Trending from "../components/Trending";
import Featured from "../components/Featured";
import Latest from "../components/Latest";
import { Link } from "react-router";

function Home() {
  return (
    <main className="bg-[#faf9f6]">
      <Container className="px-4 py-12 md:px-8 md:py-16">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#75694f]">
            The SaRya edit
          </p>
          <h2 className="mb-4 font-serif text-3xl font-medium leading-tight text-[#0B0500] sm:text-4xl md:text-5xl">
            A little something <span className="text-[#75694f] italic">that feels like you.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Explore fragrances, watches, footwear, and fashion selected to bring a little more style to your day.
          </p>
        </header>

        <nav aria-label="Shop by category" className="mb-14 grid grid-cols-2 gap-3 md:mb-16 md:grid-cols-4 md:gap-4">
          {[
            ["01", "Watches", "/tab1"],
            ["02", "Fragrance", "/tab2"],
            ["03", "Footwear", "/tab3"],
            ["04", "Clothing", "/tab4"],
          ].map(([number, label, href]) => (
            <Link key={label} to={href} className="home-category-link flex items-center justify-between rounded-xl border border-[#e9e5dc] bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md sm:px-5">
              <span className="flex items-center gap-3"><span className="text-[10px] tracking-widest text-[#75694f]">{number}</span><span className="font-medium text-[#0B0500]">{label}</span></span>
              <span aria-hidden="true" className="text-[#75694f]">↗</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-14 md:space-y-16">
          <Trending />
          <Featured />
          <Latest />
        </div>
      </Container>
    </main>
  );
}

export default Home;
