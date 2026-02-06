import {register} from "../../services/users/register.service.js";

//registration user
async function adminRegister(req, res, next) {
    try {
            
        const data = req.body;
        const role = 'admin';
        
        const test = register(data, role);
       
        //const users = await (req.body);
        // res.status(201).json({
        //     success: true,
        //     message: "user create",
        //     data: users
        // })
    } catch (error) {
        // console.error("error during account creation", error);
        // next(error);
        
    }
    
}

export default adminRegister