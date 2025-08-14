import UsuarioService from '#services/UsuarioService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'


const usuarioService = new UsuarioService()

class UsuariosController {
   async register({ request, response }:HttpContext) {
    const { nombre, apellido, nombre_usuario, correo_electronico, cargo, contrasena, confirmacion ,id_tenat} = request.body()

    if (contrasena !== confirmacion) {
      return response.status(400).json({ mensaje: 'Las contraseñas no coinciden' })
    }

    const respuesta = await usuarioService.register(nombre, apellido, nombre_usuario, correo_electronico, cargo, contrasena,confirmacion,id_tenat)
    return response.status(201).json({ msj: 'usuario registrado', respuesta })
  }

    async login({request, response}:HttpContext){
        const {correo_electronico, contrasena} = request.body()
        const lista=await usuarioService.login(correo_electronico,contrasena)
        return response.json(lista)
    }

  async listarUsuarios({ response }:HttpContext) {
    try {
      const usuarios = await usuarioService.listar()
      return response.json({ msj: 'lista de usuarios', datos: usuarios })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarUsuarioId({ params, response }:HttpContext) {
    try {
      const usuario = await usuarioService.listarId(params.id)
      return response.json({ msj: 'usuario encontrado', datos: usuario })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async actualizarUsuario({ params, request, response }:HttpContext) {
    try {
      const actualizado = await usuarioService.actualizar(params.id, request.body())
      return response.json({ msj: 'usuario actualizado', datos: actualizado })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarUsuario({ params, response }:HttpContext) {
    try {
      const resp = await usuarioService.eliminar(params.id)
      return response.json({ msj: resp })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  async conteoUsuarios({ response }:HttpContext) {
    try {
      const resultado = await usuarioService.conteo()
      return response.json({ msj: 'conteo realizado', datos: resultado })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}

export default UsuariosController
