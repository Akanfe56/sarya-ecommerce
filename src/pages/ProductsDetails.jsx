import { useContext, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowLeft, FaCheck, FaMinus, FaPlus, FaShoppingBag, FaTruck } from "react-icons/fa";
import Container from "../components/shared/Container";
import ProductItems from "../components/ProductItems";
import { ProductContext } from "../context/ProductContext";

function ProductDetails() {
  const { product, addToCart } = useContext(ProductContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const item = product.find((entry) => String(entry.id) === String(id));

  const related = useMemo(() => {
    if (!item) return [];
    return product
      .filter((entry) => String(entry.id) !== String(item.id) && entry.category === item.category)
      .slice(0, 4);
  }, [item, product]);

  if (!item) {
    return (
      <Container>
        <section className="py-24 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-[#75694f]">Product unavailable</p>
          <h1 className="mb-6">We couldn’t find that item.</h1>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-[#0B0500] px-6 py-3 font-semibold text-[#D8F1A0]">
            <FaArrowLeft aria-hidden="true" /> Back to shop
          </Link>
        </section>
      </Container>
    );
  }

  const image = item.img || item.image || "/img/p3.jpg";
  const priceOnRequest = item.priceOnRequest || item.price == null;
  const price = Number(item.price || 0);
  const category = item.category || "Collection";

  return (
    <main className="product-detail-page pb-16 pt-7 sm:pt-10">
      <Container>
        <Link to="/products" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#75694f] transition hover:text-[#0B0500]">
          <FaArrowLeft aria-hidden="true" /> Continue shopping
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="product-gallery">
            <div className="product-gallery-main group relative overflow-hidden rounded-[1.75rem] bg-[#f3f0e9]">
              <img src={image} alt={item.name} className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.025] sm:h-[560px]" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#514735] shadow-sm backdrop-blur">
                {item.latest ? "Just arrived" : item.featured ? "Curated pick" : "Sarya edit"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3" aria-label="Product image">
              <div className="overflow-hidden rounded-xl border-2 border-[#75694f] bg-[#f3f0e9]">
                <img src={image} alt={`${item.name} view`} className="h-20 w-full object-cover sm:h-24" />
              </div>
              <div className="flex items-center justify-center rounded-xl bg-[#f3f0e9] text-[10px] uppercase tracking-[0.12em] text-[#75694f] sm:text-xs">Thoughtfully<br />selected</div>
              <div className="flex items-center justify-center rounded-xl bg-[#f3f0e9] text-[#75694f]"><FaCheck aria-hidden="true" /><span className="ml-2 text-[10px] uppercase tracking-[0.12em] sm:text-xs">Quality</span></div>
              <div className="flex items-center justify-center rounded-xl bg-[#f3f0e9] text-[#75694f]"><FaTruck aria-hidden="true" /><span className="ml-2 text-[10px] uppercase tracking-[0.12em] sm:text-xs">Delivery</span></div>
            </div>
          </div>

          <section className="product-detail-copy flex flex-col py-1 sm:py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#75694f]">{category}</p>
            <h1 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">{item.name}</h1>
            <p className="mt-5 text-2xl font-semibold">
              {priceOnRequest ? "Price on request" : `$${price.toLocaleString("en-US")}`}
            </p>
            {!priceOnRequest && item.priceSource && (
              <p className="mt-2 text-xs text-gray-500">
                {item.priceType === "suggested retail" ? "U.S. suggested retail price" : item.priceType === "official" ? "Official online price" : "Retailer listing price"} · checked {new Date(`${item.priceChecked || "2026-11-16"}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ·{" "}
                <a href={item.priceSource} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2 hover:text-[#0B0500]">
                  View price source
                </a>
              </p>
            )}
            <div className="my-6 h-px bg-[#e9e5dc]" />
            <p className="max-w-xl text-base leading-7 text-gray-600">{item.description || "A considered piece, selected to bring a little more character to your everyday."}</p>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">Quantity</p>
              <div className="inline-flex items-center rounded-full border border-[#d8d1c5]">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[#f3f0e9]"><FaMinus size={11} /></button>
                <span className="w-9 text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[#f3f0e9]"><FaPlus size={11} /></button>
              </div>
            </div>

            {priceOnRequest ? (
              <a href={item.officialUrl} target="_blank" rel="noreferrer" className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#0B0500] px-6 py-4 text-center font-semibold text-[#D8F1A0] transition hover:bg-[#292016] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2">
                Request price from the brand
              </a>
            ) : (
              <button type="button" onClick={() => addToCart(item.id, quantity, item)} className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#0B0500] px-6 py-4 font-semibold text-[#D8F1A0] transition hover:bg-[#292016] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2">
                <FaShoppingBag aria-hidden="true" /> Add to bag <span className="font-normal opacity-75">·</span> ${(price * quantity).toLocaleString("en-US")}
              </button>
            )}

            <div className="mt-5 grid gap-3 rounded-2xl bg-[#f7f6f2] p-5 text-sm text-[#514735] sm:grid-cols-2">
              <p className="flex items-center gap-3"><FaCheck className="shrink-0" aria-hidden="true" /> Carefully selected by Sarya</p>
              <p className="flex items-center gap-3"><FaTruck className="shrink-0" aria-hidden="true" /> Delivery options at checkout</p>
            </div>
            <p className="mt-5 text-xs leading-5 text-gray-500">Product imagery and color may vary slightly depending on your screen.</p>
          </section>
        </div>

        <section className="mt-16 border-t border-[#e9e5dc] pt-9">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#75694f]">The details</p>
          <div className="mt-4 grid gap-8 sm:grid-cols-[1fr_2fr]">
            <h2 className="text-2xl font-medium">A little more about this piece</h2>
            <p className="max-w-3xl leading-7 text-gray-600">{item.description || `${item.name} is part of our ${category} collection, thoughtfully chosen for its style and everyday appeal.`}</p>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-[#e9e5dc] pt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#75694f]">Keep exploring</p><h2 className="mt-2 text-2xl font-medium">More from {category}</h2></div>
              <Link to="/products" className="text-sm font-semibold underline underline-offset-4">Shop all</Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((relatedItem) => <ProductItems key={relatedItem.id} items={relatedItem} />)}</div>
          </section>
        )}
      </Container>
    </main>
  );
}

export default ProductDetails;
