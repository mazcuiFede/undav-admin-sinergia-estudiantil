const baseUrl = process.env.REACT_APP_API_URL;

const TECNOLOGIA = "tecnologia"
const TRABAJO = "trabajo"
const UNIVERSIDAD = "universidad"

export const dudasService = {
  getDudas,
  dudasUniversitarias,
  dudasLaborales,
  dudasTecnologia,
  getDudaById,
  guardarDuda,
  putDudaComment,
  deleteDuda
};

async function getDudas() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    };
    let url = `${baseUrl}/api/dudas`
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
}

async function deleteDuda(dudaId) {

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    };
    
    let url = `${baseUrl}/api/duda/${dudaId}`
    debugger
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
}

async function getDudaById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    };
    let url = `${baseUrl}/api/duda/${id}`
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
  
  }

async function putDudaComment(id, comentarios) {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") },
        body: JSON.stringify({"comentarios": comentarios})
    };
    
    let url = `${baseUrl}/api/duda/${id}`
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
  
}


async function guardarDuda(titulo, descripcion, tags, tipo) {

    let tagsParseadas = tags.split(" ");

    const duda = {
        titulo, 
        descripcion, 
        tags: tagsParseadas, 
        tipo,
        comentarios: []
    }


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") },
        body: JSON.stringify(duda)
    };
  
    let url = `${baseUrl}/api/duda`
  
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
  
}

  async function dudasUniversitarias() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    };
  
    let url = `${baseUrl}/api/duda/tipo/${UNIVERSIDAD}`
  
    const data = await fetch(url, requestOptions)
    const result = await data.json();
  
    return result
  
  }

async function dudasLaborales() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    };

    let url = `${baseUrl}/api/duda/tipo/${TRABAJO}`

    const data = await fetch(url, requestOptions)
    const result = await data.json();

    return result
}

async function dudasTecnologia() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
    };

    let url = `${baseUrl}/api/duda/tipo/${TECNOLOGIA}`

    const data = await fetch(url, requestOptions)
    const result = await data.json();

    return result
}

export default dudasService 