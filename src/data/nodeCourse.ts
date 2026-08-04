import { Course } from '../types';

export const nodeCourse: Course = {
  id: 'nodejs',
  title: 'Node JS',
  iconName: 'Server',
  description: 'Aprende desarrollo backend con Node.js: runtime, sistema de archivos, Express, APIs REST, middleware y asincronía.',
  color: 'from-emerald-600 to-green-700',
  badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  totalLessons: 15,
  prerequisites: ['JavaScript básico e intermedio'],
  skillsGained: ['Node Runtime & Event Loop', 'Módulos Globales y fs (File System)', 'Servidor HTTP con Express', 'Creación de APIs RESTful', 'Middleware & Autenticación'],
  lessons: [
    {
      id: 1,
      title: '1. Introducción a Node.js y Entorno de Ejecución',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'El motor V8 fuera del navegador y la consola de salida en Node.js.',
      theoryMarkdown: `
### Entorno de Ejecución de Node.js

Node.js es un entorno de ejecución (*runtime*) asíncrono y orientado a eventos basado en el motor V8 de Google Chrome. Permite ejecutar código JavaScript directamente en el servidor fuera de un navegador web.

#### El objeto global \`process\`:
Proporciona información sobre el proceso actual en ejecución en el servidor.

\`\`\`javascript
console.log("Servidor iniciado");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Reporte del proceso de servidor',
          code: `console.log("Iniciando microservicio...");\nconsole.log("Entorno activo");`,
          explanation: 'Muestra mensajes secuenciales de estado en la consola estándar del servidor.'
        }
      ],
      exercise: {
        id: 'node-1',
        instruction: 'Escribe desde cero un script de Node.js que imprima exactamente "Servidor Node.js Iniciado" en la consola del sistema.',
        starterCode: `// Escribe tu código Node.js desde cero
// Utiliza console.log para mostrar el mensaje de inicio
`,
        solutionCode: `console.log("Servidor Node.js Iniciado");`,
        testCases: [
          { id: '1', expectedOutput: 'Servidor Node.js Iniciado', description: 'Debe imprimir Servidor Node.js Iniciado' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Estructura de Objetos de Configuración',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Manejo de puertos y opciones en archivos de servidor.',
      theoryMarkdown: `
### Configuración en Backend

Los servidores Node.js estructuran sus opciones (como puertos y hosts) en objetos literales para inicializar instancias HTTP.

\`\`\`javascript
const config = { puerto: 3000 };
console.log(config.puerto);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Parámetros de base de datos',
          code: `const dbConfig = { host: "localhost", port: 5432 };\nconsole.log(\`Conectando a \${dbConfig.host}:\${dbConfig.port}\`);`,
          explanation: 'Accede a las propiedades del objeto de configuración.'
        }
      ],
      exercise: {
        id: 'node-2',
        instruction: 'Construye desde cero un script en Node.js que cree el objeto `const config = { puerto: 3000 };` e imprima el valor de la propiedad `config.puerto` (3000).',
        starterCode: `// Escribe tu código Node.js desde cero
// Declara el objeto config e imprime config.puerto
`,
        solutionCode: `const config = { puerto: 3000 };\nconsole.log(config.puerto);`,
        testCases: [
          { id: '1', expectedOutput: '3000', description: 'Debe imprimir 3000' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Procesamiento de Respuestas JSON (JSON.parse)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Conversión de respuestas en formato JSON en objetos manipulables.',
      theoryMarkdown: `
### Parsing de Datos JSON

La API del sistema de archivos o peticiones HTTP entrega frecuentemente cadenas en formato JSON. Se utiliza \`JSON.parse()\` para deserializarlas en objetos JavaScript.

\`\`\`javascript
const json = '{"status":"ok"}';
const obj = JSON.parse(json);
console.log(obj.status);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Deserializar payload de usuario',
          code: `const payload = '{"user":"admin","rol":"root"}';\nconst datos = JSON.parse(payload);\nconsole.log(datos.rol);`,
          explanation: 'Convierte la cadena JSON en objeto e inspecciona la propiedad rol.'
        }
      ],
      exercise: {
        id: 'node-3',
        instruction: 'Escribe un script en Node.js desde cero que partiendo de `const json = \'{"status":"ok"}\'` parsee la cadena con `JSON.parse()` e imprima el atributo `status` ("ok").',
        starterCode: `// Escribe tu código Node.js desde cero
// Parsea la cadena JSON e imprime la propiedad status
`,
        solutionCode: `const json = '{"status":"ok"}';\nconst obj = JSON.parse(json);\nconsole.log(obj.status);`,
        testCases: [
          { id: '1', expectedOutput: 'ok', description: 'Debe imprimir ok' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Respuestas del Servidor HTTP',
      level: 'Básico',
      durationMinutes: 25,
      summary: 'Simulación de códigos de estado HTTP y mensajes de respuesta.',
      theoryMarkdown: `
### Códigos de Estado HTTP

Las respuestas HTTP combinan un código numérico (ej: 200 OK) con un cuerpo de respuesta en texto o JSON.

\`\`\`javascript
const res = { body: "Respuesta OK", code: 200 };
console.log(\`\${res.code}: \${res.body}\`);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Respuesta HTTP 404',
          code: `const respuesta = { status: 404, mensaje: "No encontrado" };\nconsole.log(\`\${respuesta.status} - \${respuesta.mensaje}\`);`,
          explanation: 'Estructura una respuesta de error indicando el código 404.'
        }
      ],
      exercise: {
        id: 'node-4',
        instruction: 'Construye desde cero un script en Node.js que declare `const res = { body: "Respuesta OK", code: 200 };` e imprima la cadena formateada `"200: Respuesta OK"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Declara el objeto res e imprime f"\${res.code}: \${res.body}"
`,
        solutionCode: `const res = { body: "Respuesta OK", code: 200 };\nconsole.log(\`\${res.code}: \${res.body}\`);`,
        testCases: [
          { id: '1', expectedOutput: '200: Respuesta OK', description: 'Debe imprimir 200: Respuesta OK' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Emisión de Eventos y Callbacks',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Patrón observador y disparo de eventos en Node.js.',
      theoryMarkdown: `
### Arquitectura Orientada a Eventos

Node.js se basa en la notificación de eventos. Funciones emisoras notifican eventos asociando un identificador con una carga útil (*payload*).

\`\`\`javascript
function emitir(evento, payload) {
    console.log(\`\${evento}: \${payload}\`);
}
emitir("login", "admin");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Evento de conexión a BD',
          code: `function notificarBD(estado) {\n    console.log(\`[DB EVENT] \${estado}\`);\n}\nnotificarBD("CONECTADO");`,
          explanation: 'Dispara una notificación sobre el estado de la conexión.'
        }
      ],
      exercise: {
        id: 'node-5',
        instruction: 'Escribe desde cero un script en Node.js que cree la función `function emitir(evento, payload)` para imprimir `"\${evento}: \${payload}"`. Invócala con los parámetros `("login", "admin")`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Define la función emitir e invócala con ("login", "admin")
`,
        solutionCode: `function emitir(evento, payload) {\n    console.log(\`\${evento}: \${payload}\`);\n}\nemitir("login", "admin");`,
        testCases: [
          { id: '1', expectedOutput: 'login: admin', description: 'Debe imprimir login: admin' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. Endpoints REST con Express',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Enrutamiento básico en Express.js.',
      theoryMarkdown: `
### Endpoints y Rutas HTTP

Express simplifica el enrutamiento web asociando métodos HTTP (GET, POST) con rutas URI relativas.

\`\`\`javascript
console.log("pong");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Confirmación de servicio activo',
          code: `console.log("Servicio /health responderá OK");`,
          explanation: 'Representa la verificación de salud de una API REST.'
        }
      ],
      exercise: {
        id: 'node-6',
        instruction: 'Construye desde cero un script en Node.js que simule la respuesta de una ruta GET `/api/ping` imprimiendo en pantalla la cadena exacta `"pong"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Utiliza console.log para imprimir "pong"
`,
        solutionCode: `console.log("pong");`,
        testCases: [
          { id: '1', expectedOutput: 'pong', description: 'Debe imprimir pong' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Parámetros de Ruta (req.params)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Captura de IDs dinámicos en URLs de API.',
      theoryMarkdown: `
### Extracción de Parámetros

Los parámetros dinámicos en una URL se reciben en el objeto \`req.params\`.

\`\`\`javascript
const params = { id: "42" };
console.log(\`Obteniendo recurso \${params.id}\`);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Buscar producto por ID',
          code: `const req = { params: { id: "105" } };\nconsole.log(\`Buscando producto ID \${req.params.id}\`);`,
          explanation: 'Extrae la propiedad id contenida en req.params.'
        }
      ],
      exercise: {
        id: 'node-7',
        instruction: 'Escribe un script en Node.js desde cero que declare `const params = { id: "42" };` e imprime exactamente la cadena `"Obteniendo recurso 42"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Declara params e imprime "Obteniendo recurso \${params.id}"
`,
        solutionCode: `const params = { id: "42" };\nconsole.log(\`Obteniendo recurso \${params.id}\`);`,
        testCases: [
          { id: '1', expectedOutput: 'Obteniendo recurso 42', description: 'Debe imprimir Obteniendo recurso 42' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Logs y Middlewares de Intercepción',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Registro y auditoría de peticiones entrantes.',
      theoryMarkdown: `
### Registros de Middleware

Los middlewares en Express interceptan la petición antes de entregar la respuesta final para auditar el método y la ruta.

\`\`\`javascript
console.log("GET /api/users - 200 OK");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Auditoría de petición POST',
          code: `console.log("POST /api/login - 201 CREATED");`,
          explanation: 'Imprime el registro de una petición de creación.'
        }
      ],
      exercise: {
        id: 'node-8',
        instruction: 'Construye desde cero un script en Node.js que simule la salida de un middleware logger imprimiendo la cadena exactas `"GET /api/users - 200 OK"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Usa console.log para registrar "GET /api/users - 200 OK"
`,
        solutionCode: `console.log("GET /api/users - 200 OK");`,
        testCases: [
          { id: '1', expectedOutput: 'GET /api/users - 200 OK', description: 'Debe mostrar GET /api/users - 200 OK' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Creación de Recursos (POST)',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Recepción y procesamiento de cuerpos de petición en POST.',
      theoryMarkdown: `
### Peticiones POST

El método HTTP POST se utiliza para enviar datos y crear un nuevo recurso en la base de datos del servidor.

\`\`\`javascript
const item = { id: 1, nombre: "Item 1" };
console.log(\`Creado: \${item.nombre}\`);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Confirmar alta de producto',
          code: `const prod = { id: 99, titulo: "Monitor" };\nconsole.log(\`Producto registrado: \${prod.titulo}\`);`,
          explanation: 'Imprime el nombre del producto creado.'
        }
      ],
      exercise: {
        id: 'node-9',
        instruction: 'Escribe un script en Node.js desde cero que partiendo de `const item = { id: 1, nombre: "Item 1" };` simule la creación de un recurso imprimiendo `"Creado: Item 1"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Declara item e imprime "Creado: \${item.nombre}"
`,
        solutionCode: `const item = { id: 1, nombre: "Item 1" };\nconsole.log(\`Creado: \${item.nombre}\`);`,
        testCases: [
          { id: '1', expectedOutput: 'Creado: Item 1', description: 'Debe imprimir Creado: Item 1' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Variables de Entorno y Fallbacks',
      level: 'Medio',
      durationMinutes: 20,
      summary: 'Uso de process.env.PORT con valores por defecto.',
      theoryMarkdown: `
### Variables de Entorno

Las variables de entorno leen configuraciones sensibles o específicas del entorno de ejecución mediante \`process.env\`.

\`\`\`javascript
const port = process.env.PORT || 8080;
console.log(port);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Selección de ambiente',
          code: `const env = process.env.NODE_ENV || "development";\nconsole.log(\`Ambiente: \${env}\`);`,
          explanation: 'Lee NODE_ENV o asigna "development" por defecto.'
        }
      ],
      exercise: {
        id: 'node-10',
        instruction: 'Construye desde cero un script en Node.js que evalúe `const port = process.env.PORT || 8080;` e imprima el valor resultante (8080 por defecto).',
        starterCode: `// Escribe tu código Node.js desde cero
// Asigna port con operador || e imprímelo en consola
`,
        solutionCode: `const port = process.env.PORT || 8080;\nconsole.log(port);`,
        testCases: [
          { id: '1', expectedOutput: '8080', description: 'Debe imprimir 8080' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. Controladores en Arquitectura MVC',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Organización de respuestas en la capa Controlador.',
      theoryMarkdown: `
### Capa de Controlador (Controller)

En la arquitectura Modelo-Vista-Controlador (MVC), el controlador contiene la lógica encargada de enviar las respuestas HTTP.

\`\`\`javascript
console.log("Respuesta del Controlador MVC");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Salida del controlador de autenticación',
          code: `console.log("Auth Controller: Login Exitoso");`,
          explanation: 'Respuesta estructurada emitida desde un módulo de controlador.'
        }
      ],
      exercise: {
        id: 'node-11',
        instruction: 'Escribe desde cero un script en Node.js que simule la respuesta emitida por un controlador MVC imprimiendo `"Respuesta del Controlador MVC"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Usa console.log para mostrar "Respuesta del Controlador MVC"
`,
        solutionCode: `console.log("Respuesta del Controlador MVC");`,
        testCases: [
          { id: '1', expectedOutput: 'Respuesta del Controlador MVC', description: 'Debe mostrar la respuesta del controlador' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Verificación de Tokens JWT',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Simulación de autenticación basada en JWT.',
      theoryMarkdown: `
### Autenticación Stateless con JWT

Los JSON Web Tokens permiten verificar la identidad de los usuarios en cada petición sin necesidad de guardar sesiones en memoria.

\`\`\`javascript
console.log("Token Valido: User 123");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Validación de firma JWT',
          code: `console.log("JWT Firma Verificada: ROL ADMIN");`,
          explanation: 'Muestra el estado de aprobación de una firma digital de token.'
        }
      ],
      exercise: {
        id: 'node-12',
        instruction: 'Construye desde cero un script en Node.js que simule la validación exitosa de un token emitiendo exactamente `"Token Valido: User 123"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Imprime en consola "Token Valido: User 123"
`,
        solutionCode: `console.log("Token Valido: User 123");`,
        testCases: [
          { id: '1', expectedOutput: 'Token Valido: User 123', description: 'Debe imprimir Token Valido: User 123' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Manipulación de Buffers',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Manejo de datos binarios en memoria con Buffer.from().',
      theoryMarkdown: `
### Buffers en Node.js

Los \`Buffer\` representan secuencias de bytes en memoria no gestionadas por el recolector de basura V8.
La propiedad \`.length\` indica su tamaño en bytes.

\`\`\`javascript
const buf = Buffer.from("NodeJS");
console.log(buf.length); // 6
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Buffer a partir de texto UTF-8',
          code: `const b = Buffer.from("Hola");\nconsole.log(b.toString("hex"));`,
          explanation: 'Convierte la secuencia de bytes a su representación hexadecimal.'
        }
      ],
      exercise: {
        id: 'node-13',
        instruction: 'Escribe un script en Node.js desde cero que cree un buffer con `Buffer.from("NodeJS")` e imprima la longitud total en bytes mediante `.length` (6).',
        starterCode: `// Escribe tu código Node.js desde cero
// Instancia el Buffer con "NodeJS" e imprime buf.length
`,
        solutionCode: `const buf = Buffer.from("NodeJS");\nconsole.log(buf.length);`,
        testCases: [
          { id: '1', expectedOutput: '6', description: 'Debe imprimir 6' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Control Centralizado de Errores',
      level: 'Avanzado',
      durationMinutes: 25,
      summary: 'Gestión de excepciones globales e intercepción de errores.',
      theoryMarkdown: `
### Manejo de Errores en APIs

Un servidor robusto intercepta excepciones no capturadas y devuelve respuestas con códigos de estado HTTP 500.

\`\`\`javascript
console.log("500: Error interno del servidor");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Reporte de fallo en base de datos',
          code: `console.log("503: Servicio No Disponible - Falla de BD");`,
          explanation: 'Formatea la respuesta ante la caída de un servicio crítico.'
        }
      ],
      exercise: {
        id: 'node-14',
        instruction: 'Construye desde cero un script en Node.js que simule el registro de un error interno 500 imprimiendo `"500: Error interno del servidor"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Usa console.log para mostrar "500: Error interno del servidor"
`,
        solutionCode: `console.log("500: Error interno del servidor");`,
        testCases: [
          { id: '1', expectedOutput: '500: Error interno del servidor', description: 'Debe imprimir 500: Error interno del servidor' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Pruebas Unitarias y Assertions',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Simulación de resultados de pruebas de código.',
      theoryMarkdown: `
### Testing en Backend

Las pruebas unitarias aseguran que los componentes individuales del servidor funcionen correctamente bajo diferentes escenarios.

\`\`\`javascript
console.log("✔ Test 1: Operacion Exitosa");
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Reporte de suite de pruebas',
          code: `console.log("SUITE: 5 ejecutados, 0 fallidos");`,
          explanation: 'Muestra el resumen final de ejecución de pruebas.'
        }
      ],
      exercise: {
        id: 'node-15',
        instruction: 'Escribe un script en Node.js desde cero que simule el paso exitoso de un test unitario imprimiendo `"✔ Test 1: Operacion Exitosa"`.',
        starterCode: `// Escribe tu código Node.js desde cero
// Utiliza console.log para imprimir "✔ Test 1: Operacion Exitosa"
`,
        solutionCode: `console.log("✔ Test 1: Operacion Exitosa");`,
        testCases: [
          { id: '1', expectedOutput: '✔ Test 1: Operacion Exitosa', description: 'Debe mostrar ✔ Test 1: Operacion Exitosa' }
        ]
      }
    }
  ]
};
