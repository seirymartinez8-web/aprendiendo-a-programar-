import { Course } from '../types';

export const jsCourse: Course = {
  id: 'javascript',
  title: 'JavaScript',
  iconName: 'FileCode2',
  description: 'Aprende el lenguaje de la web: desde variables, objetos y ES6+ hasta promesas, async/await y manipulación del DOM.',
  color: 'from-yellow-500 to-amber-600',
  badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  totalLessons: 15,
  prerequisites: ['Lógica básica'],
  skillsGained: ['JavaScript Moderno (ES6+)', 'Promesas y Async/Await', 'Destructuring & Spread Operator', 'Programación Funcional (map/filter)', 'Manejo del DOM y Eventos'],
  lessons: [
    {
      id: 1,
      title: '1. Variables en JS: const, let y console.log',
      level: 'Básico',
      durationMinutes: 10,
      summary: 'Diferencias entre const y let, e interpolación de cadenas.',
      theoryMarkdown: `
### Variables en JavaScript Moderno

En JavaScript (ES6+), empleamos \`const\` para definir valores inmutables que no se reasignarán, y \`let\` para variables que cambiarán con el tiempo.

#### Template Literals:
Las comillas invertidas (\`\` \` \` \` \` \` \`) permiten interpolar expresiones usando \`\${variable}\`.

\`\`\`javascript
const pi = 3.1416;
let contador = 0;
contador++;
console.log(\`Contador: \${contador}\`);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Reporte de usuario activo',
          code: `const usuario = "Elena";\nlet conexion = "Online";\nconsole.log(\`Estado de \${usuario}: \${conexion}\`);`,
          explanation: 'Muestra el estado dinámico combinando const, let y template literals.'
        }
      ],
      exercise: {
        id: 'js-1',
        instruction: 'Escribe un script en JavaScript desde cero que declare `const curso = "JavaScript"` e imprime con `console.log` la frase formateada "Aprendiendo JavaScript" utilizando template literals.',
        starterCode: `// Escribe tu código JavaScript desde cero
// Declara la constante curso e imprímela usando console.log y template literals (\` \`)
`,
        solutionCode: `const curso = "JavaScript";\nconsole.log(\`Aprendiendo \${curso}\`);`,
        testCases: [
          { id: '1', expectedOutput: 'Aprendiendo JavaScript', description: 'Debe imprimir Aprendiendo JavaScript' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Operador typeof y Tipado Estricto',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Inspección de tipos de datos en JavaScript con typeof.',
      theoryMarkdown: `
### Tipos de Datos y el operador typeof

JavaScript cuenta con tipos primitivos como \`number\`, \`string\`, \`boolean\`, \`undefined\` y \`object\`. El operador \`typeof\` devuelve una cadena indicando el tipo.

\`\`\`javascript
console.log(typeof "Hola"); // "string"
console.log(typeof 100);    // "number"
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Verificación de un booleano',
          code: `const esActivo = true;\nconsole.log(typeof esActivo); // "boolean"`,
          explanation: 'Evalúa typeof sobre una constante booleana.'
        }
      ],
      exercise: {
        id: 'js-2',
        instruction: 'Construye desde cero un script en JavaScript que determine el tipo de dato de `42.5` usando `typeof` e imprima el resultado en consola (debe imprimir "number").',
        starterCode: `// Escribe tu código JavaScript desde cero
// Utiliza console.log(typeof 42.5);
`,
        solutionCode: `console.log(typeof 42.5);`,
        testCases: [
          { id: '1', expectedOutput: 'number', description: 'typeof 42.5 devuelve number' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Operador Ternario (condicion ? a : b)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Sintaxis concisa para expresiones condicionales.',
      theoryMarkdown: `
### El Operador Ternario

Es una alternativa compacta a la instrucción \`if/else\`.
Sintaxis: \`condicion ? valorSiVerdadero : valorSiFalso\`

\`\`\`javascript
const edad = 20;
const estado = edad >= 18 ? "Adulto" : "Menor";
console.log(estado);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Evaluación de saldo',
          code: `const saldo = 100;\nconst mensaje = saldo > 0 ? "Saldo positivo" : "Sin saldo";\nconsole.log(mensaje);`,
          explanation: 'Asigna el mensaje dinámicamente según el saldo.'
        }
      ],
      exercise: {
        id: 'js-3',
        instruction: 'Escribe un script en JavaScript desde cero que declare `const temperatura = 25;`. Usa un operador ternario para asignar e imprimir "Calor" si la temperatura es mayor a 20, de lo contrario "Fresco".',
        starterCode: `// Escribe tu código JavaScript desde cero
// Declara temperatura = 25 y evalúa con el ternario ? :
`,
        solutionCode: `const temperatura = 25;\nconst clima = temperatura > 20 ? "Calor" : "Fresco";\nconsole.log(clima);`,
        testCases: [
          { id: '1', expectedOutput: 'Calor', description: 'Imprime Calor' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Arrow Functions () => {}',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Sintaxis moderna de funciones flecha en JavaScript.',
      theoryMarkdown: `
### Arrow Functions

Proporcionan una sintaxis más corta para escribir expresiones de funciones. Omite la palabra clave \`function\`.

\`\`\`javascript
const sumar = (a, b) => a + b;
console.log(sumar(10, 5)); // 15
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Calcular el doble',
          code: `const doble = n => n * 2;\nconsole.log(doble(8)); // 16`,
          explanation: 'Con un solo parámetro y retorno directo, los paréntesis y llaves son opcionales.'
        }
      ],
      exercise: {
        id: 'js-4',
        instruction: 'Construye desde cero un script en JavaScript que defina una arrow function `const triple = n => n * 3;`. Imprime la llamada `triple(9)` en consola (debe ser 27).',
        starterCode: `// Escribe tu código JavaScript desde cero
// Define la arrow function triple e imprímela con el argumento 9
`,
        solutionCode: `const triple = n => n * 3;\nconsole.log(triple(9));`,
        testCases: [
          { id: '1', expectedOutput: '27', description: '9 * 3 debe ser 27' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Métodos de Arreglos (push y join)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Manipulación básica de arrays con .push() y .join().',
      theoryMarkdown: `
### Arreglos y Métodos Integrados

- \`.push(elem)\`: Agrega un elemento al final del array.
- \`.join(delimitador)\`: Une todos los elementos en una cadena de texto separados por el delimitador.

\`\`\`javascript
const lista = [1, 2];
lista.push(3);
console.log(lista.join("-")); // "1-2-3"
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Formatear nombres de ciudades',
          code: `const ciudades = ["Madrid", "Barcelona"];\nciudades.push("Valencia");\nconsole.log(ciudades.join(", "));`,
          explanation: 'Agrega Valencia al arreglo y une los nombres con comas.'
        }
      ],
      exercise: {
        id: 'js-5',
        instruction: 'Escribe un script en JavaScript desde cero que inicie con `const nums = [10, 20];`, le agregue el número `30` con `.push()` e imprima el arreglo unido con `.join("-")` ("10-20-30").',
        starterCode: `// Escribe tu código JavaScript desde cero
// Crea el arreglo, usa .push(30) e imprime nums.join("-")
`,
        solutionCode: `const nums = [10, 20];\nnums.push(30);\nconsole.log(nums.join("-"));`,
        testCases: [
          { id: '1', expectedOutput: '10-20-30', description: 'Debe imprimir 10-20-30' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. Desestructuración de Objetos',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Extracción directa de propiedades con destructuring.',
      theoryMarkdown: `
### Desestructuración (Destructuring)

Permite extraer propiedades de un objeto y asignarlas directamente a variables individuales.

\`\`\`javascript
const usuario = { nombre: "Lucas", rol: "Admin" };
const { nombre, rol } = usuario;
console.log(\`\${nombre} es \${rol}\`);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Extraer datos de configuración',
          code: `const config = { puerto: 8080, host: "localhost" };\nconst { puerto } = config;\nconsole.log(\`Puerto: \${puerto}\`);`,
          explanation: 'Extrae directamente la propiedad puerto del objeto config.'
        }
      ],
      exercise: {
        id: 'js-6',
        instruction: 'Construye desde cero un script en JavaScript que declare `const laptop = { marca: "Dell", ram: 16 };`, desestructure la propiedad `ram` e imprima la cadena `"16GB RAM"`.',
        starterCode: `// Escribe tu código JavaScript desde cero
// Declara el objeto, desestructura const { ram } = laptop; e imprime
`,
        solutionCode: `const laptop = { marca: "Dell", ram: 16 };\nconst { ram } = laptop;\nconsole.log(\`\${ram}GB RAM\`);`,
        testCases: [
          { id: '1', expectedOutput: '16GB RAM', description: 'Debe imprimir 16GB RAM' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Transformaciones con map y reduce',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Programación funcional en arrays con .map() y .reduce().',
      theoryMarkdown: `
### Métodos Funcionales: map y reduce

- \`.map(fn)\`: Crea un nuevo array aplicando la función a cada elemento.
- \`.reduce(fn, inicio)\`: Acumula los valores en un único resultado.

\`\`\`javascript
const valores = [1, 2, 3];
const dobles = valores.map(x => x * 2);
const suma = dobles.reduce((acc, x) => acc + x, 0);
console.log(suma); // 12
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Aplicar impuesto y sumar',
          code: `const montos = [10, 20];\nconst total = montos.map(m => m * 1.21).reduce((acc, m) => acc + m, 0);\nconsole.log(total);`,
          explanation: 'Encadena map para calcular el IVA y reduce para acumular.'
        }
      ],
      exercise: {
        id: 'js-7',
        instruction: 'Escribe desde cero un script en JavaScript que teniendo `const precios = [100, 200, 300];` aplique con `.map()` un 10% de descuento (`p * 0.9`) y calcule la suma total de los precios descontados con `.reduce()` (debe dar 540).',
        starterCode: `// Escribe tu código JavaScript desde cero
// Aplica map y reduce sobre precios e imprime el total
`,
        solutionCode: `const precios = [100, 200, 300];\nconst total = precios.map(p => p * 0.9).reduce((acc, p) => acc + p, 0);\nconsole.log(total);`,
        testCases: [
          { id: '1', expectedOutput: '540', description: '90 + 180 + 270 da 540' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Operador Spread (...)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Expansión y combinación de arreglos mediante el operador spread.',
      theoryMarkdown: `
### El Operador Spread (...)

El operador spread permite expandir los elementos de un iterable dentro de otro contenedor.

\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2.length); // 4
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Fusionar listas de usuarios',
          code: `const grupoA = ["Ana"];\nconst grupoB = ["Pedro"];\nconst todos = [...grupoA, ...grupoB];\nconsole.log(todos.join(" y "));`,
          explanation: 'Combina elementos de ambos arreglos en uno solo.'
        }
      ],
      exercise: {
        id: 'js-8',
        instruction: 'Construye un script en JavaScript desde cero que partiendo de `const a = [1, 2];` y `const b = [3, 4];` cree `const fusion = [...a, ...b];` e imprima la propiedad `fusion.length` (4).',
        starterCode: `// Escribe tu código JavaScript desde cero
// Declara a y b, fusiónalos con ... e imprime fusion.length
`,
        solutionCode: `const a = [1, 2];\nconst b = [3, 4];\nconst fusion = [...a, ...b];\nconsole.log(fusion.length);`,
        testCases: [
          { id: '1', expectedOutput: '4', description: 'La longitud final debe ser 4' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Clases en ES6 y Métodos',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Orientación a Objetos basada en clases con constructor.',
      theoryMarkdown: `
### Clases en JavaScript

Proporcionan una sintaxis estructurada para crear objetos con constructores y métodos.

\`\`\`javascript
class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
    }
    presentar() {
        return \`Soy \${this.nombre}\`;
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Clase Coche',
          code: `class Coche {\n    constructor(marca) {\n        this.marca = marca;\n    }\n}\nconst c = new Coche("Audi");\nconsole.log(c.marca);`,
          explanation: 'Instancia la clase Coche e imprime la propiedad marca.'
        }
      ],
      exercise: {
        id: 'js-9',
        instruction: 'Crea desde cero un script en JavaScript con la clase `Producto` conteniendo `constructor(nombre, precio)` y el método `obtenerDetalle()` que devuelva `"\${this.nombre}: $\${this.precio}"`. Instancia `Producto("Teclado", 45)` e imprime su detalle.',
        starterCode: `// Escribe tu código JavaScript desde cero
// Define la clase Producto y prueba obtenerDetalle() en consola
`,
        solutionCode: `class Producto {\n    constructor(nombre, precio) {\n        this.nombre = nombre;\n        this.precio = precio;\n    }\n    obtenerDetalle() {\n        return \`\${this.nombre}: $\${this.precio}\`;\n    }\n}\nconst p = new Producto("Teclado", 45);\nconsole.log(p.obtenerDetalle());`,
        testCases: [
          { id: '1', expectedOutput: 'Teclado: $45', description: 'Debe imprimir Teclado: $45' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Estructura de Módulos (Simulación de export)',
      level: 'Medio',
      durationMinutes: 20,
      summary: 'Organización modular de objetos en aplicaciones JS.',
      theoryMarkdown: `
### Módulos y Encapsulación

Los módulos dividen el código en partes aisladas. En objetos literales representamos interfaces exportables de forma estructurada.

\`\`\`javascript
const modulo = { version: "2.0" };
console.log(modulo.version);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Objeto de configuración de API',
          code: `const apiConfig = { endpoint: "/api/v1", timeout: 5000 };\nconsole.log(apiConfig.endpoint);`,
          explanation: 'Representa la exportación de un objeto de configuración.'
        }
      ],
      exercise: {
        id: 'js-10',
        instruction: 'Escribe desde cero un script en JavaScript que declare `const modulo = { version: "2.0" };` e imprima la propiedad `modulo.version` en consola ("2.0").',
        starterCode: `// Escribe tu código JavaScript desde cero
// Declara el objeto modulo e imprime modulo.version
`,
        solutionCode: `const modulo = { version: "2.0" };\nconsole.log(modulo.version);`,
        testCases: [
          { id: '1', expectedOutput: '2.0', description: 'Debe imprimir 2.0' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. Promesas y Promise.resolve()',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Manejo de asincronía con Objetos Promise y .then().',
      theoryMarkdown: `
### Promesas en JavaScript

Una Promesa gestiona operaciones asíncronas. \`Promise.resolve(valor)\` retorna una promesa resuelta inmediatamente, cuyo resultado se captura con \`.then()\`.

\`\`\`javascript
Promise.resolve("Datos").then(res => console.log(res));
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Encadenamiento de .then()',
          code: `Promise.resolve(5)\n  .then(val => val * 2)\n  .then(res => console.log(res)); // 10`,
          explanation: 'Transforma el valor a través de callbacks encadenados.'
        }
      ],
      exercise: {
        id: 'js-11',
        instruction: 'Construye desde cero un script en JavaScript que cree una promesa resuelta con `Promise.resolve("Éxito total")` y use `.then()` para imprimir el mensaje resuelto.',
        starterCode: `// Escribe tu código JavaScript desde cero
// Usa Promise.resolve("Éxito total").then(...)
`,
        solutionCode: `Promise.resolve("Éxito total").then(res => console.log(res));`,
        testCases: [
          { id: '1', expectedOutput: 'Éxito total', description: 'Debe imprimir Éxito total' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Funciones Asíncronas (async / await)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Simplificación de asincronía mediante async y await.',
      theoryMarkdown: `
### async y await

La palabra clave \`async\` hace que una función devuelva una promesa, mientras que \`await\` pausa la ejecución hasta que la promesa se resuelva.

\`\`\`javascript
const obtenerValor = async () => 100;

async function main() {
    const res = await obtenerValor();
    console.log(res);
}
main();
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Simulación de carga de datos',
          code: `const cargar = async () => "Cargado";\nconst app = async () => console.log(await cargar());\napp();`,
          explanation: 'Espera el resultado de cargar() usando await en una función async.'
        }
      ],
      exercise: {
        id: 'js-12',
        instruction: 'Escribe un script en JavaScript desde cero que declare `const calcular = async () => 100;`. En una función `async function run()`, invócala con `await` e imprime el resultado (100).',
        starterCode: `// Escribe tu código JavaScript desde cero
// Define la arrow function async calcular y la función async run()
`,
        solutionCode: `const calcular = async () => 100;\nasync function run() {\n    const res = await calcular();\n    console.log(res);\n}\nrun();`,
        testCases: [
          { id: '1', expectedOutput: '100', description: 'Debe imprimir 100' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Closures y Funciones Retornadas',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Retención de ámbito léxico con Closures.',
      theoryMarkdown: `
### Closures en JavaScript

Un closure es una función que recuerda las variables del ámbito donde fue creada, incluso si ese ámbito ya ha finalizado.

\`\`\`javascript
function crearSumador(base) {
    return function(numero) {
        return base + numero;
    };
}
const sumarDiez = crearSumador(10);
console.log(sumarDiez(5)); // 15
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Contador privado',
          code: `function contador() {\n    let count = 0;\n    return () => ++count;\n}\nconst c = contador();\nconsole.log(c()); // 1`,
          explanation: 'Retiene la variable privada count mediante el closure.'
        }
      ],
      exercise: {
        id: 'js-13',
        instruction: 'Construye desde cero un script en JavaScript que cree la función `crearMultiplicador(factor)` que devuelva una función interna que multiplique su argumento por `factor`. Crea `const mult5 = crearMultiplicador(5);` e imprime `mult5(4)` (20).',
        starterCode: `// Escribe tu código JavaScript desde cero
// Define crearMultiplicador(factor) e imprime mult5(4)
`,
        solutionCode: `function crearMultiplicador(factor) {\n    return function(n) {\n        return n * factor;\n    };\n}\nconst mult5 = crearMultiplicador(5);\nconsole.log(mult5(4));`,
        testCases: [
          { id: '1', expectedOutput: '20', description: '5 * 4 es 20' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Event Loop y Microtareas',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Orden de ejecución entre código síncrono y microtareas de promesas.',
      theoryMarkdown: `
### El Event Loop y la Pila de Ejecución

El código síncrono en la pila principal se ejecuta en su totalidad antes de procesar las microtareas de las Promesas.

\`\`\`javascript
console.log("Inicio");
Promise.resolve().then(() => console.log("Promesa"));
console.log("Fin");
// Resultado: "Inicio", "Fin", "Promesa"
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Orden de ejecución con logs',
          code: `console.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");`,
          explanation: 'Salida: A, C y por último la microtarea B.'
        }
      ],
      exercise: {
        id: 'js-14',
        instruction: 'Escribe desde cero un script en JavaScript que imprima "Inicio", programe un `Promise.resolve().then()` para imprimir "Promesa", e imprima "Fin". Verfica el orden correcto de salida.',
        starterCode: `// Escribe tu código JavaScript desde cero
// Imprime Inicio, luego Promise.resolve().then(), luego Fin
`,
        solutionCode: `console.log("Inicio");\nPromise.resolve().then(() => console.log("Promesa"));\nconsole.log("Fin");`,
        testCases: [
          { id: '1', expectedOutput: "Inicio\nFin\nPromesa", description: 'Promesa se ejecuta después del código síncrono' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Propiedades del DOM (textContent)',
      level: 'Avanzado',
      durationMinutes: 25,
      summary: 'Acceso a propiedades de elementos dinámicos.',
      theoryMarkdown: `
### Propiedades de Objetos DOM

Los elementos del DOM contienen propiedades como \`textContent\` para manipular texto interno de forma directa.

\`\`\`javascript
const elemento = { textContent: "Hola DOM" };
console.log(elemento.textContent);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Modificación de contenido de texto',
          code: `const nodo = { textContent: "Inicial" };\nnodo.textContent = "Actualizado";\nconsole.log(nodo.textContent);`,
          explanation: 'Reasigna la propiedad textContent del objeto simulado.'
        }
      ],
      exercise: {
        id: 'js-15',
        instruction: 'Escribe un script en JavaScript desde cero que cree el objeto `const elem = { textContent: "Hola DOM" };` e imprima la propiedad `elem.textContent` en consola ("Hola DOM").',
        starterCode: `// Escribe tu código JavaScript desde cero
// Declara elem e imprime elem.textContent
`,
        solutionCode: `const elem = { textContent: "Hola DOM" };\nconsole.log(elem.textContent);`,
        testCases: [
          { id: '1', expectedOutput: 'Hola DOM', description: 'Debe mostrar Hola DOM' }
        ]
      }
    }
  ]
};
