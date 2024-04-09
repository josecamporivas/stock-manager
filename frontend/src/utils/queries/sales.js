export async function getAllSales({page = 1, size = 10} = {}) {
    const token = sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/invoices/?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        return {error: 'Error al obtener las ventas'}
    }
    
    return response.json()
}