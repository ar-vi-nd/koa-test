const loginController = async(ctx)=>{
    console.log("Signing in ")
    ctx.body = "Logged in"
}

export {loginController}