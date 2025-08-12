import express from 'express';
import { tenantMiddleware } from './middleware/tenatMildeware.js';
import TenantStorage from '../app/services/TenantStorage.js';

const app = express();
app.use(express.json());

//Para aplicar el middleware en todas las rutas
app.use(tenantMiddleware);


app.get('/s', (req, res) =>{
    const tenantId = TenantStorage.getTenantId();
    res.send(`Estás en el tenant: ${tenantId}`);
})

app.get('/config', (req, res) =>{
    const tenantId = TenantStorage.getTenantId();
    res.json(`Configuración para el tenant: ${tenantId}`);
})


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});