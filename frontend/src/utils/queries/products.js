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


export async function getProductsIdNameCostPrice() {
    const response = await fetch(`http://localhost:8000/products/id-name-cost-price`, {
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

export async function getAllUnitMeasures() {
    const response = await fetch(`http://localhost:8000/products/unit-measures`, {
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


export async function createProduct(productData) {
    console.log(productData)
    const response = await fetch(`http://localhost:8000/products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}

export async function updateProduct(productData) {
    const response = await fetch(`http://localhost:8000/products/${productData.product_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}

export async function deleteProduct(productId) {
    const response = await fetch(`http://localhost:8000/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    return {}
}