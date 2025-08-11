import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}