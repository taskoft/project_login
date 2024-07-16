const jwt = require('jsonwebtoken');

   authMiddleware =(req,res,next)=>{
    //Bearer Token
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token) return res.sendStatus(401);
 
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            console.log(err);
            return res.status(400).json(err);
        }
        req.user= user;
        next();
    })
}
module.exports=authMiddleware;