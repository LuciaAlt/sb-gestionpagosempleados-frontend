# SB Frontend - React + TypeScript

Frontend para el sistema de Gestión de Empleados, Usuarios, Reportes y Auditoría de la Superintendencia de Bancos.

## Tecnologías

- React 18
- TypeScript
- Vite
- Bootstrap 5
- React Bootstrap
- Axios
- SweetAlert2
- React Router DOM
- XLSX
- jsPDF

## Estructura modular

```text
src/
  modules/
    rrhh/
      models/
      services/
      endpoints/
      pages/
      components/
    seguridad/
      models/
      services/
      endpoints/
      pages/
      components/
    reportes/
      models/
      services/
      endpoints/
      pages/
    auditoria/
      models/
      services/
      endpoints/
      pages/
  shared/
    components/
    layouts/
    services/
    utils/
```

## Variables de entorno

Copiar `.env.example` como `.env`:

```env
VITE_API_URL=http://localhost:5080
```

## Ejecutar local

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Permisos usados

El frontend valida menú y acciones usando el arreglo `permisos` devuelto por el login:

```text
EMPLEADOS_VER
EMPLEADOS_CREAR
EMPLEADOS_EDITAR
EMPLEADOS_INACTIVAR
REPORTES_VER
REPORTES_EXPORTAR
USUARIOS_VER
USUARIOS_CREAR
AUDITORIA_VER
```

## Endpoints de Olvidé mi Contraseña

Se espera implementar en el backend, controlador `AuthController`:

```http
POST /api/Auth/forgot-password
POST /api/Auth/reset-password
GET  /api/Auth/validate-reset-token?token={token}
```

### POST /api/Auth/forgot-password

```json
{
  "usuarioOCorreo": "usuario@dominio.com"
}
```

### POST /api/Auth/reset-password

```json
{
  "token": "token-recibido",
  "nuevaPassword": "NuevaClave123!",
  "confirmarPassword": "NuevaClave123!"
}
```

## Auditoría

El módulo de auditoría consume:

```http
GET /api/Auditoria/GetPaginate?Page=1&Take=10
```

Campos esperados:

```text
Id, UsuarioRegistra, Accion, Entidad, EntidadId, Detalle, Ip, Fecha
```
