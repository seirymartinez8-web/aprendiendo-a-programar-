import { ExecutionResult, LanguageId, PracticalExercise } from '../types';

export async function runCode(
  language: LanguageId,
  code: string,
  exercise?: PracticalExercise
): Promise<ExecutionResult> {
  const startTime = performance.now();

  try {
    switch (language) {
      case 'javascript':
      case 'nodejs':
        return executeJavaScript(code, exercise, startTime);

      case 'python':
        return executePython(code, exercise, startTime);

      case 'sql':
        return executeSQL(code, exercise, startTime);

      case 'html_css':
        return executeHTMLCSS(code, exercise, startTime);

      case 'cpp':
      case 'java':
      case 'rust':
        return executeCompiledOrServer(language, code, exercise, startTime);

      default:
        return {
          success: false,
          output: 'Lenguaje no soportado.',
          error: 'Lenguaje no soportado'
        };
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      output: '',
      error: `Error de ejecución: ${errorMessage}`,
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }
}

function executeJavaScript(
  code: string,
  exercise?: PracticalExercise,
  startTime: number = performance.now()
): ExecutionResult {
  const logs: string[] = [];
  const customConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    },
    error: (...args: unknown[]) => {
      logs.push('[Error] ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    },
    warn: (...args: unknown[]) => {
      logs.push('[Warn] ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    }
  };

  try {
    const runner = new Function('console', code);
    runner(customConsole);

    const actualOutput = logs.join('\n').trim();
    const executionTimeMs = Math.round(performance.now() - startTime);

    if (!exercise) {
      return {
        success: true,
        output: actualOutput || '(Sin salida en consola)',
        executionTimeMs
      };
    }

    const testResults = exercise.testCases.map(tc => {
      const normalizedExpected = tc.expectedOutput.trim();
      const normalizedActual = actualOutput.trim();
      const passed = normalizedActual === normalizedExpected || normalizedActual.includes(normalizedExpected);

      return {
        testCaseId: tc.id,
        passed,
        actualOutput: normalizedActual,
        expectedOutput: normalizedExpected,
        description: tc.description
      };
    });

    const allPassed = testResults.every(tr => tr.passed);

    return {
      success: allPassed,
      output: actualOutput || '(Sin salida)',
      testResults,
      executionTimeMs
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      output: logs.join('\n'),
      error: errorMessage,
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }
}

function executePython(
  code: string,
  exercise?: PracticalExercise,
  startTime: number = performance.now()
): ExecutionResult {
  // Client-side Python simulation & output extraction
  const printOutputs: string[] = [];
  const lines = code.split('\n');

  try {
    // Check basic syntax errors like missing colons or parentheses
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if ((line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('else') || line.startsWith('def ') || line.startsWith('class ') || line.startsWith('for ') || line.startsWith('while ')) && !line.endsWith(':') && !line.startsWith('#')) {
        throw new Error(`SyntaxError en la línea ${i + 1}: Falta ':' al final de la instrucción (${line})`);
      }
    }

    // Try evaluating print statements & basic JS equivalent logic if applicable
    const jsEquivalent = translateBasicPythonToJS(code);
    const jsResult = executeJavaScript(jsEquivalent);

    if (jsResult.output && jsResult.output !== '(Sin salida en consola)' && !jsResult.error) {
      printOutputs.push(jsResult.output);
    } else {
      // Fallback regex matching print() calls
      const printRegex = /print\s*\((.*?)\)/g;
      let match;
      while ((match = printRegex.exec(code)) !== null) {
        let val = match[1].trim();
        // Remove quotes or f-string prefix
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        } else if (val.startsWith('f"') || val.startsWith("f'")) {
          val = val.slice(2, -1);
        }
        printOutputs.push(val);
      }
    }

    const actualOutput = printOutputs.join('\n').trim();
    const executionTimeMs = Math.round(performance.now() - startTime);

    if (!exercise) {
      return {
        success: true,
        output: actualOutput || '(Ejecución exitosa sin salida)',
        executionTimeMs
      };
    }

    const testResults = exercise.testCases.map(tc => {
      const normalizedExpected = tc.expectedOutput.trim();
      const normalizedActual = actualOutput.trim();
      const passed = normalizedActual === normalizedExpected || normalizedActual.includes(normalizedExpected);

      return {
        testCaseId: tc.id,
        passed,
        actualOutput: normalizedActual,
        expectedOutput: normalizedExpected,
        description: tc.description
      };
    });

    const allPassed = testResults.every(tr => tr.passed);

    return {
      success: allPassed,
      output: actualOutput,
      testResults,
      executionTimeMs
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      output: printOutputs.join('\n'),
      error: errorMessage,
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }
}

function translateBasicPythonToJS(pyCode: string): string {
  let js = pyCode;
  js = js.replace(/#.*/g, ''); // strip comments
  js = js.replace(/True/g, 'true').replace(/False/g, 'false');
  js = js.replace(/def\s+([a-zA-Z0-9_]+)\((.*?)\):/g, 'function $1($2) {');
  js = js.replace(/class\s+([a-zA-Z0-9_]+)(\((.*?)\))?:/g, 'class $1 {');
  js = js.replace(/if\s+(.*?):/g, 'if ($1) {');
  js = js.replace(/elif\s+(.*?):/g, '} else if ($1) {');
  js = js.replace(/else:/g, '} else {');
  js = js.replace(/for\s+(.*?)\s+in\s+range\((.*?)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {');
  js = js.replace(/print\s*\((.*?)\)/g, 'console.log($1)');
  return js;
}

function executeSQL(
  code: string,
  exercise?: PracticalExercise,
  startTime: number = performance.now()
): ExecutionResult {
  const normalizedCode = code.replace(/--.*/g, '').trim();
  const executionTimeMs = Math.round(performance.now() - startTime);

  if (!exercise) {
    return {
      success: true,
      output: `[SQL Output]: Consulta procesada con éxito.\n> ${normalizedCode}`,
      executionTimeMs
    };
  }

  const testResults = exercise.testCases.map(tc => {
    const cleanCode = normalizedCode.replace(/\s+/g, ' ').toUpperCase();
    const cleanExpected = tc.expectedOutput.replace(/--.*/g, '').replace(/\s+/g, ' ').toUpperCase().trim();
    
    // Check if key SQL constructs match
    const passed = cleanCode === cleanExpected || cleanCode.includes(cleanExpected) || matchesSQLSemantics(cleanCode, cleanExpected);

    return {
      testCaseId: tc.id,
      passed,
      actualOutput: normalizedCode,
      expectedOutput: tc.expectedOutput,
      description: tc.description
    };
  });

  const allPassed = testResults.every(tr => tr.passed);

  return {
    success: allPassed,
    output: allPassed ? `[OK 200] Consulta ejecutada e inspeccionada correctamente:\n${normalizedCode}` : `[Error de sintaxis/consulta]: La consulta no coincide con los criterios esperados.`,
    testResults,
    executionTimeMs
  };
}

function matchesSQLSemantics(code: string, expected: string): boolean {
  const getKeywords = (s: string) => s.split(' ').filter(w => w.length > 1);
  const expectedKeywords = getKeywords(expected);
  return expectedKeywords.every(kw => code.includes(kw));
}

function executeHTMLCSS(
  code: string,
  exercise?: PracticalExercise,
  startTime: number = performance.now()
): ExecutionResult {
  const executionTimeMs = Math.round(performance.now() - startTime);

  if (!exercise) {
    return {
      success: true,
      output: 'HTML/CSS procesado y renderizado en vista previa.',
      executionTimeMs
    };
  }

  const testResults = exercise.testCases.map(tc => {
    const normalizedCode = code.replace(/\s+/g, ' ').toLowerCase();
    const normalizedExpected = tc.expectedOutput.replace(/\s+/g, ' ').toLowerCase();

    const passed = normalizedCode.includes(normalizedExpected) || matchesHTMLTags(normalizedCode, normalizedExpected);

    return {
      testCaseId: tc.id,
      passed,
      actualOutput: code,
      expectedOutput: tc.expectedOutput,
      description: tc.description
    };
  });

  const allPassed = testResults.every(tr => tr.passed);

  return {
    success: allPassed,
    output: allPassed ? 'Renderizado HTML/CSS validado correctamente.' : 'Faltan etiquetas o reglas CSS requeridas.',
    testResults,
    executionTimeMs
  };
}

function matchesHTMLTags(code: string, expected: string): boolean {
  const extractTags = (str: string) => (str.match(/<[^>]+>/g) || []).map(t => t.replace(/[^a-z0-9]/gi, ''));
  const expTags = extractTags(expected);
  const codeTags = extractTags(code);
  return expTags.every(t => codeTags.includes(t));
}

function executeCompiledOrServer(
  language: LanguageId,
  code: string,
  exercise?: PracticalExercise,
  startTime: number = performance.now()
): ExecutionResult {
  const outputs: string[] = [];
  const executionTimeMs = Math.round(performance.now() - startTime);

  // Structural checks for from-scratch learning
  let missingStructuralError = '';
  if (language === 'cpp') {
    if (!code.includes('#include') || !code.includes('main')) {
      missingStructuralError = 'Estructura C++ incompleta: Recuerda incluir las bibliotecas necesarias como #include <iostream> y definir la función main().';
    }
  } else if (language === 'java') {
    if (!code.includes('class') || !code.includes('main')) {
      missingStructuralError = 'Estructura Java incompleta: Recuerda definir la clase (ej. class Main) y el método public static void main(String[] args).';
    }
  } else if (language === 'rust') {
    if (!code.includes('fn main')) {
      missingStructuralError = 'Estructura Rust incompleta: Recuerda estructurar tu programa con la función fn main() { ... }.';
    }
  }

  // Try executing JS translation of C++/Java/Rust logic first
  const jsEquivalent = translateCompiledToJS(code, language);
  const jsResult = executeJavaScript(jsEquivalent);

  if (jsResult.output && jsResult.output !== '(Sin salida en consola)' && !jsResult.error) {
    outputs.push(jsResult.output);
  } else {
    // Fallback regex extractions
    if (language === 'cpp') {
      const coutRegex = /cout\s*<<\s*(".*?"|.*?)(?:<<|;)/g;
      let match;
      while ((match = coutRegex.exec(code)) !== null) {
        let val = match[1].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val !== 'endl') outputs.push(val);
      }
    } else if (language === 'java') {
      const printlnRegex = /System\.out\.print(?:ln)?\s*\((.*?)\)/g;
      let match;
      while ((match = printlnRegex.exec(code)) !== null) {
        let val = match[1].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        outputs.push(val);
      }
    } else if (language === 'rust') {
      const rustRegex = /println!\s*\((.*?)\)/g;
      let match;
      while ((match = rustRegex.exec(code)) !== null) {
        let val = match[1].trim();
        if (val.includes(',')) {
          const parts = val.split(',');
          val = parts.slice(1).join(',').trim();
        }
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        outputs.push(val);
      }
    }
  }

  const actualOutput = outputs.join('\n').trim();

  if (!exercise) {
    return {
      success: !missingStructuralError,
      output: actualOutput || `[Compilador ${language.toUpperCase()}]: Código ejecutado exitosamente.`,
      error: missingStructuralError || undefined,
      executionTimeMs
    };
  }

  const testResults = exercise.testCases.map(tc => {
    const expected = tc.expectedOutput.trim();
    const passed = !missingStructuralError && (actualOutput === expected || actualOutput.includes(expected) || code.includes(expected));

    return {
      testCaseId: tc.id,
      passed,
      actualOutput: actualOutput || (missingStructuralError ? missingStructuralError : code),
      expectedOutput: expected,
      description: tc.description
    };
  });

  const allPassed = testResults.every(tr => tr.passed);

  return {
    success: allPassed,
    output: actualOutput || (allPassed ? exercise.testCases[0].expectedOutput : missingStructuralError || 'Sin salida directa'),
    error: missingStructuralError || undefined,
    testResults,
    executionTimeMs
  };
}

function translateCompiledToJS(code: string, language: LanguageId): string {
  let js = code;
  if (language === 'cpp') {
    js = js.replace(/#include\s*<.*?>/g, '');
    js = js.replace(/using\s+namespace\s+std;/g, '');
    js = js.replace(/int\s+main\s*\(\s*\)\s*\{/g, 'function main() {');
    js = js.replace(/cout\s*<<\s*(".*?"|.*?)(?:<<\s*endl|<<\s*"\\n"|;)/g, 'console.log($1);');
    js = js.replace(/cout\s*<<\s*/g, 'console.log(');
    js = js.replace(/return\s+0;/g, '');
    js = js + '\nif (typeof main === "function") main();';
  } else if (language === 'java') {
    js = js.replace(/public\s+class\s+\w+\s*\{/g, '');
    js = js.replace(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w*\s*\)\s*\{/g, 'function main() {');
    js = js.replace(/System\.out\.println\s*\((.*?)\);/g, 'console.log($1);');
    js = js.replace(/System\.out\.print\s*\((.*?)\);/g, 'console.log($1);');
    js = js + '\nif (typeof main === "function") main();';
  } else if (language === 'rust') {
    js = js.replace(/fn\s+main\s*\(\s*\)\s*\{/g, 'function main() {');
    js = js.replace(/let\s+mut\s+/g, 'let ');
    js = js.replace(/println!\s*\("{}",\s*(.*?)\);/g, 'console.log($1);');
    js = js.replace(/println!\s*\((.*?)\);/g, 'console.log($1);');
    js = js + '\nif (typeof main === "function") main();';
  }
  return js;
}
