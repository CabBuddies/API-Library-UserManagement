const JWT = require('../model/jwt') 

const Main = require('../index')

async function authenticateToken(req, res, next) {
    const {token,user} = await extractUser(req)
    req.token = token
    if(user==null){
        return res.sendStatus(401)
    }
    req.val = user    
    next()
}


async function optAuthenticateToken(req, res, next) {
    try {
        const {token,user} = await extractUser(req)
        req.token = token
        req.val = user
        console.log('************************')
        console.log(user)
        console.log('************************')
    } catch (error) {
        console.log('************************')
        console.log(error)
        console.log('************************')
    }    
    next()
}

async function extractAuthToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log('==========>AuthTokenHeader')
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    req.token = token
    if (token == null) return res.sendStatus(401)
    next()
}

async function extractUser(req){
    const authHeader = req.headers['authorization']
    console.log('==========>AuthTokenHeader')
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return [null,null]

    let result = await JWT.findById(token)

    console.log('==========>AuthTokenJWTDBResult')
    console.log(result)
    if(result != null){
        console.log('==========>AuthTokenJwtDbResultNotNull')
        console.log(result)
        if(result.expirationTime.getTime()>new Date().getTime())
            return [token,result.user]
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
            return [token,result.user]
        }
    }
    
    return [token,null]
        
}

module.exports={extractUser,authenticateToken,optAuthenticateToken,extractAuthToken}
