const container = document.getElementById('container');
const cnt = document.getElementById('counter');
const fill = document.getElementById('fill')
const img = ["/img/bikini.svg",
  "/img/coffee.svg",
  "/img/Doggie.svg",
  "/img/ice-cream.svg",
  "/img/loving.svg",
  "/img/plant.svg",
  "/img/reading-side.svg",
  "/img/rolling.svg"]
const tiles = [];
let active = [];
let counter = 0;
let percent = 0
class Tile {
  createTile(src) {
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

}

function newGame() {
  for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < 2; j++) {
      const el = new Tile;
      el.createTile(img[i])
    }
  }
  shuffleTiles()
  countDown()
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
}

function flipTile(e) {
  counter++
  cnt.innerText = counter;
  if (active.length < 2 || active === []) {
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
  setTimeout(() => cleanActive(), 1100)

}


function shuffleTiles() {
  tiles.forEach((tile) => {
    const rand = Math.floor(Math.random() * 999)
    tile.key = rand
  })
  tiles.sort((a, b) => a.key - b.key)
  tiles.forEach((tile) => {
    container.appendChild(tile)
    tile.addEventListener('click', (e) => flipTile(e))
  })
}

function countDown() {
  let countTo = new Date().getTime() + 60000;
  let counterFunc = setInterval(() => {
    let now = new Date().getTime()
    let distance = countTo - now;

    fill.style.width = `${percent = percent + 1.66}%`

    if (distance < 0) {
      clearInterval(counterFunc);
      document.getElementById("timer").innerHTML = "EXPIRED";
      gameOver()
    }
  }, 1000);
}

function gameOver() {
  if (tiles.every((tile) => tile.lastChild.classList.contains('correct'))) {
    alert('wygrana')
  } else {
    alert('przegryw')
  }
}

newGame()







































