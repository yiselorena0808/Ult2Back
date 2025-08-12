import Tenat from '#models/tenat'
import { getTenantId } from './TenantStorage.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class TenatService {
  private query(): ModelQueryBuilderContract<typeof Tenat, Tenat> {
    const tenantId = getTenantId()
    return Tenat.query().where('id_tenat', tenantId)
  }

  public async getMyTenant() {
    return await this.query().first()
  }

  public async updateMyTenant(data: Partial<Tenat>) {
    const tenant = await this.query().first()
    if (!tenant) return null
    tenant.merge(data)
    await tenant.save()
    return tenant
  }
}
