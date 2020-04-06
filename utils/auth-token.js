const JWT = require('../model/jwt') 

const Main = require('../index')

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    const result = await JWT.findById(token)

    if(result != null){
        if(result.expirationTime.getTime()>new Date().getTime())
            req.val = result.user
    }else{
        result = await Main.decodeUser(token)
        result = await JWT.save(result)
        if(result != null){
            req.val = result.user
        }
    }
    
    if(req.val==null)
        return res.sendStatus(401)
        
    next()
}

module.exports={authenticateToken}
