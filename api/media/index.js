require('es6-promise').polyfill();
require('isomorphic-fetch');

const baseUrl = require('../../index').baseUrl;

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
}

module.exports={createMedia,listMedia}