


async function adminRegister(req, res, next) {
    try {
        console.log("log de rec.body", req.body);
        /*=======================================================
        J'appelle la fonction qui contient la logique RgisterForm
        =======================================================*/
        const users = await RegisterForm(req.body);
        res.status(201).json({
            success: true,
            message: "user create",
            data: users
        })
    } catch (error) {
        console.error("error during account creation", error);
        next(error);
        
    }
    
}

export default adminRegister