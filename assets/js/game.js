
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const MAX_MOVES = 15;

const characters = [
  'burro',
  'cabra',
  'dinossauro',
  'macaco',
  'ovo',
  'passaro',
  'peixe',
  'raposa',
  'skul',
  'tartaruga',
  'urso',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';
let movesRemaining = MAX_MOVES; // Track remaining moves

const checkEndGame = () => {
  if (movesRemaining === 0) {
    clearInterval(this.loop);
    // Use confirm() for better user experience and potential restart
    const confirmedRestart = confirm("Do you want to restart🤔???");
    if (confirmedRestart) {
      // Reset game state if user confirms
      movesRemaining = MAX_MOVES;
      document.querySelector('.moves-remaining').innerHTML = `Movimentos Restantes: ${movesRemaining}`;
      firstCard = '';
      secondCard = '';
      // Remove disabled cards class for restart
      const disabledCards = document.querySelectorAll('.disabled-card');
      disabledCards.forEach(card => card.classList.remove('disabled-card'));
      loadGame();
      startTimer();
    }
    return;
  }

  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
};



const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    movesRemaining--;
    document.querySelector('.moves-remaining').innerHTML = `Moves Remaining: ${movesRemaining}`;
    if (movesRemaining === 0) {
      alert("Opps!!!😥You're out of moves!");
      checkEndGame();
    } else {
      checkCards();
    }
  }
};


const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

const loadGame = () => {
  grid.innerHTML = '';
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  let movesRemaining = MAX_MOVES;
  startTimer();
  loadGame();

    // Add the element to the UI:
    const movesRemainingElement = document.createElement('span');
    movesRemainingElement.classList.add('moves-remaining');
    movesRemainingElement.innerHTML = `Movimentos Restantes: ${movesRemaining}`;
    document.querySelector('header').appendChild(movesRemainingElement);
}