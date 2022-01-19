const baseUrl = process.env.REACT_APP_API_URL;

export const eventoServices = {
    obtenerEventos,
    guardarEvento,
    eliminarEvento
}

async function obtenerEventos(){
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    }

    let url = `${baseUrl}/api/evento`
  
    const data = await fetch(url, requestOptions)
    const result = await data.json();
    debugger
    
    return result
}

async function guardarEvento(evento) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") },
        body: JSON.stringify(evento)
    }
    
    let url = `${baseUrl}/api/evento`
  
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
}

async function eliminarEvento(id) {
    const requestOptions = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    }
    debugger
    let url = `${baseUrl}/api/evento/${id}`
  
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
}