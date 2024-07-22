const authMiddleware = (req, res, next) => {
    const { isSuperAdmin } = req?.user
    const superAdminkeys=JSON.parse( process.env.SUPER_ADMIN_ROUTE_KEYS)

    const verifyAdminKey=superAdminkeys.some(x=>x===req.originalUrl)

    if(!isSuperAdmin && verifyAdminKey ){
        res.status(403).json({message:"Unauthorized "})
    }
  //  req.user = user;
    next();
}

module.exports = { authMiddleware };
