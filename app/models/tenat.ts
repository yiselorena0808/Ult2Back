import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Tenat extends BaseModel {
  @column({ isPrimary: true })
  declare id_tenat: number
  @column()
  declare nombre:String

  @column()
  declare esquema:string

  @column()
  declare alias:String

  @column()
  declare estado:boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Usuario, {
    foreignKey: 'id_tenat'
  })
  declare usuarios: HasMany<typeof Usuario>
}