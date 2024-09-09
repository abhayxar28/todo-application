const jwt = require('jsonwebtoken');
const SECRET = 'S3CR3T';

const authenticateJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    try{
        if(authHeader){
            const token = authHeader.split(' ')[1];
            if(token){
                jwt.verify(token, SECRET, (err, user)=>{
                    if(err){
                        return res.status(403).json({message: 'Invalid Token'});
                    }
                    req.user = user;
                    next();
                })
            }else{
                return res.status(401).json({message: 'Token missing'})
            }
        }else{
            return res.status(401).json({ message: 'Authorization header missing' }); 
        }
    }catch(error){
        console.log('expected error: ', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    authenticateJWT,
    SECRET
}