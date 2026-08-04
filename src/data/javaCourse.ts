import { Course } from '../types';

export const javaCourse: Course = {
  id: 'java',
  title: 'Java',
  iconName: 'Coffee',
  description: 'Aprende Java desde fundamentos y la JVM hasta Programación Orientada a Objetos, Colecciones, Streams y Lambdas.',
  color: 'from-orange-600 to-red-700',
  badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  totalLessons: 15,
  prerequisites: ['Principios de lógica'],
  skillsGained: ['Sintaxis Java 17/21', 'POO Avanzada', 'Java Collections Framework', 'Manejo de Excepciones', 'Streams API & Expressivas Lambdas'],
  lessons: [
    {
      id: 1,
      title: '1. Estructura de un Programa en Java',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Estructura básica de clases, método main() e impresión con System.out.println en Java.',
      theoryMarkdown: `
### Estructura Fundamental en Java

Java es un lenguaje tipado, orientado a objetos y portable a través de la Máquina Virtual de Java (JVM). Todo código ejecutable debe residir dentro de una clase.

#### Componentes Esenciales:
1. **Definición de Clase (\`public class Main\`)**: Todo programa Java se organiza alrededor de clases.
2. **Método Principal (\`public static void main(String[] args)\`)**: Es el punto de entrada estático donde la JVM inicia la ejecución del programa.
3. **Impresión en Consola (\`System.out.println()\`)**: Envía texto a la consola estándar de salida e introduce un salto de línea.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("¡Hola desde Java!");
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Reporte del sistema',
          code: `public class Main {\n    public static void main(String[] args) {\n        System.out.print("Estado: ");\n        System.out.println("Operativo");\n    }\n}`,
          explanation: 'System.out.print imprime sin salto de línea, mientras println agrega un salto final.'
        }
      ],
      exercise: {
        id: 'java-1',
        instruction: 'Construye desde cero un programa en Java completo. Debe definir la clase `public class Main`, el método `public static void main(String[] args)` e imprimir exactamente "Hola Mundo desde Java".',
        starterCode: `// Escribe tu programa en Java desde cero
// 1. Define la clase public class Main
// 2. Crea el método public static void main(String[] args)
// 3. Imprime "Hola Mundo desde Java" utilizando System.out.println
`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hola Mundo desde Java");\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Hola Mundo desde Java', description: 'Debe estructurar la clase y main desde cero e imprimir Hola Mundo desde Java' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Tipos Primitivos y Variables',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Declaración de int, double, boolean y concatenación de cadenas en Java.',
      theoryMarkdown: `
### Tipos Primitivos en Java

Java es fuertemente tipado. Debes declarar el tipo de cada variable antes de usarla:

- \`int\`: Enteros de 32 bits (ej: \`int edad = 30;\`)
- \`double\`: Decimales de alta precisión (ej: \`double precio = 19.99;\`)
- \`boolean\`: Valores lógicos (\`true\` o \`false\`)

\`\`\`java
public class Main {
    public static void main(String[] args) {
        int ancho = 10;
        int alto = 5;
        System.out.println(ancho * alto);
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Cálculo de promedio de dos valores',
          code: `public class Main {\n    public static void main(String[] args) {\n        double nota1 = 8.5;\n        double nota2 = 9.5;\n        double promedio = (nota1 + nota2) / 2;\n        System.out.println(promedio);\n    }\n}`,
          explanation: 'Declara variables double y realiza la división en el promedio.'
        }
      ],
      exercise: {
        id: 'java-2',
        instruction: 'Escribe un programa en Java desde cero que declare `int x = 20;` y `int y = 30;`. Calcula e imprime la suma de ambos valores (debe imprimir 50).',
        starterCode: `// Escribe tu programa en Java desde cero
// Incluye class Main y main(String[] args), declara x e y, e imprime x + y
`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int x = 20;\n        int y = 30;\n        System.out.println(x + y);\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '50', description: '20 + 30 debe dar 50' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Operadores Aritméticos y Módulo',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Operaciones de módulo (%) y expresiones matemáticas en Java.',
      theoryMarkdown: `
### Operadores Aritméticos

En Java, el operador \`%\` devuelve el residuo o módulo de una división entera.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        int resto = 23 % 5; // resulta en 3
        System.out.println(resto);
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Comprobación de unidades sobrantes',
          code: `public class Main {\n    public static void main(String[] args) {\n        int totalArticulos = 53;\n        int sobrantes = totalArticulos % 10;\n        System.out.println(sobrantes);\n    }\n}`,
          explanation: 'Calcula el resto de 53 dividido entre 10.'
        }
      ],
      exercise: {
        id: 'java-3',
        instruction: 'Construye desde cero un programa en Java que calcule e imprima el resto de dividir 45 entre 6 (debe resultar en 3).',
        starterCode: `// Escribe tu programa en Java desde cero
// Estructura la clase Main y el método main(), e imprime 45 % 6
`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(45 % 6);\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '3', description: '45 % 6 es igual a 3' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Estructuras de Control (if - else)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Evaluación condicional con bloques if/else en Java.',
      theoryMarkdown: `
### Condicionales if y else

Permiten tomar decisiones evaluando expresiones que resultan en un booleano.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        int puntaje = 85;
        if (puntaje >= 80) {
            System.out.println("Aprobado");
        } else {
            System.out.println("Reprobado");
        }
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Control de temperatura',
          code: `public class Main {\n    public static void main(String[] args) {\n        int temp = 35;\n        if (temp > 30) {\n            System.out.println("Calor");\n        } else {\n            System.out.println("Templado");\n        }\n    }\n}`,
          explanation: 'Evalúa la temperatura y selecciona la rama correspondiente.'
        }
      ],
      exercise: {
        id: 'java-4',
        instruction: 'Construye desde cero un programa en Java que declare `int edad = 18;`. Si la edad es mayor o igual a 18, debe imprimir "Mayor", de lo contrario "Menor".',
        starterCode: `// Escribe tu programa en Java desde cero
// Estructura la clase Main y evalúa edad >= 18 con if/else
`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 18;\n        if (edad >= 18) {\n            System.out.println("Mayor");\n        } else {\n            System.out.println("Menor");\n        }\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Mayor', description: 'Para edad 18 debe imprimir Mayor' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Bucles Iterativos (for)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Repetición de bloques mediante el bucle for en Java.',
      theoryMarkdown: `
### El bucle for en Java

El bucle \`for\` permite repetir un bloque de código un número conocido de veces.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println(i);
        }
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Conteo regresivo',
          code: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 3; i >= 1; i--) {\n            System.out.println("Cuenta: " + i);\n        }\n    }\n}`,
          explanation: 'Itera de forma decreciente desde 3 hasta 1.'
        }
      ],
      exercise: {
        id: 'java-5',
        instruction: 'Escribe desde cero un programa en Java que use un bucle `for` para sumar los números del 1 al 5 inclusive e imprima la suma total (15).',
        starterCode: `// Escribe tu programa en Java desde cero
// Declara suma = 0, itera con for del 1 al 5 e imprime suma
`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int suma = 0;\n        for(int i = 1; i <= 5; i++) {\n            suma += i;\n        }\n        System.out.println(suma);\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '15', description: 'La suma de 1 al 5 debe dar 15' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. Métodos Estáticos y Parámetros',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Creación de métodos estáticos auxiliares en la clase Main.',
      theoryMarkdown: `
### Métodos en Java

Los métodos permiten dividir la lógica en bloques reutilizables. Si se invocan desde \`main()\`, deben declararse como \`public static\`.

\`\`\`java
public class Main {
    public static int sumar(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(sumar(10, 20));
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Método para duplicar un número',
          code: `public class Main {\n    public static int duplicar(int n) {\n        return n * 2;\n    }\n    public static void main(String[] args) {\n        System.out.println(duplicar(8));\n    }\n}`,
          explanation: 'Define el método estático duplicar e imprime su resultado.'
        }
      ],
      exercise: {
        id: 'java-6',
        instruction: 'Construye desde cero un programa en Java que cree el método `public static int multiplicar(int a, int b) { return a * b; }`. En `main()`, imprime `multiplicar(6, 7)` (debe dar 42).',
        starterCode: `// Escribe tu programa en Java desde cero
// Define la clase Main, el método multiplicar y llama a multiplicar(6, 7) en main()
`,
        solutionCode: `public class Main {\n    public static int multiplicar(int a, int b) {\n        return a * b;\n    }\n    public static void main(String[] args) {\n        System.out.println(multiplicar(6, 7));\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '42', description: '6 * 7 debe ser 42' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Encapsulamiento con Getters y Setters',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Uso de private, getters y setters para proteger datos de clase.',
      theoryMarkdown: `
### Encapsulamiento en POO

El encapsulamiento oculta el estado interno de un objeto marcando sus atributos como \`private\` y exponiéndolos mediante métodos públicos de acceso (\`getters\`) y modificación (\`setters\`).

\`\`\`java
class Usuario {
    private String nombre;
    public String getNombre() { return nombre; }
    public void setNombre(String n) { this.nombre = n; }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Clase Producto con encapsulamiento',
          code: `class Producto {\n    private int precio;\n    public int getPrecio() { return precio; }\n    public void setPrecio(int p) { this.precio = p; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Producto prod = new Producto();\n        prod.setPrecio(150);\n        System.out.println(prod.getPrecio());\n    }\n}`,
          explanation: 'Protege el campo precio y permite manipularlo vía getters/setters.'
        }
      ],
      exercise: {
        id: 'java-7',
        instruction: 'Escribe un programa en Java desde cero con la clase `Cuenta` que posea un atributo privado `double saldo`, su getter `getSaldo()` y setter `setSaldo(double s)`. En `main()`, crea la cuenta, asigna saldo `500.0` e imprímelo.',
        starterCode: `// Escribe tu programa en Java desde cero
// Define la clase Cuenta y en Main prueba setSaldo(500.0) y getSaldo()
`,
        solutionCode: `class Cuenta {\n    private double saldo;\n    public double getSaldo() { return saldo; }\n    public void setSaldo(double s) { this.saldo = s; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Cuenta c = new Cuenta();\n        c.setSaldo(500.0);\n        System.out.println(c.getSaldo());\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '500.0', description: 'Imprime 500.0' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Constructores y Métodos toString()',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Inicialización de objetos y la anotación @Override en toString().',
      theoryMarkdown: `
### Constructores y Sobrescritura de toString()

Los constructores inicializan atributos al instanciar con \`new\`. Sobrescribir \`toString()\` permite definir cómo se imprime el objeto.

\`\`\`java
class Vehiculo {
    private String marca;
    public Vehiculo(String marca) { this.marca = marca; }
    @Override
    public String toString() { return "Vehiculo: " + marca; }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Imprimir objeto con toString()',
          code: `public class Main {\n    public static void main(String[] args) {\n        Vehiculo v = new Vehiculo("Ford");\n        System.out.println(v);\n    }\n}`,
          explanation: 'System.out.println llama automáticamente al método toString() del objeto.'
        }
      ],
      exercise: {
        id: 'java-8',
        instruction: 'Crea desde cero un programa en Java con la clase `Libro` con constructor `Libro(String titulo)` y `@Override public String toString() { return "Libro: " + titulo; }`. En `main()`, imprime `new Libro("Quijote")`.',
        starterCode: `// Escribe tu programa en Java desde cero
// Define la clase Libro y en Main imprime new Libro("Quijote")
`,
        solutionCode: `class Libro {\n    private String titulo;\n    public Libro(String t) { this.titulo = t; }\n    @Override\n    public String toString() { return "Libro: " + titulo; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new Libro("Quijote"));\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Libro: Quijote', description: 'Debe imprimir Libro: Quijote' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Herencia con extends y @Override',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Reutilización y extensión de clases mediante herencia.',
      theoryMarkdown: `
### Herencia en Java

Una clase hija hereda características de una superclase mediante la palabra clave \`extends\`.

\`\`\`java
class Animal {
    public void hablar() { System.out.println("Sonido"); }
}

class Gato extends Animal {
    @Override
    public void hablar() { System.out.println("Miau"); }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Polimorfismo con figura',
          code: `class Figura {\n    public void dibujar() { System.out.println("Figura"); }\n}\nclass Circulo extends Figura {\n    @Override\n    public void dibujar() { System.out.println("Circulo"); }\n}`,
          explanation: 'Circulo sobrescribe el método dibujar de la superclase Figura.'
        }
      ],
      exercise: {
        id: 'java-9',
        instruction: 'Escribe un programa en Java desde cero con la clase `Vehiculo` y su método `acelerar()` ("Vrum"), y la subclase `Invertir` que sobrescriba `acelerar()` imprimiendo "Acelerando veloz". En `main()`, ejecuta `acelerar()` de una instancia de `Invertir`.',
        starterCode: `// Escribe tu programa en Java desde cero
// Define Vehiculo e Invertir, e invoca acelerar()
`,
        solutionCode: `class Vehiculo {\n    public void acelerar() { System.out.println("Vrum"); }\n}\nclass Invertir extends Vehiculo {\n    @Override\n    public void acelerar() { System.out.println("Acelerando veloz"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vehiculo v = new Invertir();\n        v.acelerar();\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Acelerando veloz', description: 'Debe imprimir Acelerando veloz' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Interfaces y la palabra implements',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Definición de contratos formales mediante interfaces.',
      theoryMarkdown: `
### Interfaces en Java

Una interfaz define los métodos abstractos que una clase debe implementar mediante la palabra clave \`implements\`.

\`\`\`java
interface Imprimible {
    void imprimir();
}

class Documento implements Imprimible {
    public void imprimir() { System.out.println("Imprimiendo..."); }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Interfaz Conectable',
          code: `interface Conectable {\n    void conectar();\n}\nclass Red implements Conectable {\n    public void conectar() { System.out.println("Conectado"); }\n}`,
          explanation: 'Red implementa la interfaz Conectable.'
        }
      ],
      exercise: {
        id: 'java-10',
        instruction: 'Crea un programa en Java desde cero con la interfaz `Reseteable` y su método `void reset()`. Implementa la clase `Contador` que al llamar a `reset()` imprima "Contador a cero". En `main()`, ejecuta `reset()`.',
        starterCode: `// Escribe tu programa en Java desde cero
// Define la interfaz Reseteable y la clase Contador que la implemente
`,
        solutionCode: `interface Reseteable {\n    void reset();\n}\nclass Contador implements Reseteable {\n    public void reset() { System.out.println("Contador a cero"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Reseteable r = new Contador();\n        r.reset();\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Contador a cero', description: 'Debe imprimir Contador a cero' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. Listas Dinámicas (java.util.ArrayList)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Uso de la colección ArrayList importada de java.util.',
      theoryMarkdown: `
### Manejo de ArrayList

Para usar \`ArrayList\`, debes importar la biblioteca \`import java.util.ArrayList;\` y \`import java.util.List;\`.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("Uno");
        System.out.println(items.size());
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Operaciones en ArrayList',
          code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> frutas = new ArrayList<>();\n        frutas.add("Manzana");\n        System.out.println(frutas.get(0));\n    }\n}`,
          explanation: 'Inserta un elemento y lo recupera por su posición.'
        }
      ],
      exercise: {
        id: 'java-11',
        instruction: 'Escribe un programa en Java desde cero que importe `java.util.*`, cree una `List<Integer> nums = new ArrayList<>()`, inserte los números 10, 20 y 30 e imprima su tamaño con `nums.size()` (3).',
        starterCode: `// Escribe tu programa en Java desde cero
// Importa java.util.*, define Main, instancia ArrayList<Integer> e imprime size()
`,
        solutionCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>();\n        nums.add(10);\n        nums.add(20);\n        nums.add(30);\n        System.out.println(nums.size());\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '3', description: 'El tamaño de la lista debe ser 3' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Colecciones HashMap<K, V>',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Estructuras de datos clave-valor con java.util.HashMap.',
      theoryMarkdown: `
### Colección HashMap

Almacena pares clave-valor permitiendo una búsqueda rápida por clave. Requiere \`import java.util.HashMap;\`.

\`\`\`java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> puntos = new HashMap<>();
puntos.put("Jugador1", 100);
System.out.println(puntos.get("Jugador1"));
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Diccionario de precios',
          code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Double> precios = new HashMap<>();\n        precios.put("Pan", 1.50);\n        System.out.println(precios.get("Pan"));\n    }\n}`,
          explanation: 'Almacena clave string con valor double.'
        }
      ],
      exercise: {
        id: 'java-12',
        instruction: 'Crea desde cero un programa en Java que importe `java.util.*`, cree un `HashMap<String, String> capitales`, asocie `"España" -> "Madrid"` e imprima `capitales.get("España")`.',
        starterCode: `// Escribe tu programa en Java desde cero
// Importa java.util.*, crea el HashMap en Main e imprime el valor obtenido
`,
        solutionCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, String> capitales = new HashMap<>();\n        capitales.put("España", "Madrid");\n        System.out.println(capitales.get("España"));\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Madrid', description: 'Debe imprimir Madrid' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Manejo de Excepciones (try - catch)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Captura de errores en tiempo de ejecución con try y catch.',
      theoryMarkdown: `
### Excepciones en Java

Un bloque \`try-catch\` permite interceptar excepciones (como \`ArithmeticException\`) para evitar el colapso del programa.

\`\`\`java
try {
    int res = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error capturado");
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Captura de conversión fallida',
          code: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt("abc");\n        } catch (NumberFormatException e) {\n            System.out.println("No es un numero");\n        }\n    }\n}`,
          explanation: 'Atrapa NumberFormatException al intentar parsear "abc".'
        }
      ],
      exercise: {
        id: 'java-13',
        instruction: 'Construye desde cero un programa en Java con un bloque `try-catch` que intente realizar la división entera `10 / 0`. Al capturar `ArithmeticException`, debe imprimir "Error aritmetico".',
        starterCode: `// Escribe tu programa en Java desde cero
// Crea Main con bloque try / catch (ArithmeticException e)
`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Error aritmetico");\n        }\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: 'Error aritmetico', description: 'Debe capturar la excepción e imprimir Error aritmetico' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Expresiones Lambda en Java',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Sintaxis de lambdas (parametros) -> expresion en Java.',
      theoryMarkdown: `
### Lambdas en Java

Introducidas en Java 8, permiten pasar bloques de código de manera concisa.
Sintaxis: \`(param) -> expresion\`

\`\`\`java
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> items = List.of("A", "B");
        items.forEach(x -> System.out.println(x));
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Operación funcional con List.of',
          code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = List.of(5, 10);\n        nums.forEach(n -> System.out.println(n + 1));\n    }\n}`,
          explanation: 'Imprime cada número de la lista incrementado en 1.'
        }
      ],
      exercise: {
        id: 'java-14',
        instruction: 'Escribe desde cero un programa en Java que use `List.of(1, 2, 3).forEach(n -> System.out.print(n * 2 + " "));` para imprimir sus dobles separados por espacios ("2 4 6 ").',
        starterCode: `// Escribe tu programa en Java desde cero
// Importa java.util.*, define Main y ejecuta la lambda con List.of(1, 2, 3)
`,
        solutionCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List.of(1, 2, 3).forEach(n -> System.out.print(n * 2 + " "));\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '2 4 6 ', description: 'Imprime 2 4 6 ' }
        ]
      }
    },
    {
      id: 15,
      title: '15. API de Streams (filter y count)',
      level: 'Avanzado',
      durationMinutes: 35,
      summary: 'Procesamiento declarativo de colecciones con la API Stream.',
      theoryMarkdown: `
### Streams en Java

Permite procesar colecciones mediante operaciones encadenadas como \`filter()\`, \`map()\` y \`count()\`.

\`\`\`java
import java.util.List;

public class Main {
    public static void main(String[] args) {
        long cuenta = List.of(1, 2, 3, 4)
            .stream()
            .filter(n -> n % 2 == 0)
            .count();
        System.out.println(cuenta); // 2
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Filtrar cadenas por longitud',
          code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        long largos = List.of("Java", "C", "Python")\n            .stream()\n            .filter(s -> s.length() > 3)\n            .count();\n        System.out.println(largos);\n    }\n}`,
          explanation: 'Cuenta cuántas cadenas tienen más de 3 caracteres.'
        }
      ],
      exercise: {
        id: 'java-15',
        instruction: 'Construye desde cero un programa en Java que partiendo de `List.of(10, 15, 20)` use `.stream().filter(n -> n > 12).count()` e imprima el total de elementos que cumplen la condición (2).',
        starterCode: `// Escribe tu programa en Java desde cero
// Importa java.util.*, crea Main y procesa el Stream con filter y count
`,
        solutionCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        long res = List.of(10, 15, 20).stream().filter(n -> n > 12).count();\n        System.out.println(res);\n    }\n}`,
        testCases: [
          { id: '1', expectedOutput: '2', description: 'Debe imprimir 2' }
        ]
      }
    }
  ]
};
