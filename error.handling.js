function notFoundError(req,res,next){
    res.status(404).send({
        status:404,
        message:'page not found'
    })
}
function errorHandler(err,req,res,next){
    const status = err?.status ?? err?.statusCode?? 500
    res.status(status).send({
        status,
        message: err?.message ?? "internalServerError"
    })
}
module.exports={
    notFoundError,
    errorHandler
}