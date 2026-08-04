import { Course } from '../types';

export const pythonCourse: Course = {
  id: 'python',
  title: 'Python',
  iconName: 'Terminal',
  description: 'Domina Python desde sintaxis inicial, estructuras de datos, funciones y POO hasta manejo de datos y decoradores.',
  color: 'from-amber-500 to-yellow-600',
  badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  totalLessons: 15,
  prerequisites: ['Ninguno - Ideal para principiantes'],
  skillsGained: ['Sintaxis de Python 3', 'Listas, Diccionarios y Tuplas', 'List Comprehensions', 'Programación Orientada a Objetos', 'Generadores y Decoradores'],
  lessons: [
    {
      id: 1,
      title: '1. Hola Mundo e Impresión de Textos',
      level: 'Básico',
      durationMinutes: 10,
      summary: 'Aprende la función print() y la sintaxis limpia y legible de Python.',
      theoryMarkdown: `
### Introducción a la Sintaxis de Python

Python destaca por su sintaxis minimalista y alta legibilidad. A diferencia de otros lenguajes, no exige punto y coma al final de las líneas ni llaves para definir bloques de código.

#### La función \`print()\`:
Es la función integrada nativa para enviar salidas a la consola del sistema. Puede recibir cadenas de texto entre comillas dobles \`" "\` o simples \`' '\`.

\`\`\`python
# Imprimir texto básico en Python
print("¡Hola Mundo en Python!")
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Saludo y reporte anual',
          code: `print("Iniciando sistema Python...")\nprint("Año de ejecución: 2026")`,
          explanation: 'La función print() muestra cada argumento en una línea independiente en consola.'
        }
      ],
      exercise: {
        id: 'py-1',
        instruction: 'Escribe desde cero un script de Python que imprima exactamente el texto "Hola Python desde cero".',
        starterCode: `# Escribe tu código Python desde cero
# Utiliza la función integrada print() para mostrar el mensaje requerido
`,
        solutionCode: `print("Hola Python desde cero")`,
        testCases: [
          { id: '1', expectedOutput: 'Hola Python desde cero', description: 'Debe imprimir exactamente Hola Python desde cero' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Variables y Tipos Dinámicos',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Declaración de variables sin tipos explícitos (int, float, str, bool).',
      theoryMarkdown: `
### Tipado Dinámico en Python

En Python no declaras el tipo de una variable de forma explícita. El intérprete deduce el tipo automáticamente al momento de asignar un valor:

- \`int\`: Enteros (ej: \`edad = 25\`)
- \`float\`: Decimales (ej: \`precio = 99.99\`)
- \`str\`: Cadenas de texto (ej: \`nombre = "Ana"\`)
- \`bool\`: Booleanos (\`True\` o \`False\`)

#### Formateo f-strings:
Permite incrustar expresiones dentro de cadenas anteponiendo una \`f\` antes de las comillas: \`f"{variable}"\`.

\`\`\`python
usuario = "Carlos"
nivel = 5
print(f"Usuario {usuario} en nivel {nivel}")
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Datos de una ciudad',
          code: `ciudad = "Madrid"\npoblacion = 3.2\nprint(f"Ciudad: {ciudad}, Población: {poblacion}M")`,
          explanation: 'Define variables y usa f-strings para construir una salida formateada.'
        }
      ],
      exercise: {
        id: 'py-2',
        instruction: 'Construye desde cero un programa en Python que declare `producto = "Laptop"` y `precio = 1200`. Imprime exactamente la cadena formateada `Laptop: $1200` usando una f-string.',
        starterCode: `# Escribe tu código Python desde cero
# Declara las variables producto y precio, e imprímelas con f-string
`,
        solutionCode: `producto = "Laptop"\nprecio = 1200\nprint(f"{producto}: \\\${precio}")`,
        testCases: [
          { id: '1', expectedOutput: 'Laptop: $1200', description: 'Debe formatear e imprimir Laptop: $1200' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Operadores Aritméticos Avanzados',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Operaciones de potencia (**), división entera (//) y módulo (%).',
      theoryMarkdown: `
### Operadores Matemáticos Específicos de Python

Además de los operadores convencionales (\`+\`, \`-\`, \`*\`, \`/\`), Python ofrece:
- \`**\`: Potencia o exponenciación (ej: \`2 ** 3\` equivale a 8)
- \`//\`: División entera, descarta los decimales (ej: \`10 // 3\` equivale a 3)
- \`%\`: Módulo o residuo de división (ej: \`10 % 3\` equivale a 1)

\`\`\`python
base = 2
exponente = 4
print(base ** exponente) # 16
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Cálculo de cociente y resto',
          code: `unidades = 17\ncajas = unidades // 5\nsobrantes = unidades % 5\nprint(f"Cajas llenas: {cajas}, Sobran: {sobrantes}")`,
          explanation: 'Utiliza la división entera // y el resto % para agrupar elementos en cajas.'
        }
      ],
      exercise: {
        id: 'py-3',
        instruction: 'Escribe un script en Python desde cero que calcule 5 elevado a la potencia de 3 (5 al cubo) e imprima el resultado final en pantalla (125).',
        starterCode: `# Escribe tu código Python desde cero
# Calcula 5 ** 3 e imprime el resultado
`,
        solutionCode: `resultado = 5 ** 3\nprint(resultado)`,
        testCases: [
          { id: '1', expectedOutput: '125', description: '5 ** 3 debe resultar en 125' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Condicionales: if, elif, else',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Estructuras condicionales basadas en identación obligatoria.',
      theoryMarkdown: `
### Indentación y Control de Flujo

En Python la sangría (4 espacios) delimita los bloques de código ejecutable dentro de un \`if\`, \`elif\` o \`else\`.

\`\`\`python
temperatura = 28
if temperatura > 30:
    print("Calor")
elif temperatura > 20:
    print("Clima templado")
else:
    print("Frío")
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Categorización de velocidad',
          code: `velocidad = 75\nif velocidad > 100:\n    print("Peligroso")\nelif velocidad >= 60:\n    print("Velocidad permitida")\nelse:\n    print("Muy lento")`,
          explanation: 'Evalúa la velocidad en rangos secuenciales respetando la sangría de 4 espacios.'
        }
      ],
      exercise: {
        id: 'py-4',
        instruction: 'Construye desde cero un programa en Python que declare `puntuacion = 92`. Si la puntuación es mayor o igual a 90, debe imprimir "Sobresaliente", de lo contrario "Aprobado".',
        starterCode: `# Escribe tu código Python desde cero
# Declara puntuacion = 92 y crea la estructura if/else con sangría
`,
        solutionCode: `puntuacion = 92\nif puntuacion >= 90:\n    print("Sobresaliente")\nelse:\n    print("Aprobado")`,
        testCases: [
          { id: '1', expectedOutput: 'Sobresaliente', description: 'Imprime Sobresaliente para puntuación de 92' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Bucles e Iteraciones (for y range)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Generación de secuencias numéricas con range() y bucles for.',
      theoryMarkdown: `
### El bucle for y la función range()

La función integrada \`range(inicio, fin, paso)\` genera secuencias iterables. Nota: el valor \`fin\` no se incluye.

\`\`\`python
# Itera de 1 a 3
for i in range(1, 4):
    print(f"Iteración {i}")
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Imprimir múltiplos de 5',
          code: `for n in range(5, 20, 5):\n    print(n) # Imprime 5, 10, 15`,
          explanation: 'range(5, 20, 5) inicia en 5, avanza de 5 en 5 y termina antes de 20.'
        }
      ],
      exercise: {
        id: 'py-5',
        instruction: 'Escribe desde cero un programa en Python que calcule la suma de los números impares del 1 al 9 inclusive (1 + 3 + 5 + 7 + 9) e imprima el total (25).',
        starterCode: `# Escribe tu código Python desde cero
# Puedes usar sum(range(1, 10, 2)) o un bucle for acumulador
`,
        solutionCode: `suma = sum(range(1, 10, 2))\nprint(suma)`,
        testCases: [
          { id: '1', expectedOutput: '25', description: 'La suma de 1+3+5+7+9 es 25' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. Estructuras de Datos: Listas',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Colecciones ordenadas y mutables con append, len e indexación.',
      theoryMarkdown: `
### Colecciones Mutables en Python

Las listas almacenan secuencias de elementos indexadas desde cero.
- \`append(elem)\`: Agrega un elemento al final.
- \`len(lista)\`: Retorna el total de elementos.

\`\`\`python
frutas = ["manzana", "banana"]
frutas.append("naranja")
print(len(frutas)) # 3
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Lista de tareas',
          code: `tareas = ["Comprar", "Estudiar"]\ntareas.append("Ejercicio")\nprint(f"Total tareas: {len(tareas)}")`,
          explanation: 'Inserta una nueva tarea al final e imprime el tamaño con len().'
        }
      ],
      exercise: {
        id: 'py-6',
        instruction: 'Construye desde cero un programa en Python que empiece con la lista `lenguajes = ["Python", "C++"]`, agregue el elemento `"JavaScript"` al final e imprima la cantidad total de elementos usando `len()` (debe imprimir 3).',
        starterCode: `# Escribe tu código Python desde cero
# Crea la lista, usa .append() e imprime len()
`,
        solutionCode: `lenguajes = ["Python", "C++"]\nlenguajes.append("JavaScript")\nprint(len(lenguajes))`,
        testCases: [
          { id: '1', expectedOutput: '3', description: 'La lista debe contener 3 elementos' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Diccionarios (Clave - Valor)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Almacenamiento clave-valor estructurado en Python.',
      theoryMarkdown: `
### Diccionarios en Python

Un diccionario almacena pares \`clave: valor\` entre llaves \`{}\`, permitiendo acceso instantáneo por clave.

\`\`\`python
usuario = {"nombre": "Carlos", "rol": "Developer"}
usuario["nivel"] = 3
print(usuario["nombre"]) # Carlos
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Inventario de tienda',
          code: `stock = {"manzanas": 50, "peras": 30}\nstock["naranjas"] = 20\nprint(stock["peras"])`,
          explanation: 'Agrega un nuevo par clave-valor y consulta el valor asignado a peras.'
        }
      ],
      exercise: {
        id: 'py-7',
        instruction: 'Escribe un script en Python desde cero que declare `auto = {"marca": "Ford", "modelo": "Mustang"}`. Agrega la clave `"año"` con el valor `2024` e imprime el modelo en consola ("Mustang").',
        starterCode: `# Escribe tu código Python desde cero
# Crea el diccionario, asigna la clave año e imprime el modelo
`,
        solutionCode: `auto = {"marca": "Ford", "modelo": "Mustang"}\nauto["año"] = 2024\nprint(auto["modelo"])`,
        testCases: [
          { id: '1', expectedOutput: 'Mustang', description: 'Imprime Mustang' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Definición de Funciones (def)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Creación de bloques ejecutables reutilizables con def y return.',
      theoryMarkdown: `
### Modularización mediante Funciones

Sintaxis: \`def nombre_funcion(parametros):\`
Devuelven resultados utilizando la instrucción \`return\`.

\`\`\`python
def sumar(a, b):
    return a + b

resultado = sumar(15, 25)
print(resultado) # 40
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Función para calcular área de triángulo',
          code: `def area_triangulo(base, altura):\n    return (base * altura) / 2\n\nprint(area_triangulo(10, 4))`,
          explanation: 'Define la función area_triangulo que procesa dos parámetros y retorna su área.'
        }
      ],
      exercise: {
        id: 'py-8',
        instruction: 'Construye desde cero un script de Python que defina la función `def promedio(a, b, c): return (a + b + c) / 3`. Invócala con los argumentos `10, 20, 30` e imprime su resultado (20.0).',
        starterCode: `# Escribe tu código Python desde cero
# Define la función promedio e imprímela con 10, 20, 30
`,
        solutionCode: `def promedio(a, b, c):\n    return (a + b + c) / 3\n\nprint(promedio(10, 20, 30))`,
        testCases: [
          { id: '1', expectedOutput: '20.0', description: 'El promedio debe dar 20.0' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Comprensión de Listas (List Comprehensions)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Creación sintética y eficiente de listas en una sola línea.',
      theoryMarkdown: `
### Comprensión de Listas

Es una sintaxis compacta para crear listas transformando o filtrando secuencias iterables.
Sintaxis: \`[expresion for elemento in iterable]\`

\`\`\`python
cuadrados = [x**2 for x in range(1, 4)]
print(cuadrados) # [1, 4, 9]
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Convertir palabras a mayúsculas',
          code: `palabras = ["hola", "python"]\nmayus = [p.upper() for p in palabras]\nprint(mayus)`,
          explanation: 'Aplica el método .upper() a cada elemento de la lista original.'
        }
      ],
      exercise: {
        id: 'py-9',
        instruction: 'Escribe un script en Python desde cero que genere mediante una list comprehension la lista de los dobles de los números del 1 al 4: `[2, 4, 6, 8]` e imprímela.',
        starterCode: `# Escribe tu código Python desde cero
# Genera e imprime la list comprehension de dobles para range(1, 5)
`,
        solutionCode: `dobles = [x * 2 for x in range(1, 5)]\nprint(dobles)`,
        testCases: [
          { id: '1', expectedOutput: '[2, 4, 6, 8]', description: 'Imprime [2, 4, 6, 8]' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Manejo de Excepciones (try / except)',
      level: 'Medio',
      durationMinutes: 20,
      summary: 'Captura y tolerancia a fallos en tiempo de ejecución.',
      theoryMarkdown: `
### Control de Errores con try / except

Evita cierres inesperados al intentar ejecutar instrucciones propensas a error.

\`\`\`python
try:
    numero = int("123")
except ValueError:
    print("Error de conversión")
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Evitar división por cero',
          code: `try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print("No se puede dividir por cero")`,
          explanation: 'Captura la excepción específica ZeroDivisionError sin detener el programa.'
        }
      ],
      exercise: {
        id: 'py-10',
        instruction: 'Crea desde cero un script en Python que incluya un bloque `try` intentando convertir `"hola"` a `int`. En el bloque `except ValueError`, imprime "Error de formato".',
        starterCode: `# Escribe tu código Python desde cero
# Usa try / except ValueError
`,
        solutionCode: `try:\n    val = int("hola")\nexcept ValueError:\n    print("Error de formato")`,
        testCases: [
          { id: '1', expectedOutput: 'Error de formato', description: 'Debe capturar la excepción e imprimir Error de formato' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. POO: Clases y Método __init__',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Programación Orientada a Objetos en Python con __init__ y self.',
      theoryMarkdown: `
### Clases en Python

El método especial \`__init__\` es el constructor de la clase. El parámetro \`self\` hace referencia a la instancia actual del objeto.

\`\`\`python
class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio
        
    def info(self):
        return f"{self.nombre}: \${self.precio}"
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Clase CuentaBancaria',
          code: `# Instancia de objeto con métodos\nclass Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n\nc = Cuenta("Elena")\nprint(c.titular)`,
          explanation: 'Define la clase Cuenta y accede al atributo de instancia titular.'
        }
      ],
      exercise: {
        id: 'py-11',
        instruction: 'Crea desde cero una clase `Libro` con `__init__(self, titulo, autor)` y un método `resumen(self)` que devuelva `f"{self.titulo} por {self.autor}"`. Instancia `Libro("1984", "George Orwell")` e imprime su resumen.',
        starterCode: `# Escribe tu código Python desde cero
# Define la clase Libro, inicialízala e imprime el resumen
`,
        solutionCode: `class Libro:\n    def __init__(self, titulo, autor):\n        self.titulo = titulo\n        self.autor = autor\n    def resumen(self):\n        return f"{self.titulo} por {self.autor}"\n\nl1 = Libro("1984", "George Orwell")\nprint(l1.resumen())`,
        testCases: [
          { id: '1', expectedOutput: '1984 por George Orwell', description: 'Debe imprimir 1984 por George Orwell' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Herencia de Clases y super()',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Reutilización y extensión de clases con super().',
      theoryMarkdown: `
### Herencia en Python

Permite que una clase hija herede atributos y métodos de una clase padre. La función \`super()\` invoca al constructor de la clase base.

\`\`\`python
class Vehiculo:
    def __init__(self, marca):
        self.marca = marca

class Moto(Vehiculo):
    def __init__(self, marca, cc):
        super().__init__(marca)
        self.cc = cc
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Herencia de Figuras',
          code: `class Figura:\n    def __init__(self, color):\n        self.color = color\n\nclass Cuadrado(Figura):\n    def __init__(self, color, lado):\n        super().__init__(color)\n        self.lado = lado\n\nc = Cuadrado("Rojo", 4)\nprint(c.color)`,
          explanation: 'Cuadrado hereda el atributo color de Figura mediante super().'
        }
      ],
      exercise: {
        id: 'py-12',
        instruction: 'Escribe un script en Python desde cero con la clase base `Empleado(nombre)` y la subclase `Gerente(nombre, departamento)` que utilice `super()`. Instancia `Gerente("Ana", "Ventas")` e imprime el departamento.',
        starterCode: `# Escribe tu código Python desde cero
# Define Empleado, Gerente con super() e imprime el departamento
`,
        solutionCode: `class Empleado:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nclass Gerente(Empleado):\n    def __init__(self, nombre, departamento):\n        super().__init__(nombre)\n        self.departamento = departamento\n\ng = Gerente("Ana", "Ventas")\nprint(g.departamento)`,
        testCases: [
          { id: '1', expectedOutput: 'Ventas', description: 'Debe imprimir Ventas' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Decoradores de Funciones',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Envoltura funcional utilizando la sintaxis @decorador.',
      theoryMarkdown: `
### Decoradores

Un decorador es una función que recibe otra función como parámetro y amplía su comportamiento sin modificar su código original.

\`\`\`python
def mi_decorador(func):
    def envoltura():
        print("Iniciando")
        func()
        print("Finalizado")
    return envoltura

@mi_decorador
def saludar():
    print("Hola")
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Logueador simple',
          code: `def logger(fn):\n    def ejecutor():\n        print("[LOG]")\n        return fn()\n    return ejecutor\n\n@logger\ndef accion():\n    return "Ok"\n\nprint(accion())`,
          explanation: 'Agrega un prefijo [LOG] antes de ejecutar la función.'
        }
      ],
      exercise: {
        id: 'py-13',
        instruction: 'Crea desde cero un decorador `mayusculas(func)` que convierta en mayúsculas el texto retornado por la función decorada. Decora `def dar_mensaje(): return "exito"`. Imprime `dar_mensaje()` ("EXITO").',
        starterCode: `# Escribe tu código Python desde cero
# Define el decorador mayusculas e imprímelo aplicado a dar_mensaje()
`,
        solutionCode: `def mayusculas(func):\n    def envoltura():\n        return func().upper()\n    return envoltura\n\n@mayusculas\ndef dar_mensaje():\n    return "exito"\n\nprint(dar_mensaje())`,
        testCases: [
          { id: '1', expectedOutput: 'EXITO', description: 'Debe retornar EXITO' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Generadores y la Palabra yield',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Generación eficiente de datos bajo demanda usando yield.',
      theoryMarkdown: `
### Generadores en Python

Los generadores producen secuencias de elementos de forma perezosa (\`lazy evaluation\`). Utilizan \`yield\` para pausar la ejecución en lugar de terminar con \`return\`.

\`\`\`python
def contador():
    yield 1
    yield 2
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Generador de ceros',
          code: `def ceros(n):\n    for _ in range(n):\n        yield 0\n\nprint(list(ceros(3))) # [0, 0, 0]`,
          explanation: 'Produce n veces el número cero en una lista.'
        }
      ],
      exercise: {
        id: 'py-14',
        instruction: 'Escribe desde cero un generador `def pares(limite):` que produzca los números pares desde 2 hasta `limite`. Con `limite=6`, calcula e imprime la suma de todos los pares generados (2 + 4 + 6 = 12).',
        starterCode: `# Escribe tu código Python desde cero
# Define el generador pares(limite) e imprime sum(pares(6))
`,
        solutionCode: `def pares(limite):\n    for i in range(2, limite + 1, 2):\n        yield i\n\nprint(sum(pares(6)))`,
        testCases: [
          { id: '1', expectedOutput: '12', description: 'La suma debe ser 12' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Funciones Anónimas Lambda',
      level: 'Avanzado',
      durationMinutes: 25,
      summary: 'Declaración compacta de funciones anónimas en una línea.',
      theoryMarkdown: `
### Funciones Lambda

Las funciones lambda permiten definir expresiones en una sola línea sin utilizar la sintaxis completa \`def\`.
Sintaxis: \`lambda parametros: expresion\`

\`\`\`python
doble = lambda x: x * 2
print(doble(5)) # 10
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Lambda para sumar 10',
          code: `sumar_diez = lambda n: n + 10\nprint(sumar_diez(25)) # 35`,
          explanation: 'Suma 10 directamente al argumento pasado.'
        }
      ],
      exercise: {
        id: 'py-15',
        instruction: 'Escribe un script en Python desde cero que defina una función lambda `multiplicar = lambda a, b: a * b`. Imprime la llamada `multiplicar(8, 7)` en consola (56).',
        starterCode: `# Escribe tu código Python desde cero
# Define la lambda multiplicar e imprime multiplicar(8, 7)
`,
        solutionCode: `multiplicar = lambda a, b: a * b\nprint(multiplicar(8, 7))`,
        testCases: [
          { id: '1', expectedOutput: '56', description: '8 * 7 es 56' }
        ]
      }
    }
  ]
};
