import UsuarioService from '#services/UsuarioService'
import { messages } from '@vinejs/vine/defaults'
import { json } from "stream/consumers"

const usuarioService = new UsuarioService()

class UsuariosController {
  async register({ request, response }) {
    try {
      const {
        nombre,
        apellido,
        nombre_usuario,
        correo_electronico,
        cargo,
        contrasena,
        confirmacion
      } = request.body()

      const resultado = await usuarioService.register(
        nombre,
        apellido,
        nombre_usuario,
        correo_electronico,
        cargo,
        contrasena,
        confirmacion
      )
      console.log('Resultado del registro:', resultado);

      if (resultado.mensaje !== 'Registro correcto') {
        return response.status(400).json(resultado)
      }

      return response.status(201).json({ mensaje: 'Registro correcto', usuario: resultado.user 
});


    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async login({ request, response }) {
    try {
      const { correo_electronico, contrasena } = request.body()

      const resultado = await usuarioService.login(correo_electronico, contrasena)

      if (typeof resultado === 'string') {
        // Es un error como "usuario no encontrado" o "contraseña incorrecta"
        return response.status(401).json({ mensaje: resultado })
      }

        const { token, user } = resultado;

      return response.json({
        mensaje: 'bienvenido',
        token,
        nombre: user.nombre,
        correo: user.correo_electronico,
      })

    } catch (e) {
      return response.status(500).json({ error: e.message })
    }
  }

  async listarUsuarios({ response }) {
    try {
      const usuarios = await usuarioService.listar()
      return response.json({ msj: 'lista de usuarios', datos: usuarios })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarUsuarioId({ params, response }) {
    try {
      const usuario = await usuarioService.listarId(params.id)
      return response.json({ msj: 'usuario encontrado', datos: usuario })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async actualizarUsuario({ params, request, response }) {
    try {
      const actualizado = await usuarioService.actualizar(params.id, request.body())
      return response.json({ msj: 'usuario actualizado', datos: actualizado })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarUsuario({ params, response }) {
    try {
      const resp = await usuarioService.eliminar(params.id)
      return response.json({ msj: resp })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  async conteoUsuarios({ response }) {
    try {
      const resultado = await usuarioService.conteo()
      return response.json({ msj: 'conteo realizado', datos: resultado })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}

export default UsuariosController
