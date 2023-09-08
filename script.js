const letterElement = document.getElementById("letter");
const scoreElement = document.getElementById("score");
const alphabetButtons = document.querySelectorAll(".option");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let score = 0;
let currentType = "letters"; // Inicialmente, las preguntas son letras

const musica = document.getElementById("musica");
const volumeSlider = document.getElementById("volumeSlider");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

// Lista de animales
const animals = ["Perro", "Gato", "Elefante", "Tigre", "León", "Cebra", "Jirafa", "Oso", "Lobo", "Aguila", "Delfin", "Orca", "Panda", "Serpiente", "Hipopótamo", "Rinoceronte", "Camello", "Tortuga", "Araña", "Murciélago", "Pingüino", "Canguro", "Koala", "Lince", "Bisonte", "Avestruz", "Cocodrilo", "Halcón"];

function playMusica() {
    musica.play();
}

function pauseMusica() {
    if (!musica.paused) {
        musica.pause();
    }
}

function adjustVolume(value) {
    const volume = parseFloat(value);
    musica.volume = volume;
}

const maxNumber = 30; // Número máximo que quieres mostrar

function startGame() {
    if (score >= 10 && currentType === "letters") {
        currentType = "numbers"; // Cambiar a números después de 10 puntos
    } else if (score >= 20 && currentType === "numbers") {
        currentType = "animals"; // Cambiar a animales después de 20 puntos
    }

    let items;

    if (currentType === "letters") {
        items = alphabet.slice(0, alphabetButtons.length); // Mostrar letras del abecedario
    } else if (currentType === "numbers") {
        items = Array.from({ length: maxNumber }, (_, i) => (i + 1).toString()); // Mostrar números
    } else if (currentType === "animals") {
        items = animals.slice(0, alphabetButtons.length); // Mostrar animales
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];
    const randomColor = getRandomColor();

    letterElement.textContent = randomItem;
    letterElement.style.color = randomColor;

    // Actualizar los botones de opciones
    alphabetButtons.forEach((button, index) => {
        button.textContent = items[index];
    });

    // Eliminar eventos de clic anteriores
    alphabetButtons.forEach(button => {
        button.removeEventListener("click", clickHandler);
    });

    // Agregar nuevos eventos de clic
    alphabetButtons.forEach(button => {
        button.addEventListener("click", clickHandler);
    });
}

function clickHandler() {
    const selectedLetter = this.textContent; // 'this' se refiere al botón que se hizo clic
    const correctItem = letterElement.textContent;

    if (selectedLetter === correctItem) {
        score++;

        if (score === 10 && currentType === "letters") {
            currentType = "numbers"; // Cambiar a números después de 10 puntos
        }

        alert("¡Correcto!");
    } else {
        alert("Incorrecto. La respuesta correcta era " + correctItem);
    }

    scoreElement.textContent = "Puntuación: " + score;
    startGame();
}

function getRandomColor() {
    const colors = ["red", "blue", "green", "purple", "orange", "pink", "yellow", "brown", "cyan", "magenta"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Configura los botones de reproducción y pausa
playButton.addEventListener("click", playMusica);
pauseButton.addEventListener("click", pauseMusica);

// Inicializa el juego
startGame();





