const restClient = require('./rest-client');

const JWT = require('../model/jwt') 

const Main = require('../index')

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    const result = await JWT.findById(token)

    if(result != null){
        req.val = result.user
    }else{
        req.val = await Main.decodeUser(token)
    }
    
    if(req.val==null)
        return res.sendStatus(401)
        
    next()
}

module.exports={authenticateToken}
