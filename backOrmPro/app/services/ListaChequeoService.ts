import ListaChequeo from '#models/lista_chequeo'

class ListaChequeoService {
  async crear(datos) {
    return await ListaChequeo.create(datos)
  }

  async listar() {
    return await ListaChequeo.query()
  }

  async listarId(id) {
    return await ListaChequeo.query().where('id', id)
  }

  async actualizar(id, datos) {
    const lista = await ListaChequeo.findBy('id', id)
    if (lista) {
      lista.merge(datos)
      await lista.save()
      return lista
    } else {
      return { error: 'Lista no encontrada' }
    }
  }

  async eliminar(id) {
    const lista = await ListaChequeo.findBy('id', id)
    if (lista) {
      await lista.delete()
      return 'lista eliminada'
    } else {
      return 'lista no encontrada'
    }
  }

  async conteo() {
    const listas = await ListaChequeo.query()
    return {
      total: listas.length,
      listas,
    }
  }
}

export default ListaChequeoService