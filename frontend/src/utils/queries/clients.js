export async function getAllClients({page = 1, size = 10} = {}) {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/clients/?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        return {error: 'Error al obtener los clientes'}
    }
    
    return response.json()
}

export async function createClient(clientInfo) {
    const token = sessionStorage.getItem("token")

    if(!token) {
        return {error: "No hay token"}
    }

    const response = await fetch('http://localhost:8000/clients/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientInfo)
    })

    if(!response.ok){
        return {error: 'Error al crear el cliente'}
    }

    return await response.json()
}