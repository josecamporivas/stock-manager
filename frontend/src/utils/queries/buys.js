import { getCurrentInfoUser } from "./user"

export async function getAllBuys({page = 1, size = 10} = {}) {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/buys/?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    const data = await response.json()
    return data
}

export async function getBuysStats(year = new Date().getFullYear()) {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/buys/stats/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
    const dataMe = await getCurrentInfoUser()

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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postBuyContent)
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    return await response.json()
}

export async function updateBuy({buy_id, supplier_id, listProducts}) {
    const token = sessionStorage.getItem("token")
    const dataMe = await getCurrentInfoUser()

    const putBuyContent = {
        buy:{
            user_id: dataMe.user_id,
            supplier_id: supplier_id
        },
        products: listProducts
    }

    const response = await fetch(`http://localhost:8000/buys/${buy_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(putBuyContent)
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    return await response.json()
}

export async function deleteBuy(buy_id) {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/buys/${buy_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        return {error: response.statusText}
    }

    return {}
}
