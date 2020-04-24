require('es6-promise').polyfill();
require('isomorphic-fetch');

const baseUrl = 'https://cabbuddies-um.herokuapp.com'

async function registerUser(email,password,firstName,lastName,phoneNumber,registrationType){
    const data = {email,password,firstName,lastName,phoneNumber,registrationType}
    console.log('read '+JSON.stringify(data))
    const url = baseUrl+'/user/registration'
    return await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
          },
        body: JSON.stringify(data)
      })
    // .then(function(response) {
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }

    //     return response;
    // })
}

async function loginUser(email,password){
    const data = {email,password}
    console.log('read '+JSON.stringify(data))
    const url = baseUrl+'/user/login'
    return await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
          },
        body: JSON.stringify(data)
      })
    // .then(function(response) {
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }
    //     return response;
    // })
    // .then((response)=>{
    //     if(response.status == 200){
    //         //localStorage.setItem("authToken",response.json().authToken);
    //     }
    //     return response;
    // })
}

async function decodeUser(authToken){
    const url = baseUrl+'/jwt/decode'
    return await fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization':'Basic '+authToken
          }
      })
    // .then(function(response) {
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }
    //     console.log(response.json())
    //     return response;
    // })
}

async function createMedia(authToken,_url){
  const data = {url:_url}
  console.log('read '+JSON.stringify(data))
  const url = baseUrl+'/media/create'
  return await fetch(url, {
      method: 'post',
      headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization':'Basic '+authToken
        },
      body: JSON.stringify(data)
    })
  // .then(function(response) {
  //     if (response.status >= 400) {
  //         throw new Error("Bad response from server");
  //     }
  //     return response;
  // })
  // .then((response)=>{
  //     if(response.status == 200){
  //         //localStorage.setItem("authToken",response.json().authToken);
  //     }
  //     return response;
  // })
}

async function listMedia(authToken){
    const url = baseUrl+'/media/list'
    return await fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization':'Basic '+authToken
          }
      })
    // .then(function(response) {
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }
    //     console.log(response.json())
    //     return response;
    // })
}

module.exports={registerUser,loginUser,decodeUser,createMedia,listMedia}