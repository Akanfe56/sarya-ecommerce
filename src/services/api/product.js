import { productsBaseUrl } from "../index";

export const getProducts = async () => {
    if (!productsBaseUrl) return null;

    try {
        const response = await fetch(`${productsBaseUrl}/products`);
        if (response.ok) {
            return response.json()
        }
        throw new Error(`Failed to fetch products (${response.status})`);
    } catch (error) {
        console.error("Could not load products from the configured API:", error);
        return null;
    }
}
