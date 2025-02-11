/*-- Variables y clases --*/
let cuestionarios = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let userAnswers = [];


// clase para la generación de preguntas del formulario
class Cuestionario {
  constructor(pregunta, respuestas, correcta) {
    this.pregunta = pregunta;
    this.respuestas = respuestas;
    this.correcta = correcta;
  }

  getPregunta() {
    return this.pregunta;
  }

  getRespuestas() {
    return this.respuestas;
  }

  getCorrecta() {
    return this.correcta;
  }

  esRespuestaCorrecta(respuestaSeleccionada) {
    return respuestaSeleccionada === this.correcta;
  }

  // metodo para generar un listado aleatorio de preguntas
  static generarListadoAleatorio(numeroPreguntas) {
    if (numeroPreguntas < 10 || numeroPreguntas > 40) {
      console.log("El número de preguntas debe estar entre 10 y 40.");
      return [];
    }

    const preguntasAleatorias = [];
    const preguntasDisponibles = [...preguntas];
    for (let i = 0; i < numeroPreguntas; i++) {
      const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
      const preguntaSeleccionada = preguntasDisponibles.splice(indiceAleatorio, 1)[0];
      const cuestionario = new Cuestionario(preguntaSeleccionada.pregunta, preguntaSeleccionada.respuestas, preguntaSeleccionada.correcta);
      preguntasAleatorias.push(cuestionario);
    }
    return preguntasAleatorias;
  }
}


 /*-- Funciones --*/
function startQuiz() {
  const numPreguntas = parseInt(document.getElementById('num-preguntas').value);
  if (numPreguntas >= 10 && numPreguntas <= 40) {
    cuestionarios = Cuestionario.generarListadoAleatorio(numPreguntas);
    document.getElementById('start-section').classList.add('hidden');
    document.getElementById('questions-section').classList.remove('hidden');
    document.getElementById('total-questions').textContent = numPreguntas;
    showQuestion();
  } else {
    alert("Por favor, ingrese un número de preguntas entre 10 y 40.");
  }
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    userAnswers.push(parseInt(selectedAnswer.value));
    if (cuestionarios[currentQuestionIndex].esRespuestaCorrecta(parseInt(selectedAnswer.value))) {
      correctAnswers++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < cuestionarios.length) {
      showQuestion();
    } else {
      showResults();
    }
  } else {
    alert("Por favor, selecciona una respuesta.");
  }
}

function restartQuiz() {
  location.reload();
}

function showQuestion() {
  const cuestionario = cuestionarios[currentQuestionIndex];
  document.getElementById('question-text').textContent = cuestionario.getPregunta();
  document.getElementById('current-question-number').textContent = currentQuestionIndex + 1;
  const answersList = document.getElementById('answers-list');
  answersList.innerHTML = '';
  cuestionario.getRespuestas().forEach((respuesta, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="radio" name="answer" value="${index}" /> ${respuesta}`;
    answersList.appendChild(li);
  });
}

function showResults() {
  document.getElementById('questions-section').classList.add('hidden');
  document.getElementById('results-section').classList.remove('hidden');
  document.getElementById('correct-answers').textContent = `Preguntas acertadas: ${correctAnswers}`;
  document.getElementById('incorrect-answers').textContent = `Preguntas falladas: ${cuestionarios.length - correctAnswers}`;
  document.getElementById('score').textContent = `Puntuación: ${Math.round((correctAnswers / cuestionarios.length) * 100)}%`;
}
