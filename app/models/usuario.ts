import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Reporte from './reporte.js'
import PublicacionBlog from './publicacion_blog.js'
import GestionEpp from './gestion_epp.js'
import ListaChequeo from './lista_chequeo.js'
import ActividadLudica from './actividad_ludica.js'
import Tenat from './tenat.js'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare apellido: string

  @column()
  declare nombre_usuario: string

  @column()
  declare correo_electronico: string

  @column()
  declare cargo: string

  @column()
  declare contrasena: string

  @column()
  declare id_tenat: number

  @belongsTo(() => Tenat, {
  foreignKey: 'id_tenat',
  })
  declare tenat: BelongsTo<typeof Tenat>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => GestionEpp)
  declare gestion_epp: HasMany<typeof GestionEpp>

  @hasMany(() => PublicacionBlog)
  declare publicacion_blogs: HasMany<typeof PublicacionBlog>

  @hasMany(() => Reporte)
  declare reportes: HasMany<typeof Reporte>

  @hasMany(() => ListaChequeo)
  declare lista_chequeos: HasMany<typeof ListaChequeo>

  @hasMany(() => ActividadLudica)
  declare actividades_ludicas: HasMany<typeof ActividadLudica>

}
