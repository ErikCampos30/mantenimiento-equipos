# Instrucciones de Despliegue

Este proyecto está listo para ser desplegado en cualquier servicio de hosting estático como GitHub Pages, Netlify, Vercel o similares.

## Preparación para despliegue

1. Verifica las URLs de la API en los siguientes archivos:
   - `.env.production`: Contiene la URL base de la API para el entorno de producción.
   - `src/config/api.js`: Contiene la configuración de los endpoints y métodos para acceder a la API.

2. Para cambiar la URL base de la API:
   - Modifica el valor de `REACT_APP_API_URL` en el archivo `.env.production`
   - O actualiza directamente el valor de `BASE_URL` en `src/config/api.js`

## Pasos para desplegar

### Opción 1: Despliegue manual

1. Ejecuta `npm run build` para generar la versión de producción.
2. La carpeta `build` contendrá los archivos estáticos listos para desplegar.
3. Sube estos archivos a tu servidor web o servicio de hosting.

### Opción 2: GitHub Pages

1. Instala gh-pages: `npm install --save-dev gh-pages`
2. Añade a package.json:
   ```json
   "homepage": "https://tu-usuario.github.io/nombre-repo",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Ejecuta `npm run deploy`

### Opción 3: Netlify/Vercel

1. Conecta tu repositorio a Netlify o Vercel.
2. Configura las variables de entorno en la plataforma.
3. Configura el comando de build como `npm run build`.
4. Configura la carpeta de publicación como `build`.

## Configuración de variables de entorno

- Para Netlify: Configura las variables de entorno en la sección "Site settings > Build & deploy > Environment"
- Para Vercel: Configura las variables de entorno en la sección "Project settings > Environment Variables"

## Verificación después del despliegue

Una vez desplegado, verifica que:

1. La aplicación se carga correctamente.
2. La conexión con la API de Oracle APEX funciona.
3. Se pueden listar y agregar equipos sin problemas.

En caso de errores, revisa la consola del navegador para identificar posibles problemas con la configuración de la API o con CORS.
