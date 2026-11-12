import { useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FiArrowLeft, FiCheck, FiHome, FiLoader, FiPackage, FiX } from "react-icons/fi";
import Container from "../components/shared/Container";
import { ProductContext } from "../context/ProductContext";

const successfulPaymentStatuses = new Set(["successful", "success", "succeeded", "completed"]);

function ThankYou() {
  const { createOrder } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const [paymentState, setPaymentState] = useState("verifying");
  const [verifiedOrder, setVerifiedOrder] = useState(null);
  const verificationStarted = useRef(false);
  const txRef = searchParams.get("tx_ref");
  const transactionId = searchParams.get("transaction_id");
  const gatewayStatus = searchParams.get("status")?.toLowerCase();

  useEffect(() => {
    if (verificationStarted.current) return;
    verificationStarted.current = true;

    if (gatewayStatus && !successfulPaymentStatuses.has(gatewayStatus)) {
      setPaymentState("failed");
      return;
    }

    if (!txRef || !transactionId) {
      setPaymentState("unavailable");
      return;
    }

    createOrder({ tx_ref: txRef, transaction_id: transactionId })
      .then((result) => {
        if (result) {
          setVerifiedOrder(result);
          setPaymentState("success");
        } else {
          setPaymentState("failed");
        }
      })
      .catch(() => setPaymentState("failed"));
  }, [createOrder, gatewayStatus, transactionId, txRef]);

  const stateContent = {
    verifying: {
      icon: <FiLoader className="animate-spin" aria-hidden="true" />,
      iconClass: "bg-[#f2eedf] text-[#75694f]",
      eyebrow: "Please wait",
      title: "Confirming your payment",
      body: "We’re checking your payment with the provider. Keep this page open for a moment.",
    },
    success: {
      icon: <FiCheck aria-hidden="true" />,
      iconClass: "bg-green-100 text-green-700",
      eyebrow: "Order confirmed",
      title: "Thank you for your order!",
      body: "Your payment has been verified and your order is being processed.",
    },
    failed: {
      icon: <FiX aria-hidden="true" />,
      iconClass: "bg-red-100 text-red-700",
      eyebrow: "Payment not confirmed",
      title: "We couldn’t confirm your payment",
      body: "The payment may have been cancelled or could not be verified. If you were charged, please contact support with your transaction reference.",
    },
    unavailable: {
      icon: <FiPackage aria-hidden="true" />,
      iconClass: "bg-[#f2eedf] text-[#75694f]",
      eyebrow: "Payment status unavailable",
      title: "We don’t have your payment details",
      body: "Return to the store and check your order status. If you completed a payment, contact support with your transaction reference.",
    },
  };
  const content = stateContent[paymentState];

  return (
    <main className="flex min-h-[70vh] items-center bg-[#faf9f6] py-12 md:py-16">
      <Container className="px-4 md:px-8">
        <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#e9e5dc] bg-white shadow-lg">
          <div className="h-2 bg-[#D8F1A0]" />
          <div className="px-6 py-10 text-center md:px-12 md:py-14">
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${content.iconClass}`}>
              {content.icon}
            </div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#75694f]">
              {content.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold text-[#0B0500] md:text-4xl">
              {content.title}
            </h1>
            <p className="mx-auto max-w-lg leading-7 text-gray-600">{content.body}</p>

            {paymentState === "success" && txRef && (
              <div className="mx-auto mt-7 max-w-md rounded-xl bg-[#f7f6f2] px-4 py-3 text-sm">
                <span className="text-gray-500">Order reference</span>
                <span className="mt-1 block break-all font-semibold text-[#0B0500]">{txRef}</span>
              </div>
            )}
            {paymentState === "success" && verifiedOrder?.id && (
              <p className="mt-3 text-sm text-gray-500">Order number: {verifiedOrder.id}</p>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {paymentState === "failed" || paymentState === "unavailable" ? (
                <Link to="/cart" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0500] px-6 py-3 font-semibold text-[#D8F1A0] transition hover:bg-[#292016]">
                  <FiArrowLeft aria-hidden="true" /> Return to cart
                </Link>
              ) : (
                <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0500] px-6 py-3 font-semibold text-[#D8F1A0] transition hover:bg-[#292016]">
                  <FiPackage aria-hidden="true" /> Continue shopping
                </Link>
              )}
              <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d8d1c5] px-6 py-3 font-semibold text-[#0B0500] transition hover:bg-[#f7f6f2]">
                <FiHome aria-hidden="true" /> Back to home
              </Link>
            </div>

            {paymentState === "failed" && txRef && (
              <p className="mt-6 break-all text-xs text-gray-500">Transaction reference: {txRef}</p>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}

export default ThankYou;
