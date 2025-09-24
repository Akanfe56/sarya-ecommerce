import { baseUrl } from "../index"

export const getCartItems = async () => {
    try {
        const response = await fetch(`${baseUrl}/carts`, {
            method: "GET",   
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }     
        })
        console.log(response)
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Failed to fetch products')
        }
    } catch (error) {
        console.log(error)
    }
}

export const addCartItem = async (productId, quantity) => {
    try {
        const response = await fetch(`${baseUrl}/add-to-cart`, {
            method: "POST",   
            headers: {
                "Content-Type": "application/json",
               "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ productId, quantity })
        })
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Failed to add items to cart')
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateCartItem = async (productId, quantity) => {
    try {
        const response = await fetch(`${baseUrl}/update-cart-items`, {
            method: "PUT",   
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ productId, quantity })
        })
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Failed to fetch products')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteCartItem = async (productId) => {
    try {
        const response = await fetch(`${baseUrl}/delete-cart-items`, {
            method: "DELETE",   
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ productId })
        })
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Failed to fetch products')
        }
    } catch (error) {
        console.log(error)
    }
}