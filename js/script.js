const coverPath = 'images/cover.png';
const cards = [
    { name:'6', path:'images/6.png', value:6 },
    { name:'7', path:'images/7.png', value:7 },
    { name:'8', path:'images/8.png', value:8 },
    { name:'9', path:'images/9.png', value:9 },
    { name:'10', path:'images/10.png', value:10 },
    { name:'Валет', path:'images/jack.png', value:2 },
    { name:'Дама', path:'images/queen.png', value:3 },
    { name:'Король', path:'images/king.png', value:4 },
    { name:'Туз', path:'images/ace.png', value:11 },
];
function buildPlayerFieldHTML(name, bindElement, boxId) {
    const playerBox = document.createElement('div');
    playerBox.className = 'player-box';
    playerBox.setAttribute('id', boxId);
    const playerName = document.createElement('span');
    playerName.className = 'player-box__name';
    playerName.textContent = name;
    const playerScore = document.createElement('div');
    playerScore.className = 'player-box__score';
    const playerCard = document.createElement('img');
    playerCard.src = coverPath;
    playerCard.className = 'player-box__card';

    playerBox.appendChild(playerName);
    playerBox.appendChild(playerScore);
    playerBox.appendChild(playerCard);

    bindElement.appendChild(playerBox);
}

function getName() {
    while (true) {
        let name = prompt('Введіть своє ім’я');
        if (name.length < 3) alert('Ім’я має бути не менше 3 символів. Спробуйте знову.');
        else return name;
    }
}

function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}

function changeScore(boxId, score) {
    const scoreEl = document.querySelector(`#${boxId} > .player-box__score`);
    scoreEl.textContent = score !== null ? score.toString() : '';
}

function changeCard(boxId, card) {
    const cardEl = document.querySelector(`#${boxId} > .player-box__card`);
    cardEl.src = card.path || coverPath;
}

function updateData(...playerObjects) {
    playerObjects.forEach(p => {
        changeScore(p.boxId, p.score);
        changeCard(p.boxId, p.card);
    });
}

function setWinner(boxId) {
    const scoreEl = document.querySelector(`#${boxId} > .player-box__score`);
    scoreEl.classList.add('player-box__score_winner');
}

function setLoser(boxId) {
    const scoreEl = document.querySelector(`#${boxId} > .player-box__score`);
    scoreEl.classList.add('player-box__score_loser');
}

let gamer = { name: getName(), boxId: 'gamer-box', score: 0, card: {} };
let computer = { name: 'Computer', boxId: 'computer-box', score: 0, card: {} };

const content = document.createElement('div');
content.setAttribute('id', 'content');
document.body.appendChild(content);

buildPlayerFieldHTML(gamer.name, content, gamer.boxId);
buildPlayerFieldHTML(computer.name, content, computer.boxId);

const actionButton = document.createElement('div');
actionButton.className = 'action-button';
actionButton.innerText = 'Generate';
content.appendChild(actionButton);

actionButton.addEventListener('click', battle);
updateData(gamer, computer);
function battle() {
    gamer.card = getRandomCard();
    computer.card = getRandomCard();

    if (gamer.card.value > computer.card.value) gamer.score++;
    if (gamer.card.value < computer.card.value) computer.score++;

    updateData(gamer, computer);

    if (gamer.score === 3 || computer.score === 3) {
        const winner = gamer.score === 3 ? gamer : computer;
        const loser = gamer.score === 3 ? computer : gamer;

        setWinner(winner.boxId);
        setLoser(loser.boxId);

        actionButton.removeEventListener('click', battle);
        actionButton.innerText = 'Try again';
        actionButton.classList.add('action-button_try-again');
        actionButton.addEventListener('click', window.location.reload.bind(window.location));

        alert(winner.name + ' перемагає!');
    }
}
