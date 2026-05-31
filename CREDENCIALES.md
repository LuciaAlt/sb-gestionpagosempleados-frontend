# Credenciales de Usuarios

## Administradores (rol `ADMIN`)

Acceso completo: ver, crear, editar, inactivar empleados, gestionar usuarios, ver bitácora, exportar reportes.

| # | Usuario | Contraseña | Email | Rol |
|---|---|---|---|---|
| 1 | `admin` | `Admin123!` | admin@sb.local | ADMIN |
| 2 | `supervisor` | `Super123!` | supervisor@sb.local | ADMIN |

##  Usuarios normales (rol `USUARIO`)

Solo lectura: ver empleados, ver reportes, exportar reportes. **No pueden** crear ni editar empleados ni gestionar usuarios.

| # | Username | Contraseña | Email | Rol |
|---|---|---|---|---|
| 3 | `jperez` | `Juan123!` | juan.perez@sb.local | USUARIO |
| 4 | `mlopez` | `Maria123!` | maria.lopez@sb.local | USUARIO |
| 5 | `crodriguez` | `Carlos123!` | carlos.rodriguez@sb.local | USUARIO |
| 6 | `asantos` | `Ana123!` | ana.santos@sb.local | USUARIO |

---

##  Permisos por rol

### Rol ADMIN (Id=1) — los 9 permisos
- EMPLEADOS_VER, EMPLEADOS_CREAR, EMPLEADOS_EDITAR, EMPLEADOS_ACTIVARORDESACTIVAR
- REPORTES_VER, REPORTES_EXPORTAR
- USUARIOS_VER, USUARIOS_CREAR, AUDITORIA_VER,USUARIOS_EDITAR, USUARIOS_ACTIVARORDESACTIVAR,USUARIOS_LOQUEAORDESBLOQUEA

### Rol USUARIO (Id=2) — 2 permisos (solo lectura)
- EMPLEADOS_VER
- REPORTES_VER
- REPORTES_EXPORTAR
-
---

##  Importante para el frontend

Cuando construyamos el frontend, usaremos estas credenciales para:
- **Pantalla de login**: validar con `admin / Admin123!`
- **Mostrar/ocultar botones**: el JWT incluye los permisos como claims `permisos`, el frontend los lee y decide qué mostrar
- **Probar control de acceso**: loguearse como `jperez` para verificar que no aparece el botón "Registrar empleado"
