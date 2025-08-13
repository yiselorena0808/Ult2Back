import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Tenat from '../../app/models/tenat.js'

export default class extends BaseSeeder {
  async run() {
    await Tenat.createMany([
      {
        nombre: 'Tenant 1',
        esquema: 'tenant1_schema',
        alias: 't1',
        estado: true
      },
      {
        nombre: 'Tenant 2',
        esquema: 'tenant2_schema',
        alias: 't2',
        estado: true
      }
    ])
  }
}