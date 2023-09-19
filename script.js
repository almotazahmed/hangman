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
  // console.log(wordType);
  // console.log(word);

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
        wordLetters = wordLetters.filter((letter) => letter !== letterBtn);
        // console.log(wordLetters);
        if (wordLength === 0) {
          popUp("You Won!", word);
        }
      } else {
        failCount++;
        hangMan.classList.add(`wrong-${failCount}`);
        if (failCount === 7) {
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

  // Create Text
  const divText = document.createTextNode(`${message}, The Word Is ${word}`);

  // Append Text To Div
  div.appendChild(divText);

  div.addEventListener("click", (ev)=> {
    window.location.reload();
  })

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);
}


// // Selectors
// const letters = "abcdefghijklmnopqrstuvwxyz";
// const lettersBox = document.querySelector(".letters");
// const wordsType = document.querySelector(".words-type");
// const wordsList = document.querySelectorAll(".words-type div");
// const wordElement = document.querySelector(".word");
// const mainBox = document.querySelector(".main-div");

// for (let i = 0; i < letters.length; i++)
// {
//   let letter = document.createElement("div");
//   letter.setAttribute("letter-btn", letters[ i ]);
//   letter.classList.add("letter");
//   letter.textContent = letters[ i ].toLocaleUpperCase();
//   lettersBox.appendChild(letter);
// }


// // Word categories
// const words = {
//   programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
//   movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
//   people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Gandhi"],
//   countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
// };

// // Event listener for word type selection
// wordsType.addEventListener("click", (ev) => {
//   if (ev.target.classList.contains("programming") || ev.target.classList.contains("movies") || ev.target.classList.contains("people") || ev.target.classList.contains("countries")) {
//     const category = ev.target.classList[0];
//     addActive(wordsList, category);
//     let randomWord = getRandom(words[category]);
//     play(category, randomWord);
//   }
// });

// // Helper function to get a random item from an array
// function getRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// // Helper function to add the "active" class to selected word category
// function addActive(wordsList, word) {
//   wordsList.forEach(element => {
//     element.classList.remove("active");
//     element.style.opacity = "0.5";
//     if (element.classList.contains(word)) {
//       element.style.opacity = "1";
//       element.classList.add("active");
//     }
//   });
// }

// // Main function to play the game
// function play (wordType, word) {
//   console.log(wordType);
//   console.log(word);
//   // Clear the word container
//   wordElement.innerHTML = "";

//   // Create a div for the word type
//   const wordTypeDiv = document.createElement("div");
//   wordTypeDiv.classList.add("word-type");
//   wordTypeDiv.textContent = `${wordType}: `;
//   wordElement.appendChild(wordTypeDiv);

//   // Remove the "main-div-dis" class to remove opacity from the main box
//   mainBox.classList.remove("main-div-dis");

//   // Create a box for the word's letter spans
//   const randomWordDiv = document.createElement("div");
//   randomWordDiv.classList.add("random-word");

//   // Convert the word to lowercase and put the letters into spans
//   let wordLetters = Array.from(word.toLowerCase());
//   wordLetters.forEach(letter => {
//     const letterSpan = document.createElement("span");
//     letterSpan.setAttribute("the-letter", letter);
//     randomWordDiv.appendChild(letterSpan);
//   });
//   wordElement.appendChild(randomWordDiv);

//   // Get the letter spans
//   const letterSpanList = document.querySelectorAll(".word .random-word span");

//   // Initialize fail count and word length
//   let failCount = 0;
//   let wordLength = wordLetters.length;

//   let hangMan = document.querySelector(".hangman-draw");

//   // Event listener for clicking letter buttons
//   lettersBox.addEventListener("click", (ev) => {
//     if (ev.target.classList.contains("letter"))
//     {
//       ev.target.classList.add("clicked");
//       const letterBtn = ev.target.getAttribute("letter-btn");
//       if (wordLetters.includes(letterBtn))
//       {
//         letterSpanList.forEach(span => {
//           if (span.getAttribute("the-letter") === letterBtn) {
//             span.textContent = letterBtn;
//             wordLength--;
//           }
//         });
//         wordLetters = wordLetters.filter((letter) => letter !== letterBtn);
//         console.log(wordLetters);
//         if (wordLength === 0) {
//           popUp("Your Are Won!", word);
//         }
//       }
//       else
//       {
//         failCount++;
//         hangMan.classList.add(`wrong-${ failCount }`);
//         if (failCount === 8) {
//           popUp("Your Are Lose!", word);
//         }
//       }
//     }
//   });
// }

