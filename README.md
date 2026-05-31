# Sistema de Gestión de Pagos de Empleados - Frontend

Frontend desarrollado en React + TypeScript para el Sistema de Gestión de Pagos de Empleados.

La aplicación permite administrar empleados, usuarios, reportes, auditoría y seguridad, consumiendo los servicios REST expuestos por el backend `SB.Restful`.

---

## Descripción General

El frontend proporciona una interfaz web moderna para la gestión operativa del sistema.

Permite:

* Inicio de sesión con JWT.
* Visualización de módulos según permisos.
* Gestión de empleados.
* Gestión de usuarios.
* Consulta de reportes.
* Consulta de auditoría.
* Perfil de usuario.
* Cambio de contraseña.
* Navegación protegida por autenticación.

---

## Tecnologías Utilizadas

* React 18
* TypeScript
* Vite
* Bootstrap 5
* React Bootstrap
* Axios
* SweetAlert2
* React Router DOM
* React Icons
* XLSX
* jsPDF

---

## Estructura del Proyecto

```text
src/
│
├── assets/
│   ├── logo-login.png
│   ├── logo-sb.png
│   └── logo-sliderv1.png
│
├── modules/
│   │
│   ├── rrhh/
│   │   ├── components/
│   │   ├── endpoints/
│   │   ├── models/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── seguridad/
│   │   ├── components/
│   │   ├── endpoints/
│   │   ├── models/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── reportes/
│   │   ├── endpoints/
│   │   ├── models/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── auditoria/
│       ├── endpoints/
│       ├── models/
│       ├── pages/
│       └── services/
│
└── shared/
    ├── components/
    ├── layouts/
    ├── services/
    └── utils/
```
---

## Responsabilidad de Carpetas

### assets

Contiene imágenes, logos e iconos utilizados por la aplicación.

### modules

Contiene los módulos funcionales del sistema.

### shared/components

Componentes reutilizables entre módulos.

Ejemplos:

* PaginationLite
* ActionLink
* RequiredLabel

### shared/layouts

Layouts principales de la aplicación.

Ejemplo:

* AppLayout

### shared/services

Configuración global de servicios HTTP.

Ejemplo:

* Axios instance
* Interceptores
* Manejo de errores

### shared/utils

Funciones utilitarias.

Ejemplos:

* Formateo de fechas
* Formateo de moneda
* Permisos
* Helpers generales

---

## Variables de Entorno

Copiar el archivo:

```text
.env.example
```

como:

```text
.env
```

Ejemplo:

```env
VITE_API_URL=http://localhost:5080
```

Esta URL debe apuntar al backend `SB.Restful`.

---

## Instalación

Instalar dependencias:

```bash
npm install
```

Si existe conflicto de dependencias:

```bash
npm install --legacy-peer-deps
```

---

## Ejecución Local

Ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## Compilación para Producción

```bash
npm run build
```

El resultado se genera en:

```text
dist/
```

---

## Vista Previa de Producción

```bash
npm run preview
```

---

## Autenticación

El sistema utiliza autenticación JWT.

Flujo general:

1. El usuario ingresa usuario y contraseña.
2. El frontend envía la petición al backend.
3. El backend responde con token JWT y datos del usuario.
4. El token se guarda localmente según configuración del login.
5. Axios envía el token en cada petición protegida.

Header utilizado:

```http
Authorization: Bearer {token}
```

---

## Credenciales

Las credenciales iniciales se encuentran documentadas en:

```text
CREDENCIALES.md
```

Si las credenciales son modificadas desde el módulo de usuarios, el sistema utilizará las nuevas credenciales almacenadas en la base de datos.

---

## Permisos Usados

El frontend valida menús y acciones utilizando el arreglo `permisos` devuelto por el login.

Permisos principales:

## Permisos

| Módulo    | Permisos                      |
| --------- | ----------------------------- |
| EMPLEADOS | VER, CREAR, EDITAR, ACTIVARORDESACTIVAR |
| USUARIOS  | VER, CREAR, EDITAR, ACTIVARORDESACTIVAR ,BLOQUEAORDESBLOQUEA|
| REPORTES  | VER, EXPORTAR                 |
| AUDITORIA | VER                           |


---

## Rutas Principales

