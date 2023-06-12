import jwt from 'jsonwebtoken'  

const secret = 'chave-jwt' // ainda vou mudar isso

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, { expiresIn: expiration })
    }
}