# ECOM Advisory — Página "Sobre Nosotros"

> Página web estática para la sección **Sobre Nosotros** del sitio corporativo de ECOM Advisory. Desarrollada con HTML5, CSS3 y JavaScript Vanilla, sin dependencias de frameworks.

---

## 📋 Contenido

- [Vista general](#-vista-general)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Guía de estilo](#-guía-de-estilo)
- [Secciones de la página](#-secciones-de-la-página)
- [Cómo usar](#-cómo-usar)
- [Personalización](#-personalización)
- [Dependencias externas](#-dependencias-externas)
- [Repositorio](#-repositorio)

---

## 🌐 Vista general

ECOM Advisory es una firma de consultoría especializada en comercio electrónico. Esta página presenta al equipo, misión, visión y valores de la empresa, e incluye un formulario de contacto.

**Tecnologías utilizadas:**

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y accesibilidad |
| CSS3 + Variables | Diseño y guía de estilo |
| JavaScript Vanilla | Interactividad, animaciones y validaciones |
| Google Fonts | Tipografía (Inter + Montserrat) |
| Font Awesome 6 | Iconografía |

---

## 📁 Estructura del proyecto

```
sobre nosotros/
│
├── index.html              # Página principal (estructura semántica completa)
│
├── css/
│   └── styles.css          # Todos los estilos — guía de estilo + componentes
│
├── js/
│   └── main.js             # Lógica: navegación, contadores, formulario, animaciones
│
├── assets/
│   └── images/             # Imágenes del proyecto (foto de equipo, etc.)
│
├── .gitignore              # Archivos excluidos del repositorio
└── README.md               # Este documento
```

---

## 🎨 Guía de estilo

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `#03045e` | Headings, fondo del footer, fondo del hero |
| `--secondary` | `#0a49b0` | Botones, iconos, acentos interactivos |
| `--tertiary` | `#62bfdd` | Tags, highlights, links del footer |
| `--dark` | `#3c3c3c` | Texto del cuerpo |
| `--light-bg` | `#f8f9fc` | Fondo general de la página |
| `--white` | `#ffffff` | Tarjetas, secciones alternas |
| `--gradient` | `#03045e → #0a49b0` | Botones primarios, hero, CTA, footer |
| `--glass-bg` | `rgba(255,255,255,0.1)` | Fondo glassmorphism (formulario CTA) |
| `--glass-border` | `rgba(255,255,255,0.2)` | Borde glassmorphism |
| `--glass-blur` | `10px` | Desenfoque glassmorphism |

### Tipografía

| Fuente | Peso | Uso |
|---|---|---|
| **Inter** | 300–800 | Cuerpo del texto (`body`, `p`, `span`, botones) |
| **Montserrat** | 600–800 | Encabezados (`h1` – `h6`) |

### Sombras y bordes

```css
--shadow-sm:  0 2px 8px rgba(3, 4, 94, 0.08)
--shadow-md:  0 8px 32px rgba(3, 4, 94, 0.12)
--shadow-lg:  0 16px 48px rgba(3, 4, 94, 0.16)
--shadow-glow: 0 8px 32px rgba(10, 73, 176, 0.25)
--radius:     16px
--radius-sm:  8px
```

---

## 📄 Secciones de la página

| Sección | ID | Descripción |
|---|---|---|
| Header/Nav | `#header` | Navegación fija con scroll activo y menú hamburguesa |
| Hero | `#inicio` | Banner principal con partículas animadas y CTA |
| Estadísticas | `#stats` | Contadores animados (clientes, años, retención, ROI) |
| Quiénes somos | `#quienes-somos` | Historia de la empresa con imagen y características |
| Misión & Visión | `#mision-vision` | Dos tarjetas con glassmorphism |
| Valores | `#valores` | Grid de 6 valores corporativos |
| Equipo | `#equipo` | Cards del equipo generadas dinámicamente vía JS |
| Contacto | `#contacto` | Formulario con validación en tiempo real |
| Footer | — | Links de navegación, redes sociales y copyright |

---

## 🚀 Cómo usar

1. **Abre el proyecto** — haz doble clic en `index.html` o usa la extensión **Live Server** en VS Code.
2. La página carga fuentes e iconos desde CDN (requiere conexión a internet).
3. No requiere compilación ni instalación de paquetes.

> **Recomendado:** usar Live Server en VS Code para recarga automática al editar.

---

## ✏️ Personalización

### Cambiar los miembros del equipo

Edita el array `teamMembers` en `js/main.js`:

```js
const teamMembers = [
  {
    name: "Nombre Apellido",
    role: "Cargo",
    bio: "Breve descripción profesional.",
    icon: "fas fa-user",   // ícono de Font Awesome (si no hay foto)
    linkedin: "https://...",
    twitter:  "https://...",
  },
  // más miembros...
];
```

Para usar fotos reales, agrega las imágenes en `assets/images/` y cambia la propiedad `icon` por `photo: "assets/images/nombre.jpg"` (requiere actualizar también la plantilla en `initTeamCards()`).

### Cambiar textos de Misión, Visión y Valores

Edita directamente el contenido en `index.html` dentro de las secciones `#mision-vision` y `#valores`.

### Cambiar colores

Modifica las variables en la sección `:root` de `css/styles.css`. Todos los componentes heredan automáticamente los nuevos valores.

### Agregar fotos del equipo

Coloca las imágenes en `assets/images/` con formato JPG o WEBP. Tamaño recomendado: **600 × 600 px** o superior, relación de aspecto **1:1**.

---

## 📦 Dependencias externas (CDN)

No requieren instalación. Se cargan desde internet.

| Librería | Versión | URL |
|---|---|---|
| Google Fonts — Inter | latest | fonts.googleapis.com |
| Google Fonts — Montserrat | latest | fonts.googleapis.com |
| Font Awesome | 6.5.0 | cdnjs.cloudflare.com |

---

## 🔗 Repositorio

**GitHub:** [github.com/zathit17/ECOMadvisory_sobre_nosotros](https://github.com/zathit17/ECOMadvisory_sobre_nosotros)

**Clonar el proyecto:**

```bash
git clone git@github.com:zathit17/ECOMadvisory_sobre_nosotros.git
```

---

*© 2026 ECOM Advisory. Todos los derechos reservados.*
