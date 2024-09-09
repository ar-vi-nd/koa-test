

import Koa from 'koa'
import Router from 'koa-router';

import Product from '../model/product.model.js';

const productRouter = new Router({
    prefix: "/products"
  
})

productRouter.get("/",async (ctx,next)=>{
    try {
       const products =  await Product.find();
       ctx.body = products;

    } catch (error) {
        console.log(error);
    }
})
.post("/",async (ctx,next)=>{
    try {
        const product = await Product.create(ctx.request.body);
        ctx.body = product;
    } catch (error) {
        console.log(error);
    }
})
.patch("/:id",async (ctx,next)=>{
    try {
        const {id} = ctx.params
        console.log(id,ctx.request.body);
        const product = await Product.findByIdAndUpdate(id,ctx.request.body,{new:true});
        ctx.body = product;
    } catch (error) {
        console.log(error);
    }
})

export default productRouter;