import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { autenticado } from 'src/modules/autenticacion/entities/autenticado';

export const generarToken = (parametros: autenticado) => {
    return jwt.sign(parametros, process.env.SECRET as string) as string;
}

export const verificarToken = (token: string) => {
    return jwt.verify(token, process.env.SECRET as string) as autenticado;
}


export const Autenticador = (rolRequerido: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Saca el token del header
        const token = req.headers.authorization?.split(' ')[1];
        
        // No autoriza si no hay token
        if (!token) {
            return res.status(401).json({
                message: 'No autorizado',
                error: true
            });
        }

        // Verifica el token
        try {
            const decoded = verificarToken(token);
            const rolUsuario = decoded.rol;

            
            if (rolRequerido.includes(rolUsuario)) {
                next();
            } else {
                return res.status(401).json({
                    message: 'No autorizado',
                    error: true
                });
            }

        } catch (error) {
            return res.status(401).json({
                message: 'No autorizado',
                error: true
            });
        }
    };
};
