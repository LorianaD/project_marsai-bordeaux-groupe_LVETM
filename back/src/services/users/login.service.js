import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../../db/index.js'
import { env } from '../../config/env.js';

/*================================================================================
  Service qui verifie si l'user existe et verifie ses données d'authentification
================================================================================*/
export async function login(email, password) {
    if(!email || !password) {
        const error = new Error ('L’adresse e-mail ou le mot de passe est invalide');
        error.status = 400;
        throw error;
    }

    const [row] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = row[0];
    if (!user) {
        const error = new Error('Utilisateur introuvable');
            error.status = 401;
            throw error;
        }
    
    const match = await bcrypt.compare(password, user.password_hash)
    if(!match) {
        const error = new Error('Identifiants invalides');
        error.status = 401;
        throw error;
    }

    const token = await jwt.sign(
        {sub: user.id, email: user.email, role: user.role, name: user.name, last_name: user.last_name},
        env.jwtSecret,
        {expiresIn: '1000h'}
    )

    return { token };

}
