import { Link } from "react-router";

function Banner() {
  return (
    <section className="home-hero overflow-hidden">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:py-14 lg:min-h-[700px] lg:gap-16">
        <div className="home-hero-copy relative z-10 max-w-xl py-6 md:py-12">
          <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]">
            <span className="h-px w-9 bg-[#75694f]" />
            Fragrance · Watches · Fashion
          </p>
          <h1 className="mb-6 font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            The details make <span className="home-hero-accent italic">the day.</span>
          </h1>
          <p className="home-hero-description mb-9 max-w-md text-base leading-7 sm:text-lg sm:leading-8">
            Find the finishing touch for your everyday style, from scents that stay with you to pieces made to be worn on repeat.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="home-hero-cta rounded-full bg-[#0B0500] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#34291f] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2"
            >
              Explore the collection <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link to="/about" className="home-hero-story rounded-full px-3 py-3 text-sm font-semibold underline decoration-[#b8aa8d] underline-offset-4 transition hover:decoration-current">
              Discover our story
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-4 border-t border-[#d8d1c5] pt-5">
            <span className="font-serif text-2xl">16</span>
            <span className="home-hero-description max-w-40 text-xs leading-5">thoughtfully selected pieces to make your own</span>
            <span className="ml-auto hidden text-xs uppercase tracking-[0.18em] text-[#75694f] sm:block">Curated for everyday</span>
          </div>
        </div>

        <div className="home-hero-visual relative mx-auto w-full max-w-[560px] md:ml-auto">
          <span aria-hidden="true" className="home-hero-orbit home-hero-orbit-one" />
          <span aria-hidden="true" className="home-hero-orbit home-hero-orbit-two" />
          <div className="home-hero-image-wrap relative aspect-[0.88] overflow-hidden rounded-[48%_48%_24px_24px] bg-[#e9dfcc] sm:rounded-[48%_48%_28px_28px]">
            <img src="/img/p3.jpg" alt="Warm amber perfume bottle styled with delicate flowers" className="home-hero-image h-full w-full object-cover object-center" />
            <span aria-hidden="true" className="home-hero-image-glint" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">A moment for you</p>
              <p className="font-serif text-2xl sm:text-3xl">Everyday, elevated.</p>
            </div>
          </div>
          <div className="home-hero-note home-hero-float absolute -left-2 top-10 rounded-full px-4 py-3 shadow-lg sm:-left-8 sm:top-16 sm:px-5">
            <span className="mr-2 text-[#75694f]">✳</span><span className="text-xs font-semibold tracking-wide">Find your signature</span>
          </div>
          <span aria-hidden="true" className="absolute -bottom-5 right-5 -z-10 h-2/3 w-2/3 rounded-full bg-[#D8F1A0]/65 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

export default Banner;
