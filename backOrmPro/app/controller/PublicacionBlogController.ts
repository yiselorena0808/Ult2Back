import BlogService from '#services/PublicacionBlogService'
import { messages } from '@vinejs/vine/defaults'

const blogService = new BlogService()

class BlogController {
  async crearBlog({ request, response }) {
    try {
      const datos = request.body()
      const nueva = await blogService.crear(datos)
      return response.json({ msj: 'publicacion creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarBlog({ response }) {
    try {
      const lista = await blogService.listar()
      return response.json({ msj: 'listado de publicaciones', datos: lista })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default BlogController