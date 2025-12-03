# Collection Tracker - Sistema de Seguimiento de Recaudo

Una aplicación Angular moderna y elegante para que los asesores puedan consultar su progreso de recaudo versus su meta establecida.

## 🎯 Características

- **Modal de Autenticación**: Los asesores ingresan con su código único
- **Dashboard Interactivo**: Visualización clara del recaudo actual y la meta
- **Barra de Progreso Animada**: Indicador visual del porcentaje de avance
- **Diseño Premium**: Interfaz moderna con gradientes, animaciones y efectos visuales
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Validación de Código**: Manejo de errores para códigos inválidos

## 🚀 Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **CSS3** - Estilos con animaciones y gradientes
- **Google Fonts (Inter)** - Tipografía moderna

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Angular CLI

## 🔧 Instalación

1. Navegar al directorio del proyecto:
```bash
cd collection-tracker
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm start
```

4. Abrir el navegador en `http://localhost:4200/`

## 💡 Uso

1. **Inicio de Sesión**: 
   - Al abrir la aplicación, se mostrará un modal solicitando el código de asesor
   - Ingrese un código válido (ejemplos: 102668, 102878, 102918, etc.)
   - Presione "Ingresar"

2. **Dashboard**:
   - Visualice su recaudo actual
   - Vea su meta de recaudo
   - Observe el monto faltante por recaudar
   - Revise el porcentaje de progreso con la barra animada
   - Reciba mensajes motivacionales según su avance

3. **Cerrar Sesión**:
   - Haga clic en el botón "Salir" en la esquina superior derecha

## 📊 Datos de Asesores

Los datos de los asesores se encuentran en `src/assets/advisors-data.json`. Algunos códigos de ejemplo:

- **102668** - Urbina Graterol Freddy Jesus
- **102878** - Velasco Jiménez Ana del Pilar
- **102918** - Yepes Sánchez Cristian Camilo
- **102839** - Alvarado Sandoval Natali Jaharmeiny
- **102925** - Amado Puerto Gladys Andrea

## 🎨 Características de Diseño

- **Gradientes Vibrantes**: Colores modernos y atractivos
- **Animaciones Suaves**: Transiciones fluidas en todos los elementos
- **Efectos de Hover**: Interactividad visual mejorada
- **Glassmorphism**: Efectos de vidrio esmerilado en componentes
- **Indicadores de Color**: 
  - 🔴 Rojo: < 50% de progreso
  - 🟠 Naranja: 50-79% de progreso
  - 🟢 Verde: ≥ 80% de progreso

## 📁 Estructura del Proyecto

```
collection-tracker/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login-modal/      # Componente del modal de login
│   │   │   └── dashboard/        # Componente del dashboard
│   │   ├── services/
│   │   │   └── advisor.service.ts # Servicio de gestión de asesores
│   │   ├── app.component.*       # Componente principal
│   │   └── app.config.ts         # Configuración de la app
│   ├── assets/
│   │   └── advisors-data.json    # Datos de asesores
│   └── styles.css                # Estilos globales
└── package.json
```

## 🔄 Flujo de la Aplicación

1. Usuario abre la aplicación
2. Se muestra el modal de login
3. Usuario ingresa código de asesor
4. Sistema valida el código
5. Si es válido: muestra dashboard con información
6. Si es inválido: muestra mensaje de error
7. Usuario puede cerrar sesión y volver al login

## 🛠️ Comandos Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `ng generate component <name>` - Genera un nuevo componente

## 📱 Responsive Design

La aplicación está optimizada para:
- 💻 Desktop (1920px+)
- 💻 Laptop (1024px - 1919px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (< 768px)

## 🎯 Próximas Mejoras

- Integración con API backend
- Gráficos históricos de recaudo
- Notificaciones push
- Exportación de reportes
- Modo oscuro/claro
- Múltiples idiomas

## 📄 Licencia

Este proyecto es de uso interno para Innova.

## 👥 Autor

Desarrollado para el equipo de Innova

---

**Nota**: Para modificar los datos de asesores, edite el archivo `src/assets/advisors-data.json`
