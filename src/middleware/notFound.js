export const notFound = (req,res,next)=>{
  console.log(req.path)
  res.status(404).json({message:'Not found'})
}