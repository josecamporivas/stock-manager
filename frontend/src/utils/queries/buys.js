export async function getAllBuys({page = 1, size = 10} = {}) {
    const response = await fetch(`http://localhost:8000/buys?page=${page}&size=${size}`, {
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

export async function createBuy({supplier_id, listProducts}) {
    const token = sessionStorage.getItem("token")
    if(!token) {
        return {error: "No hay token"}
    }

    const me = await fetch(`http://localhost:8000/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!me.ok){
        return {error: me}
    }

    const dataMe = await me.json()

    const postBuyContent = {
        buy:{
            user_id: dataMe.user_id,
            supplier_id: supplier_id
        },
        products: listProducts
    }

    const response = await fetch(`http://localhost:8000/buys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBuyContent)
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}