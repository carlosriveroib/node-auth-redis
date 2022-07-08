# NodeJS Server

- koa
- esbuild
- redis
- postgres

## Features

Basic auth y sesiones gestionadas con redis.

### Scripts

`"build": "esbuild src/server.ts --bundle --platform=node --target=node14.18.2 --outdir=dist"`

Comando esbuild con el archivo de entrada src/server.ts
--bunde quiere decir que mete en línea cualquier dependencia que esté usando
--outdir=dist carpeta donde estará el ejecutable.

`"start": "node dist/server.js",`

Ejecutar la versión compilada

`"dev": "nodemon --watch 'src/**/*' -e ts,tsx --exec 'esr --cache src/server.ts'",`

Ejecuta la versión de desarrollo, por ahora no sé por qué pero necesitamos esbuild runner
