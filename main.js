const paintGrid = document.getElementById('paint-grid')

// Controls
const darkenButton = document.getElementById('darkenButton')
const rndRgbColorButton = document.getElementById('rndRgbColorButton')
const colorButton = document.getElementById('colorButton')
const bwColorButton = document.getElementById('bwColorButton')
const clearButton = document.getElementById('clearButton')

// Global Options
let gridSize = 16
let color = '#000000'
let pixel

const initialize = () => {
  generateGrid(gridSize)
  addHandler()
}

const generateGrid = (gridSize) => {
  const size = `${Math.round(paintGrid.offsetWidth / gridSize)}px`

  for (let j = 0; j < gridSize; j++) {
    const row = document.createElement('div')
    for (let i = 0; i < gridSize; i++) {
      const pixel = document.createElement('div')
      pixel.classList.add('pixel')
      pixel.style.width = size
      pixel.style.height = size

      row.appendChild(pixel)
    }

    paintGrid.appendChild(row)
  }

  pixel = document.querySelectorAll('.pixel')
}

const addHandler = () => {
  pixel.forEach((pixel) => pixel.addEventListener('click', paint))
  clearButton.addEventListener('click', clearGrid)

  bwColorButton.addEventListener('click', () => {
    setMode('bw')
  })

  colorButton.addEventListener('click', () => {
    setMode('color')
  })

  rndRgbColorButton.addEventListener('click', () => {
    setMode('rnd')
  })

  darkenButton.addEventListener('click', () => {
    setMode('darken')
  })
}
const paint = (e) => {
  e.target.style.backgroundColor = color
}

const clearGrid = (e) => {}

const paintBW = (e) => {
  e.target.style.backgroundColor = '#000000'
}

const paintColor = (e) => {
  e.target.style.backgroundColor = '#ff9933'
}

const paintRandom = (e) => {
  let R = Math.floor(Math.random() * 255)
  let G = Math.floor(Math.random() * 255)
  let B = Math.floor(Math.random() * 255)
  e.target.style.backgroundColor = `RGB(${R},${G},${B})`
}

const setDarken = (e) => {}

const untoggle = () => {
  const buttons = document.querySelectorAll('#controls button')
  buttons.forEach((button) => button.classList.remove('toggled'))
}

const setMode = (mode) => {
  let paintMode
  switch (mode) {
    case 'bw': {
      console.log('Set Mode to B/W')
      paintMode = paintBW
      break
    }
    case 'color': {
      console.log('Set Mode to Color')
      paintMode = paintColor
      break
    }
    case 'rnd': {
      console.log('Set Mode to RandomRGB')
      paintMode = paintRandom
      break
    }
    case 'darken': {
      console.log('Set Mode to Darken')
      break
    }
  }
  pixel.forEach((pixel) => pixel.addEventListener('click', paintMode))
}

initialize()
