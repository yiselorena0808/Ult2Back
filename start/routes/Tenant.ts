import TenantStorage from '../../app/services/TenantStorage.js';
import Route from "@adonisjs/core/services/router"
import { Response } from '@adonisjs/core/http';

const TenantRoutes = new TenantStorage();

Route.get('/s', async(ctx) =>{
    const tenantId = TenantStorage.getTenantId();
    ctx.response.send(`Estás en el tenant: ${tenantId}`);
})

Route.get('/config', async(ctx) =>{ const tenantId = TenantStorage.getTenantId();
    ctx.response.json(`Configuración para el tenant: ${tenantId}`);
})
