const paintGrid = document.getElementById('paint-grid')

// Controls
const darkenButton = document.getElementById('darkenButton')
const rndRgbColorButton = document.getElementById('rndRgbColorButton')

const bwColorButton = document.getElementById('bwColorButton')
const clearButton = document.getElementById('clearButton')

const gridSizeLabel = document.getElementById('gridSizeLabel')
const gridSizeSlider = document.getElementById('gridSize')

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

  switchPaintMode(paint)
}

// Global Options
let gridSize = 16
let color = '#000000'
let pixel
let paintMode

const initialize = () => {
  changeGrid()
  addHandler()
  changeSlider()
}

const changeGrid = () => {
  generateGrid(gridSizeSlider.value)
  gridSizeLabel.innerText = `Grid-Size: ${gridSizeSlider.value}`
}

const generateGrid = (gridSize) => {
  paintGrid.innerHTML = ''
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
  switchPaintMode(paint)
}

const addHandler = () => {
  clearButton.addEventListener('click', clearGrid)

  bwColorButton.addEventListener('click', () => {
    switchPaintMode(paint)
  })

  rndRgbColorButton.addEventListener('click', () => {
    switchPaintMode(paintRandom)
  })

  darkenButton.addEventListener('click', () => {
    switchPaintMode(paintDarken)
  })

  rSlider.addEventListener('change', changeSlider)
  gSlider.addEventListener('change', changeSlider)
  bSlider.addEventListener('change', changeSlider)

  gridSizeSlider.addEventListener('change', changeGrid)
}

const setColor = (r, g, b) => {
  rSlider.value = r
  gSlider.value = g
  bSlider.value = b
  changeSlider()
}

const clearGrid = () => {
  pixel.forEach((pixel) => (pixel.style.backgroundColor = '#ffffff'))
  setColor(0, 0, 0)
}

const paint = (e) => {
  if (e.buttons === 1) {
    e.target.style.backgroundColor = colorPreviewRGB.style.backgroundColor
  }
}

const paintRandom = (e) => {
  if (e.buttons === 1) {
    let R = Math.floor(Math.random() * 255)
    let G = Math.floor(Math.random() * 255)
    let B = Math.floor(Math.random() * 255)

    var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
    var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
    var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

    color = '#' + RR + GG + BB
    e.target.style.backgroundColor = color
  }
}

const paintDarken = (e) => {
  if (e.buttons === 1) {
    let col = e.target.style.backgroundColor

    let newCol = darken(col, -10)

    e.target.style.backgroundColor = newCol
  }
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
    H = S = 0
  } else {
    switch (Xmax) {
      case R: {
        H = (G - B) / C

        break
      }
      case G: {
        H = (B - R) / C + 2

        break
      }
      case B: {
        H = (R - G) / C + 4

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

const switchPaintMode = (newPaintMode) => {
  pixel.forEach((pixel) => pixel.removeEventListener('mouseenter', paintMode))
  pixel.forEach((pixel) => pixel.removeEventListener('mousedown', paintMode))
  paintMode = newPaintMode
  pixel.forEach((pixel) => pixel.addEventListener('mouseenter', paintMode))
  pixel.forEach((pixel) => pixel.addEventListener('mousedown', paintMode))
}

initialize()
