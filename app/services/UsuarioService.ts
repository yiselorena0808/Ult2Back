import bcrypt from 'bcryptjs'
import Usuario from '#models/usuario';
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'


class UsuarioService {
 async register(nombre:string, apellido:string, nombre_usuario:string, correo_electronico:string, cargo:string, contrasena:string, confirmacion:string,id_tenant:number) {
    if (contrasena !== confirmacion) {
      return { mensaje: 'Las contraseñas no coinciden' }
    }

    const hash = await bcrypt.hash(contrasena, 10)

    const user = await Usuario.create({
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      cargo,
      contrasena: hash,
      id_tenat:id_tenant
      
      
    })

    const token = jwt.sign(
      {
        id: user.id,
        correo_electronico: user.correo_electronico,
        timestamp: Date.now()
      },
      SECRET,
      { expiresIn: '1h' }
    )

    return {
      mensaje: 'Registro correcto',
      user,
      token
    }
  }

  async login(correo_electronico: string, contrasena: string) {
    if (!correo_electronico || !contrasena) {
      return 'Campos obligatorios'
    }

    const user = await Usuario.findBy('correo_electronico', correo_electronico)
    if (!user) {
      return 'El usuario no existe'
    }

    const isValid = await bcrypt.compare(contrasena, user.contrasena)
    if (!isValid) {
      return 'Contraseña incorrecta'
    }

    const token = jwt.sign(
      {
        id: user.id,
        correo_electronico: user.correo_electronico,
        timestamp: Date.now()
      },
      SECRET,
      { expiresIn: '1h' }
    )

    return { token, user }
  }

  async listar() {
    return await Usuario.query()
  }

  async listarId(id:number) {
    return await Usuario.query().where('id', id)
  }

  async actualizar(id:number, datos:any) {
    const usuario = await Usuario.findBy('id', id)
    if (usuario) {
      usuario.merge(datos)
      await usuario.save()
      return usuario
    } else {
      return { error: 'Usuario no encontrado' }
    }
  }

  async eliminar(id:number) {
    const usuario = await Usuario.findBy('id', id)
    if (usuario) {
      await usuario.delete()
      return 'usuario eliminado'
    } else {
      return 'usuario no encontrado'
    }
  }

  async conteo() {
    const usuarios = await Usuario.query()
    return {
      total: usuarios.length,
      usuarios,
    }
  }
}

export default UsuarioService
