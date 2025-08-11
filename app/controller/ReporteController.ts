import ReporteService from '#services/ReporteService'
import { messages } from '@vinejs/vine/defaults'

const reporteService = new ReporteService()

class ReportesController {
  async crearReporte({ request, response }) {
    try {
      const datos = request.body()
      const nuevo = await reporteService.crear(datos)
      return response.json({ msj: 'reporte creado', datos: nuevo })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarReportes({ response }) {
    try {
      const lista = await reporteService.listar()
      return response.json({ msj: 'lista de reportes', datos: lista })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarReporteId({ params, response }) {
    try {
      const uno = await reporteService.listarId(params.id)
      return response.json({ msj: 'reporte encontrado', datos: uno })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async actualizarReporte({ params, request, response }) {
    try {
      const actualizado = await reporteService.actualizar(params.id, request.body())
      return response.json({ msj: 'reporte actualizado', datos: actualizado })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarReporte({ params, response }) {
    try {
      const resp = await reporteService.eliminar(params.id)
      return response.json({ msj: resp })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  async conteoReportes({ response }) {
    try {
      const resultado = await reporteService.conteo()
      return response.json({ msj: 'conteo realizado', datos: resultado })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}

export default ReportesController