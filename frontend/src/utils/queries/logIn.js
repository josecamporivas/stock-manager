export default async function getToken({username, password}) {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    try{
        const resp = await fetch("http://localhost:8000/users/token", {
            method: "POST",
            body: form
        })
    
        if(!resp.ok) {
            if(resp.status === 401) {
                return {error: "Usuario o contraseña incorrectos"}
            }
            return {error: "Error al iniciar sesión"}
        }

        const data = await resp.json()
        return data

    }catch(e){
        console.error(e)
    }
}
