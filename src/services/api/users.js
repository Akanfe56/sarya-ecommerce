import { baseUrl } from "../index";


export const createUser = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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


export const loginUser = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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