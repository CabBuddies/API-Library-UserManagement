require('es6-promise').polyfill();
require('isomorphic-fetch');

const baseUrl = require('../../index').baseUrl;

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
}

module.exports={registerUser,loginUser,decodeUser}