export const errorHandler = (err,req,res,next)=>{
  console.log({err})
  if(err.name==='JsonWebTokenError'){
    return res.status(err.statusCode).json({message:err.message})
  }
  if(err.name==='SequelizeUniqueConstraintError'){
    return res.status(400).json({message:err?.message })
  }
  

  res.status(err.statusCode || 500).json({message:err.message})
}