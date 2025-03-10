const jwt = require("jsonwebtoken")

const  authenticateToken = (req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).json({message:"Access Denied"})

    jwt.verify(token,"gaurav123",(err,user)=>{
        if(err) return res.status(403).json({message:"Token is invalid"})
            req.user = user
        next()
    })
}

module.exports = authenticateToken