export async function getAllProducts({page = 1, size = 10} = {}) {
    const response = await fetch(`http://localhost:8000/products?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}


export async function getProductsIdNameCost() {
    const response = await fetch(`http://localhost:8000/products/id-name-cost`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}