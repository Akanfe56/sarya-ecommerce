import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router";
import { FiArrowLeft, FiCheck, FiCreditCard } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Container from "../components/shared/Container";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { initiatePayment } from "../services/api/order";
import { paymentApiUrl } from "../services";
import productData from "../Data/ProductData";

const formatMoney = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-[#dedbd4] bg-white px-4 py-3 text-[#0B0500] outline-none transition placeholder:text-gray-400 focus:border-[#75694f] focus:ring-2 focus:ring-[#75694f]/15";

function Checkout() {
  const { calcSubtotal, calcVat, calcTotal, cartItems } = useContext(ProductContext);
  const [state] = useContext(AuthContext);
  const isAuthenticated = Boolean(state?.accessToken);
  const paymentConfigured = Boolean(paymentApiUrl);
  const products = Array.isArray(cartItems?.products) ? cartItems.products : [];
  const subtotal = Number(calcSubtotal() || 0);
  const vat = Number(calcVat() || 0);
  const total = Number(calcTotal() || 0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange", defaultValues: { amount: total.toFixed(2) } });

  useEffect(() => {
    setValue("amount", total.toFixed(2), { shouldValidate: true });
  }, [setValue, total]);

  const initiatePaymentHandler = async (payData) => {
    try {
      const response = await initiatePayment({
        ...payData,
        amount: Number(total.toFixed(2)),
        products: products.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        })),
      });
      const paymentLink =
        typeof response?.data === "string"
          ? response.data
          : response?.data?.link ||
            response?.data?.checkout_url ||
            response?.data?.checkoutUrl ||
            response?.paymentLink ||
            response?.payment_url;

      if (!paymentLink) {
        throw new Error("The payment service did not return a checkout link.");
      }
      const destination = new URL(paymentLink, window.location.origin);
      if (!["http:", "https:"].includes(destination.protocol)) {
        throw new Error("The payment service returned an invalid checkout link.");
      }
      window.location.assign(destination.href);
    } catch (error) {
      toast.error(error.message || "Payment could not be started. Please try again.");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (products.length === 0) {
    return (
      <main className="min-h-[60vh] bg-[#faf9f6] py-16">
        <Container className="px-4 text-center md:px-8">
          <h1 className="mb-3 text-3xl font-bold text-[#0B0500]">Your cart is empty</h1>
          <p className="mb-6 text-gray-600">Add a product before proceeding to checkout.</p>
          <Link to="/products" className="inline-flex rounded-xl bg-[#0B0500] px-6 py-3 font-semibold text-[#D8F1A0]">
            Browse products
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] py-8 md:py-12">
      <Container className="px-4 md:px-8">
        <nav aria-label="Checkout progress" className="mb-8">
          <div className="mb-5 flex items-center gap-2 text-sm">
            <Link to="/cart" className="inline-flex items-center gap-1.5 font-medium text-gray-600 transition hover:text-[#0B0500]">
              <FiArrowLeft aria-hidden="true" /> Back to cart
            </Link>
          </div>
          <ol className="flex max-w-xl items-center" aria-label="Checkout steps">
            <li className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D8F1A0] text-[#0B0500]"><FiCheck aria-hidden="true" /></span>
              Cart
            </li>
            <li aria-hidden="true" className="mx-3 h-px flex-1 bg-[#d8d1c5]" />
            <li aria-current="step" className="flex items-center gap-2 text-sm font-semibold text-[#0B0500]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B0500] text-sm text-[#D8F1A0]">2</span>
              Delivery
            </li>
            <li aria-hidden="true" className="mx-3 h-px flex-1 bg-[#d8d1c5]" />
            <li className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8d1c5] bg-white text-[#75694f]">3</span>
              Payment
            </li>
          </ol>
        </nav>

        <header className="mb-7">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#75694f]">Almost yours</p>
          <h1 className="mb-2 text-3xl font-bold text-[#0B0500] md:text-4xl">Checkout</h1>
          <p className="text-gray-600">Enter your delivery details and review your order.</p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
          <section className="order-2 rounded-2xl border border-[#e9e5dc] bg-white p-5 shadow-sm md:p-7 lg:order-1" aria-labelledby="delivery-heading">
            <div className="mb-6 border-b border-[#eeeae2] pb-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#75694f]">Step 2 of 3</p>
              <h2 id="delivery-heading" className="text-xl font-semibold text-[#0B0500] md:text-2xl">Delivery details</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">Where should we send your order?</p>
              <p className="mt-2 text-sm text-emerald-800">Flutterwave test mode is enabled for this checkout; test transactions do not move real money.</p>
            </div>

            <form onSubmit={handleSubmit(initiatePaymentHandler)} className="space-y-5">
              {!paymentConfigured && (
                <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                  Online payment is not connected yet. Configure the payment backend before placing an order.
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">
                  First name
                  <input {...register("firstName", { required: "First name is required." })} autoComplete="given-name" className={inputClassName} placeholder="First name" />
                  {errors.firstName && <span className="mt-1.5 block text-xs text-red-600">{errors.firstName.message}</span>}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                  <input {...register("lastName", { required: "Last name is required." })} autoComplete="family-name" className={inputClassName} placeholder="Last name" />
                  {errors.lastName && <span className="mt-1.5 block text-xs text-red-600">{errors.lastName.message}</span>}
                </label>
              </div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
                <input type="email" {...register("email", { required: "Email address is required." })} autoComplete="email" className={inputClassName} placeholder="you@example.com" />
                {errors.email && <span className="mt-1.5 block text-xs text-red-600">{errors.email.message}</span>}
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Delivery address
                <textarea rows="3" {...register("address", { required: "Delivery address is required." })} autoComplete="street-address" className={`${inputClassName} resize-y`} placeholder="Street, area, city" />
                {errors.address && <span className="mt-1.5 block text-xs text-red-600">{errors.address.message}</span>}
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Phone number
                <input type="tel" {...register("phone", { required: "Phone number is required.", minLength: { value: 5, message: "Enter a valid phone number." } })} autoComplete="tel" className={inputClassName} placeholder="Your phone number" />
                {errors.phone && <span className="mt-1.5 block text-xs text-red-600">{errors.phone.message}</span>}
              </label>
              <input type="hidden" {...register("amount", { required: true })} />
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !paymentConfigured}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B0500] px-5 py-3.5 font-semibold text-[#D8F1A0] transition hover:bg-[#292016] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white"
              >
                <FiCreditCard aria-hidden="true" />
                {isSubmitting ? "Connecting to payment…" : paymentConfigured ? "Continue to payment" : "Payment unavailable"}
              </button>
            </form>
          </section>

          <aside className="order-1 overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-sm lg:sticky lg:top-6 lg:order-2" aria-labelledby="summary-heading">
            <div className="border-b border-[#eeeae2] px-5 py-4 md:px-6">
              <h2 id="summary-heading" className="text-lg font-semibold text-[#0B0500]">Order summary</h2>
              <p className="mt-1 text-sm text-gray-500">{products.length} {products.length === 1 ? "item" : "items"}</p>
            </div>
            <ul className="max-h-[360px] space-y-4 overflow-y-auto p-5 md:px-6">
              {products.map((item, index) => {
                const product = item.product || {};
                const localProduct = productData.find((entry) => String(entry.id) === String(product.id));
                const image = localProduct?.img || product.img || product.image || "/img/p3.jpg";
                return (
                  <li key={item.id ?? product.id ?? index} className="flex gap-3">
                    <img
                      src={image}
                      alt={product.name || ""}
                      onError={(event) => { event.currentTarget.src = "/img/p3.jpg"; }}
                      className="h-16 w-16 shrink-0 rounded-xl bg-[#f7f6f2] object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-[#0B0500]">{product.name || "Product"}</p>
                      <p className="mt-1 text-xs text-gray-500">Qty {item.quantity} · {formatMoney(product.price)}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-[#0B0500]">{formatMoney(item.amount)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-3 border-t border-[#eeeae2] bg-[#fdfcf9] p-5 text-sm md:px-6">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>VAT (7.5%)</span><span>{formatMoney(vat)}</span></div>
              <div className="flex justify-between border-t border-[#e5e0d6] pt-4 text-base font-bold text-[#0B0500]"><span>Total</span><span>{formatMoney(total)}</span></div>
              <p className="pt-1 text-xs leading-5 text-gray-500">Payment is completed on the payment provider’s page after you continue.</p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}

export default Checkout;
