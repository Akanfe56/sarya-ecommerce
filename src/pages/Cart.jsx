import React, { useContext } from "react";
import { Link } from "react-router";
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import Container from "../components/shared/Container";
import { ProductContext } from "../context/ProductContext";

const formatPrice = (value) => `$${Number(value || 0).toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

function Cart() {
  const {
    cartItems,
    updateCart,
    deleteCart,
    calcSubtotal,
    calcVat,
    calcTotal,
  } = useContext(ProductContext);
  const products = cartItems?.products || [];
  const itemCount = products.reduce((total, item) => total + (Number(item.quantity) || 0), 0);

  return (
    <main className="min-h-screen bg-[#faf9f6] py-8 md:py-14">
      <Container className="px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#75694f] transition hover:text-[#0B0500]">
          <FiArrowLeft aria-hidden="true" /> Continue shopping
        </Link>

        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e9e5dc] pb-6 md:mb-10 md:pb-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#75694f]">Your selection</p>
            <h1 className="font-serif text-4xl font-medium text-[#0B0500] sm:text-5xl">Shopping bag</h1>
            <p className="mt-3 text-sm text-gray-600">Review your picks before you make them yours.</p>
          </div>
          <span className="rounded-full border border-[#e9e5dc] bg-white px-4 py-2 text-sm text-[#75694f]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </header>

        {products.length === 0 ? (
          <section className="rounded-3xl border border-[#e9e5dc] bg-white px-6 py-16 text-center shadow-sm md:py-20">
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f1e8] text-[#75694f]">
              <FiShoppingBag size={26} aria-hidden="true" />
            </span>
            <h2 className="font-serif text-3xl text-[#0B0500]">Your bag is taking a little breather.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">When you find something you love, add it here and it will be waiting for you.</p>
            <Link to="/products" className="mt-7 inline-flex items-center justify-center rounded-full bg-[#0B0500] px-6 py-3 text-sm font-semibold text-[#D8F1A0] transition hover:bg-[#292016]">
              Explore the collection
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
            <section aria-label="Items in your bag" className="space-y-4">
              {products.map((item, index) => {
                const product = item?.product || {};
                const rawImage = product.img || product.image || "/img/p3.jpg";
                const image = /^(https?:|data:|blob:)/i.test(rawImage) || rawImage.startsWith("/") ? rawImage : `/${rawImage}`;
                const quantity = Math.max(1, Number(item.quantity) || 1);
                const price = Number(product.price) || 0;

                return (
                  <article key={product.id || index} className="flex gap-4 rounded-2xl border border-[#e9e5dc] bg-white p-3 shadow-sm sm:gap-5 sm:p-5">
                    <img src={image} alt={product.name || "Selected product"} className="h-28 w-24 shrink-0 rounded-xl bg-[#f5f1e8] object-cover sm:h-36 sm:w-32" />
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 py-1 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#75694f]">{product.category || "SaRya selection"}</p>
                        <h2 className="line-clamp-2 font-serif text-lg font-medium text-[#0B0500] sm:text-xl">{product.name || "Selected item"}</h2>
                        <p className="mt-2 text-sm font-semibold text-[#0B0500]">{formatPrice(price)}</p>
                        <p className="mt-1 text-xs text-gray-500 sm:hidden">Line total: {formatPrice(item.amount ?? price * quantity)}</p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="inline-flex items-center rounded-full border border-[#e9e5dc] bg-[#faf9f6] p-1">
                          <button type="button" aria-label={`Decrease ${product.name || "item"} quantity`} onClick={() => updateCart(product.id, Math.max(1, quantity - 1))} className="flex h-8 w-8 items-center justify-center rounded-full text-[#75694f] transition hover:bg-white hover:text-[#0B0500]">
                            <FiMinus size={14} aria-hidden="true" />
                          </button>
                          <input
                            aria-label={`${product.name || "Item"} quantity`}
                            type="number"
                            min="1"
                            step="1"
                            value={quantity}
                            onChange={(event) => {
                              const nextQuantity = Number(event.target.value);
                              if (Number.isInteger(nextQuantity) && nextQuantity > 0) updateCart(product.id, nextQuantity);
                            }}
                            className="w-9 border-0 bg-transparent p-0 text-center text-sm font-semibold text-[#0B0500] outline-none"
                          />
                          <button type="button" aria-label={`Increase ${product.name || "item"} quantity`} onClick={() => updateCart(product.id, quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full text-[#75694f] transition hover:bg-white hover:text-[#0B0500]">
                            <FiPlus size={14} aria-hidden="true" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="hidden text-sm font-semibold text-[#0B0500] sm:inline">{formatPrice(item.amount ?? price * quantity)}</span>
                          <button type="button" aria-label={`Remove ${product.name || "item"}`} onClick={() => deleteCart(product.id)} className="flex h-9 w-9 items-center justify-center rounded-full text-[#9f5548] transition hover:bg-[#f8eeeb]" title="Remove item">
                            <FiTrash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <span className="sr-only">Line total: {formatPrice(item.amount ?? price * quantity)}</span>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="rounded-2xl border border-[#e9e5dc] bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="font-serif text-2xl text-[#0B0500]">Order summary</h2>
              <div className="mt-6 space-y-4 border-b border-[#e9e5dc] pb-5 text-sm">
                <div className="flex justify-between gap-4 text-gray-600"><span>Subtotal</span><span className="font-medium text-[#0B0500]">{formatPrice(calcSubtotal())}</span></div>
                <div className="flex justify-between gap-4 text-gray-600"><span>VAT <span className="text-xs">(7.5%)</span></span><span className="font-medium text-[#0B0500]">{formatPrice(calcVat())}</span></div>
                <p className="text-xs leading-5 text-gray-500">Delivery options and any applicable fees are shown at checkout.</p>
              </div>
              <div className="flex items-center justify-between gap-4 py-5">
                <span className="font-semibold text-[#0B0500]">Total</span>
                <span className="text-xl font-semibold text-[#0B0500]">{formatPrice(calcTotal())}</span>
              </div>
              <Link to="/checkout" className="flex w-full items-center justify-center rounded-full bg-[#0B0500] px-6 py-3.5 text-sm font-semibold text-[#D8F1A0] transition hover:bg-[#292016] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2">
                Proceed to checkout <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <p className="mt-4 text-center text-xs text-gray-500">Secure checkout · Easy order review</p>
            </aside>
          </div>
        )}
      </Container>
    </main>
  );
}

export default Cart;
