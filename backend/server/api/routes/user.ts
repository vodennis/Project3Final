import { Router } from "express"
const route = Router()

export default (app:Router)=>{
  app.use("/user")

  route.get("/", (req, res)=>{
    console.log("HELLO PLS SO MANY FILES STOP")
  })
}