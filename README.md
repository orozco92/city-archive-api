# City Archive API

## Guía de instalación

### Requerimientos

- Node JS v16 o superior. [windows](https://nodejs.org/dist/v16.9.1/node-v16.9.1-x64.msi), [linux](https://nodejs.org/dist/v16.9.1/node-v16.9.1-linux-x64.tar.gz) ([guia de instlacion para node en linux](https://github.com/nodejs/help/wiki/Installation))

### Instalación

1. Instalar un gestor de procesos para NodeJS. En esta guía usaremos [PM2](https://pm2.keymetrics.io/) `npm install -g pm2`

   > Para que el proceso inicie automatiamente en Windows utilizar [pm2-windows-startup](https://www.npmjs.com/package/pm2-windows-startup)
   >
   > `npm install -g pm2-windows-startup`
   >
   > `pm2-startup install`

2. Copiar el contenido de **city-archive-api** para el directorio deseado y abrir una consola dentro de este.

3. Instalar los paquetes `npm install`

4. Ejecutar las migraciones `npm run migrations`

   > Si utiliza otro gestor de bases de datos diferente de SQLite deberá ejecutar primero `npm run create-db`

5. Ejecutar las semillas `npm run seeds -- --env production`

6. Iniciar la aplicacion `pm2 start`

7. Guardar el estado del proceso `pm2 save`

8. Verificar que la aplicación este funcionando abriendo el navegador en `url_del_servidor:3000/public/welcome`

### Base de datos

El sistema usa por defecto SQLite como base de datos. Para utilizar otro gestor de bases de datos (ejemplo PostgreSQL o MySQL) reemplaze dentro de **.env** las variables de entorno `DB_DIALECT: "sqlite" DB_STORAGE: "city_archive.qlite"` por `DB_HOST: "" DB_USERNAME: "" DB_PASSWORD: "" DB_NAME: ""` e instale el driver correspondiente.
