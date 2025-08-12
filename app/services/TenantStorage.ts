import { AsyncLocalStorage } from 'async_hooks'

type TenantStore = { tenantId?: number }

class TenantStorage {
  private static storage = new AsyncLocalStorage<TenantStore>();

  static run(tenantId: number, callback: () => void) {
    TenantStorage.storage.run({ tenantId }, callback);
  }

  static setTenantId(tenantId: number) {
    const store = TenantStorage.storage.getStore();
    if (store) {
      store.tenantId = tenantId;
    } else {
      throw new Error('No active tenant context found');
    }
  }

  static getTenantId(): number | undefined {
    return TenantStorage.storage.getStore()?.tenantId;
  }
}

export default TenantStorage;
