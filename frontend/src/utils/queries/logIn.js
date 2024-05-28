export async function getToken({username, password}) {
    if(!username || !password) {
        return {error: "Introducte un usuario y una contraseña válidos"}
    }
    
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    let resp
    try{
        resp = await fetch("http://localhost:8000/users/token", {
            method: "POST",
            body: form
        })    
    }catch(error){
        return {error: "Error al iniciar sesión"}
    }

    if(!resp.ok) {
        if(resp.status === 401) {
            return {error: "Usuario o contraseña incorrectos"}
        }
        return {error: "Error al iniciar sesión"}
    }

    const data = await resp.json()
    return data
}
