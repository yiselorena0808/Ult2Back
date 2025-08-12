import  {Request, Response, NextFunction} from 'express';
import TenantStorage from '../services/TenantStorage.js';

export function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
    const tenantId = Number(req.headers['x-tenant-id']) || 0;

    TenantStorage.run(tenantId, () => {
        next();
    });
}