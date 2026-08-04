import { Course } from '../types';

export const htmlCssCourse: Course = {
  id: 'html_css',
  title: 'HTML y CSS',
  iconName: 'Layout',
  description: 'Diseña y construye sitios web modernos, adaptativos y accesibles con HTML5 semántico, CSS3, Flexbox, CSS Grid y Animaciones.',
  color: 'from-orange-500 to-amber-600',
  badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  totalLessons: 15,
  prerequisites: ['Ninguno - Desarrollo Web desde cero'],
  skillsGained: ['Estructura Semántica HTML5', 'Estilos CSS3 y Modelo de Caja', 'Maquetación con Flexbox', 'Diseño de Grillas con CSS Grid', 'Diseño Responsive (Media Queries)'],
  lessons: [
    {
      id: 1,
      title: '1. Estructura Básica HTML5 y Encabezados',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Jerarquía de elementos tipográficos y maquetación de textos.',
      theoryMarkdown: `
### Anatomía de HTML5

HTML (*HyperText Markup Language*) define la estructura jerárquica del contenido mediante etiquetas delimitadas por corchetes angulares.

#### Etiquetas básicas de texto:
- \`<h1>\`: Encabezado principal del documento.
- \`<p>\`: Bloques de párrafos de texto explicativo.

\`\`\`html
<h1>Documentación Web</h1>
<p>Introducción al desarrollo con HTML.</p>
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Titular periodístico',
          code: `<h1>Avances Tecnológicos</h1>\n<p>Reporte de innovaciones del año.</p>`,
          explanation: 'Estructura un titular destacado seguido de su resumen.'
        }
      ],
      exercise: {
        id: 'hc-1',
        instruction: 'Construye desde cero un marcado HTML que contenga una etiqueta `<h1>Aprende Web</h1>` seguida en una nueva línea por un párrafo `<p>HTML y CSS desde cero</p>`.',
        starterCode: `<!-- Escribe tu marcado HTML desde cero -->
<!-- Incluye <h1>Aprende Web</h1> y <p>HTML y CSS desde cero</p> -->
`,
        solutionCode: `<h1>Aprende Web</h1>\n<p>HTML y CSS desde cero</p>`,
        testCases: [
          { id: '1', expectedOutput: '<h1>Aprende Web</h1>\n<p>HTML y CSS desde cero</p>', description: 'Debe contener el h1 y p especificados' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Enlaces de Navegación Hypertextual',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Creación de hipervínculos utilizando la etiqueta <a>.',
      theoryMarkdown: `
### Enlaces con la etiqueta <a>

El atributo \`href\` (*Hypertext Reference*) especifica la dirección URL de destino a la que navegará el usuario al hacer clic.

\`\`\`html
<a href="https://google.com">Buscar</a>
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Enlace a perfil social',
          code: `<a href="https://github.com">Ver mi GitHub</a>`,
          explanation: 'Crea un hipervínculo que redirige hacia el portal externo.'
        }
      ],
      exercise: {
        id: 'hc-2',
        instruction: 'Escribe un marcado HTML desde cero que defina un enlace hacia la dirección `"https://google.com"` exhibiendo el texto visible `"Buscar"` (`<a href="...">Buscar</a>`).',
        starterCode: `<!-- Escribe tu marcado HTML desde cero -->
<!-- Define la etiqueta <a> con su atributo href -->
`,
        solutionCode: `<a href="https://google.com">Buscar</a>`,
        testCases: [
          { id: '1', expectedOutput: '<a href="https://google.com">Buscar</a>', description: 'Enlace href a google.com' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Listas Desordenadas (ul y li)',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Agrupación de elementos secuenciales en listas.',
      theoryMarkdown: `
### Listas en HTML

Las listas desordenadas (\`<ul>\`) agrupan elementos individuales en ítems (\`<li>\`) mediante viñetas.

\`\`\`html
<ul>
    <li>Inicio</li>
    <li>Contacto</li>
</ul>
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Lista de compras',
          code: `<ul>\n    <li>Manzanas</li>\n    <li>Leche</li>\n</ul>`,
          explanation: 'Representa una lista de compras mediante ítems li.'
        }
      ],
      exercise: {
        id: 'hc-3',
        instruction: 'Construye desde cero el marcado HTML para una lista desordenada `<ul>` que encierre exactamente dos elementos `<li>`: "Inicio" y "Contacto".',
        starterCode: `<!-- Escribe tu marcado HTML desde cero -->
<!-- Estructura el <ul> conteniendo los dos <li> -->
`,
        solutionCode: `<ul>\n    <li>Inicio</li>\n    <li>Contacto</li>\n</ul>`,
        testCases: [
          { id: '1', expectedOutput: '<ul>\n    <li>Inicio</li>\n    <li>Contacto</li>\n</ul>', description: 'Estructura ul/li válida' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Reglas CSS y Colores de Texto',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Aplicación de propiedades de color con hojas de estilo CSS.',
      theoryMarkdown: `
### Hojas de Estilo en Cascada (CSS)

CSS define las reglas de presentación visual. El selector de etiqueta apunta a elementos específicos para alterar sus propiedades.

\`\`\`css
p {
    color: #0000ff;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Estilizar encabezados',
          code: `h1 {\n    color: #2563eb;\n}`,
          explanation: 'Aplica el color azul a todas las etiquetas h1.'
        }
      ],
      exercise: {
        id: 'hc-4',
        instruction: 'Escribe una regla de estilo CSS desde cero que seleccione todos los elementos `<p>` y fije la propiedad de color en azul hexadecimal `#0000ff`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Aplica la regla p { color: ...; } */
`,
        solutionCode: `p {\n    color: #0000ff;\n}`,
        testCases: [
          { id: '1', expectedOutput: 'p {\n    color: #0000ff;\n}', description: 'Regla p { color: #0000ff; }' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Selectores de Clase (.)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Reutilización de estilos mediante clases de CSS.',
      theoryMarkdown: `
### Selectores de Clase

El punto (\`.\`) en CSS indica un selector de clase, permitiendo aplicar estilos a múltiples elementos que posean el atributo \`class\`.

\`\`\`css
.alerta {
    color: red;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Estilo para botón de confirmación',
          code: `.btn-exito {\n    color: green;\n}`,
          explanation: 'Define reglas específicas para los elementos con la clase btn-exito.'
        }
      ],
      exercise: {
        id: 'hc-5',
        instruction: 'Escribe una regla de estilo CSS desde cero para la clase `.alerta` estableciendo la propiedad `color: red;`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Define el bloque .alerta { color: red; } */
`,
        solutionCode: `.alerta {\n    color: red;\n}`,
        testCases: [
          { id: '1', expectedOutput: '.alerta {\n    color: red;\n}', description: 'Regla .alerta { color: red; }' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. El Modelo de Caja: Padding y Margin',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Espaciado interno y externo de elementos mediante el Modelo de Caja.',
      theoryMarkdown: `
### Padding y Margin

- \`padding\`: Espacio de relleno interno entre el contenido y el borde.
- \`margin\`: Espacio de margen externo de separación con otros elementos.

\`\`\`css
.tarjeta {
    padding: 16px;
    margin: 8px;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Dimensionar contenedor de noticias',
          code: `.caja {\n    padding: 24px;\n    margin: 12px;\n}`,
          explanation: 'Fija el distanciamiento interior y exterior del contenedor.'
        }
      ],
      exercise: {
        id: 'hc-6',
        instruction: 'Escribe la regla CSS desde cero para la clase `.tarjeta` definiendo `padding: 16px;` y `margin: 8px;`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Aplica padding y margin en la clase .tarjeta */
`,
        solutionCode: `.tarjeta {\n    padding: 16px;\n    margin: 8px;\n}`,
        testCases: [
          { id: '1', expectedOutput: '.tarjeta {\n    padding: 16px;\n    margin: 8px;\n}', description: 'Regla con padding y margin en .tarjeta' }
        ]
      }
    },
    {
      id: 7,
      title: '7. HTML5 Semántico (header y nav)',
      level: 'Medio',
      durationMinutes: 20,
      summary: 'Estructuración con significado para cabeceras de sitios.',
      theoryMarkdown: `
### Etiquetas Semánticas

Las etiquetas semánticas describen la función del bloque en la maquetación. \`<header>\` representa el encabezado superior y \`<nav>\` el contenedor de navegación.

\`\`\`html
<header>
    <nav>Menu</nav>
</header>
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Cabecera con logotipo',
          code: `<header>\n    <h1>Logo</h1>\n</header>`,
          explanation: 'Agrupa el logotipo dentro de la sección semántica header.'
        }
      ],
      exercise: {
        id: 'hc-7',
        instruction: 'Construye desde cero la estructura semántica HTML con un `<header>` conteniendo internamente una etiqueta `<nav>` con la palabra "Menu".',
        starterCode: `<!-- Escribe tu marcado HTML desde cero -->
<!-- Incluye <header> conteniendo <nav>Menu</nav> </header> -->
`,
        solutionCode: `<header>\n    <nav>Menu</nav>\n</header>`,
        testCases: [
          { id: '1', expectedOutput: '<header>\n    <nav>Menu</nav>\n</header>', description: 'Estructura semántica header > nav' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Flexbox y Distribución (space-between)',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Alineación unidireccional de elementos en CSS.',
      theoryMarkdown: `
### Flexbox unidireccional

\`display: flex\` convierte a un elemento en un contenedor flexible. \`justify-content: space-between\` distribuye los elementos separando los extremos.

\`\`\`css
.contenedor {
    display: flex;
    justify-content: space-between;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Barra de estado',
          code: `.status-bar {\n    display: flex;\n    justify-content: flex-end;\n}`,
          explanation: 'Alinea los elementos al extremo derecho usando Flexbox.'
        }
      ],
      exercise: {
        id: 'hc-8',
        instruction: 'Escribe una regla de estilo CSS desde cero para la clase `.contenedor` asignando las propiedades `display: flex;` y `justify-content: space-between;`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Aplica display y justify-content a .contenedor */
`,
        solutionCode: `.contenedor {\n    display: flex;\n    justify-content: space-between;\n}`,
        testCases: [
          { id: '1', expectedOutput: '.contenedor {\n    display: flex;\n    justify-content: space-between;\n}', description: 'Regla flexbox space-between' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Multilinea Flexbox (flex-wrap y gap)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Manejo de saltos de línea y espaciado en grillas flexibles.',
      theoryMarkdown: `
### Multi-línea y Espaciado Flexbox

- \`flex-wrap: wrap\`: Permite que los elementos pasen a nuevas filas cuando superan el ancho disponible.
- \`gap\`: Establece la separación uniforme entre ítems adyacentes.

\`\`\`css
.mosaico {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Galería de imágenes adaptativa',
          code: `.galeria {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 20px;\n}`,
          explanation: 'Distribuye imágenes con un espaciado regular de 20px.'
        }
      ],
      exercise: {
        id: 'hc-9',
        instruction: 'Escribe el CSS desde cero para la clase `.mosaico` estableciendo las tres propiedades: `display: flex;`, `flex-wrap: wrap;` y `gap: 12px;`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Aplica flex, wrap y gap en .mosaico */
`,
        solutionCode: `.mosaico {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n}`,
        testCases: [
          { id: '1', expectedOutput: '.mosaico {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n}', description: 'CSS para mosaico con wrap y gap' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Formularios HTML5 Básicos',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Campos de entrada e interacción en formularios.',
      theoryMarkdown: `
### Formularios e Entradas de Datos

La etiqueta \`<form>\` envuelve controles de interacción como entradas de texto \`<input>\` y botones de envío \`<button type="submit">\`.

\`\`\`html
<form>
    <input type="text" placeholder="Buscar">
    <button type="submit">Ir</button>
</form>
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Formulario de suscripción',
          code: `<form>\n    <input type="email" placeholder="Email">\n    <button type="submit">Unirse</button>\n</form>`,
          explanation: 'Crea un campo para email junto con el botón de envío.'
        }
      ],
      exercise: {
        id: 'hc-10',
        instruction: 'Construye desde cero el marcado HTML de un formulario `<form>` conteniendo un `<input type="text" placeholder="Buscar">` y un botón `<button type="submit">Ir</button>`.',
        starterCode: `<!-- Escribe tu marcado HTML desde cero -->
<!-- Incluye <form> conteniendo <input> y <button> -->
`,
        solutionCode: `<form>\n    <input type="text" placeholder="Buscar">\n    <button type="submit">Ir</button>\n</form>`,
        testCases: [
          { id: '1', expectedOutput: '<form>\n    <input type="text" placeholder="Buscar">\n    <button type="submit">Ir</button>\n</form>', description: 'Formulario con input y submit' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. Layout Bidimensional con CSS Grid',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Creación de grillas compuestas con la función repeat().',
      theoryMarkdown: `
### CSS Grid Layout

CSS Grid proporciona un sistema de maquetación bidimensional basado en columnas y filas.

\`\`\`css
.grid-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Layout de 3 columnas',
          code: `.dashboard {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n}`,
          explanation: 'Divide el espacio en 3 columnas fraccionales de igual dimensión.'
        }
      ],
      exercise: {
        id: 'hc-11',
        instruction: 'Escribe la regla CSS desde cero para la clase `.grid-layout` asignando `display: grid;` y `grid-template-columns: repeat(2, 1fr);`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Define .grid-layout con grid y repeat(2, 1fr) */
`,
        solutionCode: `.grid-layout {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n}`,
        testCases: [
          { id: '1', expectedOutput: '.grid-layout {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n}', description: 'Regla CSS Grid 2 columnas' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Media Queries y Adaptabilidad Responsive',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Reglas de adaptación de interfaz según el ancho de pantalla.',
      theoryMarkdown: `
### Media Queries

Las reglas \`@media\` permiten condicionar la aplicación de bloques de estilos según las dimensiones del dispositivo.

\`\`\`css
@media (min-width: 600px) {
    body {
        font-size: 18px;
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Ocultar lateral en móviles',
          code: `@media (max-width: 480px) {\n    .sidebar {\n        display: none;\n    }\n}`,
          explanation: 'Oculta el menú lateral en pantallas estrechas de menor tamaño.'
        }
      ],
      exercise: {
        id: 'hc-12',
        instruction: 'Escribe una media query desde cero para `@media (min-width: 600px)` que establezca la propiedad `font-size: 18px;` dentro de la regla para la etiqueta `body`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Define la media query @media (min-width: 600px) { body { ... } } */
`,
        solutionCode: `@media (min-width: 600px) {\n    body {\n        font-size: 18px;\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '@media (min-width: 600px) {\n    body {\n        font-size: 18px;\n    }\n}', description: 'Media query min-width: 600px' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Custom Properties y Variables CSS',
      level: 'Avanzado',
      durationMinutes: 25,
      summary: 'Declaración y consumo de variables globales en CSS.',
      theoryMarkdown: `
### Custom Properties (Variables CSS)

Las variables se declaran globalmente en el pseudo-selector \`:root\` antecedidas de dos guiones (\`--\`) y se invocan con la función \`var()\`.

\`\`\`css
:root {
    --primary: #ff0000;
}
.titulo {
    color: var(--primary);
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Variable de fondo',
          code: `:root {\n    --bg-color: #f3f4f6;\n}\nbody {\n    background-color: var(--bg-color);\n}`,
          explanation: 'Centraliza la paleta cromática del sitio mediante variables CSS.'
        }
      ],
      exercise: {
        id: 'hc-13',
        instruction: 'Declara desde cero en CSS el bloque `:root { --primary: #ff0000; }` y aplícala en la regla para `.titulo { color: var(--primary); }`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Define :root con --primary y asigna var(--primary) en .titulo */
`,
        solutionCode: `:root {\n    --primary: #ff0000;\n}\n.titulo {\n    color: var(--primary);\n}`,
        testCases: [
          { id: '1', expectedOutput: ':root {\n    --primary: #ff0000;\n}\n.titulo {\n    color: var(--primary);\n}', description: 'Uso correcto de variables CSS' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Transiciones Suaves en CSS',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Animación de cambios de propiedades con la propiedad transition.',
      theoryMarkdown: `
### Transiciones en CSS

La propiedad \`transition\` suaviza la animación entre estados de un elemento (por ejemplo en el estado \`:hover\`).

\`\`\`css
.box {
    transition: opacity 0.5s ease;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Transición de color en botones',
          code: `.btn {\n    transition: background-color 0.2s;\n}`,
          explanation: 'Suaviza el cambio del color de fondo ante la interacción.'
        }
      ],
      exercise: {
        id: 'hc-14',
        instruction: 'Escribe una regla CSS desde cero para la clase `.box` definiendo la propiedad `transition: opacity 0.5s ease;`.',
        starterCode: `/* Escribe tu código CSS desde cero */
/* Aplica transition en la clase .box */
`,
        solutionCode: `.box {\n    transition: opacity 0.5s ease;\n}`,
        testCases: [
          { id: '1', expectedOutput: '.box {\n    transition: opacity 0.5s ease;\n}', description: 'Regla de transición CSS' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Estructura de Componente Tarjeta Final',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Composición final de componentes web estructurados.',
      theoryMarkdown: `
### Maquetación de Componentes

Un componente tarjeta combina contenedores genéricos (\`<div>\`), títulos y párrafos formando un bloque independiente.

\`\`\`html
<div class="card">
    <h2>Proyecto</h2>
    <p>Listo</p>
</div>
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Tarjeta de presentación',
          code: `<div class="profile">\n    <h2>Nombre</h2>\n    <p>Desarrollador Web</p>\n</div>`,
          explanation: 'Estructura una tarjeta de perfil accesible.'
        }
      ],
      exercise: {
        id: 'hc-15',
        instruction: 'Construye el marcado HTML desde cero para una tarjeta `<div class="card">` que contenga un título `<h2>Proyecto</h2>` y un párrafo `<p>Listo</p>`.',
        starterCode: `<!-- Escribe tu marcado HTML desde cero -->
<!-- Crea <div class="card"> conteniendo <h2> y <p> -->
`,
        solutionCode: `<div class="card">\n    <h2>Proyecto</h2>\n    <p>Listo</p>\n</div>`,
        testCases: [
          { id: '1', expectedOutput: '<div class="card">\n    <h2>Proyecto</h2>\n    <p>Listo</p>\n</div>', description: 'Estructura final completada' }
        ]
      }
    }
  ]
};
