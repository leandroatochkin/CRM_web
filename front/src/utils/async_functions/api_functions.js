import { api } from "."

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
    return data  
      
    } catch (error) {
        console.error(error);
    }
}