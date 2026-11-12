import { Link } from "react-router";
import { useContext } from "react";
import Container from "./shared/Container";
import ProductItems from "./ProductItems";
import { ProductContext } from "../context/ProductContext";

function CategoryProducts({ category, title, description }) {
  const { product } = useContext(ProductContext);
  const items = product.filter((item) => item.category === category);

  return (
    <main className="min-h-screen bg-[#faf9f6] py-10 md:py-14">
      <Container className="px-4 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link to="/products" className="transition hover:text-[#0B0500]">Shop</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="font-medium text-[#0B0500]">{title}</span>
        </nav>

        <header className="mb-8 rounded-3xl bg-[#0B0500] px-6 py-9 text-white md:px-10 md:py-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D8F1A0]">Sarya’s collection</p>
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="max-w-2xl leading-7 text-white/75">{description}</p>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-[#0B0500]">{title}</h2>
          <p className="text-sm text-gray-600">
            {items.length} {items.length === 1 ? "product" : "products"}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => <ProductItems key={item.id} items={item} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#cfc8ba] bg-white px-6 py-14 text-center">
            <h2 className="mb-2 text-lg font-semibold text-[#0B0500]">No products in this collection yet</h2>
            <p className="mb-5 text-sm text-gray-600">Browse the full store to see what’s available.</p>
            <Link to="/products" className="inline-flex rounded-lg bg-[#0B0500] px-5 py-2.5 text-sm font-semibold text-[#D8F1A0]">Browse all products</Link>
          </div>
        )}
      </Container>
    </main>
  );
}

export default CategoryProducts;
