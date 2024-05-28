export async function getAllUsers() {
    const token = sessionStorage.getItem("token")

    let result

    try{
        result = await fetch(`http://localhost:8000/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(e){
        return {error: 'Error al obtener los usuarios'}
    }

    if(!result.ok) {
        return {error: 'Error al obtener los usuarios'}
    }

    return await result.json()
}

export async function getCurrentInfoUser() {
    const token = sessionStorage.getItem("token")
    if(!token) {
        return {error: "No hay token"}
    }

    let me

    try{
        me = await fetch(`http://localhost:8000/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(e){
        return {error: 'Error al obtener la información del usuario'}
    }

    if(!me.ok){
        return {error: 'Error al obtener la información del usuario'}
    }

    return await me.json()
}

export async function createUser(data) {
    let result
    try{
        const token = sessionStorage.getItem("token")
        result = await fetch(`http://localhost:8000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
    }catch(error){
        return {error: 'Error al crear el usuario'}
    }

    if(!result.ok) {
        return {error: 'Error al crear el usuario'}
    }

    return await result.json()
}


export async function updateUser(data) {
    let result;
    try{
        const token = sessionStorage.getItem("token")
        result = await fetch(`http://localhost:8000/users/${data.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
    }catch(e){
        return {error: 'Error al actualizar la información'}
    }

    if(!result.ok) {
        try {
            const error = await result.json()
            return {error: error.detail || 'Error al actualizar la información'}
        } catch (error) {
            return {error: 'Error al actualizar la información'}
        }
    }

    return await result.json()
}

export async function deleteUser(user_id) {
    try{
        const token = sessionStorage.getItem("token")
        const result = await fetch(`http://localhost:8000/users/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(e){
        return {error: 'Error al eliminar el usuario'}
    }

    if(!result.ok) {
        return {error: 'Error al eliminar el usuario'}
    }

    return {}
}