// function popUp(msg, word) {

//   // Create Popup Div
//   let div = document.createElement("div");

//   // Create Text
//   let divText = document.createTextNode(`${msg}, The Word Is ${word}`);

//   // Append Text To Div
//   div.appendChild(divText);

//   // Add Class On Div
//   div.className = 'popup';

//   // Append To The Body
//   document.body.appendChild(div);

// }
// let letters = "abcdefghijklmnopqrstuvwxyz";
// let lettersBox = document.querySelector(".letters");
// for (let i = 0; i < letters.length; i++)
// {
//   let letter = document.createElement("div");
//   letter.setAttribute("letter-btn", letters[ i ]);
//   letter.classList.add("letter");
//   letter.textContent = letters[ i ].toLocaleUpperCase();
//   lettersBox.appendChild(letter);
// }


// const words = {
//   programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
//   movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
//   people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
//   countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
// };

// let {programming, movies, people, countries} = words;
// let wordsType = document.querySelector(".words-type");
// let wordsList = document.querySelectorAll(".words-type div");
// console.log(wordsList)
// wordsType.addEventListener("click", (ev) => {
//   if (ev.target.classList.contains("programming") || ev.target.classList.contains("movies") || ev.target.classList.contains("people") || ev.target.classList.contains("countries"))
//   {
//     const category = ev.target.classList[0];
//     addActive(wordsList, category);
//     let randomWord = getRandom(words[category]);
//     play(category, randomWord);
//   }
// });



// function getRandom (arr) {
//   return arr[ Math.floor(Math.random() * arr.length)];
// }

// function addActive (wordsList, word) {
//   wordsList.forEach(element => {
//     element.classList.remove("active");
//     element.style.cssText = "opacity: .5";
//     if (element.classList.contains(word))
//     {
//       element.style.cssText = "opacity: 1";
//       element.classList.add("active");
//     }
//   });
// }

// function play (wordType, word) {
//   //delete every thing from the word container 
//   let wordElement = document.querySelector(".word");
//   while (wordElement.firstChild) {
//     wordElement.removeChild(wordElement.firstChild);
//   }
//   //create div of word-type 
//   let wordTypeDiv = document.createElement("div");
//   wordTypeDiv.classList.add("word-type");
//   wordTypeDiv.textContent = `${ wordType }: `;
//   wordElement.appendChild(wordTypeDiv);

//   //remove the class name to remove opacity from the main box
//   let mainBox = document.querySelector(".main-div");
//   mainBox.classList.remove("main-div-dis");

//   //create the box which we want to add the letter span of the word
//   let randomWordDiv = document.createElement("div");
//   randomWordDiv.classList.add("random-word");

//   //the letter of the word in an array
//   let wordLetters = Array.from(word, function (ele) {
//     return ele.toLowerCase();
//   });
//   //put the letters into span 
//   for (let i = 0; i < wordLetters.length; i++)
//   {
//     let letterSpan = document.createElement("span");
//     letterSpan.setAttribute("the-letter", wordLetters[ i ]);
//     randomWordDiv.appendChild(letterSpan);
//   }
//   wordElement.appendChild(randomWordDiv);

//   //span list 
//   let letterSpanLst = document.querySelectorAll(".word .random-word span");
  
//   //count of fail
//   let count = 0;
//   let wordLength = wordLetters.length;
//   //when click btn event
//   lettersBox.addEventListener("click", (ev) => {
//     if (ev.target.classList.contains("letter"))
//     {
//       if (wordLetters.includes(ev.target.getAttribute("letter-btn")))
//       {
//         letterSpanLst.forEach(ele => {
//           if (ele.getAttribute("the-letter") === ev.target.getAttribute("letter-btn"))
//           {
//             ele.textContent = ele.getAttribute("the-letter");
//             wordLength--;
//           }
//         })
//          if (wordLength === 0)
//         {
//           console.log("won");
//         }
//       }
//       else
//       {
//         count++;
//         console.log(count);
//         if (count === 10)
//         {
          
//           console.log("los");
//           setTimeout(function () {
//             window.location.reload();
//           }, 2000);
          
          
//         }
        
//       }
//     }
//   });



//   console.log(wordType);
//   console.log(wordLetters);
// }
