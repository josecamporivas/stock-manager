export default async function Buys() {
    const token = sessionStorage.getItem("token")
    
    if(!token) {
        return {error: "No hay token"}
    }


    //TODO: Hacer la petición a la API
    

}
