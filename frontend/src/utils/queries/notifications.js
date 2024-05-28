export async function getUnreadNotifications() {
    const token = sessionStorage.getItem("token")

    const response = await fetch(`http://localhost:8000/notifications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
    
    if(!response.ok){
        return {error: "Error al obtener las notificaciones"}
    }
    
    return await response.json()
}

export async function markNotificationAsRead(notificationId) {
    const token = sessionStorage.getItem("token")

    const response = await fetch(`http://localhost:8000/notifications/${notificationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
    
    if(!response.ok){
        return {error: "Error al marcar la notificación como leída"}
    }
    
    return {}
}