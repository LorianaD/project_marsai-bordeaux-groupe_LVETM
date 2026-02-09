import {register} from "../../services/users/register.service.js";

//registration user
async function adminRegister(req, res, next) {
    try {
            
        const data = req.body;
        const role = 'admin';
        
        const createUser = await register(data, role);
        
        
        res.status(201).json({
            success: true,
            message: "user create",
            data: createUser
        });

    } catch (error) {
        console.error("error during account creation", error);
        next(error);
        
    }
    
}

export default adminRegister