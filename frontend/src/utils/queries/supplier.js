export async function getAllSuppliers({page = 1, size = 10} = {}) {
    const token = sessionStorage.getItem("token")
    
    if(!token) {
        return {error: "No hay token"}
    }

    const response = await fetch(`http://localhost:8000/suppliers?page=${page}&size=${size}`, {
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

export async function createSupplier(supplier) {
    const token = sessionStorage.getItem("token")
    
    if(!token) {
        return {error: "No hay token"}
    }

    const response = await fetch(`http://localhost:8000/suppliers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(supplier)
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}