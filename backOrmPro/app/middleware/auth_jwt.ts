import Jwt from 'jsonwebtoken';

const SECRET=process.env.jwt_secret || 'sstrict';
export default class AuthJwt{
    async handle({request,response}, next){
        const authheader = request.header('Authorization');
        const token = authheader.replace('Bearer', '').trim()
        if (!token){
            return response.unathorized({message:"Falta un token"})
        } else {
            try {
                const jwtcoded = Jwt.verify(token, SECRET)
                request.updateBody({authUsuario: jwtcoded})
                await next()
            } catch (error) {
                return response.unathorized({message:"Token invalido"})
            }
        }
    }
}