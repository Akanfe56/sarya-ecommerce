import { paymentApiUrl } from "../index";

const postOrderRequest = async (path, data, fallbackMessage) => {
  if (!paymentApiUrl) {
    throw new Error(
      "Payment is not configured yet. Add VITE_PAYMENT_API_URL with your payment backend URL."
    );
  }

  let response;
  try {
    response = await fetch(`${paymentApiUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Could not reach the payment service. Check your connection and try again.");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.message || result?.error || fallbackMessage);
  }
  return result;
};

export const initiatePayment = (data) =>
  postOrderRequest(
    "/initiate-payment",
    data,
    "Payment could not be started. Please try again."
  );

export const verifyPayment = (data) =>
  postOrderRequest(
    "/verify-payment",
    data,
    "Payment could not be verified. Please try again."
  );
