let accionSeleccionada = null;

// Función para mostrar el campo de entrada y seleccionar la acción de invertir oración
function mostrarInversion() {
  accionSeleccionada = "invertir";
  mostrarCampo(false, false);
}

// Función para mostrar el campo de entrada y seleccionar la acción de verificar palíndromo
function mostrarPalindromo() {
  accionSeleccionada = "palindromo";
  mostrarCampo(false, false);
}

// Función para mostrar el campo de entrada y habilitar la entrada para sumar números grandes
function mostrarSumaNumerosGrandes() {
  accionSeleccionada = "sumar";
  mostrarCampo(false, true);
}

// Función para mostrar el campo de entrada y los valores adicionales para reemplazar en pila
function mostrarReemplazar() {
  accionSeleccionada = "reemplazar";
  mostrarCampo(true, false);
  
  // Establecer valores iniciales en la pila
  const pilaInicial = [1, 2, 3, 4, 5]; // Pila inicial
  document.getElementById("textInput").value = pilaInicial.join(', '); // Mostrar la pila
  document.getElementById("outputText").innerText = `Pila inicial: [${pilaInicial.join(', ')}]`; // Mostrar la pila al usuario
}


// Muestra el campo de entrada y limpia los resultados previos
function mostrarCampo(mostrarExtra, mostrarSegundoNumero) {
  document.getElementById("inputSection").style.display = "block";
  document.getElementById("extraInputs").style.display = mostrarExtra ? "block" : "none";
  document.getElementById("secondNumberSection").style.display = mostrarSegundoNumero ? "block" : "none";
  document.getElementById("outputText").innerText = "";
}

// Procesa de acuerdo a la acción seleccionada
// Procesa de acuerdo a la acción seleccionada
// Procesa de acuerdo a la acción seleccionada
function ejecutar() {
  const texto = document.getElementById("textInput").value;

  // Verificar si el texto de entrada es un número para las opciones 3 y 4
  if (accionSeleccionada === "reemplazar" || accionSeleccionada === "sumar") {
    if (!esNumero(texto)) {
      alert("Por favor, ingresa un número válido.");
      return;
    }
  }

  if (accionSeleccionada === "invertir") {
    invertirOracion(texto);
  } else if (accionSeleccionada === "palindromo") {
    verificarPalindromo(texto);
  } else if (accionSeleccionada === "reemplazar") {
    const pila = texto.split(',').map(Number); // Convierte la entrada en un array de enteros
    const viejo = parseInt(document.getElementById("oldValue").value);
    const nuevo = parseInt(document.getElementById("newValue").value);
    reemplazar(pila, viejo, nuevo); // Llamamos a la nueva función Reemplazar
  } else if (accionSeleccionada === "sumar") {
    const numero2 = document.getElementById("textInput2").value;
    if (!esNumero(numero2)) {
      alert("Por favor, ingresa un número válido para el segundo número.");
      return;
    }
    sumarNumerosGrandes(texto, numero2);
  }
}

// Función para verificar si un texto es un número
function esNumero(texto) {
  return !isNaN(texto) && !isNaN(parseFloat(texto));
}


// Función Reemplazar: Reemplaza el valor "viejo" por "nuevo" en la pila
function reemplazar(pila, viejo, nuevo) {
  let pilaAuxiliar = [];

  // Procesa la pila original, reemplazando valores si coincide con "viejo"
  while (pila.length > 0) {
    const elemento = pila.pop();
    if (elemento === viejo) {
      pilaAuxiliar.push(nuevo);
    } else {
      pilaAuxiliar.push(elemento);
    }
  }

  // Restaura la pila original
  while (pilaAuxiliar.length > 0) {
    pila.push(pilaAuxiliar.pop());
  }

  document.getElementById("outputText").innerText += `\nPila después del reemplazo: [${pila.join(', ')}]`; // Mostrar pila después del reemplazo
}

// Invierte la oración utilizando una pila
function invertirOracion(texto) {
  let pila = [];
  for (let char of texto) {
    pila.push(char);
  }
  let textoInvertido = '';
  while (pila.length > 0) {
    textoInvertido += pila.pop();
  }
  document.getElementById("outputText").innerText = `Oración invertida: ${textoInvertido}`;
}

// Verifica si la oración es un palíndromo (ignorando espacios y mayúsculas)
function verificarPalindromo(texto) {
  let textoLimpiado = texto.replace(/\s+/g, '').toLowerCase();
  let pila = [];
  for (let char of textoLimpiado) {
    pila.push(char);
  }
  let textoInvertido = '';
  while (pila.length > 0) {
    textoInvertido += pila.pop();
  }
  const esPalindromo = textoLimpiado === textoInvertido ? "es un palíndromo" : "no es un palíndromo";
  document.getElementById("outputText").innerText = `La oración "${texto}" ${esPalindromo}.`;
}

// Suma dos números grandes utilizando pilas
function sumarNumerosGrandes(numero1, numero2) {
  let pila1 = [];
  let pila2 = [];
  let resultadoPila = [];
  let pasos = '';

  for (let char of numero1) {
    pila1.push(parseInt(char));
  }

  for (let char of numero2) {
    pila2.push(parseInt(char));
  }

  let carry = 0;
  let sumaFinal = '';

  pasos += `<h3>Procedimiento Visual</h3>`;
  pasos += `<div class="step"><strong>Pila 1: [ ${pila1.join(', ')} ]</strong></div>`;
  pasos += `<div class="step"><strong>Pila 2: [ ${pila2.join(', ')} ]</strong></div>`;

  while (pila1.length > 0 || pila2.length > 0 || carry > 0) {
    let digito1 = pila1.length > 0 ? pila1.pop() : 0;
    let digito2 = pila2.length > 0 ? pila2.pop() : 0;

    let suma = digito1 + digito2 + carry;
    resultadoPila.push(suma % 10);
    carry = Math.floor(suma / 10);

    pasos += `<div class="step">`;
    pasos += `<strong>Sumando:</strong> ${digito1} + ${digito2} + (Acarreo: ${carry}) = ${suma % 10}`;
    pasos += `<br><strong>Resultado parcial:</strong> [ ${resultadoPila.join(', ')} ]`;
    pasos += `</div>`;
  }

  while (resultadoPila.length > 0) {
    sumaFinal += resultadoPila.pop().toString();
  }

  document.getElementById("outputText").innerHTML = `<strong>Suma Final:</strong> ${sumaFinal}<br><br>${pasos}`;
}
