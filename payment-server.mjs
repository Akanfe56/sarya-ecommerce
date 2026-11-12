import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import productData from "./src/Data/ProductData.js";

const port = Number(process.env.PAYMENT_PORT || 3001);
const secretKey = process.env.FLW_SECRET_KEY;
const currency = (process.env.FLW_CURRENCY || "USD").toUpperCase();
const appUrl = process.env.APP_URL || "http://localhost:5173";
const flutterwaveApi = "https://api.flutterwave.com/v3";
const pendingPayments = new Map();
const productsFile = fileURLToPath(new URL("./db.json", import.meta.url));

const sendJson = (response, status, value) => {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
};

const readJson = async (request) => {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1024 * 1024) throw new Error("Request body is too large.");
  }
  return JSON.parse(body || "{}");
};

const flutterwaveRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.status !== "success") {
    const providerMessage = result?.message || "";
    if (/invalid authorization key|authorization failed/i.test(providerMessage)) {
      const error = new Error("Flutterwave rejected the configured key. Set a valid FLWSECK_TEST- secret in .env.local, then restart the payment server.");
      error.status = 503;
      throw error;
    }
    throw new Error(providerMessage || `Flutterwave request failed (${response.status}).`);
  }
  return result;
};

const createPayment = async (body) => {
  if (!secretKey) {
    const error = new Error("Add your Flutterwave test secret to FLW_SECRET_KEY in .env.local, then restart the app.");
    error.status = 503;
    throw error;
  }
  if (!secretKey.startsWith("FLWSECK_TEST-")) {
    const error = new Error("This local checkout accepts Flutterwave test keys only. Use an FLWSECK_TEST- key.");
    error.status = 503;
    throw error;
  }

  const email = String(body.email || "").trim();
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const phone = String(body.phone || "").trim();
  if (!email || !firstName || !lastName || !phone) {
    const error = new Error("Add your name, email, and phone number to continue.");
    error.status = 400;
    throw error;
  }

  const cart = Array.isArray(body.products) ? body.products : [];
  if (cart.length === 0) {
    const error = new Error("Your cart is empty.");
    error.status = 400;
    throw error;
  }

  const database = JSON.parse(await readFile(productsFile, "utf8"));
  const catalog = new Map(database.products.map((product) => [String(product.id), product]));
  for (const product of productData) catalog.set(String(product.id), product);
  let subtotal = 0;
  const items = cart.map(({ productId, quantity }) => {
    const product = catalog.get(String(productId));
    const count = Number(quantity);
    if (!product || !Number.isInteger(count) || count < 1 || count > 99) {
      const error = new Error("The cart contains an invalid product or quantity. Refresh your cart and try again.");
      error.status = 400;
      throw error;
    }
    subtotal += Number(product.price) * count;
    return { productId: String(product.id), quantity: count, name: product.name };
  });

  const amount = Math.round((subtotal * 1.075 + Number.EPSILON) * 100) / 100;
  const txRef = `sarya-${randomUUID()}`;
  const redirectUrl = new URL("/thankyou", appUrl).toString();
  const result = await flutterwaveRequest(`${flutterwaveApi}/payments`, {
    method: "POST",
    body: JSON.stringify({
      tx_ref: txRef,
      // Flutterwave Standard's hosted checkout expects the amount as text;
      // its checkout UI formats this value as a string.
      amount: amount.toFixed(2),
      currency,
      redirect_url: redirectUrl,
      customer: {
        email,
        name: `${firstName} ${lastName}`,
        phonenumber: phone,
      },
      customizations: { title: "SaRya Store", description: "Test mode checkout" },
    }),
  });

  if (!result.data?.link) throw new Error("Flutterwave did not return a checkout link.");
  pendingPayments.set(txRef, {
    amount,
    currency,
    createdAt: Date.now(),
    shipping: {
      firstName,
      lastName,
      email,
      phone,
      address: String(body.address || "").trim(),
      items,
    },
  });
  return { status: "success", data: { link: result.data.link } };
};

const verifyPayment = async (body) => {
  const txRef = String(body.tx_ref || "");
  const transactionId = String(body.transaction_id || "");
  const expected = pendingPayments.get(txRef);
  if (!expected || !/^\d+$/.test(transactionId)) {
    const error = new Error("This test payment could not be matched to an open checkout.");
    error.status = 400;
    throw error;
  }

  const result = await flutterwaveRequest(
    `${flutterwaveApi}/transactions/${encodeURIComponent(transactionId)}/verify`
  );
  const payment = result.data;
  const verified =
    payment?.status === "successful" &&
    String(payment.tx_ref) === txRef &&
    String(payment.currency).toUpperCase() === expected.currency &&
    Number(payment.amount) >= expected.amount;

  if (!verified) {
    const error = new Error("Flutterwave did not confirm this payment for the expected amount.");
    error.status = 400;
    throw error;
  }

  pendingPayments.delete(txRef);
  return {
    status: "success",
    id: txRef,
    data: {
      id: transactionId,
      tx_ref: txRef,
      amount: payment.amount,
      currency: payment.currency,
      shipping: expected.shipping,
    },
  };
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  try {
    if (request.method === "GET" && pathname === "/health") {
      return sendJson(response, 200, { status: "ok", configured: Boolean(secretKey) });
    }
    if (request.method !== "POST") {
      return sendJson(response, 404, { message: "Route not found." });
    }
    const body = await readJson(request);
    if (pathname === "/initiate-payment") {
      return sendJson(response, 200, await createPayment(body));
    }
    if (pathname === "/verify-payment") {
      return sendJson(response, 200, await verifyPayment(body));
    }
    return sendJson(response, 404, { message: "Route not found." });
  } catch (error) {
    console.error("Payment request failed:", error.message);
    return sendJson(response, error.status || 502, { message: error.message });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local Flutterwave test server listening on http://localhost:${port}`);
  console.log(secretKey?.startsWith("FLWSECK_TEST-")
    ? "Flutterwave test key is configured."
    : "Flutterwave test key is missing; checkout will show setup instructions.");
});
