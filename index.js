const container = document.getElementById('container');
const playground = document.querySelector('.playground')
const cnt = document.getElementById('counter');
const fill = document.getElementById('fill');
const timer = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');
const img = ["/img/bikini.svg",
  "/img/coffee.svg",
  "/img/Doggie.svg",
  "/img/ice-cream.svg",
  "/img/loving.svg",
  "/img/plant.svg",
]
let tiles = [];
let active = [];
let counter = 0;
let percent = 0;


function createTile(src) {
  const tile = document.createElement('div')
  const blank = document.createElement('div')
  const img = document.createElement('img')
  tile.classList.add('tile')
  img.classList.add('tile-img')
  blank.classList.add('blank')
  img.setAttribute('src', src)
  tile.appendChild(blank)
  tile.appendChild(img)
  tiles.push(tile)
}

function newGame() {
  for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < 2; j++) {
      createTile(img[i])
    }
  }
  counter = 0;
  shuffleTiles()

}


function cleanActive() {
  active = active.filter(act => act.classList.contains('active'))
  tiles.filter((tile) => {
    if (!tile.lastChild.classList.contains('correct')) {
      tile.style.pointerEvents = "auto"
    } else {
      tile.style.pointerEvents = "none"
    }
  })
  gameOver()
}

function isActive(e) {

  if (e.target.classList.contains('blank') && !e.target.classList.contains('active')) {
    flipTile(e)
  } else {
    showMessage("you've just clicked it!")
  }
}

function flipTile(e) {

  if (active.length < 2 || active === []) {
    counter++
    cnt.innerText = counter;
    e.target.classList.add('active')
    active.push(e.target)
  } else {
    tiles.forEach(tile => tile.style.pointerEvents = "none")
  }

  // equal 2
  if (active.length === 2) {
    // are the same
    if (active[0].nextSibling.src === active[1].nextSibling.src) {
      active.forEach((act) => {
        act.nextSibling.classList.add('correct')
        act.classList.remove('active')
      })
      // are different
    } else {
      setTimeout(() => {
        active.forEach((act) => {
          act.classList.remove('active')
        })
      }, 1000)
    }
  }
  countDown()
  setTimeout(() => cleanActive(), 1100)

}

function shuffleTiles() {
  tiles.forEach((tile) => {
    const rand = Math.floor(Math.random() * 999)
    tile.key = rand
    tile.firstChild.setAttribute('key', tile.key)
  })
  tiles.sort((a, b) => a.key - b.key)
  tiles.forEach((tile) => {
    container.appendChild(tile)
    tile.addEventListener('click', (e) => isActive(e))
  })
}

function countDown() {
  if (counter == 1) {
    let countTo = new Date().getTime() + 60000;
    let counterFunc = setInterval(() => {
      let now = new Date().getTime()
      let distance = countTo - now;

      fill.style.width = `${percent = percent + 1.66}%`

      if (distance < 0) {
        clearInterval(counterFunc);
        fill.innerHTML = '<h4>FIN<h4>'
        gameOver()
      }
      if (tiles.every((tile) => tile.lastChild.classList.contains('correct'))) {
        clearInterval(counterFunc);
        gameOver()
      }
    }
      , 1000);
  }
}

function showMessage(msg) {
  const message = document.createElement('div')
  message.classList.add('message')
  message.innerHTML = `<h3>${msg}</h3>`;
  playground.appendChild(message)
  setTimeout(() => playground.removeChild(message), 1000)
}

function gameOver() {
  if (tiles.every((tile) => tile.lastChild.classList.contains('correct'))) {
    showMessage('wygryw')
  }
  if (fill.innerText == 'FIN') {
    showMessage('przegryw')
    tiles.forEach(tile => tile.style.pointerEvents = "none")
  }
}

function startAgain() {
  location.reload()
}

newGame()




restartBtn.addEventListener('click', startAgain)




































