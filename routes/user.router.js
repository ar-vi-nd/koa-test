import Router from 'koa-router'

import { loginController } from '../controllers/user.controller.js'


const userRouter = new Router({
    prefix: "/users"
  })


  userRouter.get("/login",loginController)

  userRouter.get("/",async (ctx,next)=>{
    ctx.body = ["arvind","mic","mike"]
  })



  export default userRouter;
