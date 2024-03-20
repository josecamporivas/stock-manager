export default async function getAllBuys({page = 1, size = 10} = {}) {
    const token = sessionStorage.getItem("token")
    
    if(!token) {
        return {error: "No hay token"}
    }

    const response = await fetch(`http://localhost:8000/buys?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}
