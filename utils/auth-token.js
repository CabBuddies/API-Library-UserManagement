const JWT = require('../model/jwt') 

const Main = require('../index')

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log('==========>AuthTokenHeader')
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    let result = await JWT.findById(token)

    console.log('==========>AuthTokenJWTDBResult')
    console.log(result)
    if(result != null){
        console.log('==========>AuthTokenJwtDbResultNotNull')
        console.log(result)
        if(result.expirationTime.getTime()>new Date().getTime())
            req.val = result.user
    }else{
        result = await Main.decodeUser(token)
        console.log('==========>AuthTokenDecodeResult')
        console.log(result)
        result = await result.json()
        console.log('==========>AuthTokenDecodeResultJson')
        console.log(result)
        result._id = token
        console.log('==========>AuthTokenJwtCollDoc')
        console.log(result)
        result = await JWT.create(result)
        if(result != null){
            req.val = result.user
        }
    }
    
    if(req.val==null)
        return res.sendStatus(401)
        
    next()
}


async function optAuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log('==========>AuthTokenHeader')
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) {
        next()
        return true
    }

    let result = await JWT.findById(token)

    console.log('==========>AuthTokenJWTDBResult')
    console.log(result)
    if(result != null){
        console.log('==========>AuthTokenJwtDbResultNotNull')
        console.log(result)
        if(result.expirationTime.getTime()>new Date().getTime())
            req.val = result.user
    }else{
        result = await Main.decodeUser(token)
        console.log('==========>AuthTokenDecodeResult')
        console.log(result)
        result = await result.json()
        console.log('==========>AuthTokenDecodeResultJson')
        console.log(result)
        result._id = token
        console.log('==========>AuthTokenJwtCollDoc')
        console.log(result)
        result = await JWT.create(result)
        if(result != null){
            req.val = result.user
        }
    }
    
    next()
}

module.exports={authenticateToken,optAuthenticateToken}
