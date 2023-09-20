// Selectors
const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersBox = document.querySelector(".letters");
const wordsType = document.querySelector(".words-type");
const wordsList = document.querySelectorAll(".words-type div");
const wordElement = document.querySelector(".word");
const mainBox = document.querySelector(".main-div");
const hangMan = document.querySelector(".hangman-draw");


for (let i = 0; i < letters.length; i++)
{
  let letter = document.createElement("div");
  letter.setAttribute("letter-btn", letters[ i ]);
  letter.classList.add("letter");
  letter.textContent = letters[ i ].toLocaleUpperCase();
  lettersBox.appendChild(letter);
}

// Word categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Gandhi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// Event listener for word type selection
wordsType.addEventListener("click", (ev) => {
  const category = ev.target.classList[0];
  if (category in words) {
    addActive(wordsList, category);
    const randomWord = getRandom(words[category]);
    play(category, randomWord);
  }
});

// Helper function to get a random item from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to add the "active" class to selected word category
function addActive(wordsList, word) {
  wordsList.forEach(element => {
    element.classList.remove("active");
    element.style.opacity = "0.5";
    if (element.classList.contains(word)) {
      element.style.opacity = "1";
      element.classList.add("active");
    }
  });
}

// Main function to play the game
function play(wordType, word) {
  console.log(wordType);
  console.log(word);

  // Clear the word container
  wordElement.innerHTML = "";

  // Create a div for the word type
  const wordTypeDiv = document.createElement("div");
  wordTypeDiv.classList.add("word-type");
  wordTypeDiv.textContent = `${wordType}: `;
  wordElement.appendChild(wordTypeDiv);

  // Remove the "main-div-dis" class to remove opacity from the main box
  mainBox.classList.remove("main-div-dis");

  // Create a box for the word's letter spans
  const randomWordDiv = document.createElement("div");
  randomWordDiv.classList.add("random-word");

  // Convert the word to lowercase and put the letters into spans
  const wordLetters = Array.from(word.toLowerCase());
  wordLetters.forEach(letter => {
    const letterSpan = document.createElement("span");
    letterSpan.setAttribute("the-letter", letter);
    randomWordDiv.appendChild(letterSpan);
  });
  wordElement.appendChild(randomWordDiv);

  // Get the letter spans
  const letterSpanList = document.querySelectorAll(".word .random-word span");

  // Initialize fail count and word length
  let failCount = 0;
  let wordLength = wordLetters.length;
  // Event listener for clicking letter buttons
  lettersBox.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("letter")) {
      ev.target.classList.add("clicked");
      const letterBtn = ev.target.getAttribute("letter-btn");
      if (wordLetters.includes(letterBtn)) {
        letterSpanList.forEach(span => {
          if (span.getAttribute("the-letter") === letterBtn) {
            span.textContent = letterBtn;
            wordLength--;
          }
        });
        if (wordLength === 0) {
          popUp("You Won!", word);
        }
      } else {
        failCount++;
        hangMan.classList.add(`wrong-${failCount}`);
        if (failCount === 8) {
          popUp("You Lost!", word);
        }
      }
    }
  });
}

// Function to display a pop-up message
function popUp(message, word) {
  // Create Popup Div
  const div = document.createElement("div");
  div.className = 'popup';

  // Create Text
  const divText = document.createElement('div');
  divText.textContent = `${message}, The Word Is `;

  const spanElement = document.createElement('span');
  spanElement.textContent = word;
  divText.appendChild(spanElement);

  // Create close button
  const closeButton = document.createElement('div');
  closeButton.className = 'close-btn';
  closeButton.textContent = '✕';
  closeButton.addEventListener('click', () => {
    window.location.reload();
  });

  div.appendChild(closeButton);

  // Append Text To Div
  div.appendChild(divText);

  // Append To The Body
  document.body.appendChild(div);
}