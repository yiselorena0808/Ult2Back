import ListaChequeoService from '#services/ListaChequeoService'
import { messages } from '@vinejs/vine/defaults'

const listaChequeoService = new ListaChequeoService()

class ListaChequeoController {
  async crearLista({ request, response }) {
    try {
      const datos = request.body()
      const nueva = await listaChequeoService.crear(datos)
      return response.json({ msj: 'lista creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarListas({ response }) {
    try {
      const listas = await listaChequeoService.listar()
      return response.json({ msj: 'listado', datos: listas })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default ListaChequeoController
