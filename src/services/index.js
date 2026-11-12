export const paymentApiUrl =
  import.meta.env.VITE_PAYMENT_API_URL ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "/api" : null);

// Retain this alias for the legacy cart API helpers.
export const baseUrl = paymentApiUrl;

// Product data can use the local JSON Server in development, or a configured
// API in production. The app already has a bundled product catalog as fallback.
export const productsBaseUrl =
  import.meta.env.VITE_PRODUCTS_API_URL ||
  paymentApiUrl ||
  (import.meta.env.DEV ? "/api" : null);
