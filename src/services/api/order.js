import { baseUrl } from "../index";


export const initiatePayment = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/initiate-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    }
  
  } catch (error) {
    console.error("Error creating user:", error);
  }
};


export const verifyPayment = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    }
  
  } catch (error) {
    console.error("Error creating user:", error);
  }
};