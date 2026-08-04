import { Course } from '../types';

export const cppCourse: Course = {
  id: 'cpp',
  title: 'C++',
  iconName: 'Code2',
  description: 'Aprende C++ desde cero hasta conceptos avanzados de memoria, POO, STL y plantillas.',
  color: 'from-blue-600 to-indigo-700',
  badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  totalLessons: 15,
  prerequisites: ['Lógica básica de programación'],
  skillsGained: ['Punteros y Referencias', 'Programación Orientada a Objetos', 'Plantillas (Templates)', 'Gestión de Memoria', 'Contenedores STL'],
  lessons: [
    {
      id: 1,
      title: '1. Hola Mundo y Estructura en C++',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Estructura básica de un programa en C++, inclusión de bibliotecas con #include e impresión con std::cout.',
      theoryMarkdown: `
### Estructura de un Programa en C++

C++ es un lenguaje compilado de alto rendimiento usado en sistemas operativos, motores de videojuegos y software de alto desempeño.

#### Componentes Principales:
1. **Bibliotecas y Encabezados (\`#include <iostream>\`)**: 
   Para realizar operaciones de entrada y salida de datos (como imprimir en pantalla), debes incluir la biblioteca del sistema \`<iostream>\`.
2. **Espacio de Nombres (\`using namespace std;\`)**: 
   Evita tener que anteponer \`std::\` antes de elementos comunes como \`cout\` o \`endl\`.
3. **Punto de Entrada (\`int main()\`)**: 
   Es la función ejecutable principal donde inicia la ejecución de todo programa C++. Debe retornar un entero (\`return 0;\` indica éxito).

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "¡Hola desde C++!" << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Imprimir mensaje de bienvenida',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Bienvenido a C++" << endl;\n    cout << "Sistema listo." << endl;\n    return 0;\n}`,
          explanation: 'Incluye <iostream>, abre main(), imprime dos líneas con cout y finaliza con return 0.'
        }
      ],
      exercise: {
        id: 'cpp-1',
        instruction: 'Construye desde cero tu primer programa completo en C++. Debe incluir la biblioteca <iostream>, el espacio de nombres std, la función main() e imprimir exactamente "Hola Mundo desde C++".',
        starterCode: `// Escribe tu programa en C++ desde cero
// 1. Incluye la biblioteca de entrada/salida (<iostream>)
// 2. Utiliza el espacio de nombres std
// 3. Define la función principal int main() e imprime "Hola Mundo desde C++"
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hola Mundo desde C++" << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Hola Mundo desde C++', description: 'Debe estructurar el programa desde cero e imprimir Hola Mundo desde C++' }
        ],
        hint: 'No olvides incluir #include <iostream>, int main() { cout << "Hola Mundo desde C++" << endl; return 0; }'
      }
    },
    {
      id: 2,
      title: '2. Variables y Tipos de Datos Primitivos',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Declaración y asignación de int, double, float, char y bool en C++.',
      theoryMarkdown: `
### Tipos de Datos Primitivos en C++

C++ es un lenguaje **estáticamente tipado**: debes declarar explícitamente el tipo de dato de cada variable antes de utilizarla.

#### Tipos Principales:
- \`int\`: Números enteros (ej: \`int edad = 25;\`)
- \`double\`: Números decimales de doble precisión (ej: \`double precio = 19.99;\`)
- \`char\`: Caracteres individuales entre comillas simples (ej: \`char letra = 'A';\`)
- \`bool\`: Valores booleanos (\`true\` o \`false\`)

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int ancho = 10;
    int alto = 5;
    int area = ancho * alto;
    cout << "Área: " << area << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Cálculo del perímetro de un rectángulo',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int base = 8;\n    int altura = 4;\n    int perimetro = 2 * (base + altura);\n    cout << perimetro << endl;\n    return 0;\n}`,
          explanation: 'Declara dos variables enteras base y altura, calcula el perímetro y lo imprime.'
        }
      ],
      exercise: {
        id: 'cpp-2',
        instruction: 'Escribe desde cero un programa en C++ que declare dos variables enteras: `unidades = 6` y `precioUnitario = 15`. Calcula el costo total (`unidades * precioUnitario`) e imprímelo en pantalla (debe resultar en 90).',
        starterCode: `// Escribe tu programa en C++ desde cero
// Recuerda incluir <iostream>, using namespace std y la función main()
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int unidades = 6;\n    int precioUnitario = 15;\n    cout << unidades * precioUnitario << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '90', description: 'Debe calcular e imprimir 90' }
        ],
        hint: 'Declara int unidades = 6; int precioUnitario = 15; e imprime unidades * precioUnitario con cout.'
      }
    },
    {
      id: 3,
      title: '3. Operadores Aritméticos y Modulo',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Uso de operadores matemáticos +, -, *, /, % y precedencia en C++.',
      theoryMarkdown: `
### Operadores Aritméticos en C++

- \`+\`: Suma
- \`-\`: Resta
- \`*\`: Multiplicación
- \`/\`: División (división entera si ambos operandos son enteros)
- \`%\`: Módulo o resto de la división entera (ej: \`17 % 5\` resulta en \`2\`)

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int residuo = 17 % 5;
    cout << "Residuo: " << residuo << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Verificar residuo de horas',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int totalHoras = 50;\n    int dias = totalHoras / 24;\n    int horasSobrantes = totalHoras % 24;\n    cout << horasSobrantes << endl;\n    return 0;\n}`,
          explanation: 'Divide 50 entre 24 para obtener días y usa % para obtener las horas restantes.'
        }
      ],
      exercise: {
        id: 'cpp-3',
        instruction: 'Escribe un programa en C++ desde cero que calcule e imprima el resto de dividir 29 entre 4 (debe imprimir 1).',
        starterCode: `// Escribe tu programa en C++ desde cero
// Incluye bibliotecas, main() e imprime el módulo 29 % 4
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int numero = 29;\n    int divisor = 4;\n    cout << numero % divisor << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '1', description: 'El módulo 29 % 4 debe imprimir 1' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Estructuras Condicionales (if, else)',
      level: 'Básico',
      durationMinutes: 25,
      summary: 'Control de flujo condicional evaluando expresiones booleanas en C++.',
      theoryMarkdown: `
### Toma de Decisiones con if / else

Permite ejecutar bloques de código alternativos según el cumplimiento de una condición.

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int temperatura = 30;
    if (temperatura > 25) {
        cout << "Hace calor" << endl;
    } else {
        cout << "Clima fresco" << endl;
    }
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Evaluación de velocidad',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int velocidad = 90;\n    if (velocidad > 80) {\n        cout << "Exceso de velocidad" << endl;\n    } else {\n        cout << "Velocidad normal" << endl;\n    }\n    return 0;\n}`,
          explanation: 'Compara la variable velocidad con el límite permitido.'
        }
      ],
      exercise: {
        id: 'cpp-4',
        instruction: 'Crea desde cero un programa en C++ que declare la variable `int nota = 85;`. Si la nota es mayor o igual a 60, debe imprimir "Aprobado", de lo contrario "Reprobado".',
        starterCode: `// Escribe tu programa en C++ desde cero
// Declara nota = 85 y evalúa con if/else
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int nota = 85;\n    if (nota >= 60) {\n        cout << "Aprobado" << endl;\n    } else {\n        cout << "Reprobado" << endl;\n    }\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Aprobado', description: 'Nota 85 produce la salida Aprobado' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Bucles y Repeticiones (for)',
      level: 'Básico',
      durationMinutes: 25,
      summary: 'Iteraciones iterativas controladas mediante el bucle for.',
      theoryMarkdown: `
### Bucle for en C++

El bucle \`for\` consta de 3 partes: inicialización, condición de continuación e incremento.

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        cout << "Contador: " << i << endl;
    }
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Tabla del 2',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        cout << "2 x " << i << " = " << (2 * i) << endl;\n    }\n    return 0;\n}`,
          explanation: 'Itera 3 veces calculando múltiplos de 2.'
        }
      ],
      exercise: {
        id: 'cpp-5',
        instruction: 'Crea un programa C++ desde cero con un bucle `for` que imprima los números enteros del 1 al 5 en líneas separadas.',
        starterCode: `// Escribe tu programa en C++ desde cero
// Usa un bucle for desde 1 hasta 5
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        cout << i << endl;\n    }\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '1\n2\n3\n4\n5', description: 'Imprime números del 1 al 5' }
        ]
      }
    },

    // Medio (6 - 10)
    {
      id: 6,
      title: '6. Arreglos Unidimensionales (Arrays)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Almacenamiento contiguo de valores del mismo tipo mediante arrays estáticos.',
      theoryMarkdown: `
### Arreglos en C++

Un arreglo almacena múltiples elementos de un mismo tipo de dato en posiciones de memoria consecutivas.
El acceso es indexado desde 0 (\`array[0]\`).

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int precios[3] = {100, 200, 300};
    cout << "Primer precio: " << precios[0] << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Promedio de 2 notas',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int notas[2] = {90, 80};\n    int promedio = (notas[0] + notas[1]) / 2;\n    cout << promedio << endl;\n    return 0;\n}`,
          explanation: 'Accede a notas[0] y notas[1] para obtener el promedio.'
        }
      ],
      exercise: {
        id: 'cpp-6',
        instruction: 'Escribe un programa C++ desde cero que declare un arreglo `int nums[3] = {10, 20, 30};` e imprima la suma total de sus 3 elementos (debe resultar 60).',
        starterCode: `// Escribe tu programa en C++ desde cero
// Declara el arreglo nums y suma sus posiciones
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int nums[3] = {10, 20, 30};\n    int suma = nums[0] + nums[1] + nums[2];\n    cout << suma << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '60', description: 'Suma de 10+20+30 es 60' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Funciones y Parámetros',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Modularización del código con funciones personalizadas y valores de retorno.',
      theoryMarkdown: `
### Funciones en C++

Las funciones permiten empaquetar bloques de código reutilizables.
Deben declarar el tipo de retorno, el nombre y la lista de parámetros.

\`\`\`cpp
#include <iostream>
using namespace std;

int sumar(int a, int b) {
    return a + b;
}

int main() {
    cout << sumar(10, 20) << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Función para triplicar un valor',
          code: `#include <iostream>\nusing namespace std;\n\nint triplicar(int n) {\n    return n * 3;\n}\n\nint main() {\n    cout << triplicar(7) << endl;\n    return 0;\n}`,
          explanation: 'Define triplicar() antes de main() y retorna n * 3.'
        }
      ],
      exercise: {
        id: 'cpp-7',
        instruction: 'Construye desde cero un programa C++ que defina la función `int cuadrado(int n)` que retorne `n * n`. En `main()`, llama a `cuadrado(6)` e imprime el resultado (36).',
        starterCode: `// Escribe tu programa C++ desde cero
// Define la función cuadrado antes de main()
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint cuadrado(int n) {\n    return n * n;\n}\n\nint main() {\n    cout << cuadrado(6) << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '36', description: 'cuadrado(6) debe imprimir 36' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Punteros y Operador de Desreferencia (*, &)',
      level: 'Medio',
      durationMinutes: 35,
      summary: 'Concepto de direcciones de memoria (&) y punteros (*) en C++.',
      theoryMarkdown: `
### Punteros en C++

Un puntero es una variable que almacena la **dirección de memoria** de otra variable.
- \`&\`: Operador de dirección (obtiene dónde reside la variable).
- \`*\`: Operador de desreferencia (accede al valor almacenado en dicha dirección).

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int valor = 42;
    int* ptr = &valor;
    cout << *ptr << endl; // Imprime 42
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Modificación a través de puntero',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int saldo = 500;\n    int* p = &saldo;\n    *p = 750;\n    cout << saldo << endl;\n    return 0;\n}`,
          explanation: 'Modifica el valor original de saldo alterando *p.'
        }
      ],
      exercise: {
        id: 'cpp-8',
        instruction: 'Crea desde cero un programa C++ que declare `int num = 50;`, cree un puntero `int* ptr = &num;` e imprima el valor desreferenciado usando `*ptr`.',
        starterCode: `// Escribe tu programa C++ desde cero
// Declara num, ptr e imprime *ptr
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 50;\n    int* ptr = &num;\n    cout << *ptr << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '50', description: '*ptr debe imprimir 50' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Referencias y Paso por Referencia (&)',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Alias de variables y modificación directa de parámetros con referencias en C++.',
      theoryMarkdown: `
### Paso por Referencia

El paso por referencia permite a una función modificar la variable original enviada por el llamador sin realizar copias innecesarias.

\`\`\`cpp
#include <iostream>
using namespace std;

void duplicar(int& n) {
    n *= 2;
}

int main() {
    int x = 10;
    duplicar(x);
    cout << x << endl; // Imprime 20
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Incrementar valor por referencia',
          code: `#include <iostream>\nusing namespace std;\n\nvoid incrementar(int& num) {\n    num++;\n}\n\nint main() {\n    int a = 99;\n    incrementar(a);\n    cout << a << endl;\n    return 0;\n}`,
          explanation: 'incrementar modifica directamente la variable a.'
        }
      ],
      exercise: {
        id: 'cpp-9',
        instruction: 'Escribe un programa C++ desde cero que defina `void sumarCinco(int& val)` que le sume 5 a `val`. En `main()`, declara `int x = 10;`, llama a `sumarCinco(x)` e imprime `x` (15).',
        starterCode: `// Escribe tu programa C++ desde cero
// Define sumarCinco con parámetro por referencia int& val
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nvoid sumarCinco(int& val) {\n    val += 5;\n}\n\nint main() {\n    int x = 10;\n    sumarCinco(x);\n    cout << x << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '15', description: 'x modificado debe ser 15' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Estructuras de Datos (struct)',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Agrupamiento de heterogéneo de datos bajo un nombre de tipo en C++.',
      theoryMarkdown: `
### Estructuras (struct) en C++

Permite definir tipos de datos personalizados que agrupan variables de diferentes tipos.

\`\`\`cpp
#include <iostream>
using namespace std;

struct Persona {
    string nombre;
    int edad;
};

int main() {
    Persona p = {"Carlos", 30};
    cout << p.nombre << " tiene " << p.edad << " años." << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Struct para Producto',
          code: `#include <iostream>\nusing namespace std;\n\nstruct Producto {\n    int id;\n    int precio;\n};\n\nint main() {\n    Producto prod = {101, 250};\n    cout << prod.precio << endl;\n    return 0;\n}`,
          explanation: 'Instancia la estructura Producto y accede a prod.precio.'
        }
      ],
      exercise: {
        id: 'cpp-10',
        instruction: 'Escribe un programa C++ desde cero que defina `struct Punto { int x; int y; };`. En `main()`, instancia `Punto p = {5, 10};` e imprime la suma de `p.x + p.y` (15).',
        starterCode: `// Escribe tu programa C++ desde cero
// Define el struct Punto e instancia p = {5, 10}
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nstruct Punto {\n    int x;\n    int y;\n};\n\nint main() {\n    Punto p = {5, 10};\n    cout << p.x + p.y << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '15', description: 'p.x + p.y debe ser 15' }
        ]
      }
    },

    // Avanzado (11 - 15)
    {
      id: 11,
      title: '11. Clases y Encapsulamiento',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Programación Orientada a Objetos: modificadores public y private en C++.',
      theoryMarkdown: `
### Clases y Encapsulamiento

Una clase encapsula estado (atributos) y comportamiento (métodos).
- \`private\`: Atributos o métodos solo accesibles dentro de la misma clase.
- \`public\`: Miembros accesibles desde fuera de la clase.

\`\`\`cpp
#include <iostream>
using namespace std;

class Cuenta {
private:
    double saldo;
public:
    void setSaldo(double s) { saldo = s; }
    double getSaldo() { return saldo; }
};
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Clase Circulo',
          code: `#include <iostream>\nusing namespace std;\n\nclass Circulo {\nprivate:\n    int radio = 5;\npublic:\n    int diametro() {\n        return radio * 2;\n    }\n};\n\nint main() {\n    Circulo c;\n    cout << c.diametro() << endl;\n    return 0;\n}`,
          explanation: 'radio es privado y diametro() es un método público de la clase.'
        }
      ],
      exercise: {
        id: 'cpp-11',
        instruction: 'Crea desde cero un programa C++ con una clase `Rectangulo` que posea atributos privados `int alto = 4;` e `int ancho = 5;`, y un método público `int area()` que retorne `alto * ancho`. En `main()`, instancia la clase e imprime el área (20).',
        starterCode: `// Escribe tu programa C++ desde cero
// Define la clase Rectangulo con atributos privados y método público area()
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nclass Rectangulo {\nprivate:\n    int alto = 4;\n    int ancho = 5;\npublic:\n    int area() {\n        return alto * ancho;\n    }\n};\n\nint main() {\n    Rectangulo r;\n    cout << r.area() << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '20', description: 'Area del rectángulo debe ser 20' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Constructores y Destructores',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Inicialización automática de objetos mediante constructores en C++.',
      theoryMarkdown: `
### Constructores en C++

Un constructor es un método especial con el mismo nombre que la clase que se ejecuta automáticamente cuando se crea un objeto.

\`\`\`cpp
#include <iostream>
using namespace std;

class Robot {
public:
    Robot(string modelo) {
        cout << "Robot " << modelo << " activado" << endl;
    }
};
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Constructor con mensaje',
          code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Dispositivo {\npublic:\n    Dispositivo(string tipo) {\n        cout << "Equipo " << tipo << endl;\n    }\n};\n\nint main() {\n    Dispositivo d("Laptop");\n    return 0;\n}`,
          explanation: 'El constructor imprime Equipo Laptop al instanciar.'
        }
      ],
      exercise: {
        id: 'cpp-12',
        instruction: 'Crea un programa C++ desde cero con la clase `Coche` y un constructor `Coche(string marca)` que imprima `"Coche " + marca`. En `main()`, instancia `Coche c("Toyota");`.',
        starterCode: `// Escribe tu programa C++ desde cero
// Incluye <iostream> y <string>, crea Coche e instancialo
`,
        solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Coche {\npublic:\n    Coche(string marca) {\n        cout << "Coche " << marca << endl;\n    }\n};\n\nint main() {\n    Coche c("Toyota");\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Coche Toyota', description: 'Debe imprimir Coche Toyota' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Memoria Dinámica (new, delete)',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Reserva y liberación de memoria en la memoria Heap usando new y delete.',
      theoryMarkdown: `
### Memoria Dinámica en C++

- \`new\`: Asigna espacio en el Heap durante la ejecución.
- \`delete\`: Libera el espacio asignado para evitar memory leaks.

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int* ptr = new int(100);
    cout << *ptr << endl;
    delete ptr;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Array en Heap',
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int* arr = new int[2];\n    arr[0] = 10;\n    arr[1] = 20;\n    cout << arr[0] + arr[1] << endl;\n    delete[] arr;\n    return 0;\n}`,
          explanation: 'Reserva array de 2 enteros en Heap y usa delete[] al finalizar.'
        }
      ],
      exercise: {
        id: 'cpp-13',
        instruction: 'Construye desde cero un programa C++ que asigne dinámicamente un entero con valor 99 usando `new`, imprima su valor con `cout` y libere la memoria con `delete`.',
        starterCode: `// Escribe tu programa C++ desde cero
// Usa new int(99), cout y delete
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int* p = new int(99);\n    cout << *p << endl;\n    delete p;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '99', description: 'Imprime 99 y libera memoria' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Plantillas (Templates)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Programación genérica reusable para cualquier tipo de dato con templates.',
      theoryMarkdown: `
### Plantillas (Templates) en C++

Permiten escribir funciones o clases genéricas independientes del tipo de dato específico.

\`\`\`cpp
#include <iostream>
using namespace std;

template <typename T>
T obtenerMaximo(T a, T b) {
    return (a > b) ? a : b;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Template para sumar dos valores genéricos',
          code: `#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT sumarGenerico(T a, T b) {\n    return a + b;\n}\n\nint main() {\n    cout << sumarGenerico(10, 5) << endl;\n    return 0;\n}`,
          explanation: 'La función sumarGenerico funciona con int, double, etc.'
        }
      ],
      exercise: {
        id: 'cpp-14',
        instruction: 'Escribe un programa C++ desde cero con la plantilla `template <typename T> T duplicar(T val)` que retorne `val * 2`. En `main()`, imprime `duplicar(15)` (30).',
        starterCode: `// Escribe tu programa C++ desde cero
// Define la plantilla duplicar e invócala con 15
`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT duplicar(T val) {\n    return val * 2;\n}\n\nint main() {\n    cout << duplicar(15) << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '30', description: 'duplicar(15) resulta en 30' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Biblioteca STL (std::vector)',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Uso de contenedores dinámicos de la biblioteca estándar de C++.',
      theoryMarkdown: `
### std::vector de C++ STL

\`std::vector\` es un contenedor dinámico que se redimensiona automáticamente al insertar o eliminar elementos.
Requiere la inclusión del encabezado \`#include <vector>\`.

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> datos = {1, 2, 3};
    datos.push_back(4);
    cout << "Tamaño: " << datos.size() << endl;
    return 0;
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Vector de nombres',
          code: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> lista;\n    lista.push_back("C++");\n    cout << lista[0] << endl;\n    return 0;\n}`,
          explanation: 'Inserta la cadena "C++" en el vector e imprime su primera posición.'
        }
      ],
      exercise: {
        id: 'cpp-15',
        instruction: 'Crea desde cero un programa C++ que incluya `<vector>`, declare `vector<int> v = {40, 10, 30};`, agregue el valor `20` con `push_back`, e imprime la cantidad total de elementos usando `.size()` (debe dar 4).',
        starterCode: `// Escribe tu programa C++ desde cero
// Incluye <iostream> y <vector>, crea el vector e imprime v.size()
`,
        solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {40, 10, 30};\n    v.push_back(20);\n    cout << v.size() << endl;\n    return 0;\n}`,
        testCases: [
          { id: '1', expectedOutput: '4', description: 'El tamaño del vector debe ser 4' }
        ]
      }
    }
  ]
};
