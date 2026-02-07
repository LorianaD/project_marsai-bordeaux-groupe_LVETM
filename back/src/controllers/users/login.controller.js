import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js'
import { pool } from '../../db/index.js';

// function qui permet a l'utilisateur de se logger 
export async function loginController(req, res, next) {
    try {
        
        const { email, password } = req.body;
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        
        if(!user){
            console.log('User not found');
            return res.status(401).json({error: 'User not found'});
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            console.log('Invalid credentials');
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {sub: user.id, email: user.email},
            env.jwtSecret,
            {expiresIn: '1000h'}
        )
        res.json({token})

    } catch (error) {
        console.error('Login error', error);
        next(error);
    }
}