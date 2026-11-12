import { useState } from "react";
import { useContext } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import { ProductContext } from "../context/ProductContext";
import Container from "../components/shared/Container";
import ProductItems from "../components/ProductItems";
import Tab from "./Tab";

function Products() {
  const { product, searchQuery, HandleSearch } = useContext(ProductContext);
  const [sortBy, setSortBy] = useState("featured");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleProducts = product
    .filter((item) => {
      return (
        !normalizedQuery ||
        item.name?.toLowerCase().includes(normalizedQuery) ||
        item.description?.toLowerCase().includes(normalizedQuery) ||
        item.category?.toLowerCase().includes(normalizedQuery)
      );
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "name") return String(a.name).localeCompare(String(b.name));
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });

  return (
    <main className="min-h-screen bg-[#faf9f6] py-10 md:py-14">
      <Container className="px-4 md:px-8">
        <header className="mb-10 overflow-hidden rounded-3xl bg-[#0B0500] px-6 py-10 text-white shadow-sm md:px-10 md:py-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D8F1A0]">
            Sarya’s Store / Shop
          </p>
          <div className="max-w-3xl">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">Find something you’ll love</h1>
            <p className="text-base leading-7 text-white/75 md:text-lg">
              Browse our collection of fragrances, wristwatches, and fashion
              pieces, selected to bring quality and style into your everyday.
            </p>
          </div>
        </header>

        <section className="mb-12" aria-labelledby="collections-heading">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#75694f]">Browse by collection</p>
            <h2 id="collections-heading" className="text-2xl font-bold text-[#0B0500]">Shop collections</h2>
          </div>
          <Tab />
        </section>

        <section aria-labelledby="all-products-heading">
          <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#e9e5dc] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-5">
            <div>
              <h2 id="all-products-heading" className="text-2xl font-bold text-[#0B0500]">All products</h2>
              <p className="mt-1 text-sm text-gray-600">
                {visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_190px] md:w-auto md:min-w-[430px]">
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => HandleSearch(event.target.value)}
                  placeholder="Search products"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15"
                />
              </label>
              <label className="relative block">
                <span className="sr-only">Sort products</span>
                <FiSliders className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15"
                >
                  <option value="featured">Featured first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((item) => (
                <ProductItems key={item.id} items={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#cfc8ba] bg-white px-6 py-14 text-center">
              <h3 className="mb-2 text-lg font-semibold text-[#0B0500]">No products found</h3>
              <p className="text-sm text-gray-600">Try another search term or clear your search.</p>
              <button
                type="button"
                onClick={() => HandleSearch("")}
                className="mt-5 rounded-lg bg-[#0B0500] px-4 py-2 text-sm font-semibold text-[#D8F1A0]"
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default Products;
