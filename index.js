require('es6-promise').polyfill();
require('isomorphic-fetch');

const baseUrl = 'https://cabbuddies-um.herokuapp.com'

function registerUser(email,password,firstName,lastName,phoneNumber){
    const data = {email,password,firstName,lastName,phoneNumber}
    console.log('read '+JSON.stringify(data))
    const url = baseUrl+'/user/registration'
    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
          },
        body: JSON.stringify(data)
      })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        
        console.log(response.json())

        return response;
    })
}

function loginUser(email,password){
    const data = {email,password}
    console.log('read '+JSON.stringify(data))
    const url = baseUrl+'/user/login'
    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
          },
        body: JSON.stringify(data)
      })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response;
    })
    .then((response)=>{
        if(response.status == 200){
            //localStorage.setItem("authToken",response.json().authToken);
        }
        return response;
    })
}

function decodeUser(authToken){
    const url = baseUrl+'/jwt/decode'
    return fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization':'Basic '+authToken
          }
      })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response;
    })
}

module.exports={registerUser,loginUser,decodeUser}