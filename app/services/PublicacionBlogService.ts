import PublicacionBlog from '#models/publicacion_blog'

class PublicacionBlogService {
  async crear(datos) {
    return await PublicacionBlog.create(datos)
  }

  async listar() {
    return await PublicacionBlog.query()
  }

  async listarId(id) {
    return await PublicacionBlog.query().where('id', id)
  }

  async actualizar(id, datos) {
    const blog = await PublicacionBlog.findBy('id', id)
    if (blog) {
      blog.merge(datos)
      await blog.save()
      return blog
    } else {
      return { error: 'Publicación no encontrada' }
    }
  }

  async eliminar(id) {
    const blog = await PublicacionBlog.findBy('id', id)
    if (blog) {
      await blog.delete()
      return 'publicación eliminada'
    } else {
      return 'publicación no encontrada'
    }
  }

  async conteo() {
    const blogs = await PublicacionBlog.query()
    return {
      total: blogs.length,
      blogs,
    }
  }
}

export default PublicacionBlogService