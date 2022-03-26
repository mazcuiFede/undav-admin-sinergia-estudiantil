const baseUrl = process.env.REACT_APP_API_URL;

export const userService = {
  login,
  register,
  logout,
  getUserData,
  getUsuarios,
  putUserStatus
};

async function putUserStatus(id, status) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") },
      body: JSON.stringify({status})
  };

  let url = `${baseUrl}/api/user/${id}`
  const data = await fetch(url, requestOptions)
  const result = await data.json();

  return result
}

async function getUserData(id) {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
  };

  let url = `${baseUrl}/api/user`
  const data = await fetch(url, requestOptions)
  const result = await data.json();

  return result
}

async function getUsuarios() {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + localStorage.getItem("token") }
  };

  let url = `${baseUrl}/api/users`
  const data = await fetch(url, requestOptions)
  const result = await data.json();

  return result
}

async function login(documento, clave) {

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({documento, password: clave})
  };

  let url = `${baseUrl}/api/loginadmin`

  const data = await fetch(url, requestOptions)
  const result = await data.json();

  return result

}

async function register(estudiante){

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante)
  };
  
  let url = `${baseUrl}/api/registrarse`
  const data = await fetch(url, requestOptions)
  const result = await data.json();

  return result
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
}

export default userService 