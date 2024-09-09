const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next)=>{
    ctx.body = "hello world"
})
http.createServer(app.callback()).listen(3000,()=>(console.log("http server started")));
https.createServer(app.callback()).listen(3001,()=>(console.log("https server started")));