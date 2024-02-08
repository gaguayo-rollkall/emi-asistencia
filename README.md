# SISTEMA DE REGISTRO Y CONTROL DE ASISTENCIA ACADÉMICO Y ACTIVIDADES PROGRAMADAS INTEGRADO CON TECNOLOGÍA DE IDENTIFICACIÓN POR RADIO FRECUENCIA 

## Software Requerido

- [.NET 8 SDK](https://download.visualstudio.microsoft.com/download/pr/cb56b18a-e2a6-4f24-be1d-fc4f023c9cc8/be3822e20b990cf180bb94ea8fbc42fe/dotnet-sdk-8.0.101-win-x64.exe)
- [Node JS 18](https://nodejs.org/dist/v18.12.0/node-v18.12.0-x64.msi)
- Docker

## Como iniciar en modo de desarrollo

- Base de Datos
```
cd BaseDeDatos
docker-compose up -d
```

- Web API
```
cd WebApi
dotnet run --project src\Web
```

- Client
```
cd web-cliente
npm run dev
```