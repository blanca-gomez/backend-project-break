module.exports = (err,req,res,next)=> {
        console.log(err)
        res.status(500).render('error', { message: 'Error en el servidor' });
}