| Ruta             | Módulo                 |
| ---------------- | ---------------------- |
| /                | Inicio                 |
| /login           | Inicio de sesión       |
| /empleados       | Gestión de empleados   |
| /usuarios        | Gestión de usuarios    |
| /reportes        | Reportes               |
| /auditoria       | Auditoría              |
| /forgot-password | Olvidé mi contraseña   |
| /reset-password  | Restablecer contraseña |

---

## Módulos Funcionales

### Seguridad

Incluye:

* Login
* Perfil de usuario
* Cambio de contraseña
* Gestión de usuarios
* Control de permisos
* Bloqueo y desbloqueo de usuarios
* Activación e inactivación de usuarios

---

### Recursos Humanos

Incluye:

* Listado paginado de empleados
* Filtros de búsqueda
* Crear empleado
* Editar empleado
* Ver detalle
* Activar/Inactivar empleado

---

### Reportes

Incluye:

* Reporte semanal de nómina
* Reporte por empleado
* Exportación a Excel
* Exportación a PDF

---

### Auditoría

Incluye:

* Consulta paginada
* Filtros por usuario
* Filtros por acción
* Filtros por entidad
* Filtros por fecha
* Visualización de IP y detalle de cambios

---

## Endpoints Consumidos

### Autenticación

| Método | Endpoint                 |
| ------ | ------------------------ |
| POST   | /api/Auth/Login          |
| POST   | /api/Auth/ChangePassword |
| GET    | /api/Auth/Profile        |

---

### Empleados

| Método | Endpoint                  |
| ------ | ------------------------- |
| GET    | /api/Empleado/GetPaginate |
| GET    | /api/Empleado/{id}        |
| POST   | /api/Empleado             |
| PUT    | /api/Empleado/{id}        |
| PATCH  | /api/Empleado/{id}        |
| DELETE | /api/Empleado/{id}        |

---

### Usuarios

| Método | Endpoint                 |
| ------ | ------------------------ |
| GET    | /api/Usuario/GetPaginate |
| GET    | /api/Usuario/GetAll      |
| GET    | /api/Usuario/{id}        |
| POST   | /api/Usuario             |
| PUT    | /api/Usuario/{id}        |
| PATCH  | /api/Usuario/{id}/active |
| PATCH  | /api/Usuario/{id}/block  |
| DELETE | /api/Usuario/{id}        |

---

### Catálogos

| Método | Endpoint                      |
| ------ | ----------------------------- |
| GET    | /api/Catalogos/departments    |
| GET    | /api/Catalogos/employee-types |
| GET    | /api/Catalogos/modules        |
| GET    | /api/Catalogos/roles          |

---

### Reportes

| Método | Endpoint                    |
| ------ | --------------------------- |
| GET    | /api/Reportes/weekly        |
| GET    | /api/Reportes/employee/{id} |

---

### Auditoría

| Método | Endpoint                   |
| ------ | -------------------------- |
| GET    | /api/Auditoria/GetPaginate |

---

## Olvidé mi Contraseña

El frontend contempla las pantallas para recuperación de contraseña.

Endpoints esperados:

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

---

## Auditoría

El módulo de auditoría consume:

```http
GET /api/Auditoria/GetPaginate?Page=1&Take=10
```

Campos esperados:

```text
Id
UsuarioRegistra
Accion
Entidad
EntidadId
Detalle
Ip
Fecha
```

---

## Capturas del Sistema

Las capturas estan dentro de:

```text
docs/images/
```

Ejemplo:

```text
docs/images/login.png
docs/images/home.png
docs/images/empleados.png
docs/images/usuarios.png
docs/images/reportes.png
docs/images/auditoria.png
```

Uso en README:

```md
![Login](docs/images/login.png)
![Home](docs/images/home.png)
![Empleados](docs/images/empleados.png)
![Usuarios](docs/images/usuarios.png)
![Reportes](docs/images/reportes.png)
![Auditoria](docs/images/auditoria.png)
```

---

## Dependencia del Backend

Antes de ejecutar el frontend, debe estar en ejecución el proyecto backend:

```text
SB.Restful
```

El backend expone la API consumida por esta aplicación.

---

## Comandos Útiles

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Notas

* El sistema utiliza rutas protegidas.
* El menú lateral se renderiza según permisos.
* Las acciones de crear, editar, activar e inactivar también dependen de permisos.
* El token JWT se envía automáticamente mediante Axios.
* Los errores de API se muestran mediante SweetAlert2.

## Licencia

Proyecto desarrollado con fines académicos y de demostración de buenas prácticas de desarrollo de React + TypeScript.
