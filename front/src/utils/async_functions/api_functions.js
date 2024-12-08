import { api } from "."
import { base64ToBlob } from "../helper_functions/helper_functions"

export const login = async (username, password) => {
    try{
        const response = await fetch(api.login,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        },
        body: JSON.stringify({username, password})
    })

    const data = await response.json()
    console.log(data)
    return data  
      
    } catch (error) {
        console.error(error);
    }
}

export const uploadProfilePic = async (file, userId) => {

    const formatFile = base64ToBlob(file)
    try {
        // Create FormData object
        const formData = new FormData();
        formData.append('image', formatFile); // Append the file
        formData.append('userId', userId); // Additional data if needed

        console.log([...formData.entries()]);

        // Make the fetch request
        const response = await fetch(api.uploadProfilePic, {
            method: 'POST',
            body: formData, // FormData as the body
        });

        // Parse the response
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        throw error; // Re-throw the error for the caller to handle
    }
}

export const changePassword = async (employeeId, oldPassword, newPassword) => {
    try{
        const response = await fetch(api.changePassword,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        },
        body: JSON.stringify({employeeId, oldPassword, newPassword})
    })

    const data = await response.json()
    console.log(data)
    return data  
      
    } catch (error) {
        console.error(error);
    }
}