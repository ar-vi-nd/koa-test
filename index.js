
import Koa from 'koa'
import Router from 'koa-router';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import connectDB from './db/index.js';
import bodyParser from 'koa-bodyparser';


connectDB();

const app = new Koa();
const router = new Router();

app.on('error', (err,ctx) => {
    console.error('Server error:', err);
  });

  // Define routes
  router.get('/', async (ctx) => {
    ctx.body = 'Hello, World!';
  });
  
  router.get('/about', async (ctx) => {
    ctx.body = 'About Us';
  });
  
  router.post('/contact', async (ctx) => {
    ctx.body = 'Contact Page';
  });



  const authMiddleware = async (ctx,next)=>{
    console.log("Checking for authentication")
    await next()
  }

  app.use(bodyParser());

  app
  .use(authMiddleware)  // Apply auth middleware globally
  .use(userRouter.routes()) // Register the userRouter with the middleware applied
  .use(userRouter.allowedMethods())
  .use(productRouter.routes())
  .use(productRouter.allowedMethods())

// Apply other routes
app
  .use(router.routes())
  .use(router.allowedMethods());






  const myMiddlware = async(ctx,next)=>{
    console.log("middleware 1");
    console.log(ctx)
    ctx.body = {"title":"Some title","data":[1,"fjdjkf"],token:12345}
    console.log('This is app details',app);
    

    
    await next()

    ctx.body = "first middleware upstream body"
    console.log(ctx.body)

    console.log(app.keys)
}

const mySecondMid = async(ctx,next)=>{

    ctx.body = "second middleware downstream body"
    console.log(ctx.body)

    console.log("middware 2")

    await next()

    ctx.body = "second middleware upstream body"
    console.log(ctx.body)

    ctx.throw(400,"Eror occured");
    

}



// app.use(myMiddlware)
// .use(mySecondMid)



// app.use(async (ctx) => {
//     console.log("hello")
//   //   await next()
//   ctx.body = "upendra"
//   console.log(ctx.body)
//   await new Promise((res) => {
//     setTimeout(() => {
//       ctx.body = "arvind";  // Overwrite the body after 2 seconds
//       res();  // Resolve the promise
//     }, 2000);
//   });

//     setTimeout(() => {
//   ctx.body = "arvind"
        
//     }, 2000);
    
    
//   })

// app.use(myMiddlware,async (ctx) => {
//   console.log("hello")
// //   await next()
//   console.log(ctx.body)
//   await new Promise(res=>{
//     setTimeout(() => {
//         ctx.body = "after 2 seconds"
//         res()
//       }, 2000);
//   })
  
  
// });

// app.use(async ctx=>{
//     console.log(1)
//     return ctx.body = "Hello Upendra"
//     console.log("after sending response")
// })

// app.get("/users",async (ctx)=>{
//     ctx.body = "User Route"
// })

app.listen(3000,()=>{console.log("Server running on port 3000")});