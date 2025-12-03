# Funcionalidad de Dashboard para Jefes - Collection Tracker

## 📋 Resumen de Cambios

Se ha implementado una nueva funcionalidad que permite a los jefes ver un dashboard especial con todos los asesores a su cargo y el recaudo que han realizado.

## ✨ Características Implementadas

### 1. **Dashboard de Jefe**
- Vista especial que se muestra automáticamente cuando se ingresa un código de jefe
- Muestra estadísticas consolidadas del equipo:
  - Número total de asesores en el equipo
  - Recaudo total del equipo
  - Meta total del equipo
  - Progreso general del equipo (%)

### 2. **Tabla de Asesores**
- Lista completa de todos los asesores a cargo
- Información detallada por asesor:
  - Nombre y código
  - Recaudo actual
  - Meta asignada
  - Progreso individual (%)
  - Barra de progreso visual con código de colores

### 3. **Funcionalidades Interactivas**
- **Ordenamiento**: Click en los encabezados de la tabla para ordenar por:
  - Nombre (alfabético)
  - Recaudo actual (mayor a menor / menor a mayor)
  - Meta (mayor a menor / menor a mayor)
  - Progreso (mayor a menor / menor a mayor)
- **Indicadores visuales**: Código de colores según el progreso:
  - 🔴 Rojo: < 50%
  - 🟠 Naranja: 50% - 79%
  - 🟢 Verde: ≥ 80%

### 4. **Detección Automática**
- El sistema detecta automáticamente si un código es de jefe o asesor
- Un código es considerado "jefe" si aparece como código de jefe de al menos un asesor
- Redirección automática al dashboard correspondiente

## 🗂️ Archivos Creados/Modificados

### Nuevos Archivos:
1. **`src/app/components/team-dashboard/team-dashboard.component.ts`**
   - Componente principal del dashboard de jefes
   - Maneja la lógica de ordenamiento y visualización

2. **`src/app/components/team-dashboard/team-dashboard.component.html`**
   - Template del dashboard de jefes
   - Tabla interactiva de asesores

3. **`src/app/components/team-dashboard/team-dashboard.component.css`**
   - Estilos modernos con gradientes y animaciones
   - Diseño responsive

4. **`INSTRUCCIONES_EXCEL.md`**
   - Guía detallada para actualizar el archivo Excel

### Archivos Modificados:
1. **`src/app/services/advisor.service.ts`**
   - Agregada interfaz `TeamStats`
   - Nuevo campo `bossCode` en interfaz `Advisor`
   - Nuevos métodos:
     - `isBoss(code: string)`: Verifica si un código es de jefe
     - `getAdvisorsByBoss(bossCode: string)`: Obtiene asesores por jefe
     - `getTeamStats(bossCode: string)`: Calcula estadísticas del equipo
     - `isCurrentUserBoss()`: Verifica si el usuario actual es jefe

2. **`src/app/app.component.ts`**
   - Agregada propiedad `isBoss`
   - Lógica para detectar tipo de usuario

3. **`src/app/app.component.html`**
   - Renderizado condicional de dashboards según tipo de usuario

4. **`src/app/components/login-modal/login-modal.component.html`**
   - Actualizado texto para incluir "asesor o jefe"

## 📊 Estructura de Datos Requerida

### Archivo Excel (`src/assets/datos.xlsx`)

**IMPORTANTE**: Debes actualizar el archivo Excel agregando la columna de "Código Jefe"

| Columna | Índice | Nombre | Descripción |
|---------|--------|--------|-------------|
| A | 0 | Código | Código del asesor o jefe |
| B | 1 | Nombre | Nombre completo |
| C | 2 | **Código Jefe** | **NUEVO: Código del jefe a cargo** |
| D | 3 | (Opcional) | Cualquier otra información |
| E | 4 | Recaudo Actual | Monto recaudado |
| F | 5 | Meta | Meta de recaudo |

### Ejemplo de Datos:

```
Código  | Nombre           | Código Jefe | ... | Recaudo    | Meta
--------|------------------|-------------|-----|------------|------------
100001  | María García     |             | ... | 0          | 0
102668  | Juan Pérez       | 100001      | ... | 5000000    | 10000000
102669  | Ana López        | 100001      | ... | 7500000    | 10000000
102670  | Carlos Ruiz      | 100001      | ... | 3000000    | 8000000
```

En este ejemplo:
- **María García (100001)** es jefe de 3 asesores
- Cuando ingrese el código `100001`, verá el dashboard de equipo
- Cuando ingrese `102668`, `102669` o `102670`, verán su dashboard individual

## 🚀 Cómo Usar

### Para Asesores:
1. Ingresar código de asesor en el login
2. Ver dashboard individual con su recaudo y meta personal

### Para Jefes:
1. Ingresar código de jefe en el login
2. Ver dashboard de equipo con:
   - Resumen de estadísticas del equipo
   - Lista completa de asesores
   - Progreso individual de cada asesor
3. Click en encabezados de tabla para ordenar
4. Visualizar rápidamente el desempeño del equipo

## 🎨 Diseño

- **Gradientes vibrantes**: Púrpura a violeta
- **Animaciones suaves**: Transiciones y efectos hover
- **Código de colores**: Indicadores visuales de progreso
- **Responsive**: Adaptado para móviles y tablets
- **Tabla interactiva**: Ordenamiento dinámico

## 📝 Próximos Pasos

1. **Actualizar el archivo Excel** siguiendo las instrucciones en `INSTRUCCIONES_EXCEL.md`
2. **Agregar la columna "Código Jefe"** en la posición C (columna 2)
3. **Llenar los códigos de jefe** para cada asesor
4. **Guardar el archivo** y recargar la aplicación
5. **Probar** ingresando un código de jefe

## 🔧 Solución de Problemas

### El dashboard de jefe no aparece:
- Verifica que el código del jefe esté en la columna C del Excel
- Asegúrate de que al menos un asesor tenga ese código como jefe
- Recarga la aplicación después de modificar el Excel

### Los asesores no aparecen en la lista:
- Verifica que los códigos de jefe coincidan exactamente
- Revisa que no haya espacios extra en los códigos
- Confirma que el archivo Excel esté en `src/assets/datos.xlsx`

### Errores de compilación:
- Ejecuta `npm install` para asegurar todas las dependencias
- Reinicia el servidor de desarrollo con `ng serve`

## 💡 Notas Técnicas

- La detección de jefes es automática basada en relaciones en el Excel
- Un mismo código puede ser asesor Y jefe (si tiene jefe asignado pero también tiene asesores a cargo)
- Las estadísticas se calculan en tiempo real al cargar los datos
- El ordenamiento es local (no requiere recarga de datos)

---

**Desarrollado para**: Collection Tracker  
**Fecha**: Diciembre 2025  
**Versión**: 2.0
