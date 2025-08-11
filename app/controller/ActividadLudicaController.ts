import ActividadLudicaService from '#services/ActividadLudicaService'
import { messages } from '@vinejs/vine/defaults'

const actividadLudicaService = new ActividadLudicaService()

class ActividadesLudicasController {
  async crearActividad({ request, response }) {
    try {
      const datos = request.body()
      const nueva = await actividadLudicaService.crear(datos)
      return response.json({ msj: 'actividad creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarActividades({ response }) {
    try {
      const lista = await actividadLudicaService.listar()
      return response.json({ msj: 'listado de actividades', datos: lista })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default ActividadesLudicasController