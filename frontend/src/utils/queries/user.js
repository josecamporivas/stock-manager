export async function getAllUsers() {
    const result = await fetch(`http://localhost:8000/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if(!result.ok) {
        return {error: 'Error al obtener los usuarios'}
    }

    return await result.json()
}

export async function getCurrentInfoUser() {
    const result = await fetch(`http://localhost:8000/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if(!result.ok) {
        return {error: 'Error al obtener la información del usuario'}
    }

    return await result.json()
}

export async function createUser(data) {
    const result = await fetch(`http://localhost:8000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!result.ok) {
        return {error: 'Error al crear el usuario'}
    }

    return await result.json()
}


export async function updateUser(data) {
    const result = await fetch(`http://localhost:8000/users/${data.user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    if(!result.ok) {
        return {error: 'Error al actualizar la información del usuario'}
    }

    return await result.json()
}

