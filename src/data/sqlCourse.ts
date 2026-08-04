import { Course } from '../types';

export const sqlCourse: Course = {
  id: 'sql',
  title: 'SQL',
  iconName: 'Database',
  description: 'Domina las bases de datos relacionales con SQL: consultas SELECT, WHERE, JOINs, agregaciones, subconsultas y transacciones.',
  color: 'from-sky-600 to-cyan-700',
  badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  totalLessons: 15,
  prerequisites: ['Conceptos básicos de tablas de datos'],
  skillsGained: ['Consultas SELECT y Filtrado WHERE', 'Agregación con GROUP BY y HAVING', 'JOINs (INNER, LEFT, RIGHT, FULL)', 'Modificación DML (INSERT, UPDATE, DELETE)', 'Modelado DDL y Transacciones'],
  lessons: [
    {
      id: 1,
      title: '1. Introducción a SQL y Consulta SELECT básica',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Estructura de bases de datos relacionales y la sentencia SELECT.',
      theoryMarkdown: `
### Fundamentos de SQL

SQL (*Structured Query Language*) es el lenguaje estándar para interactuar con bases de datos relacionales. La sentencia básica de lectura es \`SELECT\`.

#### Sintaxis:
\`\`\`sql
SELECT columna1, columna2 FROM nombre_tabla;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Seleccionar catálogo de productos',
          code: `SELECT nombre, precio FROM productos;`,
          explanation: 'Consulta únicamente las columnas nombre y precio de la tabla productos.'
        }
      ],
      exercise: {
        id: 'sql-1',
        instruction: 'Escribe una consulta SQL desde cero para seleccionar las columnas `nombre` y `email` de la tabla `clientes`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza SELECT columna1, columna2 FROM tabla;
`,
        solutionCode: `SELECT nombre, email FROM clientes;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT nombre, email FROM clientes;', description: 'Consulta SELECT de nombre y email en clientes' }
        ]
      }
    },
    {
      id: 2,
      title: '2. Filtrado con la Cláusula WHERE',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Filtrado de filas según condiciones numéricas o de texto.',
      theoryMarkdown: `
### La Cláusula WHERE

Filtra los registros de una tabla para conservar únicamente aquellos que cumplen la condición lógica indicada.

\`\`\`sql
SELECT * FROM productos WHERE precio > 100;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Filtrar por continente',
          code: `SELECT * FROM paises WHERE continente = 'Europa';`,
          explanation: 'Los valores de texto se encierran entre comillas simples.'
        }
      ],
      exercise: {
        id: 'sql-2',
        instruction: 'Escribe desde cero una consulta SQL que seleccione todos los campos (\`*\`) de la tabla `empleados` donde el `departamento` sea igual a `"Ventas"`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Usa SELECT * FROM empleados WHERE ...
`,
        solutionCode: `SELECT * FROM empleados WHERE departamento = 'Ventas';`,
        testCases: [
          { id: '1', expectedOutput: "SELECT * FROM empleados WHERE departamento = 'Ventas';", description: 'Consulta filtrada por departamento Ventas' }
        ]
      }
    },
    {
      id: 3,
      title: '3. Ordenamiento (ORDER BY) y Límites (LIMIT)',
      level: 'Básico',
      durationMinutes: 15,
      summary: 'Ordenamiento ascendente/descendente y restricción de registros.',
      theoryMarkdown: `
### Ordenamiento y Paginación

- \`ORDER BY columna DESC\`: Ordena de mayor a menor.
- \`LIMIT n\`: Restringe el resultado a los primeros \`n\` registros.

\`\`\`sql
SELECT * FROM productos ORDER BY precio DESC LIMIT 5;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Obtener la mejor nota',
          code: `SELECT nombre FROM alumnos ORDER BY nota DESC LIMIT 1;`,
          explanation: 'Ordena descendentemente por nota y selecciona únicamente al primero.'
        }
      ],
      exercise: {
        id: 'sql-3',
        instruction: 'Escribe desde cero una consulta SQL para obtener `nombre` y `salario` de la tabla `empleados`, ordenados por `salario` de forma descendente (\`DESC\`), limitando a los 3 primeros registros.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Usa ORDER BY salario DESC LIMIT 3
`,
        solutionCode: `SELECT nombre, salario FROM empleados ORDER BY salario DESC LIMIT 3;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT nombre, salario FROM empleados ORDER BY salario DESC LIMIT 3;', description: 'Ordenamiento DESC con LIMIT 3' }
        ]
      }
    },
    {
      id: 4,
      title: '4. Filtros de Rango con BETWEEN',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Verificación de rangos numéricos inclusivos con BETWEEN.',
      theoryMarkdown: `
### El operador BETWEEN

Evalúa si un valor se encuentra dentro de un intervalo inclusivo de dos valores.

\`\`\`sql
SELECT * FROM productos WHERE precio BETWEEN 10 AND 50;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Rangos de edad',
          code: `SELECT * FROM usuarios WHERE edad BETWEEN 18 AND 30;`,
          explanation: 'Filtra usuarios cuya edad está entre 18 y 30 años inclusivo.'
        }
      ],
      exercise: {
        id: 'sql-4',
        instruction: 'Construye desde cero una consulta SQL para seleccionar todos los campos de `productos` cuyo `precio` se encuentre entre 20 y 50 usando el operador `BETWEEN`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza WHERE precio BETWEEN 20 AND 50;
`,
        solutionCode: `SELECT * FROM productos WHERE precio BETWEEN 20 AND 50;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT * FROM productos WHERE precio BETWEEN 20 AND 50;', description: 'Consulta con BETWEEN 20 AND 50' }
        ]
      }
    },
    {
      id: 5,
      title: '5. Funciones de Agregación (AVG) y Alias (AS)',
      level: 'Básico',
      durationMinutes: 20,
      summary: 'Cálculo de promedios numéricos con asignación de alias.',
      theoryMarkdown: `
### Funciones de Agregación

Las funciones de agregación como \`AVG()\` calculan un valor resumido a partir de un conjunto de filas. Se asigna un nombre a la columna de salida usando \`AS\`.

\`\`\`sql
SELECT AVG(precio) AS precio_promedio FROM productos;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Total de ventas con SUM',
          code: `SELECT SUM(monto) AS total_ventas FROM ordenes;`,
          explanation: 'Suma el total acumulado en la columna monto renombrándola como total_ventas.'
        }
      ],
      exercise: {
        id: 'sql-5',
        instruction: 'Escribe una consulta SQL desde cero que calcule el precio promedio de la tabla `productos` renombrando la columna resultante como `promedio` (`AVG(precio) AS promedio`).',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza SELECT AVG(precio) AS promedio FROM productos;
`,
        solutionCode: `SELECT AVG(precio) AS promedio FROM productos;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT AVG(precio) AS promedio FROM productos;', description: 'Calcula AVG(precio) AS promedio' }
        ]
      }
    },

    // Medio
    {
      id: 6,
      title: '6. Agrupación de Registros con GROUP BY',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Agrupamiento de filas e información agregada.',
      theoryMarkdown: `
### La Cláusula GROUP BY

Agrupa filas con valores idénticos en las columnas especificadas para permitir aplicar funciones de agregación sobre cada grupo.

\`\`\`sql
SELECT departamento, SUM(salario) AS total_salario 
FROM empleados 
GROUP BY departamento;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Conteo de productos por categoría',
          code: `SELECT categoria, COUNT(*) AS total FROM productos GROUP BY categoria;`,
          explanation: 'Cuenta cuántos productos existen por cada categoría.'
        }
      ],
      exercise: {
        id: 'sql-6',
        instruction: 'Construye desde cero una consulta SQL que seleccione `departamento` y el total acumulado de salarios `SUM(salario) AS total_salario` de la tabla `empleados` agrupadolos por `departamento`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Usa SELECT departamento, SUM(salario) AS total_salario FROM empleados GROUP BY departamento;
`,
        solutionCode: `SELECT departamento, SUM(salario) AS total_salario FROM empleados GROUP BY departamento;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT departamento, SUM(salario) AS total_salario FROM empleados GROUP BY departamento;', description: 'GROUP BY departamento válido' }
        ]
      }
    },
    {
      id: 7,
      title: '7. Filtrado de Grupos con HAVING',
      level: 'Medio',
      durationMinutes: 25,
      summary: 'Condiciones sobre funciones agregadas en grupos.',
      theoryMarkdown: `
### La Cláusula HAVING

Mientras que \`WHERE\` me permite filtrar filas individuales antes de agrupar, \`HAVING\` filtra los grupos resultantes tras aplicar la agregación.

\`\`\`sql
SELECT categoria, COUNT(*) AS total 
FROM productos 
GROUP BY categoria 
HAVING COUNT(*) > 5;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Departamentos con alto salario promedio',
          code: `SELECT dept, AVG(salario) FROM emp GROUP BY dept HAVING AVG(salario) > 3000;`,
          explanation: 'Conserva solo los departamentos cuyo salario medio supera los 3000.'
        }
      ],
      exercise: {
        id: 'sql-7',
        instruction: 'Escribe una consulta SQL desde cero que seleccione `categoria` y `COUNT(*) AS total` de la tabla `productos`, agrupando por `categoria` y conservando únicamente los grupos con `HAVING COUNT(*) > 5`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Aplica GROUP BY categoria HAVING COUNT(*) > 5;
`,
        solutionCode: `SELECT categoria, COUNT(*) AS total FROM productos GROUP BY categoria HAVING COUNT(*) > 5;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT categoria, COUNT(*) AS total FROM productos GROUP BY categoria HAVING COUNT(*) > 5;', description: 'Consulta con HAVING COUNT(*) > 5' }
        ]
      }
    },
    {
      id: 8,
      title: '8. Combinación de Tablas con INNER JOIN',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Unión de tablas mediante claves foráneas coincidentes.',
      theoryMarkdown: `
### INNER JOIN

Combina registros de dos tablas basándose en una clave compartida presente en ambas tablas.

\`\`\`sql
SELECT e.nombre, d.nombre_dept 
FROM empleados e 
INNER JOIN departamentos d ON e.departamento_id = d.id;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Pedidos y Clientes',
          code: `SELECT p.id, c.nombre FROM pedidos p INNER JOIN clientes c ON p.cliente_id = c.id;`,
          explanation: 'Muestra el ID de pedido junto con el nombre del cliente correspondientes.'
        }
      ],
      exercise: {
        id: 'sql-8',
        instruction: 'Construye desde cero una consulta con `INNER JOIN` entre la tabla `empleados e` y `departamentos d` mediante `e.departamento_id = d.id`, seleccionando `e.nombre` y `d.nombre_dept`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Aplica INNER JOIN d ON e.departamento_id = d.id
`,
        solutionCode: `SELECT e.nombre, d.nombre_dept FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT e.nombre, d.nombre_dept FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id;', description: 'INNER JOIN correcto entre tablas' }
        ]
      }
    },
    {
      id: 9,
      title: '9. Preservación con LEFT JOIN',
      level: 'Medio',
      durationMinutes: 30,
      summary: 'Retorno de todos los registros de la tabla izquierda.',
      theoryMarkdown: `
### LEFT JOIN

Retorna todos los registros de la tabla de la izquierda y los datos coincidentes de la derecha. Si no hay coincidencia, devuelve \`NULL\`.

\`\`\`sql
SELECT c.nombre, p.id 
FROM clientes c 
LEFT JOIN pedidos p ON c.id = p.cliente_id;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Productos sin ventas',
          code: `SELECT pr.nombre, v.id FROM productos pr LEFT JOIN ventas v ON pr.id = v.producto_id;`,
          explanation: 'Lista todos los productos incluyendo aquellos que no registran ventas.'
        }
      ],
      exercise: {
        id: 'sql-9',
        instruction: 'Escribe desde cero una consulta SQL que realice un `LEFT JOIN` entre `clientes c` y `pedidos p` usando `ON c.id = p.cliente_id`, seleccionando `c.nombre` y `p.id`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza LEFT JOIN pedidos p ON c.id = p.cliente_id
`,
        solutionCode: `SELECT c.nombre, p.id FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id;`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT c.nombre, p.id FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id;', description: 'Consulta LEFT JOIN correcta' }
        ]
      }
    },
    {
      id: 10,
      title: '10. Inserción de Datos con INSERT INTO',
      level: 'Medio',
      durationMinutes: 20,
      summary: 'Inserción de nuevos registros en tablas.',
      theoryMarkdown: `
### Sentencia INSERT INTO

Agrega nuevas filas a una tabla de la base de datos indicando las columnas y sus valores.

\`\`\`sql
INSERT INTO clientes (nombre, ciudad) VALUES ('Laura', 'Madrid');
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Alta de usuario',
          code: `INSERT INTO usuarios (username, rol) VALUES ('admin', 'superuser');`,
          explanation: 'Inserta un registro en la tabla usuarios asignando username y rol.'
        }
      ],
      exercise: {
        id: 'sql-10',
        instruction: 'Escribe la sentencia SQL desde cero para insertar en la tabla `clientes` con campos `(nombre, ciudad)` los valores `(\'Laura\', \'Madrid\')`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza INSERT INTO clientes (nombre, ciudad) VALUES ...
`,
        solutionCode: `INSERT INTO clientes (nombre, ciudad) VALUES ('Laura', 'Madrid');`,
        testCases: [
          { id: '1', expectedOutput: "INSERT INTO clientes (nombre, ciudad) VALUES ('Laura', 'Madrid');", description: 'Inserción INSERT INTO válida' }
        ]
      }
    },

    // Avanzado
    {
      id: 11,
      title: '11. Actualización de Datos con UPDATE',
      level: 'Avanzado',
      durationMinutes: 25,
      summary: 'Modificación controlada de registros con la cláusula WHERE.',
      theoryMarkdown: `
### Sentencia UPDATE

Modifica los valores de una o más columnas en registros existentes. **Precaución**: Incluye siempre la cláusula \`WHERE\` para no alterar todas las filas.

\`\`\`sql
UPDATE usuarios SET estado = 'Inactivo' WHERE id = 10;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Ajuste de precio de producto',
          code: `UPDATE productos SET precio = 89.99 WHERE id = 4;`,
          explanation: 'Actualiza el precio del producto específico cuyo id es 4.'
        }
      ],
      exercise: {
        id: 'sql-11',
        instruction: 'Escribe desde cero la sentencia SQL `UPDATE` para cambiar el campo `estado` a `\'Inactivo\'` en la tabla `usuarios` únicamente donde `id = 10`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza UPDATE usuarios SET estado = 'Inactivo' WHERE id = 10;
`,
        solutionCode: `UPDATE usuarios SET estado = 'Inactivo' WHERE id = 10;`,
        testCases: [
          { id: '1', expectedOutput: "UPDATE usuarios SET estado = 'Inactivo' WHERE id = 10;", description: 'UPDATE con WHERE exacto' }
        ]
      }
    },
    {
      id: 12,
      title: '12. Subconsultas Comparativas (Subqueries)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Consultas anidadas en cláusulas WHERE.',
      theoryMarkdown: `
### Subconsultas

Una subconsulta es una instrucción \`SELECT\` anidada dentro de otra consulta principal para calcular valores dinámicos.

\`\`\`sql
SELECT nombre FROM productos 
WHERE precio > (SELECT AVG(precio) FROM productos);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Empleados con sueldo superior a la media',
          code: `SELECT nombre, salario FROM empleados WHERE salario > (SELECT AVG(salario) FROM empleados);`,
          explanation: 'Compara el salario de cada empleado contra el promedio general calculado por la subconsulta.'
        }
      ],
      exercise: {
        id: 'sql-12',
        instruction: 'Construye desde cero una consulta SQL que seleccione `nombre` de `productos` cuyo `precio` sea estrictamente mayor al precio promedio general (`WHERE precio > (SELECT AVG(precio) FROM productos)`).',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Anida (SELECT AVG(precio) FROM productos) dentro del WHERE
`,
        solutionCode: `SELECT nombre FROM productos WHERE precio > (SELECT AVG(precio) FROM productos);`,
        testCases: [
          { id: '1', expectedOutput: 'SELECT nombre FROM productos WHERE precio > (SELECT AVG(precio) FROM productos);', description: 'Subconsulta con promedio correcto' }
        ]
      }
    },
    {
      id: 13,
      title: '13. Creación de Tablas (CREATE TABLE)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Definición de esquemas de tablas DDL con tipos y restricciones.',
      theoryMarkdown: `
### Sentencia CREATE TABLE

Define la estructura de una nueva tabla especificando nombres de columnas, tipos de datos y restricciones como \`PRIMARY KEY\` o \`NOT NULL\`.

\`\`\`sql
CREATE TABLE cursos (
    id INT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL
);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Crear tabla de categorías',
          code: `CREATE TABLE categorias (id INT PRIMARY KEY, nombre VARCHAR(30) UNIQUE);`,
          explanation: 'Define la tabla categorias fijando id como clave primaria y nombre único.'
        }
      ],
      exercise: {
        id: 'sql-13',
        instruction: 'Escribe una sentencia SQL desde cero que cree la tabla `cursos` conteniendo las columnas `id INT PRIMARY KEY` y `titulo VARCHAR(50) NOT NULL`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Usa CREATE TABLE cursos (id INT PRIMARY KEY, titulo VARCHAR(50) NOT NULL);
`,
        solutionCode: `CREATE TABLE cursos (id INT PRIMARY KEY, titulo VARCHAR(50) NOT NULL);`,
        testCases: [
          { id: '1', expectedOutput: 'CREATE TABLE cursos (id INT PRIMARY KEY, titulo VARCHAR(50) NOT NULL);', description: 'Creación DDL válida' }
        ]
      }
    },
    {
      id: 14,
      title: '14. Creación de Índices (CREATE INDEX)',
      level: 'Avanzado',
      durationMinutes: 25,
      summary: 'Optimización de velocidad de lectura mediante índices.',
      theoryMarkdown: `
### Optimización con Índices

Los índices son estructuras que aceleran la velocidad de consulta en columnas consultadas con alta frecuencia.

\`\`\`sql
CREATE INDEX idx_categoria ON productos(categoria);
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Crear índice sobre emails de usuarios',
          code: `CREATE INDEX idx_email ON usuarios(email);`,
          explanation: 'Optimiza la búsqueda de usuarios por su correo electrónico.'
        }
      ],
      exercise: {
        id: 'sql-14',
        instruction: 'Escribe desde cero la sentencia SQL para crear un índice denominado `idx_categoria` sobre la columna `categoria` de la tabla `productos`.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Utiliza CREATE INDEX idx_categoria ON productos(categoria);
`,
        solutionCode: `CREATE INDEX idx_categoria ON productos(categoria);`,
        testCases: [
          { id: '1', expectedOutput: 'CREATE INDEX idx_categoria ON productos(categoria);', description: 'Sentencia CREATE INDEX correcta' }
        ]
      }
    },
    {
      id: 15,
      title: '15. Confirmación de Transacciones (COMMIT)',
      level: 'Avanzado',
      durationMinutes: 30,
      summary: 'Consolidación permanente de cambios atómicos en la base de datos.',
      theoryMarkdown: `
### Transacciones y COMMIT

En una transacción SQL, la instrucción \`COMMIT;\` consolida de forma definitiva todas las modificaciones realizadas durante el bloque en la base de datos.

\`\`\`sql
COMMIT;
\`\`\`
`,
      codeExamples: [
        {
          title: 'Ejemplo: Confirmación final de transferencia',
          code: `BEGIN;\nUPDATE cuentas SET saldo = saldo - 50 WHERE id = 1;\nUPDATE cuentas SET saldo = saldo + 50 WHERE id = 2;\nCOMMIT;`,
          explanation: 'Garantiza que ambas operaciones se apliquen de forma conjunta y atómica.'
        }
      ],
      exercise: {
        id: 'sql-15',
        instruction: 'Escribe la instrucción SQL exacta desde cero para confirmar permanentemente todas las operaciones ejecutadas dentro de una transacción.',
        starterCode: `-- Escribe tu consulta SQL desde cero
-- Escribe la sentencia COMMIT;
`,
        solutionCode: `COMMIT;`,
        testCases: [
          { id: '1', expectedOutput: 'COMMIT;', description: 'Debe escribir COMMIT;' }
        ]
      }
    }
  ]
};
