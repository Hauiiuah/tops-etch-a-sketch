const paintGrid = document.getElementById('paint-grid')

// Controls
const darkenButton = document.getElementById('darkenButton')
const rndRgbColorButton = document.getElementById('rndRgbColorButton')
const colorButton = document.getElementById('colorButton')
const bwColorButton = document.getElementById('bwColorButton')
const clearButton = document.getElementById('clearButton')

const rSlider = document.getElementById('rSlider')
const gSlider = document.getElementById('gSlider')
const bSlider = document.getElementById('bSlider')

const pR = document.getElementById('R')
const pG = document.getElementById('G')
const pB = document.getElementById('B')
const pH = document.getElementById('H')
const pS = document.getElementById('S')
const pL = document.getElementById('L')

const colorPreviewHSL = document.getElementById('colorPreviewHSL')
const colorPreviewRGB = document.getElementById('colorPreviewRGB')

const changeSlider = () => {
  pR.innerText = `R: ${rSlider.value}`
  pG.innerText = `G: ${gSlider.value}`
  pB.innerText = `B: ${bSlider.value}`
  const hsl = rgb2hsl(rSlider.value, gSlider.value, bSlider.value)
  pH.innerText = `H: ${hsl.H}`
  pS.innerText = `S: ${hsl.S}`
  pL.innerText = `L: ${hsl.L}`

  colorPreviewRGB.style.backgroundColor = `rgb(${rSlider.value},${gSlider.value},${bSlider.value})`
  colorPreviewHSL.style.backgroundColor = `hsl(${hsl.H},${hsl.S}%,${hsl.L}%)`
}
rSlider.addEventListener('change', changeSlider)
gSlider.addEventListener('change', changeSlider)
bSlider.addEventListener('change', changeSlider)

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
  paintMode = paintBW
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

const clearGrid = () => {
  pixel.forEach((pixel) => (pixel.style.backgroundColor = '#ffffff'))
}

const paintBW = (e) => {
  e.target.style.backgroundColor = '#000000'
}

const paintColor = (e) => {
  e.target.style.backgroundColor = colorPreviewRGB.style.backgroundColor
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

  e.target.style.backgroundColor = newCol
}

const untoggle = () => {
  const buttons = document.querySelectorAll('#controls button')
  buttons.forEach((button) => button.classList.remove('toggled'))
}

const rgb2hsl = (r, g, b) => {
  //Conversion after Wikipedia article
  //Value must be in range R,G,B element of [0,1]

  const R = r / 255
  const G = g / 255
  const B = b / 255

  //Xmax => max(R,G,B) => V
  const Xmax = Math.max(R, G, B)

  //Xmin => min(R,G,B) = V-C
  const Xmin = Math.min(R, G, B)

  //C => Xmax - Xmin = 2(V-L)
  const C = Xmax - Xmin

  //L => mid(R,G,B) = (Xmax + Xmin) / 2 =V - C/2
  const L = (Xmax + Xmin) / 2

  // H => 0,                        if C=0
  //      60deg * (0+(G-B)/C)       if V=R
  //      60deg * (2+(B-R)/C)       if V=G
  //      60deg * (4+(R-G)/C)       if V=B

  let H, S
  if (Xmax === Xmin) {
    console.log('Xmax == Xmin')
    H = S = 0
  } else {
    switch (Xmax) {
      case R: {
        H = (G - B) / C
        console.log('Case R: ', H)
        break
      }
      case G: {
        H = (B - R) / C + 2
        console.log('Case G: ', H)
        break
      }
      case B: {
        H = (R - G) / C + 4
        console.log('Case B: ', H)
        break
      }
    }
    H = H / 6

    S = Xmax === 0 ? 0 : C / Xmax
  }

  return { H: H * 360, S: S * 100, L: L * 100 }
}

const darken = (color, percent) => {
  let values = color.match(/\d+/g)

  var R = parseInt(values[0])
  var G = parseInt(values[1])
  var B = parseInt(values[2])

  const hsl = rgb2hsl(R, G, B)
  hsl.L = hsl.L + percent
  return `hsl(${hsl.H},${hsl.S}%,${hsl.L}%)`
}

const setMode = (mode) => {
  pixel.forEach((pixel) => pixel.removeEventListener('click', paintMode))
  switch (mode) {
    case 'bw': {
      paintMode = paintBW
      break
    }
    case 'color': {
      paintMode = paintColor
      break
    }
    case 'rnd': {
      paintMode = paintRandom
      break
    }
    case 'darken': {
      paintMode = paintDarken
      break
    }
  }

  pixel.forEach((pixel) => pixel.addEventListener('click', paintMode))
}

initialize()
