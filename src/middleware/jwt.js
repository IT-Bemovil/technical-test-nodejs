import jwt from 'jsonwebtoken'

const errorToken  = (message='token invalido') => {
  const error = new Error(message)
  error.statusCode = 401
  error.name='JsonWebTokenError'
  return  error
}

export const validateToken = async (req,res,next)=>{
  try{
    const {authorization} = req.header
    if(!authorization){
      return res.status(401).json({message:'Unauthorized'})
    }
    
    
    if(authorization.toLowerCase().startWith('Bearer')){
  
      const authtoken = authorization.substring(7) //Berare length
      const decodeToken =  authtoken ? jwt.verify(authtoken,process.env.JWT_SECRET) : {}
      if(!authtoken || !decodeToken.idUser){
        const errorToken  =errorToken()
        throw errorToken
      }
    }else{
      const errorToken  = errorToken('Invalid token bearer')
      throw errorToken
    }
  }catch(error){
    next(error)
  }
  

}