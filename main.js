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
let paintMode

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
      pixel.style.backgroundColor = '#ffffff'

      row.appendChild(pixel)
    }

    paintGrid.appendChild(row)
  }

  pixel = document.querySelectorAll('.pixel')
}

const addHandler = () => {
  paintMode = paint
  pixel.forEach((pixel) => pixel.addEventListener('click', paintMode))
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

const clearGrid = () => {
  pixel.forEach((pixel) => (pixel.style.backgroundColor = '#ffffff'))
}

const paintBW = (e) => {
  e.target.style.backgroundColor = '#000000'
}

const paintColor = (e) => {
  e.target.style.backgroundColor = '#ff9933'
}

const paintRandom = (e) => {
  console.log('Paint Random')
  let R = Math.floor(Math.random() * 255)
  let G = Math.floor(Math.random() * 255)
  let B = Math.floor(Math.random() * 255)

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

  color = '#' + RR + GG + BB
  e.target.style.backgroundColor = color
}

const paintDarken = (e) => {
  let col = e.target.style.backgroundColor

  let newCol = darken(col, -10)
  console.log('COLOR: ', col, 'NewColor:', newCol)
  e.target.style.backgroundColor = newCol
}

const untoggle = () => {
  const buttons = document.querySelectorAll('#controls button')
  buttons.forEach((button) => button.classList.remove('toggled'))
}

const darken = (color, percent) => {
  let values = color.match(/\d\w+/g)

  var R = parseInt(values[0])
  var G = parseInt(values[1])
  var B = parseInt(values[2])

  R = parseInt((R * (100 + percent)) / 100)
  G = parseInt((G * (100 + percent)) / 100)
  B = parseInt((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

const setMode = (mode) => {
  pixel.forEach((pixel) => pixel.removeEventListener('click', paintMode))
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
      paintMode = paintDarken
      break
    }
  }

  pixel.forEach((pixel) => pixel.addEventListener('click', paintMode))
}

initialize()
