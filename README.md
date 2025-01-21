# Módulo Sistema Bancario - Cuenta de ahorros

### Requisitos Previos

Docker y Docker Compose instalados en tu máquina.

## Configuración

Primero clona este repositorio.

Copia el archivo .env.example a .env:

```
cp .env.example .env
```

Asegúrate de que las variables en .env tengan los valores correctos.

## Ejecución

Para levantar los servicios (frontend, backend y MongoDB), ejecuta:

```
docker compose up --build -d
```

Esto hará lo siguiente:

Levantar el frontend en http://localhost:3001.

Levantar el backend en http://localhost:3000.

Levantar la base de datos MongoDB en localhost:27018.

### Puertos Utilizados

Frontend: 3001
Backend: 3000
MongoDB: 27018