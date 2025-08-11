import Router from "@adonisjs/core/services/router"
import UsuariosController from "../../app/controller/UsuarioController.js"
import AuthJwt from "../../app/middleware/auth_jwt.js"

const usuario = new UsuariosController()
const authJwt = new AuthJwt()

Router.get('/listarUsuarios', usuario.listarUsuarios).use(authJwt.handle.bind(authJwt))
Router.get('/idUsuario/:id', usuario.listarUsuarioId).use(authJwt.handle.bind(authJwt))
Router.put('/actualizarUsuario/:id', usuario.actualizarUsuario).use(authJwt.handle.bind(authJwt))
Router.delete('/eliminarUsuario/:id', usuario.eliminarUsuario).use(authJwt.handle.bind(authJwt))
Router.get('/conteoUsuarios', usuario.conteoUsuarios).use(authJwt.handle.bind(authJwt))
Router.post('/register',usuario.register)
Router.post('/login',usuario.login)
