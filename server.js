import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// 1. Configuración de variables de entorno
dotenv.config();

// 2. Configuración de rutas de archivos para ES Modules (Necesario para usar __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 3. Servir archivos estáticos (CSS, Imágenes)
app.use(express.static('public'));

// === CONFIGURACIÓN DE EJS (Actividad W01) ===
// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');
// Indicar a Express dónde encontrar las plantillas
app.set('views', path.join(__dirname, 'src', 'views'));

// 4. Rutas principales (Usando res.render en lugar de res.sendFile)
/**
 * Al usar res.render(), Express busca automáticamente archivos .ejs 
 * en la carpeta configurada arriba y les pasa el objeto de datos.
 */

app.get('/', (req, res) => {
    const title = 'Home'; // Variable que usará header.ejs
    res.render('home', { title }); // Renderiza src/views/home.ejs
});

app.get('/organizations', (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

app.get('/projects', (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});

// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});