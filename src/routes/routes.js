import { notFound } from "../middleware/notFound.js"
import { authRoutes } from "./authRoutes.js"

export const getRoutes = (app) =>{

  app.get('/',(req,res,next)=>{
    res.send('Prueba tecnica Be Movil')
  })

  app.use('/auth',authRoutes)

  app.use(notFound)
  return app
}