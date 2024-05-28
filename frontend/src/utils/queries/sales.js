import { getCurrentInfoUser } from "./user"

export async function getAllSales({page = 1, size = 10} = {}) {
    const token = sessionStorage.getItem("token")

    let response

    try{
        response = await fetch(`http://localhost:8000/invoices/?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(error){
        return {error: 'Error al obtener las ventas'}
    }

    if(!response.ok){
        return {error: 'Error al obtener las ventas'}
    }
    
    return response.json()
}

export async function getSalesStats(year = new Date().getFullYear()) {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/invoices/stats/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        return {error: 'Error al obtener las estadísticas de ventas'}
    }

    return await response.json()
}

export async function createSale({client_id, products}) {
    const token = sessionStorage.getItem("token")
    const dataMe = await getCurrentInfoUser()

    const postSaleContent = {
        invoice:{
            user_id: dataMe.user_id,
            client_id: client_id
        },
        lines: products
    }

    let response

    try{
        response = await fetch(`http://localhost:8000/invoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postSaleContent)
        })
    }catch(error){
        return {error: 'Error al crear la venta'}
    }

    if(!response.ok){
        if(response.status === 409){
            return {error: 'No hay suficiente stock de algún producto'}
        }
        return {error: response.statusText}
    }

    return await response.json()
}

export async function updateSale({invoice_id, client_id, products}) {
    const token = sessionStorage.getItem("token")
    const dataMe = await getCurrentInfoUser()

    const putSaleContent = {
        invoice:{
            user_id: dataMe.user_id,
            client_id: client_id
        },
        lines: products
    }

    let response

    try{
        response = await fetch(`http://localhost:8000/invoices/${invoice_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(putSaleContent)
        })
    }catch(error){
        return {error: 'Error al actualizar la venta'}
    }

    if(!response.ok){
        if(response.status === 409){
            return {error: 'No hay suficiente stock de algún producto'}
        }
        return {error: "Error al actualizar la venta"}
    }

    return await response.json()
}

export async function deleteSale(invoice_id) {
    const token = sessionStorage.getItem("token")

    let response

    try{
        response = await fetch(`http://localhost:8000/invoices/${invoice_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(error){
        return {error: 'Error al eliminar la venta'}
    }

    if(!response.ok){
        return {error: 'Error al eliminar la venta'}
    }

    return {}
}