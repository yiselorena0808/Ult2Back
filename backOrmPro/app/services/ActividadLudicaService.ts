import ActividadLudica from '#models/actividad_ludica'

class ActividadLudicaService {
  async crear(datos) {
    return await ActividadLudica.create(datos)
  }

  async listar() {
    return await ActividadLudica.query()
  }

  async listarId(id) {
    return await ActividadLudica.query().where('id', id)
  }

  async actualizar(id, datos) {
    const actividad = await ActividadLudica.findBy('id', id)
    if (actividad) {
      actividad.merge(datos)
      await actividad.save()
      return actividad
    } else {
      return { error: 'Actividad no encontrada' }
    }
  }

  async eliminar(id) {
    const actividad = await ActividadLudica.findBy('id', id)
    if (actividad) {
      await actividad.delete()
      return 'actividad eliminada'
    } else {
      return 'actividad no encontrada'
    }
  }

  async conteo() {
    const actividades = await ActividadLudica.query()
    return {
      total: actividades.length,
      actividades,
    }
  }
}

export default ActividadLudicaService
