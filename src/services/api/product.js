import { baseUrl } from "../index";

export const getProducts = async () => {
    try {
        const response = await fetch(`${baseUrl}/products`);
        console.log(response)
        if (response.ok) {
            return response.json()
        }else{
            throw new Error("Failed to fetch products");
        }
        
    } catch (error) {
        console.log(error)
    }
}