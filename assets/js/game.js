
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const cardFlipSound = document.getElementById("card-flip");
const matchSound = document.getElementById("match");
const winSound = document.getElementById("win");
const loseSound = document.getElementById("lose")

const MAX_MOVES = 32;

const characters = [
  'burro',
  'cabra',
  'dinossauro',
  'macaco',
  'ovo',
  'passaro',
  // 'peixe',
  // 'raposa',
  'skul',
  'tartaruga',
  'urso',
  'cat',
  'fish',
  'elephant'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';
let movesRemaining = MAX_MOVES; 

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');


  if (disabledCards.length === characters.length * 2) {
    clearInterval(this.loop);
    winSound.play();
    document.querySelector('.win-modal').style.display = 'block';
    document.getElementById('modal').style.display = 'none';
    console.log('Win modal should be displayed.');
    return;
  }
  
  if (movesRemaining === 0) {
    clearInterval(this.loop);
    timer.innerHTML = '00';
    startTimer();
    
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = "Opps! You're out of moves!";
    document.getElementById('modal').style.display = 'block';
    loseSound.play();
    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', restartGame);
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
    matchSound.play();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
};

const restartGame = () => {
  movesRemaining = MAX_MOVES;
  document.querySelector('.moves-remaining').innerHTML = `Movimentos Restantes: ${movesRemaining}`;
  firstCard = '';
  secondCard = '';
  const disabledCards = document.querySelectorAll('.disabled-card');
  disabledCards.forEach(card => card.classList.remove('disabled-card'));
  loadGame();
  clearInterval(this.loop);
  startTimer();
  // Hide the modal after restart
  document.getElementById('modal').style.display = 'none';
};


const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
    cardFlipSound.play();
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    movesRemaining--;
    document.querySelector('.moves-remaining').innerHTML = `Moves Remaining: ${movesRemaining}`;
    cardFlipSound.play();
    if (movesRemaining === 0) {
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
  const restartButton = document.getElementById('restart-modal');
  const closeButton = document.getElementById('modal-close');
  const restartWinButton = document.getElementById('restart-win');
  const winModalCloseButton = document.getElementById('win-modal-close');
  document.querySelector('header').appendChild(movesRemainingElement);
  restartButton.addEventListener('click', () => {
    location.reload();
  });
  closeButton.addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
  });
  restartWinButton.addEventListener('click', () => {
    location.reload();
  });
  winModalCloseButton.addEventListener('click', () => {

    document.querySelector('.win-modal').style.display = 'none';
  });
}
