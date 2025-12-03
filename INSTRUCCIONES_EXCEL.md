# Instrucciones para actualizar el archivo Excel

Para que la funcionalidad de jefes funcione correctamente, necesitas actualizar el archivo Excel `src/assets/datos.xlsx` con la siguiente estructura:

## Estructura de columnas requerida:

| Columna | Nombre | Descripción | Ejemplo |
|---------|--------|-------------|---------|
| A (0) | Código | Código del asesor | 102668 |
| B (1) | Nombre | Nombre del asesor | Juan Pérez |
| C (2) | Código Jefe | Código del jefe a cargo | 100001 |
| D (3) | (Opcional) | Cualquier otra columna | - |
| E (4) | Recaudo Actual | Recaudo actual del asesor | 5000000 |
| F (5) | Meta | Meta de recaudo | 10000000 |

## Ejemplo de datos:

```
Código    | Nombre           | Código Jefe | ... | Recaudo Actual | Meta
----------|------------------|-------------|-----|----------------|------------
100001    | María García     |             | ... | 0              | 0
102668    | Juan Pérez       | 100001      | ... | 5000000        | 10000000
102669    | Ana López        | 100001      | ... | 7500000        | 10000000
102670    | Carlos Ruiz      | 100001      | ... | 3000000        | 8000000
100002    | Pedro Martínez   |             | ... | 0              | 0
102671    | Laura Sánchez    | 100002      | ... | 6000000        | 12000000
```

## Notas importantes:

1. **Jefes**: Los jefes son identificados automáticamente cuando su código aparece en la columna "Código Jefe" de otros asesores.
2. **Columna Código Jefe vacía**: Si un asesor no tiene jefe asignado, deja la columna C vacía.
3. **Jefes sin meta propia**: Los jefes pueden tener sus propias metas en 0 si solo supervisan.
4. **Orden de columnas**: Es importante mantener el orden de las columnas como se especifica arriba.

## Cómo actualizar:

1. Abre el archivo `src/assets/datos.xlsx` en Excel
2. Inserta una nueva columna C (entre Nombre y la columna actual D)
3. Nombra la columna "Código Jefe"
4. Llena los códigos de jefe para cada asesor
5. Guarda el archivo

Una vez actualizado el archivo, la aplicación automáticamente:
- Detectará cuando se ingresa un código de jefe
- Mostrará el dashboard del equipo con todos los asesores a cargo
- Calculará las estadísticas totales del equipo
- Permitirá ordenar y visualizar el desempeño de cada asesor
