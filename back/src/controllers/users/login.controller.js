import { login } from '../../services/users/login.service.js'

/*===========================
  Controller pour se logger 
============================*/
export async function loginController(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.json({success: true, ...result});

    } catch (error) {
        console.error('Login error', error);
        next(error);
    }
}