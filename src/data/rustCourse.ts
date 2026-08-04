import { Course } from '../types';

export const rustCourse: Course = {
  id: 'rust',
  title: 'Rust',
  iconName: 'Cpu',
  description: 'Aprende Rust: el lenguaje enfocado en rendimiento, seguridad de memoria sin recolector de basura, Ownership y Concurrencia.',
  color: 'from-orange-700 to-amber-800',
  badgeBg: 'bg-orange-600/10 text-orange-400 border-orange-600/20',
  totalLessons: 15,
  prerequisites: ['Lógica de programación e interés en sistemas'],
  skillsGained: ['Sistema de Ownership & Borrowing', 'Lifetimes y Referencias Seguras', 'Pattern Matching con match', 'Manejo de Errores con Result y Option', 'Traits y Genéricos'],
  lessons: [
    {
      id: 1,
      title: '1. Hola Mundo e Impresión con println!',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Fundamentos de fn main() y macros de impresión en Rust.',
      theoryMarkdown: `
### Introducción a Rust y fn main()

Rust garantiza la seguridad de memoria sin necesidad de un recolector de basura (Garbage Collector). La ejecución de todo programa inicia en la función principal \`fn main()\`.

#### Macros de impresión:
Las instrucciones terminadas en un signo de exclamación \`!\` (como \`println!\`) representan **macros** en lugar de funciones convencionales.

\`\`\`rust
fn main() {
    println!("¡Hola, Rust!");
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Formateo con marcadores de posición',
          code: `fn main() {\n    let version = 1.75;\n    println!("Rust versión: {}", version);\n}`,
          explanation: '{} actúa como marcador de posición para interpolar valores.'
        }
      ],
      exercise: {
        id: 'rust-1',
        instruction: 'Construye desde cero un programa en Rust. Debe incluir la función `fn main()` e imprimir exactamente "Hola Mundo desde Rust" mediante la macro `println!`.',
        starterCode: `// Escribe tu programa en Rust desde cero
// 1. Define la función fn main()
// 2. Utiliza println!("Hola Mundo desde Rust");
`,
        solutionCode: `fn main() {\n    println!("Hola Mundo desde Rust");\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Hola Mundo desde Rust', description: 'Debe estructurar fn main() e imprimir Hola Mundo desde Rust' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Inmutabilidad por Defecto y mut',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Inmutabilidad con let y mutabilidad explícita mediante la palabra clave mut.',
      theoryMarkdown: `
### Variables e Inmutabilidad en Rust

En Rust, todas las variables declaradas con \`let\` son inmutables por defecto. Si necesitas modificar el valor de una variable posteriormente, debes anteponer la palabra clave \`mut\`.

\`\`\`rust
fn main() {
    let mut contador = 5;
    contador = 6; // Correcto porque es mutable
    println!("{}", contador);
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Incremento de puntos',
          code: `fn main() {\n    let mut puntos = 100;\n    puntos += 50;\n    println!("Total: {}", puntos);\n}`,
          explanation: 'Declara puntos con mut para permitir asignaciones subsecuentes.'
        }
      ],
      exercise: {
        id: 'rust-2',
        instruction: 'Escribe un programa en Rust desde cero que declare `let mut x = 10;`, le sume `15` (`x += 15;`) e imprima el valor resultante con `println!("{}", x);` (debe dar 25).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define fn main(), declara let mut x = 10;, incrementa x e imprímelo
`,
        solutionCode: `fn main() {\n    let mut x = 10;\n    x += 15;\n    println!("{}", x);\n}`,
        testCases: [
          { id: '1', expectedOutput: '25', description: '10 + 15 da 25' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Tipos Compuestos: Tuplas',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Agrupación de múltiples valores con tuplas en Rust.',
      theoryMarkdown: `
### Tuplas en Rust

Una tupla es una colección de valores con tamaños fijos que pueden ser de distintos tipos. Se acceden mediante índices numéricos antecedidos por punto (\`.0\`, \`.1\`).

\`\`\`rust
fn main() {
    let coordenadas: (i32, i32) = (10, 20);
    println!("X: {}", coordenadas.0);
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Desestructuración de tupla',
          code: `fn main() {\n    let persona = ("Ana", 28);\n    let (nombre, edad) = persona;\n    println!("{} tiene {} años", nombre, edad);\n}`,
          explanation: 'Extrae los elementos de la tupla asignándolos a variables individuales.'
        }
      ],
      exercise: {
        id: 'rust-3',
        instruction: 'Construye desde cero un programa en Rust que cree la tupla `let datos = (10, 20);` e imprima la suma de `datos.0 + datos.1` (30).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Crea fn main(), asigna la tupla e imprime la suma de sus componentes
`,
        solutionCode: `fn main() {\n    let datos = (10, 20);\n    println!("{}", datos.0 + datos.1);\n}`,
        testCases: [
          { id: '1', expectedOutput: '30', description: '10 + 20 debe resultar en 30' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Funciones e Expresiones de Retorno',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Retorno de valores sin punto y coma en la última expresión.',
      theoryMarkdown: `
### Funciones en Rust

En Rust, las funciones declaran tipos de retorno con \`-> TIPO\`. La última expresión dentro del bloque de una función actúa como valor de retorno si no lleva punto y coma al final.

\`\`\`rust
fn sumar(a: i32, b: i32) -> i32 {
    a + b // Sin punto y coma final
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Función que calcula el cuadrado',
          code: `fn cuadrado(n: i32) -> i32 {\n    n * n\n}\n\nfn main() {\n    println!("{}", cuadrado(5));\n}`,
          explanation: 'cuadrado retorna n * n implícitamente al omitir el punto y coma final.'
        }
      ],
      exercise: {
        id: 'rust-4',
        instruction: 'Construye un programa en Rust desde cero que defina la función `fn doble(n: i32) -> i32 { n * 2 }`. En `fn main()`, imprime `doble(12)` (24).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define fn doble y en fn main() imprime la llamada a doble(12)
`,
        solutionCode: `fn doble(n: i32) -> i32 {\n    n * 2\n}\nfn main() {\n    println!("{}", doble(12));\n}`,
        testCases: [
          { id: '1', expectedOutput: '24', description: 'El doble de 12 es 24' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Bucles Iterativos (for en Rangos)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Iteración sobre rangos numéricos con el bucle for en Rust.',
      theoryMarkdown: `
### El Bucle for y Rangos en Rust

El operador de rango inclusive \`1..=4\` genera una secuencia de números del 1 al 4 (incluyendo ambos extremos).

\`\`\`rust
fn main() {
    for i in 1..=3 {
        println!("{}", i);
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Imprimir secuencia decreciente',
          code: `fn main() {\n    for i in (1..4).rev() {\n        println!("Paso: {}", i);\n    }\n}`,
          explanation: '.rev() invierte la secuencia del rango 1..4.'
        }
      ],
      exercise: {
        id: 'rust-5',
        instruction: 'Escribe desde cero un programa en Rust que use un bucle `for` sobre el rango `1..=4` para calcular e imprimir la suma total de sus números (1 + 2 + 3 + 4 = 10).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Declara let mut suma = 0;, itera con for i in 1..=4 e imprime suma
`,
        solutionCode: `fn main() {\n    let mut suma = 0;\n    for i in 1..=4 {\n        suma += i;\n    }\n    println!("{}", suma);\n}`,
        testCases: [
          { id: '1', expectedOutput: '10', description: '1+2+3+4 debe ser 10' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. Sistema de Ownership (Propiedad)',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Gestión de memoria mediante Ownership y transferencia de propiedad.',
      theoryMarkdown: `
### Ownership en Rust

1. Todo valor en Rust posee un único propietario (owner) a la vez.
2. Al asignar una variable tipo \`String\` a otra, la propiedad se **mueve** (move), invalidando la primera.
3. Para mantener ambas variables válidas, se utiliza \`.clone()\`.

\`\`\`rust
fn main() {
    let s1 = String::from("hola");
    let s2 = s1.clone(); // Copia en el heap
    println!("{} y {}", s1, s2);
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Transferencia de propiedad',
          code: `fn tomar_propiedad(s: String) {\n    println!("{}", s);\n}\nfn main() {\n    let texto = String::from("Rust");\n    tomar_propiedad(texto);\n}`,
          explanation: 'texto pierde la propiedad al pasar como argumento a tomar_propiedad.'
        }
      ],
      exercise: {
        id: 'rust-6',
        instruction: 'Construye desde cero un programa en Rust que cree `let s1 = String::from("Rust");` y `let s2 = s1.clone();`. Imprime ambas con `println!("{} y {}", s1, s2);` ("Rust y Rust").',
        starterCode: `// Escribe tu programa en Rust desde cero
// Asigna s1, clónalo en s2 e imprímelos en fn main()
`,
        solutionCode: `fn main() {\n    let s1 = String::from("Rust");\n    let s2 = s1.clone();\n    println!("{} y {}", s1, s2);\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Rust y Rust', description: 'Debe imprimir Rust y Rust' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Referencias Mutables (&mut)',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Préstamo de datos con referencias mutables en Rust.',
      theoryMarkdown: `
### Borrowing con &mut

Permite modificar un valor sin transferir su propiedad pasando una referencia mutable \`&mut\`.

\`\`\`rust
fn agregar_signo(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut texto = String::from("Hola");
    agregar_signo(&mut texto);
    println!("{}", texto); // Hola!
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Modificar valor numérico por referencia',
          code: `fn incrementar(val: &mut i32) {\n    *val += 1;\n}\nfn main() {\n    let mut n = 5;\n    incrementar(&mut n);\n    println!("{}", n);\n}`,
          explanation: 'Modifica el entero n de forma directa desreferenciando con *val.'
        }
      ],
      exercise: {
        id: 'rust-7',
        instruction: 'Crea desde cero un programa en Rust con la función `fn agregar(s: &mut String)` que ejecute `s.push_str(" Rust");`. En `fn main()`, crea `let mut s = String::from("Hola");`, pásale `&mut s` a `agregar` e imprime `s` ("Hola Rust").',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define agregar(s: &mut String) y pruébala en fn main()
`,
        solutionCode: `fn agregar(s: &mut String) {\n    s.push_str(" Rust");\n}\nfn main() {\n    let mut s = String::from("Hola");\n    agregar(&mut s);\n    println!("{}", s);\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Hola Rust', description: 'Debe imprimir Hola Rust' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Slices de Cadenas (&str)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Referencias continuas a fragmentos de cadenas con rebanadas.',
      theoryMarkdown: `
### Slices en Rust

Un slice es una referencia a una secuencia contigua de elementos dentro de una colección (como un \`String\`).
Sintaxis: \`&cadena[inicio..fin]\`

\`\`\`rust
fn main() {
    let s = String::from("hola mundo");
    let slice: &str = &s[0..4]; // "hola"
    println!("{}", slice);
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Rebanada final de una palabra',
          code: `fn main() {\n    let palabra = String::from("Lenguaje");\n    let fin = &palabra[4..8]; // "uaje"\n    println!("{}", fin);\n}`,
          explanation: 'Extrae la subcadena comprendida entre los índices 4 y 7.'
        }
      ],
      exercise: {
        id: 'rust-8',
        instruction: 'Construye desde cero un programa en Rust que partiendo de `let texto = String::from("Programar");` extraiga la rebanada `&texto[0..4]` e imprima su valor ("Prog").',
        starterCode: `// Escribe tu programa en Rust desde cero
// Declara texto y en fn main() imprime &texto[0..4]
`,
        solutionCode: `fn main() {\n    let texto = String::from("Programar");\n    println!("{}", &texto[0..4]);\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Prog', description: 'Debe imprimir Prog' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Structs e Implementaciones (impl)',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Definición de estructuras y métodos asociados en Rust.',
      theoryMarkdown: `
### Structs e impl

Las estructuras (\`struct\`) agrupan datos relacionados. Los bloques \`impl\` permiten adjuntar métodos asociados a dicha estructura.

\`\`\`rust
struct Rectangulo {
    ancho: u32,
    alto: u32,
}

impl Rectangulo {
    fn area(&self) -> u32 {
        self.ancho * self.alto
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Struct Punto con método de distancia',
          code: `struct Punto {\n    x: i32,\n    y: i32,\n}\nimpl Punto {\n    fn es_origen(&self) -> bool {\n        self.x == 0 && self.y == 0\n    }\n}\nfn main() {\n    let p = Punto { x: 0, y: 0 };\n    println!("{}", p.es_origen());\n}`,
          explanation: 'Evalúa el método es_origen sobre la instancia p.'
        }
      ],
      exercise: {
        id: 'rust-9',
        instruction: 'Escribe desde cero un programa en Rust que defina `struct Rectangulo { ancho: u32, alto: u32 }` con su bloque `impl` conteniendo `fn area(&self) -> u32 { self.ancho * self.alto }`. Instancia `Rectangulo { ancho: 5, alto: 6 }` e imprime su área (30).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define struct Rectangulo, su bloque impl e imprime r.area() en fn main()
`,
        solutionCode: `struct Rectangulo {\n    ancho: u32,\n    alto: u32,\n}\nimpl Rectangulo {\n    fn area(&self) -> u32 {\n        self.ancho * self.alto\n    }\n}\nfn main() {\n    let r = Rectangulo { ancho: 5, alto: 6 };\n    println!("{}", r.area());\n}`,
        testCases: [
          { id: '1', expectedOutput: '30', description: '5x6 debe ser 30' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Enums y Match Exhaustivo',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Enumeraciones y filtrado exhaustivo mediante match.',
      theoryMarkdown: `
### Enumeraciones y match

Los \`enum\` definen tipos con variantes discretas. La estructura \`match\` debe cubrir exhaustivamente todas las opciones posibles del enum.

\`\`\`rust
enum Senal {
    Rojo,
    Verde,
}

fn main() {
    let s = Senal::Verde;
    match s {
        Senal::Rojo => println!("Alto"),
        Senal::Verde => println!("Avanzar"),
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Estado de conexión',
          code: `enum Estado {\n    Conectado,\n    Desconectado,\n}\nfn main() {\n    let e = Estado::Conectado;\n    let msg = match e {\n        Estado::Conectado => "Online",\n        Estado::Desconectado => "Offline",\n    };\n    println!("{}", msg);\n}`,
          explanation: 'Asigna el resultado devuelto por la expresión match.'
        }
      ],
      exercise: {
        id: 'rust-10',
        instruction: 'Crea desde cero un programa en Rust con el enum `enum Moneda { UnCentavo, CincoCentavos }`. Con un `match`, evalúa `Moneda::UnCentavo` para que devuelva `1` e imprímelo en pantalla.',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define enum Moneda, la expresión match e imprime el resultado 1
`,
        solutionCode: `enum Moneda {\n    UnCentavo,\n    CincoCentavos,\n}\nfn main() {\n    let m = Moneda::UnCentavo;\n    let val = match m {\n        Moneda::UnCentavo => 1,\n        Moneda::CincoCentavos => 5,\n    };\n    println!("{}", val);\n}`,
        testCases: [
          { id: '1', expectedOutput: '1', description: 'Debe imprimir 1' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. Manejo de Ausencia con Option<T>',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Prevención de punteros nulos mediante el enum Option<T>.',
      theoryMarkdown: `
### El enum Option<T>

Rust no posee valores nulos (\`null\`). En su lugar, utiliza el enum estándar \`Option<T>\` compuesto por las variantes \`Some(T)\` y \`None\`.

\`\`\`rust
fn main() {
    let opt: Option<i32> = Some(42);
    let valor = opt.unwrap_or(0);
    println!("{}", valor); // 42
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Retorno de búsqueda en lista',
          code: `fn buscar_id(id: i32) -> Option<&'static str> {\n    if id == 1 { Some("Admin") } else { None }\n}\nfn main() {\n    println!("{}", buscar_id(1).unwrap_or("Inválido"));\n}`,
          explanation: 'unwrap_or entrega "Admin" si la búsqueda es exitosa o un valor por defecto.'
        }
      ],
      exercise: {
        id: 'rust-11',
        instruction: 'Escribe un programa en Rust desde cero que declare `let opt: Option<i32> = Some(42);`. Usa `opt.unwrap_or(0)` e imprime el valor devuelto (42).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Declara opt como Some(42) e imprime unwrap_or(0) en fn main()
`,
        solutionCode: `fn main() {\n    let opt: Option<i32> = Some(42);\n    println!("{}", opt.unwrap_or(0));\n}`,
        testCases: [
          { id: '1', expectedOutput: '42', description: 'unwrap_or debe entregar 42' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Manejo de Errores con Result<T, E>',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Manejo explícito de fallos con el enum Result<Ok, Err>.',
      theoryMarkdown: `
### El enum Result<T, E>

Se utiliza para operaciones que pueden fallar, retornando \`Ok(valor)\` en caso de éxito o \`Err(error)\` en caso de fallo.

\`\`\`rust
fn obtener() -> Result<i32, &'static str> {
    Ok(100)
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Validación de división',
          code: `fn dividir(a: i32, b: i32) -> Result<i32, &'static str> {\n    if b == 0 { Err("División por cero") } else { Ok(a / b) }\n}\nfn main() {\n    match dividir(10, 2) {\n        Ok(res) => println!("{}", res),\n        Err(err) => println!("{}", err),\n    }\n}`,
          explanation: 'Retorna Ok(5) cuando el divisor es distinto de cero.'
        }
      ],
      exercise: {
        id: 'rust-12',
        instruction: 'Construye desde cero un programa en Rust que cree la función `fn obtener() -> Result<i32, &\'static str> { Ok(100) }`. En `fn main()`, procesa el resultado con `match` e imprime "100".',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define la función obtener y procesa su Result con match en fn main()
`,
        solutionCode: `fn obtener() -> Result<i32, &'static str> {\n    Ok(100)\n}\nfn main() {\n    match obtener() {\n        Ok(v) => println!("{}", v),\n        Err(e) => println!("{}", e),\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '100', description: 'Debe imprimir 100' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Traits y Comportamiento Compartido',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Definición e implementación de Traits en Rust.',
      theoryMarkdown: `
### Traits en Rust

Un \`trait\` define un contrato de métodos que un tipo determinado debe implementar (similar a las interfaces).

\`\`\`rust
trait Resumen {
    fn resumir(&self) -> String;
}

struct Articulo;
impl Resumen for Articulo {
    fn resumir(&self) -> String {
        String::from("Noticia")
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Trait Describible',
          code: `trait Describible {\n    fn describir(&self) -> String;\n}\nstruct Libro;\nimpl Describible for Libro {\n    fn describir(&self) -> String {\n        String::from("Un libro interesante")\n    }\n}\nfn main() {\n    let l = Libro;\n    println!("{}", l.describir());\n}`,
          explanation: 'Libro implementa la función describir requerida por Describible.'
        }
      ],
      exercise: {
        id: 'rust-13',
        instruction: 'Escribe un programa en Rust desde cero que defina `trait Resumen { fn resumir(&self) -> String; }`, el `struct Articulo;` y su implementación de `Resumen` devolviendo `"Noticia"`. En `fn main()`, imprime `a.resumir()`.',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define trait Resumen, struct Articulo e impl Resumen for Articulo
`,
        solutionCode: `trait Resumen {\n    fn resumir(&self) -> String;\n}\nstruct Articulo;\nimpl Resumen for Articulo {\n    fn resumir(&self) -> String {\n        String::from("Noticia")\n    }\n}\nfn main() {\n    let a = Articulo;\n    println!("{}", a.resumir());\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Noticia', description: 'Debe imprimir Noticia' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Iteradores y Closures (filter y sum)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Procesamiento funcional con iteradores y closures en Rust.',
      theoryMarkdown: `
### Iteradores y Closures

Los cierres (closures) son funciones anónimas \`|x| expresión\`. Se combinan con iteradores como \`.filter()\` y \`.sum()\`.

\`\`\`rust
fn main() {
    let nums = vec![1, 2, 3, 4];
    let suma: i32 = nums.into_iter().filter(|x| x % 2 == 0).sum();
    println!("{}", suma); // 6
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Transformar elementos con map',
          code: `fn main() {\n    let nums = vec![1, 2, 3];\n    let dobles: Vec<i32> = nums.into_iter().map(|x| x * 2).collect();\n    println!("{:?}", dobles);\n}`,
          explanation: 'Mapea multiplicando cada elemento por 2.'
        }
      ],
      exercise: {
        id: 'rust-14',
        instruction: 'Construye desde cero un programa en Rust que teniendo `let nums = vec![1, 2, 3, 4];`, filtre los pares con `.into_iter().filter(|x| x % 2 == 0).sum::<i32>()` e imprima su suma (6).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Define nums, aplica filter y sum e imprime el resultado
`,
        solutionCode: `fn main() {\n    let nums = vec![1, 2, 3, 4];\n    let suma: i32 = nums.into_iter().filter(|x| x % 2 == 0).sum();\n    println!("{}", suma);\n}`,
        testCases: [
          { id: '1', expectedOutput: '6', description: '2 + 4 es igual a 6' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Memoria Heap con Box<T>',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Asignación explícita en memoria Heap utilizando Box<T>.',
      theoryMarkdown: `
### Puntero Inteligente Box<T>

\`Box<T>\` asigna datos directamente en la memoria Heap en lugar del Stack. Se desreferencia utilizando el operador \`*\`.

\`\`\`rust
fn main() {
    let b = Box::new(100);
    println!("{}", *b + 50); // 150
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Almacenar tupla en el Heap',
          code: `fn main() {\n    let b_tup = Box::new((10, "Rust"));\n    println!("{} {}", b_tup.0, b_tup.1);\n}`,
          explanation: 'Crea un Box en el heap conteniendo una tupla.'
        }
      ],
      exercise: {
        id: 'rust-15',
        instruction: 'Escribe un programa en Rust desde cero que cree `let b = Box::new(100);` e imprima `*b + 50` (150).',
        starterCode: `// Escribe tu programa en Rust desde cero
// Crea el Box de 100 e imprime *b + 50 en fn main()
`,
        solutionCode: `fn main() {\n    let b = Box::new(100);\n    println!("{}", *b + 50);\n}`,
        testCases: [
          { id: '1', expectedOutput: '150', description: '100 + 50 da 150' }
        ]
      }
    }
  ]
};
